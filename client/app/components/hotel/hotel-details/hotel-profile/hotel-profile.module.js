import hotelProfileComponent from './hotel-profile.component';

const hotelProfile = angular
  .module('components.hotel.hotel-profile', [])
  .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";

    $stateProvider
      .state('hotel.profile', {
        url: '/profile',
        data: {
          pageTitle: 'Info',
        },
        component: 'hotelProfile',
        resolve: {
          hotel(AuthService, HotelsService) {
            return HotelsService.get(AuthService.authData.id);             
          },
        },
      });
  })
  .component('hotelProfile', hotelProfileComponent)
  .name;

export default hotelProfile;
