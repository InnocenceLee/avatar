define('services/menuService', function(require, exports, module) {

  var ajax = require('services/ajaxService');
  var config = require('services/configService');
  
  var menu = [{
      name: 'dashboard',
      stateName: 'root',
      title: '主页',
      icon: 'glyphicon-home',
      href: '#!/'
  }/*, {
      name: 'demo1',
      title: '例子一级',
      icon: 'glyphicon-home',
      href: 'javascript:;',
      children: [{
          name: 'demo',
          stateName: 'root.demo',
          title: '例子',
          icon: 'glyphicon-home',
          href: '#!/demo'
      }]
  }*/, {
      name: 'content',
      title: '内容管理',
      stateName: 'root.content',
      icon: 'glyphicon-book',
      href: '#!/content',
      childStates: ['root.content_detail']
  }, {
      name: 'category',
      title: '类别管理',
      stateName: 'root.category',
      icon: 'glyphicon-folder-close',
      href: '#!/category'
  }, {
      name: 'item',
      title: '商品管理',
      stateName: 'root.item',
      icon: 'glyphicon-th',
      href: '#!/item'
  }, {
      name: 'channel',
      title: '专栏管理',
      stateName: 'root.channel',
      icon: 'glyphicon-user',
      href: '#!/channel',
      childStates: ['root.channel_detail']
  }/*, {
      name: 'supplier',
      title: '供货人管理',
      stateName: 'root.supplier',
      icon: 'glyphicon-category',
      href: '#!/supplier'
  }*/, {
      name: 'comment',
      title: '评论管理',
      stateName: 'root.comment',
      icon: 'glyphicon-comment',
      href: '#!/comment'
  }, {
      name: 'push',
      title: '每日有料管理',
      stateName: 'root.push',
      icon: 'glyphicon-star',
      href: '#!/push'
  },  {
      name: 'send-message',
      title: '推送消息管理',
      stateName: 'root.send-message',
      icon: 'glyphicon-circle-arrow-up',
      href: '#!/send-message'
  }, {
      name: 'tag',
      title: '标签管理',
      stateName: 'root.tag',
      icon: 'glyphicon-tags',
      href: '#!/tag'
  }, {
      name: 'member',
      title: '会员管理',
      stateName: 'root.member',
      icon: 'glyphicon-user',
      href: '#!/member'
  }, {
      name: 'order_manage',
      title: '订单管理',
      icon: 'glyphicon-usd',
      href: 'javascript:;',
      children: [{
          name: 'order_unpay',
          stateName: 'root.order_unpay',
          title: '未付款订单',
          icon: 'glyphicon-home',
          href: '#!/order_unpay'
      }, {
          name: 'order_unsend',
          stateName: 'root.order_unsend',
          title: '未发货订单',
          icon: 'glyphicon-home',
          href: '#!/order_unsend'
      }, {
          name: 'order_unget',
          stateName: 'root.order_unget',
          title: '待收货订单',
          icon: 'glyphicon-home',
          href: '#!/order_unget'
      }, {
          name: 'order_finished',
          stateName: 'root.order_finished',
          title: '已完成订单',
          icon: 'glyphicon-home',
          href: '#!/order_finished' 
      }]
  }, {
      name: 'subscribe_order',
      title: '订阅订单管理',
      stateName: 'root.subscribe_order',
      icon: 'glyphicon-usd',
      href: '#!/subscribe_order'
  }, /*{
      name: 'privilege',
      title: '权限管理',
      stateName: 'root.privilege',
      icon: 'glyphicon-manage',
      href: config.basePath.url + '/front/main.jssp'
  }, */{
      name: 'adviertisement ',
      title: '广告管理',
      stateName: 'root.adviertisement',
      icon: 'glyphicon-bullhorn',
      href: '#!/adviertisement' 
  },
  {
      name: 'suggest ',
      title: '建议列表',
      stateName: 'root.suggest',
      icon: 'glyphicon-list-alt',
      href: '#!/suggest' 
  },
  {
      name: 'hotword ',
      title: '热词管理',
      stateName: 'root.hotword',
      icon: 'glyphicon-screenshot',
      href: '#!/hotword' 
  }];
  
  // 根据权限过滤菜单
  var menuPromise = new Promise(function (rs, rj) {
      // ajax({
      //     type: 'get',
      //     data: {
      //         method: 'adminAccount.getCurrentPermission'
      //     }
      // }).then(function (result) {
      //     if (result.code === '0') {
      //     	$('#loadImg').css('display','none');
      //         for (var i = 0, item; item = menu[i++]; ) {
      //             if (item.name === 'dashboard' || item.name === 'demo1') {
      //                 item.show = true;
      //             } else {
      //                 item.show = false;
      //             }
      //             var hasPermission = false;
      //             for (var j = 0, permission; permission = result.list[j++]; ) {
      //                 if (permission.permission_name === item.name) {
      //                     hasPermission = true;
      //                     break;
      //                 }
      //             }
      //             if (hasPermission) {
      //                 item.show = true;
      //             }
      //         }
      //         rs(menu.slice(0));
      //     } else {
      //         rj();
      //     }
      // });
      $('#loadImg').css('display','none');
      rs(menu.slice(0));
  });
  
  function walkMenu(name, process, level, menuLet) {
      var finded = false;
      level = !level ? 1 : level;
      menuLet = !menuLet ? menu.slice(0) : menuLet;
      for (var i = 0, item; item = menuLet[i++]; ) {
          if (item.name === name || item.stateName === name) {
              process && process(item, level);
              finded = true;
              break;
          }
          console.log(item.childStates, name);
          if (item.childStates && ~item.childStates.indexOf(name)) {
              process && process(item, level);
              finded = true;
              break;
          }
          if (item.children && walkMenu(name, process, level + 1, item.children)) {
              process && process(item, level);
              finded = true;
              break;
          }
      }
      return finded;
  }
  
  exports.walkMenu = walkMenu;
  exports.menu = menuPromise;

});
