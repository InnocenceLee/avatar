/**
 * Created by Administrator on 2016/7/26.
 */

//modify by lyh 20160718
var pageIndex;
//每段的页码数量
var maxVisible = 5;

//学习计划ID
var planID = 0;
//当前课程ID
var courseID = 0;

//标签页 总页数
var tabTotleNum = 0;
//学习人员总页数
var personTotleNum = 0;

/*状态信息选项卡*/
var myLcdbtn1 = document.getElementById("myLcdbtn1");
var myLcdbtn2 = document.getElementById("myLcdbtn2");
var myLcdbtn3 = document.getElementById("myLcdbtn3");
var myPlan =document.getElementById("myPlan");
var myPlan1 =document.getElementById("myPlan1");
var myPlan2 =document.getElementById("myPlan2");


/* 创建table*/
function addTable(data,tableName){
	
	switch(tableName){
	case "courseDetailList_tbody":
		$("#courseDetailList_tbody").text("");
		var strTemp = "";
		var num = 0;
	    for(var i=0;i<data.length;i++){
	    	num = i+1;
			strTemp = strTemp + 
			"<tr class='odd gradeX'>" +
			"<td>"+num+"</td>" +
			"<td style='display:none'>"+data[i].id+"</td>" +
			"<td>"+checkUndifend(data[i].name)+"</td>" +
			"<td class='hidden-480'>"+checkUndifend(data[i].typeName)+"</td>" +
			"<td class='center hidden-480'><span class='myToolong'>"+checkUndifend(data[i].introduction)+"</span></td>" +
			"<td></td>" +
			"<td><span class='mycaExamine' onclick='viewDetail(this)'> 查看 </span></td>" +
			"</tr>";
	    }
	    $("#courseDetailList_tbody").html(strTemp)
//		var tbody=document.getElementById("courseDetailList_tbody");
//	    tbody.innerHTML = "";
//	    tbody.innerHTML += strTemp;
	    
	    break;
	case "learnNoteslList_tbody":
		$("#learnNoteslList_tbody").text("");
		var strTemp = "";
		var num = 0;
	    for(var i=0;i<data.length;i++){
	    	num = i+1;
			strTemp = strTemp + 
			"<tr>" +
			"<td style='display:none'>"+data[i].id+"</td>" +
			"<td>"+checkUndifend(data[i].lessonName)+"</td>" +
			"<td>"+checkUndifend(data[i].personId)+"</td>" +
			"<td>"+checkUndifend(data[i].personName)+"</td>" +
			"<td>"+checkUndifend(data[i].nodeName)+"</td>" +
//			"<td>"+checkUndifend(data[i].plan_start)+"</td>" +
//			"<td>"+checkUndifend(data[i].plan_end)+"</td>" +
			"<td>"+checkUndifend(data[i].plan_start)+"</td>" +
			"<td>"+checkUndifend(data[i].plan_end)+"</td>" +
			"<td>"+data[i].trainTime+"</td>" +
			"</tr>";
			
	    }
	    $("#learnNoteslList_tbody").html(strTemp)
//		var tbody=document.getElementById("learnNoteslList_tbody");
//	    tbody.innerHTML = "";
//	    tbody.innerHTML += strTemp;
	    
		break;
	case "learnPlanPerson_tbody":
		
		$("#learnPlanPerson_tbody").text("");
		var strTemp = "";
		var num = 0;
	    for(var i=0;i<data.length;i++){
	    	num = i+1;
			strTemp = strTemp + 
			"<tr>" +
			"<td></td>" +
			"<td style='display:none'>"+data[i].id+"</td>" +
			"<td>"+checkUndifend(data[i].lessonName)+"</td>" +
			"<td>"+checkUndifend(data[i].personId)+"</td>" +
			"<td>"+checkUndifend(data[i].personName)+"</td>" +
			"<td>"+checkUndifend(data[i].nodeName)+"</td>" +
			"</tr>";
	    }
	    
	    $("#learnPlanPerson_tbody").html(strTemp)
//		var tbody=document.getElementById("learnPlanPerson_tbody");
//	    tbody.innerHTML = "";
//	    tbody.innerHTML += strTemp;
	    
		break;
		
	case "commentList_tbody":
		
		$("#commentList_tbody").text("");
		var strTemp = "";
		var num = 0;
	    for(var i=0;i<data.length;i++){
	    	num = i+1;
			strTemp = strTemp + 
			"<tr  class='odd gradeX'>" +
			"<td style='display:none'>"+data[i].id+"</td>" +
			"<td>"+checkUndifend(data[i].lessonName)+"</td>" +
			"<td>"+checkUndifend(data[i].personId)+"</td>" +
			"<td>"+checkUndifend(data[i].personName)+"</td>" +
			"<td>";
			for(var j =0;j<data[i].evaluation;j++){
				strTemp += "<i class='icon-star'></i>";
			}
			strTemp += "</td>" +
					"<td>" + checkUndifend(data[i].trainComment) + "</td>" +
					"<td>" +checkUndifend(data[i].commentTime) + "</td>" +
					"</tr>";
	    }
	    $("#commentList_tbody").html(strTemp)
//		var tbody=document.getElementById("commentList_tbody");
//	    tbody.innerHTML = "";
//	    tbody.innerHTML += strTemp;
	    
		break;
	}
	
}


