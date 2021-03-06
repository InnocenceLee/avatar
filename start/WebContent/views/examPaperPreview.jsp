<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->

<!-- BEGIN HEAD -->
	<%
		String reg = "[-]?[0-9]+";
		String id = request.getParameter("id");
		String difficulty = request.getParameter("difficulty");
		String knowledge = request.getParameter("knowledge");
		if(!id.matches(reg)||!difficulty.matches(reg)||!knowledge.matches(reg)){
			throw new Error("examPaperPreview param error");
		}
	%>
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
	 <!-- 分页 -->
    <link rel="stylesheet" href="../css/common/page.css"/>	

	<!-- END PAGE LEVEL STYLES -->

	<link rel="shortcut icon" href="../image/favicon.ico" />
	<!--当前页-->
    <link rel="stylesheet" href="../css/common/common.css">
    <link rel="stylesheet" href="../css/staff/staffExam.css">
    <style type="text/css">
   /*  .questions{
    	text-align: left !important;
    } */
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
			<div class="page-content" id="myeppPage">

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
				<div>
					总分：<span id="totalScore"></span>
					题型数量：单选：<span id="singleCount"></span>题
							 多选：<span id="multipleCount"></span>题
							 判断：<span id="judgeCount"></span>题
					
				</div>
				 <h4 class="media-heading">题目列表（请对试卷题目进行调整）</h4>
			<!-- 不能删除	 -->			
		    <div class="end q-list" id="qestionList"></div>
		     
			<c:if test="${param.opt=='u'}">	 
				<c:if test="${param.mode=='D'}">
					<form id="form" method="post" enctype="multipart/form-data" style="margin:20px;">
						<input name="file" type="file" id="file">	
						<button type="button" class="btn blue" onclick="downloadword()">下载试题模板</button>
					</form>
				</c:if>
				<button type="button" id="mysure" class="btn blue" onclick="save()">保存试卷</button>
				<c:if test="${param.mode!='D'}">
					<button type="button" class="btn blue btn-add" onclick="add()">新增题目</button>	
				</c:if>
				 
				<button type="button" class="btn red" data-toggle="modal" data-target="#myDelModal" >删除题目</button>
				
				
			</c:if>	
                <!-- -----------------------------分页------------------------------------- -->
		<!-- model for delte confirm -->
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
	                </div>
	                <div class="modal-footer">
	                    <span style=" margin-right:50px" class="Bomb-box"></span>
	                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	                    <button id="myDelBtn" type="button" class="btn btn-primary blue" onclick="dels()">确定</button>
	                </div>
	            </div>
	        </div>
	    </div>
	    

	    <div class="modal fade" id="myAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="width: 1000px;left: 40%">
	        <div class="modal-dialog" role="document">
	            <div class="modal-content">
	                <div class="modal-header">
	                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
	                    <h4 class="modal-title" id="myModalLabel">添加试题</h4>
	                </div>
	                <div class="modal-body">
	                    <div id="noselectquestionList">
	                    </div>
	                    <!-- 不能删除	 -->			
		                <div class="page-end"></div>
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
	                <div class="modal-footer">
	                    <span style=" margin-right:50px" class="Bomb-box"></span>
	                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	                    <button id="myDelBtn" type="button" class="btn btn-primary blue" onclick="addNew()" >确定</button>
	                </div>
	            </div>
	        </div>
	    </div>
	    
	    </div>
		</div>
		<!-- BEGIN PAGE LEVEL PLUGINS -->
     <c:import url="common/bottom.jsp"></c:import>
     <c:import url="common/commonAlert.jsp"></c:import>

	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->

	<script src="../js/app.js"></script>
	<script src="../js/common/sidebar.js" type="text/javascript"></script>
	
	<!--分页-->
	<script src="../js/common/twilight.js" type="text/javascript"></script>
	<script src="../js/common/ui.ajaxpager.js" type="text/javascript"></script>
	<!-- <script src="../js/charts.js"></script> -->   

<script>
Array.prototype.remove = function (dx) {  
    if (isNaN(dx) || dx > this.length) {  
        return false;  
    }  
    for (var i = 0, n = 0; i < this.length; i++) {  
        if (this[i] != this[dx]) {  
            this[n++] = this[i];  
        }  
    }  
    this.length -= 1;  
};  

jQuery(document).ready(function() {       
   App.init();
});

