/**
 * Created by Administrator on 2016/7/11.
 */

	/**
	 * 新增数据校验说明
	 */
	var dataAdd = {
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

//modify by lyh 20160718
// 通知人员的数组
var  receiver = [];
var personTempData = [];

$(function() {
	  //清除弹框内容  
	 $(".clean-data").click(function(){
		 $(".Bomb-box").html("");
		 $(".Bomb-box").val("");
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



/*提交公告信息*/
function addNotify() {
	
	// 调用数据校验
	var isPass = checkData(dataAdd);
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
	notifyMode.push("P");
	
	var title= $.trim($("#title").val());
	var content= $.trim($("#content").val());
	console.log("addNotify参数： title+"+title +"  content:" + content+"  receiver:" + receiver );
	console.log(receiver);
	console.log(receiver instanceof Array);
	
	var notifyModeTemp = document.getElementsByName('notifyType');
    for(var i = 0; i <notifyModeTemp.length; i++){
      if(notifyModeTemp[i].checked){
    	  notifyMode.push(notifyModeTemp[i].value);
      	}
     }
    
	notifyPerson(notifyMode,title,content,receiver,"announcementManagement.jsp");
}


$(document).ready(function(){
    App.init();
});