<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<title>课程审核</title>
	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->

	<link rel="stylesheet" href="../css/DT_bootstrap.css" />
        <!-- 分页 -->
    <link rel="stylesheet" href="../css/common/page.css"/>
    	<!--当前页-->
    <link rel="stylesheet" href="../css/common/common.css">
	<!-- END PAGE LEVEL STYLES -->

	<link rel="shortcut icon" href="../image/favicon.ico" />
    </head>
    <!-- BEGIN BODY -->
<body class="page-header-fixed" code="course" sub-code="course_auditing">
	<c:import url="common/top.jsp"></c:import> 	
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
			<!-- BEGIN SIDEBAR -->
	<c:import url="common/sidebar.jsp"></c:import>
		<!-- BEGIN PAGE CONTAINER-->
			<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
			<div class="page-content" id="mycaPage">
				<!-- BEGIN PAGE HEADER-->
				<div class="row-fluid">
					<div class="span12">
						<!-- BEGIN PAGE TITLE & BREADCRUMB-->
						<h3 class="page-title">
							课程管理 <i class="icon-angle-right"></i>
							课程审核
						</h3>
						<!-- END PAGE TITLE & BREADCRUMB-->
					</div>
				</div>
				<div class="control-group">
					<label class="myAllCondition">课程名称:</label>
					<input class="m-wrap mywrap" size="16" type="text" value="" id="searchName"/>
                    <button class="btn blue mysearchbtn1" onclick="search()">搜索</button>
				</div>
				<div class="btn-group hidden-phone">
					<a class="btn mybtn1" id="myCabtn1" onclick="tabChange('all');">全部</a>
					<a onclick="tabChange('N');" class="btn" id="myCabtn2">未审核</a>
					<a onclick="tabChange('A');"class="btn" id="myCabtn3">已通过</a>
					<a onclick="tabChange('J');" class="btn" id="myCabtn4">未通过</a>
				</div>

				<!-- END PAGE HEADER-->

				<!-- BEGIN PAGE CONTENT-->

				<div class="row-fluid" id="myCarow1">
					<div class="span12">
						<!-- BEGIN EXAMPLE TABLE PORTLET-->
						<div class="portlet box light-grey">
							<div class="portlet-body">
								<table class="table table-striped table-bordered table-hover" id="sample_1">
									<thead>
										<tr>
											<th style="width:8px;"></th>
											<th>课程名称</th>
											<th class="hidden-480">课程类型</th>
											<th class="hidden-480">创建时间</th>
											<th class="hidden-480">状态信息</th>
											<th >管理</th>
										</tr>
									</thead>
									<tbody  id="courseAuditing_tbody">
										<!-- <tr class="odd gradeX">
											<td><input type="checkbox" class="checkboxes" value="1" /></td>
											<td>飞行员素质第一章</td>
											<td class="hidden-480">线上课程</td>
											<td class="hidden-480">未审核</td>
											<td class="center hidden-480">2015-05-15 9:12:55</td>
											<td class="mycaExamine" data-toggle="modal" data-target="#responsive">审核</td>
										</tr>
										<tr class="odd gradeX">
											<td><input type="checkbox" class="checkboxes" value="1" /></td>
											<td>飞行员素质第一章</td>
											<td class="hidden-480">线上课程</td>
											<td class="hidden-480">通过</td>
											<td class="center hidden-480">2015-05-15 9:12:55</td>
											<td >已审核</td>
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
							</div>
						</div>
						<!-- END EXAMPLE TABLE PORTLET-->
					</div>
				</div>
				<!-- 未审核 -->
				<div class="row-fluid" id="myCarow2">
					<div class="span12">
						<!-- BEGIN EXAMPLE TABLE PORTLET-->
						<div class="portlet box light-grey">
							<div class="portlet-body">
								<table class="table table-striped table-bordered table-hover" id="sample_1">
									<thead>
										<tr>
											<th style="width:8px;"></th>
											<th>课程名称</th>
											<th class="hidden-480">课程类型</th>
											<th class="hidden-480">创建时间</th>
											<th class="hidden-480">状态信息</th>
											<th>管理</th>
										</tr>
									</thead>
									<tbody  id="unAuditing_tbody">
