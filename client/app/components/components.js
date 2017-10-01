import hotel    from './hotel/hotel.module';
import auth     from './auth/auth.module';
import customer from './customer/customer.module';

let components = angular.module('app.components', [
  auth,
  customer,
  hotel
])
.name;

export default components;
