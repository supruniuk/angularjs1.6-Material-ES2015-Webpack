import template from './hotel-profile.html';
import './hotel-profile.scss';

const hotelProfileComponent = {
  bindings: {
    hotel: '<'
  },
  template,
  controller: class HotelProfileComponent {
    constructor() {
      'ngInject';

      this.name = 'hotel-profile';
    }
  }
};

export default hotelProfileComponent;


