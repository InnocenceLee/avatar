<%@ page language="java" contentType="text/html; charset=ISO-8859-1" import="java.util.*"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- BEGIN HEADER -->
	
	
	<div class="header navbar navbar-inverse navbar-fixed-top">

		<!-- BEGIN TOP NAVIGATION BAR -->

		<div class="navbar-inner">

			<div class="container-fluid">
				<input type="hidden" name="contextPath" value="${pageContext.request.contextPath }">
				<!-- BEGIN LOGO -->

				<a class="brand" href="${pageContext.request.contextPath}/views/main.jsp" style="background-color:#fc4f3f;">

				<img src="${pageContext.request.contextPath}/image/nav_top/logo.png" alt="logo"/>
                    <span class="mylogo">四川航空在线培训系统</span>
				</a>
				
                 
				<!-- END LOGO -->

				<!-- BEGIN RESPONSIVE MENU TOGGLER -->

				<a href="javascript:;" class="btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">

				<img src="${pageContext.request.contextPath}/image/menu-toggler.png" alt="" />

				</a>
                 <ul class="page-sidebar-menu page-sidebar">
				  <li>
				  <div class="sidebar-toggler hidden-phone" style="width: 25px;height: 25px;margin-left:188px;margin-top:10px;"></div>
				  </li>
				</ul>
				<!-- END RESPONSIVE MENU TOGGLER -->

				<!-- BEGIN TOP NAVIGATION MENU -->

				<ul class="nav pull-right" id="navbar-inner-ul" style="top:0;">

                    <!-- BEGIN BROWSERWARNING DROPDOWN -->

                    <li class="dropdown" id="header_browser_warning" style="display: none;">
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="icon-warning-sign"></i> 
                            <span>警告</span>
                        </a>
                        <div class="dropdown-menu" role="menu" aria-labelledby="dLabel" style="padding: 15px; width: 500px;">
                            你正在使用的浏览器内核版本过低，<a href="https://www.microsoft.com/zh-cn/WindowsForBusiness/End-of-IE-support" target="_blank">微软已经不再提供技术支持</a>，为避免可能存在的安全隐患，请尽快升级你的浏览器或者安装更安全的浏览器访问系统。<a href="http://xiazai.sogou.com/detail/34/0/6262355089742005676.html" target="_blank">点击修复此问题</a>
                        </div>
                    </li>

                    <!-- END BROWSERWARNING DROPDOWN -->

					<!-- BEGIN NOTIFICATION DROPDOWN -->

					<li class="dropdown" id="header_notification_bar">

						<a href="${pageContext.request.contextPath}/views/staffAnnouncement.jsp">

						<!--<i class="icon-warning-sign"></i>-->
							<i class="icon-bell-alt"></i>
                            <span>消息 <span class="label label-warning" id="newCount">${newCount}</span></span>
                            <link rel="stylesheet" href="${pageContext.request.contextPath}/css/jstree/default/style.css"/>	
						</a>
					</li>

					<!-- END NOTIFICATION DROPDOWN -->

					<!-- BEGIN INBOX DROPDOWN -->

					<li class="dropdown" id="header_inbox_bar">
						<a >
							<!--<i class="icon-warning-sign"></i>-->
							<img style="width:22px;height:22px;margin-top: -3px;" src="${pageContext.request.contextPath}/image/nav_top/headPortrait.png" alt=""/> <span>${sessionScope.user.username}</span>
							
						</a>

					</li>

					<!-- END INBOX DROPDOWN -->

					<!-- BEGIN TODO DROPDOWN -->
					
					<li class="dropdown">
		      			<a href="###" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-caret-down"></i></a>
						 <ul class="dropdown-menu">
						 	
							 <c:forEach items="${sessionScope.stationChoosesJava}" var="choose" varStatus="st" >
							 	<c:if test="${sessionScope.currRoleIdx eq st.index}">
							 		<li class="disabled">
								 		<a href="#" >${choose.roles[0].node_name} &nbsp;&nbsp;
								 		<c:forEach items="${choose.roles}" var="cr" varStatus="vs">
								 			<c:if test="${!(vs.last) }">${cr.station_name},</c:if>
								 			<c:if test="${vs.last }">${cr.station_name }</c:if>
								 		</c:forEach>
								 		&nbsp;&nbsp;
								 		<c:forEach items="${choose.roles}" var="cr" varStatus="vs">
								 			<c:if test="${!(vs.last) }">${cr.name},</c:if>
								 			<c:if test="${vs.last }">${cr.name }</c:if>
								 		</c:forEach></a>
							 		</li>
							 	</c:if>
							 	<c:if test="${!(sessionScope.currRoleIdx eq st.index)}">
							 		<li>
							 			<a href="${pageContext.request.contextPath}/login.d2js?_m=shiftRole&chooseIdx=${st.index}">${choose.roles[0].node_name} &nbsp;&nbsp;
								 		<c:forEach items="${choose.roles}" var="cr" varStatus="vs">
								 			<c:if test="${!(vs.last) }">${cr.station_name},</c:if>
								 			<c:if test="${vs.last }">${cr.station_name }</c:if>
								 		</c:forEach>
								 		&nbsp;&nbsp;
								 		<c:forEach items="${choose.roles}" var="cr" varStatus="vs">
								 			<c:if test="${!(vs.last) }">${cr.name},</c:if>
								 			<c:if test="${vs.last }">${cr.name }</c:if>
								 		</c:forEach></a>
							 		</li>
							 	</c:if>
							 </c:forEach>
			        <li class="divider"></li>


			        <li><a href="${pageContext.request.contextPath}/login.d2js?_m=logout"><i class="icon-signout"></i>退出</a></li>

			      </ul>
		      </li>

					<!-- END TODO DROPDOWN -->

					<!-- BEGIN USER LOGIN DROPDOWN -->



					<!-- END USER LOGIN DROPDOWN -->

				</ul>

				<!-- END TOP NAVIGATION MENU -->

			</div>

		</div>

		<!-- END TOP NAVIGATION BAR -->

	</div>

	