import template from './hotel-book.html';
import './hotel-book.scss';

const hotelBookComponent = {
  bindings: {
    hotel: '<',
  },
  template,
  controller: class HotelBookComponent {
    constructor(AuthService, StaysService, $state) {
      'ngInject';

      this.name = 'hotel-book';
      this.user = AuthService.authData;
      this.staysService = StaysService;
      this.$state = $state;
      this.minDate = new Date();
    }

    $onInit() {
      this.booking = {
        start_date: this.minDate,
        end_date: null,
        customer: this.user.id,
        hotel: this.hotel.id,
      };
    }

    cancel() {
      this.$state.go('customer.hotels.details',
        { hotelId: this.hotel.id });
    }

    book() {
      let booking = Object.assign({}, this.booking);
      this.staysService.save(booking).then(
        (book) => {
          this.$state.go('customer.hotels.details',
            { hotelId: this.hotel.id });
        }
      );
    }
  }
};

export default hotelBookComponent;