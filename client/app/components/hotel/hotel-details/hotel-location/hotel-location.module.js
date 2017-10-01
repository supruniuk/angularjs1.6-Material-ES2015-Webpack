import hotelLocationComponent from './hotel-location.component';

const hotelLocation = angular
  .module('components.hotel.hotel-location', [])
  .component('hotelLocation', hotelLocationComponent)
  .name;

export default hotelLocation;
