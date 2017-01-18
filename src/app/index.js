(function(global){
  'use strict';
  var isGruppedyVendor = false;
  var locationRender;
  var locationGroupRender;
  var detailRender;
  global.app = {
    init : function () {
      GeneratorFactory.register('car', '/app/components/car/car.html');
      GeneratorFactory.register('vendor', '/app/components/vendor/vendor.html');
      GeneratorFactory.register('header', '/app/components/header/header.html');
      GeneratorFactory.register('location', '/app/components/location/location.html');
      GeneratorFactory.register('location-group', '/app/components/location/location-group.html');
      GeneratorFactory.register('detail', '/app/components/detail/detail.html', function(){
        $('#detail-area .popup').fadeIn(350);
      });

      GeneratorFactory.register('action-buttons', '/app/components/action-buttons/action-buttons.html', function(){
        app.sortBy = $('#sort-by').val();
        app.sortReload();
      }); 

      locationRender      = GeneratorFactory.renderize.bind(GeneratorFactory, 'location', '#content-area');
      detailRender        = GeneratorFactory.renderize.bind(GeneratorFactory, 'detail', '#detail-area');
      locationGroupRender = GeneratorFactory.renderize.bind(GeneratorFactory, 'location-group', '#content-area');

      GeneratorFactory.renderize('header', '#AppHeader');
      GeneratorFactory.renderize('action-buttons', '#action-buttons');
      
      app.processPath();
    },
    groupByVendor : function(){
      isGruppedyVendor = !isGruppedyVendor;
      $('.group-by .vendor').toggleClass('hidden');
      $('.group-by .show-list').toggleClass('hidden');
      app.processPath();
    },
    reload : function(code){
      CarsService.load(function(cars) {
        var render = locationRender;
        if(isGruppedyVendor){
          render = locationGroupRender;
        }
        render(cars);

        if(code){
          CarsService.load(function(cars) {
            detailRender(cars);
          }, code);
        }
      });
    },
    closeModal: function(){
      $('#detail-area .popup').fadeOut(350, function(){
        window.location.hash = '#/home';
      });
    },
    sortReload : function(){
      app.sortBy = $('#sort-by').val();
      app.reload();
    },
    goTo : function(path){
      window.location.hash = encodeURI(path);
    },
    // "pagination"
    processPath : function(){
      var hashArr = window.location.hash.split('/');
      var action = hashArr.length <= 1 ? '' : hashArr[1];
      switch (action) {
        case 'detail':
          if(hashArr.length !== 4){
            window.location.hash = '#/home';
            return;
          }
          app.reload({
            code : hashArr[2],
            name : decodeURI(hashArr[3])
          });
          break;
        case 'home':
          GeneratorFactory.remove('#detail-area');
          app.reload();
          break;
        default:
          window.location.hash = '#/home';
          break;
      }
    }
  }

  window.onhashchange  = app.processPath;

  $( document ).ready(global.app.init);
})(window);