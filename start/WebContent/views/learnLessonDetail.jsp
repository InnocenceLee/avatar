<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
 
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
 
<!--[if !IE]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<title>学习计划 课时详情</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	
	<!-- BEGIN PAGE LEVEL STYLES -->
	
    <!-- END PAGE LEVEL STYLES -->
    <!--当前页-->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/common.css">
    <!-- 分页 -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/page.css"/>
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
        <div class="page-content" id="myLldPage">

            <!-- BEGIN PAGE HEADER-->

            <div class="row-fluid">

                <div class="span12">
                    <h3 class="page-title">
                         学习计划 <i class="icon-angle-right"></i>
                        课时详细信息
                    </h3>
                    <div class="media">
                        <div class="media-body">
                          <h4 class="media-heading myPageTitle">基本信息</h4>
                            <p>课时名称：${requestScope.data.name} </p>
                            <p>课件名称：${requestScope.data.courseware_name}
                                <a class="btn btn-primary btn-lg myPreview" style="height:25px;padding-top: 3px;" href="${pageContext.request.contextPath}/views/staffStudyDetail.jsp?opt=v&s=n&lId=${requestScope.data.id}&cn=${data.courseWare[0].filename}" target="_blank">预览</a>
                            </p>
                            <p class="myp1">课时描述：<span>${requestScope.data.introduction}</span></p>
                        </div>
	
                    </div>
                    <hr>
                </div>

                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->

                    <!-- END PAGE TITLE & BREAD

                <!-- ---------------------搜索条件------------------------------------------- -->
                <div class="control-group">
                    <h4 class="media-heading myPageTitle">学习内容</h4>
                    <span class="myAllCondition">员工编号：</span>
                    <!-- onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"  -->
                    <input class="m-wrap span2" size="16" type="text" value="" id="learnNotesSearchID" />
                    <span class="myAllCondition">员工姓名：</span>
                    <input class="m-wrap span2" size="16" type="text" value="" id="learnNotesSearchName"/>
                        <span class="myAllCondition">所属部门：</span>
                        <input class="m-wrap span2" size="16" type="text" value="" id="learnNotesSearchNode"/>
<!--                             <select class="small m-wrap" tabindex="1">
                                <option value="Category 1">飞行部</option>
                                <option value="Category 2">Category 2</option>
                                <option value="Category 3">Category 5</option>
                                <option value="Category 4">Category 4</option>
                            </select> -->
                    <button class="btn blue myredbtn1 mysearchbtn1" onclick="learnNotesSearch()">搜索</button>
                    <br/>
                    <button id="basic_opener2" class="btn blue" onclick="learnRecordExport()">导出</button>
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
                                    <th>课时名称</th>
                                    <th>员工编号</th>
                                    <th class="hidden-480">员工姓名</th>
                                    <th class="hidden-480">所属部门</th>
                                    <th class="hidden-480">开始时间</th>
                                    <th class="hidden-480">结束时间</th>
                                    <th class="hidden-480">学习时长</th>
                                </tr>
                                </thead>
                                <tbody id="learnNoteslList_tbody">
  <!--                               <tr class="odd gradeX">
                                    <td>飞行员素质第一章</td>
                                    <td>987332</td>
                                    <td class="hidden-480">张三</td>
                                    <td class="center hidden-480">飞行部</td>
                                    <td class="hidden-480">2016-11-11</td>
                                    <td class="center hidden-480">2016-11-11</td>
                                    <td class="center hidden-480">90分钟</td>
                                </tr>
                                <tr class="odd gradeX">
                                    <td>飞行员素质第一章</td>
                                    <td>987332</td>
                                    <td class="hidden-480">李四</td>
                                    <td class="center hidden-480">飞行部</td>
                                    <td class="hidden-480">2016-11-11</td>
                                    <td class="center hidden-480">2016-11-11</td>
                                    <td class="center hidden-480">90分钟</td>
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
                    <!-- ---------------------搜索条件------------------------------------------- -->
                    <div class="control-group">
                        <h4 class="media-heading myPageTitle">未学习人员</h4>
                        <span class="myAllCondition">员工编号：</span>
                        <input class="m-wrap span2" size="16" type="text" id="personSearchID"   />
                        <span class="myAllCondition">员工姓名：</span>
                        <input class="m-wrap span2" size="16" type="text" id="personSearchName"/>
                        <span class="myAllCondition">所属部门：</span>
                        <input class="m-wrap span2" size="16" type="text" id="personSearchNode"/>
