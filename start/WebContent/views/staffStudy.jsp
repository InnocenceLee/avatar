<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<title>课程详情</title>

<meta content="" name="description" />
<meta content="" name="author" />
<!--强制使用ie的edge兼容模式-->
<meta http-equiv="X-UA-COMPATIBLE" content="IE=edge" />

<c:import url="common/head.jsp"></c:import>
<!-- BEGIN PAGE LEVEL STYLES -->

<link rel="stylesheet" href="../css/DT_bootstrap.css" />

<!--当前页-->
<link rel="stylesheet" href="../css/common/common.css">

<!-- END PAGE LEVEL STYLES -->

<link rel="shortcut icon" href="../image/favicon.ico" />
<style type="text/css">
#content {
	overflow: visible;
}

.pannel {
	position: fixed;
	z-index: 100px;
}

.vali-panel {
	position: fixed;
	top: 0px;
	left: 0px;
	z-index: 10000;
	opacity: 0.5;
	background-color: black;
	color: white;
	display: none;
}

.code-panel {
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

.discuss {
	position: fixed;
	background-color: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100%;
	top: 0px;
	left: 0px;
	padding-left: 35%;
	padding-top: 10%;
}

.discuss-box {
	background-color: white;
	width: 500px;
	height: 350px;
	position: relative;
}

.discuss-box .title {
	/* background-color: #9B9791; */
	height: 60px;
	line-height: 60px;
	/* text-align: center; */
	color: #343941;
	font-size: 18px;
	padding-left: 20px;
	border-bottom: 1px solid #e6e6eb;
}

.discuss-content {
	padding: 10px 0px 10px 30px;
}

.star {
	height: 50px;
	background-color: #E9E9E5;
	line-height: 50px;
	width: 200px;
	margin-bottom: 10px;
	font-size: 25px;
	padding-left: 15px;
	padding-bottom: 0px !important;
}

.discuss-content>* {
	display: block;
	padding-bottom: 10px;
}

.d-content {
	width: 400px;
	height: 60px;
}

.btn-a {
	background-color: #2d94ff;
	border-radius: 2px !important;
	height: 20px;
	width: 80px;
	color: #ffffff;
	text-align: center;
	text-decoration: none !important;
	float: right;
	margin-right: 30px;
	margin-top: 20px;
}

.btn-a:hover {
	cursor: pointer;
	color: #ffffff !important;
	background-color: #3173e6;
}

.star>*:hover {
	cursor: pointer;
}

.icon-star {
	font-size: 25px;
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
		<!-- END SIDEBAR MENU -->
	</div>
	<!-- BEGIN PAGE CONTAINER-->
	<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
	<div class="page-content">
		<iframe src="../courseData/${param.cn}/index.html" width="100%"
			height="100%" name="content"></iframe>
	</div>
	<!--   不要删除 -->
	<div class="vali-panel"></div>

	<div class="code-panel">
		<img src="jv/systemparameter/generateCode.do" class="code-image"
			style="margin-bottom: 10px"> <a href="javascript:;"
			onclick="generateCode()">换一张</a><br> <input type="text"
			name="valiCode" style="margin-right: 10px"> <a
			href="javascript:;" onclick="validata();">验证</a>
	</div>


	<!--   不要删除 -->
	<div class="pannel"></div>

	<div class="discuss" style="display: none;">
		<div class="discuss-box">
			<div class="title">评价</div>
			<div class="discuss-content">
				<span>评价该课时：</span>
				<div class="star">
					<i class="icon-star"></i> <i class="icon-star-empty"></i> <i
						class="icon-star-empty"></i> <i class="icon-star-empty"></i> <i
						class="icon-star-empty"></i>
				</div>
				<span>其他意见或建议：</span>
				<textarea class="d-content"></textarea>
				<input type="hidden" name="startTime"> <input type="hidden"
					name="endTime"> <input type="hidden" name="time"> <a
					class="btn-a" onclick="submitStudy()">提交</a>
			</div>
		</div>
	</div>


	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<c:import url="common/bottom.jsp"></c:import>
	<!-- 引入共通弹出框 -->
	<c:import url="common/commonAlert.jsp"></c:import>
</body>
<script src="${pageContext.request.contextPath}/js/common/sidebar.js"
	type="text/javascript"></script>

<script type="text/javascript">
	var doc = null;
	var count = 0;
	var state = true;

	$(function() {
		$("[name=content]").height($(".page-content").height());

		$(".pannel").width($("[name=content]").width());
		$(".pannel").height($("[name=content]").height());

		var pos = $("[name=content]").offset();
		$(".pannel").offset({
			top : pos.top,
			left : pos.left
		})

		if ("${param.s}" == 'N' || "${param.s}" == 'n') {
			$(".pannel").removeClass("pannel");
		}

		$(".vali-panel").width(window.innerWidth);
		$(".vali-panel").height(window.innerHeight);

		var startTime = null;

		// 循环获取页面内容	直到得到text;
		/*var inv = window.setInterval(function() {
			try {
				// 			 window.frames['content'].frames[0].document.getElementsByClassName('time')[0].innerText
				var text = $(window.frames['content'].document).find(".time")
						.text()
						|| $(window.frames['content'].frames[0].document).find(
								".time").text();
				var times = text.split("/");
				var currentTime = times[0].trim();
				if (!startTime) {
					startTime = new Date().getTime();
					doc = $(window.frames['content'].frames[0].document);
				}
				var totalTime = times[1].trim();
				if (currentTime == totalTime) {
					var endTime = new Date().getTime();
					var time = (endTime - startTime) / 1000 / 60; // 分钟
					if ("${param.opt}" != 'v') {
						toDiscuss(startTime, endTime, time);
						// 					submitStudy(startTime,endTime,time);
					}
					window.clearInterval(inv);
				}
			} catch (e) {
				// 页面还未加载完成
			}
		}, 1000);
		*/
		doc = $(window.frames['content'].document);
		// 生成给定时间内的随机数
		var idleDuration = (Math.ceil(Math.random() * parseInt("${param.i}")) || 0) * 60;
		idleDuration=10;
		if (idleDuration == 0) { // 不弹验证码
			return;
		}
		// 检查是否有操作
		window.setInterval(function() {
			try {
				console.log(count);
				if (count > idleDuration && state) { // 计数器大于 idleDuration 弹验证码
					showVail();
					clickPalyBtn(); // 停止播放
					
				}
				count++;
			} catch (e) {
			}
		}, 1000);

	});

	function showVail() {
		generateCode();
		$(".vali-panel").show();
		$(".code-panel").show();
		state = false;
	}

	// 验证
	function validata() {
		var inputCondeNum = $("[name=valiCode]").val();
		$.post("jv/systemparameter/valiCode.do", {
			inputCondeNum : inputCondeNum
		}, function(data) {
			if (data.result == 1) { // 验证码正确
				state = true;
				count = 0;
				clickPalyBtn();
				return;
			}
			alert("验证码错误");
			generateCode();
		});

	}

	function clickPalyBtn() {
		var btn_play = doc.find(".control_panel .component_container .play");
		$(".vali-panel").hide();
		$(".code-panel").hide();
		btn_play.click();
	}

	function submitStudy() {
		var startTime = $("[name=startTime]").val();
		var endTime = $("[name=endTime]").val();
		var time = $("[name=time]").val();
		// 评价信息
		var starLev = $(".star > .icon-star").length;
		var dcontent = $(".d-content").val();

		var data = {}
		data.studentLearnCourse = parseInt("${param.sId}"); // 课程id
		data.learnState = 1; //学习状态
		data.lessonId = parseInt("${param.lId}"); //课时id
		data.trainTime = parseInt(Math.ceil(time));
		data.type = "E"; // E 学习   R大课  M模拟机  X考试
		data.progress = {
			start : startTime,
			end : endTime,
			progress : 1
		};
		data.evaluation = starLev;
		data.trainComment = dcontent;

		$.post("jv/progress/updateprogress.do", {
			data : JSON.stringify(data)
		}, function(data) {
			window.location.href = "../views/staffCourseList.jsp";
		});
	}

	function generateCode() {
		$(".code-image").attr("src",
				"jv/systemparameter/generateCode.do?" + new Date().getTime());
	}

	// 显示评价
	function toDiscuss(startTime, endTime, time) {
		$("[name=startTime]").val(startTime);
		$("[name=endTime]").val(endTime);
		$("[name=time]").val(time);
	}

	$(".star > [class^=icon-star]").click(function() {
		$(this).attr("class", "icon-star");
		$(this).prevAll().attr("class", "icon-star");
		$(this).nextAll().attr("class", "icon-star-empty");
	});
	//播放完成时调用，该方法通过iframe子页面的监听事件触发
	function playbackComplete() {
		if ("${param.opt}" != 'v') {
			$(".discuss").show();
		}

	}
</script>
</html>