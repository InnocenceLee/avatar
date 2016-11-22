<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
  <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
 
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
 
<!--[if !IE]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<title>修改学习计划</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>
	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->
	<!-- 引入共通弹出框 -->
	<c:import url="common/commonAlert.jsp"></c:import> 
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/metro.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/DT_bootstrap.css" />
   	<!--当前页-->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/common.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/page.css"/>
	<!-- END PAGE LEVEL STYLES -->
     <!-- 分页 -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/page.css"/>
</head>
    <!-- BEGIN BODY -->
<body class="page-header-fixed">
	<input type="hidden" name="contextPath" value="${pageContext.request.contextPath}">
	<c:import url="common/top.jsp"></c:import> 	
	
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
			<!-- BEGIN SIDEBAR -->
		<c:import url="common/sidebar.jsp"></c:import>
		<!-- BEGIN PAGE CONTAINER-->
		<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
		<div class="page-content myEapage" id="myLpuPage">
            <!-- BEGIN PAGE HEADER-->
            <div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                    <h3 class="page-title">
                         学习计划管理 <i class="icon-angle-right"></i> 修改学习计划
                    </h3>
                    <!-- END PAGE TITLE & BREADCRUMB-->
                </div>
            </div>
            <!-- ---------------------计划内容------------------------------------------- -->
            <div class="tab-content" id="myEatab1">
              <!-- BEGIN FORM-->
              <h4 class="media-heading">计划内容</h4>
                 <div class="control-group">
                     <label class="control-label myEaLable myAllCondition">计划名称：</label>
                     <div class="controls mycontrols">
                         <input id="planName" type="text" class="m-wrap large" value="${requestScope.data.name}">
                     </div>
                 </div>                
                <div class="control-group">
                     <label class="control-label myEaLable myAllCondition">学习时间：</label>
                     <div class="controls mycontrols">
                     	 
                         <input id="trainBatchStart" type="text" class="m-wrap medium js-bt-datetimepicker" data-format="date" value="${fn:replace(data.trainBatchStart,' ','T') }">
                         <span style="line-height: 30px;margin-left: 10px;margin-right: 30px;" class="myAllCondition">至</span>
                         <input id="trainBatchEnd" type="text" class="m-wrap medium js-bt-datetimepicker" data-format="date" value="${fn:replace(data.trainBatchEnd,' ','T') }">
                     </div>
                 </div>                                                                                                                                                                        	
                 <div class="control-group myNotice">
                     <label class="control-label myEaLable">计划描述：</label>
                     <div class="controls mycontrols">
                         <textarea id="planIntroduction"  class="large m-wrap" rows="5">${requestScope.data.describe}</textarea>
                     </div>
                 </div>
               <!-- END FORM-->             
            </div>      
             	<h4 class="media-heading myLplMedia1">课程内容</h4>
                <!-- ---------------------课程内容------------------------------------------- -->
                <div class="control-group" id="myEagroup1">
                      <p class="mybtnp1">
                           <button class="btn blue" data-toggle="modal" data-target="#myAddCourseModal" onclick="addCourse()">添加课程</button>
                           <button id="delCourseBtn" class="btn red myredbtn1">批量删除</button>
           	         </p>       
                </div>     	         
               <div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
                    <div class="portlet box light-grey">
                        <div class="portlet-body">
                            <table class="table table-striped table-bordered table-hover" id="sample_1">
                                <thead>
                                <tr>
                                    <th style="width:8px;"><input type="checkbox" class="checkboxes" value="1" id="all" onclick="checkAll('all','learnCourse')"/></th>
                                    <th>计划名称</th>
                                    <th>开课时间</th>
                                    <th>结束时间</th>
                                    <th>应学人数</th>  
                                    <th>完成人数</th>
                                    <th>正在学习人数</th>
                                    <th>未学人数</th>                                   
                                    <th>操作</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody id="planCourseList_tbody">
                                </tbody>
                            </table>                
                        </div>                          
                    </div>
                    <!-- END EXAMPLE TABLE PORTLET-->                    
                </div>         
            </div>
             <h4 class="media-heading myLplMedia1">学员信息</h4>
             <!-- ---------------------参考人员信息------------------------------------------- -->
             <div class="control-group" id="myEagroup1">
     	           <!--    发送方式选择 -->
				<div class="control-group mygroup1">																							
                 <div class="control-group">													
				  <div class="controls">
				    <button onclick="notifyPeople()" class="btn blue" data-toggle="modal" data-target="#myamModal">添加人员</button>
                     <button  class="btn red myredbtn1" onclick="delNotifyPerson()">批量删除</button>
				</div>
			</div>   
                   <button class="btn myEabtn1" data-toggle="modal" data-target="#myGroupingModal">保存到分组</button>
             </div>
   	
            <!-- END PAGE HEADER-->
            <!-- BEGIN PAGE CONTENT-->
            <div class="row-fluid" id="myInformation">
                <div class="span12">
                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
                    <div class="portlet box light-grey">
                        <div class="portlet-body">
                            <table class="table table-striped table-bordered table-hover" id="sample_1">
                                <thead>
                                <tr>
                                    <th style="width:8px;"><input  type="checkbox" class="checkboxes" value="1" id="allNotifyPerson" onclick="checkAll('allNotifyPerson','notifyPersonCheck')"/></th>
                                    <th>员工编号</th>
                                    <th class="hidden-480">员工姓名</th>
                                    <th class="hidden-480">所属部门</th>                                                                       
                                </tr>
                                </thead>
                                <tbody id="notifyPerson_table">

                                </tbody>
                            </table>  
                            <div class="container-fluid" style="display:none;">
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
            <p class="mybtnp2">
                 <button id="updatePlanBtn" class="btn blue">保存</button>
                 <a href="${pageContext.request.contextPath}/views/learnPlanList.jsp"><button class="btn red myredbtn1">取消</button></a>
         	 </p>
         	 
         	 
           	   <!-- 点击保存到分组触发的Modal -->
               <div id="myGroupingModal" class="modal hide fade" tabindex="-1" data-width="760">
	                <div class="modal-header">
		                 <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
		                 <h4 class="modal-title" id="myModalLabel3">保存到分组</h4>
	                </div>
                   <div class="modal-body">
                        <span class="myAllCondition">分组名称：</span>
                                            <input id="groupName" class="m-wrap hasDatepicker" size="16" type="text" value="">                                                                                        
                   </div>
                   <div class="modal-footer">
                         <button type="button" data-dismiss="modal" class="btn">取消</button>
                         <button id="saveGroupBtn" type="button" class="btn blue">确定</button>
                   </div>
               </div>
               
               
               
               <!-- 点击添加课程触发的Modal -->
               <div id="myAddCourseModal" class="modal hide fade" tabindex="-1" data-width="760">
                   <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title" id="myModalLabel3">添加课程</h4>
                   </div>
                      <div class="modal-body">              
                  	<div class="control-group" id="myEagroup1">                             
                  <span class="myAllCondition">课程名称:</span>
                  <input class="m-wrap" size="16" type="text" value="" id="searchCourseName"/>                      
                  <span class="myAllCondition">课程类型:</span>
                  <select id="searchCourseType" class="small m-wrap" tabindex="1">
                          <option value="S">标准课程</option>
                          <option value="M">通知课件</option>
                      </select>
                  <button  class="btn blue myredbtn1 mysearchbtn1" onclick="searchCourse()" style="margin-top: 0;">搜索</button>
                  <a href="${pageContext.request.contextPath}/views/courseAdd.jsp"  target="_Blank"><button  class="btn myEabtn1">新建课程</button></a>
         		</div>
	          <div class="row-fluid">
	            <div class="span12">
	                <!-- BEGIN EXAMPLE TABLE PORTLET-->
	                <div class="portlet box light-grey">
	                    <div class="portlet-body">
	                        <table class="table table-striped table-bordered table-hover" id="sample_1">
	                            <thead>
	                            <tr>
	                                <th style="width:8px;"><input type="checkbox" class="checkboxes" value="1" id="allAdd" onclick="checkAll('allAdd','learnAddCourse')"/></th>
	                                <th>名称</th>
	                                <th class="hidden-480">课程类型</th>
	                                <th class="hidden-480">创建时间</th>
	                                <th class="hidden-480">所属部门</th>                                                                       
	                            </tr>
	                            </thead>
	                            <tbody id="addCourseList_tbody">
	
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
				</div>
                      <div class="modal-footer">
                           <button type="button" data-dismiss="modal" class="btn">取消</button>
                           <button id="addCorseBtn" type="button" class="btn blue">确定</button>
                      </div>
                 </div>
             <!-- 点击添加人员触发的模态框 -->
            <c:import url="common/addPerson.jsp"></c:import> 
       	</div>
        <!-- END PAGE -->
    </div>
