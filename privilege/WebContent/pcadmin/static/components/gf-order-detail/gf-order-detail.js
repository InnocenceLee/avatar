define('components/gf-order-detail/gf-order-detail', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  require('vendor/avx-component/avx-component');
  
  var currentState = mmState.currentState;
  var order = avalon.define({
      $id: 'gf-order-detail',
      '$data-box_config': {
          store: 'order-detail',
          actionBtns: {},
          processData: function (package, post) {
              post(function () {});
          },
          actions: {
              back: function () {
                  window.history.go(-1);
              }
          }
      },
      dataBoxInit: function (vm) {
          vm.loadData(function () {
              // 隐藏加载动画
              beyond.hideLoading();
          }, {
              id: currentState.params.id
          });
      }
  });
  
  // 导出模板
  exports.view = "<div class=\"row\" ms-controller=\"gf-order-detail\">\r\n    <div class=\"col-xs-12 col-md-12\">\r\n        <ms:data-box $id=\"data-box_order_detail\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\r\n            <div slot=\"content\" class=\"widget\">\r\n                <div class=\"widget-header bg-blue\">\r\n                    <span class=\"widget-caption\">订单详情</span>\r\n                </div>\r\n                <div class=\"widget-body\">\r\n                    <div class=\"table-toolbar\">\r\n                        <button class=\"btn btn-info\" ms-click=\"actions.back\">\r\n                            <span class=\"fa fa-back\">\r\n                            </span>返回\r\n                        </button>\r\n                    </div>\r\n                    <ms:table class=\"table table-hover table-bordered\">\r\n                        <ms:text-header slot=\"header\" col=\"name\" text=\"商品名称\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"price\" text=\"单价\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"buy_count\" text=\"数量\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"totleprice\" text=\"总价\"></ms:text-header>\r\n                        \r\n                    </ms:table>\r\n                    <ms:pagination current-page=\"1\"></ms:pagination>\r\n                </div>\r\n            </div>\r\n        </ms:data-box>\r\n    </div>\r\n</div>";
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
