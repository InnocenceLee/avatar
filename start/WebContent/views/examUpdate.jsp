<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
  <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
<head>
	<title>修改考试</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->
    <link rel="stylesheet" href="${pageContext.request.contextPath }/css/common/metro.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath }/css/DT_bootstrap.css" />
    <link href="${pageContext.request.contextPath }/css/jquery.gritter.css" rel="stylesheet" type="text/css"/>
   	<!--当前页-->
    <link rel="stylesheet" href="${pageContext.request.contextPath }/css/common/common.css">
     <!-- 分页 -->
    <link rel="stylesheet" href="${pageContext.request.contextPath }/css/common/page.css"/>
	<!-- END PAGE LEVEL STYLES -->
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
		<div class="page-content myEapage">
            <!-- BEGIN PAGE HEADER-->
            <div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                    <h3 class="page-title">
                         考试管理 <i class="icon-angle-right"></i> 修改考试
                    </h3>
                    <!-- END PAGE TITLE & BREADCRUMB-->
                </div>
            </div>
            <!-- ---------------------基本信息------------------------------------------- -->
            <div class="tab-content" id="myEatab1">
                    <!-- BEGIN FORM-->
                    <h4 class="media-heading">基本信息</h4>                   
                        <div class="control-group">
                            <label class="control-label myEaLable1 myAllCondition">考试名称：</label>
                            <div class="controls mycontrols">
                                <input id="name" type="text" class="m-wrap large" value="${data.examName }">
                            </div>
                        </div>
                        
                       <div class="control-group">
                            <label class="control-label myAllCondition">考试截止时间：</label>
                            <div class="controls mycontrols">
                                <fmt:formatDate value="${data.examStart }" pattern="yyyy-MM-dd' 'HH:mm" var="startTime"/>
                                <input  id="examStart" type="text" class="m-wrap medium js-bt-datetimepicker" data-format="datetime" value="${startTime}">
                                <span class="myAllCondition" style="margin-left: 10px; margin-right: 30px;">至</span>
                                <fmt:formatDate value="${data.examEnd }" pattern="yyyy-MM-dd' 'HH:mm" var="examEnd"/>
                                <input id="examEnd" type="text" class="m-wrap medium js-bt-datetimepicker" data-format="datetime" value="${examEnd }">
                            </div>
                        </div>
                        
                        <div class="control-group">
                            <label class="control-label myEaLable1 myAllCondition">考试类别：</label>
                            <div class="controls mycontrols">
                                <select id="examClassifications" class="medium m-wrap myEamedium" tabindex="1" style="width: 524px !important;">
                                    <option value="演示考试">演示考试</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="control-group">
                            <label class="control-label myEaLable1 myAllCondition">考试类型：</label>
                            <div class="controls mycontrols">
                                <select id="examType" class="medium m-wrap myEamedium" tabindex="1" style="width: 524px !important;">
                                    <option value="线上自主">线上自主</option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group myScoreContro" style="margin-left: 20px !important;">
                            <label class="control-label myEaLable1 myAllCondition">及格分数：</label>
                            <div class="controls mycontrols" style="position:relative;">
                                <input id="passScore" type="text" class="m-wrap medium" style="width: 55px !important;" value="${data.passScore }">
                                <span class="help-block myVerification" style="top:0px;left:77px;">分</span>
                            </div>                                                   
                        </div>
                        <div class="control-group myScoreContro2" style="margin-left: 20px !important;">
                            <label class="control-label myEaLable1 myAllCondition">考试次数：</label>
                            <div class="controls mycontrols" style="position:relative;">
                                <input id="exmaNum" type="text" class="m-wrap medium" style="width: 55px !important;" value="${data.exam_num}">
                                <span class="help-block myVerification" style="top:0px;left:77px;">次</span>
                            </div>                       
                        </div>       
                        <div class="control-group myScoreContro2" style="margin-left: 20px !important;">
                            <label class="control-label myEaLable1 myAllCondition">考试时长：</label>
                            <div class="controls mycontrols" style="position:relative;">
                                <input id="examDuration" type="text" class="m-wrap medium" style="width: 55px !important;" value="${data.duration}">
                                <span class="help-block myVerification" style="top:0px;left:77px;width:40px;">分钟</span>
                            </div>                       
                        </div>                                 	
                        
                        <div class="control-group myNotice">
                            <label class="control-label myEaLable1">考试须知：</label>
                            <div class="controls mycontrols">
                                <textarea id="examNotice" class="large m-wrap" rows="5">${data.examNotice}</textarea>
                            </div>
                        </div>                   
                    <!-- END FORM-->             
                </div>
                <!-- ---------------------考试控制------------------------------------------- -->
            <div class="tab-content" id="myEatab1">
                    <!-- BEGIN FORM-->
                    <h4 class="media-heading">考试控制</h4>                                                                                                                
                        <div class="control-group">
                            <label class="control-label myEaLable1 myAllCondition">答题模式：</label>
                            <div class="controls mycontrols">
                                <select ID="paper_mode" class="medium m-wrap myEamedium" tabindex="1">
                                    <option value="O" ${data.paperMode=='O' ? 'selected' : '' }>显示完整试卷</option>
                                    <option value="F" ${data.paperMode=='F' ? 'selected' : '' }>每次显示一题</option>
                                </select>                           
                            </div>
                        </div>
                        
                        <div class="control-group">                        
                            <label class="control-label myEaLable1 myAllCondition">成绩发布：</label>
                            <div class="controls mycontrols">
                                <select id="examAnswerPublish" class="medium m-wrap myEamedium" tabindex="1">
                                    <option value="no">不发布</option>
                                    <option value="delay">延时发布</option>
                                    <option value="immediately">立即发布</option>
                                </select>
                                <label class="checkbox" id="myEacheck1">
										<input id="randomOrder" type="checkbox" value="Y" /> 试题和选项乱序
									 </label>
									 <div id="myDelayed">
									    <input type="text" class="m-wrap medium"><span>天</span>
									 </div>		
                            </div>
                            
                        </div>                                             	                                                               
                    <!-- END FORM-->             
                </div>
            <!-- ---------------------试卷选择------------------------------------------- -->
            <div class="tab-content" id="myEatab1">
                 <h4 class="media-heading">选择试卷</h4>
                    <!-- BEGIN FORM-->   
                	<input type="hidden" value="${data.examPaperId }" name="pid">                                                                                                                                
                    <div class="control-group">                           
                        <div class="controls mycontrols">
                          <input id="choosePaperName" type="text" class="m-wrap medium myEamedium" disabled="disabled" style="margin-left: 96px;">                             
                            <button id="mychosepapers" class="btn blue myredbtn1" data-toggle="modal" data-target="#myeaModal"  onclick="cPaper()">选择试卷</button>
                        </div>
                        <label class="control-label myEaLable1 myAllCondition">试卷总分：</label>
                        <div class="controls mycontrols">
                            <input id="choosePaperScroe" type="text" class="m-wrap medium"  disabled="disabled">
                        </div> 
                    </div>                                                                               	                                                               
                    <!-- END FORM-->             
                </div>
                <hr>    
             <h4 class="media-heading">参考人员信息</h4>
                <c:forEach items="${data.students }" var="obj">
                	<input type="hidden" name="students" value="${obj}">
                </c:forEach>
                <!-- ---------------------参考人员信息------------------------------------------- -->
                <div class="control-group" id="myEagroup1">
                      <p class="mybtnp1">
                           <button class="btn blue" data-toggle="modal" data-target="#myamModal" onclick="notifyPeople();">添加人员</button>
                           <button class="btn red myredbtn1" id="delNotifyPersonBtn" >批量删除</button>
           	         </p>
