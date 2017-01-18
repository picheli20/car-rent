(function(global){
  'use strict';
  var isGruppedyVendor = false;
  var carRender;
  var vendorRender;
  var locationRender;
  var locationGroupRender;
  var detailRender;
  var actionButtonsRender;
  global.app = {
    init : function () {
      GeneratorFactory.register('car', '/app/components/car/car.html');
      GeneratorFactory.register('detail', '/app/components/detail/detail.html');
      GeneratorFactory.register('vendor', '/app/components/vendor/vendor.html');
      GeneratorFactory.register('header', '/app/components/header/header.html');
      GeneratorFactory.register('location', '/app/components/location/location.html');
      GeneratorFactory.register('location-group', '/app/components/location/location-group.html');
      GeneratorFactory.register('action-buttons', '/app/components/action-buttons/action-buttons.html');

      carRender           = GeneratorFactory.renderize.bind(GeneratorFactory, 'car');
      vendorRender        = GeneratorFactory.renderize.bind(GeneratorFactory, 'vendor');
      locationRender      = GeneratorFactory.renderize.bind(GeneratorFactory, 'location', '#content-area');
      detailRender        = GeneratorFactory.renderize.bind(GeneratorFactory, 'detail', '#content-area');
      locationGroupRender = GeneratorFactory.renderize.bind(GeneratorFactory, 'location-group', '#content-area');
      actionButtonsRender = GeneratorFactory.renderize.bind(GeneratorFactory, 'action-buttons', '#action-buttons');

      GeneratorFactory.renderize('header', '#AppHeader');
      

      app.processPath();
    },
    groupByVendor : function(){
      isGruppedyVendor = !isGruppedyVendor;
      $('.group-by .vendor').toggleClass('hidden');
      $('.group-by .show-list').toggleClass('hidden');
      app.processPath();
    },
    reload : function(code){
      CarsService.load(code, function(cars) {
        var render = locationRender;
        if(isGruppedyVendor && !code){
          render = locationGroupRender;
        }else if(code){
          render = detailRender;
        }
        console.log(cars);
        render(cars);
      });
    },
    sortBy: $('#sort-by').val(),
    sortReload : function(){
      app.sortBy = $('#sort-by').val();
      app.reload();
    },
    processPath : function(){
      var hashArr = window.location.hash.split('/');
      var action = hashArr.length <= 1 ? '' : hashArr[1];
      switch (action) {
        case 'detail':
          if(hashArr.length !== 4){
            window.location.hash = '#/home';
            return;
          }
          GeneratorFactory.remove('#action-buttons');
          var code = hashArr[2];
          var name = hashArr[3];
          app.reload({
            code : code,
            name : name
          });
          break;
        case 'home':
          actionButtonsRender();
          app.reload();
          break;
        default:
          console.log('redirect to home');
          window.location.hash = '#/home';
          // statements_def
          break;
      }
    }
  }

  window.onhashchange  = app.processPath;

  $( document ).ready(global.app.init);
})(window);