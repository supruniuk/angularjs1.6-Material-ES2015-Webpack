import hotelMain from './hotel-main.module'
// import hotelMainController from './hotel-main.controller';
import hotelMainComponent from './hotel-main.component';
import hotelMainTemplate from './hotel-main.html';

describe('hotelMain', () => {
  let $rootScope, makeController;

  beforeEach(window.module(hotelMain));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new hotelMainController();
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
      expect(hotelMainTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = hotelMainComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(hotelMainTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(hotelMainController);
    });
  });
});
