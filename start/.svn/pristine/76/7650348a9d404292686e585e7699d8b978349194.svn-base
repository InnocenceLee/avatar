/**
 * Created by lyh on 2016/7/11.
 */

//modify by lyh 20160718
var pageIndex;
var totleNum = 0;
//每段的页码数量
var maxVisible = 20;





/* 创建table*/
function addTable(data){
	$("#staffCourseList_tbody").text("");
	var strTemp = "";
	var learnStr = "<td  class='myStudy' ><span onclick='study(this)' >进入课程 </span></td>";
	var learnStrTemp = ""; 
	// 学习进度
	var learnAvg = '0%';
    for(var i=0;i<data.length;i++){
    	//检查学习状态 如果是已完成 则不显示前往学习
//    	if(!data[i].name) continue;
    	/*if(data[i].isReady4Course){
    		learnStrTemp = learnStr;
    	} else {
    		learnStrTemp = "<td  class='myStudy' ><span ></span></td>";
    	}*/
    	learnStrTemp = learnStr;
    	if(data[i].sumLesson > 0){
    		learnAvg = ((data[i].sumPassLesson/data[i].sumLesson)*100).toFixed(2)+'%';
    	} else {
    		learnAvg = '0%';
    	}
    	
    	
    	switch(data[i].state){
    	case "R":
    	case "L":
    	case "O":
    	case "N":
    	case "A":
    		strTemp = strTemp + 
    		"<tr class='odd gradeX'><td style='display:none'>"+data[i].id+"</td>" +
    		"<td style='display:none'>"+data[i].courseId +"</td>" +
    		"<td style='display:none'>"+data[i].planStart+"</td>" +
    		"<td style='display:none'>"+data[i].planEnd+"</td>" +
    		"<td>"+(data[i].name || '')+"</td>" +
    		"<td>"+(data[i].trainTypeName || '')+"</td>" +
    		"<td>"+data[i].sumPassLesson+ "</td>" +
    		"<td>"+data[i].sumLesson+ "</td>" +
    		"<td>"+learnAvg+"</td>" +
    		//"<td >"+data[i].sumTrain+"分钟</td>" +
    		"<td>"+data[i].stateName+"</td>" +
    		"<td style='display:none'>"+data[i].isReady4Course+"</td>" +
    		"<td style='display:none'>"+data[i].msg+"</td>" +
    		learnStrTemp + '</tr>';
    		break;
//    	case "O":
//    	case "N":
//    		strTemp = strTemp + 
//    		"<tr class='odd gradeX'><td style='display:none'>"+data[i].id+"</td>" +
//    		"<td style='display:none'>"+data[i].courseId+"</td>" +
//    		"<td style='display:none'>"+data[i].planStart+"</td>" +
//    		"<td style='display:none'>"+data[i].planEnd+"</td>" +
//    		"<td>"+data[i].name+"</td>" +
//    		"<td>"+data[i].trainTypeName+"</td>" +
//    		"<td>"+data[i].sumPassLesson+ "</td>" +
//    		"<td>"+data[i].sumLesson+ "</td>" +
//    		"<td>"+learnAvg+"</td>" +
//    		"<td >"+data[i].sumTrain+"分钟</td>" +
//    		"<td>"+data[i].stateName+"</td>" +
//    		"<td  class='myStudy' ><span onclick='' >立即评价 </span></td></tr>";
//    		break;
//    	case "A":
//    		strTemp = strTemp + 
//    		"<tr class='odd gradeX'><td style='display:none'>"+data[i].id+"</td>" +
//    		"<td style='display:none'>"+data[i].courseId+"</td>" +
//    		"<td style='display:none'>"+data[i].planStart+"</td>" +
//    		"<td style='display:none'>"+data[i].planEnd+"</td>" +
//    		"<td>"+data[i].name+"</td>" +
//    		"<td>"+data[i].trainTypeName+"</td>" +
//    		"<td>"+data[i].sumPassLesson+ "</td>" +
//    		"<td>"+data[i].sumLesson+ "</td>" +
//    		"<td>"+learnAvg+"</td>" +
//    		"<td >"+data[i].sumTrain+"分钟</td>" +
//    		"<td>"+data[i].stateName+"</td>" +
//    		"<td  class='myStudy' >已评价 </td></tr>";
//    		break;
		default:
			break;
    	}
		
    }
	var tbody=document.getElementById("staffCourseList_tbody");
	$("#staffCourseList_tbody").html(strTemp);
}

