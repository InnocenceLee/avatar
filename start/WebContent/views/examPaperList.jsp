<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="perm" uri="/mytaglib/permission"%>
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
<title>试卷列表</title>

<meta content="" name="description" />
<meta content="" name="author" />
<!--强制使用ie的edge兼容模式-->
<meta http-equiv="X-UA-COMPATIBLE" content="IE=edge" />

<c:import url="common/head.jsp"></c:import>
<!-- BEGIN PAGE LEVEL STYLES -->

<link rel="stylesheet" type="text/css" href="../css/select2_metro.css" />

<link rel="stylesheet" href="../css/DT_bootstrap.css" />

<!-- END PAGE LEVEL STYLES -->

<link rel="shortcut icon" href="../image/favicon.ico" />
<!--当前页-->
<link rel="stylesheet" href="../css/common/common.css">

<!-- 分页 -->
<link rel="stylesheet" href="../css/common/page.css" />
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
		<div class="page-content" id="myeplPage">
			<!-- BEGIN PAGE HEADER-->
			<div class="row-fluid">
				<div class="span12">
					<!-- BEGIN PAGE TITLE & BREADCRUMB-->
					<h3 class="page-title">
					   试卷管理 <i class="icon-angle-right"></i>
                       试卷列表
					</h3>

					<!-- END PAGE TITLE & BREADCRUMB-->

				</div>

			</div>
			<!-- ---------------------搜索条件------------------------------------------- -->
			<div class="control-group">
				<span class="myAllCondition">试卷名称:</span> <input
					class="small m-wrap mycondition" size="16" type="text" value=""
					id="searchName" /> <span class="myAllCondition">考试方式:</span> <select
					class="small m-wrap mycondition" tabindex="1">
					<option value="Category 1">线上自主</option>
				</select>
				<!--   <span class="myAllCondition">选题方式:</span> <select
					class="small m-wrap mycondition" tabindex="1" id="searchMode">
					<option value="">全部</option>
					<option value="S">手动</option>
					<option value="Z">随机</option>
				</select>-->
				<button class="btn blue" onclick="search()">搜索</button>
			</div>
			<div style="clear: both;"></div>
			<div class="control-group">
				<perm:checkPerm permissionCode="exam_paper_list.add">
					<button id="basic_opener3" class="btn blue myredbtn1"
						onclick="window.location.href='examPaperAdd.jsp'">新增</button>
				</perm:checkPerm>
				<perm:checkPerm permissionCode="exam_paper_list.delete">
					<button class="btn red myredbtn1" data-toggle='modal'
						data-target='#myDelModal'>删除</button>
				</perm:checkPerm>
			</div>
			<!-- END PAGE HEADER-->

			<!-- BEGIN PAGE CONTENT-->

			<div class="row-fluid">

				<div class="span12">

					<!-- BEGIN EXAMPLE TABLE PORTLET-->

					<div class="portlet box light-grey">

						<div class="portlet-body">

							<table class="table table-striped table-bordered table-hover"
								id="sample_1">

								<thead>

									<tr>

										<th style="width: 8px;"></th>
										<th class="hidden-480">名称</th>
										<th>考试方式</th>
										<th class="hidden-480">选题方式</th>
<!-- 										<th class="hidden-480">难度系数</th> -->
										<th class="hidden-480">题目数</th>
										<th class="hidden-480">总分数</th>
										<th class="hidden-480">创建者</th>
										<th class="hidden-480">所属单位(部门或科室)</th>
										<th class="hidden-480">创建时间</th>
										<th class="hidden-480">状态</th>
										<th>管理</th>
										<th></th>

									</tr>

								</thead>

								<tbody id="List_tbody">



								</tbody>

							</table>

							<!--////////////////分页//////////////-->
							<div class="container-fluid">
								<div id="ui-pager" class="ui-pager">
									<div id="ui-pager-wrap" class="ui-pager-wrap">
										<div id="ui-page-num" class="ui-page-num">
											<a id="prev" class="prev disable">&lt;</a> <a id="next"
												href="#" class="next">&gt;</a> 共<em id="page-count"
												class="page-count"></em>页，到第 <input id="target-page-text"
												class="target-page-text" type="text">页 <a
												id="target-page-btn" class="target-page-btn">确定</a>
										</div>
									</div>
								</div>
							</div>
							<!-- 点击查看触发的Modal -->
							<!-- Modal -->
							<div class="modal fade" id="myDelModal" tabindex="-1"
								role="dialog" aria-labelledby="myModalLabel"
								style="display: none;">
								<div class="modal-dialog" role="document">
									<div class="modal-content">
										<div class="modal-header">
											<button type="button" class="close" data-dismiss="modal"
												aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
											<h4 class="modal-title" id="myModalLabel">操作提示</h4>
										</div>
										<div class="modal-body">
											<p id="delP">你确定要删除你选择的数据吗</p>
											<p>
												<input class="hidden" id="delName" type="text" readonly />
												<input class="hidden" id="delId" type="hidden"
													disable="disable" />
											</p>

										</div>
										<div class="modal-footer">
											<span style="margin-right: 50px" class="Bomb-box"></span>
											<button type="button" class="btn btn-default"
												data-dismiss="modal">取消</button>
											<button id="myDelBtn" type="button"
												class="btn btn-primary blue">确定</button>
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
	</div>

	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<c:import url="common/bottom.jsp"></c:import>

	<c:import url="common/commonAlert.jsp"></c:import>
	<script type="text/javascript" src="../js/httpclient.js"></script>

	<script type="text/javascript" src="../js/examPaper/examPaperList.js"></script>

	<!--分页-->
	<script src="../js/common/twilight.js" type="text/javascript"></script>
	<script src="../js/common/ui.ajaxpager.js" type="text/javascript"></script>


	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->

	<script src="../js/app.js"></script>
	<script src="../js/common/sidebar.js" type="text/javascript"></script>
	<script type="text/javascript">
			$(function(){
				getKonwledgePoints();
			})
	</script>


</body>

<!-- END BODY -->
</html>