// 题目总数
var questionCount = 0;
var knowledges = null;
var difficulty='';
var totalScore = 0;
var multipleCount = 0;
var singleCount = 0;
var judgeCount = 0;
var qidTemp = [];
$(function(){
	setScoreAndCount();
	var opt = "${param.opt}";
	var paper = null;
	$.get("jv/examPaper/detail.do?id=${param.id}",function(data){
		paper = JSON.parse(data);
		knowledges = paper.knowledges;
		difficulty = paper.difficulty
		questions =new Array();
		if(paper.content){
			try{
				var tempContent = JSON.parse(paper.content.value);
				for(var i=0;i<tempContent.questions.length;i++){
					qidTemp.push(tempContent.questions[i].id);
					tempContent.questions[i].Index=new Date().getTime()+i+"s";
					questions.push(tempContent.questions[i]);
				}
				if(questions != undefined){
					handleData(questions);
					questionCount = questions.length;
				}
				
			}catch(e){}
		}
	});
	$.ajax({
		   url: "jv/examPaper/list.do?id=${param.id}",
		   async: false,
		   success: function(data){
			   paper = JSON.parse(data).data[0];
		   }
	});
	if("${param.mode}"=="D"){
		$("#file").on('change',function(){
			var files = $( "#file" )[0].files;
            if (!validateFileType(files[0].name)) return;
			var formData = new FormData($( "#form" )[0]);
			 sendAjax(formData);
		});
	}
});

function setScoreAndCount(){
	$("#totalScore").html(totalScore);
	$("#multipleCount").html(multipleCount);
	$("#singleCount").html(singleCount);
	$("#judgeCount").html(judgeCount);
}
var modeDQuestions=null;
function sendAjax(formData){
	var score = JSON.parse('${param.score}');
		var questions = [];
	     $.ajax({  
	          url: '/start/doc-question-import/parse.jsp' ,  
	          type: 'POST',  
	          data: formData,  
	          async: false,  
	          cache: false,  
	          contentType: false,  
	          processData: false,  
	          success: function (data) { 
	        	  modeDQuestions=new Array();
	        	  var iindex=0
	        	  data.forEach(function(obj){
	        		  var dataObj= {};
	        		  dataObj.content={};
	        		  dataObj.id = obj.id;
	        		  dataObj.content.title = "<p>"+obj.title+"</p>";
	        		  dataObj.content.Index=new Date().getTime()+iindex;
	        		  iindex++;
	        		  dataObj.content.explanation = obj.expanation;
	        		  dataObj.state = "A";
	        		  dataObj.difficulty = ${param.difficulty};
	        		  dataObj.r_num = 0;
	        		  dataObj.w_num = 0;
	        		  dataObj.knowledge = ${param.knowledge};
	        		  if(obj.options&&obj.options.forEach){
	        			dataObj.content.options=obj.options;
	        			if(obj.answer.forEach){
	        				dataObj.type = "M";
	        				dataObj.content.answer = obj.answer;
	        				dataObj.content.type = "M";
	        				dataObj.score = score.multiple_score;
	      			 	 }else{
		       				 dataObj.type = "S";
		       				 dataObj.content.answer = [obj.answer];
		       				 dataObj.score = score.single_score;
		       				 dataObj.content.type = "S";
	      			 	 }
	        		  }else{
		       			 dataObj.type = "C";
		       			 dataObj.content.answer = [obj.answer];
		       			 dataObj.content.options=["对","错"];
		       			 dataObj.score = score.judge_score;
		       			 dataObj.content.type = "C";
	        		  }
	        		  questions.push(dataObj.content);
	        		  modeDQuestions.push(dataObj);
	        	  });
	        	  handleData(questions);
	          },
	          error: function(data){
	        	  showMsg("请确认文档内容格式是否正确");
	          }
	     
	     });
	}


function validateFileType(name) {
	var type = name.substr(name.lastIndexOf('.'));
	if(!(type === '.docx')){
		showMsg("请上传07版word文档");
	}
	return type === '.docx';
}

