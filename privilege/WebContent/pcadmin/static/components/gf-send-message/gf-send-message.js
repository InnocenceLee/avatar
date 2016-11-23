define('components/gf-send-message/gf-send-message', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  var ajax = require('services/ajaxService');
  
  require('vendor/avx-component/avx-component');
  var itemSelector = require('components/gf-select-item/gf-select-item');
  var contentSelector = require('components/gf-select-content/gf-select-content');
  
  var dataVm, dialogVm;
  avalon.filters.url2action = function (url) {
      if (url.indexOf('good') === 0) {  
          return '打开商品详情页';
      } else if (url.indexOf('article') === 0) {
          return '打开文章页';
      } else {
          return '打开网址';
      }
  }
  var message = avalon.define({
      $id: 'gf-send-message',
      '$data-box_config': {
          store: 'send-message',
          dialogId: 'dialog_send_message',
          actionBtns: {
              operation: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.preEdit(el)"><i class="fa fa-edit"></i> 编辑</a> ' + 
                  '<a href="javascript:;" class="btn btn-danger btn-xs" ms-click="actions.del(el)"><i class="fa fa-trash-o"></i> 删除</a>'
          },
          actions: {
          	preEdit: function (record) {
  	            var url = record.action;
                  var pureRecord = { $model: record.$model };
  	            if (url.indexOf('good') === 0) {
  	                dialogVm.state.chooseType = 'good';
  	            } else if (url.indexOf('article') === 0) {
  	                dialogVm.state.chooseType = 'article';
  	            } else {
  	                dialogVm.state.chooseType = 'channel';
  	            }
                  var type = dialogVm.state.chooseType;
                  pureRecord.$model.itemName = pureRecord.$model.name || '';
                  dialogVm.$cache.choose = {};
                  dialogVm.$cache.choose[type] = {};
                  dialogVm.$cache.choose[type].item = pureRecord.$model.item;
                  dialogVm.$cache.choose[type].itemName = pureRecord.$model.itemName;
                  dialogVm.$cache.choose[type].action = pureRecord.$model.action;
  	            dataVm.actions.edit.call(this, pureRecord);
  	        },
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
              itemName: {
                  validators: {
                      notEmpty: { message: '请选择' }
                  }
              },
              action: {
                  validators: {
                      notEmpty: { message: '请填写网址' },
                      uri: { message: '格式不正确，例：http://www.baidu.com' }
                  }
              },
              title: {
                  validators: {
                      notEmpty: { message: '请填写标题' }
                  }
              },
              content: {
                  validators: {
                      notEmpty: { message: '请填写内容' }
                  }
              },
              pushd: {
                  validators: {
                      notEmpty: { message: '请选择发布时间' }
                  }
              }
          }
      },
      dataBoxInit: function (vm) {
          dataVm = vm;
          dialogVm = avalon.vmodels['dialog_send_message'];
          vm.loadData(function () {
              // 隐藏加载动画
              beyond.hideLoading();
          });
          dialogVm.state = {
              chooseType: 'good',
              choose: function () {
                  var typePathMap = {
                      G: 'good',
                      A: 'article',
                      C: 'channel'
                  };
                  var $input = $(this).closest('div.input-group').find('input[name=itemName]');
                  if (dialogVm.state.chooseType == 'good') {
                      itemSelector.open({ isMultiSelect: false }, function (selected) {
                          dialogVm.record.action = 'good/' + selected.id;
                          dialogVm.record.itemName = selected.name;
                          dialogVm.record.item = selected.id;
                          avalon.nextTick(function () {
                              $input.trigger('input');
                          });
                      });
                  } else {
                      contentSelector.open({ isMultiSelect: false }, function (selected) {
                          dialogVm.record.action = 'article/' + selected.id;
                          dialogVm.record.itemName = selected.name;
                          dialogVm.record.item = selected.id;
                          avalon.nextTick(function () {
                              $input.trigger('input');
                          });
                      });
                  }
              }
          };
          dialogVm.$watch('state.chooseType', function (v, oldV) {
              if (!dialogVm.$cache.choose) {
                  dialogVm.$cache.choose = {};
              }
              if (!dialogVm.isEdit) {
                  // 如果是添加，则直接清空数据
                  if (v == 'channel') {
                      dialogVm.record.item = null;
                      dialogVm.record.itemName = '';
                      dialogVm.record.action = '';
                  } else {
                      dialogVm.record.item = null;
                      dialogVm.record.itemName = '';
                      dialogVm.record.action = '';
                  }
              } else {
                  var cacheLet = {};
                  cacheLet.item = dialogVm.record.$model.item;
                  cacheLet.itemName = dialogVm.record.$model.itemName;
                  cacheLet.action = dialogVm.record.$model.action;
                  // 如果是修改，则使用缓存的数据
                  if (dialogVm.$cache.choose && dialogVm.$cache.choose[v]) {
                      avalon.mix(true, dialogVm.record, dialogVm.$cache.choose[v]);
                  } else {
                      avalon.mix(true, dialogVm.record, {
                          item: 0,
                          itemName: '',
                          action: ''
                      });
                  }
                  // 然后更新缓存
                  dialogVm.$cache.choose[oldV] = cacheLet;
              }
              dialogVm.valid = true;
              dialogVm.resetForm(false);
          });
      }
  });
  
  // 导出模板
  exports.view = "<div class=\"row\" ms-controller=\"gf-send-message\">\n    <div class=\"col-xs-12 col-md-12\">\n        <ms:dialog $id=\"dialog_send_message\" config=\"$dialog_config\" ms-skip>\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <form role=\"form\" data-bv-excluded=\":hidden, :not(:visible)\">\n\t\t\t\t\t\t<ms:control-select label=\"动作\" duplex=\"state.chooseType\">\n                            <option value=\"good\">打开商品详情页</option>\n                            <option value=\"article\">打开文章页</option>\n                            <option value=\"channel\">打开网址</option>\n                        </ms:control-select>\n                        <div class=\"form-group\" ms-visible=\"state.chooseType == 'article' || state.chooseType == 'good'\">\n                            <input type=\"hidden\" class=\"form-control\" ms-duplex=\"record.item\">\n                            <label>选择{{ state.chooseType == 'good' ? '商品' : '文章' }}</label>\n                            <div class=\"input-group\">\n                                <input type=\"text\" class=\"form-control\" name=\"itemName\" ms-duplex=\"record.itemName\" disabled>\n                                <span class=\"input-group-btn\">\n                                    <button class=\"btn btn-info\" type=\"button\" ms-click=\"state.choose\">选择</button>\n                                </span>\n                            </div>\n                        </div>\n                        <div ms-visible=\"state.chooseType == 'channel'\">\n                            <ms:control-text label=\"网址\" col=\"action\"></ms:control-text>\n                        </div>\n                        <ms:control-text label=\"标题\" col=\"title\"></ms:control-text>\n                        <ms:control-textarea label=\"内容\" col=\"content\" rows=\"4\"></ms:control-textarea>\n                        <ms:control-datetimepicker label=\"发布时间\" col=\"pushd\"></ms:control-datetimepicker>\n                    </form>\n                </div>\n            </div>\n        </ms:dialog>\n        <ms:data-box on-init=\"dataBoxInit\" config=\"$data-box_config\">\n            <div slot=\"content\" class=\"widget\">\n                <div class=\"widget-header bg-blue\">\n                    <span class=\"widget-caption\">推送列表</span>\n                </div>\n                <div class=\"widget-body\">\n                    <form class=\"form-inline\">\n                        <ms:search-item-select label=\"动作\" col=\"action\">\n                            <option value=\"\">-选择-</option>\n                            <option value=\"good\">打开商品详情页</option>\n                            <option value=\"article\">打开文章页</option>\n                            <option value=\"channel\">打开网址</option>\n                        </ms:search-item-select>\n                        <ms:search-button class=\"btn btn-info\">搜索</ms:search-button>\n                    </form>\n                    <div class=\"table-toolbar\" >\n                        <button class=\"btn btn-info\" ms-click=\"actions.add\">\n                            <span class=\"fa fa-plus\">\n                            </span>新增\n                        </button>\n                    </div>\n                    <ms:table class=\"table table-hover table-bordered\">\n                        <ms:text-header slot=\"header\" col=\"action | url2action\" text=\"动作\"></ms:text-header>\n                        <ms:table-header slot=\"header\" col=\"action\" text=\"商品/文章/地址\">\n                            {{el.item ? el.name : el.action}}\n                        </ms:table-header>\n                        <ms:text-header slot=\"header\" col=\"title\" text=\"标题\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"content\" text=\"内容\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"pushd | date('yyyy-MM-dd HH:mm:ss')\" text=\"推送时间\"></ms:text-header>\n                        <ms:action-header slot=\"header\" text=\"操作\"></ms:action-header>\n                    </ms:table>\n                    <ms:pagination current-page=\"1\" ></ms:pagination>\n                </div>\n            </div>\n        </ms:data-box>\n    </div>  \n</div>";
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