<!--                         <span>员工编号:</span>	
                        <input class="m-wrap" size="16" type="text" value="" id="searchExamPersonId"/>
                       <span>员工姓名:</span>
                        <input class="m-wrap" size="16" type="text" value="" id="searchExamPersonName"/>
                        <span>所属部门:</span>
                        <input class="m-wrap" size="16" type="text" value="" id="searchExamPersonNodeName"/>
                        <input class="m-wrap" size="16" type="text" value="" id=""/>
                        <button class="btn blue myredbtn1 mysearchbtn1">搜索</button>
                        <button class="btn blue myredbtn1" onclick="searchExamPerson()">搜索</button> -->
                        
                        <button class="btn myEabtn1" id="myGroupbtn1">保存到分组</button>
                        <!-- <button class="btn myEabtn1" id="myGroupbtn1">保存到分组</button> -->
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
                                    <th style="width:8px;"><input type="checkbox" class="checkboxes" value="1" id="allNotifyPerson" onclick="checkAll('allNotifyPerson','notifyPersonCheck')"/></th>
                                    <th>员工编号</th>
                                    <th class="hidden-480">员工姓名</th>
                                    <th class="hidden-480">所属部门</th>    
                                </tr>
                                </thead>
                                <tbody id="notifyPerson_table">
<!--                                 <tr class="odd gradeX">
                                    <td><input type="checkbox" class="checkboxes" value="1" /></td>
                                    <td>00003</td>
                                    <td>刘超</td>
                                    <td class="hidden-480">地面服务部</td>
                                    <td class="hidden-480 mylistSee">删除</td>                                    
                                </tr> -->
                                </tbody>

                            </table>
                            <!--////////////////分页//////////////-->
<!--  						        <div class="container-fluid"> -->
<!-- 						            <div id="ui-pager" class="ui-pager"> -->
<!-- 						                <div id="ui-pager-wrap" class="ui-pager-wrap"> -->
<!-- 						                    <div id="ui-page-num" class="ui-page-num"> -->
<!-- 						                        <a id="prev" class="prev disable">&lt;</a>  -->
<!-- 						                        <a id="next" href="#" class="next">&gt;</a> -->
<!-- 					                        	共<em id="page-count" class="page-count"></em>页，到第 -->
<!-- 					                        	 <input id="target-page-text" class="target-page-text" type="text">页  -->
<!-- 					                        	 <a id="target-page-btn" class="target-page-btn">确定</a> -->
<!-- 						                    </div> -->
<!-- 						                </div> -->
<!-- 						            </div> -->
<!-- 						        </div>                      -->
                        </div>                          
                    </div>
                    <!-- END EXAMPLE TABLE PORTLET-->                    
                </div>
                <!--    发送方式选择 -->
                           <div class="control-group">													
								<div class="controls">
