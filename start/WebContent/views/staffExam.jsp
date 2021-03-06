<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->

<!-- BEGIN HEAD -->
<head>
	<title>员工登录考试</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->

	<link rel="stylesheet" type="text/css" href="../css/select2_metro.css" />

	<link rel="stylesheet" href="../css/DT_bootstrap.css" />
	<style type="text/css">
		.chq{
			display: none !important;
		}
		
	    .question-end {
	        overflow-y: auto;
	    }
	</style>

	<!--当前页-->
    <link rel="stylesheet" href="../css/common/common.css">
    <link rel="stylesheet" href="../css/staff/staffExam.css">
	<!-- END PAGE LEVEL STYLES -->
</head>
<!-- BEGIN BODY -->
<body class="page-header-fixed wide inner-scrollable">
	<c:import url="common/top.jsp"></c:import> 	
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
			<!-- BEGIN SIDEBAR -->
		<!-- BEGIN PAGE CONTAINER-->
			<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
			<div class="page-content" id="mySepage">

				<!-- BEGIN PAGE HEADER-->

				<div class="row-fluid">

					<div class="span12">

						<!-- BEGIN PAGE TITLE & BREADCRUMB-->
						<h3 class="page-title">
							考试
						</h3>

						<!-- END PAGE TITLE & BREADCRUMB-->

					</div>

				</div>
				<div class="control-group">
					<div class="controls">
					   <span>开始作答时间：<span name="beginTime">获取中<span></span></span>&#12288;&#12288;
					   <span id="Surplus">剩余时间：<span class="mySurplus1">获取中</span></span>
					   <button id="mySeOpener" class="btn blue myeqmbtn3" onclick="sumbitPaper()">交卷</button>
					   <input type="hidden" name="pid" value="${param.pid}">
					   <input type="hidden" name="eid" value="${param.eid}">
					   <input type="hidden" name="paid" value="${param.paid}">
					   <input type="hidden" name="duration" value="${param.duration}">
					</div>
				</div>
				
				 <h4 class="media-heading">题目列表</h4>
				 
			     <!-- 不能删除 -->
		         <div class="question-end"></div>
		         <div class="control-group">
					<div class="controls">
						<button class="btn blue myeqmbtn3 chq up" onclick="change()" disabled="disabled" style="float: left;">上一题</button>
						<button class="btn blue myeqmbtn3 chq down" onclick="change('1')">下一题</button>
					</div>
				 </div>
		         
		</div>
	</div>
	
	<!-- 模板 -->
	<div class="portlet box yellow question" id="templet" style="display: none;">
	     <div class="portlet-title">
		     <div class="caption"><span name="no"></span>、<span name="type"></span></div>
	     </div>
		 <div class="portlet-body">
			    <p class="subject" name="title"></p>
				<div class="controls optionlist">
					<label class="radio option" style="display: none;">
						<input type="radio" name="optionsRadios1" value="option1">
						<span name="option-title"></span>、<span name="option-content"></span>
					</label>
				</div>
		   </div>
	  </div>
	

		<!-- BEGIN PAGE LEVEL PLUGINS -->
     <c:import url="common/commonAlert.jsp"></c:import>
     <c:import url="common/bottom.jsp"></c:import>
     
     <script src="../js/httpclient.js"></script>
	 <script src="../js/staff/staffExam.js"></script>
	<!-- END PAGE LEVEL PLUGINS -->
      <script src="../js/notify/addNotify.js"></script>
      <script src="../js/app.js"></script>
	<!-- BEGIN PAGE LEVEL SCRIPTS -->			
</body>

<!-- END BODY -->
</html>