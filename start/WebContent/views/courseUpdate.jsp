<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<title>修改课程</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/DT_bootstrap.css" />
	
   	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/metro.css">
	<!--当前页-->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/common.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/courseAuditing.css">   
    <!-- 分页 -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/page.css"/>
    <style>
        #courseType {
            width: 524px !important;
        }
        #courseClassifications {
            width: 524px !important;
        }
    </style>  
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
			<div class="page-content" id="mycuPage">
             <!-- BEGIN PAGE HEADER-->
            <div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                    <h3 class="page-title">
                        课程管理 <i class="icon-angle-right"></i>
                        修改课程
                    </h3>
                    <!-- END PAGE TITLE & BREADCRUMB-->
                </div>
            </div>
            <!-- ---------------------基本信息------------------------------------------- -->
            <div class="tab-content">
                    <!-- BEGIN FORM-->
                    <h4 class="media-heading">基本信息</h4>
                        <div class="control-group">
                            <label class="control-label myAllCondition">课程名称：</label>
                            <div class="controls mycontrols">
                                <input id="courseName" type="text" placeholder="" class="m-wrap large" value="${requestScope.data.name}">
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label myAllCondition">课程类型：</label>
                            <div class="controls mycontrols">
                                <select class="large m-wrap" tabindex="1" id="courseType"  >
                                    <option value="S">标准课件</option>
                                    <option value="M">通知课件</option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label myAllCondition">课程类别：</label>
                            <div class="controls mycontrols">
                                <select class="large m-wrap" tabindex="1" id="courseClassifications">
                                    <option value="X">线上课程</option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group mykpcontrol">
                            <label class="control-label" style="margin-left: 14px;">知识点：</label>
                            <div class="controls mycontrols">
                                <input id="klName" class="large m-wrap" type="text" disabled="disabled" value="${requestScope.data.knowledgePointName}" />
                                <img class="myKpselector" src="../../../images/preCourseIcon.png" data-toggle="modal" data-target="#mycuModal" onclick="chooseKl()"></i>
                                 <!-- <i class="icon-zoom-in" data-toggle="modal" data-target="#mycuModal" onclick="chooseKl()"></i> -->
                            </div>
                            <br>
                        </div>
                         <div class="control-group mykpcontrol">
                          <p class="myKpselection">
                            <img src="../../../images/preCourseIcon.png" data-toggle="modal" data-target="#myAddPreCourse"  onclick="choosePreCourse()"></i>
                          </p>                        
                        </div>
                        <div class="control-group">
                            <label class="control-label">前置课程：</label>
                            <div class="controls mycontrols">
                                <textarea id="preName" class="large m-wrap" rows="3" disabled="disabled">${requestScope.data.preCoursesName}</textarea>
                                 <!-- <i class="icon-zoom-in" data-toggle="modal" data-target="#myAddPreCourse"  onclick="choosePreCourse()"></i> -->
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" style="opacity: 0">前置课程：</label>
                            <div class="controls mycontrols">
                                <label class="checkbox">
                                    <input type="checkbox" value="S" id="lesson_order" ${requestScope.data.lessonOrder=='S' ? '' : 'checked' }> 课时顺序固定
                                </label>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">课程描述：</label>
                            <div class="controls mycontrols">
                                <textarea class="large m-wrap" rows="5" id="introduction">${requestScope.data.introduction}</textarea>
                            </div>
                        </div>
                    <!-- END FORM-->
            </div>

            <!-- ---------------------课时管理------------------------------------------- -->
            <h4 class="media-heading">课程内容</h4>

            <p>
                <button class="btn blue myredbtn1  clean-data myCancelbtn" data-toggle="modal" data-target="#myAddModal">新增</button>
                <button id="delLessonBtn" class="btn red myredbtn1  clean-data">删除</button>
            </p>
            <!-- 点击新增触发的Modal -->
            <div id="myAddModal" class="modal hide fade" tabindex="-1" data-width="760">
	            <div class="modal-header">
	            	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
	                <h4 class="modal-title myNewh4" id="myModalLabel3">新建课时</h4>
	                <span>类型：</span>
	                <select class="small m-wrap" tabindex="1" id="lessonCourseType" style="margin-bottom: 0;">
	                     <option value="E" onclick="myStudy()">学习</option>
	                     <option value="X" onclick="myExamination()">考试</option>
	               	</select>
	           </div>
	           <div class="modal-body">
	           <div id="mystudy">
	              <h4 class="mymodalh4">课件信息</h4>					
				  <span class="myAllCondition">课时名称：</span>
				    <input id="lessonName" class="m-wrap hasDatepicker Bomb-box" style="margin-bottom: 10px;" size="16" type="text" value=""><br>	
				     <div class="myVerification" style="top:72px;">
				         <input id="lessonJionSystem" type="checkbox" value="Y" class="myJion">加入知识体系
				     </div>		
				     <div style="position:relative;">
				        <span class="myAllCondition">课时时长：</span>
				    <input id="duration" class="m-wrap hasDatepicker Bomb-box" style="margin-bottom: 10px;" size="16" type="text" value="">
				       <span class="myVerification" style="top:5px;left:310px;">分</span>
				     </div>		 				 
				    
				    <!--     选择课件 -->
				    <form id="coursewareUpload" action="jv/courseware/upload.do" method="post" enctype="multipart/form-data" style="position:relative;">
				    <span class="myAllCondition">&#12288;&#12288;课件：</span>
				    <input disabled='disabled' id="coursewareFilename" class="m-wrap hasDatepicker Bomb-box" size="16" type="text" value="">
					<input type="button" class="fileupload-new myfile" value= " 选择课件 ">
					<input id="courseware" name="courseware" type="file" class="default">
					<input type="button" onclick="uploadfile(coursewareUpload)" class="fileupload-new myfile" style="position:absolute;left:380px;height:30px;background-color:#ffffff;" value="上传" />
					</form>
					<div class="control-group mycugroup1">
						<div class="controls">
							<label class="checkbox line" style="width: 200px">
							<input id="lessonDragFlag" type="checkbox" value="Y">禁止拖动播放进度
							</label>
							<label class="checkbox line" style="width: 200px" id="myHangcheck">
							<input id="lessonAvoidIdle" type="checkbox" value="1">防止挂机(随机验证码)
							<!--lyh  勾选放挂机后 需要显示配置  -->
							</label>
							<div id="myHangup1">
							   <input type="text" class="m-wrap Bomb-box" size="16" id="idleDuration">&#12288;<span class="myAllCondition">分钟</span>
							</div>
						</div>
					</div>
					<span>课时描述：</span>
				 	<textarea id="lessonIntroduction"  class="large m-wrap myBomb Bomb-box" rows="5"></textarea>
	           </div>					
				 	  <!-- --------------------考试---------------------- -->
				  <div id="myExamination">
				     <div class="tab-content" id="myCatab1">
                       <h4 class="media-heading">考试基本信息</h4>                   
                        <div class="control-group">
                         	<!-- <input style="display:none;" id="examUpdateid" type="text" class="Bomb-box">
                            <input style="display:none;" id="examPlanUpdateid" type="text" class="Bomb-box"> -->
                            <label class="control-label myAllCondition">&#12288;&#12288;考试名称：</label>
                            <div class="controls mycontrols">
                                <input id="examName" type="text" class="m-wrap medium myEamedium Bomb-box">
                            </div>
                        </div>                        
                       <div class="control-group">
                            <label class="control-label myAllCondition">考试截止时间：</label>
                            <div class="controls mycontrols">
                                <input  id="examStart" type="date" class="m-wrap medium Bomb-box">  
                                <span class="myAllCondition">至</span>
                                <input id="examEnd" type="date" class="m-wrap medium Bomb-box">                           
                            </div>
                        </div>              
                        <div class="control-group">
                            <label class="control-label myEaLable1 myAllCondition">&#12288;&#12288;考试类型：</label>
                            <div class="controls mycontrols">
                                <select id="examClassifications" class="medium m-wrap myEamedium" tabindex="1">
                                    <option value="线上自主">线上自主</option>
                                </select>
                            </div>
                        </div> 
                        <div class="control-group myScoreContro">
                            <label class="control-label myAllCondition">&#12288;&#12288;考试时长：</label>
                            <div class="controls mycontrols" style="position:relative;">
                                <input id="examDuration" type="text" class="m-wrap medium Bomb-box">
                                <span class="mypassTime1 myVerification" style="top:5px;">分钟（0表示不限时间）</span>                              
                            </div>                                                   
                        </div>
                        </div>
                       <div class="tab-content" id="myCatab2">
                       <h4 class="media-heading">考试控制</h4>                                      
                        <div class="control-group myScoreContro">
                            <label class="control-label myAllCondition">&#12288;&#12288;及格分数：</label>
                            <div class="controls mycontrols">
                                <input id="examPassScore" type="text" class="m-wrap medium Bomb-box">                              
                            </div>                                                   
                        </div>
                        <div class="control-group" id="myScoreContro2">
                            <label class="control-label myAllCondition">考试次数：</label>
                            <div class="controls mycontrols">
                                <input id="exmaNum" type="text" class="m-wrap medium Bomb-box">
                            </div>                       
                        </div>                                      	
                        <label class="checkbox" id="myCacheck1">
								<input id="examRandomOrder" type="checkbox" value="Y" /> 试题和选项乱序
						</label>
						 <div class="control-group">
                            <label class="control-label myAllCondition">&#12288;&#12288;答题模式：</label>
                            <div class="controls mycontrols">
                                <select id="examPattern" class="medium m-wrap myEamedium " tabindex="1">
                                    <option value="O">显示完整试卷</option>
                                    <option value="F">每次先是一题</option>
                                </select>
                            </div>
                        </div> 
                        <div class="control-group">
                            <label class="control-label myAllCondition">&#12288;&#12288;成绩发布：</label>
                            <div class="controls mycontrols">
                                <select id="examAchievementRelease" class="medium m-wrap myEamedium" tabindex="1">
                                    <option value="不发布">不发布</option>
                                    <option value="延时发布">延时发布</option>
                                </select>
                                <div id="myDelayed">
                                       <label class="control-label myAllCondition">延时时间：</label>
									    <input id="delayTime" type="text" class="m-wrap medium Bomb-box"><span class="myAllCondition">分</span>
									 </div>	
                            </div>
                        </div>   
                        <div class="control-group">
                            <label class="control-label">&#12288;&#12288;考试须知：</label>
                            <div class="controls mycontrols">
                                <textarea id="examNotice" class="large m-wrap Bomb-box" rows="5"></textarea>
                            </div>
                        </div>                                              
                </div>
                <!-- ---------------选择试卷------------------ -->
                <div class="control-group" id="myCagroup3">  
                        <h4 class="media-heading">选择试卷</h4>                   
                        <span class="myAllCondition">试卷名称:</span>	
                        <input class="m-wrap" id="searchExamPaperName" size="16" type="text" value=""/>                       
                        <button onclick="searchPaper()" class="btn blue myredbtn1 mysearchbtn1">搜索</button>
                        <a class="btn myCabtn1 btn-a" href="${pageContext.request.contextPath}/views/examPaperAdd.jsp" target="_blank">新建试卷</a>
                </div>    
                 <div class="row-fluid">
                  <div class="span12">
                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
                    <div class="portlet box light-grey">
                        <div class="portlet-body">
                            <table class="table table-striped table-bordered table-hover" id="sample_1">
                                <thead>
                                <tr>
                                    <th style="width:8px;"></th>
                                    <th>考试名称</th>                                    
                                </tr>
                                </thead>
                                <tbody id="paper_table">
         <!--                          <tr class="odd gradeX">
                                    <td><input type="checkbox" class="checkboxes" value="1" /></td>
                                    <td>员工入职试卷</td>                                                               
                                  </tr>
                                   <tr class="odd gradeX">
                                    <td><input type="checkbox" class="checkboxes" value="1" /></td>
                                    <td>客机驾驶操作试卷</td>                                                               
                                  </tr>
                                   <tr class="odd gradeX">
                                    <td><input type="checkbox" class="checkboxes" value="1" /></td>
                                    <td>客机维修保养试卷</td>                                                               
                                  </tr> -->
                                </tbody>
                            </table>
	               			<!--////////////////分页//////////////-->
