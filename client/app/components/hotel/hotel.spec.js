import hotel from './hotel.module'
// import hotelController from './hotel.controller';
// import hotelComponent from './hotel.component';
// import hotelTemplate from './hotel.html';

describe('hotel', () => {
  let $rootScope, makeController;

  beforeEach(window.module(hotel));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new hotelController();
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
      expect(hotelTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  // describe('Component', () => {
  //     // component/directive specs
  //     let component = hotelComponent;

  //     it('includes the intended template',() => {
  //       expect(component.template).to.equal(hotelTemplate);
  //     });

  //     it('invokes the right controller', () => {
  //       expect(component.controller).to.equal(hotelController);
  //     });
  // });
});
