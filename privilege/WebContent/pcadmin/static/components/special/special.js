define('components/special/special', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('vendor/avalon/avalon');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  var ajax = require('services/ajaxService');
  
  require('vendor/avx-component/avx-component');
  
  require('vendor/uploadify/jquery.uploadify');
  require.loadCss({
      url: '/vendor/uploadify/uploadify.css'
  });
  
  
  var currentState = mmState.currentState;
  /**
   * data-box配置
   * @type component-config
   * @param store 数据源，对应/services/storeService.js中的配置
   * @param dialogId 指定表单的dialog，dialog定义在data-box的前面
   * @param actionBtns 表格中的操作按钮，其中edit和del是内置的方法，不需要另外定义，参数el代表当前行的数据
   * @param processData 在这个函数可以在提交数据前对数据进行处理，两个参数，package包含一些状态数据和要提交要用到的数据，post在执行后立即提交数据
   */
  var demo = avalon.define({
      $id: 'special',
      '$data-box_config': {
          store: 'special',
          dialogId: 'dialog_demo',
          actionBtns: {
              operation: '<a href="javascript:;" class="btn btn-link btn-xs" ms-click="actions.edit(el)"><i class="fa fa-edit"></i> 编辑</a> ' + 
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
  });
  
  // 导出模板
  exports.view = "<div class=\"row\" ms-controller=\"special\">\r\n\t   <ms:dialog $id=\"dialog_special\" ms-skip>\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12\">\r\n                    <form role=\"form\">\r\n                        <ms:control-text label=\"栏目名称\" col=\"name\"></ms:control-text>\r\n                        <ms:control-text label=\"学者姓名\" col=\"author_name\"></ms:control-text>\r\n                        <ms:control-text label=\"学者领域\" col=\"author_field\"></ms:control-text>\r\n                        <ms:control-text label=\"一句话简介\" col=\"brief\"></ms:control-text>\r\n                        <ms:control-text label=\"订阅数\" col=\"store_count\"></ms:control-text>\r\n                        <ms:control-text label=\"专栏头像图\" col=\"tag.thumb\"></ms:control-text>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </ms:dialog>\r\n        <ms:data-box $id=\"data-box_demo\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\r\n            <div slot=\"content\" class=\"widget\">\r\n                <div class=\"widget-header bg-blue\">\r\n                    <span class=\"widget-caption\">专栏列表</span>\r\n                </div>\r\n                <div class=\"widget-body\">\r\n                    <form class=\"form-inline\">\r\n                        <ms:search-item label=\"名称\" col=\"region_id\"></ms:search-item>\r\n                        <ms:search-item label=\"学者\" col=\"region_name\"></ms:search-item>\r\n                        <ms:search-item label=\"简介\" col=\"region_name\"></ms:search-item>\r\n                        <ms:search-button class=\"btn btn-info\">搜索</ms:search-button>\r\n                    </form>\r\n                    <div class=\"table-toolbar\">\r\n                        <button class=\"btn btn-info\" ms-click=\"actions.add\">\r\n                            <span class=\"fa fa-plus\">\r\n                            </span>新增栏目\r\n                        </button>\r\n                    </div>\r\n                    <ms:table class=\"table table-hover table-bordered\">\r\n                        <ms:check-header slot=\"header\" col=\"region_id\" width=\"60\"></ms:check-header>\r\n                        <ms:text-header slot=\"header\" col=\"$outer.$index + 1\" text=\"#\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"region_id\" text=\"ID\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"region_name\" text=\"名称\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"region_parent_id\" text=\"PID\"></ms:text-header>\r\n                        <ms:action-header slot=\"header\" text=\"操作\"></ms:action-header>\r\n                    </ms:table>\r\n                    <ms:pagination current-page=\"1\" page-count=\"4\"></ms:pagination>\r\n                </div>\r\n            </div>\r\n        </ms:data-box>\r\n    </div>\r\n</div>";
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
