define('components/index/index', function(require, exports, module) {

  var avalon = require('node_modules/avalonjs/dist/avalon.shim');
  require('vendor/mmState/mmState');
  require('services/filterService');
  var beyond = require('vendor/beyond/beyond');
  var ajax= require('services/ajaxService');
  var menuService = require('services/menuService');
  var configService = require('services/configService');
  var base_path = configService.basePath.url;
  
  // 加载jquery插件
  require('vendor/bootstrapValidator/bootstrapValidator');
  require('vendor/bootstrapValidator/zh_CN');
  
  // 加载组件库
  require('vendor/avx-component/avx-component');
  
  // root vm
  var root = avalon.define({
      $id: 'root',
      page: '',
      title: '仪表板',
      breadCrumb: [],
      user: {}
  });
  root.$watch('title', function(v) {
      this.title = v;
  });
  
  // 所有的状态都在这里定义
  avalon.state('root', {
      url: '/',
      views: {
          'header': {
              template: require('components/header/header').view,
              controller: require('components/header/header').controller
          },
          'sidebar': {
              template: require('components/sidebar/sidebar').view,
              controller: require('components/sidebar/sidebar').controller
          },
          'content': {
              template: require('components/dashboard/dashboard').view,
              controller: require('components/dashboard/dashboard').controller
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  
  // demo
  avalon.state('root.demo', {
      url: 'demo',
      views: {
          "content@": {
              templateProvider: require.async(['components/demo/demo'], 'view'),
              controllerProvider: require.async(['components/demo/demo'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  //建议
  
  avalon.state('root.suggest', {
      url: 'suggest',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-suggest/gf-suggest'], 'view'),
              controllerProvider: require.async(['components/gf-suggest/gf-suggest'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  // 商品类别
  avalon.state('root.category', {
      url: 'category',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-category/gf-category'], 'view'),
              controllerProvider: require.async(['components/gf-category/gf-category'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  
  // 物品
  avalon.state('root.item', {
      url: 'item',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-item/gf-item'], 'view'),
              controllerProvider: require.async(['components/gf-item/gf-item'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  // 专栏
  avalon.state('root.channel', {
      url: 'channel',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-channel/gf-channel'], 'view'),
              controllerProvider: require.async(['components/gf-channel/gf-channel'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  // 专栏详情
  avalon.state('root.channel_detail', {
      url: 'channel_detail/:id',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-channel-detail/gf-channel-detail'], 'view'),
              controllerProvider: require.async(['components/gf-channel-detail/gf-channel-detail'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  // 供货人
  avalon.state('root.supplier', {
      url: 'supplier',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-supplier/gf-supplier'], 'view'),
              controllerProvider: require.async(['components/gf-supplier/gf-supplier'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  // 评论
  avalon.state('root.comment', {
      url: 'comment',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-comment/gf-comment'], 'view'),
              controllerProvider: require.async(['components/gf-comment/gf-comment'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  // 会员
  avalon.state('root.member', {
      url: 'member',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-member/gf-member'], 'view'),
              controllerProvider: require.async(['components/gf-member/gf-member'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  // 未付款订单
  avalon.state('root.order_unpay', {
      url: 'order_unpay',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-order-unpay/gf-order-unpay'], 'view'),
              controllerProvider: require.async(['components/gf-order-unpay/gf-order-unpay'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  // 未发货订单
  avalon.state('root.order_unsend', {
      url: 'order_unsend',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-order-unsend/gf-order-unsend'], 'view'),
              controllerProvider: require.async(['components/gf-order-unsend/gf-order-unsend'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  // 待收货订单
  avalon.state('root.order_unget', {
      url: 'order_unget',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-order-unget/gf-order-unget'], 'view'),
              controllerProvider: require.async(['components/gf-order-unget/gf-order-unget'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  // 已完成订单
  avalon.state('root.order_finished', {
      url: 'order_finished',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-order-finished/gf-order-finished'], 'view'),
              controllerProvider: require.async(['components/gf-order-finished/gf-order-finished'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  // 订单详情
  avalon.state('root.order_detail', {
      url: 'order_detail/:id',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-order-detail/gf-order-detail'], 'view'),
              controllerProvider: require.async(['components/gf-order-detail/gf-order-detail'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  // 订单详情
  avalon.state('root.subscribe_order', {
      url: 'subscribe_order',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-subscribe-order/gf-subscribe-order'], 'view'),
              controllerProvider: require.async(['components/gf-subscribe-order/gf-subscribe-order'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  // 内容管理
  avalon.state('root.content', {
      url: 'content',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-content/gf-content'], 'view'),
              controllerProvider: require.async(['components/gf-content/gf-content'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  // 内容详情
  avalon.state('root.content_detail', {
      url: 'content_detail/:id',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-content-detail/gf-content-detail'], 'view'),
              controllerProvider: require.async(['components/gf-content-detail/gf-content-detail'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  // 标签管理
  avalon.state('root.tag', {
      url: 'tag',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-tag/gf-tag'], 'view'),
              controllerProvider: require.async(['components/gf-tag/gf-tag'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  // 每日有料管理
  avalon.state('root.push', {
      url: 'push',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-push/gf-push'], 'view'),
              controllerProvider: require.async(['components/gf-push/gf-push'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  
  // 推送消息管理
  avalon.state('root.send-message', {
      url: 'send-message',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-send-message/gf-send-message'], 'view'),
              controllerProvider: require.async(['components/gf-send-message/gf-send-message'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  
  // 广告管理
  avalon.state('root.adviertisement', {
      url: 'adviertisement',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-adviertisement/gf-adviertisement'], 'view'),
              controllerProvider: require.async(['components/gf-adviertisement/gf-adviertisement'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  
  // 热词管理
  avalon.state('root.hotword', {
      url: 'hotword',
      views: {
          "content@": {
              templateProvider: require.async(['components/gf-hotword/gf-hotword'], 'view'),
              controllerProvider: require.async(['components/gf-hotword/gf-hotword'], 'controller')
          }
      },
      ignoreChange: function (type) {
          return !!type;
      }
  });
  
  // mmState全局配置
  avalon.state.config({
      onError: function() {
          console.log('mmState配置出错：', arguments)
      },
      onLoad: function(fromStat, toState) {
          var breadCrumb = [], flagTree;
          menuService.walkMenu(toState.stateName, function (item, level) {
              breadCrumb.unshift(item);
          });
          if (breadCrumb.length) {
              flagTree = breadCrumb[breadCrumb.length-1]
              root.title = flagTree.title;
              avalon.vmodels.sidebar.actived = flagTree.name;
              avalon.mix(root, { breadCrumb: breadCrumb });
          }
      }
  })
  
  avalon.history.start({
      fireAnchor: false
  });
  
  avalon.scan();
  
  // 定时发送ajax请求，保持session
  setInterval(function () {
      ajax({
          url: base_path + '/backPortal/itemManage.d2js?_m=notify',
          type: 'get',
          cache: false
      });
  }, 60000);

});
