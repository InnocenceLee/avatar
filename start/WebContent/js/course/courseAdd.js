/**
 * Created by Administrator on 2016/7/11.
 */
	var lessonsList=new Array();//用于保存当前课时的列表
	var lessonNameErrMsg = "名称格式不正确，且长度为1到20个字符";
	var lessonNameRule = '/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{1,20}$/g';
	
	var durationErrMsg = '时长必须是有效数字';
	var durationRule = '/^[1-9][0-9]*$/g';
	
	var lessonIntroductionErrMsg = "描述不能大于1500字符";
	var lessonRule = '/^.{0,1500}$/mg';
	
	var coursewareFilenameErrMsg = "请选择课件";
	
	var idleDurationErrMsg = '防挂机时长格式不正确，必须为数字';
	var idleDurationRule = '/^([1-9][0-9]*)|(0\.[0-9]*[1-9])|([1-9][0-9]*\.[0-9]*[1-9])$/'; 
	/**
	 * 新增课时数据校验说明
	 */
	var dataAddLesson = {
			data : [
			          // lessonName课时名称
			          {
			        	  id : 'lessonName',
			        	  msg : lessonNameErrMsg,
			        	  rule : lessonNameRule,
			        	  checkFun : 'checkStr'
			          },
			          // duration课时时长
			          {
			        	  id : 'duration',
			        	  msg : durationErrMsg,
			        	  rule : durationRule,
			        	  checkFun : 'checkStr'
			          },
			          // lessonIntroduction课时描述
			          {
			        	  id : 'lessonIntroduction',
			        	  msg : lessonIntroductionErrMsg,
			        	  rule : lessonRule,
			        	  canNull : true,
			        	  checkFun : 'checkStr'
			          },
			          // coursewareFilename课件
			          {
			        	  id : 'coursewareFilename',
			        	  msg : coursewareFilenameErrMsg,
			        	  checkFun : 'checkStr'
			          }
			         
			]
	}
	
	
	/**
	 * 新增考试数据校验说明
	 */
	var dataAddExam = {
			data : [
			          // examName考试名称
			          {
			        	  id : 'examName',
			        	  msg : lessonNameErrMsg,
			        	  rule : lessonNameRule,
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
			          // examPassScore分数
			          {
			        	  id : 'examPassScore',
			        	  msg : "分数必须是数字",
			        	  rule : durationRule,
			        	  checkFun : 'checkStr'
			          },
			          // exmaNum考试次数
			          {
			        	  id : 'exmaNum',
			        	  msg : "考试次数必须是数字",
			        	  rule : durationRule,
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
	
	/**
	 * 新增课程数据校验说明
	 */
	var dataCourse = {
			data : [
			          // courseName课程名称
			          {
			        	  id : 'courseName',
			        	  msg : lessonNameErrMsg,
			        	  rule : lessonNameRule,
			        	  checkFun : 'checkStr'
			          },{
			        	  id : 'klName',
			        	  msg : '知识点不能为空',
			        	  rule : '/.+/g',
			        	  checkFun : 'checkStr'
			          },
			          // introduction课时描述
			          {
			        	  id : 'introduction',
			        	  msg : lessonIntroductionErrMsg,
			        	  rule : lessonRule,
			        	  canNull : true,
			        	  checkFun : 'checkStr'
			          }
			]
	}



//modify by lyh 20160718
var pageIndex;
var totleNum = 0;
//每段的页码数量
var maxVisible = 20;

//课程对象总
var submitData = {};
//课程对象
var courseData = {};
//课程记录
var trainLog = {};
//课时挂机对象
var avoidIdle = {};
//课时序号
var sequence = 1;



//树
var zTree;
var demoIframe;
var zNodes;



function cleanCheck(){
	
	var collid = document.getElementsByName('all');
	var coll = document.getElementsByName('preCheck');
	collid.checked  = false;
//	console.log(collid);

   for(var i = 0; i < coll.length; i++){
	     coll[i].checked = false;
   }
}

/* 创建课时临时table*/
function addTable(data,flag){
	switch(flag){
	case "lesson":
		$("#addLesson_tbody").text("");
		var strTemp = "";
	    for(var i=0;i<data.length;i++){
			strTemp = strTemp + 
			"<tr><td><input type='checkbox' name='lessonCheck' class='checkboxes' value='1' /></td>" +
			"<td style='display:none;'>"+checkUndifend(data[i].courseware.filename)+"</td>" +
			"<td style='display:none;'>"+checkUndifend(data[i].jionSystem)+"</td>" +
			"<td style='display:none;'>"+checkUndifend(data[i].dragFlag)+"</td>" +
			"<td style='display:none;'>"+checkUndifend(data[i].type)+"</td>" +
			"<td style='display:none;'>"+checkUndifend(data[i].avoidIdle.avoid)+"</td>" +
			"<td style='display:none;' class='sequence'>"+data[i].sequence+"</td>" +
			"<td style='display:none;'>"+data[i].duration+"</td>" +
			"<td>"+data[i].name+"</td>" +
			"<td>"+data[i].courseTypeName+"</td>" +
			"<td class='hidden-480'><span class='myToolong'>"+checkUndifend(data[i].introduction)+"</span></td>" +
			"<td style='display:none;'>"+checkUndifend(data[i].examPaper)+"</td>" +
			"<td style='display:none;'>"+checkUndifend(data[i].avoidIdle.idleDuration)+"</td>" +
			"<td class='center hidden-480' ><span class='sort1 up-move' onclick='moveup("+data[i].Index+")' >上移</span>" +
			"&nbsp;&nbsp;&nbsp;&nbsp;<span class='sort2 down-move' onclick='movedown("+data[i].Index+")'>下移</span></td></tr>";
	    }
	    $("#addLesson_tbody").html(strTemp);

	    break;
	case "examPaperList":
		
		$("#paper_table").text("");
		var strTemp = "";
	    for(var i=0;i<data.length;i++){
			strTemp = strTemp + 
			"<tr><td><input type='radio' name='paperRadio'  value='1' /></td>" +
			"<td style='display:none;'>"+data[i].id+"</td>" +
			"<td style='display:none;'>"+data[i].totle_score+"</td>" +
			"<td style='display:none;'>"+data[i].mode+"</td>" +
			"<td >"+data[i].name+"</td></tr>" 
	    }
	    $("#paper_table").html(strTemp);
		break;
	}
	
}



/* 创建前置课程table*/
function addPreTable(data){
	$("#courseAddList_tbody").text("");
	var strTemp = "";
    for(var i=0;i<data.length;i++){
		strTemp = strTemp + "<tr  class='odd gradeX'><td><input type='checkbox' NAME='preCheck' class='checkboxes' /></td><td style='display:none;'>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].trainTypeName+"</td><td>"+data[i].createdate+"</td></tr>";
    }
    $("#courseAddList_tbody").html(strTemp);
}

function moveup(index){
	if(lessonsList.length<=1){
		return;
	}
	for(var i=0;i<lessonsList.length;i++){
		if(lessonsList[i].Index == index){
			if(i==0){
				break;
			}else{
				var temLess = lessonsList[i];
				lessonsList[i] = lessonsList[i-1];
				lessonsList[i-1]=temLess;
				break;
			}
		}
	}
	addTable(lessonsList,"lesson");
}
function movedown(index){
	if(lessonsList.length<=1){
		return;
	}
	for(var i=0;i<lessonsList.length;i++){
		if(lessonsList[i].Index == index){
			if(i==lessonsList.length-1){
				break;
			}else{
				var temLess = lessonsList[i];
				lessonsList[i] = lessonsList[i+1];
				lessonsList[i+1]=temLess;
				break;
			}
		}
	}
	addTable(lessonsList,"lesson");
}


//转换数据
function readData(data){
	if(data.length <= 0){
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
			tempData.node = item.node;
			tempData.trainType = item.trainType;
			tempData.name = item.name;
			tempData.id = item.id;
			tempData.state = item.state;
			//tempData.createdate = getLocalTime(item.createdate);
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
/*	console.log("输出data");
	console.log(JSON.stringify(Data));
	console.log("end");*/
	return Data;	
}


/* Ajax  */
function tableAjax(page,maxVisible,bFlag,name,node,state,modelName,searchFlag){
	name = $.trim($("#searchName").val());
	var obj = {'page':page,'size':maxVisible,'name':name,'node':node,'state':state};
	var strDate = JSON.stringify(obj);
	switch(modelName){
	case "courseList":
		
//			console.log("tableAjax参数： "+strDate);
		$http.ajax({
			    isModal : true,
		        type: "get",
		        url: "jv/course/list.do",
		        data: {'data':strDate},
		        dataType: "json",
		        success: function(data){
//		        	console.log(data);
		        	data = JSON.parse(data);
		        	tableData = readData(data);
		        	addPreTable(tableData);
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
					    	 modelName:modelName,
					    	 name:name,
					    	 node:node,
					    	 state:state,
					    	 maxVisible:maxVisible
		   	 	        }); 
	            	}
		        }
		    });
		break;
		
//	case "examPaperList":
//		  $.ajax({
//		        type: "get",
//		        url: "jv/examPaper/listpassauditing.do",
//		        data: {
//		        	'start':page,
//		        	'size':maxVisible,
//		        	'name':name
//		        	},
//		        dataType: "json",
//		        success: function(data){
//		        	console.log(data);
//		        	data = JSON.parse(data);
//		            addTable(data.data,"examPaperList");
//		            if(data.length == 0 ){
//		            	totleNum = 0;
//		            }else{
//		            	totleNum = data.totalNum;
//		            }
//		            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
//		            if(searchFlag){
//		            	$t.using('tableAjax').reset(totleNum);
//		            } else if(bFlag){
//		            	//UIGeneral.init(page,totleNum,maxVisible,modelName);
//		            	
//		        	    /* 分页   */
//		    	        /*使用方法*/
//		                $t.using('tableAjax').init({
//					    	 maxPage:totleNum,
//					    	 name:name,
//					    	 node:node,
//					    	 state:state,
//					    	 modelName:modelName,
//					    	 maxVisible:maxVisible
//				            
//		   	 	        }); 
//
//		            }
//		            
//		        }
//		    });
		   
	}

}

//上传主程序
//function uploadfile(id) {
//	var form ;
//	if(coursewareModifyUpload==id){
//		form = $("#coursewareModifyUpload");
//		}
//	else{
//		form = $("#coursewareUpload");
//	}
//    
//    form.ajaxSubmit({
//        success: function (data) {
//        	data = JSON.parse(data);
//        	if(data.state == 0){
//        		showMsg("上传课件失败！");
//        		return;
//        	}else if(data.state == -1){
//        		showMsg("上传失败,请上传zip格式压缩文件！");
//        		return;
//        	}
//            //文件上传成功，返回图片的路径。将路经赋给隐藏域
//        	if(coursewareModifyUpload==id){
//        		$("#modifyCoursewareFilename").val(data.showName);
//        		$("#modifyCoursewareFilename").data("t",data.fileName);
//        	}else{
//        		$("#coursewareFilename").val(data.showName);
//        		$("#coursewareFilename").data("t",data.fileName);
//        	}
//        }
//    });
//}



//获取当前列表中的数据  返回lesson对象
function getTableData(){

	 var lessonDataTemp = [];
		var dataTemp = document.getElementsByName('lessonCheck');
	    for(var i = 0; i < dataTemp.length; i++){
	     	 var selectedTr = dataTemp[i].parentNode.parentNode;
	     	    if (selectedTr != null) {
	     	    	var tempData = {};
	     	    	var tempWare = {};
	     	    	var tempavoidIdle = {};
	     	    	
	     	        tempWare.filename = selectedTr.cells[1].innerText;
	     			
	     			tempData.jionSystem = selectedTr.cells[2].innerText;
	     			tempData.dragFlag = selectedTr.cells[3].innerText;
	     			tempData.type = selectedTr.cells[4].innerText;
	     			tempavoidIdle.avoid = selectedTr.cells[5].innerText;
	     			tempData.sequence = i;
	     			tempData.duration = Number(selectedTr.cells[7].innerText);
	     			tempData.name = selectedTr.cells[8].innerText;
	     			tempData.courseTypeName = selectedTr.cells[9].innerText;
	     			tempData.introduction = selectedTr.cells[10].innerText;
	     			if(selectedTr.cells[11].innerText != ""){
		     			tempData.examPaper = Number(selectedTr.cells[11].innerText);
	     			}
	     			if(selectedTr.cells[12].innerText != ""){
	     				tempavoidIdle.idleDuration = Number(selectedTr.cells[12].innerText);
	     			}
	     			tempData.avoidIdle = tempavoidIdle;
	     			tempData.courseware = tempWare;
	     			
	     	       lessonDataTemp.push(tempData);
	     	    }
	     	 
	     	    else {
	     	    	 alert("请选择一行");
	     	    }
	     }

	return lessonDataTemp;	
}



$(function() {
	  //清除弹框内容  
	 $(".clean-data").click(function(){
		 $(".Bomb-box").html("");
		 $(".Bomb-box").val("");
		 $("#lessonDragFlag").prop("checked",false);
		 $(".errorPrompt").html("");
		 $(".icon-remove-sign").css("opacity","0");
		 $(".Bomb-box").css("border-color","#e6e6eb");
		 $.get('jv/systemparameter/findname.do?name=validateMin',function(data){
			 var dataObj = JSON.parse(data);
			 $("#idleDuration").val(dataObj.value);
		 });
	 })
	 

	 // 添加           
 	$("#addLessonBtn").click(function(){
 		
 		//填写临时课时数据
 		var tempData = {};
 		var tempWare = {};
	 		
 		var courseType= $.trim($("#lessonCourseType").val());
 		switch(courseType)
 		{
 		case "E":
 			tempData.courseTypeName = "学习";
 			break;
 		case "R":
 			tempData.courseTypeName = "大课";
 			break;
 		case "M":
 			tempData.courseTypeName = "模拟机";
 			break;
 		case "X":
 			tempData.courseTypeName = "考试";
 			break;
 		default:
 			break;
 		}
	 	
 		//判断是学习还是考试
 		switch(courseType){
 		case "E":
 			
 			// 调用数据校验
    		var isPass = checkData(dataAddLesson);
    		// 判断校验是否成功
    		if(!isPass){
    			return;
    		}
 			
 	 		
 			var lessonName= $.trim($("#lessonName").val());
 	 		
 	 		var lessonJionSystem= $.trim($("#lessonJionSystem").val());
 	 		var coursewareFilename= $.trim($("#coursewareFilename").data("t"));
 	 		var lessonDragFlag= $.trim($("#lessonDragFlag").val());
 	 		var lessonIntroduction= $.trim($("#lessonIntroduction").val());
 	 		var lessonduration= $.trim($("#duration").val());
 	 		
 	 		if($("#lessonDragFlag").parent().hasClass("checked")){
 	 			 lessonDragFlag = "Y";
 	 		}else{
 	 			lessonDragFlag = "N";
 	 		}
 	 		
 	 		if($("#lessonJionSystem").parent().hasClass("checked")){
 	 			lessonJionSystem = "Y";
 	 		}else{
 	 			lessonJionSystem = "N";
 	 		}
 	 		
 	 		
 	 		var idleDuration= $.trim($("#idleDuration").val());
 	 		
 	 		if(document.getElementById("lessonAvoidIdle").checked){
 	 			$("#myHangup1").show();
 	 			var tempData;
 	 			tempData.data = dataAddLesson.data.slice();
 	 			if(tempData.data.length < 5){
 	 				tempData.data.push({
 			        	  id : 'idleDuration',
 			        	  msg : idleDurationErrMsg,
 			        	  rule : idleDurationRule,
 			        	  checkFun : 'checkStr'
 			          });
 	 			}
 	 			console.log('勾选了防挂机，此时的data为：'  + tempData.data);
	 	    		if(!checkData(tempData)){
	 	    			console.log('wei tongguo');
	 	    			return;
	 	    		}
 	 			avoidIdle.avoid = true;
 	 			avoidIdle.idleDuration = Number(idleDuration);
 	 		}else{
 	 			$("#idleDuration").val("");
 	 			$("#myHangup1").hide();
 	 			console.log('没有勾选防挂机，此时的data为：'  + dataAddLesson.data);
 	 			avoidIdle.avoid = false;
 	 		}
 	 		
 	 		

 	 		tempData.name = lessonName;
 	 		tempData.type = courseType;

 	 		tempData.jionSystem = lessonJionSystem;
 	 		tempWare.filename = coursewareFilename;
 	 		tempData.courseware = tempWare;
 	 		tempData.dragFlag = lessonDragFlag;
 	 		tempData.avoidIdle = avoidIdle;
 	 		tempData.introduction = lessonIntroduction;
 	 		tempData.sequence = sequence;
 	 		tempData.Index = (new Date()).getTime();
 	 		tempData.duration = parseInt(lessonduration);
 	 		
 	 		//当前课时表中的数据
 	 		lessonsList.push(tempData);
 	 		
 	 		addTable(lessonsList,"lesson");
 	 		
 	 		
 			break;
 		case "X":

 			

 			// 调用数据校验
    		var isPass = checkData(dataAddExam);
    		// 判断校验是否成功
    		if(!isPass){
    			return;
    		}
 			

 			var examName= $.trim($("#examName").val());
 	 		
 			var examStart= $.trim($("#examStart").val());
 	 		var examEnd= $.trim($("#examEnd").val());
 	 		var examClassifications= $.trim($("#examClassifications").val());
 	 		var examDuration= $.trim($("#examDuration").val());
 	 		var examPassScore= $.trim($("#examPassScore").val());
 	 		var exmaNum= $.trim($("#exmaNum").val());
 	 		var examRandomOrder= $.trim($("#examRandomOrder").val());
 	 		
 	 		var examAchievementRelease= $.trim($("#examAchievementRelease").val());
 	 		var examDelayTime= $.trim($("#examDelayTime").val());
 	 		var examNotice= $.trim($("#examNotice").val());
 	 		var examPattern= $.trim($("#examPattern").val());
 	 		var examDelayTime= $.trim($("#delayTime").val());
 	 		
 	 		var exampaperId = 0;
 	 		var exampaperScroe;
 	 		var choosePaper = {};
 	 		
 	 		var dataTemp = document.getElementsByName('paperRadio');
 		    for(var i = 0; i < dataTemp.length; i++){
	     	//console.log("paperRadio" + selectedTr);
	     	    if (dataTemp[i].checked) {
	     	    	var selectedTr = dataTemp[i].parentNode.parentNode;
	     	    	
	     	    	var exampaperId = selectedTr.cells[1].innerText;
	     	    	var exampaperScroe = selectedTr.cells[2].innerText;
	     	    	choosePaper.mode = selectedTr.cells[3].innerText;
	     	    }
 		     }
 	 		
 	 		
 	 		if(document.getElementById("examRandomOrder").checked){
 	 			examRandomOrder = "Y";
 	 		}
 	 		else{
 	 			examRandomOrder = "N";
 	 		}
 	 		
 	 		
 	 		
 	 		
 	 		//新增加考试信息
 	 		//填写考试
 	 		
 	 		var examAnswerPublish = {};
 	 		examAnswerPublish.mode = examAchievementRelease;
 	 		examAnswerPublish.delayDuration = examDelayTime;
 	 		
 	 		
 	 		var examData = {};
 	 		examData.name = examName;
 	 		examData.examStart = examStart;
 	 		//examData.students = [];
 	 		examData.randomOrder = examRandomOrder;
 	 		examData.examAnswerPublish = examAnswerPublish;
 	 		examData.paperMode = examPattern;
 	 		examData.examEnd = examEnd;
 	 		examData.examClassifications = examClassifications;
 	 		examData.examType = "线上自主";
 	 		examData.passScore = Number(examPassScore);
 	 		examData.examNum = Number(exmaNum);
 	 		examData.examNotice = examNotice;
 	 		examData.examPaper = Number(exampaperId);
 	 		examData.examPaperContent = choosePaper;
 	 		examData.Index = (new Date()).getTime();
 	 		examData.duration = Number(examDuration);
 	 		
 	 		
 			var strDate = JSON.stringify(examData);
 	 		
 			var examId = 0;
 	 	    $.ajax({
 	 	        type: "POST",
 	 	        url: "jv/exam/lessonadd.do",
 	 	        data: {'data':strDate},
 	 	        dataType: "json",
 	 	        success: function(data){

 	 	        	data = JSON.parse(data);
 	 	        	examId = Number(data.id);

 	 	        	
 	 	        //临时表显示
 	 	 	 		tempData.name = examName;
 	 	 	 		tempData.type = "X";

 	 	 	 		tempData.jionSystem = "";
 	 	 	 		tempWare.filename = "";
 	 	 	 		tempData.courseware = "";
 	 	 	 		tempData.dragFlag = "";
 	 	 	 		tempData.avoidIdle = avoidIdle;
 	 	 	 		tempData.introduction = "";
 	 	 	 		tempData.sequence = sequence;
 	 	 	 		tempData.examPaper = examId;
 	 	 	 		tempData.duration = examDuration;
 	 	 	 		
 	 	 	 		
 	 	 	 		//当前课时表中的数据
 	 	 	 		lessonDataTemp.push(tempData);
 	 	 	 		
// 	 	 	 		console.log(lessonDataTemp);
 	 	 	 		addTable(lessonDataTemp,"lesson");
 	 	 	 		
 	 	        }
 	 	    });
 	 	    
 			break;
 		}
 		
 		sequence += 1;
 		
 		$('#myAddModal').modal('hide');
	})
	
	
	$("#delLessonBtn").click(function(){
		 var lessonDataTemp = [];
		 var idsTemp = [];
		 sequence = 1;
			var dataTemp = document.getElementsByName('lessonCheck');
		    for(var i = 0; i <dataTemp.length; i++){
		      if(dataTemp[i].checked){
		    	  selectedTr = dataTemp[i].parentNode.parentNode;
		    	  if (selectedTr != null){
		     			if(selectedTr.cells[11].innerText != ""){
			     			var delId = Number(selectedTr.cells[11].innerText);
			     			idsTemp.push(delId);
		     			}
		    	  }
		      	}
		    //判断是勾选删除 还是直接点击列
		      else{
			     	 selectedTr = dataTemp[i].parentNode.parentNode;
			     	    if (selectedTr != null) {
			     	    	var tempData = {};
			     	    	var tempWare = {};
			     	    	
			     	        tempWare.filename = selectedTr.cells[1].innerText;
			     			
			     			tempData.courseware = tempWare;
			     			tempData.jionSystem = selectedTr.cells[2].innerText;
			     			tempData.dragFlag = selectedTr.cells[3].innerText;
			     			tempData.type = selectedTr.cells[4].innerText;
			     			tempData.avoidIdle = avoidIdle;
			     			tempData.sequence = sequence;
			     			tempData.duration = selectedTr.cells[7].innerText;
			     			tempData.name = selectedTr.cells[8].innerText;
			     			tempData.courseTypeName = selectedTr.cells[9].innerText;
			     			tempData.introduction = selectedTr.cells[10].innerText;
			     			if(selectedTr.cells[11].innerText != ""){
				     			tempData.examPaper = Number(selectedTr.cells[11].innerText);
			     			}
			     	        
			     	       lessonDataTemp.push(tempData);
			     	       sequence += 1;
			     	    }
			     	 
			     	    else {
			     	    	 alert("请选择一行");
			     	    }
	      		}
		     }
		    
		    if(idsTemp.length > 0){
		    	var obj = {'examPlan':idsTemp};
				var strDate = JSON.stringify(obj);
//				console.log("tableAjax参数： "+strDate);
			    $.ajax({
			        type: "POST",
			        url: "jv/exam/delbycourse.do",
			        data: {'data':strDate},
			        dataType: "json",
			        success: function(data){
			        	//alert(data);
			        	console.log(data);
			            
			        }
			    });
		    }
		    
		   
		    
//	 		console.log(lessonDataTemp);
	 		addTable(lessonDataTemp,"lesson");
	})
	
	
	$("#klBtn").click(function(){
		
 		$('#mycuModal').modal('hide');
	})
	
	
	//添加前置课程
	$("#preBtn").click(function(){
		
		var strNameTemp = "";
		//前置课程临时对象
		var preCourse = [];
		
		var dataTemp = document.getElementsByName('preCheck');
       for(var i = 0; i <dataTemp.length; i++){
    	   //console.log(fdsa[i]);
         if(dataTemp[i].checked){
        	 selectedTr = dataTemp[i].parentNode.parentNode;
        	    if (selectedTr != null) {
        	        var id = Number(selectedTr.cells[1].innerText);
        	        var name = selectedTr.cells[2].innerText;

    	            preCourse.push(id);
    	            
    	            strNameTemp += name + "  "
    	            //console.log(preCourse);
        	    }
        	    else {
        	        alert("请选择一行");
        	    }
         	}
        }  
       
       courseData.preCourses = preCourse;
       $("#preName").val(strNameTemp);
       $('#myAddPreCourse').modal('hide');
       cleanCheck();
	})
	
	
		//取消添加前置课程
	$("#preQuitBtn").click(function(){
       cleanCheck();
	})

	
});


/*查看详情*/
function viewDetail(obj) {
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
        //console.log("selectedTr不为NULL");
        //console.log(selectedTr.rowIndex);
        //console.log(selectedTr.cells[1].innerText); //获取的方法一 
        var id = selectedTr.cells[1].innerText;
        //window.location.href="chkpro.asp?id="+id+"&istop="+pass;
        alert(id);
    }
    else {
        alert("请选择一行");
    }
}

/*修改*/
function modify(obj) {
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
        //console.log("selectedTr不为NULL");
        //console.log(selectedTr.rowIndex);
        //console.log(selectedTr.cells[1].innerText); //获取的方法一 
        var id = selectedTr.cells[1].innerText;
        //window.location.href="chkpro.asp?id="+id+"&istop="+pass;
    }
    else {
        alert("请选择一行");
    }
    $('#modify_dialog').dialog('myModifyModal');
    //data-toggle='modal' data-target='' 
}


