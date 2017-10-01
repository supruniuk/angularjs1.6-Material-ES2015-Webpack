class AuthService {
  constructor($http, AppConstants, $state,
    $localStorage, CustomersService,
    HotelsService, NotificationsService) {
    'ngInject';

    this.$http = $http;
    this.$state = $state;
    this.$localStorage = $localStorage;
    this.appConstants = AppConstants;
    this.customersService = CustomersService;
    this.hotelsService = HotelsService;
    this.notificationsService = NotificationsService;
  }

  _obtainJwtToken(loginFormData) {
    let request = {
      method: 'POST',
      url: `${this.appConstants.server_url}/api-token-auth/`,
      ignoreLoadingBar: true,
      data: loginFormData
    }

    return this.$http(request, )
      .then((response) => {
        if (response.data.token) {
          // store user data and token in local storage 
          // to keep user logged in between page refreshes
          this.$localStorage.authData = response.data.user;
          this.$localStorage.token = response.data.token;
          return true;
        }
        else return false;
      });
  }

  login(credentials) {
    return this._obtainJwtToken(credentials).then(
      (authenticated) => {
        if (authenticated) {
          this.$state.go(this.userType);
        }
      },
      (error) => this.notificationsService.error(
        "Unable to login with provided credentials"));
  }

  logout() {
    delete this.$localStorage.authData;
    delete this.$localStorage.token;
    this.$state.go('auth');
  }

  createHotel(credentials) {
    return this.hotelsService.save(credentials);
  }

  createCustomer(credentials) {
    return this.customersService.save(credentials);
  }

  get localToken() {
    if (!!this.$localStorage.token) {
      return this.$localStorage.token;
    }
    else return false;
  }

  get authData() {
    if (!!this.$localStorage.authData) {
      return this.$localStorage.authData;
    }
    else return false;
  }

  get isAuthenticated() {
    return !!this.localToken;
  }

  get userType() {
    if (this.authData) {
      if (this.authData.groups.some(group => group.name === 'hotel')) {
        return 'hotel';
      }
      else if (this.authData.groups.some(group => group.name === 'customer')) {
        return 'customer';
      }
    }
  }
}

export default AuthService;