//转换数据
function readData(data){
	if(data.length == 0){
		totleNum = 0;
	}
	var Data = [];
	for(var i=0;i<data.length;i++){
		var item = data[i];
		if(item!=undefined){
			
			if(item.totleNum != undefined/*rid*/){
				totleNum = item.totleNum;
				
			}
			
			var tempData = {};
			tempData.sumPassLesson = item.sumPassLesson;
			tempData.trainType = item.trainType;
			tempData.name = item.name;
			tempData.id = item.id;
			tempData.state = item.state;
			tempData.sumLesson = item.sumLesson;
			tempData.sumTrain = item.sumTrain;
			tempData.courseId = item.courseId;
			tempData.planStart = item.planStart;
			tempData.planEnd = item.planEnd;
			tempData.lessonClassifications = item.lessonClassifications;
			tempData.isReady4Course = item.isReady4Course;
			tempData.msg = item.msg;
			
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
			
			if(item.sumLesson > item.sumPassLesson){
				if(item.sumPassLesson == 0)
					tempData.stateName = "就绪";
				else
					tempData.stateName = "学习中";
			}else{
				switch(item.state)
				{
				case "R":
					tempData.stateName = "就绪";
					break;
				case "L":
					tempData.stateName = "学习中";
					break;
				case "O":
					tempData.stateName = "完成";
					break;
				case "E":
					tempData.stateName = "错误";
					break;
				case "N":
					tempData.stateName = "未评价";
					break;
				case "A":
					tempData.stateName = "已评价";
					break;
				default:
					break;
				}
			}
			Data.push(tempData);
		}
	}
/*	console.log("输出data");
	console.log(JSON.stringify(Data));
	console.log("end");*/
	return Data;	
}


/*根据登陆人员ID获取列表 */
function tableAjax(page,maxVisible,bFlag,name,modelName,searchFlag){
	name = $.trim($("#searchName").val());
	var obj = {'page':page,'size':maxVisible,'name':name};
	var strDate = JSON.stringify(obj);
//	console.log("tableAjax参数： "+strDate);
    $.ajax({
        type: "get",
        url: "jv/course/liststudent.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
//        	console.log(data);
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
    

    //end
    tableAjax(1,maxVisible,true,"","staffCourseList",false);
   
});
    



/*搜索*/
function search(obj) {
	var searchName = $.trim($("#searchName").val());
//	if((searchName == "")){
//		alert("请填写搜索条件");
//		return false;
//		}
	
	tableAjax(1,maxVisible,true,searchName,"staffCourseList",true);
}



/*学习*/
function study(obj) {
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
        //console.log("selectedTr不为NULL");
        //console.log(selectedTr.rowIndex);
        //console.log(selectedTr.cells[1].innerText); //获取的方法一 
        var id = selectedTr.cells[0].innerText;
        var courseId = selectedTr.cells[1].innerText;
        var start = selectedTr.cells[2].innerText;
        var end = selectedTr.cells[3].innerText;
        var str = start + " ~ "+end;
        var isReady = selectedTr.cells[10].innerText;
        if(isReady == "false"){
        	showMsg(selectedTr.cells[11].innerText);
        	return;
        }
        
        window.location.href="../jv/course/detailstudent.do?id="+courseId + 
        "&trainStudentLearnCourseId="+id +"&learnDate="+str;
    }
    else {
        alert("请选择一行");
    }
}