<!-- 					        <div class="container-fluid"> -->
<!-- 					            <div id="ui-pager" class="ui-pager"> -->
<!-- 					                <div id="ui-pager-wrap" class="ui-pager-wrap"> -->
<!-- 					                    <div id="ui-page-num" class="ui-page-num"> -->
<!-- 					                        <a id="prev" class="prev disable">&lt;</a>  -->
<!-- 					                        <a id="next" href="#" class="next">&gt;</a> -->
<!-- 				                        	共<em id="page-count" class="page-count"></em>页，到第 -->
<!-- 				                        	 <input id="target-page-text" class="target-page-text" type="text">页  -->
<!-- 				                        	 <a id="target-page-btn" class="target-page-btn">确定</a> -->
<!-- 					                    </div> -->
<!-- 					                </div> -->
<!-- 					            </div> -->
<!-- 					        </div> -->
                        </div>                          
                    </div>
                               
                </div>        
			  </div>           
		  	</div>
	            </div>
	            <div class="modal-footer">
	            	<span style=" margin-right:50px" class="Bomb-box"></span>
	                <button type="button" data-dismiss="modal" class="btn myCancelbtn">取消</button>
	                <button id="addLessonBtn" type="button" class="btn blue" >确定</button>
	            </div>
            </div>
            <!-- END PAGE HEADER-->

            <!-- BEGIN PAGE CONTENT-->

            <div class="row-fluid" style="padding-bottom: 80px;" >
                <div class="span12">
                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
                    <div class="portlet box light-grey">
                        <div class="portlet-body">
                            <table class="table table-striped table-bordered table-hover" id="sample_1">
                                <thead>
                                <tr>
                                    <th style="width:8px;"><input type="checkbox" class="checkboxes" value="1" id="all" onclick="checkAll('all','lessonCheck')"/></th>
                                    <th class="hidden-480">名称</th>
                                    <th class="hidden-480">类型</th>
                                    <th class="hidden-480">课时描述</th>
                                    <th class="hidden-480">排序</th>
                                    <th class="hidden-480">操作</th>
                                </tr>
                                </thead>
                                <tbody id="addLesson_tbody">
