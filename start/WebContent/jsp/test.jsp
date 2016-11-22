 	<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

<script type="text/javascript">


/* function test(){
	alert(1);
	var obj = {
		 name : "数学课",
		 trainType : "S",
		 state : "N",
		 preCourses : [1002],
		 lessonOrder : "M",
		 introduction : "描述修改",
		 knowledgePoint : 5,
		 knowledgePointId : 7,
		 id : 1001,
		 lesson : [
		  {
		   id : 1004,
		   name : "函数3",
		   jionSystem : "N",
		   dragFlag : "Y",
		   avoidIdle : {},
		   introduction : "描述3修改",
		   courseware : {
		    trainCourseLesson : 1004,
		    filename : "xxxxxx",
		    id : 4
		   }
		  },
		  {
		   name : "课时新增1",
		   jionSystem : "N",
		   dragFlag : "Y",
		   trainCourse : 1001,
		   duration : 120,
		   type : 'E',
		   avoidIdle : {},
		   introduction : "描述新增1",
		   drag_flag : 'N',
		   sequence : 1,
		   courseware : {
		    trainCourseLesson : 1004,
		    filename : "xxxxxxssss"
		   }
		  }
		 ]
		};
	var strDate = JSON.stringify(obj);
	alert(obj);
	$.ajax({
         type: "POST",
         url: "jv/course/update.do",
         data: {'data':strDate},
         dataType: "json",
         success: function(data){
                     alert(data);
                  }
     });
} */
 /* function test(){
	alert(1);
	var obj = {
			 data : [
			         21
			        ]
			       };
	var strDate = JSON.stringify(obj);
	alert(obj);
	$.ajax({
         type: "POST",
         url: "jv/course/del.do",
         data: {'data':strDate},
         dataType: "json",
         success: function(data){
                     alert(data);
                  }
     });
}  */

	/*  function test(){
		alert(1);
		 var obj   = {
				 course : {
					  name : "新增fdsaf撒旦",
					  introduction : "introduction可以不写2",
					  enName : "enName可以不写2",
					  remarks : "remarks可以不写2",
					  knowledgePoint : 5,//可以不写
					  lessonOrder : "S",
					  preCourses : [
					   1002,1003
					  ],
					  trainType : "S",
					  state : "N",
					  trainLog : {},
					  lessonClassifications : "课程类别2",
					  person : 1,
					  lesson : [
					    {
					     jionSystem : "N",
					     name : "新增课时21",
					     introduction : "introduction可以不写21",
					     //trainCourse : "",
					     duration : 75,
					     type : "E",
					     //knowledgePoint : "",
					     //examPaper : "",
					     dragFlag : "N",
					     avoidIdle : {},
					     sequence : 1,
					     courseware : {
					      filename : "xxxxxxxx"
					     }
					   },
					   {
					     jionSystem : "N",
					     name : "新增课时22",
					     introduction : "introduction可以不写22",
					     //trainCourse : "",
					     duration : 80,
					     type : "E",
					     //knowledgePoint : "",
					     //examPaper : "",
					     dragFlag : "N",
					     avoidIdle : {},
					     sequence : 2,
					     courseware : {
					      filename : "xxxxxssssss"
					     }
					   }
					  ]
					 }
					};   
		
		var strDate = JSON.stringify(obj);
		alert(obj);
		$.ajax({
	         type: "POST",
	         url: "jv/course/add.do",
	         data: {'data':strDate},
	         dataType: "json",
	         success: function(data){
	                     alert(data);
	                  }
     });
}  */
/* function test(){
	alert(1);
	var obj = {
			 'page' : 1,
			 'size' : 10,
			'id' : 1001
			};
	var strDate = JSON.stringify(obj);
	alert(obj);
	$.ajax({
         type: "GET",
         url: "jv/lesson/list.do",
         data: {'data' : strDate},
         dataType: "json",
         success: function(data){
                     alert(data);
                  }
     });
} */

/* function testjsb(){
	$.ajax({
         type: "POST",
         url: "jv/test/testjsb.do",
         data: null,
         dataType: "json",
         success: function(data){
                     alert(data);
                  }
     });
} */



