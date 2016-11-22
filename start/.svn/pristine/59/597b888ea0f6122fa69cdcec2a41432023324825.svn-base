<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
 
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
 
<!--[if !IE]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<title>课程管理</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	
	<!-- BEGIN PAGE LEVEL STYLES -->
	
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/metro.css">
	
	 <!--当前页-->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/common.css">
    
    <!-- END PAGE LEVEL STYLES -->
    <style type="text/css">
    .myPreview{
    	line-height: 32px !important;
    }
    </style>
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
        <div class="page-content">

            <!-- BEGIN PAGE HEADER-->

            <div class="row-fluid">

                <div class="span12">
                    <h3 class="page-title">
                        课程管理 <i class="icon-angle-right"></i>
                        课程详细信息
                    </h3>
                    <div class="media">
                        <div class="media-body">
                            <h4 class="media-heading myPageTitle">基本信息</h4>
                            <p>课时名称：${requestScope.data.name} </p>
                            <p>课件名称：${requestScope.data.courseware_name}
                                <a class="btn btn-primary btn-lg myPreview" href="${pageContext.request.contextPath}/views/staffStudyDetail.jsp?opt=v&s=n&lId=${requestScope.data.id}&cn=${courseWare[0].filename}" target="_blank">预览</a>
                            </p>
                            <p class="myp1">课时描述：<span>${requestScope.data.introduction}</span></p>
                            
                        </div>
                    </div>
                </div>
        	</div>
        </div>
	</div>
	
	
	<c:import url="common/bottom.jsp"></c:import>
    
	<!-- BEGIN PAGE LEVEL SCRIPTS -->

	<script src="${pageContext.request.contextPath}/js/app.js"></script>

</body>

<!-- END BODY -->
</html>