<!--                                  <tr class="odd gradeX">
                                    <td><input type="checkbox" class="checkboxes" value="1" /></td>
                                    <td>安全学习</td>
                                    <td>线上课程</td>
                                    <td class="hidden-480">四川航空股份有限公司(Sichuan Airlines,简称"川航")的前身是四川航空公司，该<br>公司成立于1986年9月19日，1988年7月14日正式开航运营，四川航空股份有限.....</td>
                                    <td class="hidden-480"><span class="sort1">上移</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sort2">下移</span></td>
                                    <td class="center hidden-480"><span class="sort1" data-toggle="modal" data-target="myModifyModal">修改</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sort2">删除</span></td>
                                </tr> -->
                                </tbody>
                            </table>
                            	
                            <!-- 点击修改触发的Modal -->
                            <div id="myModifyModal" class="modal hide fade" tabindex="-1" data-width="760">
					            <div class="modal-header">
					            	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					                <h4 class="modal-title myNewh4" id="myModalLabel3">修改课时</h4>
					                <span>类型：</span>
					                <select class="small m-wrap" tabindex="1" id="modifyCourseType" style="margin-bottom: 0;">
					                     <option value="E">学习</option>
<!-- 					                     <option value="X">考试</option> -->
					               	</select>
					           </div>
					           <div class="modal-body">
					           <div id="mystudy1">
					             <h4>课件信息</h4>
								    <span class="myAllCondition">课时名称：</span>
								    <input style="display:none;" id="lessonUpdateid" type="text" class="Bomb-box">
								    <input style="display:none;" id="coursewareId" type="text" class="Bomb-box">
								    <input style="display:none;" id="train_course_lesson" type="text" class="Bomb-box">
								    <input style="display:none;" id="sequence" type="text" class="Bomb-box">
								    <input id="modifyLessonName" class="m-wrap hasDatepicker Bomb-box" size="16" type="text" > <br> 
								    <div class="myVerification" style="top:72px;">
								       <input id="modifyLessonJionSystem" type="checkbox" value="Y" class="myJion">加入知识体系
								    </div> 	
								    <div style="position:relative;">
								      <span class="myAllCondition">课时时长：</span>
				    				<input id="modifyduration" class="m-wrap hasDatepicker Bomb-box" size="16" type="text" value="">
				    				<span class="myAddTime myVerification" style="top:5px;">分</span>
								    </div>							    								   
									<form id="coursewareModifyUpload" action="jv/courseware/upload.do" method="post" enctype="multipart/form-data" style="position:relative;">
								    <span class="myAllCondition">&#12288;&#12288;课件：</span>
								    <input disabled='disabled'  id="modifyCoursewareFilename" class="m-wrap hasDatepicker Bomb-box" size="16" type="text" value="">
									<input class="fileupload-new myfile" value= " 选择课件 ">
									<input id="courseware" name="courseware" type="file" class="default"><br>
									<input type="button" onclick="uploadfile(coursewareModifyUpload)" class="fileupload-new myfile" style="position:absolute;left:380px;height:30px;background-color:#ffffff;" value="上传" />
									</form>
									<div class="control-group mycugroup1">
										<div class="controls">
											<label class="checkbox line">
											<input id="modifyLessonDragFlag" type="checkbox" value="Y">禁止拖动播放进度
											</label>
											<label class="checkbox line" id="myHangcheck2">
											<input id="modifyLessonAvoidIdle" type="checkbox" value="">防止挂机(随机验证码)											
											</label>
											<div id="myHangup2">
							                    <input type="text" class="m-wrap" size="16" id="modifyidleDuration" style="margin-right:0px;">&#12288;<span class="myAllCondition">分钟</span>
							                </div>
										</div>
									</div>
									<span>课时描述：</span>
								 	<textarea id="modifyLessonIntroduction"  class="large m-wrap myBomb" rows="5"></textarea>
					           </div>
							<!-- --------------------考试---------------------- -->
							  <div id="myExamination1">
							     <div class="tab-content" id="myCatab1">
			                       <h4 class="media-heading">考试基本信息</h4>                   
			                        <div class="control-group">
			                         	<input style="display:none;" id="examUpdateid" type="text" class="Bomb-box">
			                            <input style="display:none;" id="examPlanUpdateid" type="text" class="Bomb-box">
			                            <label class="control-label myAllCondition">&#12288;&#12288;考试名称：</label>
			                            <div class="controls mycontrols">
			                                <input id="modifyexamName" type="text" class="m-wrap medium myEamedium Bomb-box">
			                            </div>
			                        </div>                        
			                       <div class="control-group">
			                            <label class="control-label myAllCondition">考试截止时间：</label>
			                            <div class="controls mycontrols">
			                                <input  id="modifyexamStart" type="date" class="m-wrap medium Bomb-box">  
			                                <span class="myAllCondition">至</span>
			                                <input id="modifyexamEnd" type="date" class="m-wrap medium Bomb-box">                           
			                            </div>
			                        </div>              
			                        <div class="control-group">
			                            <label class="control-label myEaLable1 myAllCondition">&#12288;&#12288;考试类型：</label>
			                            <div class="controls mycontrols">
			                                <select id="modifyexamClassifications" class="medium m-wrap myEamedium" tabindex="1">
			                                    <option value="线上自主">线上自主</option>
			                                </select>
			                            </div>
			                        </div> 
			                        <div class="control-group myScoreContro" style="position:relative;">
			                            <label class="control-label myAllCondition">&#12288;&#12288;考试时长：</label>
			                            <div class="controls mycontrols">
			                                <input id="modifyexamDuration" type="text" class="m-wrap medium Bomb-box">			                          
			                                <span class="mypassTime1 myVerification" style="top:0px;">分钟（0表示不限时间）</span>                              
			                            </div>                                                   
			                        </div>
			                        </div>
			                       <div class="tab-content" id="myCatab2">
			                       <h4 class="media-heading">考试控制</h4>                                      
			                        <div class="control-group myScoreContro">
			                            <label class="control-label myAllCondition">&#12288;&#12288;及格分数：</label>
			                            <div class="controls mycontrols">
			                                <input id="modifyexamPassScore" type="text" class="m-wrap medium Bomb-box">                              
			                            </div>                                                   
			                        </div>
			                        <div class="control-group" id="myScoreContro2">
			                            <label class="control-label myAllCondition">&#12288;&#12288;考试次数：</label>
			                            <div class="controls mycontrols">
			                                <input id="modifyexmaNum" type="text" class="m-wrap medium Bomb-box">
			                            </div>                       
			                        </div>                                      	
			                        <label class="checkbox" id="myCacheck1">
											<input id="examRandomOrder" type="checkbox" value="Y" /> 试题和选项乱序
									</label>
									 <div class="control-group">
			                            <label class="control-label myAllCondition">&#12288;&#12288;答题模式：</label>
			                            <div class="controls mycontrols">
			                                <select id="modifyexamPattern" class="medium m-wrap myEamedium " >
			                                    <option value="O">显示完整试卷</option>
			                                    <option value="F">每次先是一题</option>
			                                </select>
			                            </div>
			                        </div> 
			                        <div class="control-group">
			                            <label class="control-label myAllCondition">&#12288;&#12288;成绩发布：</label>
			                            <div class="controls mycontrols">
			                                <select id="modifyexamAchievementRelease" class="medium m-wrap myEamedium" >
			                                    <option value="不发布">不发布</option>
			                                    <option value="延时发布">延时发布</option>
			                                </select>
			                                <div id="mycDelayed">
			                                       <label class="control-label myAllCondition">延时时间：</label>
												    <input id="modifydelayTime" type="text" class="m-wrap medium Bomb-box"><span class="myAllCondition">分</span>
												 </div>	
			                            </div>
			                        </div>   
			                        <div class="control-group">
			                            <label class="control-label">&#12288;&#12288;考试须知：</label>
			                            <div class="controls mycontrols">
			                                <textarea id="modifyexamNotice" class="large m-wrap Bomb-box" rows="5"></textarea>
			                            </div>
			                        </div>                                              
			                	</div>
			                <!-- ---------------选择试卷------------------ -->
				                <div class="control-group" id="myCagroup3">  
				                        <h4 class="media-heading">选择试卷</h4>                   
				                        <span class="myAllCondition">试卷名称:</span>	
				                        <input class="m-wrap" id="searchModifyExamPaperName" size="16" type="text" value=""/>                       
				                        <button onclick="searchModifyPaper()" class="btn blue myredbtn1 mysearchbtn1">搜索</button>
                                        <a class="btn myCabtn1 btn-a" href="${pageContext.request.contextPath}/views/examPaperAdd.jsp" target="_blank">新建试卷</a>
				                </div>    
				                 <div class="row-fluid">
				                  <div class="span12">
				                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
				                    <div class="portlet box light-grey">
				                        <div class="portlet-body">
				                            <table class="table table-striped table-bordered table-hover" id="sample_1">
				                                <thead>
				                                <tr>
				                                    <th style="width:8px;"></th>
				                                    <th>考试名称</th>                                    
				                                </tr>
				                                </thead>
				                                <tbody id="paper_table">
				         <!--                          <tr class="odd gradeX">
				                                    <td><input type="checkbox" class="checkboxes" value="1" /></td>
				                                    <td>员工入职试卷</td>                                                               
				                                  </tr>
				                                   <tr class="odd gradeX">
				                                    <td><input type="checkbox" class="checkboxes" value="1" /></td>
				                                    <td>客机驾驶操作试卷</td>                                                               
				                                  </tr>
				                                   <tr class="odd gradeX">
				                                    <td><input type="checkbox" class="checkboxes" value="1" /></td>
				                                    <td>客机维修保养试卷</td>                                                               
				                                  </tr> -->
				                                </tbody>
				                            </table>
					               			<!--////////////////分页//////////////-->
