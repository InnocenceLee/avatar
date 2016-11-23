define('services/ajaxService', function(require, exports, module) {

  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  var $ = require('vendor/jquery/jquery');
  var bootbox = require('node_modules/bootbox.js/bootbox');
  var beyond = require('vendor/beyond/beyond');
  var Notify = beyond.Notify;
  
  // 拦截ajax请求，检测是否超时，以重新登录
  $(document).ajaxComplete(function (event, xhr, settings) {
      if (xhr.status == 200) {
          if (settings.dataType == 'json' && xhr.responseJSON != void 0) {
              var result = xhr.responseJSON;
              if (result.code === '20' || result.code === '21') {
                  beyond.hideLoading();
                  bootbox.confirm("Session已经失效，请重新登录", function (result) {
                       if (result) {
                           location.href = "/login.html";
                       }
                  });
              } else if (result.error) {
                  beyond.hideLoading();
                  Notify(result.error.message || result.error, 'top-right', '5000', 'danger', 'fa-bolt', true);
              }
          }
      } else if (xhr.status == undefined) {
      	beyond.hideLoading();
      } else {
          beyond.hideLoading();
          Notify('请求错误，请联系管理员', 'top-right', '5000', 'danger', 'fa-bolt', true);
      }
  });
  
  module.exports = function (options) {
      var defaultOptions = {
          url: 'http://127.0.0.1:8080',
          data: {
          },
          dataType: 'json',
          cache: false
      };
      options.data = processRequest(options.data);
      options = $.extend(true, defaultOptions, options);
      return $.ajax(options).then(processResponse);
  };
  
  window.testAjax = function (params) {
      module.exports(params).then(console.log.bind(console));
  }
  
  // 标准化传给后台的参数
  function processRequest(r) {
      var str = r || {}, _m = str._m;
      if (str.start || str.limit) {
          str.page = {
              start: str.start || 0,
              limit: str.limit || 15
          };
          delete str.start;
          delete str.limit;
      }
      delete str._m;
      return {
          _m: _m,
          params: JSON.stringify(str)
      };
  }
  
  // 标准化后台相应数据格式
  function processResponse(r) {
      var str = {};
      if (r.rows) {
          str = r;
          str.code = '0';
          str.list = r.rows;
          delete str.rows;
      } else {
          if (!r.error) {
              str.code = '0';
              str.data = r;
          } else {
              str.code = '1';
              str.message = r.message || r.error;
          }
      }
      return str;
  }

});
