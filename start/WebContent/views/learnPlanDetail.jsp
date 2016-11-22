<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
 
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
 
<!--[if !IE]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<title>学习计划详情</title>
	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->

	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/DT_bootstrap.css" />
   	<!--当前页-->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/common.css">
    
    <!-- 分页 -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/page.css"/>
    
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
		<div class="page-content myEapage" id="myLpDPage">
            <!-- BEGIN PAGE HEADER-->
            <div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                    <h3 class="page-title" >
                         学习计划管理 &nbsp;<i class="icon-angle-right"></i>&nbsp;学习计划详情 
                         <p class="container-fluid pull-right" style="margin-top:5px">
                         	<c:if test="${requestScope.data.notstart==0}">
	                        	
	                        		<button class="btn blue" onclick="window.location.href='jv/learnplan/detailupdate.do?id=${requestScope.data.id}'">修改</button>
	                        		<button class="btn red myredbtn1" onclick="del(${requestScope.data.id})">删除</button>
	                        	
	                        </c:if>
	                        	
	                     </p>     
                    </h3>
                    <!-- END PAGE TITLE & BREADCRUMB-->
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
             <!-- ---------------------参考人员信息------------------------------------------- -->
             <div class="control-group" id="myEagroup1">                    
                     <span class="myAllCondition">员工编号:</span>
                     <input class="m-wrap mycondition" size="16" type="text" value="" id="searchPersonId"/>
                    <span class="myAllCondition">员工姓名:</span>
                     <input class="m-wrap mycondition" size="16" type="text" value="" id="searchPersonName"/>
                     <button  class="btn blue myredbtn1 mysearchbtn1" onclick="searchPerson()">搜索</button>
                     
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
                                    <th>ID</th>
                                    <th>员工编号</th>
                                    <th class="hidden-480">员工姓名</th>
                                    <th class="hidden-480">所属单位(部门或科室)</th>                                                                    
                                </tr>
                                </thead>
                                <tbody id="planPersonList_tbody">
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
	<script src="${pageContext.request.contextPath}/js/common/twilight.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/js/common/ui.ajaxpager.js" type="text/javascript"></script>
	
	<script src="${pageContext.request.contextPath}/js/learnPlay/learnPlanDetail.js"></script>

	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->

	<script src="${pageContext.request.contextPath}/js/app.js"></script>
    <script src="${pageContext.request.contextPath}/js/notify/addNotify.js"></script>
    <!-- 引入共通弹出框 -->
	<c:import url="common/commonAlert.jsp"></c:import> 
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/httpclient.js"></script>
			
	<script>
		
	    jQuery(document).ready(function() {
	        //App.init();
	        planID = ${requestScope.data.id};
	        
	        tableAjax(1,maxVisible,"learnPlanDetail",true,planID,false);
	        personAjax(1,maxVisible,"learnPlanDetail",true,planID,"","","",false);
	    });
	
	</script>
			
</body>

<!-- END BODY -->
</html>