/*删除*/
function del(obj) {
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
        var id = selectedTr.cells[1].innerText;
    	var obj = [{'id':id}];
    	var strDate = JSON.stringify(obj);
    	
		$.ajax({
	         type: "POST",
	         url: "jv/course/del.do",
	         data: {'data':strDate},
	         dataType: "json",
	         success: function(data){
	             $('#myDelModal').modal('hide')
	          }
	 	    })
    }
    else {
        alert("请选择一行");
    }
}


/*提交课程信息*/
function addCourse() {
	
	// 调用数据校验
	var isPass = checkData(dataCourse);
	// 判断校验是否成功
	if(!isPass){
		return;
	}
	
	var courseName= $.trim($("#courseName").val());
	var courseType= $.trim($("#courseType").val());
	var courseClassifications= $.trim($("#courseClassifications").val());
	var lesson_order= $.trim($("#lesson_order").val());
	var introduction= $.trim($("#introduction").val());
	
	if(document.getElementById("lesson_order").checked){
		lesson_order = "S";
 		}
	else{
		lesson_order = "M";
	}

	
	//当前课时表中的数据
	var lessonDataTemp =lessonsList;
	console.log(lessonDataTemp);
	if(lessonDataTemp.length <= 0){
		alert("请填写课程");
		return false;
	}
	
	//填写课程数据
	courseData.name = courseName
	courseData.trainType = courseType;
	courseData.lessonClassifications = courseClassifications;
	courseData.introduction = introduction;
	courseData.lessonOrder = lesson_order;
	courseData.lesson = lessonDataTemp;
	var logDataTemp = [];
	trainLog.data = logDataTemp;
	courseData.trainLog = trainLog;
	courseData.state = 'N';
	//获取当前登陆人员ID
	courseData.person = 1;
	//
	
	submitData.course = courseData;
	var strDate = JSON.stringify(submitData);
    $.ajax({
        type: "POST",
        url: "jv/course/add.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
        	//alert(data);
        	console.log(data);
        	window.location.href="../views/courseList.jsp";
        }
    });
    	//window.location.href="views/courseList.jsp";
}




