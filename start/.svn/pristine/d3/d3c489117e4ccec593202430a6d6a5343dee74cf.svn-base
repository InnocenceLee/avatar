/**
 * 
 */

//modify by lyh 20160718
var pageIndex;
//课程的页面数
var courseTotleNum = 0;
//人员的页面数
var personTotleNum = 0;
//每段的页码数量
var maxVisible = 10;

//当前学习计划ID
var  planID = 0;



/* 创建table*/
function addTable(data){
	$("#courseList_tbody").text("");
	var strTemp = "";
    for(var i=0;i<data.length;i++){
		strTemp = strTemp + 
		"<tr><td style='display:none'>"+data[i].courseId+"</td>" +
		"<td>"+data[i].courseName+"</td>" +
		"<td>"+data[i].trainBatchStart +" ~ " +data[i].trainBatchEnd +"</td>" +
		"<td >"+data[i].personNum+"</td>" +
		"<td >"+data[i].end+"</td>" +
		"<td >"+data[i].started+"</td>" +
		"<td >"+data[i].unstart+"</td>" +
		"<td class='mylistSee'><span  onclick='viewDetail(this)'>查看</span> </td></tr>";
    }
    $("#courseList_tbody").html('').append(strTemp);
}

//转换数据  课程数据  bFlag = true,   人员数据 bFlag = false
function readData(data,bFlag){
	if(data.length == 0){
		if(bFlag){
			courseTotleNum = 1;
		}
		else{
			personTotleNum = 1;
		}
	}
	for(var i=0;i<data.length;i++){
		var item = data[i];
		if(item!=undefined){
			if(item.totleNum != undefined/*rid*/){
				if(bFlag){
					courseTotleNum = item.totleNum;
				}
				else{
					personTotleNum = item.totleNum;
				}
			}
		}
	}
/*	[{"trainBatchEnd":"2016-07-27 12:07:00",
		"unstart":0,
		"courseName":"数学课",
		"trainBatchStart":"2016-07-06 12:07:00",
		"planId":3,
		"end":0,
		"started":0,
		"personNum":2,
		"totleNum":2,
		"courseId":1001}]*/
	
/*	console.log("输出data");
	console.log(JSON.stringify(Data));
	console.log("end");*/
}



/* 课程列表Ajax  */
function tableAjax(page,maxVisible,modelName,bFlag,id,searchFlag){
	var obj = {'page':page,'size':maxVisible,'id':id};
	//planID = id;
	//var obj = {'id':id};
	var strDate = JSON.stringify(obj);
	//alert("tableAjax参数： "+strDate);
//	console.log("tableAjax参数： "+strDate);
    $.ajax({
        type: "get",
        url: "jv/learnplan/coursecontent.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
//        	console.log("学习计划详情:"+data);
        	data = JSON.parse(data);
        	readData(data,true);
            addTable(data);
            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
            if(searchFlag){
            	$t.using('tableAjax').reset(courseTotleNum);
            } else if(bFlag){
            	//UIGeneral.init(page,totleNum,maxVisible,modelName);
        	    /* 分页   */
    	        /*使用方法*/
                $t.using('tableAjax').init({
			    	 maxPage:courseTotleNum,
			    	 id:id,
			    	 modelName:modelName,
			    	 maxVisible:maxVisible
		            
   	 	        }); 

            }
            
        }
    }); 
}



//创建人员表 
function addPlanDetailPersonTable(data){
	$("#planPersonList_tbody").text("");
	var strTemp = "";
    for(var i=0;i<data.length;i++){
		strTemp = strTemp + 
		"<tr><td>"+data[i].personId+"</td>" +
		"<td>"+data[i].person_no+"</td>" +
		"<td>"+data[i].personName+"</td>" +
		"<td>"+(data[i].nodeName || '')+"</td></tr>";
    }
    $("#planPersonList_tbody").html('').append(strTemp);
}







/* 人员列表Ajax  */
function personAjax(page,maxVisible,modelName,bFlag,id,personName,nodeName,personId,searchFlag){
	var obj = {'page':page,'size':maxVisible,'id':id,'personName':personName,'nodeName':nodeName,'personId':personId};
	
	//var obj = {'id':id};
	var strDate = JSON.stringify(obj);
	//alert("tableAjax参数： "+strDate);
//	console.log("tableAjax参数： "+strDate);
    $.ajax({
        type: "get",
        url: "jv/learnplan/notifyperson.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
//        	console.log(data);
        	data = JSON.parse(data);
        	readData(data,false);
            addPlanDetailPersonTable(data);
            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
            if(searchFlag){
            	$t.using('table2Ajax').reset(personTotleNum);
            } else if(bFlag){
            	//UIGeneral.init(page,totleNum,maxVisible,modelName);
            	
        	    /* 分页   */
    	        /*使用方法*/
               $t.using('table2Ajax').init({
			    	 maxPage:personTotleNum,
			    	 id:id,
			    	 personName:personName,
			    	 nodeName:nodeName,
			    	 personId:personId,
			    	 modelName:modelName,
			    	 maxVisible:maxVisible
		            
   	 	        }); 

            }
            
        }
    }); 
}


//$(document).ready(function(){
//    App.init();
//    tableAjax(1,maxVisible,true,"","learnPlayList");
//   
//});


/*查看详情*/
function del(obj) {
	var idTemp = [];
    idTemp.push(obj);
    var obj = {id : idTemp};
	var strDate = JSON.stringify(obj);
	
	$http.ajax({
		 isModal : false,
         type: "POST",
         url: "../../../jv/learnplan/delplan.do",
         data: {'data':strDate},
         dataType: "json",
         success: function(data){
        	 var err = JSON.parse(data);
        	    if(err.error){
        		   //err.error.message
        		   var modalTitle = "操作失败";
        		   $(".Bomb-box").html(err.error.message);
        		   return;
        	  }
        	 window.location.href="../../../views/learnPlanList.jsp";
          }
 	    });
}




//查看课程详情
function viewDetail(obj) {
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
    	var id = selectedTr.cells[0].innerText;

        window.location.href="jv/course/detaillearn.do?id="+id +"&learnId="+ planID;
    }
    else {
        alert("请选择一行");
    }
}


/*搜索*/
function searchPerson(obj) {
	var searchPersonId = $.trim($("#searchPersonId").val());
	var searchPersonName = $.trim($("#searchPersonName").val());
/*	if((searchName == "") && (searchNode == "")&& (searchState == "")){
		alert("请填写搜索条件");
		return false;
		}*/
	personAjax(1,maxVisible,"learnPlanDetail",true,planID,searchPersonName,"",searchPersonId ? searchPersonId : '',false);
}








