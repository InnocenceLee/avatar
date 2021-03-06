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
	<title>学习计划课程详情</title>
	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->

	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/select2_metro.css" />

	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/DT_bootstrap.css" />

	<!-- END PAGE LEVEL STYLES -->

	<link rel="shortcut icon" href="${pageContext.request.contextPath}/image/favicon.ico" />
	<!--当前页-->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/common.css">
      <!-- 分页 -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/page.css"/>
    </head>
    <!-- BEGIN BODY -->
<body class="page-header-fixed">
	<c:import url="common/top.jsp"></c:import> 	
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
			<!-- BEGIN SIDEBAR -->
		 <c:import url="common/sidebar.jsp"></c:import>
		<!-- BEGIN PAGE CONTAINER-->
			<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
			<div class="page-content" id="mylcdPage">

            <!-- BEGIN PAGE HEADER-->

            <div class="row-fluid">

                <div class="span12">
                    <h3 class="page-title">
                        学习计划 <i class="icon-angle-right"></i>
                        课程详细信息
                    </h3>
                    <div class="media">
                        <div class="media-body">
                            <h4 class="media-heading mypageh4">基本信息</h4>
                            <p>课程名称：${requestScope.data.name}</p>
                            <p>课程类型：${requestScope.data.trainTypeName}</p>
                            <p>课程类别：${requestScope.data.lessonClassificationsName}</p>
                            <p>&#12288;知识点：${requestScope.data.knowledgePointName}</p>
                            <p>前置课程：${requestScope.data.preCoursesName}</p>
                            <p>课时顺序：${requestScope.data.lessonOrder=='S' ? '固定' : '不固定' }</p>
                            <p>前置描述：${requestScope.data.introduction}</p>
                        </div>
                    </div>
                    <hr>
                </div>
                <!--课程内容-->
                <h4 class="media-heading">课程内容</h4>
                <div class="btn-group hidden-phone mychose">
                    <a href="javascript:;" class="btn mybtn1" onclick="tabChange1()" id="myLcdbtn1">课时</a>
                    <a href="javascript:;" class="btn" onclick="tabChange2()" id="myLcdbtn2">学习记录</a>
                    <a href="javascript:;" class="btn" onclick="tabChange3()" id="myLcdbtn3">课时评价</a>
                </div>

                <!-- END PAGE HEADER-->

                <!-- BEGIN PAGE CONTENT-->

                <div class="row-fluid" id="myPlan">

                    <div class="span12">

                        <!-- BEGIN EXAMPLE TABLE PORTLET-->

                        <div class="portlet box light-grey">

                            <div class="portlet-body">

                                <table class="table table-striped table-bordered table-hover" id="sample_2">
									<thead>
	                                    <tr>
	                                        <th style="width:8px;"></th>
	                                        <th>名称</th>
	                                        <th class="hidden-480">类型</th>
	                                        <th class="hidden-480">课时描述</th>
	                                        <th></th>
	                                        <th>操作</th>
	                                    </tr>
                                    </thead>
                                    <tbody id="courseDetailList_tbody" >
<!--                                      <tr class="odd gradeX">
                                        <td>1</td>
                                        <td>安全学习</td>
                                        <td class="hidden-480">线上学习</td>
                                        <td class="center hidden-480">四川航空股份有限公司(Sichuan Airlines,简称"川航")的前身是四川航空公司，该<br>公司成立于1986年9月19日，1988年7月14日正式开航运营，四川航空股份有限......</td>
                                        <td></td>
                                        <td class="mycaExamine" data-toggle="modal" data-target="#responsive">详情</td>
                                    </tr>

                                    <tr class="odd gradeX">
                                        <td>2</td>
                                        <td>安全学习</td>
                                        <td class="hidden-480">线上学习</td>
                                        <td class="center hidden-480">四川航空股份有限公司(Sichuan Airlines,简称"川航")的前身是四川航空公司，该<br>公司成立于1986年9月19日，1988年7月14日正式开航运营，四川航空股份有限......</td>
                                        <td></td>
                                        <td class="mycaExamine" data-toggle="modal" data-target="#responsive">详情</td>
                                    </tr> -->
                                    </tbody>
                                </table>
                                <!--////////////////分页//////////////-->
                                <!-- tableAjax -->
						        <div class="container-fluid" id="pager_course">
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
                <!-- 学习记录 -->
              <div id="myPlan1">
                <div class="control-group">
                        <span class="myAllCondition">员工编号：</span>
                        <input class="m-wrap myLcwrap" size="16" type="text"   id="learnNotesSearchID"  />
                         <span class="myAllCondition">员工姓名：</span>
                        <input class="m-wrap myLcwrap" size="16" type="text" id="learnNotesSearchName"/>
                        <span class="myAllCondition">所属部门：</span>
                        <input class="m-wrap myLcwrap" size="16" type="text" id="learnNotesSearchNode"/>
