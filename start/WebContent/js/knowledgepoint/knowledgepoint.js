/**
 * 知识点页面 JS方法
 * ADD BY LYH 20160713
 */
	var titleErrMsg = "名称不能超过15字符，且只能包含英文，数字或中文以及下划线和英式括号";
	var remarksErrMsg = "描述不能为空且不能超过400字符";
	var titleRule = '/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5\(\)]{1,15}$/g';
	var remarksRule = '/^[.]{1,400}$/g';
	/**
	 * 新增数据校验说明
	 */
	var dataAdd = {
			data : [
			          // title
			          {
			        	  id : 'title',
			        	  msg : titleErrMsg,
			        	  rule : titleRule,
			        	  checkFun : 'checkStr'
			          }
			]
	}
	/**
	 * 修改数据校验说明
	 */
	var dataUpdate = {
			data : [
			          // title
			          {
			        	  id : 'modifyTitle',
			        	  msg : titleErrMsg,
			        	  rule : titleRule,
			        	  checkFun : 'checkStr'
			          }
			]
	}

    function getKonwledgePoints(){
    	$http.ajax({
    		isModal : false,
    	    type: "GET",
    	    url: "jv/knowledgepoint/list.do?_t=" + new Date().getTime(),
    	    data: null,
    	    dataType: "json",
    	    success: function(data){
    				data = JSON.parse(data);
    				var obj=new Object();
        	    	obj.core=new Object();
        	    	obj.core.data=new Array();
        	    	obj.plugins=new Array();;
        	    	obj.plugins.push('contextmenu');
        	    	obj.contextmenu=new Object();
        	    	obj.contextmenu={
        	    			"items": function(node) {
        	    				return {
        	    					renameItem: { 
            	    		            label: "修改",
            	    		            action: function (e1,e2) {
            	    		            	$('#modifyTitle').val(node.text);
            	    		            	$('#modifyId').val(node.id);
            	    		            	$("#modifyRemarks").val(node.original.remarks);
            	    		            	//打开修改窗口
            	    		            	$('#myUpdModal').modal('show');
            	    		            }
            	    		        },
            	    		        deleteItem: {
            	    		            label: "删除",
            	    		            action: function () {
            	    		            	delNode(node.id,node.text);
            	    		            }
            	    		        },
            	    		        addItem: {
            	    		            label: "新增子节点",
            	    		            action: function () {
            	    		            	$('#parId').val(node.id);
            	    		            	$('#title').val('');
            	    		           	 	$('#remarks').val('');
            	    		            	$('#myAddModal').modal('show');
            	    		            }
            	    		        }
        	    				}
        	    			}
        	    	};
        	    	var item = createTreeData(data);
        	    	obj.core.data = item;
        	    	$('#tree').jstree(obj);
        	    	$('#tree').jstree(true).settings.core.data = item;
        	    	$('#tree').jstree(true).refresh();
	  	            
             }
    	});
	}

    
   

    $(document).ready(function(){
    	App.init();
    	$("#parId").hide();
    	getKonwledgePoints();
    });

    
$(function() {   
	$('#AddItemBtn').click(function(){
		$('#parId').val(0);
    	$('#title').val('');
   	 	$('#remarks').val('');
    	$('#myAddModal').modal('show');
	});
	$("#addKl").click(function(){
		addNode();
   	});
	$('#modifyKl').click(function(){
		updateNode();
	});
});
function updateNode(){
	if(!checkData(dataUpdate)){
		return;
	}
	
	var modifyId=Number($("#modifyId").val());
	var modifyTitle=$("#modifyTitle").val();
	var baseId=Number($("#baseId").val());
	var modifyRemarks=$("#modifyRemarks").val();
	
	var obj = {'id':modifyId,'title':modifyTitle,'remarks':modifyRemarks,'base':baseId};
	var strDate = JSON.stringify(obj);
	
	$http.ajax({
		isModal : true,
	    type: "post",
	    url: "jv/knowledgepoint/update.do",
	    data: {
	    	   'data':strDate
		},
	    dataType: "json",
	    success: function(data){
       	    var err = JSON.parse(data);
       	    if(err.error){
       	    	showMsg(err.error.message);
       		   return;
       	    }
       	    getKonwledgePoints();
       	    $('#myUpdModal').modal('hide');
	    }
    })
}
function addNode(){
	if(!checkData(dataAdd)){
		return;
	}
	$http.ajax({
		isModal : true,
   	    type: "post",
   	    url: "jv/knowledgepoint/add.do",
   	    data: {
       	 	'title' : $('#title').val(),
       	 	'remarks' : $('#remarks').val(),
       	 	'base' : $('#parId').val()
		},
   	    dataType: "json",
   	    success: function(data){
    	   var err = JSON.parse(data);
       	    if(err.error){
       	    	showMsg(err.error.message);
       		   return;
       	    }
       	    getKonwledgePoints();
           $('#myAddModal').modal('hide');
        }
    });
}
function delNode(delId,delname){
	$http.ajax({
		isModal : true,
   	    type: "post",
   	    url: "jv/knowledgepoint/del.do",
   	    data: {
       	 	'title' : delname,
       	 	'id' : delId
		},
   	    dataType: "json",
       success: function(data){
        	// 删除失败
       	    var err = JSON.parse(data);
       	    if(err.error){
       		   showMsg(err.error.message);
       		   return;
       	    }
       	    getKonwledgePoints();
        }
    });
}