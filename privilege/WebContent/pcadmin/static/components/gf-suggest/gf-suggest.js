define('components/gf-suggest/gf-suggest', function(require, exports, module) {

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
      $id: 'gf-suggest',
      '$data-box_config': {
          store: 'suggest',
          dialogId: 'dialog_suggest',
          actionBtns: {
              operation: '<a ms-attr-disabled="el.state == \'D\'" ms-attr-enabled="el.state != \'D\'" href="javascript:;" class="btn btn-danger btn-xs" ms-click="actions.del(el)"><i class="fa fa-trash-o"></i> 删除</a>'
          },
          actions: {
          },
          processData: function (package, post) {
     
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
          $('div[avalonctrl=gf-suggest]').find('form#suggest_search').on('success.field.bv', function(e, data) {
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
  exports.view = "<div class=\"row\" ms-controller=\"gf-suggest\">\n    <div class=\"col-xs-12 col-md-12\">\n        <ms:dialog $id=\"dialog_suggest\" ms-skip>\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <form role=\"form\">\n                        <ms:control-text label=\"评论\" col=\"name\"></ms:control-text>\n                    </form>\n                </div>\n            </div>\n        </ms:dialog>\n        <ms:data-box $id=\"data-box_suggest\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\n            <div slot=\"content\" class=\"widget\">\n                <div class=\"widget-header bg-blue\">\n                    <span class=\"widget-caption\">建议列表</span>\n                </div>\n                <div class=\"widget-body\">\n                    <form class=\"form-inline\" id=\"suggest_search\" data-bv-container=\"tooltip\" ms-formvalid=\"$validateFields\">\n\t\t\t\t\t\t<ms:search-item label=\"内容\" col=\"content\"></ms:search-item>\n\t\t\t\t\t\t<ms:search-item-datepicker label=\"开始时间\" col=\"startDate\"></ms:search-item-datepicker>\n\t\t\t\t\t\t<ms:search-item-datepicker label=\"截止时间\" col=\"endDate\"></ms:search-item-datepicker>\n                        <ms:search-button class=\"btn btn-info\">搜索</ms:search-button>\n                    </form>\n                    <div class=\"table-toolbar\"></div>\n                    <ms:table class=\"table table-hover table-bordered\">\n                        <!--<ms:check-header slot=\"header\" col=\"id\" width=\"60\"></ms:check-header>-->\n                        <ms:text-header slot=\"header\" col=\"id\" text=\"id\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"name\" text=\"评论人\"></ms:text-header>\n\t\t\t\t\t\t<ms:text-header slot=\"header\" col=\"content\" text=\"内容\"></ms:text-header>\n\t\t\t\t\t\t<ms:text-header slot=\"header\" col=\"feedbackd | date('yyyy-MM-dd HH:mm:ss')\" text=\"评论时间\"></ms:text-header>\n                        <ms:action-header slot=\"header\" text=\"操作\"></ms:action-header>\n                    </ms:table>\n                    <ms:pagination current-page=\"1\"></ms:pagination>\n                </div>\n            </div>\n        </ms:data-box>\n    </div>\n</div>";
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