<!--  										<tr class="odd gradeX">
											<td><input type="checkbox" class="checkboxes" value="1" /></td>
											<td>飞行员素质第一章</td>
											<td class="hidden-480">线上课程</td>
											<td class="hidden-480">未审核</td>											
											<td onclick="auditing()" class="mycaExamine" data-toggle="modal" data-target="#responsive">审核</td>
										</tr>	 -->									
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
								
							</div>
						</div>
						<!-- END EXAMPLE TABLE PORTLET-->
					</div>
				</div>
				<!-- 已通过 -->
				<div class="row-fluid" id="myCarow3">
					<div class="span12">
						<!-- BEGIN EXAMPLE TABLE PORTLET-->
						<div class="portlet box light-grey">
							<div class="portlet-body">
								<table class="table table-striped table-bordered table-hover" id="sample_1">
									<thead>
										<tr>
											<th style="width:8px;"></th>
											<th>课程名称</th>
											<th class="hidden-480">课程类型</th>
											<th class="hidden-480">创建时间</th>
											<th class="hidden-480">状态信息</th>
											<th>管理</th>
										</tr>
									</thead>
									<tbody  id="auditing_tbody">
<!--  										<tr class="odd gradeX">
											<td><input type="checkbox" class="checkboxes" value="1" /></td>
											<td>飞行员素质第一章</td>
											<td class="hidden-480">线上课程</td>
											<td class="hidden-480">通过</td>											
											<td>已审核</td>
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
								
							</div>
						</div>
						<!-- END EXAMPLE TABLE PORTLET-->
					</div>
				</div>
					<!-- 未通过 -->
				<div class="row-fluid" id="myCarow4">
					<div class="span12">
						<!-- BEGIN EXAMPLE TABLE PORTLET-->
						<div class="portlet box light-grey">
							<div class="portlet-body">
								<table class="table table-striped table-bordered table-hover" id="sample_1">
									<thead>
										<tr>
											<th style="width:8px;"></th>
											<th>课程名称</th>
											<th class="hidden-480">课程类型</th>
											<th class="hidden-480">创建时间</th>
											<th class="hidden-480">状态信息</th>
											<th>管理</th>
										</tr>
									</thead>
									<tbody  id="offAuditing_tbody">
