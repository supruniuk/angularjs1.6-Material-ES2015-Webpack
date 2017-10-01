import hotelListComponent from './hotel-list.component';

const hotelList = angular
  .module('components.hotel.hotel-list', [])
  .component('hotelList', hotelListComponent)
  .name;

export default hotelList;
