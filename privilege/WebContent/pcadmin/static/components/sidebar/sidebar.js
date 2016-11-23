define('components/sidebar/sidebar', function(require, exports, module) {

  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  
  var menuService = require('services/menuService');
  
  var sidebar = avalon.define({
      $id: 'sidebar',
      menu: [],
      actived: 'dashboard',
      menuClick: function (item, parent) {
          sidebar.actived = item.name;
      },
      search: function() {
          sidebar.$fire('all!title', 'Demo');
      },
      isChildActived: function (item) {
          if (item.name === sidebar.actived) {
              return false;
          }
          for (var i = 0, bread; bread = avalon.vmodels.root.breadCrumb.$model[i++]; ) {
              return bread.name === item.name;
          }
      }
  });
  
  exports.view = "<!-- Page Sidebar Header -->\n<!--<div class=\"sidebar-header-wrapper\">\n    <input type=\"text\" class=\"searchinput\" ms-click=\"search\"/>\n    <i class=\"searchicon fa fa-search\"></i>\n    <div class=\"searchhelper\">Search Reports, Charts, Emails or Notifications</div>\n</div>-->\n<!-- /Page Sidebar Header -->\n<!-- Sidebar Menu -->\n<ul class=\"nav sidebar-menu\">\n    <!--Dashboard-->\n    <li ms-class=\"active:actived===item.name\" ms-class-1=\"open:isChildActived(item)\"  ms-repeat-item=\"menu\">\n        <a ms-attr-href=\"{{ item.href }}\" ms-class=\"menu-dropdown:item.children && item.children.size() > 0\"  ms-click=\"menuClick(item)\">\n            <i ms-class=\"menu-icon glyphicon {{ item.icon }}\"></i>\n            <span class=\"menu-text\"> {{ item.title }} </span>\n            <i class=\"menu-expand\" ms-if=\"item.children && item.children.size() > 0\"></i>\n        </a>\n        <ul class=\"submenu\" ms-if=\"item.children && item.children.size() > 0\">\n            <li ms-class=\"active:actived===sub.name\" ms-repeat-sub=\"item.children\">\n                <a ms-attr-href=\"{{ sub.href }}\" ms-click=\"menuClick(sub, item)\">\n                    <span class=\"menu-text\">{{ sub.title }}</span>\n                </a>\n            </li>\n            <!--<li>\n                <a href=\"#\" class=\"menu-dropdown\">\n                    <span class=\"menu-text\">\n                        Icons\n                    </span>\n                    <i class=\"menu-expand\"></i>\n                </a>\n\n                <ul class=\"submenu\">\n                    <li>\n                        <a href=\"font-awesome.html\">\n                            <i class=\"menu-icon fa fa-rocket\"></i>\n                            <span class=\"menu-text\">Font Awesome</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"glyph-icons.html\">\n                            <i class=\"menu-icon glyphicon glyphicon-stats\"></i>\n                            <span class=\"menu-text\">Glyph Icons</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"typicon.html\">\n                            <i class=\"menu-icon typcn typcn-location-outline\"></i>\n                            <span class=\"menu-text\"> Typicons</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"weather-icons.html\">\n                            <i class=\"menu-icon wi-day-snow\"></i>\n                            <span class=\"menu-text\">Weather Icons</span>\n                        </a>\n                    </li>\n                </ul>\n            </li>-->\n        </ul>\n    </li>\n</ul>\n<!-- /Sidebar Menu -->";
  exports.controller = avalon.controller(function($ctrl) {
      // 视图渲染后，意思是avalon.scan完成
      $ctrl.$onRendered = function() {
          beyond.initSidebar();
      }
      // 进入视图
      $ctrl.$onEnter = function() {
          menuService.menu.then(function (menu) {
              sidebar.menu = menu;
          });
      }
      // 对应的视图销毁前
      $ctrl.$onBeforeUnload = function() {}
      // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
      $ctrl.$vmodels = []
  });

});
