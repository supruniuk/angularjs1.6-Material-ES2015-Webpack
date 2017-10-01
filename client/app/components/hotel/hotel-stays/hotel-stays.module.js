import hotelStaysComponent from './hotel-stays.component';

const hotelStays = angular
  .module('components.hotel.hotel-stays', [])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('hotel.reviews', {
        url: '/reviews',
        data: {
          pageTitle: 'My reviews',
        },
        component: 'hotelStays',
        resolve: {
          stays(StaysService) {
            return StaysService.get();
          },
        },
      });
  })
  .component('hotelStays', hotelStaysComponent)
  .name;

export default hotelStays;
