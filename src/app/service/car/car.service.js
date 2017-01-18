(function (global) {
  'use strict';

  var cachedList = null;
  var url = '/assets/data/cars.json';

  function CarsService(){}
  CarsService.prototype.load = function (callback, code) {
    if(code){
      loadOne(code, callback);
      return;
    }
    if(cachedList){
      loadCars(callback)(cachedList);
      return;
    }
    $.get(url, loadCars(callback));
  };

  function loadOne(code, callback){
    var result = {};
    var loadFunc = loadCars(function(json){
      json.map(function(item){
        item.VehAvailRSCore.cars.map(function(carItem){
          if(carItem.Vehicle['@Code'] == code.code && carItem.Vehicle.VehMakeModel['@Name'] == code.name ){
            result = carItem;
            carItem.VehRentalCore = item.VehAvailRSCore.VehRentalCore;
          }
        });
      });
      callback(result);
    });

    if(cachedList){
      loadFunc(cachedList);
      return;
    }
    $.get(url, loadFunc);

  }

  function loadCars(callback){
    return function(json){

      cachedList = $.extend(true, [], json);

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
  

  global.CarsService = new CarsService();
})(window);


