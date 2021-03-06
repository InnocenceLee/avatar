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
	<title>题库管理</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>
	<c:import url="common/head.jsp"></c:import> 
	
	<!-- 引入共通弹出框 -->
	<c:import url="common/commonAlert.jsp"></c:import> 
	
	<!-- BEGIN PAGE LEVEL STYLES -->

    <!-- ----------------	富文本------------------------ -->
	<link rel="stylesheet" href="../css/DT_bootstrap.css" />
   	<!--当前页-->
   	<link rel="stylesheet" href="../css/bootstrap-modal.css">
    
    <link rel="stylesheet" href="../css/staff/questionBank.css">
    <link rel="stylesheet" href="../css/common/common.css">
    <!-- 分页 -->
    <link rel="stylesheet" href="../css/common/page.css"/>	
    
        <!--树  -->
   	<link rel="stylesheet" href="../css/common/metro.css">
	<!-- END PAGE LEVEL STYLES -->
	<style type="text/css">
	.myqbP1{
		margin-top: 8px !important;
	}
	.options{
		width: 200px;
	}
	.btn-import{
		line-height: 32px;
	}
	.limit{
		white-space:nowrap; 
	    overflow:hidden;
	    text-overflow:ellipsis;
	    display: inline-block;
	}
	.title {
		width: 200px;
	}
	.questionBank_tbody{
		font-size: 14px;
	}
	</style>

</head>
    <!-- BEGIN BODY -->
