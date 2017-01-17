(function(global) {
  var CarCtrl = {}
  CarCtrl.ola = function(){
    alert('Ola!');
  }
  global.Car = CarCtrl;
})(window);