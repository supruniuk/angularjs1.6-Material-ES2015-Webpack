import hotelMainComponent from './hotel-main.component';

const hotelMain = angular
  .module('components.hotel.hotel-main', [])
  .component('hotelMain', hotelMainComponent)
  .name;

export default hotelMain;
