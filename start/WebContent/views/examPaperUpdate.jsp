<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--强制使用ie的edge兼容模式-->
<meta http-equiv="X-UA-COMPATIBLE" content="IE=edge" />
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
<title>修改试卷</title>
<meta content="" name="description" />
<meta content="" name="author" />
<c:import url="common/head.jsp"></c:import>
<!-- BEGIN PAGE LEVEL STYLES -->
<link rel="stylesheet" type="text/css" href="../css/select2_metro.css" />

<link rel="stylesheet" href="../css/DT_bootstrap.css" />
<link rel="stylesheet" href="../css/common/metro.css">
<!--当前页-->
<link rel="stylesheet" href="../css/common/common.css">
</head>
<!-- BEGIN BODY -->
<body class="page-header-fixed" code="exam_paper"
	sub-code="exam_paper_list">
	<c:import url="common/top.jsp"></c:import>
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
		<!-- BEGIN SIDEBAR -->
		<c:import url="common/sidebar.jsp"></c:import>


		<!-- BEGIN PAGE CONTAINER-->
		<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
		<div class="page-content" id="myEpapage">
			<!-- BEGIN PAGE HEADER-->

			<div class="row-fluid">

				<div class="span12">

					<!-- BEGIN PAGE TITLE & BREADCRUMB-->
					<h3 class="page-title">
						试卷管理 <i class="icon-angle-right"></i> 修改试卷
					</h3>

					<!-- END PAGE TITLE & BREADCRUMB-->

				</div>

			</div>
			<!-- ---------------------基本信息------------------------------------------- -->
			<div class="tab-content">
				<!-- BEGIN FORM-->
				<h4 class="media-heading">基本信息</h4>
				<input type="hidden" name="id" id="id" value="${param.id}">
				<form action="jv/examPaper/add.do" class="form-horizontal"
					id="addexamPaperForm" onsubmit="validata()" method="post">
					<div class="control-group">
						<label class="control-label">&#12288;试卷名称：</label>
						<div class="controls mycontrols">
							<input type="text" class="m-wrap large" name="name"
								id="paperName">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">&#12288;&#12288;知识点：</label>
						<div class="controls mycontrols">
							<input id="klName" class="large m-wrap" type="text"
								readonly="readonly" /> <img class="myKpselector"
								src="../images/preCourseIcon.png" data-toggle="modal"
								data-target="#mycuModal"></i>
							<!-- <i class="icon-zoom-in" data-toggle="modal" data-target="#mycuModal"></i> -->
							<input type="hidden" name="knowledges" id="knowledges">
						</div>
					</div>

					<!-- 点击搜索按钮触发的Modal -->
					<div id="mycuModal" class="modal hide fade" tabindex="-1"
						data-width="760">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true"></button>
							<h4 class="modal-title" id="myModalLabel3">选择知识点</h4>
						</div>
						<div class="modal-body">
							<div class="row">
								<ul id="jtree" class="ztree"
									style="width: 500px; overflow: auto;"></ul>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" data-dismiss="modal" class="btn">取消</button>
							<button id="klBtn" type="button" class="btn blue">确定</button>
						</div>
					</div>

					<div class="control-group">

						<label class="control-label">&#12288;选题方式：</label>

						<div class="controls mycontrols">
							<select class="large m-wrap" tabindex="1" name="mode">
								<option value="S">手动</option>
								<option value="Z">随机</option>
								<option value="D">word导入</option>
							</select>
						</div>
					</div>
					<div class="control-group" id="difficulty" style="display: none">
						<label class="control-label">&#12288;难度系数：</label>
						<div class="controls mycontrols">
							<select class="large m-wrap" tabindex="1" name="difficulty">
								<option value="3">难</option>
								<option value="2">中</option>
								<option value="1">易</option>
							</select>
						</div>
					</div>
					<!--  题型 -->
					<div class="control-group" id="question-type" style="display: none">
						<label class="control-label myAllCondition" style="height: 100px;">&#12288;题型数量：</label>
						<div class="controls mycontrols">
							<span class="questions myAllCondition">单选题：</span> <input
								type="text" class="m-wrap small myepasmall" id="s_num">
							<span class="myAllCondition">个题</span>
							<div></div>
							<br> <span class="questions myAllCondition">多选题：</span> <input
								type="text" class="m-wrap small myepasmall" id="m_num">
							<span class="myAllCondition">个题</span>
							<div></div>
							<br> <span class="questions myAllCondition">判断题：</span> <input
								type="text" class="m-wrap small myepasmall" id="c_num">
							<span class="myAllCondition">个题</span>
						</div>
					</div>
					<div class="control-group" id="question-acount"
						style="display: none">
						<label class="control-label">&#12288;题目总数：</label>
						<div class="controls mycontrols">
							<input type="text" class="m-wrap large" name="question_count"
								readonly="readonly">
						</div>
					</div>
					<!--题目分数-->
					<div class="control-group">
						<label class="control-label myAllCondition" style="height: 100px;">&#12288;题目分数：</label>
						<span class="myAllCondition">单选题：</span> <input id="singleScore"
							type="text" class="m-wrap small myepasmall"> <span
							class="myAllCondition">分/题</span>
						<div></div>
						<br> <span class="myAllCondition">多选题：</span> <input
							id="multipleScore" type="text" class="m-wrap small myepasmall">
						<span class="myAllCondition">分/题</span>
						<div></div>
						<br> <span class="myAllCondition">判断题：</span> <input
							id="judgeScore" type="text" class="m-wrap small myepasmall">
						<span class="myAllCondition">分/题</span>
					</div>


					<div class="control-group">
						<label class="control-label">&#12288;试卷描述：</label>
						<div class="controls mycontrols">
							<textarea class="large m-wrap mywrap" name="discribe" rows="6"
								id="paperDiscribe"></textarea>
						</div>
					</div>
				</form>
				<button type="button" id="mysure" class="btn blue" onclick="save()">保存</button>

				<!-- END PAGE -->

			</div>

		</div>
		<!-- BEGIN PAGE LEVEL PLUGINS -->
		<c:import url="common/bottom.jsp"></c:import>

		<c:import url="common/commonAlert.jsp"></c:import>

		<script type="text/javascript" src="../js/httpclient.js"></script>
		<script src="../js/common/jquery.ztree.all-3.5.min.js"></script>
		<script type="text/javascript" src="../js/examPaper/examPaperUpdate.js"></script>

		<!-- 数据校验 -->
		<script src="../js/common/checkData.js" type="text/javascript"></script>

		<!-- END PAGE LEVEL PLUGINS -->

		<!-- BEGIN PAGE LEVEL SCRIPTS -->
		<script src="../js/common/sidebar.js" type="text/javascript"></script>
		<script src="../js/app.js"></script>
		<script type="text/javascript">
			$(function(){
				getKonwledgePoints();
			})
		</script>
</body>

<!-- END BODY -->
</html>