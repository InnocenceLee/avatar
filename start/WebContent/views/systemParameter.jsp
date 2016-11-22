<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
 
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
 
<!--[if !IE]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<title>系统参数</title>
	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>
	<c:import url="common/head.jsp"></c:import> 
	
		<!-- BEGIN PAGE LEVEL STYLES -->
<!-- 	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/select2_metro.css" />-->
	
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap-modal.css"> 

    <!--当前页-->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/common.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/parameter/parameterList.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/parameter/parameterUpdate.css">

	<!-- END PAGE LEVEL STYLES -->
</head>

<!-- BEGIN BODY -->
<body class="page-header-fixed" code="system_parameter">

	<c:import url="common/top.jsp"></c:import> 
	
	<!-- BEGIN CONTAINER -->

	<div class="page-container">

		<!-- BEGIN SIDEBAR -->
          <c:import url="common/sidebar.jsp"></c:import>
		<!-- END SIDEBAR -->
		<!-- BEGIN PAGE -->
		<div class="page-content">
		    <div class="row-fluid">
                <div class="span12">
                    <h3 class="page-title">
                        其他设置
                    </h3>
                </div>
            </div>
			<div class="container-fluid" id="page-courseList">
			    <!-- ----------------------------基本信息-------------------------------------------- -->
			    <div class="" id="content-courseList">
			        <!--到期提醒默认天数-->
			        <div class="remind params-group" style="position:relative;">
			           <span class="myAllCondition" style="height:22px;line-height:22px;">到期提醒默认天数</span>
			           <input id="day" type="text" class="form-control myRemind" value="${requestScope.data.day}">
			           <span class="myVerification" style="top:0px;left:186px;">天</span>
			        </div>			      
			        <!--课程-->
			        <h3>课程</h3>
			        <div class="params-group">
                        <div class="checkbox mycheckbox1">
					        <label>
		                        <input id="lessonOrder" type="checkbox"  ${requestScope.data.lessonOrder=='S' ? 'checked' : ''}> 课时顺序固定 
		                    </label>
	                    </div>
			        </div>
			        <!--课时-->
			        <h3 class="myCh3">课时</h3>
                    <div class="params-group">
				        <div class="checkbox mycheckbox1">
				            <label>
				                <input id="dragFlag"  type="checkbox" ${requestScope.data.dragFlag=='Y' ? 'checked' : ''}> 禁止拖动播放进度
				            </label>
				        </div>
				        <div class="checkbox mycheckbox1">
				            <label id="myUpCheck1">
				                <input id="avoidIdle"  type="checkbox"  ${requestScope.data.avoidIdle=='Y' ? 'checked' : ''}> 防止挂机
				            </label>
				        </div>
                    </div>
			        <!--考试-->
			        <h3 class="myCh3">考试</h3>
                    <div class="params-group">
				         <div class="control-group row-fluid">
				            <div class="span5" style="position:relative;">
				                <span class="span4 myAllCondition">考试截止时间</span>
				                <input id="examEndMin"  type="text" class="form-control mycontrol1 span6" name="" value="${requestScope.data.examEndMin}" />
				                <span class="myPrompt myVerification span2" style="top:5px;left: 87%;">分钟</span>
				            </div>	
				         </div>
	                     <div class="control-group row-fluid">
			                <div class="span5" style="position:relative;">
				                <span class="span4 myAllCondition">验证码间隔时间</span>
				                <input id="validateMin" type="text" class="form-control mycontrol1 span6" name="" value="${requestScope.data.validateMin}" />
				                <span class="myPrompt myVerification span2" style="top:5px;left: 87%;">分钟</span>
				            </div>		             
				         </div>	
				         <div class="control-group row-fluid" style="position:relative;">
				            <div class="span5" style="position:relative;">
				                <span class="span4 myAllCondition">及格分数</span>
				                <input id="score" type="text" class="form-control mycontrol1 span6" name="" value="${requestScope.data.score}" />
				                <span class="myPrompt myVerification span2" style="top:5px;left: 87%;">分</span>
				            </div>    
	                     </div>
	                     <div class="control-group row-fluid">
				            <div class="span5" style="position:relative;">
				                <span class="span4 myAllCondition">考试时长</span>
				                <input id="examMin" type="text" class="form-control mycontrol1 span6" name="" value="${requestScope.data.examMin}" />
				                <span class="myPrompt myVerification span2" style="top:5px;left: 87%;">分钟</span>
				            </div>
				         </div>		            			            
				        <div class="checkbox">
				            <label>
				                <input id="randomOrder" type="checkbox" ${requestScope.data.randomOrder=='Y' ? 'checked' : ''}> &nbsp;&nbsp;试题选项乱序
				            </label>
				        </div>
			        </div>
			        <!--试卷-->
                  <!-- <h3 class="myCh3">试卷</h3>
                    <div class="params-group">
				        <div class="control-group row-fluid">
				          <div class="span5 myTotal" style="position:relative;">
				             <span class="span4 myTotal myAllCondition">题目总数</span>
				             <input id="TotleNum" type="text" class="form-control mycontrol1 span6" value="${requestScope.data.totleNum}" >
				             <span class="myPrompt myVerification span2" style="top:5px;left: 87%;">道</span>
				          </div>
				        </div>
			        </div> -->    
			  <input id="TotleNum" type="hidden" class="form-control mycontrol1 span6" value="${requestScope.data.totleNum}" >
			        
			        <!--管理员IP端-->
                    <h3 class="myh3">管理员IP端</h3>
                    <div class="params-group">
				        <div class="control-group row-fluid">
				            <div class="span5 myTotal">
				                <span class="span4 myTotal myAllCondition">IP段</span>
				                <input id="ipBegin" type="text" class="form-control span6" value="${requestScope.data.ipBegin}" >
				                <span class="errorPrompt" id="ipBeginError"></span>
				            </div>
				            
