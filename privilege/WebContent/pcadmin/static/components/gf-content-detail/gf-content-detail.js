define('components/gf-content-detail/gf-content-detail', function(require, exports, module) {

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
  var dataVm;
  var contentDetailVm = avalon.define({
      $id: 'gf-content-detail',
      '$data-box_config': {
          store: 'comment',
          actionBtns: {
              audit: '<a href="javascript:;" class="btn btn-success btn-xs" ms-click="actions.audit(el, \'A\')"><i class="fa fa-edit"></i> 通过</a> ' + 
                  '<a href="javascript:;" class="btn btn-danger btn-xs" ms-click="actions.audit(el, \'R\')"><i class="fa fa-edit"></i> 驳回</a> ',
              operation: '<a href="javascript:;" class="btn btn-danger btn-xs" ms-click="actions.del(el)"><i class="fa fa-trash-o"></i> 删除</a>'
          },
          actions: {
              audit: function (record, advice) {
                  store.comment.audit({ id: record.id, state: advice }).then(function (result) {
                      if (result.code == '0') {
                          Notify('审核成功', 'top-right', '5000', 'success', 'fa-check', true);
                          dataVm && dataVm.loadData();
                      }
                  });
              }
          }
      },
      '$dialog_insert': {
          $validateFields: {
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
      $validateSearchFields: {
          startDate: {
              icon: false,
              validators: {
                  date: {
                      format: 'YYYY-MM-DD',
                      max: 'endDate',
                      message: '开始日期不能晚于结束日期'
                  }
              }
          },
          endDate: {
              icon: false,
              validators: {
                  date: {
                      format: 'YYYY-MM-DD',
                      min: 'startDate',
                      message: '结束日期不能早于开始日期'
                  }
              }
          }
      },
      dataBoxInit: function (vm) {
          dataVm = vm;
          vm.loadData(function () {
              // 隐藏加载动画
              beyond.hideLoading();
          }, {
              itemId: currentState.params.id
          });
          $('div[avalonctrl=gf-content-detail]').find('form#content_comment_search').on('success.field.bv', function(e, data) {
              if (data.field === 'startDate' && !data.bv.isValidField('endDate')) {
                  data.bv.revalidateField('endDate');
              }
  
              if (data.field === 'endDate' && !data.bv.isValidField('startDate')) {
                  data.bv.revalidateField('startDate');
              }
          });
      },
      record: store.content.initialData(),
      $validateFields: {
          name: {
              validators: {
                  notEmpty: {
                      message: '请填写标题'
                  }
              }
          },
          'tag.author_name': {
              validators: {
                  notEmpty: { message: '请填写作者姓名' }
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
      },
      valid: true,
      state: {
      },
      selectItem: function (e) {
          itemSelector.open({ isMultiSelect: false }, function (selected) {
              var dialogVm = avalon.vmodels['dialog_content_detail_insert'];
              dialogVm.title = '插入推荐商品';
              dialogVm.record = {
                  id: selected.id,
                  name: selected.name,
                  thumb: selected.tag.thumb,
                  bio: ''
              };
              dialogVm.$post = function (package) {
                  avalon.vmodels['ueditor-content-detail-detail'].insertRichEntity(package.record);
              }
              dialogVm.show = true;
          });
          e.preventDefault();
      },
      save: function () {
          var $form = $('div[avalonctrl=gf-content-detail]').find('form');
          $form.data('bootstrapValidator').validate()
          if (!$form.data('bootstrapValidator').isValid()) {
              contentDetailVm.valid = false;
              return false;
          } else {
              contentDetailVm.valid = true;
          }
          store.content.update(contentDetailVm.record.$model).then(function (result) {
              if (result.code == '0') {
                  Notify('修改成功', 'top-right', '5000', 'success', 'fa-check', true);
                  avalon.router.navigate('content');
              }
          });
      }
  });
  contentDetailVm.$watch('record.sub_type', function (newV, oldV) {
      var control_file = avalon.vmodels['content_detail_chooseBanner'];
      control_file && (control_file.label = '上传' + (newV == 'A' ? '图片' : '视频'));
  });
  
  // 导出模板
  exports.view = "<div class=\"tabbable\" ms-controller=\"gf-content-detail\">\n    <ul class=\"nav nav-tabs\" id=\"myTab11\">\n        <li class=\"active\">\n            <a data-toggle=\"tab\" href=\"#tab_content_detail\">\n                内容详情\n            </a>\n        </li>\n        <li>\n            <a data-toggle=\"tab\" href=\"#tab_content_comment\">\n                评论\n            </a>\n        </li>\n    </ul>\n    <div class=\"tab-content tabs-flat\">\n        <div id=\"tab_content_detail\" class=\"tab-pane in active\">\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <button class=\"btn btn-info pull-right\" ms-click=\"save\"><i class=\"fa fa-save\"></i>保存</button>\n                </div>\n            </div>\n            <ms:dialog $id=\"dialog_content_detail_insert\" config=\"$dialog_insert\" ms-skip>\n                <div class=\"row\">\n                    <div class=\"col-md-12\">\n                        <form role=\"form\">\n                            <div class=\"form-group\">\n                                <label>订阅顶图</label>\n                                <img ms-attr-src=\"record.thumb\" style=\"height: 200px;display:block;\">\n                            </div>\n                            <ms:control-file label=\"更换图片\" col=\"thumb\"></ms:control-file>\n                            <ms:control-text label=\"名称\" col=\"name\"></ms:control-text>\n                            <ms:control-textarea label=\"简介\" col=\"bio\" rows=\"4\"></ms:control-textarea>\n                        </form>\n                    </div>\n                </div>\n            </ms:dialog>\n            <form role=\"form\" ms-formvalid=\"$validateFields\">\n                <ms:control-text label=\"标题\" col=\"name\"></ms:control-text>\n                <ms:control-select label=\"类型\" col=\"sub_type\">\n                    <option value=\"A\">文章</option>\n                    <option value=\"V\">视频</option>\n                </ms:control-select>\n                <ms:control-text label=\"作者\" col=\"tag.author_name\"></ms:control-text>\n                <div class=\"form-group\">\n                    <label>作者头像</label>\n                    <img ms-attr-src=\"record.tag.author_pic\" style=\"height: 200px;display:block;\">\n                </div>\n                <ms:control-file btn-text=\"更换头像\" col=\"tag.author_pic\"></ms:control-file>\n                <ms:control-file label=\"缩略图\" btn-text=\"选择图片\" col=\"tag.thumb\" placeholder=\"建议尺寸：210 x 280\"></ms:control-file>\n                <div ms-visible=\"record.sub_type == 'V'\">\n                    <ms:control-file label=\"视频截图\" btn-text=\"选择图片\" col=\"tag.screenshots\"></ms:control-file>\n                </div>\n                <ms:control-file $id=\"content_detail_chooseBanner\" ms-attr-label=\"上传{{record.sub_type == 'A' ? '图片' : '视频'}}\" col=\"tag.banner\" placeholder=\"建议尺寸：750 x 420\"></ms:control-file>\n                <div class=\"form-group\">\n                    <label>商品详情</label>\n                    <div class=\"pull-right\"><button class=\"btn btn-info\" ms-click=\"selectItem\">选择商品</button></div>\n                </div>\n                <ms:control-ueditor $id=\"ueditor-content-detail-detail\" label=\"\" col=\"tag.content\" rows=\"4\"></ms:control-ueditor>\n                <ms:control-text label=\"浏览量\" col=\"view_count\"></ms:control-text>\n            </form>\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <button class=\"btn btn-info pull-right\" ms-click=\"save\"><i class=\"fa fa-save\"></i>保存</button>\n                </div>\n            </div>\n        </div>\n\n        <div id=\"tab_content_comment\" class=\"tab-pane\">\n            <ms:data-box $id=\"data-box_detail_comment\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\n                <div slot=\"content\">\n                    <form class=\"form-inline\" id=\"content_comment_search\" data-bv-container=\"tooltip\" ms-formvalid=\"$validateSearchFields\">\n                        <ms:search-item label=\"评论人\" col=\"personName\"></ms:search-item>\n                        <ms:search-item label=\"内容\" col=\"content\"></ms:search-item>\n                        <ms:search-item-datepicker label=\"开始时间\" col=\"startDate\"></ms:search-item-datepicker>\n                        <ms:search-item-datepicker label=\"结束时间\" col=\"endDate\"></ms:search-item-datepicker>\n                        \n                        <ms:search-button class=\"btn btn-info\">搜索</ms:search-button>\n                    </form>\n                    <div class=\"table-toolbar\"></div>\n                    <ms:table class=\"table table-hover table-bordered\">\n                        <!--<ms:check-header slot=\"header\" col=\"id\" width=\"60\"></ms:check-header>-->\n                        <ms:text-header slot=\"header\" col=\"id\" text=\"ID\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"person_name\" text=\"评论人\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"content\" text=\"内容\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"postd | date('yyyy-MM-dd HH:mm:ss')\" text=\"评论时间\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"state | dict('comment')\" text=\"显示状态\"></ms:text-header>\n                        <ms:action-header slot=\"header\" text=\"审核\" action-type=\"audit\"></ms:action-header>\n                        <ms:action-header slot=\"header\" text=\"操作\"></ms:action-header>\n                    </ms:table>\n                    <ms:pagination current-page=\"1\"></ms:pagination>\n                </div>\n            </ms:data-box>\n        </div>\n    </div>\n</div>";
  // 导出逻辑
  exports.controller = avalon.controller(function($ctrl) {
      $ctrl.$onRendered = function() {
      }
      $ctrl.$onEnter = function(params, rs) {
          store.content.detail({ id: params.id }).then(function (result) {
              if (result.list[0]) {
                  avalon.mix(contentDetailVm.record, result.list[0]);
              }
              beyond.hideLoading();
          });
      }
      $ctrl.$onBeforeUnload = function(oldState, newState) {
      }
      $ctrl.$vmodels = [];
  });

});
