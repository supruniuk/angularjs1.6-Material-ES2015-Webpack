import hotelReviewsComponent from './hotel-reviews.component';
import reviewsService from './hotel-reviews.service';

const hotelReviews = angular
  .module('components.hotel.hotel-reviews', [])
  .component('hotelReviews', hotelReviewsComponent)
  .service('ReviewsService', reviewsService)
  .name;

export default hotelReviews;
