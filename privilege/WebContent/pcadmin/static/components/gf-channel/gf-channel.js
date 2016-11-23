define('components/gf-channel/gf-channel', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  var ajax = require('services/ajaxService');
  var store = require('services/storeService');
  
  require('vendor/avx-component/avx-component');
  var itemSelector = require('components/gf-select-item/gf-select-item');
  
  var dataVm;
  var demo = avalon.define({
      $id: 'gf-channel',
      '$data-box_config': {
          store: 'channel',
          dialogId: 'dialog_channel',
          actionBtns: {
              operation: '<a href="javascript:;" class="btn btn-success btn-xs" ms-click="actions.rise(el, $outer.$index)" title="向上移动"><i class="fa fa-arrow-up"></i> </a> ' +  
                  '<a href="javascript:;" class="btn btn-success btn-xs" ms-click="actions.drop(el, $outer.$index)" title="向下移动"><i class="fa fa-arrow-down"></i> </a> ' + 
                  '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.detail(el)"><i class="fa fa-edit"></i> 查看详情</a> ' +
                  '<a href="javascript:;" class="btn btn-info btn-xs" ms-click="actions.edit(el)"><i class="fa fa-edit"></i> 编辑</a> ' + 
                  '<a href="javascript:;" class="btn btn-danger btn-xs" ms-click="actions.del(el)"><i class="fa fa-trash-o"></i> 删除</a>'
          },
          actions: {
              rise: function (record, index) {
                  var prevRecord = dataVm.list[index - 1];
                  prevRecord && store.channel.sort({
                      firstId: record.id,
                      firstRank: record.rank,
                      secondId: prevRecord.id,
                      secondRank: prevRecord.rank
                  }).then(function (result) {
                      if (result.code == '0') {
                          dataVm.loadData();
                      }
                  });
              },
              drop: function (record, index) {
                  var nextRecord = dataVm.list[index + 1];
                  nextRecord && store.channel.sort({
                      firstId: record.id,
                      firstRank: record.rank,
                      secondId: nextRecord.id,
                      secondRank: nextRecord.rank
                  }).then(function (result) {
                      if (result.code == '0') {
                          dataVm.loadData();
                      }
                  });
              },
              detail: function (record) {
                  avalon.router.navigate('channel_detail/' + record.id);
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
      '$dialog_config': {
          $validateFields: {
              name: {
                  validators: {
                      notEmpty: { message: '请填写专栏名称' }
                  }
              },
              author_name: {
                  validators: {
                      notEmpty: { message: '请填写作者' }
                  }
              },
              'tag.thumb': {
                  validators: {
                      notEmpty: { message: '请选择专栏头像图' },
                      uri: { message: '格式不正确，请重新上传' }
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
  var form = avalon.define({
      $id: 'gf-channel.form'
  });
  
  // 导出模板
  exports.view = "<div class=\"row\" ms-controller=\"gf-channel\">\n    <div class=\"col-xs-12 col-md-12\">\n        <ms:dialog $id=\"dialog_channel\" config=\"$dialog_config\" ms-skip>\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <form role=\"form\">\n                        <ms:control-text label=\"栏目名称\" col=\"name\"></ms:control-text>\n                        <ms:control-text label=\"苹果商品ID（请与苹果后台商品id一致）\" col=\"apple_id\"></ms:control-text>\n                        <ms:control-text label=\"学者姓名\" col=\"author_name\"></ms:control-text>\n                        <ms:control-text label=\"学者领域\" col=\"author_field\"></ms:control-text>\n                        <ms:control-text label=\"一句话简介\" col=\"brief\"></ms:control-text>\n                        <ms:control-text label=\"订阅数\" col=\"buy_count\"></ms:control-text>\n                        <ms:control-text label=\"套餐价格（请与苹果后台价格一致）\" col=\"suites[].price\" duplex=\"el.price\" ms-repeat=\"record.suites\"></ms:control-text>\n\t\t\t\t\t\t<ms:control-text label=\"套餐有效时间\" col=\"suites[].effectDuration\" duplex=\"el.effectDuration\" ms-repeat=\"record.suites\"></ms:control-text>\n\t\t\t\t\t\t<ms:control-select label=\"套餐时间类别\" col=\"suites[].unit\" duplex=\"el.unit\" ms-repeat=\"record.suites\">\n                            <option value=\"Y\">年</option>\n                            <option value=\"M\">月</option>\n\t\t\t\t\t\t\t<option value=\"D\">日</option>\n                        </ms:control-select>\n                        <ms:control-text ms-visible=\"false\" label=\"简介\" col=\"tag.brief\"></ms:control-text>\n                        <ms:control-text ms-visible=\"false\" label=\"适宜人群\" col=\"tag.suit_crowds\"></ms:control-text>\n                        <ms:control-text ms-visible=\"false\" label=\"订阅须知\" col=\"tag.information\"></ms:control-text>\n                        <div class=\"form-group\">\n                            <label>专栏头像图</label>\n                            <img ms-attr-src=\"record.tag.thumb\" style=\"height: 100px;display:block;\">\n                        </div>\n                        <ms:control-file col=\"tag.thumb\" btn-text=\"更换头像\" placeholder=\"建议尺寸：180 x 248\"></ms:control-file>\n                    </form>\n                </div>\n            </div>\n        </ms:dialog>\n        <ms:data-box $id=\"data-box_channel\" on-init=\"dataBoxInit\" config=\"$data-box_config\">\n            <div slot=\"content\" class=\"widget\">\n                <div class=\"widget-header bg-blue\">\n                    <span class=\"widget-caption\">专栏列表</span>\n                </div>\n                <div class=\"widget-body\">\n                    <form class=\"form-inline\">\n                        <ms:search-item label=\"名称\" col=\"name\"></ms:search-item>\n                        <ms:search-item label=\"学者姓名\" col=\"author_name\"></ms:search-item>\n                        <ms:search-item label=\"学者领域\" col=\"author_field\"></ms:search-item>\n                        <ms:search-button class=\"btn btn-info\">搜索</ms:search-button>\n                    </form>\n                    <div class=\"table-toolbar\">\n                        <button class=\"btn btn-info\" ms-click=\"actions.add\">\n                            <span class=\"fa fa-plus\">\n                            </span>新增专栏\n                        </button>\n                    </div>\n                    <ms:table class=\"table table-hover table-bordered\">\n                        <ms:text-header slot=\"header\" col=\"name\" text=\"栏目名\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"author_name\" text=\"学者姓名\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"author_field\" text=\"学者领域\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"brief\" text=\"一句话简介\"></ms:text-header>\n                        <ms:text-header slot=\"header\" col=\"buy_count\" text=\"订阅数\"></ms:text-header>\n                        <ms:action-header slot=\"header\" width=\"350\" text=\"操作\"></ms:action-header>\n                    </ms:table>\n                    <ms:pagination current-page=\"1\" page-count=\"4\"></ms:pagination>\n                </div>\n            </div>\n        </ms:data-box>\n    </div>\n</div>";
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
