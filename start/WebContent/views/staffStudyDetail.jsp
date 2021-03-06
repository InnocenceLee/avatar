<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<% request.setCharacterEncoding("utf-8"); %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>	
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
	<script type="text/javascript" src="/start/js/jquery-1.10.1.min.js"></script>
	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>
    
    <link rel="stylesheet" href="../css/common/common.css">
    <link rel="stylesheet" href="../css/bootstrap.min.css" />
	<style type="text/css">
	#content{
		overflow:visible; 
	}
	
	.pannel{
		position: fixed;
		z-index: 100px;
	}
	.vali-panel{
		position: fixed;
		top: 0px;
		left : 0px;
		z-index: 10000;
		opacity : 0.5;
		background-color: black;
		color: white;
		display: none;
	}
	.code-panel{
		width: 300px;
		color: white;
		background-color: #fff;
		z-index: 20001;
		position: fixed;
		padding: 20px;
		top: 40%;
		left: 40%;
		display: none;
	}
	.discuss{
		position: fixed;
		background-color: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		padding-left: 35%;
		padding-top: 10%;
	}
	.discuss-box{
		background-color: white;
		width: 500px;
		height: 350px;
		position: relative;
	}
	.discuss-box .title{
		/* background-color: #9B9791; */
		height: 60px;
		line-height: 60px;
		/* text-align: center; */
		color: #343941;
		font-size:18px;
		padding-left:20px;
		border-bottom:1px solid #e6e6eb;
	}
	.discuss-content{
		padding: 10px 0px 10px 30px;
	}
	.star{
		height: 50px;
		background-color: #E9E9E5;
		line-height: 50px;
		width: 200px;
		margin-bottom: 10px;
		font-size: 25px;
		padding-left: 15px;
		padding-bottom: 0px !important;
	}
	.discuss-content > *{
		display : block;
		padding-bottom: 10px;
	}
	.d-content{
		width: 400px;
		height: 60px;
	}
	.btn-a{
		background-color: #2d94ff;
		border-radius:2px !important;
		height: 20px;
		width:80px;
		color: #ffffff;
		text-align: center;
		text-decoration: none !important;
		float:right;
		margin-right:30px;
		margin-top:20px;
	}
	.btn-a:hover{
		cursor: pointer;
		color:#ffffff !important;
		background-color:#3173e6;
    }
    .star > *:hover{
        cursor: pointer;
    }
    .icon-star{
    	font-size: 25px;
    }
	</style>
</head>
<body>
	<div class="page-content">
			<iframe id="frame"  src="${fileServiceURL}/fileUpload/unzipfile/${param.cn}/index.html" width="1500" height="768" name="content"></iframe>
            </div> 
            <!--   不要删除 -->
            <div class="vali-panel"></div> 
            
            <div class="code-panel">
           		<img src="jv/systemparameter/generateCode.do" class="code-image" style="margin-bottom: 10px">
           		<a href="javascript:;"  onclick="generateCode()">换一张</a><br>
           		<input type="text" name="valiCode" style="margin-right: 10px">
           		<a href="javascript:;" onclick="validata();">验证</a>
           	</div>
           	
           	
        <!--   不要删除 -->   	       
		<div class="pannel"></div>
		
		<div class="discuss" style="display: none;">
       		<div class="discuss-box">
       			<div class="title">评价</div>
       			<div class="discuss-content">
       				<span style="color:red">注意：请对该课程进行评价，不评价将导致该课程的学习不被记录。</span>
       				<span>评价该课时：</span>
	         		<div class="star">
	         			<i class="icon-star"></i>
	         			<i class="icon-star-empty"></i>
	         			<i class="icon-star-empty"></i>
	         			<i class="icon-star-empty"></i>
	         			<i class="icon-star-empty"></i>
	         		</div>
	         	    <span>其他意见或建议：</span>
	         	    <textarea class="d-content"></textarea>
	         	    <input type="hidden" name="startTime">
	         	    <input type="hidden" name="endTime">
	         	    <input type="hidden" name="time">
	         	    <a class="btn-a" onclick="submitStudy()">提交</a>
       			</div>
       		</div>
       	</div>
       	<!-- 引入共通弹出框 -->
	    <c:import url="common/commonAlert.jsp"></c:import> 
	    <script src="${pageContext.request.contextPath}/js/bootstrap.min.js" type="text/javascript"></script>
	    <script src="${pageContext.request.contextPath}/js/common/common.js" type="text/javascript"></script>
</body>

<script type="text/javascript">

