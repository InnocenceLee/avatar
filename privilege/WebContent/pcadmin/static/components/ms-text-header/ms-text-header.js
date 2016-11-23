define('components/ms-text-header/ms-text-header', function(require, exports, module) {

  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  
  avalon.component('ms:textHeader', {
      $template: '<span>{{text}}</span>',
      $replace: 1,
      $init: function (vm) {
      },
      text: '',
      width: '',
      containerVmId: ''
  });

});
