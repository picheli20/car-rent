(function (global) {
  'use strict';
  function CarsService(url){
    var self = this;
    self.url = url;
  }
  CarsService.prototype.load = function (callback) {
    var self = this;
    $.get(self.url, function(json){
      
      var data = json;
      ['VehAvailRSCore', 'VehRentalCore' , 'VehVendorAvails', 'Vendor', 'VehAvails']
      callback(data);
    });
  };

  global.CarsService = new CarsService('/assets/data/cars.json');
})(window);