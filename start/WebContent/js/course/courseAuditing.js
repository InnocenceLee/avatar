/**
 * Created by Administrator on 2016/7/11.
 */

//modify by lyh 20160718
var pageIndex;
var totleNum = 0;
//每段的页码数量
var maxVisible = 20;

//临时 审核日志
var logDataItems ={};


/*状态信息选项卡*/
var myCabtn1 = document.getElementById("myCabtn1");
var myCabtn2 = document.getElementById("myCabtn2");
var myCabtn3 = document.getElementById("myCabtn3");
var myCabtn4 = document.getElementById("myCabtn4");
var myCarow1 =document.getElementById("myCarow1");
var myCarow2 =document.getElementById("myCarow2");
var myCarow3 =document.getElementById("myCarow3");
var myCarow4 =document.getElementById("myCarow4");


/* 创建table*/
function addTable(data,flag){
	switch(flag){
	case "courseAuditing":
		
		$("#courseAuditing_tbody").text("");
		$("#unAuditing_tbody").text("");
		$("#auditing_tbody").text("");
		$("#offAuditing_tbody").text("");
		
		var strTemp = "";
	    for(var i=0;i<data.length;i++){
	    	if(("未审核" == data[i].stateName)||('拒绝' == data[i].stateName)){
	    		strTemp = strTemp + 
	    		"<tr><td><span></span></td>" +
	    		"<td style='display:none' >"+data[i].id+"</td>" +
	    		"<td>"+data[i].name+"</td>" +
	    		"<td class='hidden-480'>"+data[i].trainTypeName+"</td>" +
	    		"<td class='center hidden-480'>"+data[i].createdate+"</td>" +
	    		"<td class='hidden-480'>"+data[i].stateName+"</td>" +
	    		"<td onclick='auditing(this)' class='mycaExamine' data-toggle='modal' data-target='#responsive' >审核</td></tr>";
	    	}
	    	else {
	    		strTemp = strTemp + 
	    		"<tr><td><span></span></td>" +
	    		"<td style='display:none' >"+data[i].id+"</td>" +
	    		"<td>"+data[i].name+"</td>" +
	    		"<td class='hidden-480'>"+data[i].trainTypeName+"</td>" +
	    		"<td class='center hidden-480'>"+data[i].createdate+"</td>" +
	    		"<td class='hidden-480'>"+data[i].stateName+"</td>" +
	    		"<td>已审核</td></tr>";
	    	}

	    }
		$('#courseAuditing_tbody').html('').html(strTemp);

		$('#unAuditing_tbody').html('').html(strTemp);

		$('#auditing_tbody').html('').html(strTemp);

		$('#offAuditing_tbody').html('').html(strTemp);
	    
		break;
	default:
		
		$("#lessonList_tbody").text("");
		var strTemp = "";
	    for(var i=0;i<data.length;i++){
	    	num = i+1;
			strTemp = strTemp + 
			"<tr class='odd gradeX'>" +
			"<td style='display:none'>"+data[i].id+"</td>" +
			"<td>"+checkUndifend(data[i].name)+"</td>" +
			"<td>"+checkUndifend(data[i].typeName)+"</td>" +
			"<td>"+checkUndifend(data[i].introduction)+"</td>"  +
			"<td><span class='mycaExamine' onclick='viewDetail(this)'> 查看 </span></td></tr>";
	    }
		$('#lessonList_tbody').html('').html(strTemp);

		break;
	}
	
    
}

