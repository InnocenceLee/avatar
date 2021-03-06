/**
 * Created by Administrator on 2016/7/26.
 */

//modify by lyh 20160718
var pageIndex;
//每段的页码数量
var maxVisible = 5;

//学习计划ID
var planId = 0;
//当前课程ID
var courseId = 0;
//当前课程ID
var lessonId = 0;

//学习记录 总页数
var tabTotleNum = 0;
//未学习人员总页数
var personTotleNum = 0;

//评价总页数
var commentTotleNum = 0;

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
			"<tr class='odd gradeX'><td>"+num+"</td>" +
			"<td style='display:none'>"+data[i].id+"</td>" +
			"<td>"+checkUndifend(data[i].name)+"</td>" +
			"<td class='hidden-480'>"+checkUndifend(data[i].typeName)+"</td>" +
			"<td class='center hidden-480'>"+checkUndifend(data[i].introduction)+"</td>" +
			"<td></td>" +
			"<td><span class='mycaExamine' onclick='viewDetail(this)'> 查看 </span></td></tr>";
	    }
	    $('#courseDetailList_tbody').html('').html(strTemp);
	    
	    break;
	case "learnNoteslList_tbody":
		$("#learnNoteslList_tbody").text("");
		var strTemp = "";
		var num = 0;
	    for(var i=0;i<data.length;i++){
	    	num = i+1;
			strTemp = strTemp + 
			"<tr><td style='display:none'>"+data[i].id+"</td>" +
			"<td>"+checkUndifend(data[i].lessonName)+"</td>" +
			"<td>"+checkUndifend(data[i].personId)+"</td>" +
			"<td>"+checkUndifend(data[i].personName)+"</td>" +
			"<td>"+checkUndifend(data[i].nodeName)+"</td>" +
			"<td>"+checkUndifend(data[i].plan_start)+"</td>" +
			"<td>"+checkUndifend(data[i].plan_end)+"</td>" +
			"<td>"+checkUndifend(data[i].trainTime)+"</td></tr>";

	    }
	    $("#learnNoteslList_tbody").html('').append(strTemp);
	    
		break;
	case "noLearnPlanPerson_tbody":
		
		$("#noLearnPlanPerson_tbody").text("");
		var strTemp = "";
		var num = 0;
	    for(var i=0;i<data.length;i++){
	    	num = i+1;
			strTemp = strTemp + 
			"<tr><td style='display:none'>"+data[i].id+"</td>" +
			"<td>"+checkUndifend(data[i].lessonName)+"</td>" +
			"<td>"+checkUndifend(data[i].employeeNo)+"</td>" +
			"<td>"+checkUndifend(data[i].personName)+"</td>" +
			"<td>"+checkUndifend(data[i].nodeName)+"</td></tr>";
	    }
	    $("#noLearnPlanPerson_tbody").html('').append(strTemp);
	    
		break;
		
	case "commentList_tbody":
		
		$("#commentList_tbody").text("");
		var strTemp = "";
		var num = 0;
	    for(var i=0;i<data.length;i++){
		    	num = i+1;
			strTemp = strTemp + 
			"<tr  class='odd gradeX'><td style='display:none'>"+data[i].id+"</td>" +
			"<td>"+checkUndifend(data[i].lessonName)+"</td>" +
			"<td>"+checkUndifend(data[i].personId)+"</td>" +
			"<td>"+checkUndifend(data[i].personName)+"</td><td>";
			
			for(var j =0;j<data[i].evaluation;j++){
				strTemp += "<i class='icon-star'></i>";
			}
			strTemp += "</td><td>" + checkUndifend(data[i].trainComment) + "</td><td>" +data[i].commentTime + "</td></tr>";
	    }

	    $("#commentList_tbody").html('').append(strTemp);
	    
		break;
	}
	
}

