define('components/ms-action-header/ms-action-header', function(require, exports, module) {

  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  
  avalon.component('ms:actionHeader', {
      $template: '<span>{{text}}</span>',
      $replace: 1,
      $init: function (vm) {
      },
      text: '',
      width: '',
      containerVmId: ''
  });

});
