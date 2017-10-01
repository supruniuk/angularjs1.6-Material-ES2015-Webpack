import hotelSidenav from './hotel-sidenav.module'
// import hotelSidenavController from './hotel-sidenav.controller';
import hotelSidenavComponent from './hotel-sidenav.component';
import hotelSidenavTemplate from './hotel-sidenav.html';

describe('hotelSidenav', () => {
  let $rootScope, makeController;

  beforeEach(window.module(hotelSidenav));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new hotelSidenavController();
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
      expect(hotelSidenavTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = hotelSidenavComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(hotelSidenavTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(hotelSidenavController);
    });
  });
});
