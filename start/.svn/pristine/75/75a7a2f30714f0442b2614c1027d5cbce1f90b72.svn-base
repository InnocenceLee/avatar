<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
  <%@ taglib prefix="perm" uri="/mytaglib/permission"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
 
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
 
<!--[if !IE]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<title>学习计划列表</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->

	<link rel="stylesheet" href="../css/DT_bootstrap.css" />
   	<!--当前页-->
    <link rel="stylesheet" href="../css/common/common.css">
        <!-- 分页 -->
    <link rel="stylesheet" href="../css/common/page.css"/>
    
	<!-- END PAGE LEVEL STYLES -->
</head>
    <!-- BEGIN BODY -->
<body class="page-header-fixed" code="learnplan">
	<c:import url="common/top.jsp"></c:import> 	
	
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
			<!-- BEGIN SIDEBAR -->
		<c:import url="common/sidebar.jsp"></c:import>
		<!-- BEGIN PAGE CONTAINER-->
		<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
		<div class="page-content" id="myLplPage">
            <!-- BEGIN PAGE HEADER-->
            <div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                    <h3 class="page-title">
                      学习计划
                    </h3>

                    <!-- END PAGE TITLE & BREADCRUMB-->

                </div>

            </div>
                <!-- ---------------------搜索条件------------------------------------------- -->
                <div class="control-group">
                        <span>名称:</span>
                        <input class="m-wrap mycondition" size="16" type="text"  id="searchName"/>                       
                        <button class="btn blue myredbtn1 mysearchbtn1" onclick="search()">搜索</button>
                </div>
           	<div class="control-group">
           	   <perm:checkPerm permissionCode="learnplan.add">
                   <button class="btn blue myredbtn1" onclick="window.location.href='learnPlanAdd.jsp'">新增</button>
               </perm:checkPerm>
               <perm:checkPerm permissionCode="learnplan.delete">
                   <button class="btn red myredbtn1" data-toggle="modal" data-target="#myDelModal">删除</button> 
               </perm:checkPerm>               
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
                                    <th style="width:8px;"><input type="checkbox"  value="1" id="all" onclick="checkAll('all','planCheck')"/></th>
                                    <th>计划名称</th>
                                    <th>课程数量</th>
                                    <th>学习时间</th>
                                    <th>创建人</th>
                                    <th>创建时间</th>
                                    <th style="width:48px;">管理</th>
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
					                        <a id="prev" class="prev disable">&lt;</a> 
					                        <a id="next" href="#" class="next">&gt;</a>
				                        	共<em id="page-count" class="page-count"></em>页，到第
				                        	 <input id="target-page-text" class="target-page-text" type="text">页 
				                        	 <a id="target-page-btn" class="target-page-btn">确定</a>
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
						                      你确定要删除你选择的数据吗
						                    </p>
						                    <p>
					                    		<input class="hidden" id="delName" type="text" readonly/>
												<input class="hidden" id="delId" type="hidden" disable="disable" />
						                    </p>
						       
						                </div>
						                <div class="modal-footer">
						                    <span style=" margin-right:50px" class="Bomb-box"></span>
						                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						                    <button type="button" class="btn btn-primary" id="delPlanBtn">确定</button>
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
		<!-- BEGIN PAGE LEVEL PLUGINS -->
     
		<!--分页-->
	<script src="../js/common/twilight.js" type="text/javascript"></script>
	<script src="../js/common/ui.ajaxpager.js" type="text/javascript"></script>
	
	<script src="../js/learnPlay/learnPlanList.js"></script>

	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->
    <script src="../js/common/sidebar.js" type="text/javascript"></script>
	<script src="../js/app.js"></script>
	<!-- 引入共通弹出框 -->
	<c:import url="common/commonAlert.jsp"></c:import> 
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/httpclient.js"></script>
	
			
</body>

<!-- END BODY -->
</html>