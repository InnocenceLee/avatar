<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="perm" uri="/mytaglib/permission"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->

<!-- BEGIN HEAD -->
<head>
<meta charset="utf-8" />
<title>帮助</title>
<meta content="" name="description" />
<meta content="" name="author" />
<!--强制使用ie的edge兼容模式-->
<meta http-equiv="X-UA-COMPATIBLE" content="IE=edge" />
<c:import url="common/head.jsp"></c:import>
<!-- BEGIN PAGE LEVEL STYLES -->
<link rel="stylesheet" href="/start/css/common/metro.css">
<!--当前页-->
<link rel="stylesheet" href="/start/css/common/common.css">
<!-- END PAGE LEVEL STYLES -->
</head>
<!-- BEGIN BODY -->
<body class="page-header-fixed" code="Help">

	<c:import url="common/top.jsp"></c:import>
	<!-- BEGIN CONTAINER -->

	<div class="page-container">
		<!-- BEGIN SIDEBAR -->
		<c:import url="common/sidebar.jsp"></c:import>
		<!-- END SIDEBAR -->
		<!-- BEGIN PAGE -->
		<div class="page-content" id="mykgPage">

			<div class="container-fluid" id="page-title">
	             <div style="margin-right: auto; margin-left: auto;text-align: center;margin-top: 20px;"><h3>${help.name}</h3></div>
			</div>
			 <div class="container-fluid" id="page-content">
	         <div>${help.content}</div>
		</div>
		</div>
		
	
	</div>


	<c:import url="common/bottom.jsp"></c:import>
	<c:import url="common/commonAlert.jsp"></c:import>


	<!-- <script type="text/javascript" src="../js/common/jquery-1.4.4.min.js"></script> -->

	<script type="text/javascript" src="/start/js/httpclient.js"></script>
	<script src="/start/js/common/jquery.ztree.all-3.5.min.js"></script>
	<script src="/start/js/common/readTreeJson.js" type="text/javascript"></script>

	<!-- END JAVASCRIPTS -->
	<script src="/start/js/common/sidebar.js" type="text/javascript"></script>
	<script src="/start/js/common/checkData.js" type="text/javascript"></script>
	<script src="/start/js/app.js"></script>

	
</body>

<!-- END BODY -->
</html>