var tabTotleNum4courseDetailList = 0;
var tabTotleNum4commentList = 0;
var tabTotleNum4learnNoteslList = 0;
//转换数据
function readData(data,tableName){
	var Data = [];
	
	switch(tableName){
	case "courseDetailList_tbody":
		for(var i=0;i<data.length;i++){
			var item = data[i];
			if(item!=undefined){
				if(item.totleNum != undefined/*rid*/){
					tabTotleNum4courseDetailList = item.totleNum;
				}
				var tempData = {};
				tempData.courseId = item.courseId;
				tempData.name = item.name;
				tempData.id = item.id;
				tempData.type = item.type;
				tempData.introduction = item.introduction;
				//tempData.createdate = getLocalTime(item.createdate);
				
				switch(item.type)
				{
				case "E":
					tempData.typeName = "学习";
					break;
				case "R":
					tempData.typeName = "大课";
					break;
				case "M":
					tempData.typeName = "模拟机";
					break;
				case "X":
					tempData.typeName = "考试";
					break;
				default:
					break;
				}
				Data.push(tempData);
			}
		}
		break;
	case "learnNoteslList_tbody":
		if(data.length==0){
			tabTotleNum4learnNoteslList=1;
		}
		for(var i=0;i<data.length;i++){
			var item = data[i];
			if(item!=undefined){
				if(item.totleNum != undefined/*rid*/){
					tabTotleNum4learnNoteslList = item.totleNum;
				}
				var tempData = {};
				tempData.nodeName = item.nodeName;
				tempData.personName = item.personName;
				tempData.personId = item.personId;
				tempData.id = item.id;
				tempData.lessonName = item.lessonName;
				tempData.plan_end = getLocalDate(item.plan_end);
				tempData.plan_start = getLocalDate(item.plan_start);
				if(item.trainTime != undefined){

					tempData.trainTime = MillisecondToDate(item.trainTime);
				}
				else{
					tempData.trainTime = 0;
				}
				
				Data.push(tempData);
			}
		}
		
		break;
		
	case "learnPlanPerson_tbody":
		if(data.length==0){
			personTotleNum=1;
		}
		for(var i=0;i<data.length;i++){
			var item = data[i];
			if(item!=undefined){
				if(item.totleNum != undefined/*rid*/){
					personTotleNum = item.totleNum;
				}
			}
		}
		break;
	case "commentList_tbody":
		if(data.length==0){
			tabTotleNum4commentList = 1;
		}
		for(var i=0;i<data.length;i++){
			var item = data[i];
			if(item!=undefined){
				if(item.totleNum != undefined/*rid*/){
					tabTotleNum4commentList = item.totleNum;
				}
				if(item.evaluation != undefined){
					var tempData = {};
					tempData.id = item.id;
					tempData.personId = item.personId;
					tempData.personName = item.personName;
					tempData.lessonName = item.lessonName;
					tempData.empoly_no = item.empoly_no;
					tempData.evaluation = item.evaluation;
					tempData.trainComment = item.trainComment;
					tempData.createdate = getLocalTime(item.createdate);
					tempData.commentTime = getLocalTime(item.commentTime);
					Data.push(tempData);
				}
			}
		}
		break;
	}
/*	console.log("输出data");
	console.log(JSON.stringify(Data));
	console.log("end");*/
	return Data;	
}