////////////////////树
//addHoverDom 方法 控制悬停时得菜单
function addHoverDom(treeId, treeNode) {

};

function zTreeOnClick(currentId,currentName) {
  	$("#klName").val(currentName);
  	courseData.knowledgePoint = Number(currentId);
  	$('#mycuModal').modal('hide');
};

function removeHoverDom(treeId, treeNode) {
    $("#addBtn_"+treeNode.tId).unbind().remove();
    $("#removeBtn_"+treeNode.tId).unbind().remove();
    $("#editBtn_"+treeNode.tId).unbind().remove();
};

function loadReady() {
    var bodyH = demoIframe.contents().find("body").get(0).scrollHeight,
            htmlH = demoIframe.contents().find("html").get(0).scrollHeight,
            maxH = Math.max(bodyH, htmlH), minH = Math.min(bodyH, htmlH),
            h = demoIframe.height() >= maxH ? minH:maxH ;
    if (h < 530) h = 530;
    demoIframe.height(h);
}

var setting = {
    check: {
        enable: false
    },
    view: {
        addHoverDom: addHoverDom,
        removeHoverDom: removeHoverDom,
        dblClickExpand: false,
        showLine: true,
        selectedMulti: false
    },
    data: {
        simpleData: {
            enable:true,
            idKey: "id",
            pIdKey: "pId",
            rootPId: ""
        }
    },
    callback: {
    	//onClick: zTreeOnClick
    }
};

