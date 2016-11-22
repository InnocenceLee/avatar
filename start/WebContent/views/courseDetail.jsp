<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<title>课程详情</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->

	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/DT_bootstrap.css" />
    <!-- 分页 -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/page.css"/>
    
	<!--当前页-->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/common.css">
    <style type="text/css">
    .row-fluid{
    	overflow-y:visible;
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
			<div class="page-content" id="cdPage">

            <!-- BEGIN PAGE HEADER-->

            <div class="row-fluid">

                <div class="span12">
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                    <h3 class="page-title">
                        课程列表 <i class="icon-angle-right"></i>
                        课程详细信息
                    </h3>
                    <div class="media">
                        <div class="media-body">
                            <h4 class="media-heading mymedia1">基本信息</h4>
                            <p>课程名称：${requestScope.data.name}</p>
                            <p>课程类型：${requestScope.data.trainTypeName}</p>
                            <p>课程类别：${requestScope.data.lessonClassificationsName}</p>
                            <p>&#12288;知识点：${requestScope.data.knowledgePointName}</p>
                            <p>前置课程：${requestScope.data.preCoursesName}</p>
                            <p>课时顺序：${requestScope.data.lessonOrder=='S' ? '固定' : '不固定' }</p>
                            <p>课程描述：${requestScope.data.introduction == null ? '' : requestScope.data.introduction}</p>
                            <p id="course_state">审核状态：</p>
                            <p id="course_comment">审核结果：</p>
                        </div>
                    </div>
                    <hr>
                </div>
                <!--课程内容-->
                <h4 class="media-heading">课程内容</h4>
                <%-- <div class="btn-group hidden-phone mychose">
                    <span class="btn mybtn1" id="myCdBtn1" onclick="lessList(${requestScope.data.id})" >课时</span>
                    <span  class="btn" id="myCdBtn2" onclick="lessComment(${requestScope.data.id})" >课时评价</span>
                </div> --%>

                <!-- END PAGE HEADER-->

                <!-- BEGIN PAGE CONTENT-->
              <div id="myClassHour">
              <div class="row-fluid">

                    <div class="span12">

                        <!-- BEGIN EXAMPLE TABLE PORTLET-->

                        <div class="portlet box light-grey">

                            <div class="portlet-body">

                                <table class="table table-striped table-bordered table-hover" id="sample_2">
                                    <thead>
	                                    <tr>
	                                        <th style="width:8px;"></th>
	                                         <th style="display:none"></th>
	                                        <th>名称</th>
	                                        <th class="hidden-480">类型</th>
	                                        <th class="hidden-480">课时描述</th>	
	                                         <th></th>	                                                                               
	                                        <th>操作</th>	                                       
	                                    </tr>
                                    </thead>
                                    <tbody id="courseDetailList_tbody" >
     <!--                                <tr class="odd gradeX">
                                        <td>1</td>
                                        <td>安全学习</td>
                                        <td class="hidden-480">线上学习</td>
                                        <td class="center hidden-480">四川航空股份有限公司(Sichuan Airlines,简称"川航")的前身是四川航空公司，该<br>公司成立于1986年9月19日，1988年7月14日正式开航运营，四川航空股份有限......</td>
                                        <td></td>
                                        <td class="mycaExamine" data-toggle="modal" data-target="#responsive">详情</td>
                                    </tr>

                                    <tr class="odd gradeX">
                                        <td>2</td>
                                        <td>安全学习</td>
                                        <td class="hidden-480">线上学习</td>
                                        <td class="center hidden-480">四川航空股份有限公司(Sichuan Airlines,简称"川航")的前身是四川航空公司，该<br>公司成立于1986年9月19日，1988年7月14日正式开航运营，四川航空股份有限......</td>
                                        <td></td>
                                        <td class="mycaExamine" data-toggle="modal" data-target="#responsive">详情</td>
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
                
      <!--           <div id="evaluation">
                <div class="control-group">
                        <span>员工编号:</span>
                        <input class="m-wrap" size="16" type="text" value="" id="ui_date_picker"/>
                         <span>员工姓名:</span>
                        <input class="m-wrap" size="16" type="text" value="" id="ui_date_picker"/>
                        <span>所属部门:</span>
                        <select class="small m-wrap" tabindex="1">
                                <option value="Category 1"></option>
                                <option value="Category 2"></option>
                                <option value="Category 3"></option>
                            </select>
                        <span>课时:</span>
                        <select class="small m-wrap" tabindex="1">
                                <option value="Category 1"></option>
                                <option value="Category 2"></option>
                                <option value="Category 3"></option>
                            </select>                            
                        <button id="basic_opener4" class="btn blue myredbtn1">导出</button>
                </div>
                <div class="row-fluid">

                    <div class="span12">

                        BEGIN EXAMPLE TABLE PORTLET

                        <div class="portlet box light-grey">

                            <div class="portlet-body">

                                <table class="table table-striped table-bordered table-hover" id="sample_2">
                                    <thead>
	                                    <tr>
	                                        <th style="width:8px;"></th>
	                                        <th>课程名称</th>
	                                        <th class="hidden-480">姓名</th>
	                                        <th class="hidden-480">星级</th>
	                                        <th>评价</th>
	                                        <th>创建时间</th>
	                                    </tr>
                                    </thead>
                                    <tbody id="courseContentList_tbody" >
                                        <tr class="odd gradeX">
                                        <td>安全生产管理知识讲座-pdf</td>
                                        <td>张三</td>
                                        <td class="hidden-480"><i class="icon-star"></i><i class="icon-star"></i></td>
                                        <td class="center hidden-480">课程安排合理</td>
                                        <td>2016-04-11 12:06:32</td>                                        
                                    </tr>                                 
                                    </tbody>
                                </table>
                                
						        ////////////////分页//////////////
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

                        END EXAMPLE TABLE PORTLET

                    </div>

                </div>
                </div> -->
                <!-- BEGIN PAGE TITLE & BREADCRUMB-->

                <!-- END PAGE TITLE & BREAD

                <!-- END PAGE HEADER-->

                <!-- BEGIN PAGE CONTENT-->

   
            </div>
        </div>
        <!-- END PAGE -->
    </div>

	<c:import url="common/bottom.jsp"></c:import>
	<!-- BEGIN PAGE LEVEL PLUGINS -->
     
	<!--分页-->
	<script src="${pageContext.request.contextPath}/js/common/twilight.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/js/common/ui.ajaxpager.js" type="text/javascript"></script>

	<!-- END PAGE LEVEL PLUGINS -->

	<script src="${pageContext.request.contextPath}/js/course/courseDetail.js"></script>
	
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
    <script src="${pageContext.request.contextPath}/js/notify/addNotify.js"></script>
	<script src="${pageContext.request.contextPath}/js/app.js"></script>

	<script>
		var id = ${requestScope.data.id};
	    jQuery(document).ready(function() {
	
	        /* App.init(); */
	
	        TableAjax(1,maxVisible,"courseDetailList",true,id);
	        
	        if('${requestScope.data.lessonOrder}'=='S' || '${requestScope.data.lessonOrder}'=='s'){
	        	$('#lessonOrderCheck').checked = "checked";
	        }
	
	    });
	    var state = '${requestScope.data.state}';
	    if(state=='J'){
	    	$('#course_state').html('审核状态：未审核');
	    }else{
	    	if(state=='A'){
	    		$('#course_state').html('审核状态：通过');
	    	}else if(state=='N'){
	    		$('#course_state').html('审核状态：未通过');
	    	}
	    	var logJson = '${requestScope.data.trainLog}';
		    var log =  JSON.parse(logJson);
		    if(log.data.length>0){
		    	$('#course_comment').html('审核意见：'+log.data[0].comment);
		    }
	    }
	    
	</script>
			
</body>

<!-- END BODY -->
</html>