/* 课时列表Ajax  */
function TableAjax(page,maxVisible,modelName,bFlag,id){
	var obj = {'page':page,'size':maxVisible,'id':id};
	var strDate = JSON.stringify(obj);
	console.log("tableAjax参数： "+strDate);
    $.ajax({
        type: "get",
        url: "jv/lesson/list.do",
        data: {
       	 'data' : strDate
        },
        dataType: "json",
        success: function(data){
//        	console.log(data);
        	data = JSON.parse(data);
        	
        	//传一个
        	var tableData = readData(data,"courseDetailList_tbody");
        	
//        	console.log("tableData:"+JSON.stringify(tableData));
        	
            addTable(tableData,"courseDetailList_tbody");
            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
            if(bFlag){
        	    /* 分页   */
    	        /*使用方法*/
                $t.using('tableAjax').init({
			    	 maxPage:tabTotleNum4courseDetailList,
			    	 modelName:modelName,
			    	 id:id,
			    	 maxVisible:maxVisible
		            
   	 	        }); 
            }
            
        }
    });
   
}



/* 学习记录 Ajax  */
function learnNotesAjax(page,maxVisible,modelName,bFlag,personId,personName,nodeName,lessonName,courseId,planId){
	var obj = {'page':page,'size':maxVisible,'personId':personId,'personName':personName,'nodeName':nodeName,'lessonName':lessonName,'courseId':courseId,'planId':planId};
	var strDate = JSON.stringify(obj);
	console.log("learnNotesAjax： "+strDate);
	
    $.ajax({
        type: "get",
        url: "jv/lesson/learnlog.do",
        data: {
       	 'data' : strDate
        },
        dataType: "json",
        success: function(data){
//        	console.log(data);
        	data = JSON.parse(data);
        	
        	 var tableData = readData(data,"learnNoteslList_tbody");
//        	 console.log("tableData:"+JSON.stringify(tableData));
        	
            addTable(tableData,"learnNoteslList_tbody");
            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
           if(bFlag){
        	    /* 分页   */
    	        /*使用方法*/
               $t.using('table3Ajax').init({
  		    	 maxPage:tabTotleNum4learnNoteslList,
  		    	 modelName:modelName,
  		    	 personId:personId,
  		    	 personName:personName,
  		    	 nodeName:nodeName,
  		    	 lessonName:lessonName,
  		    	 courseId:courseId,
  		    	 planId:planId,
  		    	 maxVisible:maxVisible
  	            
  	 	      }); 
     
            }
           

            
        }
    });
   
}



/* 课时评价 Ajax  */
function commentAjax(page,maxVisible,modelName,bFlag,personId,personName,nodeName,lessonName,courseId,planId){
	var obj = {'page':page,'size':maxVisible,'personId':personId,'personName':personName,'nodeName':nodeName,'lessonName':lessonName,'courseId':courseId,'planId':planId};
	var strDate = JSON.stringify(obj);
//	console.log("commentAjax： "+strDate);
	
    $.ajax({
        type: "get",
        url: "jv/course/comment.do",
        data: {
       	 'data' : strDate
        },
        dataType: "json",
        success: function(data){
//        	console.log("评价记录："+data);
        	data = JSON.parse(data);
        	
        	var tableData = readData(data,"commentList_tbody");
        	
//        	console.log("tableData:"+JSON.stringify(tableData));

        
        		
            addTable(tableData,"commentList_tbody");
        	
        	
            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
            if(bFlag){
        	    /* 分页   */
    	        /*使用方法*/
                $t.using('table4Ajax').init({
			    	 maxPage:tabTotleNum4commentList,
			    	 modelName:modelName,
			    	 personId:personId,
			    	 personName:personName,
			    	 nodeName:nodeName,
			    	 lessonName:lessonName,
			    	 courseId:courseId,
			    	 planId:planId,
			    	 maxVisible:maxVisible
		            
   	 	        }); 
            }
            
        }
    });
   
}