<body class="page-header-fixed" code="exam_question">

	<c:import url="common/top.jsp"></c:import> 	
	
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
			<!-- BEGIN SIDEBAR -->
		<c:import url="common/sidebar.jsp"></c:import>
		<!-- BEGIN PAGE CONTAINER-->
		<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
		<div class="page-content" id="myqbPage">
            <!-- BEGIN PAGE HEADER-->
            <div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                    <h3 class="page-title">
                           题库管理
                    </h3>
                    <!-- END PAGE TITLE & BREADCRUMB-->
                </div>
            </div>
            
                <!-- ---------------------搜索条件------------------------------------------- -->
                <div class="control-group">
                         <span class="myAllCondition">类型:</span>
                        <select class="small m-wrap mycondition" tabindex="1" id="searchQuestionType">
                        		<option value="">不限</option>
                                <option value="S">单选题</option>
                                <option value="M">多选题</option>
                                <option value="C">判断题</option>
                            </select>
                        <span class="myAllCondition">难度系数:</span>
                        <select class="small m-wrap mycondition" tabindex="1" id="searchDifficulty">
                        		<option value="">不限</option>
                                <option value="3">难</option>
                                <option value="2">中</option>
                                <option value="1">易</option>
                         </select>
                         
                         <span class="myAllCondition">题干:</span>
                         <input class="small m-wrap mycondition" type="text" id="searchTitle" tabindex="1">
                         
                         <span class="myAllCondition">知识点:</span>
						 <input id="knowledgeName" class="medium m-wrap" style="height: 18px !important;width: 100px !important;margin-left: 4px;" type="text" disabled="disabled" />
                         <img src="../images/preCourseIcon.png" data-toggle="modal" data-target="#searchKnowledgeModal" />
                         <img src="../images/clear_grey.png" onclick="clean()"/>
                         <input type="hidden" id='searchKnowledgeId'>
                         
                        <button id="basic_opener4" class="btn blue myredbtn1" onclick="search()">搜索</button>
                </div>

           	<div class="control-group" >
           		<perm:checkPerm permissionCode="exam_question.add">
	               <button id="basic_opener3" class="btn blue myredbtn1 btn-add" data-toggle="modal" id="btn-add" onclick="add()">新增</button>
	            </perm:checkPerm>
           		<perm:checkPerm permissionCode="exam_question.delete">
	               <button id="basic_opener2" class="btn red myredbtn1"  data-toggle='modal' data-target='#myDelModal'>删除</button>  
	            </perm:checkPerm>  
	            
           		<perm:checkPerm permissionCode="exam_question.add">
	               <a class="btn myredbtn1 mybbasic btn-import" href="${pageContext.request.contextPath}/front/main.jssp?fun=QuestionManage">word导入</a> 
	            </perm:checkPerm>  
	               <button id="mybasic3" class="btn myredbtn1 mybbasic" style="display: none;">导出</button>
           		<perm:checkPerm permissionCode="exam_question.add">     
	               <button id="mybasic4" onclick="downloadword()" class="btn myredbtn1 mybbasic">模板下载</button>   
	            </perm:checkPerm>                     
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
                                    <th style="width:8px;"><input type="checkbox" class="checkboxes" value="1" id="all" onclick="checkAll('all','courseCheck')"/></th>
                                    <th>题干</th>
                                    <th>类型</th>
                                    <th>难度系数</th>
                                    <th>答案(单选/多选有此项)</th>
                                    <th>正确答案</th>
                                    <th>创建时间</th>
                                    <!--  <th>所属单位(部门或科室)</th>-->
                                    <th>管理</th>                                 
                                </tr>
                                </thead>
                                <tbody id="questionBank_tbody">
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
					            <!-- 点击删除触发的modal -->
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
						                    <button id="myDelBtn" type="button" class="btn btn-primary blue" onclick="dels();">确定</button>
						                </div>
						            </div>
						        </div>
						    </div>      
                            
                            <!-- 点击新增触发的模态框 -->
                            <div id="myModifyModal" class="modal hide fade" tabindex="-1" data-width="760" >
					           <input type="hidden" id="qid">
					           <div class="modal-header">
					            	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					                <h4 class="modal-title myNewh4" id="myModalLabel3">添加问题</h4>
					           </div>
					           <div class="modal-body">
								<span class="myAllCondition">&#12288;&#12288;类型：</span>
					                <select class="small m-wrap myQbsmall"  tabindex="1" id="type" style="width: 550px !important;margin-bottom: 10px;">					      
					                     <option value="S">单选题</option>
					                     <option value="M">多选题</option>
					                     <option value="C">判断题</option>
					               	</select><br>
					               	<span class="myAllCondition">难度系数：</span>
					                <select class="small m-wrap myQbsmall" tabindex="1" id="difficulty" style="width: 550px !important;margin-bottom: 10px;">
					                	 <option value="3">难</option>
					                     <option value="2">中</option>
					                     <option value="1">易</option>
					               	</select><br>
								    <!--知识点-->
		                            <div class="controls mycontrols">
		                                <label class="control-label myqblabel1" style="float:left;">&#12288;知识点：</label>
		                                <input id="klName" class="medium m-wrap" style="height: 18px !important;width: 537px !important;margin-left: 4px;" type="text" disabled="disabled" />
		                                <img class="myKpselector" style="margin: 5px 0 0 10px;" src="../images/preCourseIcon.png" data-toggle="modal" data-target="#mycuModal" />
		                                <input type="hidden" id='klId'>
		                                <span class="help-inline error pull-right" data-for="klId" style="display: none;">请选择知识点</span>
		                            </div>
									<p class="myqbP1">问题描述:</p>	                        
			                       <div class="mytxt" >
		                                <textarea id="title"></textarea>
				                    </div>	
	                               <div class="control-group mygroup1">
	                                    <div class="controls">  
	                                       <span class="help-inline error" data-for="title" style="display: none;">请填写问题描述</span>                                                       
	                                    </div>
	                                </div>                             
			                            <div id="myOption"></div>			                            
			                            
			                            <div class="Answer" style="display: none;"  id="templet">
				                            <div class="mytxt mytxt1">			           
					                        	 <textarea class="option" style="height: 100px"></textarea>
							                </div>
							                <div class="control-group mygroup1">
												<div class="controls">	
												 <div class="row-fluid">
												   <label class="checkbox line">
													  <button type="button" class="btn mysign2 delAnswer mybbasic"><i class="icon-remove"></i></button>
												   </label>	
															</div>	
															<div class="row-fluid">					    
												   <label class="checkbox">
												   	  <input type="radio" class="btn mysign1 mybbasic set-answer" name="options">标记为正确答案
												   </label>	
												   </div>														
												</div>
											</div>																						
			                            </div>			                            
			                            <div class="answers" >
				                             				                            				                            
			                            </div>			                        			                         
				                        <button id='addKl' type="button" class="btn blue" onclick="addAnswer()">添加答题选项卡</button>
				              <p class="myqbP1">答案解析:</p>
				              <div class="mytxt">
		                            <textarea id="analysis"></textarea>
				               </div>
				               <div class="control-group mygroup1">
                                    <div class="controls">  
                                       <span class="help-inline error" data-for="analysis" style="display: none;">请填写答案解析</span>                                                       
                                    </div>
                                </div>
					            </div>
					            <div class="modal-footer">
					                <button type="button" data-dismiss="modal" class="btn">取消</button>
					                <button type="button" onclick="saveAnswer();" class="btn blue">确定</button>
					            </div>
                            </div>
					        
					        <!-- 知识点按钮触发的Modal -->
                            <div id="mycuModal" class="modal hide fade" tabindex="-1" data-width="760">
	                            <div class="modal-header">
		                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
		                            <h4 class="modal-title">选择知识点</h4>                                          
	                            </div>
	                            <div class="modal-body">
							        <!-- /////////////树/////////////////// -->
							        <div class="row">
							             <ul id="jtree" class="ztree" style="width:500px; overflow:auto;"></ul>
							        </div>
	                            </div>
	                            <div class="modal-footer">
	                                 <button type="button" data-dismiss="modal" class="btn">取消</button>
	                                 <button type="button"  class="btn blue" data-dismiss="modal">确定</button>
	                            </div>
                            </div>                    
                                    
                             <div id="searchKnowledgeModal" class="modal hide fade" tabindex="-1" data-width="760">
	                            <div class="modal-header">
		                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
		                            <h4 class="modal-title">选择知识点</h4>                                          
	                            </div>
	                            <div class="modal-body">
							        <!-- /////////////树/////////////////// -->
							        <div class="row">
							             <ul id="sjtree" class="ztree" style="width:500px; overflow:auto;"></ul>
							        </div>
	                            </div>
	                            <div class="modal-footer">
	                                 <button type="button" data-dismiss="modal" class="btn">取消</button>
	                                 <button type="button"  class="btn blue" data-dismiss="modal">确定</button>
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
	
	<c:import url="common/commonAlert.jsp"></c:import>
		<!-- BEGIN PAGE LEVEL PLUGINS -->
     	
	<!--分页-->
	<script src="../js/common/twilight.js" type="text/javascript"></script>
	<script src="../js/common/ui.ajaxpager.js" type="text/javascript"></script>
	
		
	<!-- 树 -->
    <script type="text/javascript" src="../js/httpclient.js"></script>
    <script src="../js/common/jquery.ztree.all-3.5.min.js"></script>
	
	<!-- 数据校验 -->
     <script src="../js/common/checkData.js" type="text/javascript"></script>
 
    <!-- 富文本 -->

	<!-- END PAGE LEVEL PLUGINS -->
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<script src="../js/questionBank/questionBank.js"></script>
	<script src="../js/app.js"></script>
	<script src="../js/common/common.js"></script>
	<script src="../js/common/sidebar.js" type="text/javascript"></script>
	<script src="../js/notify/addNotify.js"></script>
	
	<!-- IE8兼容两个模态框 -->
	<script src="../js/bootstrap-modalmanager.js"></script>
	<script src="../js/bootstrap-modal.js"></script>
