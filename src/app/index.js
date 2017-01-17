(function(global){
  'use strict';
  global.app = {
    init : function () {
      GeneratorFactory.register('car', '/app/components/car/car.html');
      GeneratorFactory.register('wrapper', '/app/components/wrapper/wrapper.html');
      GeneratorFactory.register('header', '/app/components/header/header.html');



      GeneratorFactory.renderize('header', {}, '#AppHeader')
      CarsService.load(function(cars) {
        console.log(cars);
      });
    }
  }

  $( document ).ready(global.app.init);
})(window);