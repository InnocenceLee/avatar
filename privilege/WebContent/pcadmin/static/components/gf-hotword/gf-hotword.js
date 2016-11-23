define('components/gf-hotword/gf-hotword', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  var ajax = require('services/ajaxService');
  var store = require('services/storeService');
  
  require('vendor/avx-component/avx-component');
  
  avalon.filters.typefetter = function (type) {
      if (type.indexOf('H') === 0) {  
          return '后台添加';
      } else if (type.indexOf('A') === 0) {
          return '搜索热词';
      }
  }
  var dataVm, dialogVm;;
  var demo = avalon.define({
      $id: 'gf-hotword',
      '$data-box_config': {
          store: 'hotword',
          dialogId: 'dialog_hotword',
          actionBtns: {
              operation: '<a ms-attr-disabled="el.state == \'D\'" ms-attr-enabled="el.state != \'D\'" href="javascript:;" class="btn btn-danger btn-xs" ms-click="actions.del(el)"><i class="fa fa-trash-o"></i> 删除</a>'+
                         '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.edit(el)"><i class="fa fa-edit"></i> 修改</a> '
  
          },
          actions: {},
      processData: function (package, post) {
           post(function () {});
          }
      },
      
       '$dialog_config': {
          $validateFields: {
              times: {
                  validators: {
                      notEmpty: { message: '请填写搜索次数' },
                      integer: { message: '搜索次数必须是整数' }
                  }
              },
              word: {
                  validators: {
                      notEmpty: { message: '请输入热词' }
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
      }
  });
  
  // 导出模板
  exports.view = "<div class=\"row\" ms-controller=\"gf-hotword\">\n    <div class=\"col-xs-12 col-md-12\">\n        <ms:dialog $id=\"dialog_hotword\" config=\"$dialog_config\" ms-skip>\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <form role=\"form\">\n                        <ms:control-text label=\"热词\" col=\"word\"></ms:control-text>\n                        <ms:control-text label=\"搜索次数\" col=\"times\"></ms:control-text>\n                    </form>\n                </div>\n            </div>\n        </ms:dialog>\n        <ms:data-box $id=\"data-box_hotword\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\n            <div slot=\"content\" class=\"widget\">\n                <div class=\"widget-header bg-blue\">\n                    <span class=\"widget-caption\">热词列表</span>\n                </div>\n                <div class=\"widget-body\">\n                    <form class=\"form-inline\">\n\t\t\t\t\t\t<ms:search-item label=\"热词\" col=\"word\"></ms:search-item>\n\t\t\t\t\t    <ms:search-item label=\"搜索次数上限\" col=\"top\"></ms:search-item>\n\t\t\t\t\t     <ms:search-item label=\"搜索次数下限\" col=\"bottom\"></ms:search-item>\n                        <ms:search-button class=\"btn btn-info\">搜索</ms:search-button>\n                    </form>\n                    <div class=\"table-toolbar\" >\n                        <button class=\"btn btn-info\" ms-click=\"actions.add\">\n                            <span class=\"fa fa-plus\">\n                            </span>新增\n                        </button>\n                    </div>\n                    <ms:table class=\"table table-hover table-bordered\">\n                        <!--<ms:check-header slot=\"header\" col=\"id\" width=\"60\"></ms:check-header>-->\n                        <ms:text-header slot=\"header\" col=\"id\" text=\"id\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"word\" text=\"热词\"></ms:text-header>\n\t\t\t\t\t\t<ms:text-header slot=\"header\" col=\"times\" text=\"搜索次数\"></ms:text-header>\n\t\t\t\t\t\t<ms:text-header slot=\"header\" col=\"type | typefetter\" text=\"产生方式\"></ms:text-header>\n                        <ms:action-header slot=\"header\" text=\"操作\"></ms:action-header>\n                    </ms:table>\n                    <ms:pagination current-page=\"1\"></ms:pagination>\n                </div>\n            </div>\n        </ms:data-box>\n    </div>\n</div>";
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
