import template from './hotel-location.html';
import './hotel-location.scss';

const hotelLocationComponent = {
  bindings: {
    hotelLocation: '<',
  },
  template,
  controller: class HotelLocationComponent {
    constructor(NgMap) {
      'ngInject';

      this.name = 'hotel-location';
      this.ngMap = NgMap;
    }

    onMapLoaded() {
      this.ngMap.getMap()
        .then((map) => {
          google.maps.event.trigger(map, 'resize');
        },
        (err) => {
          console.log(err.data);
        });
    }
  }
};

export default hotelLocationComponent;