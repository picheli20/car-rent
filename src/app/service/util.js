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

      return date.getDate() + ' ' + monthNames[date.getMonth()] + ' at ' + date.getHours() + ':' +  + (date.getMinutes()<10?'0':'') + date.getMinutes();
    },
    sort : function (arr, attrStr, reversed){
      if(!attrStr){
        return arr;
      }
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


