(function(global){
  global.app = {
    init : function () {
      global.CarFactory      = GeneratorFactory.bind(null, '/app/components/car/car.html');
      global.WrapperFactory  = GeneratorFactory.bind(null, '/app/components/wrapper/wrapper.html');

      var wrapper = new WrapperFactory({ title : 'Ford' }, '#mainApp');
      var cars = [
        { name : 'Ka', price : 599.00 },
        { name : 'Ka 2', price : 909.00 },
        { name : 'Ka 3', price : 90.00 }

      ];
      var car = new CarFactory(cars, '#car-content');
    }
  }

  $( document ).ready(app.init);
})(window);