define('components/directive-form-validate/directive-form-validate', function(require, exports, module) {

  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  
  avalon.directive('formvalid', {
      init: function (binding) {
          var elem = binding.element, $form = $(elem);
          var vm;
          for (var i in binding.vmodels) {
              if (binding.vmodels[i].hasOwnProperty(binding.expr)) {
                  vm = binding.vmodels[i];
                  break;
              }
          }
          setTimeout(function () {
              $form.bootstrapValidator({
                  excluded: [':hidden'],
                  feedbackIcons: {
                      valid: 'glyphicon glyphicon-ok',
                      invalid: 'glyphicon glyphicon-remove',
                      validating: 'glyphicon glyphicon-refresh'
                  },
                  submitHandler: function (validator, form, submitButton) {
                      // Do nothing
                  },
                  fields: vm[binding.expr]
              }).on('success.field.bv', function(e, data) {
                  if (data.bv.getInvalidFields().length > 0) {
                      vm.valid = false;
                  } else {
                      vm.valid = true;
                  }
              }).on('error.field.bv', function (e, data) {
                  if (data.bv.getInvalidFields().length > 0) {
                      vm.valid = false;
                  } else {
                      vm.valid = true;
                  }
              });
          }, 10);
          binding.rollback = function () {
              $form.data('bootstrapValidator').destroy();
          }
      },
      update: function (newV, oldV) {
  
      }
  });

});
