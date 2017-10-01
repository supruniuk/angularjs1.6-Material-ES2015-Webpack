from rest_framework import (
    viewsets,
    filters,
    status,
)
from rest_framework.views import APIView
from rest_framework.decorators import detail_route
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from models import Hotel, Customer, Review, Stay, BaseUser, Group
from serializers import (
    HotelDetailsSerializer,
    HotelSerializer,
    ReviewSerializer,
    StaySerializer,
    StayForCustomerSerializer,
    StayForHotelSerializer,
    UserSerializer,
)
from filters.mixins import FiltersMixin
from validations import hotels_query_schema
from django.db.models import Case, When, Value, BooleanField
from drf_roles.mixins import RoleViewSetMixin


class CustomerAuth(APIView):
    """
    List the customers available for signing in
    """
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    def get(self, request, format=None):
        serializer = self.serializer_class(
            Customer.objects.all(),
            many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, format=None):
        customers_group = Group.objects.get(name="customer")
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = Customer.objects.create_user(**serializer.validated_data)
            user.groups.add(customers_group)
            user.img = 'images/customers/default/profile_img.jpg'
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HotelAuth(APIView):
    """
    List the hotels available for signing in
    """
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    def get(self, request, format=None):
        serializer = self.serializer_class(
            Hotel.objects.all(),
            many=True,
            context={'request': request}
        )
        return Response(serializer.data)

    def post(self, request, format=None):
        hotels_group = Group.objects.get(name="hotel")
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = Hotel.objects.create_user(**serializer.validated_data)
            # user.set_password(request.data['password'])
            user.groups.add(hotels_group)
            user.img = 'images/hotels/default/profile_img.jpg'
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HotelViewPagination(PageNumberPagination):
    page_size = 10


class HotelViewSet(RoleViewSetMixin, FiltersMixin, viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Hotel objects """
    serializer_class = HotelSerializer
    queryset = Hotel.objects.all()

    pagination_class = HotelViewPagination
    ordering = ('-avg_rating',)
    filter_backends = (filters.OrderingFilter,)
    filter_mappings = {
        'name': 'name__icontains',
        'rating': 'avg_rating__gte',
    }
    filter_validation_schema = hotels_query_schema

    def get_queryset_for_customer(self):
        """
        Restricts the queryset by filtering against
        query parameters in the URL.
        """
        current_user = get_current_user(self.request.user)

        # Configuring queryset_filters from FilterMixin
        query_params = self.request.query_params
        url_params = self.kwargs
        queryset_filters = self.get_db_filters(url_params, query_params)
        db_filters = queryset_filters['db_filters']
        if ('favorites' in query_params):
            db_filters['id__in'] = current_user.favorites.all()

        return (
            Hotel.objects
            .prefetch_related('stay_set__review__likes',)
            .filter(**db_filters)
            .annotate(
                is_favorite=Case(
                    When(id__in=current_user.favorites.all(),
                         then=Value(True)),
                    default=Value(False),
                    output_field=BooleanField(),
                ),
            )
        )

    def get_serializer_class_for_customer(self):
        return HotelDetailsSerializer

    @detail_route(methods=['post', 'delete'])
    def favorite(self, request, pk=None):
        hotel = self.get_object()
        user = get_current_user(self.request.user)
        try:
            # to add hotel to favorites
            if request.method == "POST":
                user.favorites.add(hotel)
                return Response({'result': 'Hotel is added to favorites'})
            # to remove hotel from favorites
            if request.method == "DELETE":
                user.favorites.remove(hotel)
                return Response(status=status.HTTP_204_NO_CONTENT)
        except AttributeError:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class StayViewSet(RoleViewSetMixin, viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Stay objects """
    serializer_class = StaySerializer
    queryset = Stay.objects.all()

    def get_serializer_class_for_customer(self):
        if self.action in ['create']:
            return StaySerializer
        else:
            return StayForCustomerSerializer

    def get_serializer_class_for_hotel(self):
        return StayForHotelSerializer

    def get_queryset_for_customer(self):
        current_user = get_current_user(self.request.user)
        return Stay.objects.filter(customer=current_user)

    def get_queryset_for_hotel(self):
        current_user = get_current_user(self.request.user)
        return Stay.objects.filter(hotel=current_user)

    def update(self, request, pk=None):
        stay = self.get_object()

        formdata = request.data
        # updating stay's review
        if (stay.review):
            stay.review.text = formdata['review']['text']
            stay.review.save()
        else:
            if formdata['review']:
                stay.review = Review.objects.create(**formdata['review'])

        stay.rating = formdata['rating']
        stay.save()
        stay.hotel.update_avg_rating()

        serializer = StayForCustomerSerializer(
            stay, context={'request': request})

        return Response(serializer.data)


class ReviewViewSet(viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Review objects """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    @detail_route(methods=['post', 'delete'])
    def like(self, request, pk=None):
        review = self.get_object()
        current_user = self.request.user

        if request.method == "POST":
            review.likes.add(current_user)
        if request.method == "DELETE":
            review.likes.remove(current_user)

        serializer = self.serializer_class(
            review, context={'request': request})
        return Response(serializer.data)


def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }


def get_current_user(user):
    return BaseUser.objects.get_subclass(id=user.id)


# def is_customer_user(user):
#     return user.groups.filter(name='customer').exists()


# def is_hotel_user(user):
#     return user.groups.filter(name='hotel').exists()
