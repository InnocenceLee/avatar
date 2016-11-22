/**
 * Created by Administrator on 2016/7/11.
 */

	var planNameErrMsg = "名称格式不正确,只能包含英文，数字或中文以及下划线";
	var planIntroductionErrMsg = "描述不能为空";
	var planNameErrMsgRule = '/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/g';
	/**
	 * 新增数据校验说明
	 */
	var dataAdd = {
			data : [
			          // planName学习计划名称
			          {
			        	  id : 'planName',
			        	  msg : planNameErrMsg,
			        	  rule : planNameErrMsgRule,
			        	  checkFun : 'checkStr'
			          },
			          // dateBegin学习计划开始时间	dateEnd学习计划结束时间
			          {id:{startId:'dateBegin',endId:'dateEnd'},
			  			msg:"时间不正确",
			  			checkFun:"checkDateCompare",
			  			type:'date'
		  			  }/*,
			          // planIntroduction学习计划描述
			          {
			        	  id : 'planIntroduction',
			        	  msg : planIntroductionErrMsg,
			        	  checkFun : 'checkStr'
			          }*/
			]
	}

//modify by lyh 20160718
var pageIndex;
var totleNum = 0;
//每段的页码数量
var maxVisible = 4;

//临时课程列表
var courseTempData = [];
//临时人员列表
var personTempData = [];
//开始时间
var dateBegin;
//结束时间
var dateEnd;



//* 已添加课程table
function planCourseTable(data){
	$("#planCourseList_tbody").text("");
	var strTemp = "";
    for(var i=0;i<data.length;i++){
		strTemp = strTemp + 
		"<tr>" +
		"<td><input type='checkbox' class='checkboxes' name='learnCourse'/></td>" +
		"<td style='display:none'>"+data[i].id+"</td>" +
		"<td>"+data[i].name+"</td>" +
		"<td>"+dateBegin + " -" + dateEnd +"</td>" +
		"<td></td>" +
		"<td>0</td>" +
		"<td>0</td>" +
		"<td>0</td>" +
		"<td class='mylistSee up-move' onclick='moveup("+data[i].id+")'>上移</td>" +
		"<td class='mylistSee down-move' onclick='movedown("+data[i].id+")'>下移</td>" +
		"</tr>";
    }
    $('#planCourseList_tbody').html('').html(strTemp);
}


function moveup(index){
	if(courseTempData.length<=1){
		return;
	}
	for(var i=0;i<courseTempData.length;i++){
		if(courseTempData[i].id == index){
			if(i==0){
				break;
			}else{
				var temLess = courseTempData[i];
				courseTempData[i] = courseTempData[i-1];
				courseTempData[i-1]=temLess;
				break;
			}
		}
	}
	planCourseTable(courseTempData);
}
function movedown(index){
	if(courseTempData.length<=1){
		return;
	}
	for(var i=0;i<courseTempData.length;i++){
		if(courseTempData[i].id == index){
			if(i==courseTempData.length-1){
				break;
			}else{
				var temLess = courseTempData[i];
				courseTempData[i] = courseTempData[i+1];
				courseTempData[i+1]=temLess;
				break;
			}
		}
	}
	planCourseTable(courseTempData);
}





//* 添加课程table
function addCourseTable(data){
	$("#courseList_tbody").text("");
	var strTemp = "";
    for(var i=0;i<data.length;i++){
		strTemp = strTemp + 
		"<tr>" +
		"<td><input type='checkbox' class='checkboxes' name='learnAddCourse'/></td>" +
		"<td style='display:none'>"+checkUndifend(data[i].id)+"</td>" +
		"<td>"+checkUndifend(data[i].name)+"</td>" +
		"<td class='hidden-480'>"+checkUndifend(data[i].trainTypeName)+"</td>" +
		"<td class='hidden-480'>"+checkUndifend(data[i].createdate)+"</td>" +
		"<td class='center hidden-480' >"+checkUndifend(data[i].node)+"</td>" +
		"</tr>";
    }
    $("#courseList_tbody").html(strTemp);
}

//转换数据
function readData(data){
	
	var Data = [];
	if(data.length==0){
		totleNum=0;
	}
	for(var i=0;i<data.length;i++){
		var item = data[i];
		if(item!=undefined){
			
			if(item.totleNum != undefined/*rid*/){
				totleNum = item.totleNum;
			}
			
			var tempData = {};
			tempData.node = item.node;
			tempData.trainType = item.trainType;
			tempData.name = item.name;
			tempData.id = item.id;
			tempData.state = item.state;
			tempData.createdate = item.createdate;
			
			switch(item.trainType)
			{
			case "S":
				tempData.trainTypeName = "标准课件";
				break;
			case "M":
				tempData.trainTypeName = "通知课件";
				break;
			default:
				break;
			}
			
			switch(item.state)
			{
			case "N":
				tempData.stateName = "未审核";
				break;
			case "A":
				tempData.stateName = "已审核";
				break;
			case "J":
				tempData.stateName = "拒绝";
				break;
			case "R":
				tempData.stateName = "使用中";
				break;
			case "D":
				tempData.stateName = "已下架";
				break;
			default:
				break;
			}
			Data.push(tempData);
		}
	}
	return Data;	
}


