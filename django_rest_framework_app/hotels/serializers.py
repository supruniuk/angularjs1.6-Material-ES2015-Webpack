from rest_framework import serializers
# from rest_framework.fields import CurrentUserDefault
from models import Review, Hotel, Stay, BaseUser, Group


class GroupSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Customer model """
    class Meta:
        model = Group
        fields = ("id", "name")


class UserSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Customer model """
    groups = GroupSerializer(many=True, read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = BaseUser
        fields = ("id", "name", "email", "img", "password", "groups")


class ReviewSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Review model """
    likes_count = serializers.SerializerMethodField('_likes_count')

    is_liked = serializers.SerializerMethodField('_is_liked')

    def _is_liked(self, obj):
        user = self.context['request'].user
        return user in obj.likes.all()

    def _likes_count(self, obj):
        return obj.likes.count()

    class Meta:
        model = Review
        fields = ("id", "text", "likes_count", "is_liked")


class StayDetailSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Stay model """
    review = ReviewSerializer(required=False)

    class Meta:
        model = Stay
        fields = ("id", "start_date", "end_date",
                  "rating", "customer", "hotel", "review",)


class StaySerializer(serializers.ModelSerializer):
    """ Serializer to represent the Stay model """

    class Meta:
        model = Stay
        fields = ("id", "start_date", "end_date",
                  "rating", "customer", "hotel", "review",)


class StayForHotelSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Stay model """
    related_to = UserSerializer(source='customer', read_only=True)
    review = ReviewSerializer()

    class Meta:
        model = Stay
        fields = ("id", "start_date", "end_date",
                  "rating", "hotel", "related_to", "review",)


class HotelDetailsSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Hotel model """
    stays = StayForHotelSerializer(
        source='stay_set', many=True, read_only=True)
    is_favorite = serializers.BooleanField(read_only=True)
    stays_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Hotel
        fields = ("id", "name", "img", "avg_rating", "location",
                  "stays", "rates", "phone", "availability", "website",
                  "email", "is_favorite", "stays_count")


class HotelSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Hotel model """

    class Meta:
        model = Hotel
        fields = ("id", "name", "img", "avg_rating", "location",
                  "rates", "phone", "availability", "website",
                  "email", "stays_count")


class StayForCustomerSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Stay model """
    related_to = HotelSerializer(source='hotel', read_only=True)
    review = ReviewSerializer()

    class Meta:
        model = Stay
        fields = ("id", "start_date", "end_date",
                  "rating", "related_to", "review",)
