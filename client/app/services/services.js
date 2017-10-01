import queryFilterService from './query.filter.service';
import staysService from './stays.service';
import notificationsService from './notifications.service';

let services = angular
	.module('app.services', [])
	.service('QueryFilterService', queryFilterService)
	.service('StaysService', staysService)
	.service('NotificationsService', notificationsService)
	.name;

export default services;