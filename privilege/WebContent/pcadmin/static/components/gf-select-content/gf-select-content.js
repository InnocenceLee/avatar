define('components/gf-select-content/gf-select-content', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  var ajax = require('services/ajaxService');
  
  require('vendor/avx-component/avx-component');
  
  var dialogVm = null;
  var selectorVm = avalon.define({
      $id: 'gf-select-content',
      dialogInit: function (vm) {
          dialogVm = vm;
      }
  });
  var dataVm = avalon.define({
      $id: 'gf-select-content_data',
      '$data-box_config': {
          store: 'content',
          actionBtns: {
              operation: '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.choose(el)"><i class="fa fa-edit"></i> 选择</a>'
          },
          actions: {
              choose: function (record) {
                  var successed = dialogVm.$post({
                      record: record,
                      isSingleSelect: true
                  });
                  if (successed) {
                      dialogVm.show = false;
                  }
              }
          }
      },
      $validateFields: {
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
          vm.loadData(function () {
              // 隐藏加载动画
              beyond.hideLoading();
          });
          $('div[avalonctrl=gf-select-content_data]').find('form#select_content_search').on('success.field.bv', function(e, data) {
              if (data.field === 'startDate' && !data.bv.isValidField('endDate')) {
                  data.bv.revalidateField('endDate');
              }
  
              if (data.field === 'endDate' && !data.bv.isValidField('startDate')) {
                  data.bv.revalidateField('startDate');
              }
          });
      }
  });
  
  // 导出模板
  $('#dialog_layer').append("<div ms-controller=\"gf-select-content\">\r\n    <ms:dialog $id=\"dialog_select_content\" ms-skip on-init=\"dialogInit\">\r\n        <span slot=\"header\">选择文章</span>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\" ms-controller=\"gf-select-content_data\">\r\n                <ms:data-box $id=\"data-box_select_content\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\r\n                    <div slot=\"content\">\r\n                        <form id=\"select_content_search\" data-bv-container=\"tooltip\" ms-formvalid=\"$validateFields\">\r\n                            <div class=\"form-inline\">\r\n                                <ms:search-item label=\"标题\" col=\"name\"></ms:search-item>\r\n                                <ms:search-item label=\"作者\" col=\"author_name\"></ms:search-item>\r\n                            </div>\r\n                            <br>\r\n                            <div class=\"form-inline\">\r\n                                <ms:search-item-datepicker label=\"开始日期\" col=\"startDate\"></ms:search-item-datepicker>\r\n                                <ms:search-item-datepicker label=\"结束日期\" col=\"endDate\"></ms:search-item-datepicker>\r\n                            </div>\r\n                            <br>\r\n                            <div class=\"form-inline\">\r\n                                <ms:search-button class=\"btn btn-info\">搜索</ms:search-button>\r\n                            </div>\r\n                            <br>\r\n                        </form>\r\n                        <ms:table class=\"table table-hover table-bordered\">\r\n                            <ms:check-header slot=\"header\" col=\"id\" width=\"60\"></ms:check-header>\r\n                            <ms:text-header slot=\"header\" col=\"sub_type | dict('content')\" text=\"类型\"></ms:text-header>\r\n                            <ms:text-header slot=\"header\" col=\"name\" text=\"标题\"></ms:text-header>\r\n                            <ms:text-header slot=\"header\" col=\"tag.author_name\" text=\"作者\"></ms:text-header>\r\n                            <ms:text-header slot=\"header\" col=\"created |date('yyyy-MM-dd HH:mm:ss')\" text=\"发布时间\"></ms:text-header>\r\n                            <ms:action-header slot=\"header\" text=\"操作\"></ms:action-header>\r\n                        </ms:table>\r\n                        <ms:pagination current-page=\"1\"></ms:pagination>\r\n                    </div>\r\n                </ms:data-box>\r\n            </div>\r\n        </div>\r\n    </ms:dialog>\r\n</div>");
  avalon.scan($('#dialog_layer').get(0), selectorVm);
  // 导出逻辑
  exports.open = function (prop, cb) {
      if (dialogVm) {
          dialogVm.show = true;
          dialogVm.state = {
              isMultiSelect: prop.isMultiSelect
          };
          dialogVm.$post = function (package) {
              var selected;
              var containerVm = avalon.vmodels['data-box_select_content'], checked = containerVm.$model.checked;
              var list = containerVm.list.$model;
              if (package.isSingleSelect) {
                  cb(prop.isMultiSelect ? [package.record.$model] : package.record.$model);
              } else {
                  selected = [];
                  for (var i = 0, item; item = list[i]; i++) {
                      for (var j = 0, checkedId; checkedId = checked[j]; j++) {
                          if (checkedId == item.id) {
                              selected.push(item);
                          }
                      }
                  }
                  if (selected.length == 0) {
                      Notify('请至少选择一项', 'top-right', '5000', 'warning', 'fa-warning', true);
                      return false;
                  }
                  cb(prop.isMultiSelect ? selected : selected[0]);
              }
              return true;
          }
      }
  }

});