function xmlAjax(){

	$http.ajax({
	    type: "GET",
	    url: "jv/knowledgepoint/list.do",
	    data: null,
	    dataType: "json",
	    success: function(data){
	    		console.log(data);
				data = JSON.parse(data);
				zNodes = createTreeData(data);

	               	var t = $("#tree");
  	            t = $.fn.zTree.init(t, setting, zNodes);
  	            demoIframe = $("#testIframe");
  	            demoIframe.bind("load", loadReady);
  	            var zTree = $.fn.zTree.getZTreeObj("tree");
  	            //默认选中哪个节点  lyh
  	            //zTree.selectNode(zTree.getNodeByParam("id", 103));
  	            
         }
	});
}


/*搜索*/
function search(obj) {
	var searchName = $.trim($("#searchName").val());
//	if(searchName == "") {
//		alert("请填写搜索条件");
//		return false;
//		}
	tableAjax(1,maxVisible,true,searchName,"","A","courseList",true);
}


//选中知识点 加载数
function getKl(obj){
	xmlAjax();
}


//选中前置课程 加载数据
function getPre(obj){
    tableAjax(1,maxVisible,true,"","","A","courseList",true);
}


$(document).ready(function(){
    App.init();
    tableAjax(1,maxVisible,true,"","","A","courseList",false);
});