var count = 0;
var state = true;
var startTime=(new Date()).getTime(); //学习开始时间
var endTime = undefined;//学习结束时间
var duration = "${param.duration}"; // 学习时长
duration = !!duration ? (parseFloat(duration) || 0) : 0; // 转为数字
function fixLayout() {
	$("[name=content]").height($(".page-content").height());
    
    $(".pannel").width($("[name=content]").width());
    $(".pannel").height($("[name=content]").height());
    
    var pos = $("[name=content]").offset();
    $(".pannel").offset({top:pos.top,left:pos.left})
    
    if("${param.s}" == 'N' || "${param.s}" == 'n'){
        $(".pannel").removeClass("pannel");
    }
    
    $(".vali-panel").width(window.innerWidth);
    $(".vali-panel").height(window.innerHeight);
    $("#frame").width($(window).width())
               .height(($(window).width()) * 0.51);
}
$(function(){
	var trlessonId=${param.lId};
	$.post("jv/course/listTrainLessonNameById.do",{id:trlessonId},function(data){
		data = JSON.parse(data);
		document.title = data.name;
	});
	fixLayout();
	$(window).resize(fixLayout);
	var startTime = null;
	
	var inv = $(window).on("message",function(e){
		try {
			console.log('e.originalEvent.data:'+e.originalEvent.data);
			if(e.originalEvent.data!="playComplete"){
				var text = e.data;
				var times = text.split("/");
				var currentTime = times[0].trim();
				if(!startTime){
					startTime = new Date().getTime();
				}
				console.log(startTime);
				var totalTime = times[1].trim();
				if(currentTime == totalTime){
					var endTime = new Date().getTime();
					var time = (endTime - startTime)/1000/60; // 分钟
					if("${param.opt}" != 'v'){
                        toDiscuss(startTime,endTime,time);
					}
					window.clearInterval(inv);
				}
			}
			if(e.originalEvent.data=="playComplete"){
				playbackComplete();
			}
			
		} catch (e) {
			// 页面还未加载完
		}
	});
	
	
	// 生成给定时间内的随机数
	var idleDuration = (parseFloat("${param.i}") || 0) * 60;
	if(idleDuration == 0){ // 不弹验证码
		return;
	}
	// 检查是否有操作
	window.setInterval(function(){
		try{
			if(count >= idleDuration && state){ // 计数器大于 idleDuration 弹验证码
				clickPalyBtn(); // 停止播放
                hideMsg(); // 关闭提示框
				showVail();
			}
			count++;
		}catch(e){}
	},1000);
	
});

function showVail(){
	generateCode();
	$(".vali-panel").show();
	$(".code-panel").show();
	state = false;
}

// 验证
function validata(){
	var inputCondeNum = $("[name=valiCode]").val();
	$.post("jv/systemparameter/valiCode.do",{inputCondeNum:inputCondeNum},function(data){
		if(data.result == 1){ // 验证码正确
			state = true;
			count = 0;
			$("[name=valiCode]").val("");
			clickPalyBtn();
			return ;
		}
		alert("验证码错误");
		generateCode();
	});
	
}
var frame=document.getElementById("frame").contentWindow;
function clickPalyBtn(){
	frame.postMessage("btn_play","*");
	$(".vali-panel").hide();
	$(".code-panel").hide();
}



function submitStudy(){
	endTime = (new Date()).getTime(); 
	var time = $("[name=time]").val();
	// 评价信息
	var starLev = $(".star > .icon-star").length;
	var dcontent = $(".d-content").val();
	
	var data = {}
	data.studentLearnCourse = parseInt("${param.sId}");     // 课程id
	data.lessonId =  parseInt("${param.lId}");             //课时id
	data.evaluation = starLev;
	data.trainComment = dcontent;
	data.type =  "E";
	
	$.post("jv/progress/updateprogress.do",{data:JSON.stringify(data)},function(data){
		window.location.href =  "../views/staffCourseList.jsp";
	});
}

function generateCode(){
	$(".code-image").attr("src", "jv/systemparameter/generateCode.do?"+ new Date().getTime());
}

// 显示评价
function toDiscuss(startTime,endTime,time){
	
	$("[name=startTime]").val(startTime);
	$("[name=endTime]").val(endTime);
	$("[name=time]").val(time);
}

$(".star > [class^=icon-star]").click(function(){
	$(this).attr("class","icon-star");
	$(this).prevAll().attr("class","icon-star");
	$(this).nextAll().attr("class","icon-star-empty");
});
//播放完成时调用，该方法通过iframe子页面的监听事件触发
function playbackComplete(){
	var finished = true;
	if("${param.opt}" != 'v'){
		if( "${param.opt}" != 'l'){
			debugger;
			finished = false;

            endTime = (new Date()).getTime(); 
	        var time = Math.floor((endTime - startTime)/1000/60); // 分钟
	        var seconds = Math.floor((endTime - startTime)/1000%60); // 秒
	        if (time < duration) {
	            // 如果学习时间小于规定的学习时长，则不允许结束学习，且不上传学习进度
	            showMsg('学习时间未达到规定时间，请检查是否有漏掉的内容。已学：' + time + '分钟' + seconds + '秒/' + duration + '分钟');
	            finished = false;
	        } else {
	            finished = true;
	            // 如果已完成则上传学习进度
	            var time = $("[name=time]").val();
	            var data = {}
	            data.studentLearnCourse = parseInt("${param.sId}");     // 课程id
	            data.learnState =  1;              //学习状态
	            data.lessonId =  parseInt("${param.lId}");             //课时id
	            data.trainTime = Math.ceil(endTime - startTime);//计算时间
	            data.type =  "E";                     // E 学习   R大课  M模拟机  X考试
	            data.progress = {start:startTime,end:endTime,progress:1};
	            
	            $.post("jv/progress/addprogress.do",{data:JSON.stringify(data)},function(data){
	    //              window.location.href =  "../views/staffCourseList.jsp";
	            });
	            
	            var obj = {'studentLearnCourse':parseInt("${param.sId}"),
	                    'isOver':true};
	            var strDate = JSON.stringify(obj);
	            $.ajax({
	                url : 'jv/progress/updateLearnState.do',
	                type : 'post',
	                dataType: "json",
	                data: {
	                     'data' : strDate
	                    },
	                async : false,
	                success : function(data){}
	            });
	        }
		}
        finished && $(".discuss").show();

		
	}
	
}

</script>
</html>