/**
 * Created by Administrator on 2016/7/11.
 */

	var nameErrMsg = "名称格式不正确";
	var nameRule = '/^.+$/g';
	
	var durationErrMsg = '时长必须是有效数字';
	var durationRule = '/^([1-9][0-9]*)|(0\.[0-9]*[1-9])|([1-9][0-9]*\.[0-9]*[1-9])$/';
	var timesRule = '/^[1-9][0-9]*$/';
	
	var lessonIntroductionErrMsg = "描述不能为空";
	/**
	 * 新增数据校验说明
	 */
	/**
	 * 新增考试数据校验说明
	 */
	var dataAddExam = {
			data : [
			          // name考试名称
			          {
			        	  id : 'name',
			        	  msg : nameErrMsg,
			        	  rule : nameRule,
			        	  checkFun : 'checkStr'
			          },
			          // examStart考试开始时间	examEnd考试结束时间
			          {
			        	  id : {
			        		  startId : 'examStart',
			        		  endId : 'examEnd'
			        	  },
			        	  msg : '时间不正确',
			        	  checkFun : 'checkDateCompare',
			        	  type : 'date'
			          },
			          // examDuration考试时长
			          {
			        	  id : 'examDuration',
			        	  msg : durationErrMsg,
			        	  rule : durationRule,
			        	  checkFun : 'checkStr'
			          },
			          // passScore分数
			          {
			        	  id : 'passScore',
			        	  msg : "分数必须是有效数字",
			        	  rule : durationRule,
			        	  checkFun : 'checkStr'
			          },
			          // exmaNum考试次数
			          {
			        	  id : 'exmaNum',
			        	  msg : "考试次数必须是有效次数",
			        	  rule : timesRule,
			        	  checkFun : 'checkStr'
			          },
			          // examNotice考试须知
			          {
			        	  id : 'examNotice',
			        	  msg : "考试须知不能为空",
			        	  checkFun : 'checkStr'
			          }
			]
	}

//modify by lyh 20160718
var pageIndex;
var totleNum = 0;
//每段的页码数量
var maxVisible = 10;


//选中的试卷 对象
var choosePaperId = 0;
var choosePaper = {};

//临时人员列表
var personTempData = [];

/* 创建table*/
function addTable(data,flag){
	switch(flag){
	case "paperList_tbody":
		
		$("#paperList_tbody").text("");
		var strTemp = "";
	    for(var i=0;i<data.data.length;i++){
			strTemp = strTemp + 
			"<tr><td><input type='radio' name='optionsRadios1' value='option1' /></td>" +
			"<td style='display:none'>"+data.data[i].id+"</td>" +
			"<td style='display:none'>"+data.data[i].mode+"</td>" +
			"<td style='display:none'>"+data.data[i].totle_score+"</td>" +
			"<td>"+data.data[i].name+"</td>" + 
			'<td class="center mylistSee"><span onclick="window.open(\'examPaperDetail.jsp?id=' + data.data[i].id + '\')" ' + (data.data[i].mode == 'Z' ? 'style="display:none"' : '') + '>预览试卷</span></td></tr>';
	    }
		$('#paperList_tbody').html('').html(strTemp);
	    
		break;
/*	case "notifyPerson_table":
		
		$("#notifyPerson_table").text("");
		var strTemp = "";
	    for(var i=0;i<data.length;i++){
			strTemp = strTemp + 
			"<tr  class='odd gradeX'><td><input type='checkbox' NAME='notifyPersonCheck' class='checkboxes' /></td>" +
			"<td>"+data[i].id+"</td>" +
			"<td>"+data[i].name+"</td>" +
			"<td class='hidden-480'>"+data[i].nodeName+"</td>" +
			"<td class='hidden-480 mylistSee'>删除</td></tr>";
	    }
		$('#notifyPerson_table').html('').html(strTemp);
	    
		break;*/
	
	}
	
    
	
}


