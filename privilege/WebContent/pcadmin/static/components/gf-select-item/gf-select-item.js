define('components/gf-select-item/gf-select-item', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  var ajax = require('services/ajaxService');
  
  require('vendor/avx-component/avx-component');
  
  var dialogVm = null;
  var selectorVm = avalon.define({
      $id: 'gf-select-item',
      dialogInit: function (vm) {
          dialogVm = vm;
      }
  });
  var dataVm = avalon.define({
      $id: 'gf-select-item_data',
      '$data-box_config': {
          store: 'item',
          actionBtns: {
              operation: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.choose(el)"><i class="fa fa-edit"></i> 选择</a>'
          },
          actions: {
              choose: function (record) {
                  var successed = dialogVm.$post({
                      record: record,
                      isSingleSelect: true
                  });
                  if (successed) {
                      dialogVm.show = false;
                  }
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
  $('#dialog_layer').append("<div ms-controller=\"gf-select-item\">\r\n    <ms:dialog $id=\"dialog_select_item\" ms-skip on-init=\"dialogInit\">\r\n        <span slot=\"header\">选择商品</span>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\" ms-controller=\"gf-select-item_data\">\r\n                <ms:data-box $id=\"data-box_select_item\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\r\n                    <div slot=\"content\">\r\n                        <form class=\"form-inline\">\r\n                            <ms:search-item label=\"名称\" col=\"name\"></ms:search-item>\r\n                            <ms:search-item-select label=\"类别\" col=\"catalog\" store=\"category\"></ms:search-item-select>\r\n                            <ms:search-item label=\"单价\" col=\"price\"></ms:search-item>\r\n                        </form>\r\n                        <br>\r\n                        <form class=\"form-inline\">\r\n                            <ms:search-item-select label=\"状态\" col=\"state\">\r\n                                <option value=\"\">-选择-</option>\r\n                                <option value=\"S\">下架</option>\r\n                                <option value=\"U\">上架</option>\r\n                            </ms:search-item-select>\r\n                            <ms:search-button class=\"btn btn-info\">搜索</ms:search-button>\r\n                        </form>\r\n                        <ms:table class=\"table table-hover table-bordered\">\r\n                            <ms:check-header slot=\"header\" col=\"id\" width=\"60\"></ms:check-header>\r\n                            <ms:text-header slot=\"header\" col=\"name\" text=\"商品名称\"></ms:text-header>\r\n                            <ms:text-header slot=\"header\" col=\"catalog | dict('item', 'catalogDict')\" text=\"类别\"></ms:text-header>\r\n                            <ms:text-header slot=\"header\" col=\"price\" text=\"单价\"></ms:text-header>\r\n                            <ms:text-header slot=\"header\" col=\"store_count\" text=\"剩余数量\"></ms:text-header>\r\n                            <ms:text-header slot=\"header\" col=\"state | dict('item')\" text=\"状态\"></ms:text-header>\r\n                            <ms:action-header slot=\"header\" text=\"操作\"></ms:action-header>\r\n                        </ms:table>\r\n                        <ms:pagination current-page=\"1\"></ms:pagination>\r\n                    </div>\r\n                </ms:data-box>\r\n            </div>\r\n        </div>\r\n    </ms:dialog>\r\n</div>");
  avalon.scan($('#dialog_layer').get(0), selectorVm);
  // 导出逻辑
  exports.open = function (prop, cb) {
      if (dialogVm) {
          dialogVm.show = true;
          dialogVm.state = {
              isMultiSelect: prop.isMultiSelect
          };
          dialogVm.$post = function (package) {
              var selected;
              var containerVm = avalon.vmodels['data-box_select_item'], checked = containerVm.$model.checked;
              var list = containerVm.list.$model;
              if (package.isSingleSelect) {
                  cb(prop.isMultiSelect ? [package.record.$model] : package.record.$model);
              } else {
                  selected = [];
                  for (var i = 0, item; item = list[i]; i++) {
                      for (var j = 0, checkedId; checkedId = checked[j]; j++) {
                          if (checkedId == item.id) {
                              selected.push(item);
                          }
                      }
                  }
                  if (selected.length == 0) {
                      Notify('请至少选择一项', 'top-right', '5000', 'warning', 'fa-warning', true);
                      return false;
                  }
                  cb(prop.isMultiSelect ? selected : selected[0]);
              }
              return true;
          }
      }
  }

});
