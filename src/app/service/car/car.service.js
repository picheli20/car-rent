(function (global) {
  'use strict';
  function CarsService(url){
    var self = this;
    self.url = url;
  }
  CarsService.prototype.load = function (callback) {
    var self = this;
    $.get(self.url, callback);
  }

  global.CarsService = new CarsService('/assets/data/cars.json');
})(window);