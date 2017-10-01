class HotelsService {
	constructor($http, $q, AppConstants, QueryFilterService, NotificationsService) {
		'ngInject';

		this.$q = $q;
		this.$http = $http;
		this.appConstants = AppConstants;
		this.queryFilterService = QueryFilterService;
		this.notificationsService = NotificationsService;

		this.selectedHotel = null;
		this.filter_keys = ["name", "rating", "favorites"];
		this.errorHandler = (error) => {
			this.notificationsService.error(error.data);
			return this.$q.reject(error);
		}
	}

	get(id) {
		if (id) {
			if (!!this.selectedHotel && this.selectedHotel.id == id) {
				let deferred = this.$q.defer();
				deferred.resolve(this.selectedHotel);
				return deferred.promise;
			}
			else {
				return this.$http({
					url: `${this.appConstants.server_url}/hotel/${id}/`,
					method: 'GET',
					ignoreLoadingBar: true,
				})
					.then((hotel) => {
						this.selectedHotel = hotel.data;
						return hotel.data;
					},
					this.errorHandler);
			}
		}
		else {
			return this.$http({
				url: `${this.appConstants.server_url}/auth-hotels/`,
				method: 'GET',
				ignoreLoadingBar: true,
			})
				.then((response) => response.data,
				this.errorHandler);
		}
	}

	getPage(page_url) {
		let request = {};
		request.method = 'GET';
		if (page_url) {
			request.url = page_url;
		}
		else {
			request.url = `${this.appConstants.server_url}/hotel/`;
			request.params = this.queryFilterService.query_filter(this.filter_keys);
		}
		return this.$http(request, )
			.then((response) => response.data);
	}

	save(hotel) {
		let request = {};

		if (hotel.id) {
			request.url = `${this.appConstants.server_url}/hotel/${hotel.id}/`;
			request.method = 'PUT';
		} else {
			request.url = `${this.appConstants.server_url}/auth-hotels/`;
			request.method = 'POST';
		}

		request.data = hotel;
		request.headers = { 'Content-Type': undefined };
		request.transformRequest = (data) => {
			let formData = new FormData();
			Object.keys(data).forEach(key => formData.append(key, data[key]));
			return formData;
		}

		return this.$http(request, )
			.then((response) => response.data,
			this.errorHandler);
	}

	delete(id) {
		return this.$http({
			url: `${this.appConstants.server_url}/hotel/${id}/`,
			method: 'DELETE'
		})
			.then((response) => response.data,
			this.errorHandler);
	}

	favoriteHotel(id, is_favorite) {
		let request = {};
		request.url = `${this.appConstants.server_url}/hotel/${id}/favorite/`;
		request.method = is_favorite ? 'POST' : 'DELETE';
		request.headers = { 'Content-Type': 'application/json' };

		return this.$http(request, )
			.then((response) => response.data,
			this.errorHandler);
	}
}

export default HotelsService;