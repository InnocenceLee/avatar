<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
  <%@ taglib prefix="perm" uri="/mytaglib/permission"%>
   <!-- <link href=".././css/common.sidebar.css" rel="stylesheet"> -->
	<!-- BEGIN SIDEBAR -->
		<div class="page-sidebar nav-collapse collapse">
			<!-- BEGIN SIDEBAR MENU -->        
			<ul class="page-sidebar-menu">
				<li>
					<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
					<!-- <div class="sidebar-toggler hidden-phone"></div> -->
					<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
				</li>
				<!-- <perm:checkPerm permissionCode=notify.query> -->
				<li class="start" style="margin-top:20px;">
					<a href="${pageContext.request.contextPath}/views/staffAnnouncement.jsp">
						<i class=" icon-volume-up"></i> 
						<span class="title">通知公告</span>
					</a>
				</li>
				<!-- </perm:checkPerm> -->
				
				<!-- <perm:checkPerm permissionCode=studtent_course.query> -->
				<li class="">
					<a href="${pageContext.request.contextPath}/views/staffCourseList.jsp">
						<i class="icon-tasks"></i> 
						<span class="title">我的课程</span>
					</a>
				</li>
				<!-- </perm:checkPerm> -->

				<!-- <perm:checkPerm permissionCode="studtent_exam.query"> -->
				<li class="">
					<a href="${pageContext.request.contextPath}/views/staffExamList.jsp"  >
						<i class="icon-pencil"></i> 
						<span class="title">我的考试</span>
					</a>
				</li>
				<!-- </perm:checkPerm> -->

				<!-- <perm:checkPerm permissionCode="knowledge_point.query"> -->
				<li class="">
					<a href="${pageContext.request.contextPath}/views/knowledgepoint.jsp">
						<i class="icon-bookmark"></i> 
						<span class="title">知识点管理</span>
					</a>
				</li>
				<!-- </perm:checkPerm> -->
			
				<!-- <perm:checkPerm permissionCode="course.query"> -->
				<li class="myli1">
					<a href="javascript:;">
						<i class=" icon-book"></i> 
						<span class="title">课程管理</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<!-- <perm:checkPerm permissionCode="course_list.query"> -->
						<li>
							<a href="${pageContext.request.contextPath}/views/courseList.jsp">
								课程列表
							</a>
						</li>
						<!-- </perm:checkPerm> -->
						
						<!-- <perm:checkPerm permissionCode="course_auditing.query"> -->
						<li>
							<a href="${pageContext.request.contextPath}/views/courseAuditing.jsp">
								课程审核
							</a>
						</li>
						<!-- </perm:checkPerm> -->
					</ul>
				</li>
				<!-- </perm:checkPerm> -->

				<!-- <perm:checkPerm permissionCode="learnplan.query"> -->
				<li class="">
					<a href="${pageContext.request.contextPath}/views/learnPlanList.jsp">
						<i class="icon-calendar"></i> 
						<span class="title">学习计划</span>
					</a>
				</li>
				<!-- </perm:checkPerm> -->

				<!-- <perm:checkPerm permissionCode="exam_question.query"> -->
				<li>
					<a class="" href="${pageContext.request.contextPath}/views/questionBank.jsp">
						<i class="icon-inbox"></i> 
						<span class="title">题库管理</span>
					</a>
				</li>
				<!-- </perm:checkPerm> -->

				<!-- <perm:checkPerm permissionCode="exam_paper.query"> -->
				<li class="myli1">
					<a href="javascript:;">
						<i class="icon-briefcase"></i> 
						<span class="title">试卷管理</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						
						<!-- <perm:checkPerm permissionCode="exam_paper_auditing.query"> -->
						<li>
							<a href="${pageContext.request.contextPath}/views/examPaperAuditing.jsp">
								试卷审核
							</a>
						</li>
						<!-- </perm:checkPerm> -->
						
						<!-- <perm:checkPerm permissionCode="exam_paper_list.query"> -->
						<li>
							<a href="${pageContext.request.contextPath}/views/examPaperList.jsp">
								试卷列表
							</a>
						</li>
						<!-- </perm:checkPerm> -->
					</ul>

				</li>
				<!-- </perm:checkPerm> -->

				<!-- <perm:checkPerm permissionCode="exam.query"> -->
				<li class="myli1">
					<a href="javascript:;">
						<i class="icon-folder-open"></i> 
						<span class="title">考试管理</span>
						<span class="arrow"></span>
					</a>
					<ul class="sub-menu">
					
						<%-- 考试管理权限：考试管理2级菜单只有一个，所以考试管理权限和考试列表全应该一致，否则会出现有考试管理导航，但是没有考试列表的操作这种情况  --%>
						<!-- <perm:checkPerm permissionCode="exam_list.query"> -->
						<li class="myli1">
							<a href="${pageContext.request.contextPath}/views/examList.jsp">
							考试列表
							</a>
						</li>
						<!-- </perm:checkPerm> -->
						
					</ul>

				</li>
				<!-- </perm:checkPerm> -->

				<!-- <perm:checkPerm permissionCode="no_nentry_management.query"> -->
				<li class="">
					<a href="${pageContext.request.contextPath}/views/nonEntryManagement.jsp">
						<i class="icon-user"></i> 
						<span class="title">未入职人员管理</span>
					</a>
				</li>
				<!-- </perm:checkPerm> -->

				<li class="">
					<a href="javascript:;">
						<i class="icon-lock"></i> 
						<span class="title">权限管理</span>
					</a>
				</li>
				
				<!-- <perm:checkPerm permissionCode="notify.query"> -->
				<li class="">
					<a href="${pageContext.request.contextPath}/views/announcementManagement.jsp">
						<i class="icon-flag"></i> 
						<span class="title">公告管理</span>
					</a>
				</li>
				<!-- </perm:checkPerm> -->
				
				<!-- <perm:checkPerm permissionCode="system_parameter.query"> -->
				<li class="last">
					<a href="${pageContext.request.contextPath}/views/jv/systemparameter/list.do">
						<i class="icon-cog"></i> 
						<span class="title">参数设置</span>
					</a>
				</li>
				<!-- </perm:checkPerm> -->
			</ul>
			<!-- END SIDEBAR MENU -->
		</div>
		
<script src="${pageContext.request.contextPath}/js/jquery-1.10.1.min.js" type="text/javascript"></script>	
<script src="${pageContext.request.contextPath}/js/common/sidebar.js" type="text/javascript"></script>	






