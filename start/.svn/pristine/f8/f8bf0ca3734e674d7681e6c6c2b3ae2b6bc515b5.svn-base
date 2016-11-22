<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
 
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
 
<!--[if !IE]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<title>我的课程</title>
	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>
	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->

	<!-- <link rel="stylesheet" href="../css/DT_bootstrap.css" /> -->
    
        <!-- 分页 -->
    <link rel="stylesheet" href="../css/common/page.css"/>
    
   	<!--当前页-->
    <link rel="stylesheet" href="../css/common/common.css">
	<!-- END PAGE LEVEL STYLES -->
</head>
    <!-- BEGIN BODY -->
<body class="page-header-fixed" code="studtent_course">

	<c:import url="common/top.jsp"></c:import> 	
	
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
			<!-- BEGIN SIDEBAR -->
		<c:import url="common/sidebar.jsp"></c:import>
		<!-- BEGIN PAGE CONTAINER-->
		<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
		<div class="page-content" id="mySclPage">
            <!-- BEGIN PAGE HEADER-->
            <div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                    <h3 class="page-title">
                      课程列表
                    </h3>

                    <!-- END PAGE TITLE & BREADCRUMB-->

                </div>

            </div>
              <!-- ---------------------搜索条件------------------------------------------- -->
              <div class="control-group">
                      <span class="myAllCondition">课程名称:</span>
                      <input class="m-wrap mycondition" size="16" type="text" id="searchName" placeholder="课程名称" />
                      <!-- <input class="m-wrap" size="16" type="text" value="" id="mySclpicker2"/> -->
                      <button class="btn blue myredbtn1 mysearchbtn1" onclick="search()">搜索</button>
              </div>
       	
            <!-- END PAGE HEADER-->

            <!-- BEGIN PAGE CONTENT-->
            <div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
                    <div class="portlet box light-grey">
                        <div class="portlet-body">
                            <table class="table table-striped table-bordered table-hover" id="sample_1">
                                <thead>
                                <tr>
                                    <!-- <th style="width:8px;"><input type="checkbox" class="checkboxes" value="1" /></th> -->
                                    <th>课程名称</th>
                                    <th>类型</th>
                                    <th>已学课时数</th>
                                    <th>总课时数</th>
                                    <th>培训进度</th>
                                    <!--  <th>已学习时间</th>-->
                                    <th>状态</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody id="staffCourseList_tbody">
                               
                                </tbody>

                            </table>

					        <!--////////////////分页//////////////-->
					        <div class="container-fluid">
					            <div id="ui-pager" class="ui-pager">
					                <div id="ui-pager-wrap" class="ui-pager-wrap">
					                    <div id="ui-page-num" class="ui-page-num">
					                        <a id="prev" class="prev disable">&lt;</a> 
					                        <a id="next" href="#" class="next">&gt;</a>
				                        	共<em id="page-count" class="page-count"></em>页，到第
				                        	 <input id="target-page-text" class="target-page-text" type="text">页 
				                        	 <a id="target-page-btn" class="target-page-btn">确定</a>
					                    </div>
					                </div>
					            </div>
					        </div>
					                                        
                        </div>
                    </div>
                    <!-- END EXAMPLE TABLE PORTLET-->
                </div>
            </div>
       	</div>
        <!-- END PAGE -->
    </div>

	<c:import url="common/bottom.jsp"></c:import>
	<c:import url="common/commonAlert.jsp"></c:import>
	<!-- BEGIN PAGE LEVEL PLUGINS -->

	<!--分页-->
	<script src="../js/common/twilight.js" type="text/javascript"></script>
	<script src="../js/common/ui.ajaxpager.js" type="text/javascript"></script>
	<script src="../js/staff/staffCourseList.js" type="text/javascript"></script>
		
	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->
    <script src="../js/common/sidebar.js" type="text/javascript"></script>
	<script src="../js/app.js"></script>
			
</body>
<!-- END BODY -->
</html>