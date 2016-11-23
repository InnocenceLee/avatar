define('components/gf-order-unsend/gf-order-unsend', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  var ajax = require('services/ajaxService');
  var store = require('services/storeService');
  
  require('vendor/avx-component/avx-component');
  
  var dialogVm;
  var order = avalon.define({
      $id: 'gf-order-unsend',
      '$data-box_config': {
          store: 'order-unsend',
          actionBtns: {
              operation: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.send(el)"><i class="fa fa-edit"></i> 发货</a>',
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
              send: function (record) {
                  dialogVm.title = '填写运单信息';
                  dialogVm.record = { id: record.id, logistics_no: '' };
                  dialogVm.$post = function (package) {
                      if (!dialogVm.$beforePost()) {
                          return false;
                      }
                      if (dialogVm.uploading) return false;
                      dialogVm.uploading = true;
                      var orderStore = store[order['$data-box_config'].store];
                      store['order-unsend'].send({ id: package.record.id, logistics_no: package.record.logistics_no }).then(function (r) {
                          if (r.code == '0') {
                              avalon.vmodels['data-box_order_unsend'].loadData();
                              Notify('发货成功', 'top-right', '5000', 'success', 'fa-check', true);
                              dialogVm.show = false;
                              setTimeout(function () { dialogVm.uploading = false; }, 1000);
                          }
                      });
                      return false;
                  }
                  dialogVm.show = true;
              }
          }
      },
      '$dialog_express_config': {
          $validateFields: {
              logistics_no: {
                  excluded: false,
                  validators: {
                      notEmpty: { message: '请填写运单号' }
                  }
              }
          }
      },
      dataBoxInit: function (vm) {
          dialogVm = avalon.vmodels['dialog_express'];
          vm.loadData(function () {
              // 隐藏加载动画
              beyond.hideLoading();
          });
      }
  });
  
  // 导出模板
  exports.view = "<div class=\"row\" ms-controller=\"gf-order-unsend\">\r\n    <div class=\"col-xs-12 col-md-12\">\r\n        <ms:dialog $id=\"dialog_express\" config=\"$dialog_express_config\" ms-skip>\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12\">\r\n                    <form role=\"form\">\r\n                        <ms:control-text label=\"运单号\" col=\"logistics_no\"></ms:control-text>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </ms:dialog>\r\n        <ms:data-box $id=\"data-box_order_unsend\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\r\n            <div slot=\"content\" class=\"widget\">\r\n                <div class=\"widget-header bg-blue\">\r\n                    <span class=\"widget-caption\">待发货订单列表</span>\r\n                </div>\r\n                <div class=\"widget-body\">\r\n                    <form class=\"form-inline\">\r\n                        <ms:search-item label=\"订单编号\" col=\"order_no\"></ms:search-item>\r\n                        <ms:search-item label=\"收货人\" col=\"name\"></ms:search-item>\r\n                        <ms:search-item label=\"电话\" col=\"phone\"></ms:search-item>\r\n                    </form>\r\n                    <br>\r\n                    <form class=\"form-inline\">\r\n                        <ms:search-item label=\"地址\" col=\"address\"></ms:search-item>\r\n                           <ms:search-item-select label=\"是否催单\" col=\"urging\">\r\n                            <option value=\"\">-选择-</option>\r\n                            <option value=\"Y\">已催单</option>\r\n                            <option value=\"N\">未催单</option>\r\n                        </ms:search-item-select>\r\n                        <ms:search-button class=\"btn btn-info\">搜索</ms:search-button>\r\n                    </form>\r\n                    <div class=\"table-toolbar\"></div>\r\n                    <ms:table class=\"table table-hover table-bordered\">\r\n                        <ms:text-header slot=\"header\" col=\"order_no\" text=\"订单编号\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"payd | date('yyyy-MM-dd HH:mm:ss')\" text=\"付款时间\"></ms:text-header>\r\n                        <ms:action-header slot=\"header\" text=\"商品详情\" action-type=\"detail\"></ms:action-header>\r\n                        <ms:text-header slot=\"header\" col=\"total\" text=\"总价\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"receive_info.name\" text=\"收货人姓名\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"receive_info.phone\" text=\"电话\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"receive_info.address\" text=\"地址\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"urging | dict('order-unsend')\" text=\"是否催单\"></ms:text-header>\r\n                        <ms:action-header slot=\"header\" text=\"操作\"></ms:action-header>\r\n                    </ms:table>\r\n                    <ms:pagination current-page=\"1\"></ms:pagination>\r\n                </div>\r\n            </div>\r\n        </ms:data-box>\r\n    </div>\r\n</div>";
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
