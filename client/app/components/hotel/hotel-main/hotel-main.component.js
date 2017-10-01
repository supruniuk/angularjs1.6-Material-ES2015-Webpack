import template from './hotel-main.html';
import './hotel-main.scss';

const hotelMainComponent = {
  template,
  controller: class HotelMainComponent {
    constructor($state, AuthService, $mdSidenav) {
      'ngInject';

      this.authService = AuthService;
      this.$state = $state;
      this.$mdSidenav = $mdSidenav;
    }

    openSidenav() {
      this.$mdSidenav('hotel-sidenav').toggle();
    }

    get userName() {
      return this.authService.authData.name;
    }

    get pageTitle() {
      return this.$state.current.data.pageTitle;
    }
  }
};

export default hotelMainComponent;