define('components/gf-subscribe-order/gf-subscribe-order', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  var ajax = require('services/ajaxService');
  var store = require('services/storeService');
  
  require('vendor/avx-component/avx-component');
  
  var dataVm;
  var demo = avalon.define({
      $id: 'gf-subscribe-order',
      '$data-box_config': {
          store: 'subscribe_order'
      },
      dataBoxInit: function (vm) {
          dataVm = vm;
          vm.loadData(function () {
              // 隐藏加载动画
              beyond.hideLoading();
          });
      }
  });
  
  // 导出模板
  exports.view = "<div class=\"row\" ms-controller=\"gf-subscribe-order\">\n    <div class=\"col-xs-12 col-md-12\">\n        <ms:data-box $id=\"data-box_subscribe_order\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\n            <div slot=\"content\" class=\"widget\">\n                <div class=\"widget-header bg-blue\">\n                    <span class=\"widget-caption\">订阅订单列表</span>\n                </div>\n                <div class=\"widget-body\">\n                    <form class=\"form-inline\">\n                        <ms:search-item label=\"专栏名称\" col=\"itemName\"></ms:search-item>\n                        <ms:search-item label=\"订阅者姓名\" col=\"personName\"></ms:search-item>\n                        <ms:search-button class=\"btn btn-info\">搜索</ms:search-button>\n                    </form>\n                    <div class=\"table-toolbar\">\n                    </div>\n                    <ms:table class=\"table table-hover table-bordered\">\n                        <ms:text-header slot=\"header\" col=\"itemname\" text=\"专栏名称\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"mobile\" text=\"订阅者帐号\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"orderd | date('yyyy-MM-dd HH:mm:ss')\" text=\"订阅时间\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"personname\" text=\"订阅者姓名\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"order_no\" text=\"订单号\"></ms:text-header>\n                    </ms:table>\n                    <ms:pagination current-page=\"1\"></ms:pagination>\n                </div>\n            </div>\n        </ms:data-box>\n    </div>\n</div>";
  // 导出逻辑
  exports.controller = avalon.controller(function($ctrl) {
      $ctrl.$onRendered = function() {
      }
      $ctrl.$onEnter = function(params, rs) {
      }
      $ctrl.$onBeforeUnload = function(oldState, newState) {
      }
      $ctrl.$vmodels = [];
  });

});
