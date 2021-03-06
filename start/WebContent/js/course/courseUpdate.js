/**
 * Created by Administrator on 2016/7/11.
 */



	var lessonNameErrMsg = "名称格式不正确，且长度为1到20个字符";
	var lessonNameRule = '/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{1,20}$/g';
	
	var durationErrMsg = '时长必须是有效数字';
	var durationRule = '/^[1-9][0-9]*$/g';
	
	var lessonIntroductionErrMsg = "描述不能大于1500个字符";
	var lessonRule = '/^.{0,1500}$/g';
	
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
	 * 修改课时数据校验说明
	 */
	var dataUpdateLesson = {
			data : [
			          // modifyLessonName课时名称
			          {
			        	  id : 'modifyLessonName',
			        	  msg : lessonNameErrMsg,
			        	  rule : lessonNameRule,
			        	  checkFun : 'checkStr'
			          },
			          // modifyduration课时时长
			          {
			        	  id : 'modifyduration',
			        	  msg : durationErrMsg,
			        	  rule : durationRule,
			        	  checkFun : 'checkStr'
			          },
			          // modifyLessonIntroduction课时描述
			          {
			        	  id : 'modifyLessonIntroduction',
			        	  msg : lessonIntroductionErrMsg,
			        	  rule : lessonRule,
			        	  canNull : true,
			        	  checkFun : 'checkStr'
			          },
			          // modifyCoursewareFilename课件
			          {
			        	  id : 'modifyCoursewareFilename',
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
	 * 修改考试数据校验说明
	 */
	var dataUpdateExam = {
			data : [
			          // modifyexamName考试名称
			          {
			        	  id : 'modifyexamName',
			        	  msg : lessonNameErrMsg,
			        	  rule : lessonNameRule,
			        	  checkFun : 'checkStr'
			          },
			          // modifyexamStart考试开始时间	modifyexamEnd考试结束时间
			          {
			        	  id : {
			        		  startId : 'modifyexamStart',
			        		  endId : 'modifyexamEnd'
			        	  },
			        	  msg : '时间不正确',
			        	  checkFun : 'checkDateCompare',
			        	  type : 'date'
			          },
			          // modifyexamDuration考试时长
			          {
			        	  id : 'modifyexamDuration',
			        	  msg : durationErrMsg,
			        	  rule : durationRule,
			        	  checkFun : 'checkStr'
			          },
			          // modifyexamPassScore分数
			          {
			        	  id : 'modifyexamPassScore',
			        	  msg : "分数必须是数字",
			        	  rule : durationRule,
			        	  checkFun : 'checkStr'
			          },
			          // modifyexmaNum考试次数
			          {
			        	  id : 'modifyexmaNum',
			        	  msg : "考试次数必须是数字",
			        	  rule : durationRule,
			        	  checkFun : 'checkStr'
			          },
			          // modifyexamNotice考试须知
			          {
			        	  id : 'modifyexamNotice',
			        	  msg : "考试须知不能为空",
			        	  checkFun : 'checkStr'
			          }
			]
	}
	
	/**
	 * 修改课程数据校验说明
	 */
	var dataCourse = {
			data : [
			          // courseName课程名称
			          {
			        	  id : 'courseName',
			        	  msg : lessonNameErrMsg,
			        	  rule : lessonNameRule,
			        	  checkFun : 'checkStr'
			          },
			          // introduction课时描述
			          {
			        	  id : 'introduction',
			        	  msg : lessonIntroductionErrMsg,
			        	  canNull : true,
			        	  checkFun : 'checkStr'
			          }
			]
	}


//modify by lyh 20160718
var pageIndex;
var totleNum = 0;
//每段的页码数量
var maxVisible = 10;

//课程对象总
var submitData = {};
//课程对象
var courseData = {};
//课程记录
var trainLog = {};



////课时序号
var sequence = totleNum+1;

//知识点
var knowledgePointId = 0;

//所属知识点
var knowledgePoint = 0;
//课程ID
var  ID;

//课时临时ID 每次-1
var lessonTempId = -1;


//树
var zTree;
var demoIframe;
var zNodes;



function cleanCheck(){
	
	var collid = document.getElementsByName('all');
	var coll = document.getElementsByName('preCheck');
	collid.checked  = false;

   for(var i = 0; i < coll.length; i++){
	     coll[i].checked = false;
   }
}


/* 创建课时table*/
function addTable(data){
	$("#addLesson_tbody").text("");
	var strTemp = "";
    for(var i=0;i<data.length;i++){
		strTemp = strTemp + 
		"<tr><td><input type='checkbox' name='lessonCheck' class='checkboxes' value='1' /></td>" + 
		"<td style='display:none;' >"+data[i].id+"</td>" +
		"<td style='display:none;'>"+data[i].filename+"</td>" +
		"<td style='display:none;'>"+data[i].jionSystem+"</td>" +
		"<td style='display:none;'>"+data[i].dragFlag+"</td>" +
		"<td style='display:none;'>"+data[i].type+"</td>" +
		"<td style='display:none;'>"+data[i].avoid+"</td>" +
		"<td style='display:none;' class='sequence'>"+data[i].sequence+"</td>" +
		"<td style='display:none;'>"+data[i].duration+"</td>" +
		"<td style='display:none;'>"+data[i].coursewareId+"</td>" +
		"<td style='display:none;'>"+data[i].train_course_lesson+"</td>" +
		"<td style='display:none;'>"+data[i].idleDuration+"</td>" +
		"<td>"+data[i].name+"</td>" +
		"<td>"+data[i].courseTypeName+"</td>" +
		"<td class='hidden-480'><span class='myToolong'>"+checkUndifend(data[i].introduction)+"</span></td>" +
		"<td style='display:none;'>"+checkUndifend(data[i].examPaper)+"</td>" +
		"<td class='center hidden-480' ><span class='sort1 up-move' >上移</span>" +
		"&nbsp;&nbsp;&nbsp;&nbsp;<span class='sort2 down-move' >下移</span></td>" +
		"<td class='center hidden-480'><span class='sort1' data-toggle='modal' data-target='#myModifyModal'  onclick='modify(this)'>修改</span></td>" +
		//"<td class='center hidden-480'><span class='sort1' >修改</span></td>" +
		"</tr>";
    }
	var tbody=document.getElementById("addLesson_tbody");
	$(tbody).html(strTemp);
}


/* 创建课时table*/
function addCoursePaperTable(data){
	$("#paper_table").text("");
	var strTemp = "";
    for(var i=0;i<data.length;i++){
		strTemp = strTemp + 
		"<tr><td><input type='radio' name='paperRadio'  value='1' /></td>" +
		"<td style='display:none;'>"+data[i].id+"</td>" +
		"<td style='display:none;'>"+data[i].totle_score+"</td>" +
		"<td style='display:none;'>"+data[i].mode+"</td>" +
		"<td >"+data[i].name+"</td></tr>" 
    }//<span class='sort1' onclick='' ></span>
	var tbody=document.getElementById("paper_table");
	var tby = $(tbody);
	tby.html('');
	tby.html(tby.html() + strTemp);
}



/* 创建前置课程table*/
function addPreTable(data){
	var strTemp = "";
    for(var i=0;i<data.length;i++){
		strTemp = strTemp + "<tr  class='odd gradeX'><td><input type='checkbox' NAME='preCheck' class='checkboxes' /></td><td style='display:none;'>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].trainTypeName+"</td><td>"+data[i].createdate+"</td></tr>";
    }
    $("#courseAddList_tbody").html(strTemp)
}


//前置课程转换数据
function readData(data){
	var Data = [];
	if(data.length==0){
		totleNum = 0;
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
			tempData.sequence = item.sequence;
			tempData.duration = item.duration;
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
/*	console.log("输出data");
	console.log(JSON.stringify(Data));
	console.log("end");*/
	return Data;	
}


/* 前置课程 Ajax  */
function tableAjax(page,maxVisible,bFlag,name,node,state,modelName){
	
	var obj = {'page':page,'size':maxVisible,'name':name,'node':node,'state':state};
	var strDate = JSON.stringify(obj);
//	console.log("tableAjax参数： "+strDate);
	switch(modelName){
	case "courseList":
		 $.ajax({
		        type: "get",
		        url: "jv/course/list.do",
		        data: {'data':strDate},
		        dataType: "json",
		        success: function(data){
//		        	console.log("tableAjax数据： " + data);
		        	data = JSON.parse(data);
		        	var tableData = readData(data);
		        	addPreTable(tableData);
		            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
		            if(bFlag){
		            	//UIGeneral.init(page,totleNum,maxVisible,modelName);
		            	
		        	    /* 分页   */
		    	        /*使用方法*/
		                $t.using('tableAjax').init({
					    	 maxPage:totleNum,
					    	 name:name,
					    	 node:node,
					    	 state:state,
					    	 modelName:modelName,
					    	 maxVisible:maxVisible
				            
		   	 	        }); 

		            }
		            
		        }
		    });
		break;
	case "examPaperList":
		
		$.ajax({
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
	        	addCoursePaperTable(data.data,"examPaperList");
	            totleNum = data.totalNum;
	            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
	            if(bFlag){
	            	//UIGeneral.init(page,totleNum,maxVisible,modelName);
	            	
	        	    /* 分页   */
	    	        /*使用方法*/
	                $t.using('tableAjax').init({
				    	 maxPage:totleNum,
				    	 name:name,
				    	 node:node,
				    	 state:state,
				    	 modelName:modelName,
				    	 maxVisible:maxVisible
			            
	   	 	        }); 

	            }
	            
	        }
	    });
		
		break;
	}
   
	
}


//转换数据
function readLessonData(data,flag){
	var Data = [];
	
	switch(flag){
	case "ajax":
		for(var i=0;i<data.length;i++){
			var item = data[i];
			if(item!=undefined){
				
				if(item.totleNum != undefined/*rid*/){
					totleNum = item.totleNum;
					
				}
				//获取avoidIdle的值
				var tempData = {};
				tempData.name = item.name;
				tempData.id = item.id;
				tempData.type = item.type;
				tempData.introduction = item.introduction;
				tempData.examPaper = item.examPaper;
				tempData.avoid = item.avoidIdle.value.avoid;
				tempData.idleDuration = item.avoidIdle.value.idleDuration;
				tempData.jionSystem = item.jionSystem;
				tempData.courseId = item.courseId;
				tempData.dragFlag = item.dragFlag;
				tempData.filename = item.filename;
				tempData.coursewareId = item.coursewareId;
				tempData.train_course_lesson = item.train_course_lesson;
				tempData.sequence = item.sequence;
				tempData.duration = item.duration;
				
				//tempData.createdate = getLocalTime(item.createdate);
				
				switch(item.type)
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
				Data.push(tempData);
			}
		}
		break;
	case "temp":
		for(var i=0;i<data.length;i++){
			var item = data[i];
			if(item!=undefined){
				
				if(item.totleNum != undefined/*rid*/){
					totleNum = item.totleNum;
					
				}
				var tempData = {};
				tempData.name = item.name;
				tempData.id = item.id;
				tempData.type = item.type;
				tempData.introduction = item.introduction;
				tempData.examPaper = item.examPaper;
				tempData.avoid = item.avoidIdle.avoid;
				tempData.idleDuration = item.avoidIdle.idleDuration;
				tempData.jionSystem = item.jionSystem;
				tempData.sequence = item.sequence;
				tempData.courseId = item.courseId;
				tempData.dragFlag = item.dragFlag;
				tempData.filename = item.courseware.filename;
				tempData.coursewareId = item.courseware.coursewareId;
				tempData.train_course_lesson = item.courseware.train_course_lesson;
				tempData.duration = item.duration;
				//tempData.createdate = getLocalTime(item.createdate);
				
				switch(item.type)
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
				Data.push(tempData);
			}
		}
	}
	
	

/*	console.log("输出data");
	console.log(JSON.stringify(Data));
	console.log("end");*/
	return Data;	
}



/* 课时列表 Ajax  */
function lessonTableAjax(page,maxVisible,modelName,bFlag,id){
	ID = id;
	var obj = {'page':page,'size':maxVisible,'id':id};
	var strDate = JSON.stringify(obj);
//	console.log("lessonTableAjax参数： "+strDate);
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
        	for(var i=0;i<data.length;i++){
        		data[i].avoidIdle.value = JSON.parse(data[i].avoidIdle.value);
        	}
        	//console.log("dshjakd:"+data);
        	var tableData = readLessonData(data,"ajax");
        	
//     		console.log(tableData);
     		addTable(tableData);
     		
            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
            if(bFlag){
        	    /* 分页   */
    	        /*使用方法*/
                $t.using('tableAjax').init({
			    	 maxPage:totleNum,
			    	 modelName:modelName,
			    	 id:id,
			    	 maxVisible:maxVisible
		            
   	 	        }); 
            }
            
        }
    });
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
//            else {
//                //文件上传成功，返回图片的路径。将路经赋给隐藏域
//                //console.log(data);
//            	if(coursewareModifyUpload==id){
//            		$("#modifyCoursewareFilename").val(data.showName);
//            		$("#modifyCoursewareFilename").data("t",data.fileName);
//            	}
//            	else{
//            		$("#coursewareFilename").val(data.showName);
//            		$("#coursewareFilename").data("t",data.fileName);
//            	}
//                
//            }
//        }
//    });
//}


//获取当前列表中的数据  返回lesson对象



//获取当前课时列表中的数据
function getTableData(){

	 var lessonDataTemp = [];
		var dataTemp = document.getElementsByName('lessonCheck');
	    for(var i = 0; i < dataTemp.length; i++){
	     	 var selectedTr = dataTemp[i].parentNode.parentNode;
	     	    if (selectedTr != null) {
	     	    	var tempData = {};
	     	    	var tempWare = {};
	     	    	var tempAvoidIdle = {};
	     	    	
	     	    	tempData.id = Number(selectedTr.cells[1].innerText);
	     	    	tempWare.filename = selectedTr.cells[2].innerText;
	     			tempData.jionSystem = selectedTr.cells[3].innerText;
	     			
	     			tempData.dragFlag = selectedTr.cells[4].innerText;
	     			tempData.type = selectedTr.cells[5].innerText;
	     			
	     			tempAvoidIdle.avoid = selectedTr.cells[6].innerText;
	     			

	     			tempData.sequence = i;
	     			tempData.duration = parseInt(selectedTr.cells[8].innerText);


	     			
	     			tempWare.id = Number(selectedTr.cells[9].innerText);
	     			tempWare.train_course_lesson = Number(selectedTr.cells[10].innerText);
	     			
	     			tempAvoidIdle.idleDuration = Number(selectedTr.cells[11].innerText);
	     			
	     			tempData.name = selectedTr.cells[12].innerText;
	     			tempData.courseTypeName = selectedTr.cells[13].innerText;
	     			tempData.introduction = selectedTr.cells[14].innerText;
	     			if(selectedTr.cells[15].innerText != ""){
		     			tempData.examPaper = Number(selectedTr.cells[15].innerText);
	     			}
	     			
	     			tempData.trainCourse = Number(ID);
	     			
	     			tempData.avoidIdle = tempAvoidIdle;
	     			tempData.courseware = tempWare;
	     			lessonDataTemp.push(tempData);
	     	    }
	     	 
	     	    else {
	     	    	 alert("请选择一行");
	     	    }
	     }

	return lessonDataTemp;	
}


//获取列表数据 抛出修改数据

function getTableDataForUpdate(id){
//alert("id："+id);
	 var lessonDataTemp = [];
		var dataTemp = document.getElementsByName('lessonCheck');
	    for(var i = 0; i < dataTemp.length; i++){
	     	 var selectedTr = dataTemp[i].parentNode.parentNode;
	     	    if (selectedTr != null) {
	     	    	//alert(selectedTr.cells[1].innerText);
	     	    	if(Number(id) != Number(selectedTr.cells[1].innerText)){
	     	    		var tempData = {};
		     	    	var tempWare = {};
		     	    	var tempAvoidIdle = {};
		     	    	
		     	    	tempData.id = Number(selectedTr.cells[1].innerText);
		     	    	tempWare.filename = selectedTr.cells[2].innerText;
		     			tempData.jionSystem = selectedTr.cells[3].innerText;
		     			
		     			tempData.dragFlag = selectedTr.cells[4].innerText;
		     			tempData.type = selectedTr.cells[5].innerText;
		     			
		     			tempAvoidIdle.avoid = selectedTr.cells[6].innerText;
		     			
		     			tempData.sequence = Number(selectedTr.cells[7].innerText);
		     			//
		     			tempData.duration = Number(selectedTr.cells[8].innerText);
		     			
		     			tempWare.coursewareId = Number(selectedTr.cells[9].innerText);
		     			tempWare.train_course_lesson = Number(selectedTr.cells[10].innerText);
		     			
		     			tempAvoidIdle.idleDuration = selectedTr.cells[11].innerText;
		     			
		     			tempData.name = selectedTr.cells[12].innerText;
		     			tempData.courseTypeName = selectedTr.cells[13].innerText;
		     			tempData.introduction = selectedTr.cells[14].innerText;
		     			if(selectedTr.cells[15].innerText != ""){
			     			tempData.examPaper = Number(selectedTr.cells[15].innerText);
		     			}
		     			
		     			tempData.trainCourse = ID;
		     			
		     			tempData.avoidIdle = tempAvoidIdle;
		     			tempData.courseware = tempWare;
		     			lessonDataTemp.push(tempData);
	     	    	}
	     	    }
	     	 
	     	    else {
	     	    	 alert("请选择一行");
	     	    }
	     }

/*	console.log("输出lessonDataTemp");
	console.log(JSON.stringify(lessonDataTemp));
	console.log("end");*/
	return lessonDataTemp;	
}



$(function() {
	  //清除弹框内容  
	 $(".clean-data").click(function(){
		 $(".Bomb-box").html("");
		 $(".Bomb-box").val("");
		 $("#lessonDragFlag").prop("checked",false);
		 $.get('jv/systemparameter/findname.do?name=validateMin',function(data){
			 var dataObj = JSON.parse(data);
			 $("#idleDuration").val(dataObj.value);
		 });
	 })

	 // 添加           
 	$("#addLessonBtn").click(function(){

 		
 		var courseType= $.trim($("#lessonCourseType").val());
 		//填写临时课时数据
 		var tempData = {};
 		var tempWare = {};
 		//课时挂机对象
 		var avoidIdle = {};
 		
 		tempData.type = courseType;
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
 			
 	 		/*if($.trim($("#lessonName").val()) == ""){
 	 			$(".Bomb-box").html("请填写课时名称");
 	 			return false;
 	 			}
 	 		if($.trim($("#lessonIntroduction").val()) == ""){
 	 			$(".Bomb-box").html("请填写课程描述");
 	 			return false;
 	 			}
 	 		if($.trim($("#coursewareFilename").val()) == ""){
 	 			$(".Bomb-box").html("请上传课件");
 	 			return false;
 	 			}*/
 	 		
 	 		//alert($.trim($("#coursewareFilename").val()));
 	 		
 	 		var lessonName= $.trim($("#lessonName").val());
 	 		
 	 		var lessonJionSystem= $.trim($("#lessonJionSystem").val());
 	 		var coursewareFilename= $.trim($("#coursewareFilename").data("t"));
 	 		var lessonDragFlag= $.trim($("#lessonDragFlag").val());
 	 		var lessonAvoidIdle= $.trim($("#lessonAvoidIdle").val());
 	 		var lessonIntroduction= $.trim($("#lessonIntroduction").val());
 	 		var lessonduration= $.trim($("#duration").val());
 	 		var idleDuration= $.trim($("#idleDuration").val());
 	 		
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
 	 		
 	 		if(document.getElementById("lessonAvoidIdle").checked){
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
	 	    		if(!checkData(tempData)){
	 	    			console.log('wei tongguo');
	 	    			return;
	 	    		}
 	 			avoidIdle.avoid = true;
 	 			avoidIdle.idleDuration = Number(idleDuration);
 	 		}else{
 	 			avoidIdle.avoid = false;
 	 		}
 	 		tempData.name = lessonName;
 	 		tempData.jionSystem = lessonJionSystem;
 	 		
 	 		tempWare.filename = coursewareFilename;
 	 		tempWare.coursewareId = -1;
 	 		
 	 		tempData.courseware = tempWare;
 	 		tempData.dragFlag = lessonDragFlag;
 	 		tempData.avoidIdle = avoidIdle;
 	 		tempData.introduction = lessonIntroduction;
 	 		tempData.sequence = sequence;
 	 		
 	 		tempData.duration = lessonduration;
 	 		
 	 		//区分临时数据和正式数据，临时数据ID都是 lessonTempId  每次使用完-1
 	 		tempData.id = lessonTempId;
 	 		//end
 	 		//当前课时表中的数据
 	 		var lessonDataTemp = getTableData();
 	 		lessonDataTemp.push(tempData);
 	 		
 	 		var readData =  readLessonData(lessonDataTemp,"temp");
 	 		
// 	 		console.log(readData);
 	 		addTable(readData);
 	 		
 			break;
 		case "X":
 			
 			// 调用数据校验
    		var isPass = checkData(dataAddExam);
    		// 判断校验是否成功
    		if(!isPass){
    			return;
    		}
 			
 	 		/*if(($.trim($("#examName").val()) == "")||($.trim($("#examEnd").val()) == "")||
 				($.trim($("#examClassifications").val()) == "")||($.trim($("#examDuration").val()) == "")||
 				($.trim($("#examPassScore").val()) == "")||($.trim($("#exmaNum").val()) == "")||
 				($.trim($("#examNotice").val()) == "")){
 	 			$(".Bomb-box").html("请填写完考试信息");
 	 			return false;
 	 			}*/
 	 		
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
 	 		
 	 		
 	 		if(examRandomOrder == ""){
 	 			examRandomOrder = "N";
 	 		}
 	 		
 	 		var examId = 0;
 	 		
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

 	 		examData.duration = Number(examDuration);
 	 		
 	 		
 			var strDate = JSON.stringify(examData);
 	 		
// 	 		console.log("添加课时addExam参数： "+strDate);
 	 	    $.ajax({
 	 	        type: "POST",
 	 	        url: "jv/exam/lessonadd.do",
 	 	        data: {'data':strDate},
 	 	        dataType: "json",
 	 	        success: function(data){
 	 	        	//alert(data);
 	 	        	console.log(data);
 	 	        	data = JSON.parse(data);
 	 	        	examId = data.id;
 	 	        	//examId.push(data.id);
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
// 	 	 	 		alert(tempData.examPaper);
 	 	 	 		tempData.duration = examDuration;
 	 	 	 		
 	 	 	 		//当前课时表中的数据
 	 	 	 		var lessonDataTemp = getTableData();
 	 	 	 		lessonDataTemp.push(tempData);
 	 	 	 		
// 	 	 	 		console.log(lessonDataTemp);
 	 	 	 		addTable(lessonDataTemp);
 	 	        }
 	 	    });
 	 	    
 	 		
 	 		
 	
 			break;
 		}
	
 		sequence += 1;
 		lessonTempId = lessonTempId - 1;
 		$('#myAddModal').modal('hide');
 		
	})
	
	
	
		 // 修改           
 	$("#modifyLessonBtn").click(function(){

 		
 		var courseType= $.trim($("#modifyCourseType").val());
 		//填写临时课时数据
 		var tempData = {};
 		var tempWare = {};
 		//课时挂机对象
 		var avoidIdle = {};
 		
 		tempData.type = courseType;
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
 			var lessonUpdateid= $.trim($("#lessonUpdateid").val());
 			//alert("lessonUpdateid:"+lessonUpdateid);
 			
 			// 调用数据校验
    		var isPass = checkData(dataUpdateLesson);
    		// 判断校验是否成功
    		if(!isPass){
    			return;
    		}
 			
 	 		/*if($.trim($("#modifyLessonName").val()) == ""){
 	 			$(".Bomb-box").html("请填写课时名称");
 	 			return false;
 	 			}
 	 		if($.trim($("#modifyLessonIntroduction").val()) == ""){
 	 			$(".Bomb-box").html("请填写课程描述");
 	 			return false;
 	 			}
 	 		if($.trim($("#modifyCoursewareFilename").val()) == ""){
 	 			$(".Bomb-box").html("请上传课件");
 	 			return false;
 	 			}*/
 	 		
 	 		//alert($.trim($("#coursewareFilename").val()));
 	 		
 	 		var lessonName= $.trim($("#modifyLessonName").val());
 	 		var coursewareId= $.trim($("#coursewareId").val());
 	 		var train_course_lesson= $.trim($("#train_course_lesson").val());
 	 		var modifySequence= $.trim($("#sequence").val());
 	 		
 	 		if(document.getElementById("modifyLessonJionSystem").checked){
 	 			lessonJionSystem = "Y";
 	 	 	}else{
 	 			lessonJionSystem = "N";
 	 		}
 	 		
 	 		var coursewareFilename= $.trim($("#modifyCoursewareFilename").data("t"));
 	 		
 	 		if(document.getElementById("modifyLessonDragFlag").checked){
 	 			lessonDragFlag = "Y";
 	 	 		}
 	 		else{
 	 			lessonDragFlag = "N";
 	 		}
 	 		
 	 		var idleDuration= $.trim($("#modifyidleDuration").val());
 	 		
 	 		if(document.getElementById("modifyLessonAvoidIdle").checked){
 	 			avoidIdle.avoid = true;
 	 			avoidIdle.idleDuration = Number(idleDuration);
 	 		}
 	 		else{
 	 			avoidIdle.avoid = false;
 	 		}
 	 		
 	 		var lessonIntroduction= $.trim($("#modifyLessonIntroduction").val());
 	 		var lessonduration= $.trim($("#modifyduration").val());
 	 		
 	 		
 	 		
 	 		tempData.name = lessonName;
 	 		tempData.jionSystem = lessonJionSystem;
 	 		
 	 		tempWare.filename = coursewareFilename;
 	 		tempWare.coursewareId = coursewareId;
 	 		
 	 		tempData.courseware = tempWare;
 	 		tempData.dragFlag = lessonDragFlag;
 	 		tempData.avoidIdle = avoidIdle;
 	 		tempData.introduction = lessonIntroduction;
 	 		tempData.sequence = modifySequence;
 	 		
 	 		tempData.duration = lessonduration;
 	 		
 	 		//修改
 			tempData.id = lessonUpdateid;
 	 		//当前课时表中的数据
 	 		var lessonDataTemp = getTableDataForUpdate(lessonUpdateid);
 	 		lessonDataTemp.push(tempData);
 	 		var readData =  readLessonData(lessonDataTemp,"temp");
 	 		addTable(readData);
 	 	 		
 			break;
 		case "X":
 			
 			// 调用数据校验
    		var isPass = checkData(dataUpdateExam);
    		// 判断校验是否成功
    		if(!isPass){
    			return;
    		}
 			
 	 		/*if(($.trim($("#examName").val()) == "")||($.trim($("#examEnd").val()) == "")||
 				($.trim($("#examClassifications").val()) == "")||($.trim($("#examDuration").val()) == "")||
 				($.trim($("#examPassScore").val()) == "")||($.trim($("#exmaNum").val()) == "")||
 				($.trim($("#examNotice").val()) == "")){
 	 			$(".Bomb-box").html("请填写完考试信息");
 	 			return false;
 	 			}*/
 	 		
 	 		var examUpdateid= $.trim($("#examUpdateid").val());
 	 		var examPlanUpdateid= $.trim($("#examPlanUpdateid").val());
 	 		
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
 	 		
 	 		
 	 		if(examRandomOrder == ""){
 	 			examRandomOrder = "N";
 	 		}
 	 		
 	 		//var examId = 0;
 	 		

 	 		//修改考试
 	 		var examAnswerPublish = {};
 	 		examAnswerPublish.mode = examAchievementRelease;
 	 		examAnswerPublish.delayDuration = examDelayTime;
 	 		
 	 		var examData = {};
 	 		examData.id = Number(examPlanUpdateid);
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

 	 		examData.duration = Number(examDuration);
 	 		
 	 		
 			var strDate = JSON.stringify(examData);
 	 		
 			
 	 		
 	 	    $.ajax({
 	 	        type: "POST",
 	 	        url: "jv/exam/update.do",
 	 	        data: {'data':strDate},
 	 	        dataType: "json",
 	 	        success: function(data){
 	 	        	//alert(data);
 	 	        	console.log(data);
 	 	        	//examId = Number(examPlanUpdateid);
 	 	        	//examId.push(data.id);
 	 	        }
 	 	    });
 	 		
 	 		
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
 	 		
 	 		//修改
 	 		var lessonDataTemp = getTableDataForUpdate(examUpdateid);
 	 		lessonDataTemp.push(tempData);
 	 		addTable(lessonDataTemp);
 	 		
 			break;
 		}
	
 		$('#myModifyModal').modal('hide');
 		
	})
	
	
	
	
	
	 // 删除课时          
 	$("#delLessonBtn").click(function(){
 		$http.ajax({
			   isModal : true,
	 	        type: "POST",
	 	        url: "jv/course/cheakdelLesson.do",
	 	        data: {'courseId':ID},
	 	        dataType: "json",
	 	        success: function(data){

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
	 	   		    //判断是勾选
	 	   		      else{
	 	   			     	 selectedTr = dataTemp[i].parentNode.parentNode;
	 	   			     	    if (selectedTr != null) {
	 	   			     	    	var tempData = {};
	 	   			     	    	var tempAvoidIdle = {};
	 	   			     	    	
	 	   			     	    	tempData.id = selectedTr.cells[1].innerText;
	 	   			     	    	tempData.filename = selectedTr.cells[2].innerText;
	 	   			     			tempData.jionSystem = selectedTr.cells[3].innerText;
	 	   			     			
	 	   			     			tempData.dragFlag = selectedTr.cells[4].innerText;
	 	   			     			tempData.type = selectedTr.cells[5].innerText;
	 	   			     			
	 	   			     			tempAvoidIdle.type = selectedTr.cells[6].innerText;
	 	   			     			
	 	   			     			tempData.sequence = sequence;
	 	   			     			tempData.duration = Number(selectedTr.cells[8].innerText);
	 	   			     			
	 	   			     			tempData.coursewareId = selectedTr.cells[9].innerText;
	 	   			     			tempData.train_course_lesson = selectedTr.cells[10].innerText;
	 	   			     			
	 	   			     			tempAvoidIdle.value = selectedTr.cells[11].innerText;
	 	   			     			
	 	   			     			tempData.name = selectedTr.cells[12].innerText;
	 	   			     			tempData.courseTypeName = selectedTr.cells[13].innerText;
	 	   			     			tempData.introduction = selectedTr.cells[14].innerText;
	 	   			     			if(selectedTr.cells[15].innerText != ""){
	 	   				     			tempData.examPaper = Number(selectedTr.cells[15].innerText);
	 	   			     			}
	 	   			     			tempData.avoidIdle = tempAvoidIdle;
	 	   			     	        
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
//	 	   				console.log("tableAjax参数： "+strDate);
	 	   			    $.ajax({
	 	   			        type: "POST",
	 	   			        url: "jv/exam/delbycourse.do",
	 	   			        data: {'data':strDate},
	 	   			        dataType: "json",
	 	   			        success: function(data){
	 	   			        	//alert(data);
//	 	   			        	console.log(data);
	 	   			            
	 	   			        }
	 	   			    });
	 	   		    }  
	 	   	 		
//	 	   	 		console.log(lessonDataTemp);
	 	   	 		addTable(lessonDataTemp);	
	 	        	
	 	        }
	 	    });
 		

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


/*删除*/
function del(obj) {
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
        var name = selectedTr.cells[2].innerText;
        allData = delJsonByName(name,allData);
 		addTable(allData);
    }
    else {
        alert("请选择一行");
    }
}


//修改课程
function modify(obj) {
	 $(".Bomb-box").html("");
	 $(".Bomb-box").val("");
	 $("#lessonDragFlag").prop("checked",false);
	 
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
    	var type = selectedTr.cells[5].innerText;
    	
    	var selectCourseType = document.getElementById("modifyCourseType");   
    	for(var i=0; i<selectCourseType.options.length; i++){  
    	    if(selectCourseType.options[i].value == type){  
    	    	selectCourseType.options[i].selected = true;  
    	        break;  
    	    }  
    	}  
    	switch(type){
    	case "E":
	   		 mystudy1.style.display = "block";
			 myExamination1.style.display = "none";
	    	var id = Number(selectedTr.cells[1].innerText);
	    	var index = selectedTr.cells[2].innerText.indexOf("_");
	    	var filename = selectedTr.cells[2].innerText.substring(index+1,selectedTr.cells[2].innerText.length);
			var jionSystem = selectedTr.cells[3].innerText;
			var dragFlag = selectedTr.cells[4].innerText;
			var avoid = selectedTr.cells[6].innerText;
			if(avoid == "true"){
				if(!$("#modifyLessonAvoidIdle").parent().hasClass("checked")){
					$("#modifyLessonAvoidIdle").click();
				}
			}
			var sequence = Number(selectedTr.cells[7].innerText);
			var duration = Number(selectedTr.cells[8].innerText);
			var coursewareId = Number(selectedTr.cells[9].innerText);
			var train_course_lesson = Number(selectedTr.cells[10].innerText);
			var idleDuration = Number(selectedTr.cells[11].innerText) ? Number(selectedTr.cells[11].innerText):0;
			var name = selectedTr.cells[12].innerText;
			var courseTypeName = selectedTr.cells[13].innerText;
			var introduction = selectedTr.cells[14].innerText;
			if(selectedTr.cells[15].innerText != ""){
 			var examPaper = Number(selectedTr.cells[15].innerText);
			}
			
			var trainCourse = ID;
			
			document.getElementById("lessonUpdateid").value = id;
			document.getElementById("coursewareId").value = coursewareId;
			document.getElementById("train_course_lesson").value = train_course_lesson;
			document.getElementById("sequence").value = sequence;
			document.getElementById("modifyduration").value = duration;
			$("#modifyCoursewareFilename").data("t",selectedTr.cells[2].innerText);
			document.getElementById("modifyLessonName").value = name;
	 		if((jionSystem == "Y")||(jionSystem == "y")){
	 			document.getElementById("modifyLessonJionSystem").checked = true;
	 			if(!$("#modifyLessonJionSystem").parent().hasClass("checked")){
					$("#modifyLessonJionSystem").parent().addClass("checked");
				}
	 		}
	 		else{
	 			document.getElementById("modifyLessonJionSystem").checked = false;
	 			if($("#modifyLessonJionSystem").parent().hasClass("checked")){
					$("#modifyLessonJionSystem").parent().removeClass("checked");
				}
	 		}
	 		document.getElementById("modifyCoursewareFilename").value = filename;
	 		document.getElementById("modifyLessonIntroduction").value = introduction;
	 		document.getElementById("modifyidleDuration").value = idleDuration;
	 		
	 		if((dragFlag == "Y")||(dragFlag == "y")){
	 			document.getElementById("modifyLessonDragFlag").checked = true;
	 			if(!$("#modifyLessonDragFlag").parent().hasClass("checked")){
					$("#modifyLessonDragFlag").parent().addClass("checked");
				}
	 		}
	 		else{
	 			document.getElementById("modifyLessonDragFlag").checked = false;
	 			if($("#modifyLessonDragFlag").parent().hasClass("checked")){
					$("#modifyLessonDragFlag").parent().removeClass("checked");
				}
	 		}
	 		
	 		if(avoid=='true'){
	 			document.getElementById("modifyLessonAvoidIdle").checked = true;
	 			if(!$("#modifyLessonAvoidIdle").parent().hasClass("checked")){
					$("#modifyLessonAvoidIdle").parent().addClass("checked");
				}
	 		}
	 		else{
	 			document.getElementById("modifyLessonAvoidIdle").checked = false;
	 			if($("#modifyLessonAvoidIdle").parent().hasClass("checked")){
					$("#modifyLessonAvoidIdle").parent().removeClass("checked");
				}
	 		}
			
    		break;
    	case "X":
	   		 mystudy1.style.display = "none";
			 myExamination1.style.display = "block";
			 
    		var id = Number(selectedTr.cells[1].innerText); // 课时id
    		var examPaper = 0; // 考试计划id
			if(selectedTr.cells[15].innerText != ""){
	 			examPaper = Number(selectedTr.cells[15].innerText);
				}
//			alert(examPaper);
			if(examPaper != 0){
			    $.ajax({
			        type: "get",
			        url: "jv/exam/courseDetail.do",
			        data: {'id':examPaper},
			        dataType: "json",
			        success: function(data){
			        	console.log(data);
//			        	data = JSON.parse(data);
			        	for(var i=0;i<data.length;i++){
			        		data[i].examAnswerPublish.value = JSON.parse(data[i].examAnswerPublish.value);
			        	}
			        	
			        	document.getElementById("examUpdateid").value = id;
						document.getElementById("examPlanUpdateid").value = examPaper;
						document.getElementById("modifyexamName").value = data.name;
						document.getElementById("modifyexamStart").value = data.examStart;
						document.getElementById("modifyexamEnd").value = data.examEnd;
						document.getElementById("modifyexamPassScore").value = data.passScore;
						document.getElementById("modifyexmaNum").value = data.examNum;
						
						document.getElementById("modifyexamDuration").value = data.duration;
//				 		if(( data.examName == "Y")||( data.examName == "y")){
//				 			document.getElementById("examRandomOrder").checked = true;
//				 		}
//				 		else{
//				 			document.getElementById("examRandomOrder").checked = false;
//				 		}
				 		
				 		//document.getElementById("modifyexmaNum").value = data.examName ;
				 		
				    	var modifyexamPattern = document.getElementById("modifyexamPattern");   
				    	for(var i=0; i<modifyexamPattern.options.length; i++){  
				    	    if(modifyexamPattern.options[i].value == data.paperMode ){  
				    	    	modifyexamPattern.options[i].selected = true;  
				    	        break;  
				    	    }  
				    	}
				    	var modifyexamAchievementRelease = document.getElementById("modifyexamAchievementRelease");   
				    	for(var i=0; i<modifyexamAchievementRelease.options.length; i++){  
				    	    if(modifyexamAchievementRelease.options[i].value == data.examAnswerPublish.value.mode ){  
				    	    	modifyexamAchievementRelease.options[i].selected = true;  
				    	        break;  
				    	    }  
				    	}
				    	
				    	document.getElementById("modifydelayTime").value = data.examAnswerPublish.value.delayDuration;
				    	
				 		document.getElementById("modifyexamNotice").value = data.examNotice;
				 		
			        }
			    });
			}
    		
    		break;
    	}
 		
    }
    else {
        alert("请选择一行");
    }
}


/*提交课程信息*/
function updateCourse() {
	
	// 调用数据校验
	var isPass = checkData(dataCourse);
	// 判断校验是否成功
	if(!isPass){
		return;
	}
	
	/*if($.trim($("#courseName").val()) == "")
	{$(".Bomb-box").html("请填写课程名称");}*/
	
	var courseName= $.trim($("#courseName").val());
	var courseType= $.trim($("#courseType").val());
	var courseClassifications= $.trim($("#courseClassifications").val());
	var lesson_order= $.trim($("#lesson_order").val());
	var introduction= $.trim($("#introduction").val());
	
	if(lesson_order == ""){
		lesson_order = "M";
	}
	
	//当前课时表中的数据
	var lessonDataTemp = getTableData();
//	console.log(lessonDataTemp);
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
	courseData.trainLog = trainLog;
	courseData.state = $("#courseType").val() == 'M'?'A':'N';
	
	courseData.knowledgePointId = Number(knowledgePointId);
	courseData.id = Number(ID);

	//
	
	var strDate = JSON.stringify(courseData);
	
	console.log(strDate);
    $.ajax({
        type: "POST",
        url: "jv/course/update.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
        	window.location.href="../../../views/courseList.jsp";
        }
    });
}




//树


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
    	onClick: zTreeOnClick
    }
};