<!-- 	<script type="text/javascript" charset="utf-8" src="js/ue/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="js/ue/editor_api.js"></script>
 -->
 
     <script type="text/javascript" charset="utf-8" src="../js/ue/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="../js/ue/ueditor.all.js"> </script>
    <!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
    <!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
    <script type="text/javascript" charset="utf-8" src="../js/ue/lang/zh-cn/zh-cn.js"></script>
   <script>
   jQuery(document).ready(function() {
	   getKonwledgePoints();
	   getKonwledgePointsForSearch();
   })
   function getKonwledgePointsForSearch(){
    	try{
    	$http.ajax({
    		isModal : false,
    	    type: "GET",
    	    url: "jv/knowledgepoint/list.do",
    	    data: null,
    	    dataType: "json",
    	    success: function(data){
    				data = JSON.parse(data);
    				var obj=new Object();
        	    	obj.core=new Object();
        	    	obj.core.data=new Array();
        	    	var item = createTreeData(data);
        	    	obj.core.data = item;
        	    	if($('#sjtree').length>0){
        	    		$('#sjtree').jstree(obj);
            	    	$('#sjtree').jstree(true).settings.core.data = item;
            	    	$('#sjtree').jstree(true).refresh();
            	    	$('#sjtree').on('select_node.jstree', function (e, data) {
            	    		searchTreeOnClick(data.node.id,data.node.text);
            	    	});
        	    	}
             }
    	});
    	}catch(e){}
	}
   function searchTreeOnClick(currentId,currentName) {
	  	$("#knowledgeName").val(currentName);
	  	$("#searchKnowledgeId").val(currentId);
	  	$('#searchKnowledgeModal').modal('hide');
	};
   	function downloadword(){
   		window.open('/start/filetemplate/试题模板.docx');
   	}
   function clean(){
	   $("#knowledgeName").val('');
	  	$("#searchKnowledgeId").val('');
   }
   </script>
</body>
<!-- END BODY -->
</html>