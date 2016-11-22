/**
 * Created by Administrator on 2016/7/11.
 */
var contextPath = null;
$(function(){
	contextPath = $("[name=contextPath]").val();
});
	var planNameErrMsg = "名称格式不正确,只能包含英文，数字或中文以及下划线";
	var planIntroductionErrMsg = "描述不能为空";
	var planNameErrMsgRule = '/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+\\s*$/g';
	/**
	 * 新增数据校验说明
	 */
	var dataUpdate = {
			data : [
			          // planName学习计划名称
			          {
			        	  id : 'planName',
			        	  msg : planNameErrMsg,
			        	  rule : planNameErrMsgRule,
			        	  checkFun : 'checkStr'
			          },
			          // dateBegin学习计划开始时间	dateEnd学习计划结束时间
			          {id:{startId:'trainBatchStart',endId:'trainBatchEnd'},
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

//人员的页面数
var personTotleNum = 0;
//每段的页码数量
var maxVisible = 20;


//开始时间
var dateBegin;
//结束时间
var endBegin;

//当前学习计划ID
var planId = 0;

//应学人数
var personNum = 0;

var personTempData=new Array();//人员列表
var courseTempData=new Array();//课程列表
//* 已添加课程table
function planCourseTable(data){
	$("#planCourseList_tbody").text("");
	var strTemp = "";
    for(var i=0;i<data.length;i++){
		strTemp = strTemp + 
		"<tr><td><input type='checkbox' class='checkboxes' name='learnCourse'/></td>" +
		"<td style='display:none'>"+data[i].courseId+"</td>" +
		"<td>"+data[i].courseName+"</td>" +
		"<td>"+data[i].trainBatchStart +" </td>" +
		"<td>" +data[i].trainBatchEnd +"</td>" +
		"<td >"+data[i].personNum+"</td>" +
		"<td >"+data[i].end+"</td>" +
		"<td >"+data[i].started+"</td>" +
		"<td >"+data[i].unstart+"</td>" +
		"<td class='mylistSee up-move'>上移</td>" +
		"<td class='mylistSee down-move'>下移</td>";
    }
    $("#planCourseList_tbody").html(strTemp)
	
}



//* 添加课程table
function addCourseTable(data){
	$("#addCourseList_tbody").text("");
	var strTemp = "";
    for(var i=0;i<data.length;i++){
		strTemp = strTemp +
		"<tr><td><input type='checkbox' class='checkboxes' name='learnAddCourse'/></td>" +
		"<td style='display:none'>"+data[i].id+"</td>" +
		"<td>"+data[i].name+"</td>" +
		"<td class='hidden-480'>"+data[i].trainTypeName+"</td>" +
		"<td class='hidden-480'>"+data[i].createdate+"</td>" +
		"<td class='center hidden-480' >"+data[i].node+"</td></tr>";
    }
    
    $("#addCourseList_tbody").html(strTemp)
}

//转换数据  课程数据  bFlag = true,   人员数据 bFlag = false
function readData(data,bFlag){
	
	if(bFlag){
		if(data.length == 0){
			totleNum = 0;
		}
		var Data = [];
		for(var i=0;i<data.length;i++){
			var item = data[i];
			if(item!=undefined){
				
				if(item.totleNum){
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
	else{
		if(data.length==0){
			personTotleNum = 0;
		}
		for(var i=0;i<data.length;i++){
			var item = data[i];
			if(item!=undefined){
				if(item.totleNum != undefined/*rid*/){
					personTotleNum = item.totleNum;
					
				}
			}
		}
	}
	
}


/* 添加课程Ajax  */
function tableAjax(page,maxVisible,bFlag,name,type,modelName,searchFlag){
	name = $.trim($("#searchCourseName").val());
	type = $.trim($("#searchCourseType").val());
	var obj = {'page':page,'size':maxVisible,'name':name,'type':type,'state':'A'};
	var strDate = JSON.stringify(obj);
    $.ajax({
        type: "get",
        url: "jv/course/list.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
        	data = JSON.parse(data);
        	var tableData = readData(data,true);
        	addCourseTable(tableData);
            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
        	if(searchFlag){
            	$t.using('tableAjax').reset(totleNum);
            	$("#page-count").html(totleNum);
            } else if(bFlag){
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

  
//获取已有的课程列表Ajax  */
function oldTableAjax(page,maxVisible,modelName,bFlag,id){
	var obj = {'page':page,'size':maxVisible,'id':id};
	planID = id;
	var strDate = JSON.stringify(obj);
    $.ajax({
        type: "get",
        url: "jv/learnplan/coursecontent.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
        	courseTempData = JSON.parse(data);
        	planCourseTable(courseTempData);
        }
    }); 
}



/* 人员列表Ajax  */
function personAjax(page,maxVisible,modelName,bFlag,id,personName,nodeName,personId,searchFlag){
	var obj = {'page':page,'size':99999,'id':id,'personName':personName,'nodeName':nodeName,'personId':parseInt(personId)};
	var strDate = JSON.stringify(obj);
    $.ajax({
        type: "get",
        url: "jv/learnplan/notifyperson.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
        	var tempData = JSON.parse(data);
        	for(var i=0;i<tempData.length;i++){
        		personTempData.push({id:tempData[i].personId,name:tempData[i].personName,nodename:'',username:tempData[i].person_no});
        	}
            addPersonTable(personTempData,"notifyPerson_table");            
        }
    }); 
}



//获取当前列表中的数据
function getTableData(flag){

	 var tableDataTemp = [];
	 
	 switch(flag){
	 case "course":
		 var dataTemp = document.getElementsByName('learnCourse');
		    for(var i = 0; i < dataTemp.length; i++){
		     	 var selectedTr = dataTemp[i].parentNode.parentNode;
		     	    if (selectedTr != null) {
		     	    	var tempData = {};		     	    	
		     			
		     	    	tempData.courseId = Number(selectedTr.cells[1].innerText);
		     			tempData.courseName = selectedTr.cells[2].innerText;
		     			tempData.trainBatchStart = selectedTr.cells[3].innerText;
		     			
		     			tempData.trainBatchEnd = selectedTr.cells[4].innerText;
		     			tempData.personNum = selectedTr.cells[5].innerText;
		     			
		     			tempData.end = selectedTr.cells[6].innerText;
		     			tempData.started = selectedTr.cells[7].innerText;
		     			tempData.unstart = selectedTr.cells[8].innerText;
		     		
		     			tableDataTemp.push(tempData);
		     			//保存应学人数
		     			personNum = tempData.personNum;
		     	    }
		     	 
		     	    else {
		     	    	showMsg("请选择一行");
		     	    }
		     }

		 break;
	 }
		
	return tableDataTemp;	
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




$(function(){
	$('#basic_opener3').click(function(){
		
	});
	  //清除弹框内容  
	 $(".clean-data").click(function(){
		 $(".Bomb-box").html("");
		 $(".Bomb-box").val("");
	 })
	 
	 $("#addCorseBtn").click(function(){
		 dateBegin = $("#trainBatchStart").val();
		 endBegin = $("#trainBatchEnd").val();
		 
		var dataTemp = document.getElementsByName('learnAddCourse');
		var isChecked = false;
		var courseArray = [];
	    for(var i = 0; i <dataTemp.length; i++){
	      if(dataTemp[i].checked){
	    	  isChecked=true;
	    	  var Temp = {};
	     	  var selectedTr = dataTemp[i].parentNode.parentNode;
	     	    if (selectedTr != null) {
	     	    	Temp.courseId = Number(selectedTr.cells[1].innerText);
	     	    	Temp.courseName = selectedTr.cells[2].innerText;
	     	    	Temp.trainBatchStart = dateBegin;
	     	    	Temp.trainBatchEnd = endBegin;
	     	    	Temp.personNum = personNum;
	     	    	Temp.end = 0;
	     	    	Temp.started = 0;
	     	    	Temp.unstart = personNum;
	     	    }else{
	     	    	alert("请选择一行");
	     	    }
	     	   var exist=false;
	     	    for(var j=0;j<courseTempData.length;j++){
	     	    	if(courseTempData[j].courseId == Temp.courseId){
	     	    		exist=true;
	     	    		break;
	     	    	}
	     	    }
	     	    if(!exist){
	     	    	courseArray.push(Temp);
	     	    }else{
	     	    	alert("课程重复,请重新选择");
	     	    	return;
	     	    }
//	     	   courseTempData.push(Temp);
	      	}
	     }
	    if(!isChecked){
	    	alert("请选择一行");
	    	return;
	    }
	    courseTempData = courseTempData.concat(courseArray);  
	    planCourseTable(courseTempData);
	    $('#myAddCourseModal').modal('hide');
	 })
	 
	 
 	 $("#delCourseBtn").click(function(){
 		var dataTemp = document.getElementsByName('learnCourse');
	    for(var i = 0; i <dataTemp.length; i++){
	      if(dataTemp[i].checked){
	    	  var selectedTr = dataTemp[i].parentNode.parentNode;
	    	  var id = selectedTr.cells[1].innerText;
	    	  for(var j=0;j<courseTempData.length;j++){
	    		  if(courseTempData[j].courseId == id){
	    			  courseTempData.remove(j);
	    			  break;
	    		  }
	    	  }
	      }
	    }
	    planCourseTable(courseTempData);
 	 })
	 
	 
	 
	 
	 //更新计划
	  $("#updatePlanBtn").click(function(){
			var planName = $.trim($("#planName").val());
			var planIntroduction = $.trim($("#planIntroduction").val());
			var dateBegin = $.trim($("#trainBatchStart").val());
			var endBegin = $.trim($("#trainBatchEnd").val());
			
			// 调用数据校验
    		var isPass = checkData(dataUpdate);
    		// 判断校验是否成功
    		if(!isPass){
    			return;
    		}

			
			//当前课时表中的数据

			if(courseTempData.length <= 0){
				showMsg("请为该学习计划添加课程信息");
				return false;
			}
			
			
			//当前人员表中的数据
			var personTempData = getNotifyPersonTableData();
			if(personTempData.length <= 0){
				showMsg("请添加学员信息");
				return false;
			}
			
		  	var students = [];
		  	var courses = [];
			var obj = {};
			

			
			var course_trs = $("#planCourseList_tbody > tr");
			for(var i = 0 ; i < course_trs.length ; i++){
				var id = $(course_trs[i]).find("td:eq(1)").text();
				courses.push(parseInt(id));
			}
			
			//保存学员ID
			for(var i=0;i<personTempData.length;i++){
				students.push(Number(personTempData[i].id));
			}
			
		    obj.id = planId;
		    obj.trainBatchStart = dateBegin;
		    obj.trainBatchEnd = endBegin;
		    obj.name = planName;
		    obj.describe = planIntroduction;
		    obj.students = getNotifyPersonTableData();
		    obj.courses = courses;
		    
		    var notifyMode = getNotifyTypeData();
		    if(notifyMode.length > 0){
			    obj.notifyMode  = notifyMode;	
		    }

			var strDate = JSON.stringify(obj);
			console.debug(obj);
		    $.ajax({
		        type: "POST",
		        url: "jv/learnplan/update.do",
		        data: {'data':strDate},
		        dataType: "json",
		        success: function(data){
		        	if(notifyMode.length > 0){
		            	var title= "学习计划通知";
		            	var content= "您有  "+ (courses.length) +"课程需要学习，请您按时学习";
		            	
		            	console.log("学习计划通知参数： title+"+title +"  content:" + content+"  receiver:" + students +"views/learnPlanList.jsp");
		            	notifyPerson(notifyMode,title,content,students,  contextPath + "/views/learnPlanList.jsp");
		        	}
		        	
		        	else{
		        		window.location.href= contextPath + "/views/learnPlanList.jsp";
		        	}
		        }
		    });
	 })
	 
	 
	 
	 	// 添加人员           
 	$("#addPersonBtn").click(function(){
 		var dataTemp = getAddPersonTableData();
 		var checkNode = document.getElementsByName('notifyPersonCheck');
 	    for(var i = 0; i < checkNode.length; i++){
 	     	 var selectedTr = checkNode[i].parentNode.parentNode;
 	     	    if (selectedTr != null) {	     	    	
 	     			var personTemp = {};
 	     			
 	     			personTemp.id = Number(selectedTr.cells[1].innerText);
 	     			personTemp.name = selectedTr.cells[2].innerText;
 	     			personTemp.node = selectedTr.cells[3].innerText;
 	     	    	
 	     			dataTemp.push(personTemp);
 	     	    }
 	     }
 	    
 		addPersonTable(dataTemp,"notifyPerson_table");
 		
 		$('#myamModal').modal('hide');
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
	 
	
});



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
    personTempData = data;
    addPersonTable(data,"notifyPerson_table");
}

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

//批量删除
function del(obj) {
	
	selectedTr = obj.parentNode.parentNode;
	//console.log(selectedTr);
	    if (selectedTr != null) { 
	        var id = selectedTr.cells[1].innerText;
	        delId = id;
	    }
	    else {
	    	showMsg("请选择一行");
	    }

}

//添加课程按钮
function addCourse(obj) {
	 tableAjax(1,maxVisible,true,"","","learnPlanAddCourse",false);
}


/*搜索课程*/
function searchCourse(obj) {
	var searchCourseName = $.trim($("#searchCourseName").val());
	var searchCourseType = $.trim($("#searchCourseType").val());
	tableAjax(1,maxVisible,true,searchCourseName,searchCourseType,"learnPlanAddCourse",true);
}


/*搜索*/
function searchPerson(obj) {
	var searchPersonId = $.trim($("#searchPersonId").val());
	var searchPersonName = $.trim($("#searchPersonName").val());

	personAjax(1,maxVisible,"learnPlanDetail",true,planID,searchPersonName,"",searchPersonId ? Number(searchPersonId) : '',true);
}

$(".up-move").live("click",function(){
	var current =  $(this).closest("tr");
	var prev = current.prev("tr");
	if(prev.length == 0) return;
	prev.before(current.clone());
	current.remove();
});

$(".down-move").live("click",function(){
	var current =  $(this).closest("tr");
	var next = current.next("tr");
	if(next.length == 0) return;
	next.after(current.clone());
	current.remove();
});



    