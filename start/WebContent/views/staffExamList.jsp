<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<title>我的考试</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->

	<link rel="stylesheet" href="../css/DT_bootstrap.css" />
	
    <!-- 分页 -->
    <link rel="stylesheet" href="../css/common/page.css"/>
    
   	<!--当前页-->
    <link rel="stylesheet" href="../css/common/common.css">
	<!-- END PAGE LEVEL STYLES -->
	
	<style type="text/css">
		.state-active{
			background-color: #2D94FF !important;
		}
		.state-close{
		    background-color: #C6C6C6 !important;
		}
		.list-plan  a{
			text-decoration: none;
		}
	</style>
</head>
    <!-- BEGIN BODY -->
<body class="page-header-fixed" code="studtent_exam">

	<c:import url="common/top.jsp"></c:import> 	
	
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
			<!-- BEGIN SIDEBAR -->
		<c:import url="common/sidebar.jsp"></c:import>
		<!-- BEGIN PAGE CONTAINER-->
		<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
		<div class="page-content" id="mySelPage">
            <!-- BEGIN PAGE HEADER-->
            <div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                    <h3 class="page-title">
                      考试列表
                    </h3>

                    <!-- END PAGE TITLE & BREADCRUMB-->

                </div>

            </div>
                <!-- ---------------------搜索条件------------------------------------------- -->
                <div class="control-group">
                        <span class="myAllCondition">名称:</span>
                        <input class="m-wrap mycondition" size="16" type="text" name="name" />               
                        <button id="mySelOpener4" class="btn blue myredbtn1 btn-serach" >搜索</button>
                </div>

            <!-- END PAGE HEADER-->

            <!-- BEGIN PAGE CONTENT-->   
            						<!-- 列表一 -->
         		<div class="list-plan">
         		<!-- 
					<div class="portlet-body" id="myPortetBody1">
					<h5>地面服务入职考试</h5>
						<p class="subject">考试时间：2016-5-2</p>
	                             <p class="subject">考试时长：100分钟</p>
						<p id="mystate">未参加</p>
						<p id="mySeloperation">已过期</p>
					</div>		
					列表二
					<div class="portlet-body" id="myPortetBody2">
					<h5>地面服务入职考试</h5>
						<p class="subject">考试时间：2016-5-2</p>
	                             <p class="subject">考试时长：100分钟</p>
						<p id="mystate">90分</p>
						<p id="mySeloperation"><span onclick='viewDetail()'>查看详情</span></p>
					</div>					
					列表三
					<div class="portlet-body" id="myPortetBody3">
					<h5>地面服务入职考试</h5>
						<p class="subject">考试时间：2016-5-2</p>
	                             <p class="subject">考试时长：100分钟</p>
						<p id="mystate">立即考试</p>
						<p id="mySeloperation"><span onclick='exam()'>前往考试</span></p>
					</div>					
					列表四
					<div class="portlet-body" id="myPortetBody4">
					<h5>地面服务入职考试</h5>
						<p class="subject">考试时间：2016-5-2</p>
	                             <p class="subject">考试时长：100分钟</p>
						<p id="mystate">未开始</p>
						<p id="mySeloperation">未开始</p>
					</div>	
					 -->
					
				</div>								
       	</div>
        <!-- END PAGE -->
    </div>

	<c:import url="common/bottom.jsp"></c:import>
		<!-- BEGIN PAGE LEVEL PLUGINS -->
     
	<c:import url="common/commonAlert.jsp"></c:import>
<script type="text/javascript" src="../js/httpclient.js"></script>
	<!--分页-->
	<script src="../js/common/twilight.js" type="text/javascript"></script>
	<script src="../js/common/ui.ajaxpager.js" type="text/javascript"></script>
	<script src="../js/common/sidebar.js" type="text/javascript"></script>

	<!-- END PAGE LEVEL PLUGINS -->
	
	<script src="../js/staff/staffExamList.js"></script>

	<!-- BEGIN PAGE LEVEL SCRIPTS -->
    <script src="../js/notify/addNotify.js"></script>
	<script src="../js/app.js"></script>
		
</body>

<!-- END BODY -->
</html>