import hotelBook from './hotel-book.module'
// import hotelBookController from './hotel-book.controller';
import hotelBookComponent from './hotel-book.component';
import hotelBookTemplate from './hotel-book.html';

describe('hotelBook', () => {
  let $rootScope, makeController;

  beforeEach(window.module(hotelBook));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new hotelBookController();
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
      expect(hotelBookTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = hotelBookComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(hotelBookTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(hotelBookController);
    });
  });
});
