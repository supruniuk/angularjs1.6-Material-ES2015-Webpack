import hotelBookComponent from './hotel-book.component';

const hotelBook = angular
  .module('components.hotel.hotel-book', [])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('customer.hotels.book', {
        url: '/{hotelId}/book',
        data: {
          pageTitle: 'Hotels',
        },
        component: 'hotelBook',
        params: {
          hotelId: {
            type: 'int',
            dynamic: true,
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
  .component('hotelBook', hotelBookComponent)
  .name;

export default hotelBook;
