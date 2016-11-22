<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>课程管理</title>
<script type="text/javascript">

	
	function list(){
		var obj = {'page':1,'size':6};
		var strDate = JSON.stringify(obj);
		$.ajax({
             type: "GET",
             url: "jv/course/list.do",
             data:{'data':strDate} ,
             dataType: "json",
             success: function(data){
            	 		console.log(data);
                      }
         });
	}
	
	function listauditing(){
		$.ajax({
	         type: "GET",
	         url: "jv/course/listauditing.do",
	         data: null,
	         dataType: "json",
	         success: function(data){
	        	 console.log(data);
	                     alert(data);
	                  }
	     });
	}
	
	function detail(){
		$.ajax({
             type: "GET",
             url: "jv/lesson/list.do",
             data: {
            	 'id' : 1002
             },
             dataType: "json",
             success: function(data){
                         console.log(data);
                      }
         });
	}

	function add(){
		var courseName,courseTrainType,courseLessonClassifications,courseKnowledgePoint,courseIntroduction,coursePreCourses,courseLessonOrder;
		var lessonName,lessonJionSystem,lessonKnowledgePoint,lessonDragFlag,lessonAvoidIdle,lessonIntroduction;
		var coursewareName,coursewareTrainCourseLesson,coursewareFilename,coursewareMime,coursewareRemarks,coursewareType,coursewareUploadLog,coursewareUploadDate;
		
		courseName = $("#courseName").val();
		courseTrainType = $("#courseTrainType").val();
		courseLessonClassifications = $("#courseLessonClassifications").val();
		courseKnowledgePoint = $("#courseKnowledgePoint").val();
		courseIntroduction = $("#courseIntroduction").val();
		coursePreCourses = $("#coursePreCourses").val();
		courseLessonOrder = $("#courseLessonOrder").val();
		
		lessonName = $("#lessonName").val();
		lessonJionSystem = $("#lessonJionSystem").val();
		lessonKnowledgePoint = $("#lessonKnowledgePoint").val();
		lessonDragFlag = $("#lessonDragFlag").val();
		lessonAvoidIdle = $("#lessonAvoidIdle").val();
		lessonIntroduction = $("#lessonIntroduction").val();
		
		coursewareName = $("#coursewareName").val();
		coursewareTrainCourseLesson = $("#coursewareTrainCourseLesson").val();
		coursewareFilename = $("#coursewareFilename").val();
		coursewareMime = $("#coursewareMime").val();
		coursewareRemarks = $("#coursewareRemarks").val();
		coursewareType = $("#coursewareType").val();
		coursewareUploadLog = $("#coursewareUploadLog").val();
		coursewareUploadDate = $("#coursewareUploadDate").val();
		/* var b = {};
		var a ={};
		var 2562165=[];
		var 2 = {};
		var 3 = {};
		3.name=3;
		3.name=3;
		3.name=3;
		3.name=3;
		2.name =-fdsds;
		2.courseware =3;
		lesson.push(2);
		a.lesson=lesson;
		b.course= a; */
		
		var data = {
			'course':{
				'name':courseName,
				'trainType':courseTrainType,
				'lessonClassifications':courseLessonClassifications,
				'knowledgePoint':10,
				'introduction':courseIntroduction,
				'preCourses':[1001,1002],
				'state':'N',
				'trainLog':{'log':'log'},
				'lessonOrder':courseLessonOrder,
				'lesson':[
				 	{
				 		'name':lessonName,
				 		'jionSystem':lessonJionSystem,
				 		'knowledgePoint':10,
				 		'dragFlag':lessonDragFlag,
				 		'duration':120,
				 		'avoidIdle':null,/* {'idleDuration': 3, 'resetDuration': 2}, */
				 		'type':'E',
				 		'introduction':lessonIntroduction,
				 		'sequence':1,
				 		'courseware':{
					 		'name':coursewareName,
					 		'trainCourseLesson':coursewareTrainCourseLesson,
					 		'filename':coursewareFilename,
					 		'mime':coursewareMime,
					 		'remarks':coursewareRemarks,
					 		'type':coursewareType,
					 		'uploadLog':coursewareUploadLog,
					 		'uploadDate':coursewareUploadDate
				 		}
				 	},
				 	{
				 		'name':lessonName,
				 		'jionSystem':lessonJionSystem,
				 		'knowledgePoint':10,
				 		'dragFlag':lessonDragFlag,
				 		'avoidIdle':null,/* {'idleDuration': 3, 'resetDuration': 2}, */
				 		'duration':120,
				 		'type':'E',
				 		'introduction':lessonIntroduction,
				 		'sequence':2,
				 		'courseware':{
					 		'name':coursewareName,
					 		'trainCourseLesson':coursewareTrainCourseLesson,
					 		'filename':coursewareFilename,
					 		'mime':coursewareMime,
					 		'remarks':coursewareRemarks,
					 		'type':coursewareType,
					 		'uploadLog':coursewareUploadLog,
					 		'uploadDate':coursewareUploadDate
				 		}
				 	}
				 ]
			}
		}
		
		alert('add');
		
		$.ajax({
             type: "POST",
             url: "jv/course/add.do",
             data: {
            	 'data':JSON.stringify(data)
             },
             dataType: "json",
             success: function(data1){
                         alert(data1);
                      }
         });
	}

	function del(){
		var id
		id = $("#id").val();
		
		$.ajax({
             type: "POST",
             url: "jv/course/del.do",
             data: {data : "{'data' : [ {'id' : 1001},{'id' : 2},{'id' : 30}]}"},
             dataType: "json",
             success: function(data1){
                         alert(data1);
                      }
         });
	}

	function update(){
		var courseName,courseTrainType,courseLessonClassifications,courseKnowledgePoint,courseIntroduction,coursePreCourses,courseLessonOrder
		var lessonName,lessonJionSystem,lessonKnowledgePoint,lessonDragFlag,lessonAvoidIdle,lessonIntroduction
		var coursewareName,coursewareTrainCourseLesson,coursewareFilename,coursewareMime,coursewareRemarks,coursewareType,coursewareUploadLog,coursewareUploadDate
		
		courseName = $("#courseName").val();
		courseTrainType = $("#courseTrainType").val();
		courseLessonClassifications = $("#courseLessonClassifications").val();
		courseKnowledgePoint = $("#courseKnowledgePoint").val();
		courseIntroduction = $("#courseIntroduction").val();
		coursePreCourses = $("#coursePreCourses").val();
		courseLessonOrder = $("#courseLessonOrder").val();
		
		lessonName = $("#lessonName").val();
		lessonJionSystem = $("#lessonJionSystem").val();
		lessonKnowledgePoint = $("#lessonKnowledgePoint").val();
		lessonDragFlag = $("#lessonDragFlag").val();
		lessonAvoidIdle = $("#lessonAvoidIdle").val();
		lessonIntroduction = $("#lessonIntroduction").val();
		
		coursewareName = $("#coursewareName").val();
		coursewareTrainCourseLesson = $("#coursewareTrainCourseLesson").val();
		coursewareFilename = $("#coursewareFilename").val();
		coursewareMime = $("#coursewareMime").val();
		coursewareRemarks = $("#coursewareRemarks").val();
		coursewareType = $("#coursewareType").val();
		coursewareUploadLog = $("#coursewareUploadLog").val();
		coursewareUploadDate = $("#coursewareUploadDate").val();
		
		var data = {
			'course':{
				'name':courseName,
				'trainType':courseTrainType,
				'lessonClassifications':courseLessonClassifications,
				'knowledgePoint':courseKnowledgePoint,
				'introduction':courseIntroduction,
				'preCourses':coursePreCourses,
				'lessonOrder':courseLessonOrder,
				'lesson':[
				 	{
				 		'name':lessonName,
				 		'jionSystem':'Y',
				 		'knowledgePoint':lessonKnowledgePoint,
				 		'dragFlag':lessonDragFlag,
				 		'avoidIdle':lessonAvoidIdle,
				 		'type':'E',
				 		'introduction':lessonIntroduction,
				 		'courseware':{
					 		'name':coursewareName,
					 		'trainCourseLesson':coursewareTrainCourseLesson,
					 		'filename':coursewareFilename,
					 		'mime':coursewareMime,
					 		'remarks':coursewareRemarks,
					 		'type':coursewareType,
					 		'uploadLog':coursewareUploadLog,
					 		'uploadDate':coursewareUploadDate
				 		}
				 	},
				 	{
				 		'name':lessonName,
				 		'jionSystem':lessonJionSystem,
				 		'knowledgePoint':lessonKnowledgePoint,
				 		'dragFlag':lessonDragFlag,
				 		'type':'E',
				 		'avoidIdle':lessonAvoidIdle,
				 		'introduction':lessonIntroduction,
				 		'courseware':{
					 		'name':coursewareName,
					 		'trainCourseLesson':coursewareTrainCourseLesson,
					 		'filename':coursewareFilename,
					 		'mime':coursewareMime,
					 		'remarks':coursewareRemarks,
					 		'type':coursewareType,
					 		'uploadLog':coursewareUploadLog,
					 		'uploadDate':coursewareUploadDate
				 		}
				 	}
				 ]
			}
		}
		
		var id = 10;
		alert(data);
		alert(1);
		$.ajax({
             type: "POST",
             url: "jv/course/update.do",
             data: data,
             dataType: "json",
             success: function(data){
                         alert(data);
                      }
         });
	}
	
	
