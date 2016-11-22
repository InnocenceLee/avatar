
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
 
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
 
<!--[if !IE]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<title>新增学习计划</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->

	<link rel="stylesheet" href="../css/DT_bootstrap.css" />
	<link rel="stylesheet" href="../css/common/metro.css">
	<!--  IE8兼容两个模态框 -->
   <link rel="stylesheet" href="../css/bootstrap-modal.css">
   	<!--当前页-->
    <link rel="stylesheet" href="../css/common/common.css">
    
        <!-- 分页 -->
    <link rel="stylesheet" href="../css/common/page.css"/>
    
	<!-- END PAGE LEVEL STYLES -->
<!-- 分页 -->
    <link rel="stylesheet" href="../css/common/page.css"/>
    
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
		<div class="page-content myEapage" id="myLpaPage">
            <!-- BEGIN PAGE HEADER-->
            <div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                    <h3 class="page-title">
                         学习计划管理 <i class="icon-angle-right"></i> 新建学习计划
                    </h3>
                    <!-- END PAGE TITLE & BREADCRUMB-->
                </div>
            </div>
            <!-- ---------------------计划内容------------------------------------------- -->
            <div class="tab-content mycancelMain" id="myEatab1">
                    <!-- BEGIN FORM-->
                    <h4 class="media-heading">计划内容</h4>
                        <div class="control-group">
                            <label class="control-label myEaLable myAllCondition">计划名称：</label>
                            <div class="controls mycontrols">
                                <input id="planName" type="text" class="m-wrap large">
                            </div>
                        </div>
                        
                       <div class="control-group">
                            <label class="control-label myAllCondition">学习时间：</label>
                            <div class="controls mycontrols">
                                <input id="dateBegin" type="text" class="m-wrap medium js-bt-datetimepicker" data-format="date">
                                <span style="line-height: 30px;margin-left: 10px;margin-right: 30px;">至</span>
                                <input id="dateEnd" type="text" class="m-wrap medium js-bt-datetimepicker" data-format="date">
                            </div>
                        </div>
                        
                        <div class="control-group myNotice"> 
                            <label class="control-label">计划描述：</label>
                            <div class="controls mycontrols">
                                <textarea id="planIntroduction" class="large m-wrap" rows="5"></textarea>
                            </div>
                        </div>
                    <!-- END FORM-->             
                </div>      
             	<h4 class="media-heading myLplMedia1">课程内容</h4>
                <!-- ---------------------课程内容------------------------------------------- -->
                <div class="control-group" id="myEagroup1">
                      <p class="mybtnp1">
                           <button class="btn blue" data-toggle="modal" data-target="#myAddCourseModal" onclick="addCourse()">添加课程</button>
                           <button id="delCourse" class="btn red myredbtn1">批量删除</button>
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
                                    <th style="width:8px;"><input type="checkbox" class="checkboxes" value="1" id="allPlanCourse" onclick="checkAll('allPlanCourse','learnCourse')"/></th>
                                    <th>课程名称</th>
                                    <th>开课时间</th>
                                    <th>应学人数</th>  
                                    <th>完成人数</th>
                                    <th>正在学习人数</th>
                                    <th>正在学习人数</th>                                   
                                    <th>操作</th>
                                    <th></th>                                    
                                </tr>
                                </thead>
                                <tbody id="planCourseList_tbody">
<!--                                 <tr class="odd gradeX">
                                    <td><input type="checkbox" class="checkboxes" value="1" /></td>
                                    <td>飞行员素质第一章</td>
                                    <td>2016-6-30~2016-7-30</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td class="mylistSee">上移</td>
                                    <td class="mylistSee">下移</td>
                                    <td class="mylistSee1">删除</td>                                    
                                </tr>
                                <tr class="odd gradeX">
                                    <td><input type="checkbox" class="checkboxes" value="1" /></td>
                                    <td>飞行员素质第一章</td>
                                    <td>2016-6-30~2016-7-30</td>
                                    <td>15</td>
                                    <td>1</td>
                                    <td>15</td>
                                    <td>15</td>
                                    <td class="mylistSee">上移</td>
                                    <td class="mylistSee">下移</td>
                                    <td class="mylistSee1">删除</td>                
                                </tr> -->
                                </tbody>
                            </table>             
                        </div>                          
                    </div>
                    <!-- END EXAMPLE TABLE PORTLET-->                    
                </div>         
            </div>
             <h4 class="media-heading">学员信息</h4>
               <!-- ---------------------参考人员信息------------------------------------------- -->
               <div class="control-group" id="myEagroup1">
<!--                      <p class="mybtnp1">

          	         </p> -->
          	         <!--    发送方式选择 -->
		               <div class="control-group mygroup1">													
							<div class="controls">
							<button onclick="notifyPeople()" class="btn blue" data-toggle="modal" data-target="#myamModal">添加人员</button>
							<!-- <a id="basic_opener3" class="btn blue myredbtn1 btn-add btn-a" data-toggle="modal" id="btn-add" href="/start/jv/learnplan/import.do">导入人员</a> -->
							<button  class="btn blue" data-toggle="modal" data-target="#myGroupingModal">保存该分组</button>
                          <button onclick="delNotifyPerson()" class="btn red myredbtn1">批量删除</button>
						<!-- 	<label class="checkbox">
								<input name="notifyType" type="checkbox" value="P" /> 通过公告发送
							 </label>
							 <label class="checkbox">
								  <input name="notifyType"  type="checkbox" value="F" /> 通过飞行准备网发送
							  </label>
							  <label class="checkbox">
								<input name="notifyType"  type="checkbox" value="D" /> 通过飞叮咚发送
							 </label>
							 <label class="checkbox">
								  <input name="notifyType"  type="checkbox" value="M" /> 通过短信发送
							  </label> -->
							</div>
						</div>
