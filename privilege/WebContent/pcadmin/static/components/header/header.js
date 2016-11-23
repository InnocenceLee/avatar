define('components/header/header', function(require, exports, module) {

  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var ajax = require('services/ajaxService');
  var config = require('services/configService');
  
  var header = avalon.define({
      $id: 'header',
      currentUserName: '',
      logout: function () {
          window.sessionStorage.clear('adminSession');
          window.location.href = config.basePath.url + '/index.jssp?_m=logout';
      }
  });
  
  exports.view = "    <div class=\"navbar-inner\" ms-controller=\"header\">\n        <div class=\"navbar-container\">\n            <!-- Navbar Barnd -->\n            <div class=\"navbar-header pull-left\">\n                <a href=\"#\" class=\"navbar-brand\" style=\"margin-top: 10px;\">\n                    <small>\n                    \t功夫财经管理平台\n                    </small>\n                </a>\n            </div>\n            <!-- /Navbar Barnd -->\n\n            <!-- Sidebar Collapse -->\n            <div class=\"sidebar-collapse\" id=\"sidebar-collapse\">\n                <i class=\"collapse-icon fa fa-bars\"></i>\n            </div>\n            <!-- /Sidebar Collapse -->\n            <!-- Account Area and Settings -->\n            <div class=\"navbar-header pull-right\">\n                <div class=\"navbar-account\">\n                    <ul class=\"account-area\">\n                       <li>\n                            <a class=\"login-area dropdown-toggle\" data-toggle=\"dropdown\">\n                                <div class=\"avatar\" title=\"View your public profile\">\n                                    <img src=\"/privilege/pcadmin//static/beyond/img/avatars/adam-jansen.jpg\">\n                                </div>\n                                <section>\n                                    <h2><span class=\"profile\"><span>{{user.name}}</span></span></h2>\n                                </section>\n                            </a>\n                            <!--Login Area Dropdown-->\n                            <ul class=\"pull-right dropdown-menu dropdown-arrow dropdown-login-area\">\n                                <li class=\"username\"><a>David Stevenson</a></li>\n                                <!--<li class=\"email\"><a>David.Stevenson@live.com</a></li>-->\n                                <li class=\"edit\">\n                                    <a href=\"javascript:;\" class=\"pull-left\" ms-click=\"logout\">\n                                        退出登录\n                                    </a>\n                                    <!--<a href=\"javascript:;\" class=\"pull-left\">Profile</a>\n                                    <a href=\"#\" class=\"pull-right\">Setting</a>-->\n                                </li>\n                                <!--<li class=\"dropdown-footer\">\n                                    <a href=\"javascript:;\" ms-click=\"logout\">\n                                        退出登录\n                                    </a>\n                                </li>-->\n                            </ul>\n                            <!--/Login Area Dropdown-->\n                        </li>\n                        <!-- /Account Area -->\n                        <!--Note: notice that setting div must start right after account area list.\n                        no space must be between these elements-->\n                    </ul>\n                </div>\n            </div>\n            <!-- /Account Area and Settings -->\n        </div>\n    </div>";
  exports.controller = avalon.controller(function($ctrl) {
      // 视图渲染后，意思是avalon.scan完成
      $ctrl.$onRendered = function() {
          beyond.initHeader();
      }
      // 进入视图
      $ctrl.$onEnter = function() {
          ajax({
              url: config.basePath.url + '/backPortal/itemManage.d2js?_m=getCurrentUser',
              type: 'get'
          }).then(function (result) {
              if (!result.data.person) {
                  window.location.href = config.basePath.url + '/index.jssp?_m=logout';
              }
              $('.login-area').removeClass('hidden').addClass('animated flipInX');
              avalon.mix(avalon.vmodels.root, { user: result.data.person });
          });
      }
      // 对应的视图销毁前
      $ctrl.$onBeforeUnload = function() {}
      // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
      $ctrl.$vmodels = []
  });

});
