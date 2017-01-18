(function (global) {
  'use strict';

  global.Util = {
    formatDate : function (date){
      var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return day + ' ' + monthNames[monthIndex] + ' ' + year;
    },
    sort : function (arr, attrStr, reversed){
      var attrsOpts = attrStr.split(':');
      var isNumeric = attrsOpts.indexOf('numeric') !== -1 || attrsOpts.length === 1;
      // bind a new function with a fixed attrs
      var getFromTreeFunc = Util.getAttrFromArr.bind(null, attrsOpts[0]);
      
      if(reversed || attrsOpts.indexOf('asc') !== -1){
        reversed = -1;
      }else{
        reversed = 1;
      }

      return arr.sort(function(a,b) {
        a = getFromTreeFunc(a);
        b = getFromTreeFunc(b);
        if(isNumeric){
          a = Number(a);
          b = Number(b);
        }
        var ret;

        if (a < b) ret = -1;
        else if (a > b) ret = 1;
        else ret = 0;

        return ret * reversed;
      });
    },
    getAttrFromArr : function (tree, data){
      if(typeof tree === 'string'){
        tree = tree.split('.');
      }
      var r = data;
      tree.map(function (attr) {
        if(r) r = r[attr];
      });

      return r;
    }
  };
})(window);