/* 学习人员列表Ajax  */
function personAjax(page,maxVisible,modelName,bFlag,personId,personName,nodeName,state,courseId,planId){
	var obj = {'page':page,'size':maxVisible,'personId':personId,'personName':personName,'nodeName':nodeName,'state':state,'courseId':courseId,'planId':planId};
	var strDate = JSON.stringify(obj);
//	console.log("personAjax： "+strDate);
	
    $.ajax({
        type: "get",
        url: "jv/lesson/learnPerson.do",
        data: {
       	 'data' : strDate
        },
        dataType: "json",
        success: function(data){
//        	console.log("学习计划详情的学习人员:"+data);
        	data = JSON.parse(data,"learnPlanPerson_tbody");
        	
        	readData(data,"learnPlanPerson_tbody");
        	
            addTable(data,"learnPlanPerson_tbody");
            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
            if(bFlag){
        	    /* 分页   */
    	        /*使用方法*/
                $t.using('table2Ajax').init({
			    	 maxPage:personTotleNum,
			    	 modelName:modelName,
			    	 personId:personId,
			    	 personName:personName,
			    	 nodeName:nodeName,
			    	 state:state,
			    	 courseId:courseId,
			    	 planId:planId,
			    	 maxVisible:maxVisible
		            
   	 	        }); 
            }
            
        }
    });
}

//切换选项卡
function tabChange1(){

	myPlan.style.display = "block";
	myPlan1.style.display = "none";
	myPlan2.style.display = "none";
	myLcdbtn1.style.backgroundColor = "#4D90FE";
	myLcdbtn2.style.backgroundColor = "#ffffff";
	myLcdbtn3.style.backgroundColor = "#ffffff";
	myLcdbtn1.style.color = "#ffffff";
	myLcdbtn2.style.color = "#7a818b";
	myLcdbtn3.style.color = "#7a818b";
	$(myLcdbtn1).blur();
	TableAjax(1,maxVisible,"courseDetailList",true,courseID);
}
function tabChange2(){

	myPlan.style.display = "none";
	myPlan1.style.display = "block";
	myPlan2.style.display = "none";
	myLcdbtn1.style.backgroundColor = "#ffffff";
	myLcdbtn2.style.backgroundColor = "#4D90FE";
	myLcdbtn3.style.backgroundColor = "#ffffff";
	myLcdbtn1.style.color = "#7a818b";
	myLcdbtn2.style.color = "#ffffff";
	myLcdbtn3.style.color = "#7a818b";
	$(myLcdbtn2).blur();
	
	learnNotesAjax(1,maxVisible,"learnNoteslList",true,"","","","",courseID,planID);
}
function tabChange3(){
	myPlan.style.display = "none";
	myPlan1.style.display = "none";
	myPlan2.style.display = "block";
	myLcdbtn1.style.backgroundColor = "#ffffff";
	myLcdbtn2.style.backgroundColor = "#ffffff";
	myLcdbtn3.style.backgroundColor = "#4D90FE";
	myLcdbtn1.style.color = "#7a818b";
	myLcdbtn2.style.color = "#7a818b";
	myLcdbtn3.style.color = "#ffffff";
	$(myLcdbtn3).blur();
	
	commentAjax(1,maxVisible,"commentlList",true,"","","","",courseID,planID);
}



////学习记录搜索
function learnNotesSearch(obj){
	var learnNotesSearchID = $.trim($("#learnNotesSearchID").val());
	var learnNotesSearchName = $.trim($("#learnNotesSearchName").val());
	var learnNotesSearchNode = $.trim($("#learnNotesSearchNode").val());
	var learnNotesSearchCourse = $.trim($("#learnNotesSearchCourse").val());
//	if((learnNotesSearchID == "")&&(learnNotesSearchName == "")&&(learnNotesSearchNode == "")&&(learnNotesSearchCourse == "")){
//		alert("请填写搜索条件");
//		return false;
//		}
	//learnNotesSearchID = "";
	if(learnNotesSearchID == ""	){
		learnNotesAjax(1,maxVisible,"learnNoteslList",true,"",learnNotesSearchName,learnNotesSearchNode,learnNotesSearchCourse,courseID,planID);
	}
	else{
		learnNotesAjax(1,maxVisible,"learnNoteslList",true,learnNotesSearchID,learnNotesSearchName,learnNotesSearchNode,learnNotesSearchCourse,courseID,planID);
	}
	
	
}