<!-- 									        <div class="container-fluid"> -->
<!-- 									            <div id="ui-pager" class="ui-pager"> -->
<!-- 									                <div id="ui-pager-wrap" class="ui-pager-wrap"> -->
<!-- 									                    <div id="ui-page-num" class="ui-page-num"> -->
<!-- 									                        <a id="prev" class="prev disable">&lt;</a>  -->
<!-- 									                        <a id="next" href="#" class="next">&gt;</a> -->
<!-- 								                        	共<em id="page-count" class="page-count"></em>页，到第 -->
<!-- 								                        	 <input id="target-page-text" class="target-page-text" type="text">页  -->
<!-- 								                        	 <a id="target-page-btn" class="target-page-btn">确定</a> -->
<!-- 									                    </div> -->
<!-- 									                </div> -->
<!-- 									            </div> -->
<!-- 									        </div> -->
				                        </div>                          
				                    </div>
				                               
			                	</div>        
							  </div>           
					  		</div>
					            </div>
					            <div class="modal-footer">
					                <button type="button" data-dismiss="modal" class="btn myCancelbtn">取消</button>
					                <button id="modifyLessonBtn" type="button" class="btn blue">确定</button>
					            </div>
                            </div>
                            <!-- 点击搜索按钮触发的Modal -->
                            <div id="mycuModal" class="modal hide fade" tabindex="-1" data-width="760">
	                            <div class="modal-header">
		                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
		                            <h4 class="modal-title" id="myModalLabel3">选择知识点</h4>                                          
	                            </div>
	                            <div class="modal-body">
							        <!--/////////////树///////////////////-->
							        <div class="row">
							             <ul id="jtree" class="ztree" style="width:500px; overflow:auto;"></ul>
							        </div>
	                            </div>
	                            <div class="modal-footer">
	                                 <button type="button" data-dismiss="modal" class="btn">取消</button>
	                                 <button id="klBtn" type="button" class="btn blue">确定</button>
	                            </div>
                            </div>                           
                            <!-- 点击添加课程触发的Modal -->
                            <div id="myAddPreCourse" class="modal hide fade" tabindex="-1" data-width="760">
	                            <div class="modal-header">
		                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
		                            <h4 class="modal-title" id="myModalLabel3">添加课程</h4>
	                            </div>
                                <div class="modal-body">               
		                          	<div class="control-group" id="myEagroup1">                             
				                        <span>课程名称:</span>
				                        <input class="m-wrap" size="16" type="text" value="" id="searchName"/>                      
				                        <button  class="btn blue myredbtn1 mysearchbtn1" onclick="search()" >搜索</button>
			                		</div> 
					               <div class="row-fluid">
						                <div class="span12">
						                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
						                    <div class="portlet box light-grey">
						                        <div class="portlet-body">
						                            <table class="table table-striped table-bordered table-hover" id="sample_1">
						                                <thead>
						                                <tr>
						                                    <th  style="width:8px;"><input id="all" name="allPre"type="checkbox" class="checkboxes" onclick="checkAll('allPre','preCheck')"  /></th>
						                                    <th>名称</th>
						                                    <th class="hidden-480">线上课程</th>
						                                    <th class="hidden-480">创建时间</th>                                                                       
						                                </tr>
						                                </thead>
						                                <tbody id="courseAddList_tbody">
															<!-- <tr class="odd gradeX">
						                                    <td><input type="checkbox" class="checkboxes" value="1" /></td>
						                                    <td>00234</td>
						                                    <td>大鹏</td>
						                                    <td class="hidden-480">地面服务部</td>                                    
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
        						</div>
                                <div class="modal-footer">
                                     <button id="preQuitBtn" type="button" data-dismiss="modal" class="btn">取消</button>
                                     <button id="preBtn" type="button" class="btn blue">确定</button>
                                </div>
                           </div>
                           
                        </div>
                    </div>
                    <!-- END EXAMPLE TABLE PORTLET-->
                </div>
                <button type="button" id="mysure" class="btn blue" onclick="updateCourse()" >保存</button>
            </div>

        </div>

        <!-- END PAGE -->

    </div>
	

	<c:import url="common/bottom.jsp"></c:import>

	<!-- BEGIN PAGE LEVEL PLUGINS -->
     <script type="text/javascript" src="${pageContext.request.contextPath}/js/select2.min.js"></script>
		
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/httpclient.js"></script>
    <script src="${pageContext.request.contextPath}/js/common/jquery.ztree.all-3.5.min.js"></script>
	
	
		<!--分页-->
	<script src="${pageContext.request.contextPath}/js/common/twilight.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/js/common/ui.ajaxpager.js" type="text/javascript"></script>
	
	<!-- END JAVASCRIPTS -->


	<!-- END PAGE LEVEL PLUGINS -->
	<script src="${pageContext.request.contextPath}/js/upload/jquery.form.js"></script>
	<script src="${pageContext.request.contextPath}/js/upload/jquery.validate.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/upload/jquery.validate.unobtrusive.min.js"></script>

	<script src="${pageContext.request.contextPath}/js/course/courseUpdate.js"></script>
	
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
     <script src="${pageContext.request.contextPath}/js/notify/addNotify.js"></script>
	<script src="${pageContext.request.contextPath}/js/app.js"></script>
		<!-- 引入共通弹出框 -->
	<c:import url="common/commonAlert.jsp"></c:import> 
    <script type="text/javascript" src="../js/httpclient.js"></script>
     <script src="${pageContext.request.contextPath}/js/common/checkData.js" type="text/javascript"></script>
	
	<script>
		var trainType = "${requestScope.data.trainType}";
		//课程类别一致都是X
		//var lessonClassifications = ${requestScope.data.lessonClassifications};
	
	    jQuery(document).ready(function() {
	       /*  App.init(); */
			getKonwledgePoints();
		    ID = ${requestScope.data.id};
		    knowledgePoint  = ${requestScope.data.knowledgePoint};
		    knowledgePointId = ${requestScope.data.knowledgePointId};
		    
		    courseData.knowledgePoint = Number(knowledgePoint);
	       	//课时列表
	        lessonTableAjax(1,10000,"courseDetailList",true,ID);
	        tableAjax(1,maxVisible,true,"","","","examPaperList");
	        
	        $("#courseType").val(trainType);
	        //$("#courseClassifications").val("X");
	        
	        if(("${requestScope.data.lesson_order}" == "S")&&("${requestScope.data.lesson_order}" == "s")){
	        	$("#lesson_order").checked = true;
	        }
	
	    });
	    //上传主程序
	    function uploadfile(id) {
	    	var form ;
	    	if(coursewareModifyUpload==id){
	    		form = $("#coursewareModifyUpload");
	    		}
	    	else{
	    		form = $("#coursewareUpload");
	    	}
	    	var formData = new FormData(form[0]);
	    	 $.ajax({  
	    	          url: "${fileServiceURL}"+"/fileUpload/fileDeal/upload.do" ,  
	    	          type: 'POST',  
	    	          data: formData,  
	    	          async: false,  
	    	          cache: false,  
	    	          contentType: false,  
	    	          processData: false,  
	    	          success: function (data) { 
	    	        	  data = JSON.parse(data);
	    	        	  if(data.state == 0){
	    		          		showMsg("上传课件失败！");
	    		          		return;
	    		          }else if(data.state == -1){
	    		          		showMsg("上传失败,请上传zip格式压缩文件！");
	    		          		return;
	    		          }
	    		              //文件上传成功，返回图片的路径。将路经赋给隐藏域
	    		          if(coursewareModifyUpload==id){
	    		          		$("#modifyCoursewareFilename").val(data.showName);
	    		          		$("#modifyCoursewareFilename").data("t",data.fileName+"_"+data.showName);
	    		          }else{
	    		          		$("#coursewareFilename").val(data.showName);
	    		          		$("#coursewareFilename").data("t",data.fileName+"_"+data.showName);
	    		          }
	    		      },
	    	});
	    }
	</script>
	
</body>

<!-- END BODY -->
</html>