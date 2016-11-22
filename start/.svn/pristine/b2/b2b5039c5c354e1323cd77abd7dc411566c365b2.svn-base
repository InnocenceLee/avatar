<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="perm" uri="/mytaglib/permission"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->

<!-- BEGIN HEAD -->
<head>
<meta charset="utf-8" />
<title>帮助</title>
<meta content="" name="description" />
<meta content="" name="author" />
<!--强制使用ie的edge兼容模式-->
<meta http-equiv="X-UA-COMPATIBLE" content="IE=edge" />
<c:import url="common/head.jsp"></c:import>
<!-- BEGIN PAGE LEVEL STYLES -->

<link rel="stylesheet" href="../css/common/metro.css">
<!--当前页-->
<link rel="stylesheet" href="../css/common/common.css">
<!-- END PAGE LEVEL STYLES -->
</head>
<!-- BEGIN BODY -->
<body class="page-header-fixed" code="Help">

	<c:import url="common/top.jsp"></c:import>
	<!-- BEGIN CONTAINER -->

	<div class="page-container">
		<!-- BEGIN SIDEBAR -->
		<c:import url="common/sidebar.jsp"></c:import>
		<!-- END SIDEBAR -->
		<!-- BEGIN PAGE -->
		<div class="page-content" id="mykgPage">
			<div class="control-group">
				<div class="row-fluid">
					<div class="span12">
						<!-- BEGIN PAGE TITLE & BREADCRUMB-->
						<h3 class="page-title myKnowtitle">
							帮助管理 <small></small>
						</h3>
						<!-- END PAGE TITLE & BREADCRUMB-->
					</div>
				</div>
			</div>

			<div class="control-group">
				<perm:checkPerm permissionCode="learnplan.add">
					<button class="btn blue myredbtn1"
						onclick="window.location.href='help.jsp'">新增</button>
				</perm:checkPerm>
			</div>
			<div class="control-group">
				<div class="row-fluid">
					<div class="portlet-body">
						<table class="table table-striped table-bordered table-hover"
							id="sample_1">
							<thead>
								<tr>
									<th>标题</th>
									<th style="width: 300px;">管理</th>
								</tr>
							</thead>
							<tbody id="planList_tbody">

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
				</div>
			</div>
			
			         <!-- 点击删除触发的Modal -->
						    <!-- Modal -->
						    <div class="modal fade" id="myDelModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;">
						        <div class="modal-dialog" role="document">
						            <div class="modal-content">
						                <div class="modal-header">
						                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						                    <h4 class="modal-title" id="myModalLabel">操作提示</h4>
						                </div>
						                <div class="modal-body">
						                    <p id="delP">
						                                                                                                          
						                    </p>
						                    <p>
					                    		<input class="hidden" id="delName" type="text" readonly/>
												<input class="hidden" id="delId" type="hidden" disable="disable" />
						                    </p>
						       
						                </div>
						                <div class="modal-footer">
						                    <span style=" margin-right:50px" class="Bomb-box"></span>
						                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						                    <button type="button" class="btn btn-primary" id="delPlanBtn" onclick="delOk()">确定</button>
						                </div>
						            </div>
						        </div>
						    </div>
		</div>
	</div>


	<c:import url="common/bottom.jsp"></c:import>
	<c:import url="common/commonAlert.jsp"></c:import>


	<!-- <script type="text/javascript" src="../js/common/jquery-1.4.4.min.js"></script> -->

	<script type="text/javascript" src="../js/httpclient.js"></script>
	<script src="../js/common/jquery.ztree.all-3.5.min.js"></script>
	<script src="../js/common/readTreeJson.js" type="text/javascript"></script>
	<script src="../js/common/help.js"></script>

	<!-- END JAVASCRIPTS -->
	<script src="../js/common/sidebar.js" type="text/javascript"></script>
	<script src="../js/common/checkData.js" type="text/javascript"></script>
	<script src="../js/app.js"></script>


</body>

<!-- END BODY -->
</html>