(function(global) {
  var WrapperCtrl = {}
  WrapperCtrl.ola = function(){
    alert('Ola!');
  }
  global.Wrapper = WrapperCtrl;
})(window);