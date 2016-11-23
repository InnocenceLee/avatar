define('components/gf-comment/gf-comment', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  var ajax = require('services/ajaxService');
  var store = require('services/storeService');
  
  require('vendor/avx-component/avx-component');
  
  var dataVm;
  var demo = avalon.define({
      $id: 'gf-comment',
      '$data-box_config': {
          store: 'comment',
          dialogId: 'dialog_comment',
          actionBtns: {
              audit: '<a href="javascript:;" class="btn btn-success btn-xs" ms-click="actions.audit(el, \'A\')"><i class="fa fa-edit"></i> 通过</a> ' + 
                  '<a href="javascript:;" class="btn btn-danger btn-xs" ms-click="actions.audit(el, \'R\')"><i class="fa fa-edit"></i> 驳回</a> ',
              operation: '<a ms-attr-disabled="el.state == \'D\'" ms-attr-enabled="el.state != \'D\'" href="javascript:;" class="btn btn-danger btn-xs" ms-click="actions.del(el)"><i class="fa fa-trash-o"></i> 删除</a>'
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
          },
          processData: function (package, post) {
              // package包含一些状态数据和要提交要用到的数据
              console.log(package.isEdit ? '修改' : '新增', package.record);
              post(function (r) {
                  console.log(r);
              });
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
          dataVm = vm;
          vm.loadData(function () {
              // 隐藏加载动画
              beyond.hideLoading();
          });
          $('div[avalonctrl=gf-comment]').find('form#comment_search').on('success.field.bv', function(e, data) {
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
  exports.view = "<div class=\"row\" ms-controller=\"gf-comment\">\n    <div class=\"col-xs-12 col-md-12\">\n        <ms:dialog $id=\"dialog_comment\" ms-skip>\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <form role=\"form\">\n                        <ms:control-text label=\"评论\" col=\"name\"></ms:control-text>\n                    </form>\n                </div>\n            </div>\n        </ms:dialog>\n        <ms:data-box $id=\"data-box_comment\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\n            <div slot=\"content\" class=\"widget\">\n                <div class=\"widget-header bg-blue\">\n                    <span class=\"widget-caption\">评论列表</span>\n                </div>\n                <div class=\"widget-body\">\n                    <form class=\"form-inline\" id=\"comment_search\" data-bv-container=\"tooltip\" ms-formvalid=\"$validateFields\">\n                        <ms:search-item label=\"评论人\" col=\"personName\"></ms:search-item>\n\t\t\t\t\t\t<ms:search-item label=\"内容\" col=\"content\"></ms:search-item>\n\t\t\t\t\t\t<ms:search-item-datepicker label=\"开始日期\" col=\"startDate\"></ms:search-item-datepicker>\n\t\t\t\t\t\t<ms:search-item-datepicker label=\"结束日期\" col=\"endDate\"></ms:search-item-datepicker>\n\t\t\t\t\t\t\n                        <ms:search-button class=\"btn btn-info\">搜索</ms:search-button>\n                    </form>\n                    <div class=\"table-toolbar\"></div>\n                    <ms:table class=\"table table-hover table-bordered\">\n                        <!--<ms:check-header slot=\"header\" col=\"id\" width=\"60\"></ms:check-header>-->\n                        <ms:text-header slot=\"header\" col=\"id\" text=\"ID\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"person_name\" text=\"评论人\"></ms:text-header>\n\t\t\t\t\t\t<ms:text-header slot=\"header\" col=\"content\" text=\"内容\"></ms:text-header>\n\t\t\t\t\t\t<ms:text-header slot=\"header\" col=\"postd | date('yyyy-MM-dd HH:mm:ss')\" text=\"评论时间\"></ms:text-header>\n\t\t\t\t\t\t<ms:text-header slot=\"header\" col=\"state | dict('comment')\" text=\"显示状态\"></ms:text-header>\n                        <!--<ms:action-header slot=\"header\" text=\"审核\" action-type=\"audit\"></ms:action-header>-->\n                        <ms:action-header slot=\"header\" text=\"操作\"></ms:action-header>\n                    </ms:table>\n                    <ms:pagination current-page=\"1\"></ms:pagination>\n                </div>\n            </div>\n        </ms:data-box>\n    </div>\n</div>";
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