/* Ajax  */
function tableAjax(page,maxVisible,bFlag,name,type,modelName){
	var obj = {'page':page,'size':maxVisible,'name':name,'type':type,'state':'A'};
	var strDate = JSON.stringify(obj);
	console.log("tableAjax参数： "+strDate);
    $.ajax({
        type: "get",
        url: "jv/course/list.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
//        	console.log(data);
        	data = JSON.parse(data);
        	var tableData = readData(data);
        	addCourseTable(tableData);
            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
            if(bFlag){
            	//UIGeneral.init(page,totleNum,maxVisible,modelName);
            	
        	    /* 分页   */
    	        /*使用方法*/
                $t.using('tableAjax').init({
			    	 maxPage:totleNum,
			    	 name:name,
			    	 type:type,
			    	 modelName:modelName,
			    	 maxVisible:maxVisible
		            
   	 	        }); 
        	}
        }
    });
   
}


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
	return tableDataTemp;	
}


//获取当前通知方式
function getNotifyTypeData(){

	 var tableDataTemp = [];
	 
		var notifyModeTemp = document.getElementsByName('notifyType');
	    for(var i = 0; i <notifyModeTemp.length; i++){
	      if(notifyModeTemp[i].checked){
	    	  tableDataTemp.push(notifyModeTemp[i].value);
	      	}
	     }
	return tableDataTemp;	
}

function getPlanCourseListData(){

	var tempData ="";
	var tempStart = "您有";
	var tempEnd = "需要学习，请您按时学习";
	var tempResult = "";
	var tempCourseName = "";
	var dataTemp = document.getElementById('planCourseList_tbody').children;
	console.log("getPlanCourseListData"+ dataTemp);
	if (dataTemp.length > 0) {
		for (var i = 0; i < dataTemp.length; i++) {
			var selectedTr = dataTemp[i];
			if (selectedTr != null) {
				var type = "";
				tempData = selectedTr.cells[2].innerText;
				tempCourseName += "课程" + tempData + ","

			}
		}
		tempResult = tempStart + tempCourseName + tempEnd; 
	} 
	return tempResult;
}


   

