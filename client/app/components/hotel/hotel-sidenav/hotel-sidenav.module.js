import hotelSidenavComponent from './hotel-sidenav.component';

const hotelSidenav = angular
  .module('components.hotel.hotel-sidenav', [])
  .component('hotelSidenav', hotelSidenavComponent)
  .name;

export default hotelSidenav;
