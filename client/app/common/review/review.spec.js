import review from './review.module'
// import reviewController from './review.controller';
import reviewComponent from './review.component';
import reviewTemplate from './review.html';

describe('review', () => {
  let $rootScope, makeController;

  beforeEach(window.module(review));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new reviewController();
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
      expect(reviewTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = reviewComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(reviewTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(reviewController);
      });
  });
});
