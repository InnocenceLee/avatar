define('components/gf-adviertisement/gf-adviertisement', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  var ajax = require('services/ajaxService');
  var store = require('services/storeService');
  
  require('vendor/avx-component/avx-component');
  var imageSelector = require('components/gf-select-image/gf-select-image');
  var itemSelector = require('components/gf-select-item/gf-select-item');
  var contentSelector = require('components/gf-select-content/gf-select-content');
  
  avalon.filters.url2action = function (url) {
      if (url.indexOf('good') === 0) {  
          return '打开商品详情页';
      } else if (url.indexOf('article') === 0) {
          return '打开文章页';
      } else {
          return '打开网址';
      }
  }
  
  var dataVm, dialogVm;
  var demo = avalon.define({
      $id: 'gf-adviertisement',
      '$data-box_config': {
          store: 'adviertisement',
          dialogId: 'dialog_adviertisement',
          actionBtns: {
              showPic: '<img ms-attr-src="el.image" style="height: 100px;max-width: 500px;">',
              operation: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.preEdit(el)"><i class="fa fa-edit"></i> 修改</a> ' + 
              '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.upload(el)"><i class="fa fa-edit"></i> 上传图片</a> ' + 
                  '<a href="javascript:;" class="btn btn-danger btn-xs" ms-click="actions.del(el)"><i class="fa fa-trash-o"></i> 删除</a>'
          },
          actions: {
              preEdit: function (record) {
                  var url = record.url;
                  var pureRecord = { $model: record.$model };
                  if (url.indexOf('good') === 0) {  
                      dialogVm.state.chooseType = 'good';
                  } else if (url.indexOf('article') === 0) {
                      dialogVm.state.chooseType = 'article';
                  } else {
                      dialogVm.state.chooseType = 'channel';
                  }
                  var type = dialogVm.state.chooseType;
                  pureRecord.$model.itemName = pureRecord.$model.itemname || '';
                  dialogVm.$cache.choose = {};
                  dialogVm.$cache.choose[type] = {};
                  dialogVm.$cache.choose[type].item = pureRecord.$model.item;
                  dialogVm.$cache.choose[type].itemName = pureRecord.$model.itemName;
                  dialogVm.$cache.choose[type].action = pureRecord.$model.action;
                  dialogVm.$cache.choose[type].image = pureRecord.$model.image;
                  dataVm.actions.edit.call(this, pureRecord);
              },
              upload: function (record) {
                  var dataVm = avalon.vmodels['data-box_adviertisement'];
                  imageSelector.open({ }, function (selected) {
                      record.image = selected.image;
                      store['adviertisement'].update(record.$model).then(function (result) {
                          if (result.code == '0') {
                              Notify('修改成功', 'top-right', '5000', 'success', 'fa-check', true);
                              dataVm.loadData();
                          }
                      });
                  });
              }
          },
          processData: function (package, post) {
              post(function () {});
          }
      },
      '$dialog_config': {
          $validateFields: {
              itemName: {
                  validators: {
                      notEmpty: { message: '请选择' }
                  }
              },
              image: {
                  validators: {
                      notEmpty: { message: '请选择图片' }
                  }
              },
              url: {
                  validators: {
                      notEmpty: { message: '请填写网址' },
                      uri: { message: '格式不正确，例：http://www.baidu.com' }
                  }
              }
          }
      },
      dataBoxInit: function (vm) {
          dataVm = vm;
          dialogVm = avalon.vmodels['dialog_adviertisement'];
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
                          dialogVm.record.url = 'good/' + selected.id;
                          dialogVm.record.image = selected.tag.large_thumb;
                          dialogVm.record.itemName = selected.name;
                          dialogVm.record.item = selected.id;
                          avalon.nextTick(function () {
                              $input.trigger('input');
                          });
                      });
                  } else {
                      contentSelector.open({ isMultiSelect: false }, function (selected) {
                          dialogVm.record.url = 'article/' + selected.id;
                          dialogVm.record.image = selected.tag.large_thumb;
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
                      dialogVm.record.url = '';
                      dialogVm.record.image = '';
                  } else {
                      dialogVm.record.item = null;
                      dialogVm.record.itemName = '';
                      dialogVm.record.url = '';
                      dialogVm.record.image = '';
                  }
              } else {
                  var cacheLet = {};
                  cacheLet.item = dialogVm.record.$model.item;
                  cacheLet.itemName = dialogVm.record.$model.itemName;
                  cacheLet.action = dialogVm.record.$model.action;
                  cacheLet.image = dialogVm.record.$model.image;
                  // 如果是修改，则使用缓存的数据
                  if (dialogVm.$cache.choose && dialogVm.$cache.choose[v]) {
                      avalon.mix(true, dialogVm.record, dialogVm.$cache.choose[v]);
                  } else {
                      avalon.mix(true, dialogVm.record, {
                          item: 0,
                          itemName: '',
                          url: '',
                          image: ''
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
  exports.view = "<div class=\"row\" ms-controller=\"gf-adviertisement\">\n    <div class=\"col-xs-12 col-md-12\">\n        <ms:dialog $id=\"dialog_adviertisement\" config=\"$dialog_config\" ms-skip>\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <form role=\"form\" data-bv-excluded=\":hidden, :not(:visible)\">\n\t\t\t\t\t\t<ms:control-select label=\"动作\" duplex=\"state.chooseType\">\n                            <option value=\"good\">打开商品详情页</option>\n                            <option value=\"article\">打开文章页</option>\n                            <option value=\"channel\">打开网址</option>\n                        </ms:control-select>\n                        <div class=\"form-group\" ms-visible=\"state.chooseType == 'article' || state.chooseType == 'good'\">\n                            <input type=\"hidden\" class=\"form-control\" ms-duplex=\"record.item\">\n                            <label>选择{{ state.chooseType == 'good' ? '商品' : '文章' }}</label>\n                            <div class=\"input-group\">\n                                <input type=\"text\" class=\"form-control\" name=\"itemName\" ms-duplex=\"record.itemName\" disabled>\n                                <span class=\"input-group-btn\">\n                                    <button class=\"btn btn-info\" type=\"button\" ms-click=\"state.choose\">选择</button>\n                                </span>\n                            </div>\n                        </div>\n                        <div ms-visible=\"state.chooseType == 'channel'\">\n                            <ms:control-file label=\"图片\" col=\"image\"></ms:control-file>\n                            <ms:control-text label=\"网址\" col=\"url\"></ms:control-text>\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </ms:dialog>\n        <ms:data-box $id=\"data-box_adviertisement\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\n            <div slot=\"content\" class=\"widget\">\n                <div class=\"widget-header bg-blue\">\n                    <span class=\"widget-caption\">列表</span>\n                </div>\n                <div class=\"widget-body\">\n                    <form class=\"form-inline\">\n\t\t\t\t\t\t<ms:search-item-select label=\"动作\" col=\"action\">\n                            <option value=\"\">-选择-</option>\n                            <option value=\"good\">打开商品详情页</option>\n                            <option value=\"article\">打开文章页</option>\n                            <option value=\"channel\">打开网址</option>\n                        </ms:search-item-select>\n                        <ms:search-button class=\"btn btn-info\">搜索</ms:search-button>\n                    </form>\n                    <div class=\"table-toolbar\" >\n                        <button class=\"btn btn-info\" ms-click=\"actions.add\">\n                            <span class=\"fa fa-plus\">\n                            </span>新增\n                        </button>\n                    </div>\n                    <ms:table class=\"table table-hover table-bordered\">\n                        <!--<ms:check-header slot=\"header\" col=\"id\" width=\"60\"></ms:check-header>-->\n                        <ms:text-header slot=\"header\" col=\"url | url2action\" text=\"动作\"></ms:text-header>\n                        <ms:table-header slot=\"header\" text=\"文章/商品/链接地址\">\n                            {{(~el.url.indexOf('good') || ~el.url.indexOf('article')) ? el.itemname : el.url}}\n                        </ms:table-header>\n\t\t\t\t\t\t<ms:action-header slot=\"header\" text=\"图片\" action-type=\"showPic\"></ms:action-header>\n                        <ms:action-header slot=\"header\" text=\"操作\"></ms:action-header>\n                    </ms:table>\n                    <ms:pagination current-page=\"1\"></ms:pagination>\n                </div>\n            </div>\n        </ms:data-box>\n     </div>   \n</div>";
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
