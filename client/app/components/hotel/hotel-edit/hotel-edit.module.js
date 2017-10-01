import hotelEditComponent from './hotel-edit.component';

const hotelEdit = angular
  .module('components.hotel.hotel-edit', [])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('hotel.edit', {
        url: '/profile/edit',
        data: {
          pageTitle: 'Edit profile',
        },        
        component: 'hotelEdit',
        resolve: {
          hotel(HotelsService, AuthService) {
            return HotelsService.get(AuthService.authData.id);                
          },        
        },
      });
  })
  .component('hotelEdit', hotelEditComponent)  
  .name;

export default hotelEdit;
