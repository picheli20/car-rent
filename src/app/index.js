(function(global){
  'use strict';
  var isGruppedyVendor = false;
  var carRender;
  var vendorRender;
  var locationRender;
  var locationGroupRender;
  global.app = {
    init : function () {
      GeneratorFactory.register('car', '/app/components/car/car.html');
      GeneratorFactory.register('vendor', '/app/components/vendor/vendor.html');
      GeneratorFactory.register('header', '/app/components/header/header.html');
      GeneratorFactory.register('location', '/app/components/location/location.html');
      GeneratorFactory.register('location-group', '/app/components/location/location-group.html');

      carRender = GeneratorFactory.renderize.bind(GeneratorFactory, 'car');
      vendorRender = GeneratorFactory.renderize.bind(GeneratorFactory, 'vendor');
      locationRender = GeneratorFactory.renderize.bind(GeneratorFactory, 'location', '#content-area');
      locationGroupRender = GeneratorFactory.renderize.bind(GeneratorFactory, 'location-group', '#content-area');

      GeneratorFactory.renderize('header', '#AppHeader');
      locationRender([]);
      CarsService.load(function(cars) {
        locationRender(cars);
      });
    },
    groupByVendor : function(){
      isGruppedyVendor = !isGruppedyVendor;
      $('.group-by .vendor').toggleClass('hidden');
      $('.group-by .show-list').toggleClass('hidden');
      app.reload();
    },
    reload : function(){
      CarsService.load(function(cars) {
        var render = locationRender;
        if(isGruppedyVendor){
          render = locationGroupRender;
        }

        render(cars);
      });
    },
    sortBy: $('#sort-by').val(),
    sortReload : function(){
      app.sortBy = $('#sort-by').val();
      app.reload();
    }
  }

  $( document ).ready(global.app.init);
})(window);