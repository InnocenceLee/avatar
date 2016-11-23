define('components/ms-control-ueditor/ms-control-ueditor', function(require, exports, module) {

  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  require('vendor/ueditor/ueditor');
  
  /**
   * ueditor组件
   * @prop label 文本框前的label标签内容
   * @prop col 如果有绑定的数据行，此属性值指的是数据的字段名称
   * @prop duplex 自定义的绑定数据，如果同时存在则会覆盖col
   * 
   * @example
   * ``` html
   * <!-- 注：例1和例2效果是一样的 -->
   * <ms:control-ueditor label="标题1" col="name"></ms:control-ueditor>
   * <ms:control-ueditor label="标题2" duplex="record['name']"></ms:control-ueditor>
   * <ms:control-ueditor label="标题3" duplex="state.text"></ms:control-ueditor>
   * ```
   */
  avalon.component('ms:controlUeditor', {
      $template: "<div class=\"form-group\">\r\n    <label>{{label}}</label>\r\n    <script id=\"editor\" type=\"text/plain\" style=\"width:100%;height:300px;\"></script>\r\n    <input class=\"form-control hidden\" ms-duplex=\"record[col]\" ms-attr-name=\"col\">\r\n</div>",
      $replace: 1,
      $$template: function (tmpl) {
          if (this.duplex) {
              // 如果配置了duplex属性，则直接使用duplex的属性值绑定控件
              return tmpl.replace(/ms-duplex="record\[col\]"/g, 'ms-duplex="' + this.duplex + '"');
          }
          if (this.col) {
              // 否则用col的配置，使用record[col]去绑定控件
              return tmpl.replace(/ms-duplex="record\[col\]"/g, 'ms-duplex="record[\'' + this.col.replace('.', '\'][\'') + '\']"');
          }
          return tmpl;
      },
      $init: function (vm, el) {},
      $ready: function (vm, el) {
          var editorId = 'editor' + vm.$id, ue;
          var $input = $(el).find('input.hidden');
          vm.$editorId = editorId; 
          $(el).find('script').attr('id', editorId);
          ue = vm.zIndex ? 
              UE.getEditor(editorId, {
                  zIndex: vm.zIndex || window.UEDITOR_CONFIG.zIndex,
                  allowDivTransToP: false
              }) : 
              UE.getEditor(editorId, {
                  allowDivTransToP: false
              });
          UE.getEditor(editorId, {
              toolbars: ue.getOpt('toolbars').push(['button'])
          });
          ue.addListener('ready', function() {
              this.setContent($input.val());
          });
          ue.addListener('contentChange',function(){
              $input.val(this.getContent()).trigger('input');;
          });
      },
      $dispose: function (vm) {
          vm.$editorId && UE.delEditor(vm.$editorId);
      },
      label: '',
      col: '',
      duplex: '',
      zIndex: window.UEDITOR_CONFIG.zIndex || 900,
      $editorId: '',
      insertRichEntity: function (entity) {
          var vm = this;
          entity = [].concat(entity);
          var ue = UE.getEditor(vm.$editorId);
          for (var i = 0, n; n = entity[i]; i++) {
              ue.execCommand('inserthtml', '<a href="good/' + n.id + '" style="display: block; width: 325px; text-decoration: none; color: #000000">' + 
                                              '<div style="position: relative; margin-bottom: 10px;margin-left: 25px;height: 155px;width: 300px;border-radius: 2px;border: solid 1px #dcdcdc;background: inherit;box-sizing: border-box;">' + 
                                                  '<div style="position: absolute;left: -30px;top: 15px;border-radius: 2px;">' + 
                                                      '<img class="embedItem" width="90" height="124" src="' + n.thumb + '"/>' + 
                                                  '</div>' + 
                                                  '<span style="position: absolute;right: 18px;bottom: 15px;font-size: 12px;color: #00a8f3; text-decoration: none;">点 击 查 看<em style="font-style: inherit;vertical-align: middle;margin-left: 6px;">&gt;</em></span>' + 
                                                  '<span style="display: inline-block; width: 210px;margin-left: 77px;margin-top: 20px;line-height: 20px;font-weight: bold;font-size: 15px;color: #333333;">' + n.name + '</span>' + 
                                                  '<div style="width: 210px;margin-left: 77px;margin-top: 14px;margin-right: 18px;font-size: 12px;color: #888888;height: 41px;line-height: 16px;overflow: hidden;">' + n.bio + '</div>' + 
                                                  '<div style="clear: both;"></div>' +
                                              '</div>' + 
                                          '</a><p><br/></p>');
          }
      }
  });

});