<!--                         <select class="small m-wrap" tabindex="1">
                            <option value="Category 1">飞行部</option>
                            <option value="Category 2">Category 2</option>
                            <option value="Category 3">Category 5</option>
                            <option value="Category 4">Category 4</option>
                        </select> -->
                        <button class="btn blue myredbtn1 mysearchbtn1" onclick="personSearch()">搜索</button>
                        <br/>
                        <button class="btn blue" onclick="noLearnExport()">导出</button>
                    </div>
                </form>
                <!-- END PAGE HEADER-->

                <!-- BEGIN PAGE CONTENT-->
                <div class="row-fluid">
                    <div class="span12">
                        <!-- BEGIN EXAMPLE TABLE PORTLET-->
                        <div class="portlet box light-grey">
                            <div class="portlet-body">
                                <table class="table table-striped table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>课时名称</th>
                                        <th>员工编号</th>
                                        <th class="hidden-480">员工姓名</th>
                                        <th class="hidden-480">所属部门</th>
                                    </tr>
                                    </thead>
                                    <tbody id="noLearnPlanPerson_tbody">
<!--                                     <tr class="odd gradeX">
                                        <td>飞行员素质第一章</td>
                                        <td>987332</td>
                                        <td class="hidden-480">张三</td>
                                        <td class="center hidden-480">飞行部</td>
                                    </tr>

                                    <tr class="odd gradeX">
                                        <td>飞行员素质第一章</td>
                                        <td>987332</td>
                                        <td class="hidden-480">李四</td>
                                        <td class="center hidden-480">飞行部</td>
                                    </tr> -->
                                    </tbody>
                                </table>
                                <!--////////////////分页//////////////-->
						        <div class="container-fluid">
						            <div id="ui-pager-2" class="ui-pager">
						                <div id="ui-pager-wrap-2" class="ui-pager-wrap">
						                    <div id="ui-page-num-2" class="ui-page-num">
						                        <a id="prev-2" class="prev disable">&lt;</a> 
						                        <a id="next-2" href="#" class="next">&gt;</a>
					                        	共<em id="page-count-2" class="page-count"></em>页，到第
					                        	 <input id="target-page-text-2" class="target-page-text" type="text">页 
					                        	 <a id="target-page-btn-2" class="target-page-btn">确定</a>
						                    </div>
						                </div>
						            </div>
						        </div>		
                                <!-- 点击查看触发的Modal -->
                            </div>
                        </div>
                        <!-- END EXAMPLE TABLE PORTLET-->
                    </div>
                </div>
                    <!-- ---------------------评价------------------------------------------- -->
                    <div class="control-group">
                        <h4 class="media-heading myPageTitle">评价</h4>
                        <span class="myAllCondition">员工编号：</span>
                        <input class="m-wrap span2" size="16" type="text" id="commentSearchId"  />
                        <span class="myAllCondition">员工姓名：</span>
                        <input class="m-wrap span2" size="16" type="text" id="commentSearchName"/>
                        <span class="myAllCondition">所属部门：</span>
                        <input class="m-wrap span2" size="16" type="text" id="commentSearchNode"/>
