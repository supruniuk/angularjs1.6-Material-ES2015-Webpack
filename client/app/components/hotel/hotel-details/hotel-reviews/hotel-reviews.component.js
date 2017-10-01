import template from './hotel-reviews.html';
import './hotel-reviews.scss';

const hotelReviewsComponent = {
  bindings: {
    stays: '<'
  },
  template,
  controller: class HotelReviewsComponent {
    constructor(ReviewsService) {
      'ngInject';

      this.reviewsService = ReviewsService;
      this.name = 'hotel-reviews';
    }

    likeReview(review) {
      this.reviewsService.likeReview(review.id, !review.is_liked)
        .then((new_review) => {
          Object.assign(review, new_review);
        });
    }
  }
};

export default hotelReviewsComponent;