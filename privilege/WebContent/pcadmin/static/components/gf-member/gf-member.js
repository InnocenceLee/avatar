define('components/gf-member/gf-member', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  var ajax = require('services/ajaxService');
  
  require('vendor/avx-component/avx-component');
  
  var demo = avalon.define({
      $id: 'gf-member',
      '$data-box_config': {
          store: 'member',
          dialogId: 'dialog_member',
          actionBtns: {
              operation: '<a href="javascript:;" class="btn btn-danger btn-xs" ms-click="actions.del(el)"><i class="fa fa-trash-o"></i> 删除</a>'
          },
          processData: function (package, post) {
              // package包含一些状态数据和要提交要用到的数据
              console.log(package.isEdit ? '修改' : '新增', package.record);
              post(function (r) {
                  console.log(r);
              });
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
      $id: 'gf-member.form'
  });
  
  // 导出模板
  exports.view = "<div class=\"row\" ms-controller=\"gf-member\">\n\n\n    <div class=\"col-xs-12 col-md-12\">\n    <ms:dialog $id=\"dialog_member\" ms-skip>\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <form role=\"form\">\n                        <ms:control-text label=\"评论\" col=\"name\"></ms:control-text>\n                    </form>\n                </div>\n            </div>\n        </ms:dialog>\n        <ms:data-box $id=\"data-box_member\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\n            <div slot=\"content\" class=\"widget\">\n                <div class=\"widget-header bg-blue\">\n                    <span class=\"widget-caption\">会员列表</span>\n                </div>\n                <div class=\"widget-body\">\n                    <form class=\"form-inline\">\n                        <ms:search-item label=\"名称\" col=\"name\"></ms:search-item>\n\t\t\t\t\t\t<ms:search-item label=\"类型\" col=\"type\"></ms:search-item>\n\t\t\t\t\t\t  <!--<<ms:search-item-datepicker label=\"注册时间\" col=\"\"></ms:search-item-datepicker>>-->\n\t\t\t\t\t\t\n                        <ms:search-button class=\"btn btn-info\">搜索</ms:search-button>\n                    </form>\n                    <div class=\"table-toolbar\">\n                        <!--<button class=\"btn btn-info\" ms-click=\"actions.add\">\n                            <span class=\"fa fa-plus\">\n                            </span>批量导入手机账号\n                        </button>-->\n                    </div>\n                    <ms:table class=\"table table-hover table-bordered\">\n                        <!--<ms:check-header slot=\"header\" col=\"id\" width=\"60\"></ms:check-header>-->\n                        <ms:text-header slot=\"header\" col=\"id\" text=\"ID\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"name\" text=\"会员名称\"></ms:text-header>\n\t\t\t\t\t\t<ms:text-header slot=\"header\" col=\"createtime\" text=\"注册时间\"></ms:text-header>\n\t\t\t\t\t\t<ms:text-header slot=\"header\" col=\"type\" text=\"账号类型\"></ms:text-header>\n\t\t\t\t\t\t<ms:text-header slot=\"header\" col=\"mobile\" text=\"手机号/QQ号/微信号/微博号\"></ms:text-header>\n                        <ms:action-header slot=\"header\" text=\"操作\"></ms:action-header>\n                    </ms:table>\n                    <ms:pagination current-page=\"1\"></ms:pagination>\n                </div>\n            </div>\n        </ms:data-box>\n    \n    </div>\n</div>";
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
