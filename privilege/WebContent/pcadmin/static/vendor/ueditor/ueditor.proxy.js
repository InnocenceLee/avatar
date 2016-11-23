define('vendor/ueditor/ueditor.proxy', function(require, exports, module) {

  require('vendor/ueditor/ueditor.all');
  var config = require('services/configService');
  
  UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
      UE.Editor.prototype.getActionUrl = function(action) {
      if (action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadimage') {
          return config.basePath.url + '/backPortal/itemManage.d2js?_m=ueditoruploadFile';
      } else if (action == 'uploadvideo') {
          return config.basePath.url + '/backPortal/itemManage.d2js?_m=ueditoruploadFile';
      } else {
          return this._bkGetActionUrl.call(this, action);
      }
  }

});