//转换数据
function readData(data,flag){
	var Data = [];
	if(data.length == 0){
		totleNum = 0;
	}
	if("courseAuditing" == flag){
		for(var i=0;i<data.length;i++){
			var item = data[i];
			if(item!=undefined){
				if(item.totleNum != undefined/*rid*/){
					totleNum = item.totleNum;
				}
				
				var tempData = {};
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
	}
	else{
		for(var i=0;i<data.length;i++){
			var item = data[i];
			if(item!=undefined){
				
				if(item.totleNum != undefined/*rid*/){
					totleNum = item.totleNum;
					
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
	}

/*	console.log("输出data");
	console.log(JSON.stringify(Data));
	console.log("end");*/
	return Data;	
}


/* 列表Ajax  */
function tableAjax(page,maxVisible,bFlag,name,stateOne,modelName,searchFlag){
	name = $.trim($("#searchName").val());
	var obj = {'page':page,'size':maxVisible,'name':name,'state':state};
	var strDate = JSON.stringify(obj);
//	console.log("tableAjax参数： "+strDate);
    $.ajax({
        type: "get",
        url: "jv/course/listauditing.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
        	console.log("页面数据："+data);
        	data = JSON.parse(data);
        	tableData = readData(data,modelName);
            addTable(tableData,modelName);
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
			    	 state:state,
			    	 modelName:modelName,
			    	 maxVisible:maxVisible
   	 	        }); 
            }
            
        }
    });
   
}


//课时列表





/* Ajax  */
function lessonTableAjax(page,maxVisible,modelName,bFlag,id,searchFlag){
	var obj = {'page':page,'size':maxVisible,'id':id};
	var strDate = JSON.stringify(obj);
	console.log("lessonTableAjax参数： "+strDate);
	
    $.ajax({
        type: "get",
        url: "jv/lesson/list.do",
        data: {
       	 'data' : strDate
        },
        dataType: "json",
        success: function(data){
        	console.log(data);
        	data = JSON.parse(data);
        	var tableData = readData(data,modelName);
        	
//        	console.log("lessonTableAjax:"+JSON.stringify(tableData));
        	
            addTable(tableData,modelName);
            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
            if(searchFlag){
            	$t.using('tableAjax').reset(totleNum);
            } else if(bFlag){
        	    /* 分页   */
    	        /*使用方法*/
                $t.using('table2Ajax').init({
			    	 maxPage:totleNum,
			    	 modelName:modelName,
			    	 id:id,
			    	 maxVisible:maxVisible
		            
   	 	        }); 
            }
            
        }
    });
}


function detailAuditingAjax(id){
	console.log("detailAuditingAjax参数： "+id);
	
    $.ajax({
        type: "get",
        url: "jv/course/detailauditing.do",
        data: {
       	 'id' : id
        },
        dataType: "json",
        success: function(data){
        	console.log("detailauditing返回值 :" + data);
        	data = JSON.parse(data);
        	//var tableData = readData(data,modelName);
        	
            $("#auditingId").val(data.id);
            $("#auditingName").html("课程名称：" + data.name); 
            $("#auditingType").html("课程类型：" + data.trainTypeName); 
            $("#auditinglessonClassificationsName").html("课程类别：" + data.lessonClassificationsName); 
            $("#auditingPre").html("前置课程：" + (data.preCoursesName || '无')); 
            $("#knowledgePointName").html("&#12288;知识点：" +data.knowledgePointName);
            $("#introduction").html("课程描述：" + data.introduction);
            
            
            var logData = JSON.parse(data.trainLog.value);
            logDataItems = logData.data;
    		var strTemp = "";
    		console.log(logDataItems);
    	    for(var i=0;i<logDataItems.length;i++){
    	    	var item = logDataItems[i];
    			strTemp +=
    			"<p class='span10'>" +
    			    "<span>"+(item.date || '')+"</span>" +
	    			"<span>原因："+ item.comment + "</span>" +
    			"</p>";
    	    }
    		$("#logItems_body").html(strTemp);
    	
    	    
    	    
        }
    });
}



$(document).ready(function(){
    App.init();	
    tableAjax(1,maxVisible,true,"","","courseAuditing",false);
    
});
    


/*切换*/
var state = null;
function tabChange(obj) {
	switch(obj){
	case "all":
		state = "";
		myCarow1.style.display = "block";
		myCarow2.style.display = "none";
		myCarow3.style.display = "none";
		myCarow4.style.display = "none";
		myCabtn1.style.backgroundColor = "#4D90FE";
		myCabtn2.style.backgroundColor = "#ffffff";
		myCabtn3.style.backgroundColor = "#ffffff";
		myCabtn4.style.backgroundColor = "#ffffff";
		myCabtn1.style.color = "#ffffff";
		myCabtn2.style.color = "#343941";
		myCabtn3.style.color = "#343941";
		myCabtn4.style.color = "#343941";
	break;
	case "N":
		state = "N";
		myCarow1.style.display = "none";
		myCarow2.style.display = "block";
		myCarow3.style.display = "none";
		myCarow4.style.display = "none";
		myCabtn1.style.backgroundColor = "#ffffff";
		myCabtn2.style.backgroundColor = "#4D90FE";
		myCabtn3.style.backgroundColor = "#ffffff";
		myCabtn4.style.backgroundColor = "#ffffff";
		myCabtn1.style.color = "#343941";
		myCabtn2.style.color = "#ffffff";
		myCabtn3.style.color = "#343941";
		myCabtn4.style.color = "#343941";
		break;
	case "A":
		state = "A";
		myCarow1.style.display = "none";
		myCarow2.style.display = "none";
		myCarow3.style.display = "block";
		myCarow4.style.display = "none";
		myCabtn1.style.backgroundColor = "#ffffff";
		myCabtn2.style.backgroundColor = "#ffffff";
		myCabtn3.style.backgroundColor = "#4D90FE";
		myCabtn4.style.backgroundColor = "#ffffff";
		myCabtn1.style.color = "#343941";
		myCabtn2.style.color = "#343941";
		myCabtn3.style.color = "#ffffff";
		myCabtn4.style.color = "#343941";
		break;
	case "J":
		state = "J";
		myCarow1.style.display = "none";
		myCarow2.style.display = "none";
		myCarow3.style.display = "none";
		myCarow4.style.display = "block";
		myCabtn1.style.backgroundColor = "#ffffff";
		myCabtn2.style.backgroundColor = "#ffffff";
		myCabtn3.style.backgroundColor = "#ffffff";
		myCabtn4.style.backgroundColor = "#4D90FE";
		myCabtn1.style.color = "#343941";
		myCabtn2.style.color = "#343941";
		myCabtn3.style.color = "#343941";
		myCabtn4.style.color = "#ffffff";
		break;
	}
	tableAjax(1,maxVisible,true,"",state,"courseAuditing",false);
}

/*搜索*/
function search(obj) {
	var searchName = $.trim($("#searchName").val());
	tableAjax(1,maxVisible,true,searchName,"","courseAuditing",true);
}


/*点击审核*/
function auditing(obj) {
	//console.log(obj);
    selectedTr = obj.parentNode;
    console.log(selectedTr);
    if (selectedTr != null) {
        //console.log("selectedTr不为NULL");
        //console.log(selectedTr.rowIndex);
        //console.log(selectedTr.cells[1].innerText); //获取的方法一 
        var id = Number(selectedTr.cells[1].innerText);
        
        lessonTableAjax(1,maxVisible,"courseDetailList",true,id)
        
        
        detailAuditingAjax(id);
        
    }
    else {
        alert("请选择一行");
    }
}

/*查看详情*/
function viewDetail(obj) {
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
        //console.log("selectedTr不为NULL");
        //console.log(selectedTr.rowIndex);
        //console.log(selectedTr.cells[1].innerText); //获取的方法一 
        var id = selectedTr.cells[0].innerText;
        //alert(id);
        window.open("jv/lesson/lessonbi.do?id="+id);
    }
    else {
        alert("请选择一行");
    }
}