<!--                         <select class="small m-wrap" tabindex="1">
                                <option value="Category 1"></option>
                                <option value="Category 2"></option>
                                <option value="Category 3"></option>
                            </select> -->
                        <span class="myAllCondition">课时名称：</span>
                        <input class="m-wrap myLcwrap" size="16" type="text" value="" id="learnNotesSearchCourse"/>
<!--                         <select class="small m-wrap" tabindex="1">
                                <option value="Category 1"></option>
                                <option value="Category 2"></option>
                                <option value="Category 3"></option>
                            </select>   -->       
                        <button class="btn blue myredbtn1 mysearchbtn1"  onclick="learnNotesSearch()">搜索</button>
                </div>
                <div class="control-group search-bar">  
                    <perm:checkPerm permissionCode="learnplan.export">                  
                        <button  style="width: 90px !important;" class="btn blue myredbtn1" onclick="learnRecordExport()">导出</button>
                    </perm:checkPerm>
                </div>
                <div class="row-fluid">

                    <div class="span12">

                        <!-- BEGIN EXAMPLE TABLE PORTLET-->

                        <div class="portlet box light-grey">

                            <div class="portlet-body">

                                <table class="table table-striped table-bordered table-hover" id="sample_2">
					              <thead class="courseDetail-thead">
					                <tr class="myDtr1">
					                    <th>课时名称</th>
					                    <th>员工编号</th>
					                    <th>员工姓名</th>
					                    <th>所属部门</th>
					                    <th>开始时间</th>
					                    <th>结束时间</th>
					                    <th>学习时长</th>
					                </tr>
					                </thead>
					                <tbody id="learnNoteslList_tbody" >
					                <!-- <tr>
					                    <td>飞行员素质第一章</td>
					                    <td>987332</td>
					                    <td>张三</td>
					                    <td>飞行部</td>
					                </tr>
					                <tr>
					                    <td>飞行员素质第一章</td>
					                    <td>443443</td>
					                    <td>李四</td>
					                    <td>飞行部</td>
					                </tr> -->
					                </tbody>
                                </table>

						        <!--////////////////分页//////////////-->
						        <!-- table3aAjx -->
						        <div class="container-fluid" >
						           <div id="ui-pager-3" class="ui-pager">
						                <div id="ui-pager-wrap-3" class="ui-pager-wrap">
						                    <div id="ui-page-num-3" class="ui-page-num">
						                        <a id="prev-3" class="prev disable">&lt;</a> 
						                        <a id="next-3" href="#" class="next">&gt;</a>
					                        	共<em id="page-count-3" class="page-count"></em>页，到第
					                        	 <input id="target-page-text-3" class="target-page-text" type="text">页 
					                        	 <a id="target-page-btn-3" class="target-page-btn">确定</a>
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
                <!-- 课时评价-->
              <div id="myPlan2">
                <div class="control-group">
                        <span class="myAllCondition">员工编号：</span>
                        <input class="m-wrap myLcwrap" size="16" type="text" value="" id="commentSearchId"/>
                         <span class="myAllCondition">员工姓名：</span>
                        <input class="m-wrap myLcwrap" size="16" type="text" value="" id="commentSearchName"/>
                        <span class="myAllCondition" style="display: none">所属部门：</span>
                        <input class="m-wrap myLcwrap" size="16" type="text" value="" id="commentSearchNode" style="display: none"/>
                        <span class="myAllCondition">课时：</span>
                        <input class="m-wrap myLcwrap" size="16" type="text" value="" id="commentSearchCourse"/>
<!--                         <select class="small m-wrap" tabindex="1">
                                <option value="Category 1"></option>
                                <option value="Category 2"></option>
                                <option value="Category 3"></option>
                            </select>  -->  
                        <button class="btn blue myredbtn1 mysearchbtn1" onclick="commentSearch()">搜索</button>
                </div>
                <div class="control-group search-bar">    
                    <perm:checkPerm permissionCode="learnplan.export">                       
                        <button style="width: 90px !important;" class="btn blue myredbtn1" onclick="commentExport()">导出</button>
                    </perm:checkPerm>
                </div>
                <div class="row-fluid">

                    <div class="span12">

                        <!-- BEGIN EXAMPLE TABLE PORTLET-->

                        <div class="portlet box light-grey">

                            <div class="portlet-body">

                                <table class="table table-striped table-bordered table-hover" id="sample_2">
                                    <thead>
	                                    <tr>
	                                        <!-- <th style="width:8px;"></th> -->
	                                        <th>课时名称</th>	
	                                        <th>员工编号</th>                                        
	                                        <th>员工姓名</th>
	                                        <th>星级</th>
	                                        <th>评价</th>
	                                        <th>评价时间</th>	                                        

	                                    </tr>
                                    </thead>
                                    <tbody id="commentList_tbody" >
