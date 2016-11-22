<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
  <%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<base href=" <%=basePath%>">
	<title>学习计划详情</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	

	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->

	<link rel="stylesheet" href="./css/DT_bootstrap.css" />
   	<!--当前页-->
    <link rel="stylesheet" href="./css/common/common.css">
    
    <!-- 分页 -->
    <link rel="stylesheet" href="./css/common/page.css"/>
    
	<!-- END PAGE LEVEL STYLES -->

</head>
    <!-- BEGIN BODY -->
<body class="page-header-fixed">

	<c:import url="common/top.jsp"></c:import> 	
	
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
			<!-- BEGIN SIDEBAR -->
		<div class="page-sidebar nav-collapse collapse">
		<!-- BEGIN SIDEBAR MENU -->        
			<ul class="page-sidebar-menu">
				<li>
					<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
					<div class="sidebar-toggler hidden-phone"></div>
					<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
				</li>
				<li>
					<!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
					<form class="sidebar-search">
						<div class="input-box">
							<a href="javascript:;" class="remove"></a>
							<input type="text" placeholder="搜索" />
							<input type="button" class="submit" value=" " />
						</div>
					</form>
					<!-- END RESPONSIVE QUICK SEARCH FORM -->
				</li>
				<li class="start ">
					<a href="views/staffAnnouncement.jsp">
						<i class=" icon-volume-up"></i> 
						<span class="title">通知公告</span>
					</a>
				</li>
				<li class="">
					<a href="views/staffCourseList.jsp">
						<i class="icon-cogs"></i> 
						<span class="title">我的课程</span>
					</a>
				</li>

				<li class="">
					<a href="views/staffExamList.jsp">
						<i class="icon-bookmark-empty"></i> 
						<span class="title">我的考试</span>
					</a>
				</li>

				<li class="">
					<a href="views/knowledgepoint.jsp">
						<i class="icon-table"></i> 
						<span class="title">知识点管理</span>
					</a>
				</li>

				<li class="">
					<a href="javascript:;">
						<i class=" icon-book"></i> 
						<span class="title">课程管理</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li >
							<a href="views/courseList.jsp">
								<i class="icon-time"></i>
								课程列表
							</a>
						</li>
						<li >
							<a href="views/courseAuditing.jsp">
								<i class="icon-cogs"></i>
								课程审核
							</a>
						</li>
					</ul>
				</li>

				<li class="active">
					<a href="views/learnPlanList.jsp">
						<i class="icon-gift"></i> 
						<span class="title">学习计划</span>
					</a>
				</li>

				<li>
					<a class="" href="views/questionBank.jsp">
						<i class="icon-sitemap"></i> 
						<span class="title">题库管理</span>
					</a>
				</li>

				<li>
					<a href="javascript:;">
						<i class="icon-folder-open"></i> 
						<span class="title">试卷管理</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="views/examPaperAuditing.jsp">
								<i class="icon-cogs"></i> 
								试卷审核
							</a>
						</li>

						<li>
							<a href="views/examPaperList.jsp">
								<i class="icon-user"></i>  
								试卷列表
							</a>
						</li>
					</ul>

				</li>

				<li class="">
					<a href="javascript:;">
						<i class="icon-user"></i> 
						<span class="title">考试管理</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li >
							<a href="views/examList.jsp">
							考试列表
							</a>
						</li>
					</ul>

				</li>

				<li class="">
					<a href="views/announcementManagement.jsp">
						<i class="icon-th"></i> 
						<span class="title">未入职人员管理</span>
						<!-- <span class="selected"></span> -->
					</a>
