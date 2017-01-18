(function (global) {
  'use strict';

  var cachedList = null;

  function CarsService(url){
    var self = this;
    self.url = url;
  }
  CarsService.prototype.load = function (callback) {
    var self = this;
    if(cachedList){
      loadCars(callback)(cachedList);
      return;
    }
    $.get(self.url, loadCars(callback));
  };
  function loadCars(callback){
    return function(json){

      cachedList = $.extend(true, [], json);
      var data = [];

      json.map(function(item){
        var vehicleCore = item.VehAvailRSCore.VehRentalCore;
        vehicleCore['@PickUpDateTime'] = Util.formatDate(new Date(vehicleCore['@PickUpDateTime']));
        vehicleCore['@ReturnDateTime'] = Util.formatDate(new Date(vehicleCore['@ReturnDateTime']));

        // reduce the sub arrays of vendors to one array
        item.VehAvailRSCore.cars = item.VehAvailRSCore.VehVendorAvails.reduce(function(s, b){
          return s.concat(b.VehAvails);
        }, []);

        item.VehAvailRSCore.vendors = item.VehAvailRSCore.VehVendorAvails;


        // sorting lists
        item.VehAvailRSCore.cars = Util.sort(item.VehAvailRSCore.cars, app.sortBy);
        item.VehAvailRSCore.vendors.map(function(item){
          item.VehAvails = Util.sort(item.VehAvails, app.sortBy);
        });
      });
      callback(json);
    }
  }
  

  global.CarsService = new CarsService('/assets/data/cars.json');
})(window);


