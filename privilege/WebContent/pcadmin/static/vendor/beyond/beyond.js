define('vendor/beyond/beyond', function(require, exports, module) {

  var $ = require('vendor/jquery/jquery');
  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  require('vendor/mmState/mmState');
  var toastr = require('vendor/toastr/toastr');
  var bootbox = require('node_modules/bootbox.js/bootbox');
  
  function getThemeColorFromCss(n) {
      var t = $("<span><\/span>").hide().appendTo("body"), i;
      return t.addClass(n),
      i = t.css("color"),
      t.remove(),
      i
  }
  function InitiateSideMenu() {
      $(".sidebar-toggler").on("click", function() {
          return $("#sidebar").toggleClass("hide"),
          $(".sidebar-toggler").toggleClass("active"),
          !1
      });
      var isMenuCompacted = $("#sidebar").hasClass("menu-compact");
      $("#sidebar-collapse").on("click", function() {
          $("#sidebar").is(":visible") || $("#sidebar").toggleClass("hide");
          $("#sidebar").toggleClass("menu-compact");
          $(".sidebar-collapse").toggleClass("active");
          isMenuCompacted = $("#sidebar").hasClass("menu-compact");
          isMenuCompacted && $(".open > .submenu").removeClass("open")
          $('ul.breadcrumb').css('margin-left', isMenuCompacted ? '-110px' : '12px');
      });
      $(".sidebar-menu").on("click", function(e) {
          var $btnItem = $(e.target).closest("a"), eleTitle, r, f;
          if ($btnItem && $btnItem.length != 0) {
              if (!$btnItem.hasClass("menu-dropdown"))
                  return isMenuCompacted && $btnItem.get(0).parentNode.parentNode == this && (eleTitle = $btnItem.find(".menu-text").get(0),
                  e.target != eleTitle && !$.contains(eleTitle, e.target)) ? !1 : void 0;
              if (r = $btnItem.next().get(0),
              !$(r).is(":visible")) {
                  if (f = $(r.parentNode).closest("ul"),
                  isMenuCompacted && f.hasClass("sidebar-menu"))
                      return;
                  f.find("> .open > .submenu").each(function() {
                      this == r || $(this.parentNode).hasClass("active") || $(this).slideUp(200).parent().removeClass("open")
                  })
              }
              return isMenuCompacted && $(r.parentNode.parentNode).hasClass("sidebar-menu") ? !1 : ($(r).slideToggle(200).parent().toggleClass("open"),
              !1)
          }
      })
  }
  function InitiateWidgets() {
      $('.widget-buttons *[data-toggle="maximize"]').on("click", function(n) {
          n.preventDefault();
          var t = $(this).parents(".widget").eq(0)
            , i = $(this).find("i").eq(0)
            , r = "fa-compress"
            , u = "fa-expand";
          t.hasClass("maximized") ? (i && i.addClass(u).removeClass(r),
          t.removeClass("maximized"),
          t.find(".widget-body").css("height", "auto")) : (i && i.addClass(r).removeClass(u),
          t.addClass("maximized"),
          maximize(t))
      });
      $('.widget-buttons *[data-toggle="collapse"]').on("click", function(n) {
          n.preventDefault();
          var t = $(this).parents(".widget").eq(0)
            , r = t.find(".widget-body")
            , i = $(this).find("i")
            , u = "fa-plus"
            , f = "fa-minus"
            , e = 300;
          t.hasClass("collapsed") ? (i && i.addClass(f).removeClass(u),
          t.removeClass("collapsed"),
          r.slideUp(0, function() {
              r.slideDown(e)
          })) : (i && i.addClass(u).removeClass(f),
          r.slideUp(200, function() {
              t.addClass("collapsed")
          }))
      });
      $('.widget-buttons *[data-toggle="dispose"]').on("click", function(n) {
          n.preventDefault();
          var i = $(this)
            , t = i.parents(".widget").eq(0);
          t.hide(300, function() {
              t.remove()
          })
      })
  }
  function maximize(n) {
      if (n) {
          var t = $(window).height()
            , i = n.find(".widget-header").height();
          n.find(".widget-body").height(t - i)
      }
  }
  function scrollTo(n, t) {
      var i = n && n.size() > 0 ? n.offset().top : 0;
      jQuery("html,body").animate({
          scrollTop: i + (t ? t : 0)
      }, "slow")
  }
  function Notify(n, t, i, r, u, f) {
      toastr.options.positionClass = "toast-" + t;
      toastr.options.extendedTimeOut = 0;
      toastr.options.timeOut = i;
      toastr.options.closeButton = f;
      toastr.options.iconClass = u + " toast-" + r;
      toastr.custom(n)
  }
  function InitiateSettings() {
      readCookie("navbar-fixed-top") != null && readCookie("navbar-fixed-top") == "true" && ($("#checkbox_fixednavbar").prop("checked", !0),
      $(".navbar").addClass("navbar-fixed-top"));
      readCookie("sidebar-fixed") != null && readCookie("sidebar-fixed") == "true" && ($("#checkbox_fixedsidebar").prop("checked", !0),
      $(".page-sidebar").addClass("sidebar-fixed"));
      readCookie("breadcrumbs-fixed") != null && readCookie("breadcrumbs-fixed") == "true" && ($("#checkbox_fixedbreadcrumbs").prop("checked", !0),
      $(".page-breadcrumbs").addClass("breadcrumbs-fixed"));
      readCookie("page-header-fixed") != null && readCookie("page-header-fixed") == "true" && ($("#checkbox_fixedheader").prop("checked", !0),
      $(".page-header").addClass("page-header-fixed"));
      $("#checkbox_fixednavbar").change(function() {
          $(".navbar").toggleClass("navbar-fixed-top");
          $("#checkbox_fixedsidebar").is(":checked") && ($("#checkbox_fixedsidebar").prop("checked", !1),
          $(".page-sidebar").toggleClass("sidebar-fixed"));
          $("#checkbox_fixedbreadcrumbs").is(":checked") && !$(this).is(":checked") && ($("#checkbox_fixedbreadcrumbs").prop("checked", !1),
          $(".page-breadcrumbs").toggleClass("breadcrumbs-fixed"));
          $("#checkbox_fixedheader").is(":checked") && !$(this).is(":checked") && ($("#checkbox_fixedheader").prop("checked", !1),
          $(".page-header").toggleClass("page-header-fixed"));
          setCookiesForFixedSettings()
      });
      $("#checkbox_fixedsidebar").change(function() {
          $(".page-sidebar").toggleClass("sidebar-fixed");
          $("#checkbox_fixednavbar").is(":checked") || ($("#checkbox_fixednavbar").prop("checked", !0),
          $(".navbar").toggleClass("navbar-fixed-top"));
          $("#checkbox_fixedbreadcrumbs").is(":checked") && !$(this).is(":checked") && ($("#checkbox_fixedbreadcrumbs").prop("checked", !1),
          $(".page-breadcrumbs").toggleClass("breadcrumbs-fixed"));
          $("#checkbox_fixedheader").is(":checked") && !$(this).is(":checked") && ($("#checkbox_fixedheader").prop("checked", !1),
          $(".page-header").toggleClass("page-header-fixed"));
          setCookiesForFixedSettings()
      });
      $("#checkbox_fixedbreadcrumbs").change(function() {
          $(".page-breadcrumbs").toggleClass("breadcrumbs-fixed");
          $("#checkbox_fixedsidebar").is(":checked") || ($("#checkbox_fixedsidebar").prop("checked", !0),
          $(".page-sidebar").toggleClass("sidebar-fixed"));
          $("#checkbox_fixednavbar").is(":checked") || ($("#checkbox_fixednavbar").prop("checked", !0),
          $(".navbar").toggleClass("navbar-fixed-top"));
          $("#checkbox_fixedheader").is(":checked") && !$(this).is(":checked") && ($("#checkbox_fixedheader").prop("checked", !1),
          $(".page-header").toggleClass("page-header-fixed"));
          setCookiesForFixedSettings()
      });
      $("#checkbox_fixedheader").change(function() {
          $(".page-header").toggleClass("page-header-fixed");
          $("#checkbox_fixedbreadcrumbs").is(":checked") || ($("#checkbox_fixedbreadcrumbs").prop("checked", !0),
          $(".page-breadcrumbs").toggleClass("breadcrumbs-fixed"));
          $("#checkbox_fixedsidebar").is(":checked") || ($("#checkbox_fixedsidebar").prop("checked", !0),
          $(".page-sidebar").toggleClass("sidebar-fixed"));
          $("#checkbox_fixednavbar").is(":checked") || ($("#checkbox_fixednavbar").prop("checked", !0),
          $(".navbar").toggleClass("navbar-fixed-top"));
          setCookiesForFixedSettings()
      })
  }
  function setCookiesForFixedSettings() {
      createCookie("navbar-fixed-top", $("#checkbox_fixednavbar").is(":checked"), 100);
      createCookie("sidebar-fixed", $("#checkbox_fixedsidebar").is(":checked"), 100);
      createCookie("breadcrumbs-fixed", $("#checkbox_fixedbreadcrumbs").is(":checked"), 100);
      createCookie("page-header-fixed", $("#checkbox_fixedheader").is(":checked"), 100)
  }
  function getcolor(n) {
      switch (n) {
      case "themeprimary":
          return themeprimary;
      case "themesecondary":
          return themesecondary;
      case "themethirdcolor":
          return themethirdcolor;
      case "themefourthcolor":
          return themefourthcolor;
      case "themefifthcolor":
          return themefifthcolor;
      default:
          return n
      }
  }
  function switchClasses(n, t) {
      var u = document.getElementsByClassName(n), r;
      for (i = u.length - 1; i >= 0; i--)
          hasClass(u[i], "dropdown-menu") || (addClass(u[i], n + "-temp"),
          removeClass(u[i], n));
      for (r = document.getElementsByClassName(t),
      i = r.length - 1; i >= 0; i--)
          hasClass(r[i], "dropdown-menu") || (addClass(r[i], n),
          removeClass(r[i], t));
      for (tempClasses = document.getElementsByClassName(n + "-temp"),
      i = tempClasses.length - 1; i >= 0; i--)
          hasClass(tempClasses[i], "dropdown-menu") || (addClass(tempClasses[i], t),
          removeClass(tempClasses[i], n + "-temp"))
  }
  function addClass(n, t) {
      var i = n.className;
      i && (i += " ");
      n.className = i + t
  }
  function removeClass(n, t) {
      var i = " " + n.className + " ";
      n.className = i.replace(" " + t, "").replace(/^\s+/g, "").replace(/\s+$/g, "")
  }
  function hasClass(n, t) {
      var i = " " + n.className + " "
        , r = " " + t + " ";
      return i.indexOf(r) != -1
  }
  var themeprimary = getThemeColorFromCss("themeprimary"), themesecondary = getThemeColorFromCss("themesecondary"), themethirdcolor = getThemeColorFromCss("themethirdcolor"), themefourthcolor = getThemeColorFromCss("themefourthcolor"), themefifthcolor = getThemeColorFromCss("themefifthcolor"), rtlchanger, popovers, hoverpopovers;
  
  // 覆写require.async,改写为promise
  var require_async = require.async;
  window.require_async = require_async;
  require.async = function(n, part, onerror) {
      if (typeof part == 'function') {
          return require_async.call(require, n, part, onerror);
      } else {
          return function () {
              return new Promise(function(rs, rj) {
                  require_async(n, function(m) {
                      rs(part ? m[part] : m);
                  }, rj);
              });
          }
      }
  }
  
  // 实现bootbox.stateDialog
  bootbox.stateDialog = function (options) {
      var tempCallback;
      if (options.buttons) {
          for (var i in options.buttons) {
              var btn = options.buttons[i];
              if (options.buttons.hasOwnProperty(i)) {
                  btn.tempCallback = btn.callback;
                  btn.callback = (function (btn) {
                      return function () {
                          var skip;
                          btn.tempCallback && (skip = btn.tempCallback(function () {
                              avalon.router.go(options.parentStateName);
                              bootbox.hideAll();
                          }) !== false);
                          !skip && avalon.router.go(options.parentStateName, {}, { reload: true });
                          return skip;
                      }
                  }(btn));
              }
          }
      }
      if (options.onEscape || true) {
          tempCallback = options.onEscape;
          options.onEscape = function () {
              tempCallback && tempCallback();
              //avalon.router.go(options.parentStateName, {}, { reload: true });
          }
      }
      var el_dialog = bootbox.dialog(options);
      avalon.scan(el_dialog[0]);
      return el_dialog;
  }
  
  exports.init = function () {
      $(window).load(function() {
          setTimeout(function() {
              $(".loading-container").addClass("loading-inactive")
          }, 0)
      });
      $("#fullscreen-toggler").on("click", function() {
          var n = document.documentElement;
          $("body").hasClass("full-screen") ? ($("body").removeClass("full-screen"),
          $("#fullscreen-toggler").removeClass("active"),
          document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()) : ($("body").addClass("full-screen"),
          $("#fullscreen-toggler").addClass("active"),
          n.requestFullscreen ? n.requestFullscreen() : n.mozRequestFullScreen ? n.mozRequestFullScreen() : n.webkitRequestFullscreen ? n.webkitRequestFullscreen() : n.msRequestFullscreen && n.msRequestFullscreen())
      });
      popovers = $("[data-toggle=popover]");
      $.each(popovers, function() {
          $(this).popover({
              html: !0,
              template: '<div class="popover ' + $(this).data("class") + '"><div class="arrow"><\/div><h3 class="popover-title ' + $(this).data("titleclass") + '">Popover right<\/h3><div class="popover-content"><\/div><\/div>'
          })
      });
      hoverpopovers = $("[data-toggle=popover-hover]");
      $.each(hoverpopovers, function() {
          $(this).popover({
              html: !0,
              template: '<div class="popover ' + $(this).data("class") + '"><div class="arrow"><\/div><h3 class="popover-title ' + $(this).data("titleclass") + '">Popover right<\/h3><div class="popover-content"><\/div><\/div>',
              trigger: "hover"
          })
      });
      $("[data-toggle=tooltip]").tooltip({
          html: !0
      });
      InitiateWidgets();
  }
  exports.initHeader = function () {
      $("#skin-changer li a").click(function() {
          createCookie("current-skin", $(this).attr("rel"), 10);
          window.location.reload()
      });
      $("#btn-setting").on("click", function() {
          $(".navbar-account").toggleClass("setting-open")
      });
      InitiateSettings();
  }
  exports.initSidebar = function () {
      rtlchanger = document.getElementById("rtl-changer");
      location.pathname != "/index-rtl-fa.html" && location.pathname != "/index-rtl-ar.html" && (readCookie("rtl-support") ? (switchClasses("pull-right", "pull-left"),
      switchClasses("databox-right", "databox-left"),
      switchClasses("item-right", "item-left"),
      $(".navbar-brand small img").attr("src", "/static/beyond/img/logo-rtl.png"),
      rtlchanger != null && (document.getElementById("rtl-changer").checked = !0)) : rtlchanger != null && (rtlchanger.checked = !1),
      rtlchanger != null && (rtlchanger.onchange = function() {
          this.checked ? createCookie("rtl-support", "true", 10) : eraseCookie("rtl-support");
          setTimeout(function() {
              window.location.reload()
          }, 600)
      }
      ));
      InitiateSideMenu();
  }
  
  exports.showLoading = function () {
      $(".loading-container").removeClass("loading-inactive");
  }
  
  exports.hideLoading = function () {
      $(".loading-container").addClass("loading-inactive");
  }
  
  exports.Notify = Notify;

});
