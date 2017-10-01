import hotelStays from './hotel-stays.module'
// import hotelStaysController from './hotel-stays.controller';
import hotelStaysComponent from './hotel-stays.component';
import hotelStaysTemplate from './hotel-stays.html';

describe('hotelStays', () => {
  let $rootScope, makeController;

  beforeEach(window.module(hotelStays));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new hotelStaysController();
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
      expect(hotelStaysTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = hotelStaysComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(hotelStaysTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(hotelStaysController);
    });
  });
});
