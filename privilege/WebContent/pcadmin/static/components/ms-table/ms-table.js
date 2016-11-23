define('components/ms-table/ms-table', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  
  avalon.component('ms:table', {
      header: '',
      thead: [],
      $template: "<table>\r\n    <thead>\r\n        <tr>\r\n            <th ms-repeat=\"thead\" ms-css-width=\"el.width\">{{el.content|html}}</th>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        <tr ms-repeat=\"list\">\r\n            <td ms-repeat-td=\"tbody\">{{td|html}}</td>\r\n        </tr>\r\n    </tbody>\r\n</table>",
      $replace: 1,
      $init: function (vm) {
      },
      $childReady: function (vm, el) {
      },
      $ready: function (vm, el) {
          // 因为自定义标签内部写tr或th会被忽略，因此改用div表示th并做此处理让ms-repeat正常遍历
          var tmp = [], columnConfig = [];
          $(vm.$model.header).children().each(function (i, n) {
              var type;
              // 由于框架原因，父组件内部动态生成的子组件不能放进$refs,因此将需要传递的值通过属性放入子组件
              var $cheader = $(n);
              $cheader.attr('container-vm-id', vm.$containerVmId);
              switch ($cheader.get(0).tagName.toLowerCase()) {
                  case 'ms:text-header': {
                      columnConfig.push({
                          type: 'text',
                          name: $cheader.attr('col')
                      });
                  } break;
                  case 'ms:check-header': {
                      columnConfig.push({
                          type: 'check',
                          name: $cheader.attr('col')
                      });
                  } break;
                  case 'ms:action-header': {
                      columnConfig.push({
                          type: 'action',
                          name: avalon.vmodels[vm.$containerVmId]['actionBtns'][$cheader.attr('action-type') || 'operation']
                      });
                  } break;
                  case 'ms:table-header': {
                      columnConfig.push({
                          type: 'custom',
                          name: $cheader
                      });
                  } break;
                  default: {
                      columnConfig.push({
                          type: 'text',
                          name: $cheader.attr('col')
                      });
                  } break;
              }
              tmp.push({
                  width: $cheader.attr('width'),
                  content: $(n).prop('outerHTML')
              });
          });
          vm.thead.clear();
          vm.thead.pushArray(tmp);
  
          // 根据表头配置生成表格内容模板
          vm.tbody = $.map(columnConfig, function (n) {
              if (!n.name) return 'check config';
              var expr = 'el.' + n.name;
              if (n.name && n.name.indexOf && ~n.name.indexOf('$index')) {
                  expr = n.name;
              } else if (n.type == 'action') {
                  // 如果是a标签，也不加修饰
                  expr = n.name;
              } else if (n.type == 'custom') {
                  // 如果是通用头，也不加修饰
                  expr = n.name;
              }
              switch (n.type) {
                  case 'text': return '{{' + expr + '}}';
                  case 'check': return '<div class="checkbox"><label><input type="checkbox" ms-duplex="checked" ms-attr-value="' + expr + '"><span class="text"></span></label></div>';
                  case 'action': return expr;
                  case 'custom': console.log(expr.html());return expr.html();
              }
          });
      },
      tbody: [],
      $containerVmId: ''
  });

});
