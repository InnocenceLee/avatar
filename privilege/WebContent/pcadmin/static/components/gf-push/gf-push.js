define('components/gf-push/gf-push', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  var ajax = require('services/ajaxService');
  
  require('vendor/avx-component/avx-component');
  var itemSelector = require('components/gf-select-item/gf-select-item');
  var contentSelector = require('components/gf-select-content/gf-select-content');
  
  var demo = avalon.define({
      $id: 'gf-push',
      '$data-box_config': {
          store: 'push',
          dialogId: 'dialog_push',
          actionBtns: {
              operation: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.edit(el)"><i class="fa fa-edit"></i> 编辑</a> ' + 
                  '<a href="javascript:;" class="btn btn-danger btn-xs" ms-click="actions.del(el)"><i class="fa fa-trash-o"></i> 删除</a>'
          },
          processData: function (package, post) {
              post(function () {});
          }
      },
      '$dialog_config': {
          $validateFields: {
              title: {
                  validators: {
                      notEmpty: { message: '请填写标题' }
                  }
              },
              view_mode: {
                  validators: {
                      notEmpty: { message: '请选择模式' }
                  }
              },
              picture: {
                  validators: {
                      notEmpty: { message: '请选择图片' },
                      uri: { message: '格式不正确，请重新上传' }
                  }
              },
              postd: {
                  validators: {
                      notEmpty: { message: '请选择发布时间' }
                  }
              }
          }
      },
      dataBoxInit: function (vm) {
          var dialogVm = avalon.vmodels['dialog_push'];
          vm.loadData(function () {
              // 隐藏加载动画
              beyond.hideLoading();
          });
          dialogVm.state = {
              type: 'G',
              choose: function () {
                  if (dialogVm.state.type == 'G') {
                      itemSelector.open({ isMultiSelect: false }, function (selected) {
                          dialogVm.record.item = selected.id;
                          dialogVm.record.name = selected.name;
                      });
                  } else {
                      contentSelector.open({ isMultiSelect: false }, function (selected) {
                          dialogVm.record.item = selected.id;
                          dialogVm.record.name = selected.name;
                      });
                  }
              }
          };
      }
  });
  
  // 导出模板
  exports.view = "<div class=\"row\" ms-controller=\"gf-push\">\n    <div class=\"col-xs-12 col-md-12\">\n        <ms:dialog $id=\"dialog_push\" config=\"$dialog_config\" ms-skip>\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <form role=\"form\">\n                        <ms:control-text label=\"标题\" col=\"title\"></ms:control-text>\n                        <ms:control-textarea label=\"副标题\" col=\"sub_title\" rows=\"4\"></ms:control-textarea>\n                        <ms:control-select label=\"标签\" duplex=\"el\" store=\"tag\" col-key=\"label\" col-val=\"label\" ms-repeat=\"record.tags\"></ms:control-select>\n                        <ms:control-select label=\"模式\" col=\"view_mode\">\n                            <option value=\"L\">大图</option>\n                            <option value=\"T\">小图</option>\n                        </ms:control-select>\n                        <ms:control-file label=\"上传图片\" col=\"picture\" placeholder=\"建议尺寸：750 x 420(大图) 220 x 300(小图)\"></ms:control-file>\n                        <ms:control-datetimepicker label=\"发布时间\" col=\"postd\"></ms:control-datetimepicker>\n                        <ms:control-text ms-visible=\"false\" col=\"item\"></ms:control-text>\n                        <div class=\"form-title\">推送内容</div>\n                        <ms:control-select label=\"类型\" duplex=\"state.type\">\n                            <option value=\"G\">物品</option>\n                            <option value=\"A\">内容</option>\n                        </ms:control-select>\n                        <div class=\"form-group\">\n                            <label>已选择</label>\n                            <div class=\"input-group\">\n                                <input type=\"text\" class=\"form-control\" ms-duplex=\"record.name\" disabled>\n                                <span class=\"input-group-btn\">\n                                    <button class=\"btn btn-info\" type=\"button\" ms-click=\"state.choose\">选择</button>\n                                </span>\n                            </div>\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </ms:dialog>\n        <ms:data-box $id=\"data-box_push\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\n            <div slot=\"content\" class=\"widget\">\n                <div class=\"widget-header bg-blue\">\n                    <span class=\"widget-caption\">每日有料列表</span>\n                </div>\n                <div class=\"widget-body\">\n                    <form class=\"form-inline\">\n                        <ms:search-item label=\"名称\" col=\"title\"></ms:search-item>\n                        <ms:search-item-select label=\"类型\" col=\"type\">\n                            <option value=\"\">-选择-</option>\n                            <option value=\"G\">物品</option>\n                            <option value=\"A\">内容</option>\n                        </ms:search-item-select>\n                        <ms:search-item-select label=\"模式\" col=\"view_mode\">\n                            <option value=\"\">-选择-</option>\n                            <option value=\"L\">大图</option>\n                            <option value=\"T\">小图</option>\n                        </ms:search-item-select>\n                        <!--<ms:search-item-datepicker label=\"时间\" col=\"postd\"></ms:search-item-datepicker>-->\n                        <ms:search-button class=\"btn btn-info\">搜索</ms:search-button>\n                    </form>\n                    <div class=\"table-toolbar\">\n                        <!--<button class=\"btn btn-info\" ms-click=\"actions.add\">\n                            <span class=\"fa fa-plus\">\n                            </span>新增推送\n                        </button>-->\n                    </div>\n                    <ms:table class=\"table table-hover table-bordered\">\n                        <ms:text-header slot=\"header\" col=\"type | dict('item','typeDict')\" text=\"类型\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"title\" text=\"名称\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"view_mode | dict('push')\" text=\"模式\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"postd | date('yyyy-MM-dd HH:mm:ss')\" text=\"发布时间\"></ms:text-header>\n                        <ms:action-header slot=\"header\" text=\"操作\"></ms:action-header>\n                    </ms:table>\n                    <ms:pagination current-page=\"1\"></ms:pagination>\n                </div>\n            </div>\n        </ms:data-box>\n    </div>\n</div>";
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
