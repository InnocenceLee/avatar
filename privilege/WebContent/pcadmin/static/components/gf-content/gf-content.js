define('components/gf-content/gf-content', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  var ajax = require('services/ajaxService');
  var store = require('services/storeService');
  
  require('vendor/avx-component/avx-component');
  var itemSelector = require('components/gf-select-item/gf-select-item');
  
  var content = avalon.define({
      $id: 'gf-content',
      '$data-box_config': {
          store: 'content',
          dialogId: 'dialog_content',
          actionBtns: {
              operation: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.push(el)"><i class="fa fa-edit"></i> 推送到首页</a> ' + 
                  '<a href="javascript:;" class="btn btn-danger btn-xs" ms-click="actions.del(el)"><i class="fa fa-trash-o"></i> 删除</a>',
              detail: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.detail(el)"><i class="fa fa-edit"></i> 查看详情</a>'
          },
          processData: function (package, post) {
              post(function () {});
          },
          actions: {
              push: function (record) {
                  var dialogVm = avalon.vmodels['dialog_content_push'];
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
          var dialogVm = avalon.vmodels['dialog_content'];
          
          vm.loadData(function () {
              // 隐藏加载动画
              beyond.hideLoading();
          });
          dialogVm.state = {
              chooseLabel: '上传图片',
              selectItem: function (e) {
                  itemSelector.open({ isMultiSelect: false }, function (selected) {
                      var dialogVm = avalon.vmodels['dialog_content_insert'];
                      dialogVm.title = '插入推荐商品';
                      dialogVm.record = {
                          id: selected.id,
                          name: selected.name,
                          thumb: selected.tag.thumb,
                          bio: ''
                      };
                      dialogVm.$post = function (package) {
                          avalon.vmodels['ueditor_content_content'].insertRichEntity(package.record);
                      }
                      dialogVm.show = true;
                  });
                  e.preventDefault();
              }
          };
          dialogVm.$watch('record.sub_type', function (newV, oldV) {
              var control_file = avalon.vmodels['control-file_chooseBanner'];
              control_file && (control_file.label = '上传' + (newV == 'A' ? '顶图' : '视频'));
          });
      }
  });
  
  // 导出模板
  exports.view = "<div class=\"row\" ms-controller=\"gf-content\">\r\n    <div class=\"col-xs-12 col-md-12\">\r\n        <ms:dialog $id=\"dialog_content\" config=\"$dialog_config\" ms-skip>\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12\">\r\n                    <form role=\"form\">\r\n                        <ms:control-text label=\"标题\" col=\"name\"></ms:control-text>\r\n                        <ms:control-select label=\"类型\" col=\"sub_type\">\r\n                            <option value=\"A\">文章</option>\r\n                            <option value=\"V\">视频</option>\r\n                        </ms:control-select>\r\n                        <ms:control-text label=\"作者\" col=\"tag.author_name\"></ms:control-text>\r\n                        <div class=\"form-group\">\r\n                            <label>作者头像</label>\r\n                            <img ms-attr-src=\"record.tag.author_pic\" style=\"height: 200px;display:block;\">\r\n                        </div>\r\n                        <ms:control-file btn-text=\"更换头像\" col=\"tag.author_pic\"></ms:control-file>\r\n                        <ms:control-file label=\"缩略图\" btn-text=\"选择图片\" col=\"tag.thumb\" placeholder=\"建议尺寸：210 x 280\"></ms:control-file>\r\n                        <div ms-visible=\"record.sub_type == 'V'\">\r\n                            <ms:control-file label=\"视频截图\" btn-text=\"选择图片\" col=\"tag.screenshots\"></ms:control-file>\r\n                        </div>\r\n                        <ms:control-file $id=\"control-file_chooseBanner\" ms-attr-label=\"上传{{record.sub_type == 'A' ? '顶图' : '视频'}}\" btn-text=\"选择文件\" col=\"tag.banner\" placeholder=\"建议尺寸：750 x 420\"></ms:control-file>\r\n                        <div class=\"form-group\">\r\n                            <label>商品详情</label>\r\n                            <div class=\"pull-right\"><button class=\"btn btn-info\" ms-click=\"state.selectItem\">选择商品</button></div>\r\n                        </div>\r\n                        <ms:control-ueditor $id=\"ueditor_content_content\" z-index=\"1051\" col=\"tag.content\" rows=\"4\"></ms:control-ueditor>\r\n                        <ms:control-text label=\"浏览量\" col=\"view_count\"></ms:control-text>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </ms:dialog>\r\n        <ms:dialog $id=\"dialog_content_push\" config=\"$dialog_push_config\" ms-skip>\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12\">\r\n                    <form role=\"form\">\r\n                        <ms:control-text label=\"标题\" col=\"title\"></ms:control-text>\r\n                        <ms:control-textarea label=\"副标题\" col=\"sub_title\" rows=\"4\"></ms:control-textarea>\r\n                        <ms:control-select label=\"标签\" duplex=\"el\" store=\"tag\" col-key=\"label\" col-val=\"label\" ms-repeat=\"record.tags\"></ms:control-select>\r\n                        <ms:control-select label=\"模式\" col=\"view_mode\">\r\n                            <option value=\"L\">大图</option>\r\n                            <option value=\"T\">小图</option>\r\n                        </ms:control-select>\r\n                        <ms:control-file label=\"上传图片\" col=\"picture\" placeholder=\"建议尺寸：750 x 400(大图) 220 x 300(小图)\"></ms:control-file>\r\n                        <ms:control-datetimepicker label=\"发布时间\" col=\"postd\"></ms:control-datetimepicker>\r\n                        <ms:control-text ms-visible=\"false\" col=\"item\"></ms:control-text>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </ms:dialog>\r\n        <ms:dialog $id=\"dialog_content_insert\" config=\"$dialog_insert_config\" ms-skip>\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12\">\r\n                    <form role=\"form\">\r\n                        <div class=\"form-group\">\r\n                            <label>订阅顶图</label>\r\n                            <img ms-attr-src=\"record.thumb\" style=\"height: 200px;display:block;\">\r\n                        </div>\r\n                        <ms:control-file label=\"更换图片\" col=\"thumb\"></ms:control-file>\r\n                        <ms:control-text label=\"名称\" col=\"name\"></ms:control-text>\r\n                        <ms:control-textarea label=\"简介\" col=\"bio\" rows=\"4\"></ms:control-textarea>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </ms:dialog>\r\n        <ms:data-box $id=\"data-box_content\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\r\n            <div slot=\"content\" class=\"widget\">\r\n                <div class=\"widget-header bg-blue\">\r\n                    <span class=\"widget-caption\">商品列表</span>\r\n                </div>\r\n                <div class=\"widget-body\">\r\n                    <form class=\"form-inline\">\r\n                        <ms:search-item label=\"标题\" col=\"name\"></ms:search-item>\r\n                        <ms:search-item-select label=\"类型\" col=\"type\">\r\n                        \t<option value=\"A\">文章</option>\r\n                            <option value=\"V\">视频</option>\r\n                        </ms:search-item-select>\r\n                        <ms:search-item label=\"作者\" col=\"author_name\"></ms:search-item>\r\n                        <ms:search-button class=\"btn btn-info\">搜索</ms:search-button>\r\n                    </form>\r\n                    <div class=\"table-toolbar\">\r\n                        <button class=\"btn btn-info\" ms-click=\"actions.add\">\r\n                            <span class=\"fa fa-plus\">\r\n                            </span>新增内容\r\n                        </button>\r\n                    </div>\r\n                    <ms:table class=\"table table-hover table-bordered\">\r\n                        <ms:check-header slot=\"header\" col=\"id\" width=\"60\"></ms:check-header>\r\n                        <ms:text-header slot=\"header\" col=\"sub_type | dict('content')\" text=\"类型\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"name\" text=\"标题\"></ms:text-header>\r\n                        <ms:text-header slot=\"header\" col=\"tag.author_name\" text=\"作者\"></ms:text-header>\r\n                        <ms:action-header slot=\"header\" text=\"详情\" action-type=\"detail\"></ms:action-header>\r\n                        <ms:action-header slot=\"header\" text=\"操作\"></ms:action-header>\r\n                    </ms:table>\r\n                    <ms:pagination current-page=\"1\"></ms:pagination>\r\n                </div>\r\n            </div>\r\n        </ms:data-box>\r\n    </div>\r\n</div>";
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
