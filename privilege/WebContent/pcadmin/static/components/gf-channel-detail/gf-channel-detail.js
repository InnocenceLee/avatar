define('components/gf-channel-detail/gf-channel-detail', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  var ajax = require('services/ajaxService');
  var store = require('services/storeService');
  
  require('vendor/avx-component/avx-component');
  var itemSelector = require('components/gf-select-item/gf-select-item');
  
  var currentState = mmState.currentState;
  var channelDetailVm = avalon.define({
      $id: 'gf-channel-detail',
      channelId: currentState.params.id,
      record: store.channel.initialData(),
      $validateFields: {
          name: {
              validators: {
                  notEmpty: {
                      message: '请填写专栏名称'
                  }
              }
          }
      },
      valid: true,
      state: {
      },
      save: function () {
          var $form = $('div[avalonctrl=gf-channel-detail]').find('form');
          $form.data('bootstrapValidator').validate()
          if (!$form.data('bootstrapValidator').isValid()) {
              channelDetailVm.valid = false;
              return false;
          } else {
              channelDetailVm.valid = true;
          }
          store.channel.update(channelDetailVm.record.$model).then(function (result) {
              if (result.code == '0') {
                  avalon.router.navigate('channel');
              }
          });
      },
      '$data-box_config': {
          store: 'content',
          dialogId: 'dialog_channel_detail_content',
          actionBtns: {
              operation: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.push(el)"><i class="fa fa-edit"></i> 推送到首页</a> ' + 
                  '<a href="javascript:;" class="btn btn-danger btn-xs" ms-click="actions.del(el)"><i class="fa fa-trash-o"></i> 删除</a>',
              detail: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.detail(el)"><i class="fa fa-edit"></i> 查看详情</a>'
          },
          processData: function (package, post) {
              package.record.channel = currentState.params.id;
              post(function () {});
          },
          actions: {
              push: function (record) {
                  var dialogVm = avalon.vmodels['dialog_channel_content_push'];
                  dialogVm.title = '设置推送内容';
                  dialogVm.record = avalon.mix(store.push.initialData(), {
                      item: record.id,
                      title: record.name
                  });
                  dialogVm.$post = function (package) {
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
              detail: function (record) {
                  avalon.router.navigate('content_detail/' + record.id);
              }
          }
      },
      '$dialog_config': {
          $validateFields: {
              view_count: {
                  validators: {
                      notEmpty: { message: '请填写浏览量' },
                      integer: { message: '浏览量必须是整数' }
                  }
              },
              name: {
                  validators: {
                      notEmpty: { message: '请填写标题' }
                  }
              },
              'tag.author_name': {
                  validators: {
                      notEmpty: { message: '请填写作者姓名' }
                  }
              },
              'tag.author_pic': {
                  validators: {
                      notEmpty: { message: '请选择图片' },
                      uri: { message: '格式不正确，请重新上传' }
                  }
              },
              'tag.thumb': {
                  validators: {
                      notEmpty: { message: '请选择图片' },
                      uri: { message: '格式不正确，请重新上传' }
                  }
              },
              'tag.screenshots': {
                  validators: {
                      notEmpty: { message: '请选择图片' },
                      uri: { message: '格式不正确，请重新上传' }
                  }
              },
              'tag.banner': {
                  validators: {
                      notEmpty: { message: '请选择图片' },
                      uri: { message: '格式不正确，请重新上传' }
                  }
              }
          }
      },
      '$dialog_content_push': {
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
      '$dialog_insert_config': {
          $validateFields: {
              thumb: {
                  validators: {
                      notEmpty: { message: '请选择图片' },
                      uri: { message: '格式不正确，请重新上传' }
                  }
              }
          }
      },
      dataBoxInit: function (vm) {
          var dialogVm = avalon.vmodels['dialog_channel_detail_content'];
          vm.loadData = function () {
              store.content.searchContentByChannel({
                  id: currentState.params.id
              }).then(function (result) {
                  // 隐藏加载动画
                  beyond.hideLoading();
                  // 更新vm
                  vm.list = result.list;
                  vm.total = result.total;
                  vm.checked.clear();
              });
          }
          vm.loadData();
          dialogVm.state = {
              chooseLabel: '上传图片',
              selectItem: function (e) {
                  itemSelector.open({ isMultiSelect: false }, function (selected) {
                      var dialogVm = avalon.vmodels['dialog_channel_content_insert'];
                      dialogVm.title = '插入推荐商品';
                      dialogVm.record = {
                          id: selected.id,
                          name: selected.name,
                          thumb: selected.tag.thumb,
                          bio: ''
                      };
                      dialogVm.$post = function (package) {
                          avalon.vmodels['ueditor_channel_content_content'].insertRichEntity(package.record);
                      }
                      dialogVm.show = true;
                  });
                  e.preventDefault();
              }
          };
          dialogVm.$watch('record.sub_type', function (newV, oldV) {
              var control_file = avalon.vmodels['control-file_channel_chooseBanner'];
              control_file && (control_file.label = '上传' + (newV == 'A' ? '图片' : '视频'));
          });
      }
  });
  
  // 导出模板
  exports.view = "<div ms-controller=\"gf-channel-detail\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <button class=\"btn btn-info pull-right\" ms-click=\"save\"><i class=\"fa fa-save\"></i>保存</button>\n        </div>\n    </div>\n    <form role=\"form\" ms-formvalid=\"$validateFields\">\n        <div class=\"form-group\">\n            <label>订阅顶图</label>\n            <img ms-attr-src=\"record.tag.large_thumb\" style=\"height: 200px;display:block;\">\n        </div>\n        <ms:control-file btn-text=\"更换图片\" col=\"tag.large_thumb\"></ms:control-file>\n        <ms:control-text label=\"专栏名称\" col=\"name\"></ms:control-text>\n        <ms:control-textarea label=\"专栏介绍\" col=\"tag.brief\" rows=\"5\"></ms:control-textarea>\n        <ms:control-textarea label=\"适宜人群\" col=\"tag.suit_crowds\"></ms:control-textarea>\n        <ms:control-textarea label=\"订阅须知\" col=\"tag.information\" rows=\"5\"></ms:control-textarea>\n        <ms:control-text label=\"套餐价格\" duplex=\"el.price\" ms-repeat=\"record.suites\"></ms:control-text>\n        <ms:control-text label=\"套餐有效时间\" duplex=\"el.effectDuration\" ms-repeat=\"record.suites\"></ms:control-text>\n        <ms:control-select label=\"套餐时间类别\" duplex=\"el.unit\" ms-repeat=\"record.suites\">\n            <option value=\"Y\">年</option>\n            <option value=\"M\">月</option>\n            <option value=\"D\">日</option>\n        </ms:control-select>\n    </form>\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <button class=\"btn btn-info pull-right\" ms-click=\"save\" ms-attr-disabled=\"valid\" ms-attr-enabled=\"valid\"><i class=\"fa fa-save\"></i>保存</button>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <ms:dialog $id=\"dialog_channel_detail_content\" config=\"$dialog_config\" ms-skip>\n                <div class=\"row\">\n                    <div class=\"col-md-12\">\n                        <form role=\"form\">\n                            <ms:control-text label=\"标题\" col=\"name\"></ms:control-text>\n                            <ms:control-select label=\"类型\" col=\"sub_type\">\n                                <option value=\"A\">文章</option>\n                                <option value=\"V\">视频</option>\n                            </ms:control-select>\n                            <ms:control-text label=\"作者\" col=\"tag.author_name\"></ms:control-text>\n                            <div class=\"form-group\">\n                                <label>作者头像</label>\n                                <img ms-attr-src=\"record.tag.author_pic\" style=\"height: 200px;display:block;\">\n                            </div>\n                            <ms:control-file btn-text=\"更换头像\" col=\"tag.author_pic\" placeholder=\"建议尺寸：100 x 100\"></ms:control-file>\n                            <ms:control-file label=\"缩略图\" btn-text=\"选择图片\" col=\"tag.thumb\" store=\"file\"></ms:control-file>\n                            <div ms-visible=\"record.sub_type == 'V'\">\n                                <ms:control-file label=\"视频截图\" btn-text=\"选择图片\" col=\"tag.screenshots\"></ms:control-file>\n                            </div>\n                            <ms:control-file $id=\"control-file_channel_chooseBanner\" ms-attr-label=\"上传{{record.sub_type == 'A' ? '图片' : '视频'}}\" btn-text=\"选择文件\" col=\"tag.banner\" store=\"file\"></ms:control-file>\n                            <div class=\"form-group\">\n                                <label>商品详情</label>\n                                <div class=\"pull-right\"><button type=\"button\" class=\"btn btn-info\" ms-click=\"state.selectItem\">选择商品</button></div>\n                            </div>\n                            <ms:control-ueditor $id=\"ueditor_channel_content_content\" z-index=\"1051\" col=\"tag.content\" rows=\"4\"></ms:control-ueditor>\n                            <ms:control-text label=\"浏览量\" col=\"view_count\"></ms:control-text>\n                        </form>\n                    </div>\n                </div>\n            </ms:dialog>\n            <ms:dialog $id=\"dialog_channel_content_push\" config=\"$dialog_content_push\" ms-skip>\n                <div class=\"row\">\n                    <div class=\"col-md-12\">\n                        <form role=\"form\">\n                            <ms:control-text label=\"标题\" col=\"title\"></ms:control-text>\n                            <ms:control-textarea label=\"副标题\" col=\"sub_title\" rows=\"4\"></ms:control-textarea>\n                            <ms:control-select label=\"标签\" duplex=\"el\" store=\"tag\" col-key=\"label\" col-val=\"label\" ms-repeat=\"record.tags\"></ms:control-select>\n                            <ms:control-select label=\"模式\" col=\"view_mode\">\n                                <option value=\"L\">大图</option>\n                                <option value=\"T\">小图</option>\n                            </ms:control-select>\n                            <ms:control-file label=\"上传图片\" store=\"file\" col=\"picture\"></ms:control-file>\n                            <ms:control-datetimepicker label=\"发布时间\" col=\"postd\"></ms:control-datetimepicker>\n                            <ms:control-text ms-visible=\"false\" col=\"item\"></ms:control-text>\n                        </form>\n                    </div>\n                </div>\n            </ms:dialog>\n            <ms:dialog $id=\"dialog_channel_content_insert\" config=\"$dialog_insert_config\" ms-skip>\n                <div class=\"row\">\n                    <div class=\"col-md-12\">\n                        <form role=\"form\">\n                            <div class=\"form-group\">\n                                <label>订阅顶图</label>\n                                <img ms-attr-src=\"record.thumb\" style=\"height: 200px;display:block;\">\n                            </div>\n                            <ms:control-file label=\"更换图片\" col=\"thumb\"></ms:control-file>\n                            <ms:control-text label=\"名称\" col=\"name\"></ms:control-text>\n                            <ms:control-textarea label=\"简介\" col=\"bio\" rows=\"4\"></ms:control-textarea>\n                        </form>\n                    </div>\n                </div>\n            </ms:dialog>\n            <ms:data-box $id=\"data-box_content\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\n                <div slot=\"content\">\n                    <div class=\"table-toolbar\">\n                        <button class=\"btn btn-info\" ms-click=\"actions.add\">\n                            <span class=\"fa fa-plus\">\n                            </span>新增\n                        </button>\n                    </div>\n                    <ms:table class=\"table table-hover table-bordered\">\n                        <ms:check-header slot=\"header\" col=\"id\" width=\"60\"></ms:check-header>\n                        <ms:text-header slot=\"header\" col=\"sub_type\" text=\"类型\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"name\" text=\"标题\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"tag.author_name\" text=\"作者\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"postd\" text=\"发布时间\"></ms:text-header>\n                        <ms:action-header slot=\"header\" text=\"详情\" action-type=\"detail\"></ms:action-header>\n                        <ms:action-header slot=\"header\" text=\"操作\"></ms:action-header>\n                    </ms:table>\n                </div>\n            </ms:data-box>\n        </div>\n    </div>\n</div>";
  // 导出逻辑
  exports.controller = avalon.controller(function($ctrl) {
      $ctrl.$onRendered = function() {
      }
      $ctrl.$onEnter = function(params, rs) {
          store.channel.detail({ id: params.id }).then(function (result) {
              if (result.list[0]) {
                  avalon.mix(channelDetailVm.record, result.list[0]);
              }
              beyond.hideLoading();
          });
      }
      $ctrl.$onBeforeUnload = function(oldState, newState) {
      }
      $ctrl.$vmodels = [];
  });

});