/* Ajax  */
function tableAjax(page,maxVisible,bFlag,name,modelName,searchFlag){
	name = $.trim($("#searchExamPaperName").val());
	var obj = {'page':page,'size':maxVisible,'name':name};
	var strDate = JSON.stringify(obj);
	console.log("tableAjax参数： "+strDate);
	$http.ajax({
		isModal : false,
        type: "get",
        url: "jv/examPaper/listpassauditing.do",
        data: {
        	'start':page,
        	'size':maxVisible,
        	'name':name
        	},
        dataType: "json",
        success: function(data){
        	console.log(data);
        	data = JSON.parse(data);
        	
        	totleNum = data.totalNum;
        	
        	if(data.data.length <= 0){
        		totleNum = 0;
        	}
        	
            addTable(data,"paperList_tbody");
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

   
});
    

$(function() {
	  //清除弹框内容  
	 $(".clean-data").click(function(){
		 $(".Bomb-box").html("");
		 $(".Bomb-box").val("");
	 })

	 // 添加           
	$("#addPaperBtn").click(function(){
		   
        var dataTemp = document.getElementsByName('optionsRadios1');
	    for(var i = 0; i <dataTemp.length; i++){
	      if(dataTemp[i].checked){
	    	  selectedTr = dataTemp[i].parentNode.parentNode;
	     	    if (selectedTr != null) {
	     	    	var tempData = {};
	     	    	
	     	    	choosePaperId = Number(selectedTr.cells[1].innerText);
	     	    	choosePaper.mode = selectedTr.cells[2].innerText;
	     	        
	     	    	 $("#choosePaperName").val(selectedTr.cells[4].innerText); 
	     	    	 $("#choosePaperScroe").val(selectedTr.cells[3].innerText); 
	     	    	
	     			//courseDataTemp.push(tempData);
	     	    }
	     	    else {
	     	    	 showMsg("请选择一行");
	     	    }
	      	}
	     }
		
		$('#myeaModal').modal('hide');
	})
	
	
		 //baocun fenzu
	  $("#saveGroupBtn").click(function(){
		  var groupName = $.trim($("#groupName").val());
		  if(groupName == ""){
			  showMsg("请输入分组名称");
		  }
		  var personIds = getNotifyPersonTableData;
/*		  var ids = "";
		  for(var i=0;i<personIds.length;i++){
			  ids += personIds[i].value;
		  }*/
		  saveGroup(groupName,personIds);
	    $('#myGroupingModal').modal('hide');
	 })
	 
	 
		 // 添加           
 	$("#addPersonBtn").click(function(){
 		
 		var dataTemp = getAddPersonTableData();
 		console.log(dataTemp);
 		
 		addPersonTable(dataTemp,"notifyPerson_table");
 		
 		$('#myamModal').modal('hide');
	})
	
});



/*点击选择试卷按钮*/

function cPaper(obj) {
    tableAjax(1,maxVisible,true,"","examPaperList",false);
}
/**
 * 试卷搜索
 */
function searchPaper(obj) {
	//showMsg("dsaddf");
	var searchExamPaperName = $.trim($("#searchExamPaperName").val());
	tableAjax(1,maxVisible,true,searchExamPaperName,"examPaperList",true);
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
/*	console.log("输出tableDataTemp");
	console.log(JSON.stringify(tableDataTemp));
	console.log("end");*/
	//showMsg("ss");
	return tableDataTemp;	
}


//获取当前通知方式
function getNotifyTypeData(){

	 var tableDataTemp = [];
	 
	 var dataTemp = document.getElementsByName('notifyType');
	    for(var i = 0; i < dataTemp.length; i++){
	    	var type = dataTemp[i].value;
	    	tableDataTemp.push(type);
	     }
/*	console.log("输出tableDataTemp");
	console.log(JSON.stringify(tableDataTemp));
	console.log("end");*/
	return tableDataTemp;	
}





/*点击选择试卷按钮*/

function saveExam(obj) {
	var name= $.trim($("#name").val());
	var examStart= $.trim($("#examStart").val());
	var examEnd= $.trim($("#examEnd").val());
	var examClassifications= $.trim($("#examClassifications").val());
	var examType= $.trim($("#examType").val());
	var passScore= $.trim($("#passScore").val());
	var exmaNum= $.trim($("#exmaNum").val());
	var paperMode= $.trim($("#paper_mode").val());
	var randomOrder= $("#randomOrder:checked").val() || 'N';
	var totleScore= $.trim($("#choosePaperScroe").val());
	var examNotice= $.trim($("#examNotice").val());
	
	var duration= $.trim($("#examDuration").val());
	var examPaper = choosePaperId;
	
	if(choosePaperId == 0){
		showMsg('请选择考试试卷');
		return;
	}
	
	// 调用数据校验
	var isPass = checkData(dataAddExam);
	// 判断校验是否成功
	if(!isPass){
		return;
	}
	
	
	if("O" != paperMode ){
		paper_mode = "F";
	}
	
	
	var examAnswerPublish = {
		mode : $("#examAnswerPublish").val(),
		delayDuration : $("#myDelayed input[type=text]:visible").val() || ''
	};
	//当前课时表中的数据
	var students = getNotifyPersonTableData();
	if(students.length <= 0){
		showMsg("请选择人员");
		return false;
	}
	
	var examData = {};
	
	//填写考试
	examData.name = name;
	examData.examStart = examStart;
	examData.students = students;
	examData.randomOrder = randomOrder;
	examData.examAnswerPublish = examAnswerPublish;
	examData.examEnd = examEnd;
	examData.examClassifications = examClassifications;
	examData.examType = examType;
	examData.passScore = Number(passScore);
	examData.paperMode = paperMode;
	examData.examNum = Number(exmaNum);
	examData.examNotice = examNotice;
	examData.examPaper = examPaper;
	examData.examPaperContent = choosePaper;

	examData.duration = Number(duration);
	var strDate = JSON.stringify(examData);

	$http.ajax({
		isModal : false,
        type: "POST",
        url: "jv/exam/add.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
        	var notifyMode = getNotifyTypeData();
        	if(notifyMode.length > 0){
            	var title= "考试通知";
            	var content= "您需要参加  " + examData.name  + " ,请你按时参加";
            	console.log("考试通知参数： title+"+title +"  content:" + content+"  receiver:" + students +"examList.jsp");
            	notifyPerson(notifyMode,title,content,students,"examList.jsp");
        	}
        	else{
        		window.location.href="examList.jsp";
        	}

        }
    });
    
}




/*得到选中的值*/
function modify(obj) {
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
        //console.log("selectedTr不为NULL");
        //console.log(selectedTr.rowIndex);
        //console.log(selectedTr.cells[1].innerText); //获取的方法一 
        var id = selectedTr.cells[1].innerText;
        //window.location.href="jv/course/detail.do?id="+id;
    }
    else {
        showMsg("请选择一行");
    }
    window.location.href="views/examUpdate.jsp";
}


function getsystyemparameter(){
	$.ajax({
		isModal : false,
        type: "GET",
        url: "jv/systemparameter/listValueavatar.do",
        dataType: "json",
        success: function(data){
        	
        	$("#passScore").val(data.score);
        	$("#examDuration").val(data.examMin);
        	if( data.randomOrder== "Y"){
        		$("#randomOrder").attr("checked",true);
        		$("#uniform-randomOrder").addClass("checker focus");
        		$("#uniform-randomOrder").children().addClass("checked");
        	}
        	
        }
    });
	
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
/*成绩发布*/
var myDelayed = document.getElementById("myDelayed");
var examAnswerPublish = document.getElementById("examAnswerPublish");
examAnswerPublish.onchange = function (){
	var val = this.value;
	if(val == "delay"){
		 myDelayed.style.display = "block";
	}else{
		myDelayed.style.display = "none";
	}
}
getsystyemparameter()