function handleData(data){
	var score = JSON.parse('${param.score}');
	var html='';
	var options = null;
	var answers = null;
	var qNO = $(".question").length || 0;
	for(var i = 0; i < data.length; i++){
		var content = data[i];
		switch (content.type) {
			case "M":
				multipleCount++;
				totalScore+=score.multiple_score;
				break;
			case "S":
				singleCount++;	
				totalScore+=score.single_score;
				break;
			case "C":
				judgeCount++;
				totalScore+=score.judge_score;
				break;
		}
		html += 
		'<div id='+data[i].Index+' class="portlet box yellow question" data-Index='+data[i].Index+' qid='+ data[i].id +'>'
			+'<div class="portlet-title">'
				+'<div class="caption"> <input name="qestionCheckbox" type="checkbox" value="" qtype="'+data[i].type+'" data-Index="'+data[i].Index+'"/>' + (data[i].type == 'M' ? '多选题' : (data[i].type == 'S' ? '单选题' : '判断题')) +'</div>'
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
	setScoreAndCount();
	$('#qestionList').append(html);
}





function save(){
	var score = JSON.parse('${param.score}');
	var questions = $("#qestionList .question");
	var ids = ""
	var id= null;
	
	//判断题目数量
	if(questions.length<=0){
		showMsg('当前题目数为0,请为该试卷选择题目');
		return;
	}
	if(modeDQuestions == undefined || modeDQuestions.length == 0){
		for(var i = 0 ; i < questions.length; i++){
			id = $(questions[i]).attr("qid");
			if(id != 'undefined'){
				ids += ('ids=' + id +"&");
			}
		}
		updateQuestion(ids,score,questions);
	}else{
		for(var i = 0 ; i < questions.length; i++){
			id = $(questions[i]).attr("qid");
			if(id != 'undefined'){
				ids += ('ids=' + id +"&");
			}
		}
		$.post("jv/examPaper/insertQuestions.do",{questions:JSON.stringify(modeDQuestions)},function(data){
			for(var i = 0 ; i < data.length; i++){
				id = data[i];
				modeDQuestions[i].id=id;
				ids += ('ids=' + id +"&");
			}
			updateQuestion(ids,score,questions);
		})
		return;
	}
}
function updateQuestion(ids,score,questions){
	
	$.post("jv/examPaper/getQuestion.do?" + ids,function(data){
		var content = new Object();
		var questions = [];
		content.single_score = score.single_score;
		content.judge_score = score.judge_score;
		content.multiple_score = score.multiple_score;
		content.questions = questions;
		var obj = null;
		var cont = null;
		for(var i=0 ; i < data.length; i++){
			obj = new Object();
			obj.id = data[i].id;
			obj.type = data[i].type;
			obj.difficulty = data[i].difficulty;
			
			cont = JSON.parse(data[i].content.value);
			obj.options = cont.options;
			obj.title = cont.title;
			
			obj.answer = cont.answer;
			obj.explanation = cont.explanation;
			
			questions.push(obj);
		}
		content = JSON.stringify(content);
		var questionsNum = JSON.stringify({
			single_choice : singleCount,
			multiple_choice : multipleCount,
			judge : judgeCount
		});
		var questionCount = multipleCount + singleCount + judgeCount ; 
		
		$.post("jv/examPaper/updateOne.do",{id:"${param.id}",content:content,questionsNum:questionsNum,totalScore:totalScore,questionCount:questionCount},function(data){
			window.location.assign("../views/examPaperList.jsp");
		})
	})
	
}

function dels(){
	var checkeds = $('input:checkbox[name="qestionCheckbox"]:checked');
	var checkedQuestions = $('input:checkbox[name="questionListChecked"]:checked');
	var score = JSON.parse('${param.score}');
	for(var i=0 ; i < checkeds.length ; i++){
		var Index = $(checkeds[i]).attr("data-index");
		var qtype = $(checkeds[i]).attr("qtype");
		switch (qtype) {
			case "M":
				multipleCount--;
				totalScore-=score.multiple_score;
				break;
			case "S":
				singleCount--;
				totalScore-=score.single_score;
				break;
			case "C":
				judgeCount--;
				totalScore-=score.judge_score;
				break;
		}
		setScoreAndCount();
		if(Index!=undefined &&modeDQuestions){
			//从modeDQuestions中删除
			for(var j=modeDQuestions.length-1;j>=0;j--){
				if(modeDQuestions[j].content.Index == Index){
					modeDQuestions.remove(j);
					break;
				}
			}
		}
		$('#'+Index).remove();
	}
	for(var i=0 ; i < checkedQuestions.length ; i++){
		var question = $(checkedQuestions[i]).closest(".question");
		var qtype = question.attr("qtype");
		var qid = Number(question.attr("qid"));
		for(var h=0;h<qidTemp.length;h++){
			if(qidTemp[h]==qid){
				qidTemp.splice(h, 1);
				break;
			}
		}
		switch (qtype) {
			case "M":
				multipleCount--;
				totalScore-=score.multiple_score;
				break;
			case "S":
				singleCount--;
				totalScore-=score.single_score;
				break;
			case "C":
				judgeCount--;
				totalScore-=score.judge_score;
				break;
		}
		setScoreAndCount();
		question.remove();
	}
	$('#myDelModal').modal('hide')
}
var pageIndex;
var totalNum = 0;
//每段的页码数量
var maxVisible = 10;

function add(){
	tableAjax(1,maxVisible,true,"question_list",false);
}


function addNew(){
	var mysure = $(".end");
	var checkeds =$('.modal-body input:checkbox[name="questionListChecked"]:checked');
	var score = JSON.parse('${param.score}');
	for(var i = 0; i < checkeds.length; i++){
		var question = $(checkeds[i]).closest(".question");
		var qtype = question.attr("qtype");
		var qTitle = question.attr
		var qid = Number(question.attr("qid"));
		var qids = [];
		qids = qids.concat(qidTemp); 
		if(qids.length==0){
			qids.push(qid);
		}else{
			for(var m=0;m<qidTemp.length;m++){
				if(qidTemp[m]==qid){
					showMsg("存在重复试题，请核对后再添加");
					return;
				}
			}
			qids.push(qid);
		}
		qidTemp = qids;
		switch (qtype) {
			case "M":
				multipleCount++;
				totalScore+=score.multiple_score;
				break;
			case "S":
				singleCount++;
				totalScore+=score.single_score;
				break;
			case "C":
				judgeCount++;
				totalScore+=score.judge_score;
				break;
		}
		setScoreAndCount();
		$('#qestionList').append(question);
		
	}
	$('#myAdd').modal('hide');
}


function tableAjax(page,maxVisible,bFlag,modelName,searchFlag){
	var excludeIds = '';
	var questions = $(".end").siblings(".question"); // 排除页面上有的问题
	var qid = null;
	for(var i = 0; i < questions.length; i++){
		qid = $(questions[i]).attr("qid");
		if(i==questions.length-1){
			excludeIds+=qid;
		}else{
			excludeIds+=qid+',';
		}
	}
	
	$.post("jv/examPaper/manualQuesttion.do",{'start':page,'size':maxVisible,knowledges:knowledges},function(data){
    	var questions = data.questions;
    	if(questions.length == 0 ){
    		showMsg("没有查询到题目，请查看题库中是否有题目");
    		return;
    	}
    	handleAddData(questions);
    	$('#myAdd').modal('show');
    	
    	totalNum = data.totalNum;
        //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
        if(searchFlag){
        	$t.using('tableAjax').reset(totalNum);
        } else if(bFlag){
    	    /* 分页   */
	        /*使用方法*/
            $t.using('tableAjax').init({
		    	 maxPage:totalNum,
		    	 difficulty:difficulty,
		    	 modelName:modelName,
		    	 maxVisible:maxVisible
	            
	 	    }); 
        }
		
	})
}



function handleAddData(data){
	
	var mysure = $("#mysure");
	$(".modal-body .question").remove();
	var html = null;
	var content = null;
	var options = null;
	var answers = null;
	var qNO = $(".question").length || 0;
	for(var i = 0; i < data.length; i++){
		content = $.parseJSON(data[i].content.value);
		html = 
		'<div class="portlet box yellow question" qid='+ data[i].id +' qtype='+data[i].type+'>'
			+'<div class="portlet-title">'
				+'<div class="caption"> <input name="questionListChecked" type="checkbox" value="" />' + (data[i].type == 'M' ? '多选题' : (data[i].type == 'S' ? '单选题' : '判断题')) +'</div>'
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
									isRight=true;
									break;
								}
					    	}
					    	html += '<label class="radio line">'
								+'<div class="radio"><span class="'+ (isRight ? 'checked' : '')  +'"><input type="'+ (data[i].type == 'M' ? 'checkbox' : 'radio') +'" checked='+ (isRight ? 'checked' : '') +' ></span></div>'
								+ answerTitle +'、' + options[j]
								+'</label>'
					    	
					    }
					html += '</div>'
					  +'</div>'					
				   +'</div>'
		     +'</div>'
		     $('#noselectquestionList').after(html);
	     
	}
}
function downloadword(){
		window.open('/start/filetemplate/试题模板.docx');
	}

</script>
			
</body>

<!-- END BODY -->
</html>