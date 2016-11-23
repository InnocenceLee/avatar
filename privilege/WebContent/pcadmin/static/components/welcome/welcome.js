define('components/welcome/welcome', function(require, exports, module) {

  var avalon = require('node_modules/avalonjs/avalon');
  var tmpl = "<h1>Welcome!</h1>";
  avalon.templateCache.header = tmpl;
  
  var model = avalon.define({
      $id: "header",
      plans: [],
      user: {},
      getCurrentUser: function () {
          ajax.user.getcurrentuser().done(function (data) {
              model.user = data;
              model.loadTask();
          });
      },
      logout: function () {
          location.href = "/User/Login";
      },
      loadTask: function () {
          ajax.plan.getplansbyuserid(model.user.ID, 1, 999).done(function (data) {
              if (data != null && data != false) {
                  model.plans = data.items;
              }
          });
      }
  });
  
  avalon.vmodels.root.welcome = "welcome";

});
