<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
  <%@ taglib prefix="perm" uri="/mytaglib/permission"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<title>课程列表</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->
    
   	<!--当前页-->
    <link rel="stylesheet" href="../css/common/common.css">
    <!-- 分页 -->
    <link rel="stylesheet" href="../css/common/page.css"/>
    
	<!-- END PAGE LEVEL STYLES -->
</head>
    <!-- BEGIN BODY -->
<body class="page-header-fixed" code="course" sub-code="course_list">

	<c:import url="common/top.jsp"></c:import> 	
	
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
			<!-- BEGIN SIDEBAR -->
		<c:import url="common/sidebar.jsp"></c:import>
		<!-- BEGIN PAGE CONTAINER-->
		<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
		<div class="page-content" id="myclPage">
            <!-- BEGIN PAGE HEADER-->
            <div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                    <h3 class="page-title">
                        课程管理 <i class="icon-angle-right"></i>
                        课程列表
                    </h3>
                    <!-- END PAGE TITLE & BREADCRUMB-->
                </div>
            </div>
                <!-- ---------------------搜索条件------------------------------------------- -->
                <div class="control-group">
                        <span class="myAllCondition">名称:</span>
                        <input class=" smaller m-wrap mycondition" size="16" type="text" value="" id="searchName"/>
                        <span class="myAllCondition">单位(部门或科室):</span>
                        <input class="smaller m-wrap mycondition" size="16" type="text" value="" id="searchNode"/>
                        <span class="myAllCondition">状态:</span>
                        <select class="small m-wrap mycondition" tabindex="1" id="searchState">
                        	<option value="">全部</option>
                           <option value="A">已审核</option>
                           <option value="N">未审核</option>
                           <option value="J">拒绝</option>
                        </select>
                        <button class="btn blue mysearchbtn1" onclick="search()" style="margin-top: 0;" >搜索</button>
                </div>
           	<div class="control-group">
           	   <perm:checkPerm permissionCode="course_list.add">
                    <button onclick="window.location.href='courseAdd.jsp'"  class="btn blue myredbtn1">新增</button>
               </perm:checkPerm>
               <perm:checkPerm permissionCode="course_list.delete">
               		<button id="basic_opener2" class="btn red myredbtn1"  data-toggle='modal' data-target='#myDelModal'>删除</button>
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
                                    <th style="width:8px;"><input type="checkbox" class="checkboxes" value="1" id="all" onclick="checkAll('all','courseCheck')"/></th>
                                    <th>课程编号</th>
                                    <th class="hidden-480">名称</th>
                                    <th class="hidden-480">类型</th>
                                    <th class="hidden-480">创建时间</th>
                                     <th class="hidden-480">课程创建者</th>
                                    <th class="hidden-480">所属单位(部门或科室)</th>
                                    <th class="hidden-480">状态</th>
                                    <th class="hidden-480">课程详情</th>
                                    <th >管理</th>
                                </tr>
                                </thead>
                                <tbody id="courseList_tbody">
                                <!-- <tr class="odd gradeX">
                                    <td><input type="checkbox" class="checkboxes" value="1"/></td>
                                    <td>81323</td>
                                    <td>飞行员素质第一章</td>
                                    <td class="hidden-480">线上课程</td>
                                    <td class="hidden-480">2016-6-30</td>
                                    <td class="center hidden-480">地勤部</td>
                                    <td class="center hidden-480">审核中</td>
                                    <td class="center hidden-480 mylistSee" data-toggle="modal" data-target="#myclModal">查看</td>
                                    <td class="mycaExamine" data-toggle="modal" data-target="#responsive"><span>修改</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>删除</span></td>
                                </tr>
                                <tr class="odd gradeX">
                                    <td><input type="checkbox" class="checkboxes" value="1" /></td>
                                    <td>81323</td>
                                    <td>飞行员素质第一章</td>
                                    <td class="hidden-480">线上课程</td>
                                    <td class="hidden-480">2016-6-30</td>
                                    <td class="center hidden-480">地勤部</td>
                                    <td class="center hidden-480">审核中</td>
                                    <td class="center hidden-480 mylistSee" data-toggle="modal" data-target="#myclModal">查看</td>
                                    <td class="mycaExamine" data-toggle="modal" data-target="#responsive"><span>修改</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>删除</span></td>
                                </tr>
 -->
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
                            <!-- 点击查看触发的Modal -->
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

	<!-- END PAGE LEVEL PLUGINS -->
	
	<script src="../js/course/courseList.js"></script>

	<!-- BEGIN PAGE LEVEL SCRIPTS -->
    <script src="../js/common/sidebar.js" type="text/javascript"></script>
	<script src="../js/app.js"></script>
	<!-- 引入共通弹出框 -->
	<c:import url="common/commonAlert.jsp"></c:import> 
    <script type="text/javascript" src="../js/httpclient.js"></script>
			
</body>

<!-- END BODY -->
</html>