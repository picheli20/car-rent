(function(global){
  'use strict';
  global.app = {
    init : function () {
      global.CarFactory      = GeneratorFactory.bind(null, '/app/components/car/car.html');
      global.WrapperFactory  = GeneratorFactory.bind(null, '/app/components/wrapper/wrapper.html');
      global.HeaderFactory  = GeneratorFactory.bind(null, '/app/components/header/header.html');

      var cars = [
        { name : 'Ka', price : 599.00 },
        { name : 'Ka 2', price : 909.00 },
        { name : 'Ka 3', price : 90.00 }

      ];

      new global.HeaderFactory({}, '#AppHeader');
      new global.WrapperFactory({ title : 'Ford' }, '#mainApp');
      new global.CarFactory(cars, '#car-content');

      CarsService.factory = global.CarFactory;
      CarsService.load(function(data) {
        // TODO: process the json
        console.log(data)
      });
    }
  }

  $( document ).ready(global.app.init);
})(window);