<!-- 									<label class="checkbox"> -->
<!-- 										<input name="notifyType" type="checkbox" value="F" /> 通过飞行准备网发送 -->
<!-- 									 </label> -->
<!-- 									 <label class="checkbox"> -->
<!-- 										  <input name="notifyType"  type="checkbox" value="D" /> 通过飞叮咚发送 -->
<!-- 									  </label> -->
<!-- 									  <label class="checkbox"> -->
<!-- 										<input name="notifyType"  type="checkbox" value="M" /> 通过短信发送 -->
<!-- 									 </label> -->
									 <label class="checkbox">
										  <input name="notifyType"  type="checkbox" value="P" /> 通过公告发送
									  </label>
									</div>
								</div>          
				            </div>
				            <p class="mybtnp2">
				                           <button class="btn blue" onclick="saveExam()">保存</button>
				                           <button class="btn red myredbtn1" onclick="exit()">取消</button>
				           	 </p>
           	                <!-- 点击选择试卷触发的Modal -->						   
						    <div class="modal fade" id="myeaModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
						        <div class="modal-dialog" role="document">
						            <div class="modal-content">
						                <div class="modal-header">
						                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
						                    <h4 class="modal-title" id="myModalLabel">选择试卷</h4>
						                </div>
						                <div class="modal-body">
						                <span class="myAllCondition">试卷名称：</span>
						                 <input class="m-wrap" size="16" type="text" value="" id="searchExamPaperName"/>
                                          <button id="myeamodalbtn" class="btn blue myredbtn1 mysearchbtn1" onclick="searchPaper()">搜索</button>
                                          <div class="row-fluid">
                                            <div class="span12">
                                           <!-- BEGIN EXAMPLE TABLE PORTLET-->
                                               <div class="portlet box light-grey">
                                                   <div class="portlet-body">
                                                         <table class="table table-striped table-bordered table-hover">
                                                             <thead>
                                                                <tr>
                                                                 <th style="width:8px;"></th>
                                                                    <th>考试名称</th>                                                                        
                                                                     </tr>
                                                                 </thead>
                                                            <tbody id="paperList_tbody">
  <!--                                                               <tr class="odd gradeX">
                                                                  <td><input type="radio" name="optionsRadios1" value="option1" /></td>
                                                                  <td>员工入职试卷</td>                                                                       
                                                                </tr>-->                                                            
                                                           </tbody>
                                                          </table>                                     
                                                        </div>                          
                                                  </div>
                    							<!-- END EXAMPLE TABLE PORTLET-->                    
                                            </div>
                                         </div>
                                      </div>
						                <div class="modal-footer">
						                    <span style=" margin-right:50px" class="Bomb-box"></span>
						                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						                    <button id="addPaperBtn" type="button" class="btn btn-primary blue" >确定</button>
						                </div>
						            </div>
						        </div>
						    </div>
						    
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
         	<!-- 点击添加人员触发的模态框 -->
           	<c:import url="common/addPerson.jsp"></c:import>
     		</div>
        <!-- END PAGE -->
    	</div>

	<c:import url="common/bottom.jsp"></c:import>
	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<c:import url="common/commonAlert.jsp"></c:import>
     
	<!--分页-->
	<script src="${pageContext.request.contextPath }/js/common/twilight.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath }/js/common/ui.ajaxpager.js" type="text/javascript"></script>
	
	
	<!-- 控制添加人员的模态框 -->
	<!--树  -->
	<script type="text/javascript" src="${pageContext.request.contextPath }/js/httpclient.js"></script>	
	<script src="${pageContext.request.contextPath }/js/common/jquery.ztree.all-3.5.min.js"></script>

	<script src="${pageContext.request.contextPath }/js/common/addPerson.js"></script>
	
	<script src="${pageContext.request.contextPath }/js/exam/examUpdate.js"></script>

	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->

	<script src="${pageContext.request.contextPath }/js/app.js"></script>

	
	<script>
	
	   /*  jQuery(document).ready(function() {
	
	        App.init();
	
	
	    });
	 */
	 /*成绩发布*/
	 var pub =${data.examAnswerPublish}
	 switch (pub.mode) {
		case "no":
			$("#examAnswerPublish > option[value='no']").attr("selected","selected");
			break;
		case "immediately":
			$("#examAnswerPublish > option[value='immediately']").attr("selected","selected");
				break;
		case "delay":
			$("#examAnswerPublish > option[value='delay']").attr("selected","selected");
			break;
	 }
	 var myDelayed = document.getElementById("myDelayed");
	 var examAnswerPublish = document.getElementById("examAnswerPublish");
	 examAnswerPublish.onchange = function (){
	 	var val = this.value;
	 	if(val == "delay"){
	 		 myDelayed.style.display = "block";
	 	}else{
	 		myDelayed.style.display = "none";
	 	}
	 }
	</script>
			
</body>

<!-- END BODY -->
</html>