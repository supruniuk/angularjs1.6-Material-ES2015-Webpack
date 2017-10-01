import hotelDetailsComponent from './hotel-details.component';

const hotelDetails = angular
  .module('components.hotel.hotel-details', [])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('customer.hotels.details', {
        url: '/{hotelId}',
        data: {
          pageTitle: 'Hotels',
        },
        component: 'hotelDetails',
        params: {
          hotelId: {
            type: 'int',
          },
        },
        resolve: {
          hotel($transition$, HotelsService) {
            let params = $transition$.params();
            return HotelsService.get(params.hotelId);            
          },
        },
      });
  })
  .component('hotelDetails', hotelDetailsComponent)  
  .name;

export default hotelDetails;