////学习人员搜索
function personSearch(obj){
	var personSearchID = $.trim($("#personSearchID").val());
	var personSearchName = $.trim($("#personSearchName").val());
	var personSearchNode = $.trim($("#personSearchNode").val());
	var personSearchState = $("#personSearchState").val();
	if("all" == personSearchState){
		personSearchState = ""
	}
	if(personSearchID == ""){
		personAjax(1,maxVisible,"learnPlanPerson",true,"",personSearchName,personSearchNode,personSearchState,courseID,planID);
	}
	else{
		personAjax(1,maxVisible,"learnPlanPerson",true,personSearchID,personSearchName,personSearchNode,personSearchState,courseID,planID);
	}
	
	
}

function personExport(){
	var personSearchID = $.trim($("#personSearchID").val());
	var personSearchName = $.trim($("#personSearchName").val());
	var personSearchNode = $.trim($("#personSearchNode").val());
	var personSearchState = $("#personSearchState").val();
	
	var data = {};
	data.personId = parseInt(personSearchID);
	data.personName = personSearchName;
	data.nodeName = personSearchNode;
	data.state = personSearchState == 'all' ? '' : personSearchState;
	data.planId = parseInt(planID);
	data.courseId = parseInt(courseID);
	data.opt = "person"
	
	var args = JSON.stringify(data);
	
	window.location.href = "jv/lesson/exportPerson.do?data=" + args;
	
}

/**
 * 学习记录导出
 */
function learnRecordExport(){
	var learnNotesSearchID = $.trim($("#learnNotesSearchID").val());
	var learnNotesSearchName = $.trim($("#learnNotesSearchName").val());
	var learnNotesSearchNode = $.trim($("#learnNotesSearchNode").val());
	var learnNotesSearchCourse = $("#learnNotesSearchCourse").val();
	
	var data = {};
	data.personId = parseInt(learnNotesSearchID);
	data.personName = learnNotesSearchName;
	data.nodeName = learnNotesSearchNode;
	data.lessonName = learnNotesSearchCourse;
	data.planId = parseInt(planID);
	data.courseId = parseInt(courseID);
	data.opt = "record"
	
	var args = JSON.stringify(data);
	
	window.location.href = "jv/lesson/exportLearn.do?data=" + args;
	
}


////评价导出
function commentExport(){
	var commentId = $.trim($("#commentSearchId").val());
	var commentName = $.trim($("#commentSearchName").val());
	var commentNode = $.trim($("#commentSearchNode").val());
	var commentCourse = $("#commentSearchCourse").val();
	
	var data = {}
	data.personId = parseInt(commentId);
	data.personName = commentName;
	data.nodeName = commentNode;
	data.lessonName = commentCourse;
	data.planId = parseInt(planID);
	data.courseId = parseInt(courseID);
	data.opt = "comment"
    var args = JSON.stringify(data);
	
	window.location.href = "jv/course/exportComment.do?data=" + args;
}


////评价搜索
function commentSearch(obj){
	var commentSearchId = $.trim($("#commentSearchId").val());
	var commentSearchName = $.trim($("#commentSearchName").val());
	var commentSearchNode = $.trim($("#commentSearchNode").val());
	var commentSearchCourse = $("#commentSearchCourse").val();
//	if(("" == commentSearchId )&&("" == commentSearchName)&&("" == commentSearchNode )&&( "" == commentSearchCourse)){
//		alert("请填写搜索条件");
//		return false;
//		}
	if(commentSearchId == ""){
		commentAjax(1,maxVisible,"commentlList",true,"",commentSearchName,commentSearchNode,commentSearchCourse,courseID,planID);
	}
	else{
		commentAjax(1,maxVisible,"commentlList",true,commentSearchId,commentSearchName,commentSearchNode,commentSearchCourse,courseID,planID);
	}
	
	
}



/*查看课时详情*/
function viewDetail(obj) {
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
        var id = selectedTr.cells[1].innerText;

        window.location.href="jv/lesson/lessonlearn.do?lessonId="+id +"&courseId=" +courseID +"&planId=" + planID;
    }
    else {
        alert("请选择一行");
    }
}