//新增模态框的学习和考试
var mystudy = document.getElementById("mystudy");
var myExamination = document.getElementById("myExamination");
var lessonCourseType = document.getElementById("lessonCourseType");
lessonCourseType.onchange = function (){
	var val = this.value;
	switch (val){
	 case "E":
		 mystudy.style.display = "block";
		 myExamination.style.display = "none";
         break;
     case "X":
    	 mystudy.style.display = "none";
    		myExamination.style.display = "block";
         break;
	}
}


//创建试卷
function createPaper(obj) {
	window.open("views/examPaperAdd.jsp");
}



/*搜索*/
function searchPaper(obj) {
	//alert("dsaddf");
	var searchExamPaperName = $.trim($("#searchExamPaperName").val());
	tableAjax(1,maxVisible,true,searchExamPaperName,"","","examPaperList",true);
}


$("#lessonAvoidIdle").click(function(){
	if($(this).parent().hasClass("checked")){ // 当前已选中
		$("#myHangup1").hide();
		return;
	}
	$("#myHangup1").show();
});


/*成绩发布*/
var myDelayed = document.getElementById("myDelayed");
var examAchievementRelease = document.getElementById("examAchievementRelease");
examAchievementRelease.onchange = function (){
	var val = this.value;
	if(val == "延时发布"){
		 myDelayed.style.display = "block";
	}else{
		myDelayed.style.display = "none";
	}
}

$(".up-move").live("click",function(){
	

});

$(".down-move").live("click",function(){

});

$(function(){
	var lessonOrder = getSysParam("lessonOrder");
	if(lessonOrder == 'S'){
		$("#lesson_order").click();
	}
	var dragFlag = getSysParam("dragFlag");
	if(dragFlag == 'Y'){
		$("#lessonDragFlag").click();
	}
	var avoidIdle = getSysParam("avoidIdle");
	if(avoidIdle == 'Y'){
		$("#lessonAvoidIdle").click();
	}
	
	
})
