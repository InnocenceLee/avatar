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
	<title>试卷题目管理</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->

	<link rel="stylesheet" type="text/css" href="../css/select2_metro.css" />

	<link rel="stylesheet" href="../css/DT_bootstrap.css" />

	<!-- END PAGE LEVEL STYLES -->

	<link rel="shortcut icon" href="../image/favicon.ico" />
	<!--当前页-->
    <link rel="stylesheet" href="../css/common/common.css">
    <!-- 分页 -->
    <link rel="stylesheet" href="../css/common/page.css"/>
    </head>
    <!-- BEGIN BODY -->
<body class="page-header-fixed">
	<c:import url="common/top.jsp"></c:import> 	
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
			<!-- BEGIN SIDEBAR -->
		<c:import url="common/sidebar.jsp"></c:import>
		<!-- BEGIN PAGE CONTAINER-->
			<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
			<div class="page-content">

				<!-- BEGIN PAGE HEADER-->

				<div class="row-fluid">

					<div class="span12">

						<!-- BEGIN PAGE TITLE & BREADCRUMB-->
						<h3 class="page-title">
							题目结果管理
						</h3>

						<!-- END PAGE TITLE & BREADCRUMB-->

					</div>

				</div>
				<form action="#" class="form-horizontal form-row-seperated">
					<div class="control-group">
						<div class="controls">
						<label class="checkbox myeqmcheckbox">
                                <input type="checkbox" value="" />全选
                            </label>
							<button id="basic_opener4" class="btn red myeqmbtn1">删除</button>
							<button id="basic_opener4" class="btn myeqmbtn2 blue">新增</button>
							<button id="basic_opener4" class="btn blue myeqmbtn3">重新生成</button>
						</div>

					</div>
				</form>
				 <h4 class="media-heading">题目列表</h4>
				 <!-- 题目列表一 -->
				 <div class="portlet box yellow">

							<div class="portlet-title">

								<div class="caption"> <input type="checkbox" value="" />一、单选题</div>
                                 <span class="myeqmspan1">标签：数学题</span>
							</div>
							<div class="portlet-body">
								<p class="subject">
                                         已知两个数字为1~30之间的数字，甲知道两数之和，乙知道两数之积，甲问乙：“你知道是哪两个数吗？”
                                    乙说：“不知道”，甲问乙：“你知道是哪两个数吗？”甲说：“也不知道”。于是，乙说：“那我知道了”，随后甲也说：“那我也知道了”。这两个数是什么？
								</p>

								<div class="control-group">
													<div class="controls">
														<label class="radio">
														<input type="radio" name="optionsRadios1" value="option1">
														A、2
														</label>
														<label class="radio">
														<input type="radio" name="optionsRadios1" value="option2" checked="">
														B、2
														</label>  
														<label class="radio">
														<input type="radio" name="optionsRadios1" value="option2">
														C、2
														</label>  
                                                        <label class="radio">
														<input type="radio" name="optionsRadios1" value="option2">
														D、2
														</label>  
													</div>
												</div>					
							</div>
						</div>
						<!-- 题目列表二 -->
							 <div class="portlet box yellow">

							<div class="portlet-title">

								<div class="caption"> <input type="checkbox" value="" />二、单选题</div>
                                 <span class="myeqmspan1">标签：安全题目</span>
							</div>
							
							<div class="portlet-body">
								<p class="subject">
                                         已知两个数字为1~30之间的数字，甲知道两数之和，乙知道两数之积，甲问乙：“你知道是哪两个数吗？”
                                    乙说：“不知道”，甲问乙：“你知道是哪两个数吗？”甲说：“也不知道”。于是，乙说：“那我知道了”，随后甲也说：“那我也知道了”。这两个数是什么？
								</p>

								<div class="control-group">
													<div class="controls">
														<label class="radio">
														<input type="radio" name="optionsRadios1" value="option1">
														A、2
														</label>
														<label class="radio">
														<input type="radio" name="optionsRadios1" value="option2" checked="">
														B、2
														</label>  
														<label class="radio">
														<input type="radio" name="optionsRadios1" value="option2">
														C、2
														</label>  
                                                        <label class="radio">
														<input type="radio" name="optionsRadios1" value="option2">
														D、2
														</label>  
													</div>
												</div>					
							</div>

						</div>
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
						<button type="button" id="mysure" class="btn red">提交</button>

		</div>
		</div>

		<!-- BEGIN PAGE LEVEL PLUGINS -->
     <c:import url="common/bottom.jsp"></c:import>
	<script type="text/javascript" src="../js/select2.min.js"></script>

	<script type="text/javascript" src="../js/jquery.dataTables.js"></script>

	<script type="text/javascript" src="../js/DT_bootstrap.js"></script>

	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<!--分页-->
	<script src="../js/common/twilight.js" type="text/javascript"></script>
	<script src="../js/common/ui.ajaxpager.js" type="text/javascript"></script>

	<script src="../js/app.js"></script>
	<script src="../js/charts.js"></script>   

	<!-- <script src="../js/table-managed.js"></script>      -->
<script>


jQuery(document).ready(function() {       

   // initiate layout and plugins

   App.init();

   Charts.init();

   Charts.initCharts();

   Charts.initPieCharts();

});


</script>
			
</body>

<!-- END BODY -->
</html>