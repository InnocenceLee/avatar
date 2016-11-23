define('components/gf-item/gf-item', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  var ajax = require('services/ajaxService');
  var store = require('services/storeService');
  
  require('vendor/avx-component/avx-component');
  var imageSelector = require('components/gf-select-image/gf-select-image');
  
  var dataVm, dialogVm;
  var item = avalon.define({
      $id: 'gf-item',
      '$data-box_config': {
          store: 'item',
          dialogId: 'dialog_item',
          actionBtns: {
              operation: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.doShelves(el)"><i class="fa fa-edit"></i> {{el.state=="U"?"下":"上"}}架</a> ' + 
                  '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.edit(el)"><i class="fa fa-edit"></i> 编辑</a> ' ,
                 // '<a href="javascript:;" class="btn btn-danger btn-xs" ms-click="actions.del(el)"><i class="fa fa-trash-o"></i> 删除</a>'
              push: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.push(el)"><i class="fa fa-edit"></i> 推送到首页</a>'
          },
          processData: function (package, post) {
              package.record.tag.large_thumb = package.record.tag.thumb;
              post(function (r) {});
          },
          actions: {
              push: function (record) {
                  var dialogVm = avalon.vmodels['dialog_item_push'];
                  dialogVm.title = '设置推送内容';
                  dialogVm.record = avalon.mix(store.push.initialData(), {
                      item: record.id,
                      title: record.name
                  });
                  dialogVm.$post = function (package) {
                      if (!dialogVm.$beforePost()) {
                          return false;
                      }
                      if (dialogVm.uploading) return false;
                      dialogVm.uploading = true;
                      store.push.insert(package.record).then(function (result) {
                          if (result.code == '0') {
                              Notify('推送成功', 'top-right', '5000', 'success', 'fa-check', true);
                              dialogVm.show = false;
                              setTimeout(function () { dialogVm.uploading = false; }, 1000);
                          }
                      });
                      return false;
                  }
                  dialogVm.show = true;
              },
              doShelves: function (record) {
                  if (record.state == 'U') {
                      store.item.downShelves({ ids: [record.id] }).then(function (result) {
                          if (result.code == '0') {
                              Notify('下架成功', 'top-right', '5000', 'success', 'fa-check', true);
                              dataVm && dataVm.loadData();
                          }
                      });
                  } else {
                      store.item.upShelves({ ids: [record.id] }).then(function (result) {
                          if (result.code == '0') {
                              Notify('上架成功', 'top-right', '5000', 'success', 'fa-check', true);
                              dataVm && dataVm.loadData();
                          }
                      });
                  }
              },
              doShelvesBatch: function (type) {
                  if (dataVm.checked.length === 0) {
                      Notify('请至少选择一项', 'top-right', '5000', 'warning', 'fa-warning', true);
                      return;
                  }
                  if (type === 'D') {
                      store.item.downShelves({ ids: dataVm.checked }).then(function (result) {
                          if (result.code == '0') {
                              Notify('下架成功', 'top-right', '5000', 'success', 'fa-check', true);
                              dataVm && dataVm.loadData();
                          }
                      });
                  } else {
                      store.item.upShelves({ ids: dataVm.checked }).then(function (result) {
                          if (result.code == '0') {
                              Notify('上架成功', 'top-right', '5000', 'success', 'fa-check', true);
                              dataVm && dataVm.loadData();
                          }
                      });
                  }
              }
          }
      },
      '$dialog_config': {
          $validateFields: {
              name: {
                  validators: {
                      notEmpty: { message: '请填写商品名称' }
                  }
              },
              catalog: {
                  validators: {
                      notEmpty: { message: '请选择商品分类' }
                  }
              },
              price: {
                  validators: { 
                      notEmpty: { message: '请填写商品单价' },
                      numeric: { message: '请填写正确的数字' } 
                  }
              },
              store_count: {
                  validators: { 
                      notEmpty: { message: '请填写商品库存' },
                      integer: { message: '请填写正确的整数' } 
                  }
              },
              'tag.thumb': {
                  validators: {
                      notEmpty: { message: '请选择图片' },
                      uri: { message: '格式不正确，请重新上传' }
                  }
              },
              'tag.images': {
                  validators: {
                      callback: {
                          message: '请选择商品图片',
                          callback: function (value, validator, $field) {
                              return dialogVm.record.tag.images.size() > 0;
                          }
                      }
                  },
                  excluded: false
              },
              'tag.description': {
                  validators: {
                      notEmpty: { message: '请填写商品详情' }
                  },
                  excluded: false
              },
              view_count: {
                  validators: {
                      notEmpty: { message: '请填写浏览量' },
                      integer: { message: '浏览量必须是整数' }
                  }
              }
          }
      },
      '$dialog_push_config': {
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
          dataVm = vm;
          dialogVm = avalon.vmodels['dialog_item'];
          vm.loadData(function () {
              // 隐藏加载动画
              beyond.hideLoading();
          });
          // 自定义dialog逻辑
          dialogVm.state = {
              selectImg: function () {
                  imageSelector.open({ }, function (selected) {
                      dialogVm.record.tag.images.push(selected.image);
                      dialogVm.$dialog.find('[name="tag.images"]').trigger('input');
                  });
              },
              removeImg: function (record) {
                  dialogVm.record.tag.images.remove(record);
              }
          };
      }
  });
  
  // 导出模板
  exports.view = "<div class=\"row\" ms-controller=\"gf-item\">\r\n    <style>\r\n        .mail-container .mail-body .mail-attachments ul li>a.thumb.plus:after {\r\n            content: \"\\f067\"\r\n        }\r\n    </style>\r\n    <div class=\"col-xs-12 col-md-12\">\r\n        <ms:dialog $id=\"dialog_item\" config=\"$dialog_config\" ms-skip>\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12\">\r\n                    <form role=\"form\">\r\n                        <ms:control-text label=\"商品名称\" col=\"name\"></ms:control-text>\r\n                        <ms:control-select label=\"商品分类\" col=\"catalog\" duplex=\"record.catalog\" store=\"category\"></ms:control-select>\r\n                        <ms:control-text label=\"商品单价\" col=\"price\"></ms:control-text>\r\n                        <ms:control-text label=\"库存\" col=\"store_count\"></ms:control-text>\r\n                        <!--<ms:control-file label=\"大缩略图\" btn-text=\"选择图片\" col=\"tag.large_thumb\" store=\"file\"></ms:control-file>-->\r\n                        <ms:control-file label=\"缩略图\" btn-text=\"选择图片\" col=\"tag.thumb\" placeholder=\"建议尺寸：180 x 248\"></ms:control-file>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"control-label\">商品图片 <small>*建议尺寸：750 x 420</small></div>\r\n                            <div class=\"mail-container\">\r\n                                <div class=\"mail-body\" style=\"margin-left: 0;\">\r\n                                    <div class=\"mail-attachments\">\r\n                                        <ul>\r\n                                            <li ms-repeat=\"record.tag.images\">\r\n                                                <a href=\"javascript:;\" class=\"thumb\" ms-click=\"state.removeImg(el)\">\r\n                                                    <img ms-attr-src=\"el\" style=\"width: 150px; height: 200px;\">\r\n                                                </a>\r\n                                                <div class=\"links\">\r\n                                                    <a href=\"javascript:;\">{{ $index === 0 ? '主图' : '&nbsp;' }}</a>\r\n                                                </div>\r\n                                            </li>\r\n                                            <li>\r\n                                                <a href=\"javascript:;\" class=\"thumb plus\" ms-click=\"state.selectImg\">\r\n                                                    <img src=\"/privilege/pcadmin//static/beyond/img/attach-blue.png\" style=\"width: 150px; height: 200px;\">\r\n                                                </a>\r\n                                                <div class=\"links\">\r\n                                                    <a href=\"javascript:;\">{{ record.tag.images.size() === 0 ? '主图' : '&nbsp;' }}</a>\r\n                                                </div>\r\n                                            </li>\r\n                                        </ul>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <input type=\"hidden\" class=\"form-control\" name=\"tag.images\">\r\n                        </div>\r\n                        <ms:control-ueditor $id=\"ueditor-item-detail\" z-index=\"1051\" label=\"商品详情\" col=\"tag.description\" rows=\"4\"></ms:control-ueditor>\r\n                        <ms:control-text label=\"浏览量\" col=\"view_count\"></ms:control-text>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </ms:dialog>\r\n        <ms:dialog $id=\"dialog_item_push\" config=\"$dialog_push_config\" ms-skip>\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12\">\r\n                    <form role=\"form\">\r\n                        <ms:control-text label=\"标题\" col=\"title\"></ms:control-text>\r\n                        <ms:control-textarea label=\"副标题\" col=\"sub_title\" rows=\"4\"></ms:control-textarea>\r\n                        <ms:control-select label=\"标签\" duplex=\"el\" store=\"tag\" col-key=\"label\" col-val=\"label\" ms-repeat=\"record.tags\"></ms:control-select>\r\n                        <ms:control-select label=\"模式\" col=\"view_mode\">\r\n                            <option value=\"L\">大图</option>\r\n                            <option value=\"T\">小图</option>\r\n                        </ms:control-select>\r\n                        <ms:control-file label=\"上传图片\" col=\"picture\" placeholder=\"建议尺寸：750 x 400(大图) 220 x 300(小图)\"></ms:control-file>\r\n                        <ms:control-datetimepicker label=\"发布时间\" col=\"postd\"></ms:control-datetimepicker>\r\n                        <ms:control-text ms-visible=\"false\" col=\"item\"></ms:control-text>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </ms:dialog>\r\n        <ms:data-box $id=\"data-box_item\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\r\n            <div slot=\"content\" class=\"widget\">\r\n                <div class=\"widget-header bg-blue\">\r\n                    <span class=\"widget-caption\">商品列表</span>\r\n                </div>\r\n                <div class=\"widget-body\">\r\n                    <form class=\"form-inline\">\r\n                        <ms:search-item label=\"名称\" col=\"name\"></ms:search-item>\r\n                        <ms:search-item-select label=\"类别\" col=\"catalog\" store=\"category\"></ms:search-item-select>\r\n                        <ms:search-item label=\"单价\" col=\"price\"></ms:search-item>\r\n                    </form>\r\n                    <br>\r\n                    <form class=\"form-inline\">\r\n                        <ms:search-item-select label=\"状态\" col=\"state\">\r\n                            <option value=\"\">-选择-</option>\r\n                            <option value=\"S\">下架</option>\r\n                            <option value=\"U\">上架</option>\r\n                        </ms:search-item-select>\r\n                        <ms:search-button class=\"btn btn-info\">搜索</ms:search-button>\r\n                    </form>\r\n                    <div class=\"table-toolbar\">\r\n                        <button class=\"btn btn-info\" ms-click=\"actions.add\">\r\n                            <span class=\"fa fa-plus\">\r\n                            </span>新增商品\r\n                        </button>\r\n                        <button class=\"btn btn-info\" ms-click=\"actions.doShelvesBatch('U')\">\r\n                            <span class=\"fa fa-plus\">\r\n                            </span>批量上架\r\n                        </button>\r\n                        <button class=\"btn btn-info\" ms-click=\"actions.doShelvesBatch('D')\">\r\n                            <span class=\"fa fa-plus\">\r\n                            </span>批量下架\r\n                        </button>\r\n                    </div>\r\n                    <ms:table class=\"table table-hover table-bordered\">\r\n                        <ms:check-header slot=\"header\" col=\"id\" width=\"60\"></ms:check-header>\r\n                        <ms:text-header slot=\"header\" col=\"name\" text=\"商品名称\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"catalog | dict('item', 'catalogDict')\" text=\"类别\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"price\" text=\"单价\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"store_count\" text=\"剩余数量\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"state | dict('item')\" text=\"状态\"></ms:text-header>\r\n                        <ms:action-header slot=\"header\" text=\"推送\" action-type=\"push\"></ms:action-header>\r\n                        <ms:action-header slot=\"header\" text=\"操作\"></ms:action-header>\r\n                    </ms:table>\r\n                    <ms:pagination current-page=\"1\" page-count=\"4\"></ms:pagination>\r\n                </div>\r\n            </div>\r\n        </ms:data-box>\r\n    </div>\r\n</div>";
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
