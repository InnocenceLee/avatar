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
<link rel="stylesheet" href="../css/common/metro.css">
<!--当前页-->
<link rel="stylesheet" href="../css/common/common.css">
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

			<div class="container-fluid" id="page-content">
				<!-- BEGIN PAGE HEADER-->
				<div class="row-fluid">
					<div class="span12">
						<!-- BEGIN PAGE TITLE & BREADCRUMB-->
						<h3 class="page-title myKnowtitle">
							帮助管理 <small></small>
						</h3>
						<!-- END PAGE TITLE & BREADCRUMB-->
					</div>
				</div>

			


               <div class="control-group">
                            <label class="control-label myEaLable myAllCondition">帮助标题：</label>
                            <div class="controls mycontrols">
                                <input  type="text" class="m-wrap large" id="helpname">
                            </div>
                 </div>
				<div class="control-group">
					<script id="editor" type="text/plain"
						style="width:1024px;height:500px;"></script>
				</div>
	           <div class="control-group">
                   
					<button id="basic_opener3" class="btn blue myredbtn1 btn-add"
						 id="btn-add"  onclick="getContent()">保存</button>
				</div>

			</div>

		</div>
	</div>


	<c:import url="common/bottom.jsp"></c:import>
	<c:import url="common/commonAlert.jsp"></c:import>


	<!-- <script type="text/javascript" src="../js/common/jquery-1.4.4.min.js"></script> -->

	<script type="text/javascript" src="../js/httpclient.js"></script>
	<script src="../js/common/jquery.ztree.all-3.5.min.js"></script>

	<!-- END JAVASCRIPTS -->
	<script src="../js/common/sidebar.js" type="text/javascript"></script>
	<script src="../js/common/checkData.js" type="text/javascript"></script>
	<script src="../js/app.js"></script>

	<script type="text/javascript" charset="utf-8"
		src="../js/ue/ueditor.config.js"></script>
	<script type="text/javascript" charset="utf-8"
		src="../js/ue/ueditor.all.min.js">
		
	</script>
	<!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
	<!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
	<script type="text/javascript" charset="utf-8"
		src="../js/ue/lang/zh-cn/zh-cn.js"></script>

	<script>
		var ue = UE.getEditor('editor');
	   UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
	   UE.Editor.prototype.getActionUrl = function(action) {
		 if (action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadimage') {
		    return '/start/jv/help/uploadimage.do?';
		  } else if (action == 'uploadvideo') {
		     return 'http://a.b.com/video.php';
		  } else {
		      return this._bkGetActionUrl.call(this, action);
		 }
		}
		var helpObj = {name:"",content:""}
		function getContent() {
			var hascontent = UE.getEditor('editor').hasContents();
			var title = $("#helpname").val();
			if(title==""){
				alert("请输入标题!");
				return;
			}
			
			if(hascontent == false){
				alert("内容为空!");
			}else{
				var arr = [];
				arr.push("使用editor.getContent()方法可以获得编辑器的内容");
				arr.push("内容为：");
				arr.push(UE.getEditor('editor').getContent());
				helpObj.content = UE.getEditor('editor').getContent();
				helpObj.name = title;
				
			  	$.ajax({
		    		type : "POST",
		    		url : "jv/help/helpAdd.do",
		    		data : {
						name :helpObj.name,
						content:helpObj.content
					},
		    		dataType : "json",
		    		success : function(data) {
		    			alert("添加成功！");
		    			window.location.href="helplist.jsp";
		    		}
		    	});
			}
	
		}


	</script>

</body>

<!-- END BODY -->
</html>