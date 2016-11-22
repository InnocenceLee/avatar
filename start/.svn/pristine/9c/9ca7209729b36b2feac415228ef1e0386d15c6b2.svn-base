<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
  <%@ taglib prefix="perm" uri="/mytaglib/permission"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->

<!-- BEGIN HEAD -->
<head>
	<meta charset="utf-8" />
	<title>知识点管理</title>
	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>
	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->
	<link rel="stylesheet" href="../css/common/metro.css">
    <!--当前页-->
    <link rel="stylesheet" href="../css/common/common.css">
    <!-- END PAGE LEVEL STYLES -->
</head>
<!-- BEGIN BODY -->
<body class="page-header-fixed" code="knowledge_point">

	<c:import url="common/top.jsp"></c:import> 
	<!-- BEGIN CONTAINER -->

	<div class="page-container">
		<!-- BEGIN SIDEBAR -->
		<c:import url="common/sidebar.jsp"></c:import>
		<!-- END SIDEBAR -->
		<!-- BEGIN PAGE -->
		<div class="page-content" id="mykgPage">
			
			<div class="container-fluid" id="page-content">
  				<!-- BEGIN PAGE HEADER-->
				<div class="row-fluid">
					<div class="span12">
						<!-- BEGIN PAGE TITLE & BREADCRUMB-->
						<h3 class="page-title myKnowtitle">
							知识点管理 <small></small>
						</h3>
						<!-- END PAGE TITLE & BREADCRUMB-->
					</div>
				</div>
				<!-- END PAGE HEADER-->	
			    <!-- Button trigger modal -->
			    <perm:checkPerm permissionCode="knowledge_point.add">
			    	<button type="button" class="btn blue clean-data" data-toggle="modal" id="AddItemBtn">
			        	新增知识点
			    	</button>
			    </perm:checkPerm>
			
			    <!-- Modal -->
			    <div class="modal fade" id="myAddModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;">
			        <div class="modal-dialog" role="document">
			            <div class="modal-content">
			                <div class="modal-header">
			                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
			                    <h4 class="modal-title" id="myModalLabel">新增知识点</h4>
			                </div>
			                <div class="modal-body mycancelMain">
			                    <p>
			                        <span class="myAllCondition">&#12288;&#12288;名称：</span>
			                        <input id="title" type="text" class="Bomb-box myBomb mycondition" />
			                    </p>
			                    <p>
									<input id="parId" type="hidden" disable="disable" class="myBomb"/>
			                    </p>
			                    <p>			                    
			                         <span class="myAllCondition">&#12288;&#12288;描述：</span>
			                       <textarea id="remarks" class="Bomb-box myBomb mycondition" rows="5"></textarea> 
			                    </p>
			                </div>
			                <div class="modal-footer">
			                <span style=" margin-right:50px" class="Bomb-box"></span>
			                    <button type="button" class="btn btn-default myCancelbtn" data-dismiss="modal">取消</button>
			                    <button id='addKl' type="button" class="btn btn-primary blue">确定</button>
			                </div>
			            </div>
			        </div>
			    </div>
			    <!--<perm:checkPerm permissionCode="knowledge_point.edit">
			 		<button type="button" class="btn blue clean-data" data-toggle="modal" onclick="showUpdateModel()" style="margin-left: 25px;">
			        	修改知识点
			    	</button>
			    </perm:checkPerm>-->
			    <!-- 点击修改触发的model -->
			    <div class="modal fade" id="myUpdModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;">
			        <div class="modal-dialog" role="document">
			            <div class="modal-content">
			                <div class="modal-header">
			                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
			                    <h4 class="modal-title" id="myModalLabel1">修改知识点</h4>
			                </div>
			                <div class="modal-body mycancelMain">
			                    <p>
			                         <span class="myAllCondition">名称：</span>
			                        <input id="modifyTitle" type="text" class="modifyBomb-box myBomb mycondition" />
			                    </p>
									<input id="modifyName" type="text" class=" myBomb" readonly style="display: none;"/>
									<input id="modifyId" type="text" disable=" disable" class="myBomb " style="display: none;"/>
			                    	<input id="baseId" type="text" disable=" disable" class="myBomb " style="display: none;"/>
			                    <p>			                    
			                        <span class="myAllCondition">描述：</span>
			                       <textarea id="modifyRemarks" class="modifyBomb-box myBomb mycondition" rows="5"></textarea> 
			                    </p>
			                </div>
			                <div class="modal-footer">		
			                	<span style=" margin-right:50px" class="Bomb-box"></span>	              
				                    <button type="button" class="btn btn-default myCancelbtn" data-dismiss="modal">取消</button>
				                    <button id='modifyKl' type="button" class="btn btn-primary blue">确定</button>
			                    </spqn>
			                </div>
			            </div>
			        </div>
			    </div>
				<!--<perm:checkPerm permissionCode="knowledge_point.delete">
			 		<button type="button" class="btn red clean-data" data-toggle="modal" data-target="#myDelModal" style="margin-left: 25px;">
			        	删除知识点
			    	</button>
			    </perm:checkPerm>-->
			
			    <!-- Modal -->
			    <div class="modal fade" id="myDelModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;">
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
			                    <button id='delKl' type="button" class="btn btn-primary blue">确定</button>
			                </div>
			            </div>
			        </div>
			    </div>
		
			    <div class="container-fluid">
			        <!--/////////////树///////////////////-->
			        <div class="row">
			             <ul id="tree" class="ztree" ></ul>
			        </div>
			    </div>
			</div>
	
		</div>
	</div>
	
	
	<c:import url="common/bottom.jsp"></c:import>
	<c:import url="common/commonAlert.jsp"></c:import>
	
		
    <!-- <script type="text/javascript" src="../js/common/jquery-1.4.4.min.js"></script> -->
    
    <script type="text/javascript" src="../js/httpclient.js"></script>
    <script src="../js/common/jquery.ztree.all-3.5.min.js"></script>
	<script src="../js/knowledgepoint/knowledgepoint.js" type="text/javascript"></script>
	
	<!-- END JAVASCRIPTS -->
     <script src="../js/common/sidebar.js" type="text/javascript"></script>
     <script src="../js/common/checkData.js" type="text/javascript"></script>
	<script src="../js/app.js"></script>

<!--  暂时屏蔽掉 放进了js文件中 lyh	<script>

		jQuery(document).ready(function() {       

		   App.init();

		});

	</script> -->

</body>

<!-- END BODY -->
</html>