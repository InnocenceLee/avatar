<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<title>新增公告</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->
    <link rel="stylesheet" href="../css/common/metro.css">
	<link rel="stylesheet" href="../css/DT_bootstrap.css" />
   <!--  IE8兼容两个模态框 -->
   <link rel="stylesheet" href="../css/bootstrap-modal.css">
   	<!--当前页-->
    <link rel="stylesheet" href="../css/common/common.css">

    <!-- 分页 -->
    <link rel="stylesheet" href="../css/common/page.css"/>
    
	<!-- END PAGE LEVEL STYLES -->
</head>
    <!-- BEGIN BODY -->
<body class="page-header-fixed" code="notify_query">

	<c:import url="common/top.jsp"></c:import> 	
	 <c:import url="common/sidebar.jsp"></c:import>
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
			<!-- BEGIN SIDEBAR -->		
		<!-- BEGIN PAGE CONTAINER-->
		<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
		<div class="page-content" id="myamaPage">
		            <!-- BEGIN PAGE HEADER-->
		   <div class="row-fluid">
               <div class="span12">
                   <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                   <h3 class="page-title">
                        新增
                   </h3>
               </div>
           </div>
		   <div class="control-group">
                <label class="control-label myAllCondition">公告标题：</label>
                <div class="controls mycontrols">
                    <input id="title" type="text"  class="m-wrap medium">
                </div>
            </div>
		   <div class="control-group">
                <div class="control-group" id="myEagroup1">
                      <p class="mybtnp1">
                           <button class="btn blue" data-toggle="modal" data-target="#myamModal" onclick="notifyPeople();">添加人员</button>
                           <button class="btn red myredbtn1" onclick="delNotifyPerson()">批量删除</button>
           	         </p>
                </div> 
                <div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
                    <div class="portlet box light-grey">
                        <div class="portlet-body">
                            <table class="table table-striped table-bordered table-hover" id="sample_1">
                                <thead>
                                <tr>
                                    <th style="width:8px;"><input  type="checkbox" class="checkboxes" value="1" id="allNotifyPerson" onclick="checkAll('allNotifyPerson','notifyPersonCheck')"/></th>
                                    <th>员工ID</th>
                                    <th class="hidden-480">员工姓名</th>
                                    <th class="hidden-480">所属部门</th>
                                </tr>
                                </thead>
                                <tbody id="notifyPerson_table"></tbody>
                            </table>                    
                        </div>                          
                    </div>
                    <!-- END EXAMPLE TABLE PORTLET-->                    
               	</div>
              </div>
           	</div>
		   <div class="control-group" id="myammgroup" style="display:none">
                 <label class="control-label myAllCondition" style="height:35px;line-height:35px;">发送方式：</label>													
				  <div class="controls" id="myCheckControls">
					 <label class="checkbox">
						  <input name="notifyType"type="checkbox" value="" /> 飞行准备系统
					  </label>
					  <label class="checkbox">
						<input name="notifyType" type="checkbox" value="" /> 叮咚
					 </label>
					 <label class="checkbox">
						  <input name="notifyType"type="checkbox" value="" /> 短信
					  </label>
					</div>
			</div>                                                                                              
		   <div class="control-group">
                <label class="control-label myAllCondition">&#12288;&#12288;内容：</label>
                <div class="controls mycontrols">
                    <textarea id="content" class="large m-wrap mywrap" rows="8"></textarea>      
                </div>
            </div>   
           <p class="mybtnp2">
               <button class="btn" onclick="window.location.href='announcementManagement.jsp'">取消</button>
               <button class="btn blue myredbtn1" onclick="addNotify();">确定</button>
          </p>
           <!-- 点击请选择触发的Modal -->
           <c:import url="common/addPerson.jsp"></c:import>
           	
       	</div>
        <!-- END PAGE -->
    </div>
  
	<c:import url="common/bottom.jsp"></c:import>
	
	<c:import url="common/commonAlert.jsp"></c:import>
		<!-- BEGIN PAGE LEVEL PLUGINS -->
	
	<!--树  -->
	<script src="../js/common/jquery.ztree.all-3.5.min.js"></script>
	


	<script type="text/javascript" src="../js/httpclient.js"></script>	

	<script src="../js/common/addPerson.js"></script>
	
	<!--分页-->
	<script src="../js/common/twilight.js" type="text/javascript"></script>
	<script src="../js/common/ui.ajaxpager.js" type="text/javascript"></script>
	
	<!-- 数据校验 -->
     <script src="../js/common/checkData.js" type="text/javascript"></script>
	
	<!-- form -->
		<script src="../js/upload/jquery.form.js"></script>
	<script src="../js/upload/jquery.validate.min.js"></script>
	<script src="../js/upload/jquery.validate.unobtrusive.min.js"></script>
	
	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<script src="../js/notify/addNotify.js"></script>
     <script src="../js/common/sidebar.js" type="text/javascript"></script>
	<script src="../js/app.js"></script>

<!-- IE8兼容两个模态框 -->
	<script src="../js/bootstrap-modalmanager.js"></script>
	<script src="../js/bootstrap-modal.js"></script>
<!-- 	<script>
	
	    jQuery(document).ready(function() {
	
	        App.init();
	
	    });
	
	</script> -->
			
			
</body>

<!-- END BODY -->
</html>