import template from './hotel-stays.html';
import './hotel-stays.scss';

const hotelStaysComponent = {
  bindings: {
    stays: '<',
  },
  template,
  controller: class HotelStaysComponent {
    constructor() {
      'ngInject';

      this.name = 'hotel-stays';
    }

    getLikesIcon(stay) {
      if (stay.review && stay.review.likes_count > 0) {
        return "favorite";
      }
      else return "favorite_border";
    }
  }
};

export default hotelStaysComponent;