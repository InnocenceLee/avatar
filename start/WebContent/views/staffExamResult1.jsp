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
			<div class="page-content" id="mySerpage">

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
						   <span>开始作答时间：2016-5-10 14:40</span>&#12288;&#12288;
						   <span id="Surplus">介绍作答时间：2016-5-10 16:40</span>
						   <span class="myScoreSpan">总分：90</span>
							<button id="mySerOpener" class="btn red myeqmbtn3">退出</button>
						</div>
					</div>
				</form>				
				 <!-- 题目列表一 -->
				 <div class="portlet box yellow">

							<div class="portlet-title">

								<div class="caption">一、单选题</div>
                                <!--  <span class="myeqmspan1">标签:<span class="mySerSubject">数学题</span></span>  -->                                
                                 <span class="myeqmspan1">结果:<span class="myResultSpan1">正确</span></span>                             
							</div>
							<div class="portlet-body">
								<p class="subject">
                                         已知两个数字为1~30之间的数字，甲知道两数之和，乙知道两数之积，甲问乙：“你知道是哪两个数吗？”
                                    乙说：“不知道”，甲问乙：“你知道是哪两个数吗？”甲说：“也不知道”。于是，乙说：“那我知道了”，随后甲也说：“那我也知道了”。这两个数是什么？
								</p>
								<div class="control-group">
								  <div class="controls">
									 <label class="radio">
										  <input type="radio" name="optionsRadios1" value="option1">A、2
									 </label>
									 <label class="radio">
										  <input type="radio" name="optionsRadios1" value="option2">B、2
									   </label>  
										<label class="radio">
											<input type="radio" name="optionsRadios1" value="option3">C、2
										 </label>  
                                          <label class="radio">
												<input type="radio" name="optionsRadios1" value="option4">D、2
										  </label>  
										 </div>
										</div>		
												<p class="subject">正确答案：C</p>
												<p class="subject">解析：指对有关问题所做的解答。语出茅盾《陀螺》五：生命、宇宙以及任何事物的终极答案。</p>
							</div>
						</div>
						<!-- 题目列表二 -->
							<div class="portlet box yellow">

							<div class="portlet-title">

								<div class="caption">一、单选题</div>
                                 <!-- <span class="myeqmspan1">标签:<span class="mySerSubject">数学题</span></span>    -->                              
                                 <span class="myeqmspan1">结果:<span class="myResultSpan2">错误</span></span>                             
							</div>
							<div class="portlet-body">
								<p class="subject">
                                         已知两个数字为1~30之间的数字，甲知道两数之和，乙知道两数之积，甲问乙：“你知道是哪两个数吗？”
                                    乙说：“不知道”，甲问乙：“你知道是哪两个数吗？”甲说：“也不知道”。于是，乙说：“那我知道了”，随后甲也说：“那我也知道了”。这两个数是什么？
								</p>
								<div class="control-group">
								  <div class="controls">
									 <label class="radio">
										  <input type="radio" name="optionsRadios1" value="option1">A、2
									 </label>
									 <label class="radio">
										  <input type="radio" name="optionsRadios1" value="option2">B、2
									   </label>  
										<label class="radio">
											<input type="radio" name="optionsRadios1" value="option3">C、2
										 </label>  
                                          <label class="radio">
												<input type="radio" name="optionsRadios1" value="option4">D、2
										  </label>  
										 </div>
										</div>				
												<p class="subject">正确答案：C</p>
												<p class="subject">解析：指对有关问题所做的解答。语出茅盾《陀螺》五：生命、宇宙以及任何事物的终极答案。</p>
							</div>
						</div>	
						<!-- 题目列表一三-->
				 <div class="portlet box yellow">

							<div class="portlet-title">

								<div class="caption">一、单选题</div>
                                 <!-- <span class="myeqmspan1">标签:<span class="mySerSubject">数学题</span></span> -->                                 
                                 <span class="myeqmspan1">结果:<span class="myResultSpan1">正确</span></span>                             
							</div>
							<div class="portlet-body">
								<p class="subject">
                                         已知两个数字为1~30之间的数字，甲知道两数之和，乙知道两数之积，甲问乙：“你知道是哪两个数吗？”
                                    乙说：“不知道”，甲问乙：“你知道是哪两个数吗？”甲说：“也不知道”。于是，乙说：“那我知道了”，随后甲也说：“那我也知道了”。这两个数是什么？
								</p>
								<div class="control-group">
								  <div class="controls">
									 <label class="radio">
										  <input type="radio" name="optionsRadios1" value="option1">A、2
									 </label>
									 <label class="radio">
										  <input type="radio" name="optionsRadios1" value="option2">B、2
									   </label>  
										<label class="radio">
											<input type="radio" name="optionsRadios1" value="option3">C、2
										 </label>  
                                          <label class="radio">
												<input type="radio" name="optionsRadios1" value="option4">D、2
										  </label>  
										 </div>
										</div>		
												<p class="subject">正确答案：C</p>
												<p class="subject">解析：指对有关问题所做的解答。语出茅盾《陀螺》五：生命、宇宙以及任何事物的终极答案。</p>
							</div>
						</div>				
		</div>
		</div>

		<!-- BEGIN PAGE LEVEL PLUGINS -->
     <c:import url="common/bottom.jsp"></c:import>
      <script src="../js/notify/addNotify.js"></script>
      <script src="../js/app.js"></script>
	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->			
</body>

<!-- END BODY -->
</html>