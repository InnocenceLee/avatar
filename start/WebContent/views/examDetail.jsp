<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->

<!-- BEGIN HEAD -->
<head>
<title>考试详情</title>

<meta content="" name="description" />
<meta content="" name="author" />
<!--强制使用ie的edge兼容模式-->
<meta http-equiv="X-UA-COMPATIBLE" content="IE=edge" />

<c:import url="common/head.jsp"></c:import>
<!-- BEGIN PAGE LEVEL STYLES -->

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/DT_bootstrap.css" />
<link href="${pageContext.request.contextPath}/css/jquery.gritter.css"
	rel="stylesheet" type="text/css" />

<!-- END PAGE LEVEL STYLES -->

<link rel="shortcut icon"
	href="${pageContext.request.contextPath}/image/favicon.ico" />
<!--当前页-->
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/common/common.css">
<!-- 分页 -->
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/common/page.css" />
</head>
<!-- BEGIN BODY -->
<body class="page-header-fixed" code="exam" sub-code="exam_list">
	<c:import url="common/top.jsp"></c:import>
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
		<!-- BEGIN SIDEBAR -->
		<c:import url="common/sidebar.jsp"></c:import>
		<!-- BEGIN PAGE CONTAINER-->
		<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
		<div class="page-content " id="myEdPage">
			<div class="row-fluid">
				<div class="span12">
					<h3 class="page-title">
						考试管理 <i class="icon-angle-right"></i> 考试详情
					</h3>
					<form action="#" class="form-horizontal">
						<div class="media">
							<!-- -----------------基本信息-------------------- -->
							<div class="media-body">
								<h4 class="media-heading myKnowtitle">基本信息</h4>
								<p>
									考试名称：${data.examName}</span>
								</p>
								<p>
									考试时间：
									<fmt:formatDate value="${data.examStart }" pattern="yyyy-MM-dd HH:mm" />
									~
									<fmt:formatDate value="${data.examEnd }" pattern="yyyy-MM-dd HH:mm" />
								</p>
								<p>
									考试类别：${data.examClassifications}</span>
								</p>
								<p>考试类型：${data.examType}</p>
								<p>考试时长：${data.duration }分钟</p>
								<div class="control-group">
									<label class="control-label" style="margin-top: 0;padding-top: 0;">考试须知：</label>
									<div class="controls mycontrols">${data.examNotice}</div>
								</div>
							</div>
							<!-- -----------------考试控制-------------------- -->
							<div class="media-body">
								<h4 class="media-heading myKnowtitle">考试控制</h4>
								<p>答题模式：${data.paperMode =='O'?'全部显示':'每次显示一道题'}</p>
								<p name="public">成绩发布：</p>
							</div>
							<!-- -----------------试卷选择-------------------- -->
							<div class="media-body">
								<h4 class="media-heading myKnowtitle">试卷选择</h4>
								<input type="hidden" value="${data.examPaperId }" name="pid">
								<p>
									${data.examPaperName}<a class="btn btn-primary btn-lg" id="mybefor2"
										href="${pageContext.request.contextPath}/views/examPaperDetail.jsp?id=${data.examPaperId}"
										style="line-height: 28px; height: 28px"> 查看试卷</a>
								</p>
							</div>
							<!-- -----------------考试统计信息-------------------- -->
							<div class="media-body">
								<h4 class="media-heading myKnowtitle">考试统计信息</h4>
								<c:set value="${data.statistic }" var="count" />
								<p>
									最高分：${count.maxNum == null ? 0 : count.maxNum}分&#12288;&#12288;&#12288;
									<span>最低分：${count.minNum == null ? 0 : count.minNum}分</span>&#12288;&#12288;&#12288;
									<span>平均分：${count.avgNum == null ? 0 : count.avgNum*1}分</span>
								</p>
								<p>
									应考人数：${count.studentsNum == null ? 0 : count.studentsNum }人&#12288;&#12288;
									<span>已考人数：${count.endNum == null ? 0 : count.endNum }人</span>&#12288;&#12288;
									<span>未考人数：${count.missNum == null ? 0 : count.missNum }人</span>&#12288;&#12288;
									<span>及格人数：${count.passNum == null ? 0 : count.passNum }人</span>&#12288;&#12288;
									<span>不及格人数：${count.unPassNum == null ? 0 : count.unPassNum }人</span>&#12288;&#12288;
									<%-- <span>及格率：${count.passnum + count.unpassnum != '0' ? count.passnum/(count.passnum + count.unpassnum) : 100}%</span></p>  --%>
							</div>
						</div>
					</form>

					<h4 class="media-heading">参考人员信息</h4>
					<c:forEach items="${data.students }" var="obj">
						<input type="hidden" name="students" value="${obj}">
					</c:forEach>
					<!-- ---------------------参考人员信息------------------------------------------- -->
					<div class="control-group" id="myEagroup1">
						<span class="myAllCondition">员工ID:</span> <input class="m-wrap"
							size="16" type="text" id="uid" /> <span class="myAllCondition">员工姓名:</span>
						<input class="m-wrap" size="16" type="text" id="uname" /> <span
							class="myAllCondition">所属部门:</span> <input class="m-wrap"
							size="16" type="text" id="node" />
						<button class="btn blue " onclick="serach()">搜索</button>
						<button class="btn red myredbtn1" data-toggle='modal'
							data-target='#myDelModal'>导出成绩</button>

					</div>
					<div class="portlet-body">
						<table class="table table-striped table-bordered table-hover"
							id="myedTable1">
							<thead>
								<tr>
									<th style="width: 8px;"></th>
									<th>员工ID</th>
									<th class="hidden-480">员工姓名</th>
									<th class="hidden-480">所属部门</th>
								</tr>
							</thead>
							<tbody id="notifyPerson_table">



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
					</div>
					<!-- -----------------------统计信息----------------------  -->
					<!-- 3. Add the container -->
					<div id="myOrganization" class="row" style="display: none;">
						<h4 class="span11" id="myOstitle">统计信息</h4>
						<div id="myStatistical" class="span5">
							<h4>机构统计</h4>

							<div id="main" style="width: 480px; height: 200px;"></div>

							<!-- <p id="myp1">共15条</p> -->
							<table class="table table-striped table-bordered table-hover"
								id="mySoTable1">
								<thead>
									<tr>
										<th>组名称</th>
										<th>应考人数</th>
										<th>参考人数</th>
										<th>及格人数</th>
										<th>不及格人数</th>
										<th>最高分</th>
										<th>最低分</th>
										<th>平均分</th>
									</tr>
								</thead>
								<tbody id="nodeList_tbody">


								</tbody>

							</table>
						</div>

						<div id="chart" class="span5"
							style="width: 600px; height: 400px; color: aqua;"></div>

						<div id="myDistribution" class="span10">
							<h4>题型分布</h4>
							<div id="mychart1"
								style="width: 500px; height: 400px; margin: 0px 0 0 0px;"></div>
						</div>
					</div>
				</div>
			</div>
			<!--  <p class="mybtnp2">
                    <button type="button"  class="btn blue myepdred">保存</button>
                    <button type="button"  class="btn red myepdblue">保存并关闭</button>
                </p> -->
		</div>
	</div>

	<div class="modal fade" id="myDelModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" style="display: none;">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close"></button>
					<h4 class="modal-title" id="myModalLabel">选择导出方式</h4>
				</div>
	
				<div class="modal-body">
					<form action="/start/views/jv/exam/ajaxExport.do?type=all&id=${param.id}&name=${data.examName}"
						method=post id="form2" style="float: left;">
						<input type="submit" class="btn btn-primary blue" value="导出所有成绩"></input>
					</form>
					<form action="/start/views/jv/exam/ajaxExport.do?type=top&id=${param.id}&name=${data.examName}"
						method=post id="form2" style="float: left;margin-left: 10px;">
						<input type="submit" class="btn btn-primary blue" value="导出学员最高分成绩"></input>
					</form>
					<form action="/start/views/jv/exam/ajaxExport.do?type=pass&id=${param.id}&name=${data.examName}"
						method=post id="form2" style="float: left;margin-left: 10px;">
						<input type="submit" class="btn btn-primary blue" value="导出及格成绩"></input>
					</form>
				</div>
				<div class="modal-footer">
					<span style="margin-right: 50px" class="Bomb-box"></span>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>

				</div>
			</div>
		</div>
	</div>

	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<c:import url="common/bottom.jsp"></c:import>


	<c:import url="common/commonAlert.jsp"></c:import>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/js/httpclient.js"></script>
	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<!-- 图表 -->
	<script
		src="${pageContext.request.contextPath}/js/dataAdditive/echarts.min.js"></script>
	<!--分页-->
	<script src="${pageContext.request.contextPath}/js/common/twilight.js"
		type="text/javascript"></script>
	<script
		src="${pageContext.request.contextPath}/js/common/ui.ajaxpager.js"
		type="text/javascript"></script>

	<script src="${pageContext.request.contextPath}/js/app.js"></script>
	<script src="${pageContext.request.contextPath}/js/jquery.form.js"></script>

	<script src="${pageContext.request.contextPath}/js/exam/examDetail.js"></script>
	<script src="${pageContext.request.contextPath}/js/notify/addNotify.js"></script>
	<script>
		$(function() {

			var pub = '${data.examAnswerPublish}';
			pub = JSON.parse(pub);
			var mode ='';
			switch (pub.mode) {
			case 'immediately':
				mode="立即发布";
				break;
			case 'no':
				mode="不发布";
				break;
			case 'delay':
				mode="延时发布";
				break;
			}
			$("[name=public]").text("成绩发布：" + (mode || ''));
		});
	</script>

</body>

<!-- END BODY -->
</html>