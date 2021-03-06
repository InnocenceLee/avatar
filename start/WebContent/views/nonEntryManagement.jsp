<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
  <%@ taglib prefix="perm" uri="/mytaglib/permission"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
 
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
 
<!--[if !IE]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<title>未入职人员管理</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->

	<link rel="stylesheet" href="../css/DT_bootstrap.css" />
    <!-- 分页 -->
    <link rel="stylesheet" href="../css/common/page.css"/>
   	<!--当前页-->
    <link rel="stylesheet" href="../css/common/common.css">
    <!--树  -->
    <link rel="stylesheet" href="../css/common/metro.css">
    
	<!-- END PAGE LEVEL STYLES -->
</head>
    <!-- BEGIN BODY -->
<body class="page-header-fixed" code="no_nentry_management">

	<c:import url="common/top.jsp"></c:import> 	
	
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
			<!-- BEGIN SIDEBAR -->
	<%-- <c:import url="common/sidebar.jsp"></c:import> --%>
			<!-- BEGIN SIDEBAR -->
	        <c:import url="common/sidebar.jsp"></c:import>
		<!-- BEGIN PAGE CONTAINER-->
		<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
		<div class="page-content" id="mynemPage">
            <!-- BEGIN PAGE HEADER-->
            <div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                    <h3 class="page-title">
                      未入职人员管理
                    </h3>

                    <!-- END PAGE TITLE & BREADCRUMB-->

                </div>

            </div>
            <!-- ---------------------搜索条件------------------------------------------- -->
            <div class="control-group">
                    <span>姓名:</span>
                    <input class="m-wrap mycondition" size="16" type="text" value="" id="searchName"/>
                    <button  class="btn blue myredbtn1 mysearchbtn1" onclick="search()">搜索</button>
            </div>
           	<div class="control-group">
			   <perm:checkPerm permissionCode="no_nentry_management.add">
               		<button id="basic_opener3" class="btn blue myredbtn1 clean-data" data-toggle="modal" data-target="#mynemModal">新增</button>
               </perm:checkPerm>
			   <perm:checkPerm permissionCode="no_nentry_management.delete">
               		<button id="basic_opener2" class="btn red myredbtn1 clean-data" data-toggle="modal" data-target="#myDelModal">删除</button>
               </perm:checkPerm>
               
			   <perm:checkPerm permissionCode="no_nentry_management.add">
                <button id="myImport" data-toggle="modal" data-target="#importModal"  class="btn blue myredbtn1 myImport clean-data" style="border-color:#e6e6eb;color:#333333;">导入</button>
                <a id="myDownload" class="btn blue myredbtn1"  href="/start/template/未入职人员导入模板.xls" style="line-height:32px;">模板下载</a>

                </perm:checkPerm>
           	</div>
			<!-- END PAGE HEADER-->
			<!-- 导入modal -->
			<div id="importModal" class="modal hide fade" tabindex="-1"
				data-width="560" style="width: 500px;">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true"></button>
					<h4 class="modal-title" id="myModalLabel3">导入</h4>
				</div>
				<form id="allUpload" action="jv/nonentrymanagement/exportuserall.do"
					method="post" enctype="multipart/form-data" style="margin-bottom:0px;">
					<div class="modal-body">
						<!-- <span>选择文件：</span> -->
						<!-- <input disabled='disabled' id="coursewareFilename" class="m-wrap hasDatepicker Bomb-box" size="16" type="text" value="">
			<input class="fileupload-new myfile" value= " 选择模板"> -->
						<input name="file" type="file" class="Bomb-box"><br>
					</div>
					<div class="modal-footer">
						<span style="margin-right: 50px" class="Bomb-box"></span>
						<button type="button" data-dismiss="modal" class="btn">取消</button>
						<button type="button" class="btn blue" onclick="uploadfile()">保存</button>
					</div>
				</form>
			</div>
			<!-- BEGIN PAGE CONTENT-->
			<div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
                    <div class="portlet box light-grey">
                        <div class="portlet-body">
                            <table class="table table-striped table-bordered table-hover" id="sample_1">
                                <thead>
                                <tr>
                                    <th style="width:8px;"><input type="checkbox"  value="1" id="all" onclick="checkAll('all','personCheck')"/></th>                            
                                    <th style="display:none;"></th>
                                    <th>姓名</th>
                                    <th class="hidden-480">身份证号</th>
                                    <th class="hidden-480">性别</th>
                                    <th class="hidden-480">意向部门</th>
                                    <th style="width:48px;">管理</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody id="personList_tbody">
