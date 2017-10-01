import hotelReviews from './hotel-reviews.module'
// import hotelReviewsController from './hotel-reviews.controller';
import hotelReviewsComponent from './hotel-reviews.component';
import hotelReviewsTemplate from './hotel-reviews.html';

describe('hotelReviews', () => {
  let $rootScope, makeController;

  beforeEach(window.module(hotelReviews));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new hotelReviewsController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(hotelReviewsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = hotelReviewsComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(hotelReviewsTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(hotelReviewsController);
    });
  });
});
