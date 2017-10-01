class ReviewsService {
	constructor($http, AppConstants, NotificationsService) {
		'ngInject';
		this.$http = $http;
		this.appConstants = AppConstants;
		this.notificationsService = NotificationsService;
	}


	likeReview(id, is_liked) {
		let request = {};
		request.url = `${this.appConstants.server_url}/review/${id}/like/`;

		request.method = is_liked ? 'POST' : 'DELETE';

		return this.$http(request, )
			.then((response) => response.data,
			(error) => this.notificationsService.error(error.data));
	}
}

export default ReviewsService;