</script>
</head>
<body>
	<div>
		<button onclick="list()">查询列表</button>
	</div>
	<div>
		<button onclick="listauditing()">查询审核列表</button>
	</div>
	
	<br><br>
	<div>
		<button onclick="detail()">查询课程详情</button>
	</div>
	
	<br><br>
	
	<div>
		新增课程
		课程基本信息:course
		基本信息
 		课程名称： <input id="courseName" name="name" type="text">
		<br>
		课程类型： <input id="courseTrainType" name="trainType" type="text">
		<br>
		课程类别： <input id="courseLessonClassifications" name="lessonClassifications" type="text">
		<br>
		知识点： <input id="courseKnowledgePoint" name="knowledgePoint" type="text">
		<br>
		课程描述： <input id="courseIntroduction" name="introduction" type="text">
		<br>
		前置课程： <input id="coursePreCourses" name="preCourses" type="text">
		<br>
		课时顺序固定： <input id="courseLessonOrder" name="lessonOrder" type="text">
		<br>
		
		课时信息：lesson
		课件信息
		课时名称： <input id="lessonName" name="name" type="text">
		<br>
		加入知识体系： <input id="lessonJionSystem" name="jionSystem" type="text">
		<br>
		知识点： <input id="lessonKnowledgePoint" name="knowledgePoint" type="text">
		<br>
		禁止拖动播放进度： <input id="lessonDragFlag" name="dragFlag" type="text">
		<br>
		防止挂机（随机验证码）： <input id="lessonAvoidIdle" name="avoidIdle" type="text">
		<br>
		课时描述： <input id="lessonIntroduction" name="introduction" type="text">
		<br>
		
		课件信息：courseware
		
		名字： <input id="coursewareName" name="name" type="text">
		<br>
		所属课时： <input id="coursewareTrainCourseLesson" name="trainCourseLesson" type="text">
		<br>
		文件名： <input id="coursewareFilename" name="filename" type="text">
		<br>
		格式： <input id="coursewareMime" name="mime" type="text">
		<br>
		课件描述： <input id="coursewareRemarks" name="remarks" type="text">
		<br>
		类型： <input id="coursewareType" name="type" type="text">
		<br>
		上传记录： <input id="coursewareUploadLog" name="uploadLog" type="text">
		<br>
		上传时间： <input id="coursewareUploadDate" name="uploadDate" type="text">
		<br>
		
		<button onclick="add()">新增课程</button>
	</div>
	
	<br><br>
	
	<div>
		删除课程(没有校验数据类型，但是业务功能上，只可能是数字，而且不能输入)
 		标题: <input id="id" name="id" type="text">
		<br>
		<button onclick="del()">删除课程</button>
	</div>
	
	<br><br>
	
	<div>
		修改课程
 		标题: <input id="title2" name="title2" type="text">
		<br>
		说明: <input id="remarks3" name="remarks3" type="text">
		<br>
		<button onclick="update()">修改课程</button>
	</div>
</body>
</html>