<!--                        <span>员工编号:</span>
                       <input class="m-wrap" size="16" type="text" value="" id="searchPersonID"/>
                      <span>员工姓名:</span>
                       <input class="m-wrap" size="16" type="text" value="" id="searchPersonName"/>
                       <span>所属部门:</span>
                       <input class="m-wrap" size="16" type="text" value="" id="searchPersonNode"/>
                       <button  class="btn blue myredbtn1" onclick="searchPerson()">搜索</button> -->
                       
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
                                    <th style="width:8px;"><input  type="checkbox" class="checkboxes" value="1" id="allNotifyPerson" onclick="checkAll('allNotifyPerson','notifyPersonCheck')"/></th>
                                    <th style="display: none;"></th>
                                    <th>员工ID</th>
                                    <th class="hidden-480">员工姓名</th>
                                    <th class="hidden-480">所属部门</th>                                                                       
                                </tr>
                                </thead>
                                <tbody id="notifyPerson_table">

                                </tbody>
                            </table>      
                        </div>                          
                    </div>
                    <!-- END EXAMPLE TABLE PORTLET-->                    
                </div>
          
            </div>
            	<label class="checkbox mySendCheck">
					 <input name="notifyType" type="checkbox" value="P" /> 通过公告发送
				</label>
				<!--  
				<label class="checkbox mySendCheck">
					 <input name="notifyType"  type="checkbox" value="F" /> 通过飞行准备网发送
				 </label>
				 <label class="checkbox mySendCheck">
					 <input name="notifyType"  type="checkbox" value="D" /> 通过飞叮咚发送
				 </label>
				<label class="checkbox mySendCheck">
					<input name="notifyType"  type="checkbox" value="M" /> 通过短信发送
				 </label>
				 -->
            <p class="mybtnp2">
                 <button id="addPlanBtn" class="btn blue">保存</button>
                 <button class="btn red myredbtn1" onclick="window.location.href='learnPlanList.jsp'">取消</button>
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
                            <div id="myAddCourseModal" class="modal hide fade" tabindex="-1" data-width="800">
	                            <div class="modal-header">
		                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
		                            <h4 class="modal-title" id="myModalLabel3">添加课程</h4>
	                            </div>
                                <div class="modal-body">              
		                          	<div class="control-group" id="myEagroup1">                             
				                        <span class="myAllCondition">课程名称:</span>
				                        <input class="m-wrap" size="16" type="text" value="" id="searchCourseName" style="width:131px;"/>                      
				                        <span class="myAllCondition">课程类型:</span>
				                        <select id="searchCourseType" class="small m-wrap" tabindex="1">
				                                <option value="S">标准课程</option>
				                                <option value="M">通知课件</option>
				                            </select>
				                        <button  class="btn blue myredbtn1 mysearchbtn1" onclick="searchCourse()" style="margin-left:0px;">搜索</button>
				                        <a  class="btn myEabtn1 mybbasic btn-a" href="courseAdd.jsp" target="_blank">新建课程</a>
			                		</div>
					               <div class="row-fluid">
						                <div class="span12">
						                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
						                    <div class="portlet box light-grey">
						                        <div class="portlet-body">
						                            <table class="table table-striped table-bordered table-hover" id="sample_1">
						                                <thead>
						                                <tr>
						                                    <th style="width:8px;"><input type="checkbox" class="checkboxes" value="1" id="all" onclick="checkAll('all','learnAddCourse')"/></th>
						                                    <th>名称</th>
						                                    <th class="hidden-480">课程类型</th>
						                                    <th class="hidden-480">创建时间</th>
						                                    <th class="hidden-480">所属部门</th>                                                                       
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
	
	<c:import url="common/bottom.jsp"></c:import>
		<!-- BEGIN PAGE LEVEL PLUGINS -->
    <c:import url="common/commonAlert.jsp"></c:import> 
	
	<!--分页-->
	<script src="../js/common/twilight.js" type="text/javascript"></script>
	<script src="../js/common/ui.ajaxpager.js" type="text/javascript"></script>
	
	<!-- 控制模态框 --><!--树  -->
	<script src="/start/js/upload/jquery.form.js" type="text/javascript"></script>
	<script src="../js/common/addPerson.js"></script>
	<script type="text/javascript" src="../js/httpclient.js"></script>
	<script src="../js/common/jquery.ztree.all-3.5.min.js"></script>
	

	<script src="../js/learnPlay/learnPlanAdd.js"></script>
	<!-- END PAGE LEVEL PLUGINS -->
	<!--分页-->
	<script src="../js/common/twilight.js" type="text/javascript"></script>
	<script src="../js/common/ui.ajaxpager.js" type="text/javascript"></script>

	<!-- BEGIN PAGE LEVEL SCRIPTS -->
    <script src="../js/common/sidebar.js" type="text/javascript"></script>
	<script src="../js/app.js"></script>
     <!-- IE8兼容两个模态框 -->
	<script src="../js/bootstrap-modalmanager.js"></script>
	<script src="../js/bootstrap-modal.js"></script>
	<!-- 数据校验 -->
     <script src="../js/common/checkData.js" type="text/javascript"></script>
     
	
			
</body>

<!-- END BODY -->
</html>