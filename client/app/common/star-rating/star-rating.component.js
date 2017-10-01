import template from './star-rating.html';
import './star-rating.scss';

const starRatingComponent = {
  bindings: {
    rating: '<',
  },
  template
};

export default starRatingComponent;