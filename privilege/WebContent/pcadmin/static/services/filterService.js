define('services/filterService', function(require, exports, module) {

  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var store = require('services/storeService');
  avalon.filters.showPrices = function (priceList) {
      var prices = '';
      if (!priceList) return prices;
      for (var i = 0; i < priceList.length; i++) {
          if (i !== 0) {
              prices += '，';
          }
          prices += priceList[i].discount_price + '/' + priceList[i].count_unit;
      }
      return prices;
  }
  avalon.filters.decodeHTML = function (str) {
      return decodeURIComponent(str);
  }
  avalon.filters.dict = function (str, name, index) {
      if (!store[name]) {
          avalon.error('数据源[' + name + ']似乎未定义，/services/storeService.js');
      }
      if (!store[name][index || 'dict']) {
          avalon.error('数据源[' + name + ']似乎未定义字典，/services/storeService.js');
      }
      if (index) {
          return store[name][index][str];
      } else {
          return store[name]['dict'][str];
      }
  }

});
