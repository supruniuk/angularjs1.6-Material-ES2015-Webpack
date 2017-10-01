import hotelEdit from './hotel-edit.module'
// import hotelEditController from './hotel-edit.controller';
import hotelEditComponent from './hotel-edit.component';
import hotelEditTemplate from './hotel-edit.html';

describe('hotelEdit', () => {
  let $rootScope, makeController;

  beforeEach(window.module(hotelEdit));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new hotelEditController();
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
      expect(hotelEditTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = hotelEditComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(hotelEditTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(hotelEditController);
      });
  });
});