</div>
	<c:import url="common/bottom.jsp"></c:import>
		<!-- BEGIN PAGE LEVEL PLUGINS -->
     
           <!-- 控制添加人员的模态框 -->
	<!--树  -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/httpclient.js"></script>	
	<script src="${pageContext.request.contextPath}/js/common/jquery.ztree.all-3.5.min.js"></script>

	<script src="${pageContext.request.contextPath}/js/common/addPerson.js"></script>
	
	
	<!--分页-->
	<script src="${pageContext.request.contextPath}/js/common/twilight.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/js/common/ui.ajaxpager.js" type="text/javascript"></script>
	
	<script src="${pageContext.request.contextPath}/js/learnPlay/learnPlanUpdate.js"></script>

	<!-- 数据校验 -->
     <script src="${pageContext.request.contextPath}/js/common/checkData.js" type="text/javascript"></script>

	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->

    <script src="${pageContext.request.contextPath}/js/notify/addNotify.js"></script>
	<script src="${pageContext.request.contextPath}/js/app.js"></script>
	

	<script>
	
	    jQuery(document).ready(function() {
	
	    	
// 	        App.init();
	        
	        planId =  ${requestScope.data.id};
	        oldTableAjax(1,maxVisible,"learnPlanDetail",true,planId);
	        personAjax(1,maxVisible,"learnPlanDetail",true,planId,"","","",false);
	        
// 	        $("#trainBatchStart").attr("value","${requestScope.data.trainBatchStart}");
	        
// 			$("#trainBatchEnd").attr("value","${requestScope.data.trainBatchEnd}");
	    });
	
	</script>
			
</body>

<!-- END BODY -->
</html>