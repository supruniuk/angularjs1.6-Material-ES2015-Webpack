import hotelDetails from './hotel-details.module'
import hotelDetailsComponent from './hotel-details.component';
import hotelDetailsTemplate from './hotel-details.html';

describe('hotelDetails', () => {
  let $rootScope, makeController;

  beforeEach(window.module(hotelDetails));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new hotelDetailsController();
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
      expect(hotelDetailsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = hotelDetailsComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(hotelDetailsTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(hotelDetailsController);
    });
  });
});