/* function test(){
	alert(1);
	var obj = {
			 name : ''
			};
	var strDate = JSON.stringify(obj);
	alert(obj);
	$.ajax({
         type: "GET",
         url: "jv/exam/liststudent.do",
         data: {'name':'dd'},
         dataType: "json",
         success: function(data){
                     alert(data);
                  }
     });
} */
/* 
function test(){
	alert(1);
	var obj = {"page":1,"size":2,"name":""};
	var strDate = JSON.stringify(obj);
	alert(obj);
	$.ajax({
         type: "GET",
         url: "jv/learnplan/list.do",
         data: {'data' : strDate},
         dataType: "json",
         success: function(data){
                     alert(data);
                  }
     });
} */
/* function test(){
	alert(1);
	var obj = {
			 'id' : 1
			};
	var strDate = JSON.stringify(obj);
	alert(obj);
	$.ajax({
         type: "GET",
         url: "jv/learnplan/detail.do",
         data: obj,
         dataType: "json",
         success: function(data){
                     alert(data);
                  }
     });
} */
/* function test(){
	alert(1);
	var obj = {
			'page':1,
			'size':10,
			 'id' : 1
			};
	var strDate = JSON.stringify(obj);
	alert(obj);
	$.ajax({
         type: "GET",
         url: "jv/learnplan/coursecontent.do",
         data: {'data':strDate},
         dataType: "json",
         success: function(data){
                     alert(data);
                  }
     });
} */
/* function test(){
	alert(1);
	var obj = {"page":1,"size":2,"id":3};
	var strDate = JSON.stringify(obj);
	alert(obj);
	$.ajax({
         type: "GET",
         url: "jv/learnplan/person.do",
         data: {'data':strDate},
         dataType: "json",
         success: function(data){
                     alert(data);
                  }
     });
} */
/* function test(){
	alert(1);
	var obj = {
			 'id' : 1
			};
	var strDate = JSON.stringify(obj);
	alert(obj);
	$.ajax({
         type: "GET",
         url: "jv/learnplan/person.do",
         data: obj,
         dataType: "json",
         success: function(data){
                     alert(data);
                  }
     });
} */

/* function test(){
	alert(1);
	var obj = {"trainBatchStart":"2016-07-06","trainBatchEnd":"2016-07-29","name":"幅度萨芬","describe":"范德萨范德萨分是","students":[1,2],"courses":[1001,1002],"planner":1};
	var strDate = JSON.stringify(obj);
	alert(obj);
	$.ajax({
         type: "POST",
         url: "jv/learnplan/add.do",
         data: {'data':strDate},
         dataType: "json",
         success: function(data){
                     alert(data);
                  }
     });
} */

/* function test(){
	alert(1);
	var obj = {
			 'id' : [1,2,3]
	};
	var strDate = JSON.stringify(obj);
	alert(obj);
	$.ajax({
         type: "POST",
         url: "jv/learnplan/delplan.do",
         data: {'data':strDate},
         dataType: "json",
         success: function(data){
                     alert(data);
                  }
     });
} */
/* function test(){
	alert(1);
	var obj = {
			 'trainBatchStart' : "2016-07-06",
			 'trainBatchEnd' : "2016-07-29",
			 'id' : 5,
			 'students' : [1,2,3],
			 'courses' : [1001,1002],
			 'describe' : "范德萨范德萨分是",
			 'name' : "幅度萨芬",
			 'planner' : 1
			};
	var strDate = JSON.stringify(obj);
	alert(obj);
	$.ajax({
         type: "POST",
         url: "jv/learnplan/update.do",
         data: {'data':strDate},
         dataType: "json",
         success: function(data){
                     alert(data);
                  }
     });
} */


/* function test(){
	alert(1);
	var obj = {"page":1,"size":10,"personId":"","personName":"","nodeName":"","state":"","courseId":1001,"planId":3};
	var strDate = JSON.stringify(obj);
	alert(obj);
	$.ajax({
         type: "GET",
         url: "jv/lesson/learnlog.do",
         data: {'data':strDate},
         dataType: "json",
         success: function(data){
                     alert(data);
                  }
     });
} */

/* function test(){
	alert(1);
	var obj = {"page":1,"size":10};
	var strDate = JSON.stringify(obj);
	alert(obj);
	$.ajax({
         type: "GET",
         url: "jv/exam/list.do",
         data: {'data':strDate},
         dataType: "json",
         success: function(data){
                     alert(data);
                  }
     });
} */

function test(){
	alert(1);
	var obj = {"page":1,"size":10};
	var strDate = JSON.stringify(obj);
	alert(obj);
	$.ajax({
         type: "POST",
         url: "jv/exam/add.do",
         data: {'data':strDate},
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
		<button onclick="test()">test</button>
	</div>
	<!-- <div>
		<button onclick="testjsb()">testjsb</button>
	</div> -->
</body>
</html>

