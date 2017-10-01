import reviewComponent from './review.component';

const review = angular
  .module('common.review', [])
  .component('review', reviewComponent)
  .name;

export default review;
