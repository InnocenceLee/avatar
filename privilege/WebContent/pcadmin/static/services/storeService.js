define('services/storeService', function(require, exports, module) {

  var ajax = require('services/ajaxService');
  var config = require('services/configService');
  var base_path = config.basePath.url;
  
  exports.demo = {
      key: 'region_id',
      initialData: function () {
          return {
              region_enable: 0,
              region_id: '',
              region_name: '',
              region_parent_id: '',
              region_type: ''
          };
      },
      list: function (params) {
          return ajax({
              url: '/api/demo',
              type: 'get',
              data: params
          });
      },
      insert: function (params) {
          return ajax({
              url: '/api/demo/update',
              type: 'post',
              data: params
          });
      },
      update: function (params) {
          return ajax({
              url: '/api/demo/update',
              type: 'post',
              data: params
          });
      },
      del: function (id) {
          return ajax({
              url: '/api/demo/update',
              type: 'post',
              data: {
                  id: id
              }
          });
      }
  };
  
  exports.category = {
      key: 'id',
      initialData: function () {
          return {
              "id": 0,
              "name": "",
              "parent_catalog": 0,
              "type": "",
              "sub_type": ""
          };
      },
      list: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=searchCatalog',
              type: 'get',
              data: params
          }).then(function (result) {
              if (result.code == '0') {
                  for (var i = 0, record; record = result.list[i]; i++) {
                      exports.item.catalogDict[record.id] = record.name;
                  }
              }
              return result;
          });
      },
      insert: function (params) {
          params.type = 'G';
          params.sub_type = 'G';
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=addCatalog',
              type: 'post',
              data: params
          });
      },
      update: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=updateCatalog',
              type: 'post',
              data: params
          });
      },
      del: function (id) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=deleteCatalog',
              type: 'post',
              data: {
                  id: id
              }
          });
      }
  };
  
  exports.supplier = {
      key: 'id',
      initialData: function () {
          return {
              "id": 0,
              "name": "",
              "info": null
          };
      },
      list: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=searchSupplier',
              type: 'get',
              data: params
          });
      },
      insert: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=addSupplier',
              type: 'post',
              data: params
          });
      },
      update: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=updateSupplier',
              type: 'post',
              data: params
          });
      },
      del: function (id) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=deleteSupplier',
              type: 'post',
              data: {
                  id: id
              }
          });
      }
  };
  
  exports.item = {
      key: 'id',
      dict: {
          U: '已上架',
          S: '已下架'
      },
      typeDict: {
          G: '物品',
          A: '内容'
      },
      catalogDict: {},
      initialData: function () {
          return {
              "id": 0,
              "name": "",
              "type": "",
              "sub_type": "",
              "price": "",
              "tag": {
                  "thumb": "",
                  "images": [],
                  "catalog": "",
                  "description": "",
                  "large_thumb": ""
              },
              "created": "",
              "state": "",
              "inputed": "",
              "input_employee": 0,
              "removed": null,
              "view_count": "",
              "real_view_count": 0,
              "store_count": "",
              "supplier": 0,
              "channel": null,
              "buy_count": 0,
              "real_buy_count": 0,
              "catalog": 0
          };
      },
      list: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=searchItem',
              type: 'get',
              data: params
          });
      },
      insert: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=addItem',
              type: 'post',
              data: params
          });
      },
      update: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=updateItem',
              type: 'post',
              data: params
          });
      },
      del: function (id) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=deleteItem',
              type: 'post',
              data: {
                  id: id
              }
          });
      },
      upShelves: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=onSale',
              type: 'post',
              data: params
          });
      },
      downShelves: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=offSale',
              type: 'post',
              data: params
          });
      }
  };
  
  exports.channel = {
      key: 'id',
      initialData: function () {
          return {
              "id": 0,
              "name": "",
              "type": "",
              "sub_type": "",
              "tag": {"thumb":''},
              "created": "",
              "state": "",
              "inputed": "",
              "input_employee": 0,
              "removed": null,
              "view_count": "",
              "real_view_count": 0,
              "store_count": 0,
              "supplier": 0,
              "channel": 0,
              "apple_id":0,
              "buy_count": 0,
              "real_buy_count": 0,
              "catalog": 0,
              "assignee": 0,
              "suites":[
  	            {
  	            	"name":"",
  	            	"effectDuration":0,
  	            	"price":0,
  	            	"unit": "Y"
  	            }
              ],
          	"unit": "Y", 
          	"price": 0,
          	"effectDuration": 0,
              "author_name": "",
              "author_field": "",
              "brief": "",
              "rank": 0
          };
      },
      list: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=searchChannel',
              type: 'get',
              data: params
          });
      },
      insert: function (params) {
          !params.type && (params.type = 'C');
          !params.sub_type && (params.sub_type = 'C');
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=addChannel',
              type: 'post',
              data: params
          });
      },
      update: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=updateChannel',
              type: 'post',
              data: params
          });
      },
      del: function (id) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=deleteChannel',
              type: 'post',
              data: {
                  id: id
              }
          });
      },
      detail: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=searchChannel',
              type: 'get',
              data: params
          });
      },
      sort: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=exchangeChannelRank',
              type: 'post',
              data: params
          });
      }
  };
  
  //评论管理
  exports.comment = {
      key: 'id',
      dict: {
          W: '待审核',
          A: '审核通过',
          R: '驳回',
          D: '删除'
      },
      initialData: function () {
          return {
              "id": 0,
              "person_name": "",
  			"content": "",
              "postd": null,
  			"state": ""
          };
      },
      list: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=searchComment',
              type: 'get',
              data: params
          });
      },
      update: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=auditComment',
              type: 'post',
              data: params
          });
      },
      del: function (id) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=deleteComment',
              type: 'post',
              data: {
                  id: id
              }
          });
      },
      audit: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=auditComment',
              type: 'post',
              data: params
          });
      },
      count: function () {
          return ajax({ 
              url: base_path + '/backPortal/itemManage.d2js?_m=searchWCommentCount',
              type: 'get'
          });
      }
  };
  
  //广告管理
  exports.adviertisement = {
      key: 'id',
      initialData: function () {
          return {
              "id": 0,
              "url": "",
              "image": "",
              "itemName": "",
              "item": ""
              
          };
      },
      list: function (params) {
          return ajax({
              url: base_path + '/advertisement/advertisement.d2js?_m=getAdvertisement',
              type: 'get',
              data: params
          });
      },
      insert: function (params) {
          return ajax({
              url: base_path + '/advertisement/advertisement.d2js?_m=addAdvertisement',
              type: 'post',
              data: params
          });
      },
      update: function (params) {
          return ajax({
              url: base_path + '/advertisement/advertisement.d2js?_m=modAdvertisement',
              type: 'post',
              data: params
          });
      },
      del: function (id) {
          return ajax({ 
              url: base_path + '/advertisement/advertisement.d2js?_m=delAdvertisement',
              type: 'post',
              data: {
                  id: id
              }
          });
      }
  };
  
  //会员管理
  exports.member = {
      key: 'id',
      initialData: function () {
          return {
              "id": 0,
              "person_name": "",
  			"content": "",
              "postd": null,
  			"state": ""
          };
      },
      list: function (params) {
          return ajax({
              url: base_path + '/member/member.d2js?_m=memberlist',
              type: 'get',
              data: params
          });
      },
      update: function (params) {},
      del: function (id) {
          return ajax({ 
              url: base_path + '/member/member.d2js?_m=delmember',
              type: 'post',
              data: {
                  id: id
              }
          });
      }
  };
  exports.file = {
      insert: function (params) {
          $.ajaxFileUpload({
              url: base_path + '/backPortal/itemManage.d2js?_m=uploadFile',
              secureuri: false,
              fileElementId: params.fileElementId,
              dataType: 'json',
              success: params.success
          });
      }
  };
  
  // 未付款订单
  exports['order-unpay'] = {
      key: 'id',
      list: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=searchUnPayOrder',
              type: 'get',
              data: params
          });
      },
      cancel: function (id) {
          return ajax({ 
              url: base_path + '/backPortal/itemManage.d2js?_m=cancelOrder',
              type: 'post',
              data: {
                  id: id
              }
          });
      }
  };
  
  // 未发货订单
  exports['order-unsend'] = {
      key: 'id',
      dict: {
          Y: '是',
          N: '-'
      },
      list: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=searchUnSendOrder',
              type: 'get',
              data: params
          });
      },
      send: function (params) {
          return ajax({ 
              url: base_path + '/backPortal/itemManage.d2js?_m=sendOrder',
              type: 'post',
              data: params
          });
      },
      count: function () {
          return ajax({ 
              url: base_path + '/backPortal/itemManage.d2js?_m=searchUnSendOrderCount',
              type: 'get'
          });
      }
  };
  
  // 待收货订单
  exports['order-unget'] = {
      key: 'id',
      list: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=searchUnGetOrder',
              type: 'get',
              data: params
          });
      },
      modifyOrder_no: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=modifyOrder_no',
              type: 'get',
              data: params
          });
      }
  };
  
  // 待收货订单
  exports['order-finished'] = {
      key: 'id',
      list: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=searchfinishedOrder',
              type: 'get',
              data: params
          });
      }
  };
  
  // 订单详情
  exports['order-detail'] = {
      key: 'id',
      list: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=getItemsByOrder',
              type: 'get',
              data: params
          });
      }
  };
  
  // 订阅订单
  exports.subscribe_order = {
      key: 'id',
      initialData: function () {
          return {
              "order_no": "",
              "itemname": "",
              "orderd": "",
              "personname": "",
              "username": "",
              "mobile": ""
          };
      },
      list: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=searchSubscribeOrder',
              type: 'get',
              data: params
          });
      }
  }
  
  // 内容管理
  exports.content = {
      key: 'id',
      dict: {
          A: '文章',
          V: '视频',
          C: '栏目',
          t: '门票',
          G: '商品',
          T: '旅游品'
      },
   
      initialData: function () {
          return {
              "id": 0,
              "name": "",
              "type": "",
              "sub_type": "A",
              "tag": {
                  "author_name": "",
                  "thumb": "",
                  "banner": "",
                  "content": "",
                  "screenshots": "",
                  "author_pic": ""
              },
              "view_count": ""
          };
      },
      list: function (params) {
          !params.name && (params.name = '');
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=searchArticle',
              type: 'get',
              data: params
          });
      },
      insert: function (params) {
          params.catalog = 1;
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=addArticle',
              type: 'post',
              data: params
          });
      },
      update: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=updateArticle',
              type: 'post',
              data: params
          });
      },
      del: function (id) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=deleteArticle',
              type: 'post',
              data: {
                  id: id
              }
          });
      },
      detail: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=getArticleDeatil',
              type: 'get',
              data: params
          });
      },
      searchContentByChannel: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=searchContentByChannel',
              type: 'get',
              data: params
          });
      }
  };
  
  // 标签管理
  exports.tag = {
      key: 'id',
      initialData: function () {
          return {
              "id": 0,
              "label": ""
          };
      },
      list: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=searchTag',
              type: 'get',
              data: params
          });
      },
      insert: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=addTag',
              type: 'post',
              data: params
          });
      },
      update: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=updateTag',
              type: 'post',
              data: params
          });
      },
      del: function (id) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=deleteTag',
              type: 'post',
              data: {
                  id: id
              }
          });
      }
  };
  
  // 推送管理
  exports.push = {
      key: 'id',
      dict: {
          L: '大图',
          T: '小图'
      },
      initialData: function () {
          return {
              "id": 0,
              "title": "",
              "sub_title": "",
              "tags": [""],
              "view_mode": "",
              "postd": "",
              "picture": "",
              "item": 0
          };
      },
      list: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=searchToday',
              type: 'get',
              data: params
          });
      },
      insert: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=addToday',
              type: 'post',
              data: params
          });
      },
      update: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=updateToday',
              type: 'post',
              data: params
          });
      },
      del: function (id) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=deleteToday',
              type: 'post',
              data: {
                  id: id
              }
          });
      }
  };
  
  // 推送消息接口
  exports['send-message'] = {
      key: 'id',
      initialData: function () {
          return {
              "id": 0,
              "title": "",
              "content": "",
              "item": "",
              "itemName": "",
              "action": "",
              "pushd": "",
              "item": 0
          };
      },
      list: function (params) {
          return ajax({
              url: base_path + '/sendmessage/sendmessage.d2js?_m=sendMessagss',
              type: 'get',
              data: params
          });
      },
      insert: function (params) {
          return ajax({ 
              url: base_path + '/sendmessage/sendmessage.d2js?_m=addMessags',
              type: 'get',
              data: params
          });
      }, 
        del: function (id) {
          return ajax({
              url: base_path + '/sendmessage/sendmessage.d2js?_m=delMessags',
              type: 'post',
              data: {
                  id: id
              }
          });
      }, 
      
      update: function (params) {
          return ajax({ 
              url: base_path + '/sendmessage/sendmessage.d2js?_m=updateMessags',
              type: 'get',
              data: params
          });
      }
  };
  // 建议
  exports['suggest'] = {
      key: 'id',
      initialData: function () {
          return {
              "id": 0,
              "content": "",
              "feedbackd": ""
          };
      },
      list: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=suggest',
              type: 'get',
              data: params
          });
      },
     
      del: function (id) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=delsuggest',
              type: 'post',
              data: {
                  id: id
              }
          });
      }, 
  
  };
  
  // 热词
  exports['hotword'] = {
      key: 'id',
      initialData: function () {
          return {
              "id": 0,
              "word": "",
              "times": 0,
              "type": ''
          };
      },
      list: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=hotwordList',
              type: 'get',
              data: params
          });
      },
      update: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=updatehotword',
              type: 'post',
              data: params
          });
      },
     
      del: function (id) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=delhotword',
              type: 'post',
              data: {
                  id: id
              }
          });
      },insert: function (params) {
          return ajax({
              url: base_path + '/backPortal/itemManage.d2js?_m=insethotword',
              type: 'post',
              data: params
          });
      }
  
  };

});
