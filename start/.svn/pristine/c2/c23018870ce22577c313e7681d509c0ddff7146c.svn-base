<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->

<!-- BEGIN HEAD -->
<head>
	<title>员工登录查看成绩</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->

	<link rel="stylesheet" type="text/css" href="../css/select2_metro.css" />

	<link rel="stylesheet" href="../css/DT_bootstrap.css" />

	<!-- END PAGE LEVEL STYLES -->

	<!--当前页-->
    <link rel="stylesheet" href="../css/common/common.css">
    <link rel="stylesheet" href="../css/staff/staffExam.css">
    <style type="text/css">
   	.hide{
   		display: none;
   	}
   	.list {
   	    overflow-y: auto;
   	}
    </style>
    </head>
    <!-- BEGIN BODY -->
<body class="page-header-fixed inner-scrollable" code="studtent_exam">
	<c:import url="common/top.jsp"></c:import> 	
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
	    <c:import url="common/sidebar.jsp"></c:import>
		<div class="page-content" id="mySerpage">
			<div class="row-fluid">
				<div class="span12">
					<h3 class="page-title">题目结果管理</h3>
				</div>
			</div>
			<div class="control-group">
				<div class="controls">
				   <span class="begintime"></span>&#12288;&#12288;
				   <span id="Surplus" class="endtime"></span>
				   <button id="mySerOpener" class="btn red myeqmbtn3" onclick="window.location.href='staffExamList.jsp'">退出</button>
				   <button class="btn red myeqmbtn3 hide re-exam" onclick="exam()">重新考试</button>
                   <br>
                   <span class="myScoreSpan"></span>
				</div>
			</div>
			<!-- 题目列表一 -->
		    <div class="list"></div>	
	    </div>
	</div>

    <c:import url="common/bottom.jsp"></c:import>
	<script src="../js/common/sidebar.js" type="text/javascript"></script>
	<script src="../js/app.js" type="text/javascript"></script>
    <script src="../js/staff/staffExamResult.js"></script>

</body>

<!-- END BODY -->
</html>