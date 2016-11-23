define('components/gf-order-unpay/gf-order-unpay', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  var ajax = require('services/ajaxService');
  var store = require('services/storeService');
  
  require('vendor/avx-component/avx-component');
  
  var order = avalon.define({
      $id: 'gf-order-unpay',
      '$data-box_config': {
          store: 'order-unpay',
          actionBtns: {
              operation: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.cancel(el)"><i class="fa fa-edit"></i> 取消订单</a>',
              detail: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.detail(el)"><i class="fa fa-edit"></i> 查看详情</a>'
          },
          processData: function (package, post) {
              post(function () {});
          },
          actions: {
              detail: function (record) {
                  var orderStore = store[order['$data-box_config'].store];
                  avalon.router.navigate('order_detail/' + record[orderStore.key]);
              },
              cancel: function (record) {
                  var orderStore = store[order['$data-box_config'].store];
                  orderStore.cancel(record[orderStore.key]).then(function (r) {
                      if (r.code == '0') {
                          avalon.vmodels['data-box_order_unpay'].loadData();
                          Notify('取消成功', 'top-right', '5000', 'success', 'fa-check', true);
                      }
                  });
              }
          }
      },
      dataBoxInit: function (vm) {
          vm.loadData(function () {
              // 隐藏加载动画
              beyond.hideLoading();
          });
      }
  });
  
  // 导出模板
  exports.view = "<div class=\"row\" ms-controller=\"gf-order-unpay\">\r\n    <div class=\"col-xs-12 col-md-12\">\r\n        <ms:data-box $id=\"data-box_order_unpay\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\r\n            <div slot=\"content\" class=\"widget\">\r\n                <div class=\"widget-header bg-blue\">\r\n                    <span class=\"widget-caption\">未付款订单列表</span>\r\n                </div>\r\n                <div class=\"widget-body\">\r\n                    <form class=\"form-inline\">\r\n                        <ms:search-item label=\"订单编号\" col=\"order_no\"></ms:search-item>\r\n                        <ms:search-item label=\"收货人\" col=\"name\"></ms:search-item>\r\n                        <ms:search-item label=\"电话\" col=\"phone\"></ms:search-item>\r\n                    </form>\r\n                    <br>\r\n                    <form class=\"form-inline\">\r\n                        <ms:search-item label=\"地址\" col=\"address\"></ms:search-item>\r\n                        <ms:search-button class=\"btn btn-info\">搜索</ms:search-button>\r\n                    </form>\r\n                    <div class=\"table-toolbar\"></div>\r\n                    <ms:table class=\"table table-hover table-bordered\">\r\n                        <ms:text-header slot=\"header\" col=\"order_no\" text=\"订单编号\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"orderd | date('yyyy-MM-dd HH:mm:ss')\" text=\"下单时间\"></ms:text-header>\r\n                        <ms:action-header slot=\"header\" text=\"商品详情\" action-type=\"detail\"></ms:action-header>\r\n                        <ms:text-header slot=\"header\" col=\"receive_info.name\" text=\"收货人姓名\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"total\" text=\"总价\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"receive_info.phone\" text=\"电话\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"receive_info.address\" text=\"地址\"></ms:text-header>\r\n                        <ms:action-header slot=\"header\" text=\"操作\"></ms:action-header>\r\n                    </ms:table>\r\n                    <ms:pagination current-page=\"1\"></ms:pagination>\r\n                </div>\r\n            </div>\r\n        </ms:data-box>\r\n    </div>\r\n</div>";
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