<!--                         <select class="small m-wrap" tabindex="1">
                            <option value="Category 1">飞行部</option>
                            <option value="Category 2">Category 2</option>
                            <option value="Category 3">Category 5</option>
                            <option value="Category 4">Category 4</option>
                        </select> -->
                        <button class="btn blue myredbtn1 mysearchbtn1" onclick="commentSearch()">搜索</button>
                        <br/>
                        <button class="btn blue" onclick="commentExport()">导出</button>
                    </div>
                <!-- END PAGE HEADER-->

                <!-- BEGIN PAGE CONTENT-->

                <div class="row-fluid">

                    <div class="span12">

                        <!-- BEGIN EXAMPLE TABLE PORTLET-->

                        <div class="portlet box light-grey">

                            <div class="portlet-body">
                                <table class="table table-striped table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>课时名称</th>
                                        <th>员工编号</th>
                                        <th>员工姓名</th>
                                        <th class="hidden-480">星级</th>
                                        <th class="hidden-480">评价</th>
                                        <th class="hidden-480">评价时间</th>
                                    </tr>
                                    </thead>
                                    <tbody id="commentList_tbody">
<!--                                     <tr class="odd gradeX">
                                        <td>飞行员素质第一章</td>
                                        <td>张三</td>
                                        <td class="hidden-480">
                                            <span class="rating">
									             <i class="icon-star"></i>
									             <i class="icon-star"></i>
									              <i class="icon-star"></i>
									             <i class="icon-star"></i>
									            <i class="icon-star"></i>
									          </span>
                                        </td>
                                        <td class="center hidden-480">很好，学到很多东西</td>
                                        <td class="center hidden-480">2016-11-11 12:06:06</td>
                                    </tr>
                                    <tr class="odd gradeX">
                                        <td>飞行员素质第一章</td>
                                        <td>张三</td>
                                        <td class="hidden-480">
                                            <span class="rating">
									             <i class="icon-star"></i>
									            <i class="icon-star"></i>
									          </span>
                                        </td>
                                        <td>没有看懂，希望下次把课件弄精细一点</td>
                                        <td>2016-11-11 12:06:06</td>
                                    </tr> -->
                                    </tbody>

                                </table>
                                <!-- 点击查看触发的Modal -->
                            </div>
                        </div>
                        <!-- END EXAMPLE TABLE PORTLET-->
                    </div>
                </div>
            <!--////////////////分页//////////////-->
	        <div class="container-fluid">
	            <div id="ui-pager-3" class="ui-pager">
	                <div id="ui-pager-wrap-3" class="ui-pager-wrap">
	                    <div id="ui-page-num-3" class="ui-page-num">
	                        <a id="prev-3" class="prev disable">&lt;</a> 
	                        <a id="next-3" href="#" class="next">&gt;</a>
                        	共<em id="page-count-3" class="page-count"></em>页，到第
                        	 <input id="target-page-text-3" class="target-page-text" type="text">页 
                        	 <a id="target-page-btn-3" class="target-page-btn">确定</a>
	                    </div>
	                </div>
	            </div>
	        </div>		
        </div>
        </div>
	</div>
	
	
	<c:import url="common/bottom.jsp"></c:import>
	<c:import url="common/commonAlert.jsp"></c:import>
	
	<!--分页-->
	<script src="${pageContext.request.contextPath}/js/common/twilight.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/js/common/ui.ajaxpager.js" type="text/javascript"></script>
	
	<!-- END JAVASCRIPTS -->
	<script src="${pageContext.request.contextPath}/js/app.js"></script>
	<!-- 当前页 -->
    <script src="${pageContext.request.contextPath}/js/learnPlay/learnLessonDetail.js" type="text/javascript"></script>
	    
	<script>
	
	    jQuery(document).ready(function() {
	
	        App.init();
	
	    	planId = ${requestScope.data.planId};
	    	courseId = ${requestScope.data.courseId};
	    	lessonId = ${requestScope.data.id};
	    	
	    	learnNotesAjax(1,maxVisible,"learnDetailNoteslList",true,"","","",courseId,planId,lessonId);
	    	commentAjax(1,maxVisible,"commentlList",true,"","","",courseId,planId,lessonId);
	    	noLearnPersonAjax(1,maxVisible,"noLearnPlanPerson",true,"","","",courseId,planId,lessonId)
	    	
	    });
	
	</script>
	

</body>

<!-- END BODY -->
</html>