/*查看详情*/
function saveAuditing(obj) {
	var id = $.trim($("#auditingId").val());
	//var auditingAdvice = $.trim($("#auditingAdvice").val());
	var auditingRemark = $.trim($("#auditingRemark").val());
	
	var log = {};
	var data = [];
	var item = {};
	
	item.comment = auditingRemark;
	data.push(item);
	
	log.data = data;
	
	var obj = {'id':Number(id),'trainLog':log,'state':'A'};
	var strDate = JSON.stringify(obj);
	console.log("tableAjax参数： "+strDate);
	
	$.ajax({
        type: "POST",
        url: "jv/course/updateauditing.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
        	console.log(data);
        	window.location.href="../views/courseAuditing.jsp";
        }
    });
	
}


/*查看详情*/
function unAuditing(obj) {
	var id = $.trim($("#auditingId").val());
	//var auditingAdvice = $.trim($("#auditingAdvice").val());
	var auditingRemark = $.trim($("#auditingRemark").val());
	
	var log = {};
	var data = [];
	var item = {};
	
	item.comment =  auditingRemark;
	data.push(item);
	
	log.data = data;
	
	var obj = {'id':Number(id),'trainLog':log,'state':'J'};
	var strDate = JSON.stringify(obj);
	console.log("tableAjax参数： "+strDate);
	
	$.ajax({
        type: "POST",
        url: "jv/course/updateauditing.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
        	console.log(data);
        	window.location.href="../views/courseAuditing.jsp";
        }
    });
	
}