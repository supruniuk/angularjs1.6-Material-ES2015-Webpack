import template from './hotel-edit.html';
import './hotel-edit.scss';

const hotelEditComponent = {
  bindings: {
    hotel: '<',
  },
  template,
  controller: class HotelEditComponent {
    constructor($state, HotelsService, AuthService,
      $mdDialog, $localStorage) {
      'ngInject';

      this.name = 'hotel-edit';
      this.$mdDialog = $mdDialog;
      this.$state = $state;
      // this.$localStorage = $localStorage;
      this.hotelsService = HotelsService;
      this.authService = AuthService;
    }

    cancel() {
      this.$state.go('hotel.profile');
    }

    delete() {
      let confirm = this.$mdDialog.confirm()
        .title('Delete account?')
        .textContent('Your account will be permanently deleted.')
        .ok('Delete')
        .cancel('Cancel');

      this.$mdDialog.show(confirm)
        .then(() => this.hotelsService.delete(this.hotel.id))
        .then(() => this.authService.logout(), () => { });
    }

    save() {
      let updated_hotel = Object.assign({}, this.hotel);

      // Skip updating Image if it's not changed
      if (!(updated_hotel.img instanceof File || updated_hotel.img instanceof Blob)) {
        delete updated_hotel.img;
      }

      this.hotelsService.save(updated_hotel)
      .then((hotel) => {
        Object.assign(this.hotel, hotel);
        // this.$localStorage.authData = this.hotel;
        this.$state.go('hotel.profile');
      });
    }
  }
};

export default hotelEditComponent;