<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->

<!-- BEGIN HEAD -->
<head>
<title>试卷详情</title>

<meta content="" name="description" />
<meta content="" name="author" />
<!--强制使用ie的edge兼容模式-->
<meta http-equiv="X-UA-COMPATIBLE" content="IE=edge" />

<c:import url="common/head.jsp"></c:import>
<!-- BEGIN PAGE LEVEL STYLES -->

<link rel="stylesheet" type="text/css" href="../css/select2_metro.css" />

<link rel="stylesheet" href="../css/DT_bootstrap.css" />

<!-- END PAGE LEVEL STYLES -->

<link rel="shortcut icon" href="../image/favicon.ico" />
<!--当前页-->
<link rel="stylesheet" href="../css/common/common.css">
</head>
<!-- BEGIN BODY -->
<body class="page-header-fixed" code="exam_paper"
	sub-code="exam_paper_list">
	<c:import url="common/top.jsp"></c:import>
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
		<!-- BEGIN SIDEBAR -->
		<c:import url="common/sidebar.jsp"></c:import>
		<!-- BEGIN PAGE CONTAINER-->
		<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
		<div class="page-content">
			<div class="row-fluid">
				<div class="span12">
					<h3 class="page-title">
						试卷管理 <i class="icon-angle-right"></i> 试卷详情
					</h3>
					<div class="media">
						<div class="media-body">
							<h4 class="media-heading myKnowtitle">基本信息</h4>
							<p>
								&#12288;试卷名称：<span name="name"></span>
							</p>
							<p>
								考察知识点：<span name="knowledges"></span>
							</p>
							<p>
								&#12288;生成方式：<span name="mode"></span>
							</p>
							<p>
								&#12288;难度系数：<span name="difficulty"></span>
							</p>
							<p>
								&#12288;题目数量：<span name="questionNum" id="questionNum"></span>
							</p>
							<p>
								&#12288;试卷描述：<span name="discribe" id="myepdGroup1"></span>
							</p>
							<p>
								&#12288;审核意见：<span name="result" id="myepdGroup2"></span>
							</p>
				
					
							<div class="portlet box blue" style="margin: 50px; display: block;">
								<div class="portlet-title">
									<div class="caption">试题内容</div>
								</div>
								<div class="portlet-body" style="overflow: auto;">
									<div class="span12" id="QestionList"></div>
									
									
								</div>
							</div>
						</div>

					</div>
					
				</div>
			</div>

		</div>
	</div>

	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<c:import url="common/bottom.jsp"></c:import>
	<c:import url="common/commonAlert.jsp"></c:import>
	<script type="text/javascript" src="../js/httpclient.js"></script>
	<script type="text/javascript" src="../js/select2.min.js"></script>

	<script type="text/javascript" src="../js/jquery.dataTables.js"></script>

	<script type="text/javascript" src="../js/DT_bootstrap.js"></script>

	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<script src="../js/common/sidebar.js" type="text/javascript"></script>
	<script src="../js/app.js"></script>

	<!-- <script src="../js/table-managed.js"></script>      -->
	<script>
		jQuery(document).ready(function() {
			App.init();
		});

		var id = window.location.href.match(/id=\d+/)[0].split("=")[1];
		loadQestionByPaper(id);
		//生成模式
		var modeTemp = "";
		$(function() {
			var knowledgepoints = null;

			$http.ajax({
				isModal : false,
				type : "GET",
				url : "jv/knowledgepoint/list.do",
				data : null,
				async : false,
				dataType : "json",
				success : function(data) {
					data = JSON.parse(data);
					knowledgepoints = data;
				}
			});
			// 试卷信息

			$http.ajax({
				isModal : false,
				url : "jv/examPaper/list.do?id=" + id,
				async : false,
				success : function(data) {
					data = JSON.parse(data).data[0];
					if (!data)
						window.location.assign("views/examPaperList.jsp");
					modeTemp = data.mode;
					var nums = JSON.parse(data.quesions_num.value);
					$("span[name=name]").text(data.name);
					$("[name=discribe]").text(data.discribe);
					$("[name=result]").text(data.result);
					$("span[name=mode]").text(data.mode == 'S' ? '手动' : (data.mode == 'D'?'word导入':'随机'));

					$("span[name=questionNum]").text(data.question_count);
					$("span[name=difficulty]").text(
							data.difficulty == '3' ? '难'
									: data.difficulty == '2' ? '中' : '易');

					var knsName = data.knowledgestitle;
					$("span[name=knowledges]").text(
							knsName.substr(0, knsName.length));

				}
			});//试卷信息
		});

		function update() {
			window.location.replace('../views/examPaperUpdate.jsp?id=' + id)
		}

		//预览试卷
		function viewQuestion() {
			if ((modeTemp == "Z") || (modeTemp == "z")) {
				showMsg("随机试卷不支持预览");
				return;
			}
			window.open('../views/examPaperPreview.jsp?difficulty=-1&knowledge=-1&id='+ id);
		}

		function del() {
			var isdel = confirm("确认删除？");
			if (!isdel)
				return;
			$.post("jv/examPaper/dels.do?ids=" + id, function(data) {
				window.location.assign("views/examPaperList.jsp");
			});
		}
		/**
		加载试卷内容
		*/
		function loadQestionByPaper(id){
			var paper;
			$.ajax({
				   url: "jv/examPaper/list.do?id="+id,
				   async: false,
				   success: function(data){
					   paper = JSON.parse(data).data[0];
					   if(paper.mode!="Z"){
						   if(paper.content){// 有试题
								var questions = JSON.parse(paper.content.value).questions;
								var ids = ""

								if(questions != undefined){
										
										for(var i=0 ; i < questions.length ; i++){
											ids+= questions[i].id+",";
										}
										$.post("jv/examPaper/getQuestion.do",{ids:ids},function(data){
											$('#questionNum').html(data.length);
											handleData(data);
										});	
								}
							
								return;
							}
					   }
						
				   }
			});
		}
		function handleData(data){
			
			var html = '';
			var content = null;
			var options = null;
			var answers = null;
			var qNO = $(".question").length || 0;
			for(var i = 0; i < data.length; i++){
				if("${param.mode}"=="D"){
					content = data[i].content;
				}else{
					content = $.parseJSON(data[i].content.value);
				}
				html += 
				'<div class="portlet box yellow question" qid='+ data[i].id +'>'
					+'<div class="portlet-title">'
						+'<div class="caption"> ' + (data[i].type == 'M' ? '多选题' : (data[i].type == 'S' ? '单选题' : '判断题')) +'</div>'
					+'</div>'
					+'<div class="portlet-body">'
						+'<p class="subject">'
					       + content.title
						+'</p>'
						+'<div class="control-group">'
							+'<div class="controls">';
								
							    options = content.options;
							    answers = content.answer;
							    var count = 0;
							    var answerTitle = null
							    for(var j = 0; j < options.length ;j++ ){// 循环选项 ABCD
							    	answerTitle = String.fromCharCode(65 + count++);
							        var  isRight = false;
									for(var k = 0; k < answers.length ; k++){// 查找正确答案
										if(answers[k] == options[j]){
											isRight = true;
											break;
										}
							    	}
							    	html += '<label class="radio line">'
										+'<div class="'+ (data[i].type == 'M' ? '' : 'radio') +'"><span class="'+ (isRight ? 'checked' : '')  +'"><input type="'+ (data[i].type == 'M' ? 'checkbox' : 'radio') +'"  '+ (isRight ? 'checked' : '') +' ></span></div>'
										+ answerTitle +'、' + options[j]
										+'</label>'
							    	
							    }
							html += '</div>'
							  +'</div>'					
						   +'</div>'
				     +'</div>'
			}
			$('#QestionList').html(html);
		}
	</script>

</body>

<!-- END BODY -->
</html>