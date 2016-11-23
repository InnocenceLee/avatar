define('components/ms-control-textarea/ms-control-textarea', function(require, exports, module) {

  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  
  /**
   * 多行文本输入组件
   * @prop label 文本框前的label标签内容
   * @prop col 如果有绑定的数据行，此属性值指的是数据的字段名称
   * @prop duplex 自定义的绑定数据，如果同时存在则会覆盖col
   * @prop rows 文本框行数
   * 
   * @example
   * ``` html
   * <!-- 注：例1和例2效果是一样的 -->
   * <ms:control-textarea label="标题1" col="name"></ms:control-textarea>
   * <ms:control-textarea label="标题2" duplex="record['name']"></ms:control-textarea>
   * <ms:control-textarea label="标题3" duplex="state.text"></ms:control-textarea>
   * ```
   */
  avalon.component('ms:controlTextarea', {
      $template: "<div class=\"form-group\">\n    <label class=\"control-label\">{{label}}</label>\n    <textarea class=\"form-control\" ms-duplex=\"record[col]\" ms-attr-rows=\"rows\" ms-attr-name=\"col\"></textarea>\n</div>",
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
      $init: function (vm, el) {
          
      },
      label: '',
      col: '',
      duplex: '',
      rows: ''
  });

});
