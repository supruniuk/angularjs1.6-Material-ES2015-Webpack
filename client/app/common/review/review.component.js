import template from './review.html';
import './review.scss';

const reviewComponent = {
  bindings: {
    stay: '<',
    onSaveStay: '&',
  },
  template,
  transclude: true,
  controller: class ReviewComponent {
    constructor() {
      'ngInject';
      this.name = 'review';
    }

    $onInit() {
      this.edited_stay = angular.copy(this.stay);
    }

    get isEditMode() {
      return !!this.stay.isEditing;
    }

    cancelEdit() {
      this.edited_stay = angular.copy(this.stay);
      this.stay.isEditing = false;
    }

    saveStay() {
      this.onSaveStay({
        $event: { stay: this.edited_stay }
      });
    }
  }
};

export default reviewComponent;