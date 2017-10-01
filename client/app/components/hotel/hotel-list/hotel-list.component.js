import template from './hotel-list.html';
import './hotel-list.scss';

const hotelListComponent = {
  bindings: {
    onSelect: '&',
    infiniteScrollDisabled: '<'
  },
  template,
  controller: class HotelListComponent {
    constructor(HotelsService, InfiniteFactory) {
      'ngInject';

      this.name = 'hotel-list';
      this.hotelsService = HotelsService;
      this.infiniteFactory = InfiniteFactory;     
    }

    $onInit() {
      // HotelsService must have 'getPage' method defined 
      this.infinite = this.infiniteFactory(this.hotelsService).source();
    }

    get isInfiniteDisabled() {
      return [
        this.infinite.busy, 
        this.infinite.completed, 
        this.infiniteScrollDisabled
      ].some(value => value);
    }

    get isLoadingListItem() {
      return this.infinite.busy;
    }

    selectHotel(hotel) {
      this.onSelect({ $event: { hotel: hotel } });
    }
  }
};

export default hotelListComponent;