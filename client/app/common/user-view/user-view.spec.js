import userView from './user-view.module'
import userViewController from './user-view.controller';
import userViewComponent from './user-view.component';
import userViewTemplate from './user-view.html';

describe('userView', () => {
  let $rootScope, makeController;

  beforeEach(window.module(userView));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new userViewController();
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
      expect(userViewTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = userViewComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(userViewTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(userViewController);
      });
  });
});