<!--  										<tr class="odd gradeX">
											<td><input type="checkbox" class="checkboxes" value="1" /></td>
											<td>飞行员素质第一章</td>
											<td class="hidden-480">线上课程</td>
											<td class="hidden-480">未通过，原因：信息不正确</td>											
											<td>已审核</td>
										</tr>	 -->									
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
								
							</div>
						</div>
						<!-- END EXAMPLE TABLE PORTLET-->
					</div>
				</div>
				<!-- 点击审核触发的Modal -->
				<div id="responsive" class="modal hide fade" tabindex="-1" data-width="760" style="top: 3%;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						<h3>审核</h3>
					</div>
					<div class="modal-body" 
					>
					    <div class="row-fluid">
					    <input style="display:none;" id="auditingId" />
					       <p id="auditingName"></p>
						   <!-- <p id="auditingName">课程类别：线上课程</p> -->
						   <p id="auditingType"></p>
						   <p id="auditinglessonClassificationsName"></p>
						   <p id="auditingPre">前置课程：新员工入职培训</p>
						   <p id="knowledgePointName"></p>
						   <p id="introduction"></p>
						   <!-- <p id="auditingIntroduction">课程描述：关于机场安全的培训课程</p> -->
					    </div>	
						<div class="row-fluid">
						   <span class="span2">课时信息：</span>
						    <div class="span11">
						       <div style="margin-bottom: 0px; " class="portlet box light-grey">
						          <div class="portlet-body">
						             <table class="table table-striped table-bordered table-hover">
                                         <thead>
                                            <tr>
                                              <th>名称</th>
                                              <th style="width:34px;">类型</th>
                                              <th>课时描述</th>  
                                              <th style="width:34px;"></th>                                                                                      
                                             </tr>
                                          </thead>
                                       <tbody id="lessonList_tbody">
           <!--                                  <tr class="odd gradeX">                                    
                                              <td>飞行员素质第一章</td>
                                              <td>30分钟</td>
                                              <td>改革开放以来，我国的英语教育规模不断扩大，教育教学取得了显著的成就。然而，英语教育的现状尚不能适应我国经济建设和社会发展的需要，与时代发展的要求还存在差距。</td>
                                              <td class="mylistSee">查看</td>                                                                                             
                                            </tr>
                                            <tr class="odd gradeX">                                    
                                              <td>飞行员素质第一章</td>
                                              <td>30分钟</td>
                                              <td>改革开放以来，我国的英语教育规模不断扩大，教育教学取得了显著的成就。然而，英语教育的现状尚不能适应我国经济建设和社会发展的需要，与时代发展的要求还存在差距。</td>
                                              <td class="mylistSee">查看</td>                                                                                             
                                            </tr>     -->                           
                                        </tbody>
                                      </table>
		       					<!--////////////////分页//////////////-->
							        <div class="container-fluid">
							            <div id="ui-pager-2" class="ui-pager">
							                <div style="  padding: 0px;" id="ui-pager-wrap-2" class="ui-pager-wrap">
							                    <div id="ui-page-num-2" class="ui-page-num">
							                        <a id="prev-2" class="prev disable">&lt;</a> 
							                        <a id="next-2" href="#" class="next">&gt;</a>
						                        	共<em id="page-count-2" class="page-count"></em>页，到第
						                        	 <input id="target-page-text-2" class="target-page-text" type="text">页 
						                        	 <a id="target-page-btn-2" class="target-page-btn">确定</a>
							                    </div>
							                </div>
							            </div>
							        </div> 
						          </div>  
						    </div>
						    </div>
						</div>
						<div class="row-fluid" style="display:none;">
						     <span class="span2">处理记录：</span>
						     <div  id="logItems_body">
						     </div>
						</div>
						<div class="row-fluid" style="display:none;">
						     <span class="span2" style="line-height: 30px;">处理意见：</span>
						     <select class="small m-wrap span10" id="auditingAdvice" tabindex="1">
                                            <option value="处理意见1">同意，允许发布</option>
                                            <option value="处理意见2">不同意</option>
                                         </select>  
						</div>
						<div class="row-fluid">
						     <span class="span2">处理意见：</span>
						     <textarea id="auditingRemark" class="large m-wrap myepdtextarea" rows="2"></textarea>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" id="Reject" class="btn red" onclick="unAuditing()">驳回</button>
						<button type="button" class="btn blue" onclick="saveAuditing()">通过</button>
					</div>
				</div>
		</div>
		</div>

		<!-- BEGIN PAGE LEVEL PLUGINS -->
     <c:import url="common/bottom.jsp"></c:import>
	<!-- BEGIN PAGE LEVEL PLUGINS -->
	
	<!--分页-->
	<script src="../js/common/twilight.js" type="text/javascript"></script>
	<script src="../js/common/ui.ajaxpager.js" type="text/javascript"></script>

	<!-- END PAGE LEVEL PLUGINS -->
	
	<script src="../js/course/courseAuditing.js"></script>
	
	<!-- BEGIN PAGE LEVEL SCRIPTS -->

	<script src="../js/app.js"></script>
    <script src="../js/common/sidebar.js" type="text/javascript"></script>
			
</body>

<!-- END BODY -->
</html>