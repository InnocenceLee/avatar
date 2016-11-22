/**
 * Created by Administrator on 2016/7/11.
 */

//modify by lyh 20160718
var pageIndex;
var totleNum = 0;
//每段的页码数量
var maxVisible = 20;



/* 创建table*/
function addTable(data){
	$("#examList_tbody").text("");
	var strTemp = "";
    for(var i=0;i<data.length;i++){
    	
    	var state = "已开始";
    	try{
    		var start = new Date(data[i].examStart);
        	var end = new Date(data[i].examEnd);
        	var current = new Date();
        	if(current < start){ // 未开始
        		state = "未开始";
        	}else if(current > end){ // 已过期
        		state = "已过期";
        	}
    	}catch(e){}
    	
    	
		strTemp = strTemp + 
		"<tr><td><input type='checkbox' name='examCheck' class='checkboxes' /></td>" +
		"<td style='display:none;' >"+data[i].id+"</td>" +
		"<td>"+checkUndifend(data[i].name)+"</td>" +
		"<td >"+checkUndifend(data[i].examType)+"</td>" +
		"<td >"+checkUndifend(data[i].examStart)+"</td>" +
		"<td >"+checkUndifend(data[i].examEnd)+"</td>" +
		"<td >"+checkUndifend(data[i].passScore)+"</td>" +
		"<td >"+checkUndifend(data[i].duration)+"</td>" +
		"<td >"+ state +"</td>" +
		"<td >"+(data[i].studentsNum || 0)+"</td>" +
//		"<td >"+(data[i].missnum || 0)+"</td>" +
		"<td >"+(data[i].passnum || 0)+"</td>" +
		"<td >"+(data[i].avgnum || 0)+"</td>" +
		"<td >"+(data[i].maxnum || 0)+"</td>" +
		"<td >"+(data[i].minnum || 0)+"</td>" +
		"<td ><span class='center hidden-480 mylistSee' onclick='viewDetail("+ data[i].id +")'> 详情 </span></td>" +
		"<td><span class='mycaExamine' onclick='modify(this)'>修改</span></tr>";
    }
	var tbody=document.getElementById("examList_tbody");
	$("#examList_tbody").html(strTemp);
}

//转换数据
function readData(data){
	var Data = [];
	
	if(data.length <= 0){
		totleNum = 0;
	}
	
	for(var i=0;i<data.length;i++){
		var item = data[i];
		if(item!=undefined){
			
			if(item.totleNum != undefined/*rid*/){
				totleNum = item.totleNum;
				
			}
			
			var tempData = {};
			tempData.name = item.name;
			tempData.randomOrder = item.randomOrder;
			tempData.avgnum = item.avgnum;
			tempData.examNum = item.examNum;
			tempData.examNotice = item.examNotice;
			if(item.students != undefined){
				tempData.studentsNum = item.students.length;
			}
			
			tempData.examNotice = item.examNotice;
			tempData.examType = item.examType;
			tempData.examClassifications = item.examClassifications;
			tempData.maxnum = item.maxnum;
			tempData.passScore = item.passScore;
			tempData.paperMode = item.paperMode;
			tempData.minnum = item.minnum;
			tempData.duration = item.duration;
			tempData.exam_plan = item.exam_plan;
			tempData.examStart = timeStamp2M(item.examStart);
			tempData.examEnd = timeStamp2M(item.examEnd);
			tempData.examPaper = item.examPaper;
			tempData.missnum = item.missnum;
			tempData.id = item.id;
			tempData.passnum = item.passnum;
			
			Data.push(tempData);
		}
	}
/*	console.log("输出data");
	console.log(JSON.stringify(Data));
	console.log("end");*/
	return Data;	
}


/* Ajax  */
function tableAjax(page,maxVisible,bFlag,name,modelName,searchFlag){
	name = $.trim($("#searchName").val());
	var obj = {'page':page,'size':maxVisible,'name':name};
	var strDate = JSON.stringify(obj);
	console.log("tableAjax参数： "+strDate);
	$http.ajax({
		isModal : false,
        type: "get",
        url: "jv/exam/list.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
        	console.log(data);
        	data = JSON.parse(data);
        	tableData = readData(data);
            addTable(tableData);
            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
            if(searchFlag){
            	$t.using('tableAjax').reset(totleNum);
            	$("#page-count").html(totleNum);
            } else if(bFlag){
            	//UIGeneral.init(page,totleNum,maxVisible,modelName);
            	
        	    /* 分页   */
    	        /*使用方法*/
                $t.using('tableAjax').init({
			    	 maxPage:totleNum,
			    	 name:name,
			    	 modelName:modelName,
			    	 maxVisible:maxVisible
		            
   	 	        }); 

            }
            
        }
    });
   
}


$(document).ready(function(){
    App.init();
    tableAjax(1,maxVisible,true,"","examList",false);
   
});
    


/*搜索*/
function search(obj) {
	var searchName = $.trim($("#searchName").val());
/*	if((searchName == "") && (searchNode == "")&& (searchState == "")){
		alert("请填写搜索条件");
		return false;
		}*/
	
	 tableAjax(1,maxVisible,true,searchName,"examList",false);
}



/*得到选中的值*/
function viewDetail(paperId) {
//    selectedTr = obj.parentNode.parentNode;
//    if (selectedTr != null) {
//        var id = selectedTr.cells[1].innerText;
//    }
//    else {
//        alert("请选择一行");
//    }
//    var id = $($(selectedTr).find("td").get(1)).text();
    window.location.href="jv/exam/detail.do?id=" + paperId;
}

/*得到选中的值*/
function modify(obj) {
    selectedTr = obj.parentNode.parentNode;
    var id = $($(selectedTr).find("td").get(1)).text();
    var state = $($(selectedTr).find("td").get(8)).text();
    
    var startDate = new Date(selectedTr.cells[4].innerText);
   	var nowDate = new Date();
   	if(nowDate > startDate){
   		showMsg('<'+selectedTr.cells[2].innerText +'>考试已生效，无法修改');
   		$("#myDelModal").modal('hide');
   		return;
   	}
    window.location.href="jv/exam/detailupdate.do?id=" + id;
}


/*得到选中的值*/
function del(obj) {
	var idsTemp = [];
	var dataTemp = document.getElementsByName('examCheck');
    for(var i = 0; i <dataTemp.length; i++){
      if(dataTemp[i].checked){
    	  	selectedTr = dataTemp[i].parentNode.parentNode;
	   	    if (selectedTr != null) {
	   	    	var startDate = new Date(selectedTr.cells[4].innerText);
	   	    	var nowDate = new Date();
	   	    	if(nowDate > startDate){
	   	    		showMsg('<'+selectedTr.cells[2].innerText +'>考试已生效，无法删除');
	   	    		$("#myDelModal").modal('hide');
	   	    		return;
	   	    	}
	   	    	
	   	    	var id = Number(selectedTr.cells[1].innerText);
	   	    	idsTemp.push(id);
	   	    	
	   	    }
	   	 
	   	    else {
	   	    	 alert("请选择一行");
	   	    }
      	}

     }
    var obj = {'examPlan':idsTemp};
	var strDate = JSON.stringify(obj);
//	console.log("tableAjax参数： "+strDate);
	$http.ajax({
		isModal : false,
        type: "POST",
        url: "jv/exam/del.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
        	data = JSON.parse(data);
        	if(data.error){
        		showMsg(data.error.message);
    			return;
        	}
        	
        	window.location.href="../views/examList.jsp";
            
        }
    });
    
    
}


