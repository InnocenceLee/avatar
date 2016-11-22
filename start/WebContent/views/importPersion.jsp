<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->

<!--[if !IE]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<head>
<title>我的课程</title>
<meta content="" name="description" />
<meta content="" name="author" />
<!--强制使用ie的edge兼容模式-->
<meta http-equiv="X-UA-COMPATIBLE" content="IE=edge" />
<c:import url="common/head.jsp"></c:import>
<!-- BEGIN PAGE LEVEL STYLES -->

<!-- <link rel="stylesheet" href="../css/DT_bootstrap.css" /> -->

<!-- 分页 -->
<link rel="stylesheet" href="/start/css/common/page.css" />

<!--当前页-->
<link rel="stylesheet" href="/start/css/common/common.css">
<!-- END PAGE LEVEL STYLES -->
</head>
<!-- BEGIN BODY -->
<body class="page-header-fixed" index="3">

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
					<h3 class="page-title">员工导入</h3>

					<!-- END PAGE TITLE & BREADCRUMB-->

				</div>
			</div>
			<!-- ---------------------搜索条件------------------------------------------- -->
			<div class="row-fluid">
				<button class="btn blue myredbtn1" data-toggle="modal"
					data-target="#myAddPersionModal">导入excel文件</button>
				<button class="btn blue myredbtn1" onclick="submitPersionDate()">上传数据</button>
			</div>
			<div class="row-fluid">
				<div class="span12">
					<!-- BEGIN EXAMPLE TABLE PORTLET-->
					<div class="portlet box light-grey">
						<div class="portlet-body">
							<table class="table table-striped table-bordered table-hover"
								id="sample_1">
								<thead>
									<tr>
										<th>员工编号</th>
										<th>等级</th>
										<th>姓名</th>
										<th>客舱乘务检查员</th>
										<th>客舱乘务教员</th>
										<th>B类教员</th>
										<th>晋级乘务长带飞教员</th>
										<th>国际线资格培训</th>
										<th>330资格</th>
										<th>精品</th>
										<th>广播员</th>
										<th>拉萨</th>
										<th>专包机</th>
										<th>干部</th>
										<th>教员</th>
										<th>班组长</th>
									</tr>
								</thead>
								<tbody id="planList_tbody">

								</tbody>

							</table>
						</div>
						<!-- END PAGE -->
					</div>

					<c:import url="common/bottom.jsp"></c:import>
					<!-- BEGIN PAGE LEVEL PLUGINS -->
					<div id="myAddPersionModal" class="modal hide fade" tabindex="-1"
						data-width="760">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true"></button>
							<h4 class="modal-title" id="myModalLabel3">导入人员</h4>
						</div>
						<div class="modal-body">
							<div class="control-group" id="myEagroup1">
								<div class="row-fluid">
									<form method="POST" enctype="multipart/form-data" id="form1">
										<td>导入员工:</td>
										<td><input id="upfile" type="file" name="upfile"></td>

									</form>
								</div>

							</div>

						</div>
						<div class="modal-footer">
							<button type="button" data-dismiss="modal" class="btn">取消</button>
							<button type="button" onclick="updata()" class="btn blue">确定</button>
						</div>
					</div>
					<!--分页-->
					<script src="/start/js/common/twilight.js" type="text/javascript"></script>
					<script src="/start/js/common/ui.ajaxpager.js"
						type="text/javascript"></script>
					<script src="/start/js/staff/staffCourseList.js"
						type="text/javascript"></script>
					<script src="/start/js/upload/jquery.form.js"
						type="text/javascript"></script>
					<script src="/start/js/learnPlay/importPerson.js"
						type="text/javascript"></script>
					<!-- END PAGE LEVEL PLUGINS -->

					<!-- BEGIN PAGE LEVEL SCRIPTS -->
					<script src="/start/js/common/sidebar.js" type="text/javascript"></script>
					<script src="/start/js/app.js"></script>
</body>
<!-- END BODY -->
</html>