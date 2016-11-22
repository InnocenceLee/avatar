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

	<link rel="stylesheet" href="../css/DT_bootstrap.css" />

	<!--当前页-->
    <link rel="stylesheet" href="../css/common/common.css">
    
	<!-- END PAGE LEVEL STYLES -->

	<link rel="shortcut icon" href="../image/favicon.ico" />
	<style type="text/css">
	#content{
		overflow:visible; 
	}
	
	.pannel{
		position: fixed;
		z-index: 100px;
	}
	</style>
    </head>
    <!-- BEGIN BODY -->
<body class="page-header-fixed">
	<c:import url="common/top.jsp"></c:import> 	
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
			<!-- BEGIN SIDEBAR -->
		<div class="page-sidebar nav-collapse collapse">
			<!-- BEGIN SIDEBAR MENU -->        
			<ul class="page-sidebar-menu">
				<li>
					<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
					<div class="sidebar-toggler hidden-phone"></div>
					<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
				</li>
				<li>
					<!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
					<form class="sidebar-search">
						<div class="input-box">
							<a href="javascript:;" class="remove"></a>
							<input type="text" placeholder="搜索" />
							<input type="button" class="submit" value=" " />
						</div>
					</form>
					<!-- END RESPONSIVE QUICK SEARCH FORM -->
				</li>
				<li class="start ">
					<a href="views/staffAnnouncement.jsp">
						<i class=" icon-volume-up"></i> 
						<span class="title">通知公告</span>
					</a>
				</li>
				<li class="active">
					<a href="views/staffCourseList.jsp">
						<i class="icon-cogs"></i> 
						<span class="title">我的课程</span>
					</a>
				</li>

				<li class="">
					<a href="views/staffExamList.jsp">
						<i class="icon-bookmark-empty"></i> 
						<span class="title">我的考试</span>
					</a>
				</li>

				<li class="">
					<a href="views/knowledgepoint.jsp">
						<i class="icon-table"></i> 
						<span class="title">知识点管理</span>
					</a>
				</li>

				<li class="">
					<a href="javascript:;">
						<i class=" icon-book"></i> 
						<span class="title">课程管理</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li >
							<a href="views/courseList.jsp">
								<i class="icon-time"></i>
								课程列表
							</a>
						</li>
						<li >
							<a href="views/courseAuditing.jsp">
								<i class="icon-cogs"></i>
								课程审核
							</a>
						</li>
					</ul>
				</li>

				<li class="">
					<a href="views/learnPlanList.jsp">
						<i class="icon-gift"></i> 
						<span class="title">学习计划</span>
					</a>
				</li>

				<li>
					<a class="" href="views/questionBank.jsp">
						<i class="icon-sitemap"></i> 
						<span class="title">题库管理</span>
					</a>
				</li>

				<li>
					<a href="javascript:;">
						<i class="icon-folder-open"></i> 
						<span class="title">试卷管理</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="views/examPaperAuditing.jsp">
								<i class="icon-cogs"></i> 
								试卷审核
							</a>
						</li>

						<li>
							<a href="views/examPaperList.jsp">
								<i class="icon-user"></i>  
								试卷列表
							</a>
						</li>
					</ul>

				</li>

				<li class="">
					<a href="javascript:;">
						<i class="icon-user"></i> 
						<span class="title">考试管理</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li >
							<a href="views/examList.jsp">
							考试列表
							</a>
						</li>
					</ul>

				</li>

				<li class="">
					<a href="views/announcementManagement.jsp">
						<i class="icon-th"></i> 
						<span class="title">未入职人员管理</span>
						<!-- <span class="selected"></span> -->
					</a>
<!-- 					<ul class="sub-menu">
						<li >
							<a href="table_basic.html">
							Basic Tables
							</a>
						</li>
						<li >
							<a href="table_responsive.html">
							Responsive Tables
							</a>
						</li>
						<li class="active">
							<a href="table_managed.html">
							Managed Tables
							</a>
						</li>
						<li >
							<a href="table_editable.html">
							Editable Tables
							</a>
						</li>
					</ul> -->
				</li>

				<li class="">
					<a href="javascript:;">
						<i class="icon-file-text"></i> 
						<span class="title">权限管理</span>
					</a>
				</li>
				
				<li class="">
					<a href="views/announcementManagement.jsp">
						<i class="icon-file-text"></i> 
						<span class="title">公告管理</span>
					</a>
				</li>
				
				<li class="last">
					<a href="views/systemParameter.jsp">
						<i class="icon-file-text"></i> 
						<span class="title">参数设置</span>
					</a>
				</li>
			</ul>

			<!-- END SIDEBAR MENU -->
		</div>
		<!-- BEGIN PAGE CONTAINER-->
			<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
			<div class="page-content">
			 	<iframe  src="courseData/source/lms.html" width="100%" height="100%" name="content"></iframe>
            </div> 
            
            <div class="pannel"></div>        
		</div>

		<!-- BEGIN PAGE LEVEL PLUGINS -->
        <c:import url="common/bottom.jsp"></c:import>
</body>
<script type="text/javascript">
$(function(){
	$("[name=content]").height($(".page-content").height());
	
	$(".pannel").width($("[name=content]").width());
	$(".pannel").height($("[name=content]").height());
	
	var pos = $("[name=content]").offset();
	$(".pannel").offset({top:pos.top,left:pos.left})
    
	if("${param.s}" != 'n' && "${param.s}" != 'N'){
		$(".pannel").removeClass("pannel");
	}
	
	
	console.debug(window.frames.document.getElementsByClassName("control_panel"))
	
// 	var doc = window.frames['content'].frames['index'].document.getElementsByClassName("control_panel");
	
// 	console.debug(window.frames$("[name=content]")['content'].frames['index'].document.getElementsByClassName("control_panel")[0]);
	
	
});




</script>
</html>