<!-- 					<ul class="sub-menu">
						<li >
							<a href="table_basic.html">
							Basic Tables
							</a>
						</li>
						<li >
							<a href="table_responsive.html">
							Responsive Tables
							</a>
						</li>
						<li class="active">
							<a href="table_managed.html">
							Managed Tables
							</a>
						</li>
						<li >
							<a href="table_editable.html">
							Editable Tables
							</a>
						</li>
					</ul> -->
				</li>

				<li class="">
					<a href="javascript:;">
						<i class="icon-file-text"></i> 
						<span class="title">权限管理</span>
					</a>
				</li>
				
				<li class="">
					<a href="views/announcementManagement.jsp">
						<i class="icon-file-text"></i> 
						<span class="title">公告管理</span>
					</a>
				</li>
				
				<li class="last">
					<a href="views/systemParameter.jsp">
						<i class="icon-file-text"></i> 
						<span class="title">参数设置</span>
					</a>
				</li>
			</ul>

			<!-- END SIDEBAR MENU -->

		</div>
		<!-- BEGIN PAGE CONTAINER-->
		<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
		<div class="page-content myEapage" id="myLpDPage">
            <!-- BEGIN PAGE HEADER-->
            <div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                    <h3 class="page-title">
                         	学习计划管理 &nbsp;<i class="icon-angle-right"></i>&nbsp;学习计划详情
                    </h3>
                    <a href="jv/learnplan/detailupdate.do?id=${requestScope.data.id}" ><button class="btn blue" >修改</button></a>
                    <button class="btn red myredbtn1" onclick="del(${requestScope.data.id})">删除</button>
                </div>
            </div>
            <!-- ---------------------计划内容------------------------------------------- -->
            <div class="tab-content" id="myEatab1">
                    <!-- BEGIN FORM-->                                     
                        <div class="media-body">
                            <h4 class="media-heading myLpdtitle">计划内容</h4>
                            <p>计划名称：${requestScope.data.name}</p>
                            <p>学习时间：${requestScope.data.trainBatchStart}至${requestScope.data.trainBatchEnd}</p>
                             <p><span class="myDescribe1">计划描述</span>：<span class="myDescribe">${requestScope.data.describe}</span></p>   
                              <p class="myLpdbtnp1"></p>                          
                        </div>
                    <!-- END FORM-->             
                </div>      
             <h4 class="media-heading myLplMedia1">课程内容</h4>      	         
               <div class="row-fluid">                 
                <div class="span12">
                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
                    <div class="portlet box light-grey">
                        <div class="portlet-body">    	   
                            <table class="table table-striped table-bordered table-hover" id="sample_1">
                                <thead>
                                <tr>
                                    <th>课程名称</th>
                                    <th>开课时间</th>
                                    <th>应学人数</th>  
                                    <th>完成人数</th>
                                    <th>正在学习人数</th>
                                    <th>未开始学习人数</th>                                   
                                    <th>详情</th>                                   
                                </tr>
                                </thead>
                                <tbody id="courseList_tbody">
                                <tr class="odd gradeX">
                                    <!-- <td><input type="checkbox" class="checkboxes" value="1" /></td> -->
                                    <td>飞行员素质第一章</td>
                                    <td>2016-6-30~2016-7-30</td>
                                    <td>15</td>
                                    <td>1</td>
                                    <td>15</td>
                                    <td>15</td>
                                    <td class="mylistSee">查看</td>                                                                    
                                </tr>
                                <tr class="odd gradeX">
                                    <!-- <td><input type="checkbox" class="checkboxes" value="1" /></td> -->
                                    <td>飞行员素质第一章</td>
                                    <td>2016-6-30~2016-7-30</td>
                                    <td>15</td>
                                    <td>1</td>
                                    <td>15</td>
                                    <td>15</td>
                                   <td class="mylistSee">查看</td>                     
                                </tr>

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
             <h4 class="media-heading">学员信息</h4>
                <!--    发送方式选择 -->
               <!--   
               	<div class="control-group mygroup1">													
					<div class="controls">
					<label class="checkbox">
						<input id="dsad" type="checkbox" value="S" /> 通过公告发送
					 </label>
					 <label class="checkbox">
						  <input type="checkbox" value="" /> 通过飞行准备网发送
					  </label>
					  <label class="checkbox">
						<input type="checkbox" value="" /> 通过飞叮咚发送
					 </label>
					 <label class="checkbox">
						  <input type="checkbox" value="" /> 通过短信发送
					  </label>
					</div>
				</div>  
				-->
             <!-- ---------------------参考人员信息------------------------------------------- -->
             <div class="control-group" id="myEagroup1">                    
                     <span>员工编号:</span>
                     <input class="m-wrap" size="16" type="text" value="" id="ui_date_picker"/>
                    <span>员工姓名:</span>
                     <input class="m-wrap" size="16" type="text" value="" id="ui_date_picker_change_year_month"/>
                     <button id="basic_opener4" class="btn blue myredbtn1">搜索</button>
                     
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
                                    <th>编号</th>
                                    <th>员工号</th>
                                    <th class="hidden-480">员工姓名</th>
                                    <th class="hidden-480">所属部门</th>                                                                    
                                </tr>
                                </thead>
                                <tbody id="planPersonList_tbody">
                                <tr class="odd gradeX">
                                    <!-- <td><input type="checkbox" class="checkboxes" value="1" /></td> -->
                                    <td>00003</td>
                                    <td>刘超</td>                                                              
                                </tr>
                                <tr class="odd gradeX">
                                    <!-- <td><input type="checkbox" class="checkboxes" value="1" /></td> -->
                                    <td>00001</td>
                                    <td>李达</td>                                 
                                </tr>
                                </tbody>
                            </table>
        					<!--////////////////分页//////////////-->
					        <div class="container-fluid">
					            <div id="ui-pager-2" class="ui-pager">
					                <div id="ui-pager-wrap-2" class="ui-pager-wrap">
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
                    <!-- END EXAMPLE TABLE PORTLET-->                    
                </div>
        
            </div>
       	</div>
        <!-- END PAGE -->
    </div>

	<c:import url="common/bottom.jsp"></c:import>
		<!-- BEGIN PAGE LEVEL PLUGINS -->
     
		<!--分页-->
	<script src="./js/common/twilight.js" type="text/javascript"></script>
	<script src="./js/common/ui.ajaxpager.js" type="text/javascript"></script>
	
	<script src="./js/learnPlay/learnPlanDetail.js"></script>

	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->

	<script src="./js/app.js"></script>
    <script src="./js/notify/addNotify.js"></script>
	<script>
		
	    jQuery(document).ready(function() {
			
	    	
	    	
	        App.init();
			
	        var id = ${requestScope.data.id};
	        
	        tableAjax(1,maxVisible,"learnPlanDetail",true,id);
	        personAjax(1,maxVisible,"learnPlanDetail",true,id)
	    });
	
	</script>
			
</body>

<!-- END BODY -->
</html>