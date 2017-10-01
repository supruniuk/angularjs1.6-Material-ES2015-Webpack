import template from './user-view.html';
import './user-view.scss';

const userViewComponent = {
  bindings: {
    authData: '<',
  },
  template,
  controller: class UserViewComponent {
    constructor() {
      'ngInject';
      this.name = 'user-view';
    }
  }
};

export default userViewComponent;