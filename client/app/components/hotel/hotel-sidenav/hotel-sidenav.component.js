import template from './hotel-sidenav.html';
import './hotel-sidenav.scss';

const hotelSidenavComponent = {
  template,
  controller: class HotelSidenavComponent {
    constructor($mdSidenav, AuthService) {
      'ngInject';

      this.name = 'hotel-sidenav';
      this.$mdSidenav = $mdSidenav;
      this.authService = AuthService;
    }

    get authData() {
      return this.authService.authData;
    }

    logout() {
      this.closeMainMenu();
      this.authService.logout();
    }

    closeMainMenu() {
      this.$mdSidenav('hotel-sidenav').toggle();
    }
  }
};

export default hotelSidenavComponent;