define('components/ms-table-header/ms-table-header', function(require, exports, module) {

  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  
  avalon.component('ms:tableHeader', {
      $template: '<span>{{text}}</span>',
      $replace: 1,
      $init: function (vm) {
      },
      text: '',
      width: '',
      containerVmId: ''
  });

});
