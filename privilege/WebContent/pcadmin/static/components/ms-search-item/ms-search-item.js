define('components/ms-search-item/ms-search-item', function(require, exports, module) {

  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  
  avalon.component('ms:searchItem', {
      $template: "<div class=\"form-group\">\r\n    <label class=\"control-label\">{{label}}</label>\r\n    <input type=\"text\" class=\"form-control\" ms-duplex=\"val\" ms-attr-name=\"col\">\r\n</div>",
      $replace: 1,
      $init: function (vm) {
          vm.$watch('val', function (newV) {
              var containerVm = avalon.vmodels[vm.$containerVmId];
              containerVm.$dirtyQuery[vm.col] = newV;
          });
      },
      label: '',
      val: '',
      col: '',
      $containerVmId: ''
  });

});
