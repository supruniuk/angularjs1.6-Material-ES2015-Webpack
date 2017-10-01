import hotelList from './hotel-list/hotel-list.module';
import hotelDetails from './hotel-details/hotel-details.module';
import hotelProfile from './hotel-details/hotel-profile/hotel-profile.module';
import hotelLocation from './hotel-details/hotel-location/hotel-location.module';
import hotelReviews from './hotel-details/hotel-reviews/hotel-reviews.module';
import hotelBook from './hotel-book/hotel-book.module';
import hotelEdit from './hotel-edit/hotel-edit.module';
import hotelMain from './hotel-main/hotel-main.module';
import hotelStays from './hotel-stays/hotel-stays.module';
import hotelSidenav from './hotel-sidenav/hotel-sidenav.module';
import hotelsService from './hotels.service';


const hotel = angular
  .module('components.hotel', [
    hotelList,
    hotelDetails,
    hotelProfile,
    hotelLocation,
    hotelReviews,
    hotelBook,
    hotelEdit,
    hotelMain,
    hotelSidenav,
    hotelStays
  ])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('hotel', {
        url: '/hotel',
        redirectTo: 'hotel.profile',
        data: {
          requiresAuth: true,
          requiresPermission: 'hotel',
        },
        component: 'hotelMain',
      });
  })  
  .service('HotelsService', hotelsService)
  .name;

export default hotel;
