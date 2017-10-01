import registerComponent from './register.component';

const register = angular
  .module('register', [])
  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('components.auth.register', {
        url: '/register/{accountType}',
        params: {
          accountType: {
            type: 'string',
          },
        },
        component: 'register',
        resolve: {
          userType($transition$) {
            return $transition$.params().accountType;
          },
        }
      });
  })
  .component('register', registerComponent)
  .name;

export default register;
