<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->

<!-- BEGIN HEAD -->
<head>
	<title>课程详情</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->

	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/DT_bootstrap.css" />

	<!--当前页-->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/common.css">
    
	<!-- END PAGE LEVEL STYLES -->

	<link rel="shortcut icon" href="${pageContext.request.contextPath}/image/favicon.ico" />

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
			<div class="page-content" id="myScdPage">
			 <div class="row-fluid">
                 <div class="span12">
                    <h3 class="page-title">
                          课程详情                       
                    </h3>
                    <div class="media">
                    <!-- -----------------员工入职培训-------------------- -->
                        <div class="media-body myscdMedia">
                            <h4 class="media-heading myKnowtitle">${requestScope.data.name}</h4>
                            <!-- <p>英文名称：</p> -->
                            <p>课程类型：${requestScope.data.trainTypeName}</p>
                            <!-- <p>指导老师：无</p> -->
                             <p>学习时间：${requestScope.data.learnDate}</p>
                             <!-- <p>&#12288;&#12288;课时：45课时</p> -->
                             <p class="myscdp1">课程描述：${requestScope.data.introduction}</p>
                             <p class="myscdp1">&#12288;知识点：${requestScope.data.knowledgePointName}</p>                           
                        </div>                       
                        <!-- -----------------课时内容-------------------- -->
                        <div id="lessonContent" class="media-body myscdmedia2">                                                       
                        </div>                                            
                    </div>                                                                                
                </div>    
                        <!-- -----------------------统计信息----------------------  -->  	
             </div>
           </div>         
		</div>		

		<!-- BEGIN PAGE LEVEL PLUGINS -->
     <c:import url="common/bottom.jsp"></c:import>

	<!-- END PAGE LEVEL PLUGINS -->
	
	<script src="${pageContext.request.contextPath}/js/staff/staffCourseDetail.js"></script>
	
	<!-- BEGIN PAGE LEVEL SCRIPTS -->

	<script src="${pageContext.request.contextPath}/js/app.js"></script>

<script>
jQuery(document).ready(function() {
	
    App.init();
    id = ${requestScope.data.id};
    trainStudentLearnCourseId = ${requestScope.data.trainStudentLearnCourseId};
    tableAjax(1,maxVisible,Number(id));

});
</script>
			
</body>

<!-- END BODY -->
</html>