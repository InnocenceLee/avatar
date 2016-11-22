<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

    
	<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->

	<!-- BEGIN CORE PLUGINS -->

    <script src="${pageContext.request.contextPath}/js/jquery-1.10.1.min.js" type="text/javascript"></script>

    <script>$.ajaxSetup({cache:false});</script>
	<script src="${pageContext.request.contextPath}/js/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/jslib/json2.js" type="text/javascript"></script>

	<!-- IMPORTANT! Load jquery-ui-1.10.1.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->

	<script src="${pageContext.request.contextPath}/js/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>      

	<script src="${pageContext.request.contextPath}/js/bootstrap.min.js" type="text/javascript"></script>

    <!-- <script src="../js/common/jstree.min.js" type="text/javascript"></script>
    <script src="../js/common/readTreeJson.js" type="text/javascript"></script>
    <script type="text/javascript" src="../js/httpclient.js"></script>
    <script src="../js/common/knowledgepointtree.js" type="text/javascript"></script>
 -->
    <script src="${pageContext.request.contextPath}/js/common/jstree.min.js" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/js/common/knowledgepointtree.js" type="text/javascript"></script>
    <!-- <script type="text/javascript">
        $(function(){
            setInterval("fresh()",60000);
        });
        function fresh(){
            $.ajax({
                isModal : false,
                type: "get",
                url: "jv/notify/listNewCount.do",
                success: function(data){
                    var oldCount = $("#newCount").html()*1;
                    if(oldCount<data){
                        var audio = document.createElement("audio");
                        audio.src = "/start/image/notify.mp3";
                        audio.play();
                    }
                    if(oldCount!=data){
                        $("#newCount").html(data)
                    }
                }
            });
        }
    </script> -->

	<!--[if lt IE 9]>
 
	<script src="..js/excanvas.min.js"></script>
 
	<script src="..js/respond.min.js"></script>  
 
	<![endif]-->  
	
	<script src="${pageContext.request.contextPath}/js/bootstrap-datetimepicker.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/js/bootstrap-datetimepicker.zh-CN.js" type="text/javascript"></script>

	<script src="${pageContext.request.contextPath}/js/jquery.slimscroll.min.js" type="text/javascript"></script>

	<script src="${pageContext.request.contextPath}/js/jquery.blockui.min.js" type="text/javascript"></script>  

	<script src="${pageContext.request.contextPath}/js/jquery.cookie.min.js" type="text/javascript"></script>

	<script src="${pageContext.request.contextPath}/js/jquery.uniform.min.js" type="text/javascript" ></script>

	<!-- END CORE PLUGINS -->

	<script src="${pageContext.request.contextPath}/js/common/common.js" type="text/javascript" ></script>
	<script src="${pageContext.request.contextPath}/js/common/checkData.js" type="text/javascript" ></script>
	<script>
	    // 判断浏览器版本以提示升级信息
	    if (window.ActiveXObject) {
	        if (navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/)[1] < '9.0') {
	        	$('#header_browser_warning').show();
	        }
	    }
	</script>

<!-- 	<script type="text/javascript">  var _gaq = _gaq || [];  _gaq.push(['_setAccount', 'UA-37564768-1']);  _gaq.push(['_setDomainName', 'keenthemes.com']);  _gaq.push(['_setAllowLinker', true]);  _gaq.push(['_trackPageview']);  (function() {    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;    ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);  })();</script> -->
  
  
  
  
  
  
  
  
  
  
  
    