<!--                             <div class="span5 myTotal"> -->
<%-- 				                <input id="ipEnd" type="text" class="form-control span6" value="${requestScope.data.ipEnd}"> --%>
<!-- 			                </div>				            	             -->
				        </div>
			        </div>
			        <!--题目分数-->
			        <h3 class="myh3">题目分数</h3>
                    <div class="params-group">
				         <div class="control-group row-fluid Fraction" style="position:relative;">
				           <span class="span1 myTotal1 myAllCondition">判断题</span>
				           <input id="judgeScore" type="text" class="form-control mycontrol6 span1" value="${requestScope.data.judgeScore}" >
				           <span class="span1 myAllCondition" style="margin-left:0px;">分</span>
				           <span class="span1 myAllCondition">单选题</span>
				           <input id="singleScore" type="text" class="form-control mycontrol6 span1" value="${requestScope.data.singleScore}" >
				           <span class="span1 myAllCondition" style="margin-left:0px;">分</span>
				           <span class="span1 myAllCondition">多选题</span>
				           <input id="multipleScore" type="text" class="form-control mycontrol6 span1" value="${requestScope.data.multipleScore}" >
				           <span class="span1 myAllCondition" style="margin-left:0px;">分</span>
				         </div>
				         </div>	        
			    </div>
			    <!--保存按钮-->
			    <button type="button" class="btn btn-danger blue" onclick ="modify()">保存设置</button>
			</div>
		</div>
	</div>
	
	<c:import url="common/bottom.jsp"></c:import>
	
     <!-- BEGIN PAGE LEVEL PLUGINS -->
	<!-- <script type="text/javascript" src="${pageContext.request.contextPath}/js/select2.min.js"></script> -->

	<!-- END PAGE LEVEL PLUGINS -->

	<script src="${pageContext.request.contextPath}/js/systemParameter/systemParameter.js"></script>
	
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
    <script src="${pageContext.request.contextPath}/js/common/sidebar.js" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/js/notify/addNotify.js"></script>
	<script src="${pageContext.request.contextPath}/js/app.js"></script>
	<!-- 数据校验 -->
     <script src="${pageContext.request.contextPath}/js/common/checkData.js" type="text/javascript"></script>
	
	<script>
	    jQuery(document).ready(function() {
	
	        /* App.init(); */
	        
	        //设置复选框的值
	        if(("${requestScope.data.lessonOrder}" == "")||("${requestScope.data.lessonOrder}" == "M")){
	        	$("#lessonOrder").checked = false;
	    	}
	    	else{
	    		$("#lessonOrder").checked = true;
	    	}
	    	
	        if(("${requestScope.data.dragFlag}" == "")||("${requestScope.data.dragFlag}" == "N")){
	        	$("#dragFlag").checked = false;
	    	}
	    	else{
	    		$("#dragFlag").checked = true;
	    	}
	    	
	        if(("${requestScope.data.avoidIdle}" == "")||("${requestScope.data.avoidIdle}" == "N")){
	        	$("#avoidIdle").checked = false;
	    	}
	    	else{
	    		$("#avoidIdle").checked = true;
	    	}
	        
	        if(("${requestScope.data.randomOrder}" == "")||("${requestScope.data.randomOrder}" == "N")){
	        	$("#randomOrder").checked = false;
	    	}
	    	else{
	    		$("#randomOrder").checked = true;
	    	}
	    	
	    });
	
	</script>
	
	<!-- END JAVASCRIPTS -->

	

</body>

<!-- END BODY -->
</html>