	var dataUpdate = {
			data : [
			          // title公告标题
			          {
			        	  id : 'title',
			        	  msg : "标题不能为空",
			        	  checkFun : 'checkStr'
			          },
			          // content公告内容
			          {
			        	  id : 'content',
			        	  msg : "内容不能为空",
			        	  checkFun : 'checkStr'
			          }
			]
	}


// 通知人员的数组
var  receiver = [];
var personTempData = [];

$(function() {
	  //清除弹框内容  
	 $(".clean-data").click(function(){
		 $(".Bomb-box").html("");
		 $(".Bomb-box").val("");
	 })
	 
	 var id = $("#notifyId").val();
	 $.get("jv/notify/findById.do?id="+id,function(data){
		console.log(data);
		var dataObj = JSON.parse(data); 
		$("#title").val(dataObj.title);
		$("#content").val(dataObj.content);
		$.ajax({
			url:"jv/nonentrymanagement/listPersonsByIds.do",
			type:'POST',
			data:{
				"ids":dataObj.receiver
			},
			dataType: "json",
			success: function(data){
				console.log('此通知原有的人员:' + data);
				var dataTemp = JSON.parse(data);
				addPersonTable(dataTemp,"notifyPerson_table");
				for(var i=0;i<dataTemp.length;i++){
		 			personTempData.push(dataTemp[i]);
		 			receiver.push(dataTemp[i].id);
		 		}
			}
		})
		
	})
	 
	// 添加           
 	$("#addPersonBtn").click(function(){
 		
 		var dataTemp = getAddPersonTableData();
 		console.log(dataTemp);
 		addPersonTable(dataTemp,"notifyPerson_table");
 		for(var i=0;i<dataTemp.length;i++){
 			personTempData.push(dataTemp[i]);
 			receiver.push(dataTemp[i].id);
 		}
 		console.log(receiver);
 		$('#myamModal').modal('hide');
	})
	
		
});

//获取当前列表中的数据
function getNotifyPersonTableData(){

	 var tableDataTemp = [];
	 
	 var dataTemp = document.getElementsByName('notifyPersonCheck');
	    for(var i = 0; i < dataTemp.length; i++){
	     	 var selectedTr = dataTemp[i].parentNode.parentNode;
	     	    if (selectedTr != null) {	     	    	
	     	    	var id = Number(selectedTr.cells[1].innerText);
	     	    	tableDataTemp.push(id);
	     	    }
	     	 
	     	    else {
	     	    	 showMsg("请选择一行");
	     	    }
	     }
	console.log("输出tableDataTemp");
	console.log(JSON.stringify(tableDataTemp));
	console.log("end");
	//showMsg("ss");
	return tableDataTemp;	
}

//删除通知人员  批量
function delNotifyPerson(obj) {
	
	var data = [];
	var dataTemp = document.getElementsByName('notifyPersonCheck');
    for(var i = 0; i <dataTemp.length; i++){
      if(dataTemp[i].checked){
      	}
      else{
      	 selectedTr = dataTemp[i].parentNode.parentNode;
  	    if (selectedTr != null) {
  	    	var temp = {};
  	    	temp.id = selectedTr.cells[1].innerText;
  	    	temp.username = selectedTr.cells[2].innerText;
  	    	temp.name = selectedTr.cells[3].innerText;
  	    	temp.nodename = selectedTr.cells[4].innerText;
  	    	data.push(temp);
  	    }
  	 
  	    else {
  	    	 showMsg("请选择一行");
  	    }
      }
     }
    
    addPersonTable(data,"notifyPerson_table");
}



/*提交修改公告信息*/
function updateNotify() {
	
	// 调用数据校验
	var isPass = checkData(dataUpdate);
	// 判断校验是否成功
	if(!isPass){
		return;
	}

	var peoples = getNotifyPersonTableData();
	
	if(peoples.length <= 0){
		showMsg("请选择人员");
		return false;
	}
	
	receiver = peoples;
	
	/*if(($.trim($("#title").val()) == "")||($.trim($("#content").val()) == "")){
		alert("请将信息填写完");
		return false;
	}*/
	
	var notifyMode = [];
	notifyMode.push("M");
	var id = $("#notifyId").val();
	var title= $.trim($("#title").val());
	var content= $.trim($("#content").val());
	console.log("addNotify参数： title+"+title +"  content:" + content+"  receiver:" + receiver );
	
	var notifyModeTemp = document.getElementsByName('notifyType');
    for(var i = 0; i <notifyModeTemp.length; i++){
      if(notifyModeTemp[i].checked){
    	  notifyMode.push(notifyModeTemp[i].value);
      	}
     }
    
	notifyPerson(notifyMode,id,title,content,receiver,"announcementManagement.jsp");
}


$(document).ready(function(){
    App.init();
});