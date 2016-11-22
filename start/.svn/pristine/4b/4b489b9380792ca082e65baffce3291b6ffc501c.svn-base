<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
  <%@ taglib prefix="perm" uri="/mytaglib/permission"%>
<!DOCTYPE html>
<html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<title>公告管理</title>
	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>
	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->

	<link rel="stylesheet" href="../css/DT_bootstrap.css" />
    <link href="../css/jquery.gritter.css" rel="stylesheet" type="text/css"/>
   	<!--当前页-->
    <link rel="stylesheet" href="../css/common/common.css">   
        <!-- 分页 -->
    <link rel="stylesheet" href="../css/common/page.css"/>
	<!-- END PAGE LEVEL STYLES -->
	<style type="text/css">
	.view-detail{
		text-decoration: none !important;
		color: #2D94FF;
	}
	.view-detail:visited {
	    color: #7a818b; 
    }
	</style>
</head>
    <!-- BEGIN BODY -->
<body class="page-header-fixed" code="notify_query">

	<c:import url="common/top.jsp"></c:import> 	
	<div class="page-container">
	<!-- BEGIN CONTAINER -->
		<c:import url="common/sidebar.jsp"></c:import>
		<!-- BEGIN PAGE CONTAINER-->
		<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
		<div class="page-content" id="myAcmmPage">
            <!-- BEGIN PAGE HEADER-->
            <div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                    <h3 class="page-title">
                         公告管理
                    </h3>

                    <!-- END PAGE TITLE & BREADCRUMB-->

                </div>

            </div>
            <!-- ---------------------搜索条件------------------------------------------- -->
            <div class="control-group">
                    <span class="myAllCondition">关键字:</span>
                    <input class="m-wrap mycondition" size="16" type="text" value="" id="searchName"/>                       
                    <button class="btn blue myredbtn1 mysearchbtn1" onclick="search()">搜索</button>
            </div>

           	<div class="control-group">
           		<perm:checkPerm permissionCode="notify.add">
               <button id="basic_opener3" class="btn blue myredbtn1" onclick="window.location.href='announcementManagementAdd.jsp'">新增</button>      
               </perm:checkPerm>
<%--                <perm:checkPerm permissionCode="notify.delete"> --%>
<!--                		<button id="basic_opener2" class="btn red myredbtn1"  data-toggle='modal' data-target='#myDelModal'>删除</button> -->
<%--                </perm:checkPerm>     --%>
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
                                    <th style="width:8px;"><input type="checkbox" class="checkboxes" value="1" id="all" onclick="checkAll('all','notifyCheck')"/></th>
                                    <th>标题</th>
<!--                                     <th class="hidden-480" style="width: 300px;">范围</th> -->
                                    <th class="hidden-480">内容</th>
                                    <th class="hidden-480">创建时间</th>   
<!--                                     <th class="hidden-480">管理</th>    -->
                                </tr>
                                </thead>
                                <tbody id="notify_tbody">
 <!--                                <tr class="odd gradeX">
                                    <td><input type="checkbox" class="checkboxes" value="1" /></td>
                                    <td>飞行员素质第一章</td>
                                    <td class="hidden-480">测试组、人力部门</td>
                                    <td class="hidden-480">请于2016年5月10日在线进行安全学习，此学习记录将影响绩效考核</td>     
                                    <td class="hidden-480">2016-05-16</td>      
                                </tr>
                                <tr class="odd gradeX">
                                      <td><input type="checkbox" class="checkboxes" value="1" /></td>
                                    <td>飞行员素质第一章</td>
                                    <td class="hidden-480">人力部门</td>
                                    <td class="hidden-480">请于2016年5月10日在线进行安全学习，此学习记录将影响绩效考核</td>     
                                    <td class="hidden-480">2016-05-16</td> 
                                </tr> -->
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
					        
					        <!-- Modal -->
						    <div class="modal fade" id="myDelModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;">
						        <div class="modal-dialog" role="document">
						            <div class="modal-content">
						                <div class="modal-header">
						                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
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
						                    <button id="myDelBtn" type="button" class="btn btn-primary blue" >确定</button>
						                </div>
						            </div>
						        </div>
						    </div>
						    <!-- Modal end-->                                                 
                                        
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
	<script src="../js/notify/notify.js"></script>
	<!-- END PAGE LEVEL PLUGINS -->
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	 <script src="../js/common/sidebar.js" type="text/javascript"></script>
    <script src="../js/app.js"></script>	
    
<script type="text/javascript" src="../js/httpclient.js"></script>
	<c:import url="common/commonAlert.jsp"></c:import>
</body>
<!-- END BODY -->
</html>