<!--                                 <tr class="odd gradeX">
                                    <td><input type="checkbox" class="checkboxes" value="1" /></td>
                                    <td>张三</td>
                                    <td>51370119891113011X</td>
                                    <td class="hidden-480">男</td>     
                                    <td class="hidden-480">地勤部</td>                                                                     
                                    <td class="center hidden-480 mylistSee" data-toggle="modal" data-target="#myclModal">修改</td>
                                    <td class="mycaExamine">删除</td>
                                </tr>
                                <tr class="odd gradeX">
                                     <td><input type="checkbox" class="checkboxes" value="1" /></td>
                                    <td>李四</td>
                                    <td>513701198911130112</td>
                                    <td class="hidden-480">女</td> 
                                    <td class="hidden-480">地勤部</td>                                                                      
                                    <td class="center hidden-480 mylistSee" data-toggle="modal" data-target="#myclModal">修改</td>
                                    <td class="mycaExamine">删除</td>
                                </tr>
-->

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
                             <!-- 点击新增触发的Modal -->
                            <div id="mynemModal" class="modal hide fade" tabindex="-1" data-width="760" style="width: 700px;">
	                            <div class="modal-header">
		                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
		                            <h4 class="modal-title" id="myModalLabel3">新增人员</h4>
	                            </div>
                                <div class="modal-body" style="position:relative;">                                   
                                            <span class="myAllCondition">&#12288;&#12288;姓名：</span>
                                            <input class="m-wrap hasDatepicker Bomb-box" size="16" type="text" value="" id="userName">
                                            <i class="icon-remove-sign" id="nameIcon"></i>
                                            <p class="errorPrompt" id="nameError"></p>
                                            <div class="myname">                                                                             
                                                <span class="myAllCondition">&#12288;&#12288;性别：</span>
                                                <select class="small m-wrap" tabindex="1" id="userSex" style="width:220px !important;">
                                                   <option value="M">男</option>
                                                   <option value="F">女</option>                                                  
                                                  </select>
                                            </div> <br><br>
                                            <span class="myAllCondition">&#12288;身份证：</span>
                                            <input class="m-wrap hasDatepicker Bomb-box" size="16" type="text" value="" id="userIdnumber"> 
                                            <i class="icon-remove-sign" id="numberIcon"></i>  
                                              <p class="errorPrompt" id="numberError"></p>
                                             <span class="myAllCondition">员工编号：</span>
                                             <input id="employeeNo" class="m-wrap hasDatepicker Bomb-box" size="16" type="text" disabled><br><br>
                                            <span class="myAllCondition">意向部门：</span>
                                            <input class="m-wrap hasDatepicker Bomb-box" size="16" type="text" value="" id="intentDepatment">
                                            <i class="icon-remove-sign" id="numberIcon"></i>  
                                              <p class="errorPrompt" id="numberError"></p>
                                        </div>
                                <div class="modal-footer">
                                			<span style=" margin-right:50px" class="Bomb-box"></span>
                                            <button type="button" data-dismiss="modal" class="btn">取消</button>
                                            <button type="button" class="btn blue" id="addUserBtn">保存</button>
                                        </div>
                            </div>
                            
                            <!-- 点击修改触发的Modal -->
                            <div id="myclModal" class="modal hide fade" tabindex="-1" data-width="760">
	                            <div class="modal-header">
		                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
		                            <h4 class="modal-title" id="myModalLabel3">修改</h4>
	                            </div>
                                <div class="modal-body">
                                			<input type="text" style="display:none" id="modifyID"/>
                                            <span class="myAllCondition">&#12288;&#12288;姓名：</span>
                                            <input id="modifyName" class="m-wrap hasDatepicker Bomb-box" size="16" type="text" value="">
                                            <i class="icon-remove-sign" id="cnameIcon"></i><br>
                                            <p class="cerrorPrompt" id="cnameError"></p>
                                            <br>
                                            <span class="myAllCondition">身份证号：</span>
                                            <input id="modifyNum" class="m-wrap hasDatepicker Bomb-box" size="16" type="text" value="">
                                            <i class="icon-remove-sign" id="cnumberIcon"></i><br>
                                            <p class="cerrorPrompt" id="cnumberError"></p>
                                            <br>
                                            <span class="myAllCondition">&#12288;&#12288;性别：</span>
                                            <!-- <input id="modifySex" class="m-wrap hasDatepicker" size="16" type="text" value=""> -->
                                            <select class="small m-wrap"  id="modifySex" style="width:220px !important;">
                                                   <option value="M">男</option>
                                                   <option value="F">女</option>                                                  
                                              </select><br> 
                                              <p class="cerrorPrompt" id="cnameError"></p>
                                              <br>
                                              <span class="myAllCondition">员工编号：</span>
                                             <input id="modifyEmployeeNo" class="m-wrap hasDatepicker Bomb-box" size="16" type="text" disabled><br><br>
                                            <span class="myAllCondition">意向部门：</span>
                                            <input id="modifyintentDepatment" class="m-wrap hasDatepicker Bomb-box" size="16" type="text" value="" >  
                                            
                                            <input id="modifyId" class="m-wrap hasDatepicker" size="16" type="text" value="" style="display:none;">   
                                                                                                             
                                        </div>
                                <div class="modal-footer">
                               		 		<span style=" margin-right:50px" class="Bomb-box"></span>
                                            <button type="button" data-dismiss="modal" class="btn clean-data">取消</button>
                                            <button type="button" class="btn blue" id="modifyUserBtn">确定</button>
                                        </div>
                            </div>
                            
                            <!-- 点击删除触发的Modal -->
						    <!-- Modal -->
						    <div class="modal fade" id="myDelModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
						        <div class="modal-dialog" role="document">
						            <div class="modal-content">
						                <div class="modal-header">
						                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
						                    <h4 class="modal-title" id="myModalLabel">操作提示</h4>
						                </div>
						                <div class="modal-body">
						                    <p id="delP">
						                      你确定要删除你选择的数据吗
						                    </p>
						                    <p>
					                    		<input class="hidden" id="delName" type="text" readonly/>
												<input class="hidden" id="delId" type="hidden" disable="disable" />
						                    </p>
						       
						                </div>
						                <div class="modal-footer">
						                    <span style=" margin-right:50px" class="Bomb-box"></span>
						                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						                    <button type="button" class="btn btn-primary blue" id="delUserBtn">确定</button>
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
        <!-- END PAGE -->
    </div>

	<c:import url="common/bottom.jsp"></c:import>
		<!-- BEGIN PAGE LEVEL PLUGINS -->
     	<!--分页-->
	<script src="../js/common/twilight.js" type="text/javascript"></script>
	<script src="../js/common/ui.ajaxpager.js" type="text/javascript"></script>

	<!-- 树 -->
    <script type="text/javascript" src="../js/httpclient.js"></script>
    <script src="../js/common/jquery.ztree.all-3.5.min.js"></script>
	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<script src="../js/nonentry/nonEntryManagement.js"></script>
     <script src="../js/common/sidebar.js" type="text/javascript"></script>
	<script src="../js/app.js"></script>
     <script src="../js/common/checkData.js" type="text/javascript"></script>
     <!-- 导入js -->
     <script src="../js/upload/jquery.form.js" type="text/javascript"></script>
	<c:import url="common/commonAlert.jsp"></c:import>

	<script>
		$(function(){
		   
		   	$("#userIdnumber").change(function(){
		   		$("#employeeNo").val('O'+ $("#userIdnumber").val());
		   	})
		   	
		   	$("#modifyNum").change(function(){
		   		$("#modifyEmployeeNo").val('O'+ $("#modifyNum").val());
		   	})
		})
   
   
	</script>

			
</body>

<!-- END BODY -->
</html>