function xmlAjax(){

	$http.ajax({
	    type: "GET",
	    url: "jv/knowledgepoint/list.do",
	    data: null,
	    dataType: "json",
	    success: function(data){
//	    		console.log("树:" + data);
				data = JSON.parse(data);
				zNodes = createTreeData(data);
	               	//console.log(zNodes);

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
	
	tableAjax(1,maxVisible,true,searchName,"","A","courseList");
}




/*搜索*/
function searchPaper(obj) {
	//alert("dsaddf");
	var searchExamPaperName = $.trim($("#searchExamPaperName").val());
	tableAjax(1,maxVisible,true,searchExamPaperName,"","","examPaperList");
}


/*修改搜索*/
function searchModifyPaper(obj) {
	//alert("dsaddf");
	var searchModifyExamPaperName = $.trim($("#searchModifyExamPaperName").val());
	tableAjax(1,maxVisible,true,searchModifyExamPaperName,"","","examPaperList");
}



//选中知识点
function chooseKl(obj) {
	xmlAjax();
}


//选中前置课程
function choosePreCourse(obj) {
	tableAjax(1,maxVisible,true,"","","A","courseList");
}



/*$(document).ready(function(){
    App.init();
    tableAjax(1,maxVisible,true,"","","","courseList");
    xmlAjax();
});*/
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
/*防止挂机*/

$("#modifyLessonAvoidIdle").click(function(){
	if($(this).parent().hasClass("checked")){ // 当前已选中
		$("#myHangup2").hide();
		return;
	}
	$("#myHangup2").show();
});

$("#lessonAvoidIdle").click(function(){
	if($(this).parent().hasClass("checked")){ // 当前已选中
		$("#myHangup1").hide();
		return;
	}
	$("#myHangup1").show();
});

//修改模态框的学习和考试
var mystudy1 = document.getElementById("mystudy1");
var myExamination1 = document.getElementById("myExamination1");
var modifyCourseType = document.getElementById("modifyCourseType");
modifyCourseType.onchange = function (){
	var val = this.value;
	switch (val){
	 case "E":
		 mystudy1.style.display = "block";
		 myExamination1.style.display = "none";
         break;
     case "X":
    	 mystudy1.style.display = "none";
    	 myExamination1.style.display = "block";
         break;
	}
}

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

var mycDelayed = document.getElementById("mycDelayed");
var modifyexamAchievementRelease = document.getElementById("modifyexamAchievementRelease");
modifyexamAchievementRelease.onchange = function (){
	var val = this.value;
	if(val == "延时发布"){
		 mycDelayed.style.display = "block";
	}else{
		mycDelayed.style.display = "none";
	}
}


$(".up-move").live("click",function(){
	var current =  $(this).closest("tr");
	var prev = current.prev("tr");
	if(prev.length == 0) return;
	prev.before(current.clone());
	current.remove();
	
	var trs = $("tbody#addLesson_tbody").children("tr");
	var td = null;
	for(var i=0;i<trs.length;i++){
		td = $(trs[i]).find("td.sequence");
		td.text(i);
	}
});

$(".down-move").live("click",function(){
	var current =  $(this).closest("tr");
	var next = current.next("tr");
	if(next.length == 0) return;
	next.after(current.clone());
	current.remove();
	
	var trs = $("tbody#addLesson_tbody").children("tr");
	var td = null;
	for(var i=0;i<trs.length;i++){
		td = $(trs[i]).find("td.sequence");
		td.text(i);
	}
	
});
$("#lessonAvoidIdle").click(function(){
	if($(this).parent().hasClass("checked")){ // 当前已选中
		$("#myHangup1").hide();
		return;
	}
	$("#myHangup1").show();
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