//转换数据
function readData(data,tableName){
	var Data = [];
	
	switch(tableName){
	case "learnNoteslList_tbody":
		if(data.length==0){
			tabTotleNum = 1;
		}
		for(var i=0;i<data.length;i++){
			var item = data[i];
			if(item!=undefined){
				
				if(item.totleNum != undefined/*rid*/){
					tabTotleNum = item.totleNum;
				}
				var tempData = {};
				tempData.nodeName = item.nodeName;
				tempData.personName = item.personName;
				tempData.personId = item.personId;
				tempData.id = item.id;
				tempData.lessonName = item.lessonName;
				tempData.plan_end = getLocalTime(item.plan_end);
				tempData.plan_start = getLocalTime(item.plan_start);
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
		
	case "noLearnPlanPerson_tbody":
		if(data.length==0){
			personTotleNum = 1;
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
			commentTotleNum = 1;
		}
		for(var i=0;i<data.length;i++){
			var item = data[i];
			if(item!=undefined){
				
				if(item.totleNum != undefined/*rid*/){
					commentTotleNum = item.totleNum;
					
				}
				
				if(item.evaluation != undefined){
					var tempData = {};
					tempData.id = item.id;
					tempData.personId = item.personId;
					tempData.personName = item.personName;
					tempData.lessonName = item.lessonName;
					tempData.evaluation = item.evaluation;
					tempData.empoly_no = item.empoly_no;
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


/* 学习记录 Ajax  */
function learnNotesAjax(page,maxVisible,modelName,bFlag,personId,personName,nodeName,courseId,planId,lessonId){
	var obj = {'page':page,'size':maxVisible,'personId':personId,'personName':personName,'nodeName':nodeName,'courseId':courseId,'planId':planId,'lessonId':lessonId};
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
        	console.log(data);
        	data = JSON.parse(data);
        	
        	 var tableData = readData(data,"learnNoteslList_tbody");
        	 console.log("tableData:"+JSON.stringify(tableData));
        	
            addTable(tableData,"learnNoteslList_tbody");
            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
            if(bFlag){
        	    /* 分页   */
    	        /*使用方法*/
                $t.using('tableAjax').init({
			    	 maxPage:tabTotleNum,
			    	 modelName:modelName,
			    	 personId:personId,
			    	 personName:personName,
			    	 nodeName:nodeName,
			    	 courseId:courseId,
			    	 planId:planId,
			    	 lessonId:lessonId,
			    	 maxVisible:maxVisible
		            
   	 	        }); 
            }
            
        }
    });
   
}



/* 课时评价 Ajax  */
function commentAjax(page,maxVisible,modelName,bFlag,personId,personName,nodeName,courseId,planId,lessonId){
	var obj = {'page':page,'size':maxVisible,'personId':personId,'personName':personName,'nodeName':nodeName,'courseId':courseId,'planId':planId,'lessonId':lessonId};
	var strDate = JSON.stringify(obj);
	console.log("commentAjax： "+strDate);
	
    $.ajax({
        type: "get",
        url: "jv/course/comment.do",
        data: {
       	 'data' : strDate
        },
        dataType: "json",
        success: function(data){
        	console.log(data);
        	data = JSON.parse(data);
        	
        	var tableData = readData(data,"commentList_tbody");
        	
        	console.log("tableData:"+JSON.stringify(tableData));

        	if(tableData.length >=0 ){
        		
                addTable(tableData,"commentList_tbody");
        	}
        	
            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
            if(bFlag){
        	    /* 分页   */
    	        /*使用方法*/
                $t.using('table3Ajax').init({
			    	 maxPage:commentTotleNum,
			    	 modelName:modelName,
			    	 personId:personId,
			    	 personName:personName,
			    	 nodeName:nodeName,
			    	 courseId:courseId,
			    	 planId:planId,
			    	 lessonId:lessonId,
			    	 maxVisible:maxVisible
		            
   	 	        }); 
            }
            
        }
    });
   
}


/* 学习人员列表Ajax  */
function noLearnPersonAjax(page,maxVisible,modelName,bFlag,personId,personName,nodeName,courseId,planId,lessonId){
	var obj = {'page':page,'size':maxVisible,'personId':personId,'personName':personName,'nodeName':nodeName,'lessonId':lessonId,'courseId':courseId,'trainPlanId':planId};
	var strDate = JSON.stringify(obj);
	console.log("noLearnPersonAjax： "+strDate);
	
    $.ajax({
        type: "get",
        url: "jv/course/notLearnPerson.do",
        data: {
       	 'data' : strDate
        },
        dataType: "json",
        success: function(data){
        	console.log(data);
        	data = JSON.parse(data);
        	
        	readData(data,"noLearnPlanPerson_tbody");
        	
       	 console.log("noLearnPersonAjax  Data:"+JSON.stringify(data));

            addTable(data,"noLearnPlanPerson_tbody");
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
			    	 lessonId:lessonId,
			    	 courseId:courseId,
			    	 planId:planId,
			    	 maxVisible:maxVisible
		            
   	 	        }); 
            }
            
        }
    });
}





////学习记录搜索
function learnNotesSearch(obj){
	var learnNotesSearchID = $.trim($("#learnNotesSearchID").val());
	var learnNotesSearchName = $.trim($("#learnNotesSearchName").val());
	var learnNotesSearchNode = $.trim($("#learnNotesSearchNode").val());
//	if((learnNotesSearchID == "")&&(learnNotesSearchName == "")&&(learnNotesSearchNode == "")){
//		showMsg("请填写搜索条件");
//		return false;
//		}
	
	learnNotesAjax(1,maxVisible,"learnDetailNoteslList",true,learnNotesSearchID,learnNotesSearchName,learnNotesSearchNode,courseId,planId,lessonId);
}



////未学习人员搜索
function personSearch(obj){
	var personSearchID = $.trim($("#personSearchID").val());
	var personSearchName = $.trim($("#personSearchName").val());
	var personSearchNode = $.trim($("#personSearchNode").val());
//	if(("" == personSearchID )&&("" == personSearchName)&&("" == personSearchNode )){
//		showMsg("请填写搜索条件");
//		return false;
//		}
	
	noLearnPersonAjax(1,maxVisible,"noLearnPlanPerson",true,personSearchID,personSearchName,personSearchNode,courseId,planId,lessonId);
}



////评价搜索
function commentSearch(obj){
	var commentSearchId = $.trim($("#commentSearchId").val());
	var commentSearchName = $.trim($("#commentSearchName").val());
	var commentSearchNode = $.trim($("#commentSearchNode").val());
//	if(("" == commentSearchId )&&("" == commentSearchName)&&("" == commentSearchNode )){
//		showMsg("请填写搜索条件");
//		return false;
//		}
	
	commentAjax(1,maxVisible,"commentlList",true,commentSearchId,commentSearchName,commentSearchNode,courseId,planId,lessonId);
}


/**
 * 学习内容导出
 */
function learnRecordExport(){
	
	var learnNotesSearchID = $.trim($("#learnNotesSearchID").val());
	var learnNotesSearchName = $.trim($("#learnNotesSearchName").val());
	var learnNotesSearchNode = $.trim($("#learnNotesSearchNode").val());
	
	var data = {};
	data.personId = parseInt(learnNotesSearchID);
	data.personName = learnNotesSearchName;
	data.nodeName = learnNotesSearchNode;
	data.planId = parseInt(planId);
	data.courseId = parseInt(courseId);
	data.lessonId = parseInt(lessonId);
	data.opt = "record"
	
	var args = JSON.stringify(data);
	
	window.location.href = "jv/lesson/exportLearn.do?data=" + args;
	
}


function noLearnExport(){
	var personSearchID = $.trim($("#personSearchID").val());
	var personSearchName = $.trim($("#personSearchName").val());
	var personSearchNode = $.trim($("#personSearchNode").val());
	
	var data = {};
	data.lessonId = parseInt(personSearchID);
	data.personId = parseInt(personSearchID);
	data.nodeName = personSearchNode;
	data.trainPlanId = parseInt(planId);
	data.courseId = parseInt(courseId);
	data.lessonId = parseInt(lessonId);
	var args = JSON.stringify(data);
	window.location.href = "jv/course/exportNolearn.do?data=" + args;
}

////评价导出
function commentExport(){
	var commentId = $.trim($("#commentSearchId").val());
	var commentName = $.trim($("#commentSearchName").val());
	var commentNode = $.trim($("#commentSearchNode").val());
	
	var data = {}
	data.personId = parseInt(commentId);
	data.personName = commentName;
	data.nodeName = commentNode;
	data.planId = parseInt(planId);
	data.courseId = parseInt(courseId);
	data.lessonId = parseInt(lessonId);
	data.opt = "comment"
    var args = JSON.stringify(data);
	
	window.location.href = "jv/course/exportComment.do?data=" + args;
}







