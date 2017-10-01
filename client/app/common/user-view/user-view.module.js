import userViewComponent from './user-view.component';

const userView = angular
  .module('common.user-view', [])
  .component('userView', userViewComponent)
  .name;

export default userView;
