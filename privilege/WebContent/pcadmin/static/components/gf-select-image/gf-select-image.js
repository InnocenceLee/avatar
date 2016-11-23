define('components/gf-select-image/gf-select-image', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  var ajax = require('services/ajaxService');
  
  require('vendor/avx-component/avx-component');
  
  var dialogVm = null;
  var selectorVm = avalon.define({
      $id: 'gf-select-image',
      dialogInit: function (vm) {
          dialogVm = vm;
          dialogVm.record = { image: '' };
          dialogVm.$watch('record.image', function (newV) {
              if (false || !urlExp.test(newV)) {
                  dialogVm.valid = false;
              } else {
                  dialogVm.valid = true;
              }
          });
      }
  });
  var dataVm = avalon.define({
      $id: 'gf-select-image_data'
  });
  
  // 导出模板
  $('#dialog_layer').append("<div ms-controller=\"gf-select-image\">\r\n    <ms:dialog $id=\"dialog_select_image\" ms-skip on-init=\"dialogInit\">\r\n        <span slot=\"header\">选择图片</span>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\" ms-controller=\"gf-select-image_data\">\r\n                <form role=\"form\">\r\n                    <ms:control-file label=\"请选择图片\" btn-text=\"选择图片\" col=\"image\" ms-attr-loaded=\"valid\"></ms:control-file>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </ms:dialog>\r\n</div>");
  avalon.scan($('#dialog_layer').get(0), selectorVm);
  // 导出逻辑
  exports.open = function (prop, cb) {
      if (dialogVm) {
          dialogVm.show = true;
          dialogVm.valid = false;
          dialogVm.$post = function (package) {
              if (package.record.image) {
                  cb(package.record);
              } else {
                  Notify('请选择图片', 'top-right', '5000', 'warning', 'fa-warning', true);
                  return false;
              }
              return true;
          }
      }
  }
  
  var allowLocal = true,
      protocol   = ('http, https, ftp').split(',').join('|').replace(/\s/g, ''),
      urlExp     = new RegExp(
          "^" +
          // protocol identifier
          "(?:(?:" + protocol + ")://)" +
          // user:pass authentication
          "(?:\\S+(?::\\S*)?@)?" +
          "(?:" +
          // IP address exclusion
          // private & local networks
          (allowLocal
              ? ''
              : ("(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
                  "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
                  "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})")) +
          // IP address dotted notation octets
          // excludes loopback network 0.0.0.0
          // excludes reserved space >= 224.0.0.0
          // excludes network & broadcast addresses
          // (first & last IP address of each class)
          "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
          "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
          "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
          "|" +
          // host name
          "(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)" +
          // domain name
          "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*" +
          // TLD identifier
          "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
          // Allow intranet sites (no TLD) if `allowLocal` is true
          (allowLocal ? '?' : '') +
          ")" +
          // port number
          "(?::\\d{2,5})?" +
          // resource path
          "(?:/[^\\s]*)?" +
          "$", "i"
  );

});