<!--                                      	<tr class="odd gradeX">
	                                        <td>安全生产管理知识讲座-pdf</td>
	                                        <td>张三</td>
	                                        <td>
	                                            <i class="icon-star"></i>
	                                            <i class="icon-star"></i>
	                                            <i class="icon-star"></i>
	                                            <i class="icon-star"></i>
	                                            <i class="icon-star"></i>
	                                        </td>
	                                        <td>课程安排合理</td>
	                                        <td>2016-04-11 12:06:32</td>                                                                        
                                    	</tr>  -->                                
                                    </tbody>
                                </table>
                                
						        <!--////////////////分页//////////////-->
						         <!-- table4aAjx -->
						        <div class="container-fluid">
						           <div id="ui-pager-4" class="ui-pager">
						                <div id="ui-pager-wrap-4" class="ui-pager-wrap">
						                    <div id="ui-page-num-4" class="ui-page-num">
						                        <a id="prev-4" class="prev disable">&lt;</a> 
						                        <a id="next-4" href="#" class="next">&gt;</a>
					                        	共<em id="page-count-4" class="page-count"></em>页，到第
					                        	 <input id="target-page-text-4" class="target-page-text" type="text">页 
					                        	 <a id="target-page-btn-4" class="target-page-btn">确定</a>
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
                <hr>
                <!-- BEGIN PAGE TITLE & BREADCRUMB-->

                <!-- END PAGE TITLE & BREAD
            <!-- ---------------------学习人员------------------------------------------- -->
                <div class="control-group">
                    <h4 class="media-heading mypageh4">学习人员</h4>
                    <span class="myAllCondition">员工编号：</span>

                    <!-- <input class="m-wrap myLcwrap" size="16" type="text" id="personSearchID"  onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"  /> -->
                   <input class="m-wrap myLcwrap" size="16" type="text" id="personSearchID"   />

                    <span class="myAllCondition">员工姓名：</span>
                    <input class="m-wrap myLcwrap" size="16" type="text"  id="personSearchName"/>
                    <span class="myAllCondition">所属部门：</span>
                    <input class="m-wrap myLcwrap" size="16" type="text" id="personSearchNode" />
                    <span class="myAllCondition">状态：</span>
                    <select class="small m-wrap" tabindex="1" id="personSearchState">
                        <option value="all">全部</option>
                        <option value="R">就绪</option>
                        <option value="L">学习中</option>
                        <option value="O">完成</option>
                    </select>
                    <button class="btn blue myredbtn1 mysearchbtn1" onclick="personSearch()" >搜索</button>  
                </div>
                <div class="control-group search-bar">
                	  <perm:checkPerm permissionCode="learnplan.export">
                        <button style="width: 90px !important;" class="btn blue" onclick="personExport()">导出</button>
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
                                        <th style="width:8px;"></th>
                                        <th>课程名称</th>
                                        <th>员工编号</th>
                                        <th class="hidden-480">员工姓名</th>
                                        <th class="hidden-480">所属部门</th>
                                    </tr>

                                    </thead>

                                    <tbody id="learnPlanPerson_tbody">

<!--                                     <tr class="odd gradeX">
                                        <td></td>
                                        <td>飞行员素质第一章</td>
                                        <td>987332</td>
                                        <td class="hidden-480">张三</td>
                                        <td class="center hidden-480">飞行部</td>
                                    </tr>

                                    <tr class="odd gradeX">
                                        <td></td>
                                        <td>飞行员素质第一章</td>
                                        <td>987332</td>
                                        <td class="hidden-480">李四</td>
                                        <td class="center hidden-480">飞行部</td>
                                    </tr> -->

                                    </tbody>

                                </table>
                                <!-- 点击查看触发的Modal -->
                            </div>
                        </div>
                        <!-- END EXAMPLE TABLE PORTLET-->
                    </div>
                </div>
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
        <!-- END PAGE -->
    </div>

		<!-- BEGIN PAGE LEVEL PLUGINS -->
     <c:import url="common/bottom.jsp"></c:import>

	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<!--分页-->
	<script src="${pageContext.request.contextPath}/js/common/twilight.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/js/common/ui.ajaxpager.js" type="text/javascript"></script>
     <script src="${pageContext.request.contextPath}/js/notify/addNotify.js"></script>
	<script src="${pageContext.request.contextPath}/js/app.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/common.js" type="text/javascript"></script>
	<!-- 当前页 -->
    <script src="${pageContext.request.contextPath}/js/learnPlay/learnCourseDetail.js" type="text/javascript"></script>
	<script>
	
	    jQuery(document).ready(function() {
	    	planID = ${requestScope.data.learnId};
	    	courseID = ${requestScope.data.id};
	    	TableAjax(1,maxVisible,"courseDetailList",true,courseID);
	    	personAjax(1,maxVisible,"learnPlanPerson",true,"","","","",courseID,planID);
	    	
	        /* App.init(); */
	    });
	
	</script>
			
</body>

<!-- END BODY -->
</html>