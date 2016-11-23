define('components/dashboard/dashboard', function(require, exports, module) {

  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var ajax = require('services/ajaxService');
  var store = require('services/storeService');
  var config = require('services/configService');
  
  var vm = avalon.define({
      $id: 'dashboard',
      unsendOrderCount: 0,
      unauditCommentCount: 0
  });
  
  exports.view = "<div class=\"row\" ms-controller=\"dashboard\">\n    <div class=\"col-md-4 col-md-offset-4\">\n        <a href=\"#!/order_unsend\">\n            <div class=\"databox radius-bordered databox-shadowed\">\n                <div class=\"databox-left bg-themesecondary\">\n                </div>\n                <div class=\"databox-right\">\n                    <span class=\"databox-number themesecondary\">{{unsendOrderCount}}个</span>\n                    <div class=\"databox-text darkgray\">新的待发货订单</div>\n                    <div class=\"databox-stat themesecondary radius-bordered\">\n                        <i class=\"stat-icon icon-lg fa fa-tasks\"></i>\n                    </div>\n                </div>\n            </div>\n        </a>\n    </div>\n    <!--<div class=\"col-md-3\">\n        <a href=\"#!/comment\">\n            <div class=\"databox radius-bordered databox-shadowed\">\n                <div class=\"databox-left bg-themethirdcolor\">\n                </div>\n                <div class=\"databox-right\">\n                    <span class=\"databox-number themethirdcolor\">{{unauditCommentCount}}条</span>\n                    <div class=\"databox-text darkgray\">待审核评论</div>\n                    <div class=\"databox-stat themethirdcolor radius-bordered\">\n                        <i class=\"stat-icon icon-lg fa fa-tasks\"></i>\n                    </div>\n                </div>\n            </div>\n        </a>\n    </div>-->\n</div>";
  exports.controller = avalon.controller(function($ctrl) {
      $ctrl.$onRendered = function() {
          store['order-unsend'].count().then(function (result) {
              vm.unsendOrderCount = +result.list[0].count;
          });
          //store['comment'].count().then(function (result) {
          //    vm.unauditCommentCount = +result.list[0].count;
          //  });
          beyond.hideLoading();
      }
      $ctrl.$onEnter = function(){
      }
      $ctrl.$onBeforeUnload = function() {}
      $ctrl.$vmodels = []
  });

});
