import hotelLocation from './hotel-location.module'
import hotelLocationComponent from './hotel-location.component';
import hotelLocationTemplate from './hotel-location.html';

describe('hotelLocation', () => {
  let $rootScope, makeController;

  beforeEach(window.module(hotelLocation));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new hotelLocationController();
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
      expect(hotelLocationTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = hotelLocationComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(hotelLocationTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(hotelLocationController);
    });
  });
});
