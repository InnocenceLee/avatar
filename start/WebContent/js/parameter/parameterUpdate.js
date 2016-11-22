/**
 * Created by Administrator on 2016/7/11.
 */

//modify by lyh 20160718
var pageIndex;
var totleNum = 0;
//每段的页码数量
var maxVisible = 10;

//设置对象
var parameterData = {};

$(document).ready(function(){
    App.init();
    
});


$(function() {
	  //清除弹框内容  
	 $(".clean-data").click(function(){
		 $(".Bomb-box").html("");
		 $(".Bomb-box").val("");
		 $(".parameterCheck").prop("checked",false);
	 })

	 // 添加           
 	$("#addLessonBtn").click(function(){
 		if($("#lessonName").val() == ""){
 			$(".Bomb-box").html("请填写课时名称");
 			return false;
 			}
 		if($("#lessonIntroduction").val() == ""){
 			$(".Bomb-box").html("请填写课程描述");
 			return false;
 			}
 		
 		var lessonName=$("#lessonName").val();
 		var courseType=$("#courseType").val();
 		var lessonJionSystem=$("#lessonJionSystem").val();
 		var coursewareFilename=$("#coursewareFilename").val();
 		var lessonDragFlag=$("#lessonDragFlag").val();
 		var lessonAvoidIdle=$("#lessonAvoidIdle").val();
 		var lessonIntroduction=$("#lessonIntroduction").val();
 		//填写临时课时数据
 		var tempData = {};
 		var tempWare = {};
 		tempData.name = lessonName;
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
 		tempData.jionSystem = lessonJionSystem;
 		tempWare.filename = coursewareFilename;
 		tempData.courseware = tempWare;
 		tempData.dragFlag = lessonDragFlag;
 		tempData.avoidIdle = null;
 		tempData.introduction = lessonIntroduction;
 		tempData.sequence = sequence;
 		lessonData.push(tempData);
 		console.log(lessonData);
 		addTable(lessonData);
 		sequence += 1;
 		
 		$('#myAddModal').modal('hide');
	})

	
});



/*提交配置信息*/
function addCourse() {
	if($("#parameterDate").val() == "")
	{$(".Bomb-box").html("请填写到期默认提醒天数");}
	if($("#parameterTime").val() == "")
	{$(".Bomb-box").html("请填写考试截止时间");}
	if($("#parameterInterval").val() == "")
	{$(".Bomb-box").html("请填写验证码间隔时间");}
	if($("#parameterPass").val() == "")
	{$(".Bomb-box").html("请填写及格分数");}
	if($("#parameterLength").val() == "")
	{$(".Bomb-box").html("请填写考试时长");}
	
	var parameterDate=$("#parameterDate").val();
	/*设置选择*/
	var parameterOrder = $("#parameterOrder").val();
	var parameterSchedule = $("#parameterSchedule").val();
	var parameterHang = $("#parameterHang").val();
	var parameterTime=$("#parameterTime").val();
	
	var parameterInterval=$("#parameterInterval").val();
	var parameterPass = $("#parameterPass").val();
	var parameterLength=$("#parameterLength").val();
	var parameterOrder=$("#parameterOrder").val();
	//试卷
	//IP端
	var parameterTotalNumber=$("#parameterTotalNumber").val();
	var parameterIp=$("#parameterIp").val();
	var parameterIp1=$("#parameterIp1").val();
	/*题型*/
	var parameterTotalNumber=$("#parameterJudgment").val();
	var parameterChoice=$("#parameterChoice").val();
	var parameterChoice1=$("#parameterChoice1").val();
	//填写课程数据
	parameterData.name = courseName
	courseData.trainType = courseType;
	courseData.lessonClassifications = courseClassifications;
	//页面少知识点选择
	//courseData.preCourses
	//courseData.knowledgePoint = courseType;
	//end
	courseData.introduction = introduction;
	courseData.lessonOrder = lesson_order;
	courseData.lesson = lessonData;
	courseData.trainLog = null;
	
	var strDate = JSON.stringify(courseData);
	
	//console.log("tableAjax参数： "+strDate);
    $.ajax({
        type: "POST",
        url: "jv/course/list.do",
        data: {'course':strDate},
        dataType: "json",
        success: function(data){
        	console.log(data);
        	window.location.href="views/courseList.jsp";
        }
    });
}
