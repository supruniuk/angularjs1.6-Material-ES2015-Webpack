import template from './hotel-details.html';
import bottomTemplate from './hotel-bottom-sheet.html';
import './hotel-details.scss';

const hotelDetailsComponent = {
	bindings: {
		hotel: '<',
	},
	template,
	controller: class HotelDetailsComponent {
		constructor($mdBottomSheet, $state, AuthService, HotelsService, NotificationsService) {
			'ngInject';

			this.name = 'hotel-details';
			this.$state = $state;
			this.$mdBottomSheet = $mdBottomSheet;
			this.authService = AuthService;
			this.hotelsService = HotelsService;
			this.notificationsService = NotificationsService;
			this.locationActive = false;
		}

		get isFavorite() {
			return this.hotel.is_favorite;
		}

		// get reviewsCount() {
		// 	return this.hotel.stays.filter(stay => stay.review).length;
		// }

		book() {
			this.$state.go('customer.hotels.book', { hotelId: this.hotel.id });
		}

		favorite() {
			this.hotelsService.favoriteHotel(this.hotel.id, !this.isFavorite)
				.then((new_favorite) => {
					this.hotel.is_favorite = !!new_favorite;
					let message = new_favorite ? ' was added to favorites' : ' was removed from favorites';
					message = this.hotel.name + message;
					this.notificationsService.info(message);
				});
		}

		contact() {
			this.bottomSheet = new bottomSheet(this.$mdBottomSheet);
			this.bottomSheet.hotel = this.hotel;
			this.$mdBottomSheet.show({
				template: bottomTemplate,
				controller: () => this.bottomSheet,
				controllerAs: "$ctrl",
			})
				.then((clickedItem) => {
					this.notificationsService.info(clickedItem.name + ' was clicked!');
				});
		}

		closeDetails() {
			this.$state.go('customer.hotels');
		}		
	}
};

class bottomSheet {
	constructor($mdBottomSheet) {
		'ngInject';
		this.$mdBottomSheet = $mdBottomSheet;
		this.items = [
			{ name: 'Phone', icon: 'phone', icon_url: '/hotel_app/assets/svg/phone.svg' },
			{ name: 'Twitter', icon: 'twitter', icon_url: '/hotel_app/assets/svg/twitter.svg' },
			{ name: 'Google+', icon: 'google_plus', icon_url: '/hotel_app/assets/svg/google_plus.svg' },
			{ name: 'Hangouts', icon: 'hangouts', icon_url: '/hotel_app/assets/svg/hangouts.svg' }
		];
	}

	contactHotel = (clickedItem) => {
		this.$mdBottomSheet.hide(clickedItem);
	}
}

export default hotelDetailsComponent;