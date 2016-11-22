<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
 
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
 
<!--[if !IE]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<title>软件参数配置</title>

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
			<div class="page-content" id="myPuPage">

            <!-- BEGIN PAGE HEADER-->

            <div class="row-fluid">

                <div class="span12">

                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                    <h3 class="page-title">
                      其他设置
                    </h3>

                    <!-- END PAGE TITLE & BREADCRUMB-->

                </div>

            </div>
            <!-- ---------------------基本信息------------------------------------------- -->
            <div class="tab-content">
                <!-- BEGIN FORM-->
                <form action="#" class="form-horizontal">
                <div class="control-group">

                    <label class="control-label Bomb-box" id="parameterDate">到期默认提醒天数&nbsp;</label>

                    <div class="controls">

                        <input type="text" placeholder="3" class="m-wrap small mysmall Bomb-box" id="pusmall">

                        <span class="myPrompt">天</span>

                    </div>
                </div>
                    </form>
                <!--课程-->
                <h4 class="media-heading myclass">课程</h4>
                    <label class="checkbox myPucheckbox">
                        <input type="checkbox" value=""  id="parameterOrder" class="parameterCheck"/>课时顺序固定
                    </label>
                <!--课时-->
                <h4 class="media-heading myclasstime">课时</h4>
                <div class="control-group">
                    <div class="controls">
                        <label class="checkbox line">
                            <input type="checkbox" value=""  id="parameterSchedule" class="parameterCheck"/>禁止拖动播放进度
                        </label>
                        <label class="checkbox line" id="myUpCheck1">
                            <input type="checkbox" value="" id="parameterHang"  class="parameterCheck"/>防止挂机
                        </label>
                    </div>
                </div>
                   <!--考试-->
                <h4 class="media-heading mytext">考试</h4>
                <div class="control-group">
                    <span >考试截止时间&nbsp;</span>
                        <input type="text" class="m-wrap medium Bomb-box" id="parameterTime">
                    <span class="myPrompt">&nbsp;分钟</span>
                    <span class="myPuSpan1">验证码间隔时间&nbsp;</span>
                    <input type="text" class="m-wrap medium Bomb-box" id="parameterInterval">
                    <span class="myPrompt">&nbsp;分钟</span>
                    </div>
                <div class="control-group">
                    <span >及格分数&#12288;&#12288;&nbsp;</span>
                    <input type="text" class="m-wrap medium Bomb-box" id="parameterPass">
                    <span class="myPrompt">&nbsp;分</span>
                    <span class="myPuSpan1">&#12288;&nbsp;考试时长&#12288;&#12288;&#12288;</span>
                    <input type="text" class="m-wrap medium Bomb-box" id="parameterLength">
                    <span class="myPrompt">&nbsp;分钟</span>
                </div>
                <label class="checkbox myPucheckbox">
                    <input type="checkbox" value=""  id="parameterOrder" class="parameterCheck"/>试题选项乱序
                </label>

                <!-- -----------------试卷------------------------------ -->
                <h4 class="media-heading mytext">试卷</h4>
                <span class="myPuSpan2">题目总数&nbsp;&nbsp;&nbsp;</span>
                <input type="text" class="m-wrap medium Bomb-box" id="parameterTotalNumber">
                <span class="myPrompt">&nbsp;道</span>
                <!-- -----------------管理员IP端------------------------------ -->
                <h4 class="media-heading myanmin">管理员IP端</h4>
                <span class="myPuSpan2">题目总数&#12288;&#12288;</span>
                <input type="text" class="m-wrap medium Bomb-box" id="parameterIp">~ <input type="text" class="m-wrap medium Bomb-box" id="parameterIp1">

                <h4 class="media-heading myanmin">题目分数</h4>
                <span class="myPuSpan2">判断题&#12288;</span><input type="text" class="m-wrap medium Bomb-box" id="parameterJudgment">
                <span class="myPuSpan2">单选题&#12288;</span><input type="text" class="m-wrap medium Bomb-box" id="parameterChoice">
                <span class="myPuSpan2">多选题&#12288;</span><input type="text" class="m-wrap medium Bomb-box" id="parameterChoice1">
                </div>
                <!-- END FORM-->
                <button class="btn blue myredbtn1" id="myPubtn" style="width:auto;">保存设置</button>
            </div>
                   
            <!-- -----------------------------分页------------------------------------- -->

        </div>

        <!-- END PAGE -->

  <!--   </div>
</div> -->

		<!-- BEGIN PAGE LEVEL PLUGINS -->
     <c:import url="common/bottom.jsp"></c:import>
	<script type="text/javascript" src="../js/select2.min.js"></script>

	<script type="text/javascript" src="../js/jquery.dataTables.js"></script>

	<script type="text/javascript" src="../js/DT_bootstrap.js"></script>

	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->

	<script src="../js/app.js"></script>

	<!-- <script src="../js/table-managed.js"></script>      -->
<script>

    jQuery(document).ready(function() {

        App.init();

        TableManaged.init();

    });

</script>
			<script type="text/javascript">  var _gaq = _gaq || [];  _gaq.push(['_setAccount', 'UA-37564768-1']);  _gaq.push(['_setDomainName', 'keenthemes.com']);  _gaq.push(['_setAllowLinker', true]);  _gaq.push(['_trackPageview']);  (function() {    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;    ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);  })();</script>
		</body>

<!-- END BODY -->
</html>