$(function(){
	  //清除弹框内容  
	 $(".clean-data").click(function(){
		 $(".Bomb-box").html("");
		 $(".Bomb-box").val("");
	 })
	 
	 $("#addCorseBtn").click(function(){
		 dateBegin = $("#dateBegin").val();
		 dateEnd = $("#dateEnd").val();
		 
		 if(!dateBegin || !dateEnd){
			 showMsg("由于要设置课程的开课时间，请先选择学习时间");
			 return;
		 }
		 dateBegin = dateBegin.replace("T"," ");
		 dateEnd = dateEnd.replace("T"," ");
		 
		 
		var dataTemp = document.getElementsByName('learnAddCourse');
		console.log(dataTemp.length);
	    for(var i = 0; i <dataTemp.length; i++){
	      if(dataTemp[i].checked){
	    	  	var Temp = {};
	     	 	var selectedTr = dataTemp[i].parentNode.parentNode;
	     	    if (selectedTr != null) {
	     	    	Temp.id = Number(selectedTr.cells[1].innerText);
	     	    	Temp.name = selectedTr.cells[2].innerText;
	     	    	Temp.typeName = selectedTr.cells[3].innerText;
	     	    	Temp.createDate = selectedTr.cells[4].innerText;
	     	    	Temp.nodeName = selectedTr.cells[5].innerText;
	     	    }
	     	 
	     	    else {
	     	    	showMsg("请选择一行");
	     	    }
	     	    var exist=false;
	     	    for(var j=0;j<courseTempData.length;j++){
	     	    	if(courseTempData[j].id == Temp.id){
	     	    		exist=true;
	     	    		break;
	     	    	}
	     	    }
	     	    if(!exist){
	     	    	courseTempData.push(Temp);
	     	    }
	      	}
	     }
	    console.log(courseTempData);
	    planCourseTable(courseTempData);
	    $('#myAddCourseModal').modal('hide');
	 })
	 
	 
	 //baocun fenzu
	  $("#saveGroupBtn").click(function(){
		  var groupName = $.trim($("#groupName").val());
		  if(groupName == ""){
			  showMsg("请输入分组名称");
		  }
		  var personIds = getNotifyPersonTableData;

		  saveGroup(groupName,personIds);
	    $('#myGroupingModal').modal('hide');
	 })
	 
	 
	 
	 
	 //保存计划
	  $("#addPlanBtn").click(function(){
		  
			var planName = $.trim($("#planName").val());
			var planIntroduction = $.trim($("#planIntroduction").val());
			var dateBegin = $.trim($("#dateBegin").val());
			var dateEnd = $.trim($("#dateEnd").val());
			
			// 调用数据校验
    		var isPass = checkData(dataAdd);
    		// 判断校验是否成功
    		if(!isPass){
    			return;
    		}
			

			
		  	
		  	var courses = [];
		  	var notifyMode = [];
			var obj = {};

			var courseName4Notify = "";
			courseName4Notify = getPlanCourseListData();
			

			
			var course_trs = $("#planCourseList_tbody > tr");
			for(var i = 0 ; i < course_trs.length ; i++){
				var id = $(course_trs[i]).find("td:eq(1)").text();
				courses.push(parseInt(id));
			}
			
			if(courses.length == 0){
				showMsg("请为当前学习计划选择课程");
				return;
			}
			

		    
			var students = getNotifyPersonTableData();
			if(students.length == 0){
				showMsg("请添加学员信息");
				return;
			}
			
			
		    obj.trainBatchStart = dateBegin;
		    obj.trainBatchEnd = dateEnd;
		    obj.name = planName;
		    obj.describe = planIntroduction;
		    obj.students = students;
		    obj.courses = courses;
		    var notifyMode = getNotifyTypeData();
		    if(notifyMode.length > 0){
			    obj.notifyMode  = notifyMode;	
		    }

			var strDate = JSON.stringify(obj);

		    $.ajax({
		        type: "POST",
		        url: "jv/learnplan/add.do",
		        data: {'data':strDate},
		        dataType: "json",
		        success: function(data){
		        	
		        	if(notifyMode.length > 0){

		            	var title= "学习计划通知";
		            	var content= courseName4Notify;
		            	
		            	console.log("学习计划通知参数： title+"+title +"  content:" + content+"  receiver:" + students +"views/learnPlanList.jsp");
		            	notifyPerson(notifyMode,title,content,students,"../views/learnPlanList.jsp");
		        	}
		        	else{
		        		window.location.href="../views/learnPlanList.jsp";
		        	}

		        }
		    });
	 })
	 
	 
	// 添加人员           
 	$("#addPersonBtn").click(function(){
 		
 		var dataTemp = getAddPersonTableData();
 		addPersonTable(dataTemp,"notifyPerson_table");
 		
 		$('#myamModal').modal('hide');
	})
	 
});





/*查看详情*/
function modify(obj) {
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
        var id = selectedTr.cells[1].innerText;
        window.location.href="jv/course/detailupdate.do?id="+id;
    }
    else {
    	showMsg("请选择一行");
    }
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

//添加课程按钮
function addCourse(obj) {
	 tableAjax(1,maxVisible,true,"","","learnPlanAddCourse");
}


/*搜索*/
function searchCourse(obj) {
	var searchCourseName = $.trim($("#searchCourseName").val());
	var searchCourseType = $.trim($("#searchCourseType").val());
	tableAjax(1,maxVisible,true,searchCourseName,searchCourseType,"learnPlanAddCourse");
}



/*搜索*/
function searchPerson(obj) {
	var searchCourseName = $.trim($("#searchPersonName").val());
	var searchPersonID = $.trim($("#searchPersonID").val());
	var searchPersonNode = $.trim($("#searchPersonNode").val());
	if( (searchCourseName == "") && (searchPersonID == "")&& (searchPersonNode == "")){
		showMsg("请输入搜索条件");
		return false;
	}
}





$(document).ready(function(){
    App.init();
   $('#delCourse').click(function(){
	   var dataTemp = document.getElementsByName('learnCourse');
	    for(var i = 0; i <dataTemp.length; i++){
	      if(dataTemp[i].checked){
	    	  var selectedTr = dataTemp[i].parentNode.parentNode;
	    	  var id = selectedTr.cells[1].innerText;
	    	  for(var j=0;j<courseTempData.length;j++){
	    		  if(courseTempData[j].id == id){
	    			  courseTempData.remove(j);
	    			  break;
	    		  }
	    	  }
	      }
	    }
	    planCourseTable(courseTempData);
   });
});

