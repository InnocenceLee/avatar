define('components/gf-tag/gf-tag', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  var ajax = require('services/ajaxService');
  
  require('vendor/avx-component/avx-component');
  
  var demo = avalon.define({
      $id: 'gf-tag',
      '$data-box_config': {
          store: 'tag',
          dialogId: 'dialog_tag',
          actionBtns: {
              operation: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.edit(el)"><i class="fa fa-edit"></i> 编辑</a> ' + 
                  '<a href="javascript:;" class="btn btn-danger btn-xs" ms-click="actions.del(el)"><i class="fa fa-trash-o"></i> 删除</a>'
          },
          processData: function (package, post) {
              // package包含一些状态数据和要提交要用到的数据
              console.log(package.isEdit ? '修改' : '新增', package.record);
              post(function (r) {
                  console.log(r);
              });
          }
      },
      '$dialog_config': {
          $validateFields: {
              label: {
                  validators: {
                      notEmpty: { message: '请填写名称' }
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
  var form = avalon.define({
      $id: 'gf-tag.form'
  });
  
  // 导出模板
  exports.view = "<div class=\"row\" ms-controller=\"gf-tag\">\n    <div class=\"col-xs-12 col-md-12\">\n        <ms:dialog $id=\"dialog_tag\" config=\"$dialog_config\" ms-skip>\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <form role=\"form\">\n                        <ms:control-text label=\"名称\" col=\"label\"></ms:control-text>\n                    </form>\n                </div>\n            </div>\n        </ms:dialog>\n        <ms:data-box $id=\"data-box_tag\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\n            <div slot=\"content\" class=\"widget\">\n                <div class=\"widget-header bg-blue\">\n                    <span class=\"widget-caption\">标签列表</span>\n                </div>\n                <div class=\"widget-body\">\n                    <form class=\"form-inline\">\n                        <ms:search-item label=\"名称\" col=\"label\"></ms:search-item>\n                        <ms:search-button class=\"btn btn-info\">搜索</ms:search-button>\n                    </form>\n                    <div class=\"table-toolbar\">\n                        <button class=\"btn btn-info\" ms-click=\"actions.add\">\n                            <span class=\"fa fa-plus\">\n                            </span>新增标签\n                        </button>\n                    </div>\n                    <ms:table class=\"table table-hover table-bordered\">\n                        <ms:text-header slot=\"header\" col=\"id\" text=\"ID\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"label\" text=\"名称\"></ms:text-header>\n                        <ms:action-header slot=\"header\" text=\"操作\"></ms:action-header>\n                    </ms:table>\n                    <ms:pagination current-page=\"1\" page-count=\"4\"></ms:pagination>\n                </div>\n            </div>\n        </ms:data-box>\n    </div>\n</div>";
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
