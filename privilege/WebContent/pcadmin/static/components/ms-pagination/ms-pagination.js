define('components/ms-pagination/ms-pagination', function(require, exports, module) {

  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  
  var limit = 10;
  avalon.component('ms:pagination', {
      $template: "<div class=\"clearfix\" style=\"width:100%;margin-top:10px\">\n    <div class=\"btn-group pull-right\">\n        <a class=\"btn blue\" ms-attr-disabled=\"currentPage===1\" ms-click=\"prevPage\">\n            <i class=\"icon-step-backward\"></i>上一页\n        </a>\n        <a class=\"btn success\">{{ currentPage }}/{{ Math.ceil(total/limit) }}</a>\n        <a class=\"btn blue\" ms-attr-disabled=\"currentPage===Math.ceil(total/limit)\" ms-click=\"nextPage\">\n            <i class=\"icon-step-forward\"></i>下一页\n        </a>\n    </div>\n</div>",
      $replace: 1,
      $init: function (vm) {
          vm.prevPage = function () {
              var containerVm = avalon.vmodels[vm.$containerVmId];
              if (vm.currentPage > 1) {
                  var page = {
                      start: (--vm.currentPage-1) * limit,
                      limit: limit
                  };
                  containerVm.loadData(function () {
                      containerVm.$query = avalon.mix(containerVm.$query, page);
                  }, page);
              }
          }
          vm.nextPage = function () {
              var containerVm = avalon.vmodels[vm.$containerVmId];
              if (vm.currentPage < Math.ceil(containerVm.total/vm.limit)) {
                  var page = {
                      start: (++vm.currentPage-1) * limit,
                      limit: limit
                  };
                  containerVm.loadData(function () {
                      containerVm.$query = avalon.mix(containerVm.$query, page);
                  }, page);
              }
          }
      },
      $ready: function (vm) {
          var containerVm = avalon.vmodels[vm.$containerVmId];
          containerVm.$query.limit = limit;
          containerVm.$watch('total', function (newV, oldV) {
              if (newV == 0) {
                  containerVm.total = 1;
              }
          });
      },
      currentPage: 1,
      pageCount: 1,
      limit: limit,
      prevPage: avalon.noop,
      nextPage: avalon.noop,
      $containerVmId: ''
  });

});
