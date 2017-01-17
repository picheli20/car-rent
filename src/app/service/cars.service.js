(function (global) {
  function CarsService(url){
    $.get(url, function(data){
      console.log(data);
    });
  }

  global.Cars = new CarsService('/assets/data/cars.json');
})(window);