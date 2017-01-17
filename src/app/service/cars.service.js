(function (global) {
  function CarsService(url){
    var self = this;
    self.url = url;
    self.factory = null;
  }
  CarsService.prototype.load = function (callback) {
    var self = this;
    if(!self.factory){
      console.error('The factory attribute is not setted!');
      return;
    }
    $.get(self.url, callback);
  }

  global.CarsService = new CarsService('/assets/data/cars.json');
})(window);