<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->

<!-- BEGIN HEAD -->
<head>
	<title>预览试卷${name}</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->

	<link rel="stylesheet" type="text/css" href="../css/select2_metro.css" />

	<link rel="stylesheet" href="../css/DT_bootstrap.css" />

	<!-- END PAGE LEVEL STYLES -->

	<link rel="shortcut icon" href="../image/favicon.ico" />
	<!--当前页-->
    <link rel="stylesheet" href="../css/common/common.css">
    <style type="text/css">
    .questions{
    	text-align: left !important;
    }
    #mysure{
    	margin: 20px !important;
    	display : inline-block;
    }
    .btn-add{
    	margin-right: 20px;
    }
    </style>
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
			<div class="page-content">

				<!-- BEGIN PAGE HEADER-->

				<div class="row-fluid">

					<div class="span12">

						<!-- BEGIN PAGE TITLE & BREADCRUMB-->
						<h3 class="page-title">
							预览试卷
						</h3>

						<!-- END PAGE TITLE & BREADCRUMB-->

					</div>

				</div>
				 
				 <h4 class="media-heading">题目列表：</h4>
				 <!-- 题目列表一 -->
				 
					<!--  <div class="portlet box yellow">

							<div class="portlet-title">

								<div class="caption"> <input type="checkbox" value="" />一、单选题</div>
                                 <span class="myeqmspan1">标签：数学题</span>
							</div>
							<div class="portlet-body">
								<p class="subject">
                                         已知两个数字为1~30之间的数字，甲知道两数之和，乙知道两数之积，甲问乙：“你知道是哪两个数吗？”
                                    乙说：“不知道”，甲问乙：“你知道是哪两个数吗？”甲说：“也不知道”。于是，乙说：“那我知道了”，随后甲也说：“那我也知道了”。这两个数是什么？
								</p>

								<div class="control-group">
									<div class="controls">
										<label class="radio">
										<div class="radio"><span><input type="radio" name="optionsRadios1" value="option1"></span></div>
										A、2
										</label>
										<label class="radio">
										<div class="radio"><span class="checked"><input type="radio" name="optionsRadios1" value="option2" checked=""></span></div>
										B、2
										</label>  
										<label class="radio">
										<div class="radio"><span><input type="radio" name="optionsRadios1" value="option2"></span></div>
										C、2
										</label>  
                                                    <label class="radio">
										<div class="radio"><span><input type="radio" name="optionsRadios1" value="option2"></span></div>
										D、2
										</label> 
										  <label class="radio">
										<div class="radio"><span><input type="radio"  checked></span></div>
										F、2
										</label> 
									</div>
								</div>					
							</div>
						</div>  -->					
				 

				
                <!-- -----------------------------分页------------------------------------- -->

		</div>
		</div>
		<!-- BEGIN PAGE LEVEL PLUGINS -->
     <c:import url="common/bottom.jsp"></c:import>

	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->

	<script src="../js/app.js"></script>
	<script src="../js/common/sidebar.js" type="text/javascript"></script>
	<!-- <script src="../js/charts.js"></script> -->   

<script>


jQuery(document).ready(function() {       

   // initiate layout and plugins

   App.init();

//    Charts.init();

//    Charts.initCharts();

//    Charts.initPieCharts();

});

// 题目总数
var questionCount = 0;

$(function(){
	var opt = "${param.opt}";
	var paper = null;
	
	$.ajax({
		   url: "jv/examPaper/list.do?id=${param.id}",
		   async: false,
		   success: function(data){
			   paper = JSON.parse(data).data[0];
			   console.log(paper);
		   }
	});
	questionCount = paper.question_count;
	
	if(paper.content){// 有试题
		var questions = JSON.parse(paper.content.value).questions;
		var ids = ""
		for(var i=0 ; i < questions.length ; i++){
			ids+= questions[i].id+",";
		}
		$.post("jv/examPaper/getQuestion.do",{ids:ids},function(data){
			handleData(data);
		});
		return;
	}
	
	
	// 无试题 自动随机生成
	$.post("jv/examPaper/gennerateQuestion.do",{id:"${param.id}"},function(data){
		handleData(data);
	})
	
	
});

function handleData(data){
	
	var mysure = $("#mysure");
	var html = null;
	var content = null;
	var options = null;
	var answers = null;
	var qNO = $(".question").length || 0;
	for(var i = 0; i < data.length; i++){
		content = $.parseJSON(data[i].content.value);
		html = 
		'<div class="portlet box yellow question" qid='+ data[i].id +'>'
			+'<div class="portlet-title">'
				+'<div class="caption"> <input type="checkbox" value="" />'+ (++qNO) +'、'+ (data[i].type == 'M' ? '多选题' : (data[i].type == 'S' ? '单选题' : '判断题')) +'</div>'
	           /*  +'<span class="myeqmspan1">标签：数学题</span>' */
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
								isRight = answers[k] == options[j]
					    	}
					    	html += '<label class="radio">'
								+'<div class="radio"><span class="'+ (isRight ? 'checked' : '')  +'"><input type="radio" checked='+ (isRight ? 'checked' : '') +' ></span></div>'
								+ answerTitle +'、' + options[j]
								+'</label>'
					    	
					    }
					html += '</div>'
					  +'</div>'					
				   +'</div>'
		     +'</div>'
		     mysure.before(html);
	     
	}
}




</script>
			
</body>

<!-- END BODY -->
</html>