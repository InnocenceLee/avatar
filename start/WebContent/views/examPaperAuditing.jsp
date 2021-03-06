<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->

<!-- BEGIN HEAD -->
<head>
	<title>试卷审核</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->

	<link rel="stylesheet" type="text/css" href="../css/select2_metro.css" />

	<link rel="stylesheet" href="../css/DT_bootstrap.css" />

	<!-- END PAGE LEVEL STYLES -->
 
	<link rel="shortcut icon" href="../image/favicon.ico" />
	<!--当前页-->
    <link rel="stylesheet" href="../css/common/common.css">
     <!-- 分页 -->
    <link rel="stylesheet" href="../css/common/page.css"/>
    <style type="text/css">
    	.audit,.view{
    		color: #2d94ff;
    		text-decoration: none;
    	}
    	#priview{
    	   line-height: 30px;
    	   background-color: #2d94ff;
    	   width: 80px !important;
    	}
    </style>
    </head>
    <!-- BEGIN BODY -->
<body class="page-header-fixed" code="exam_paper" sub-code="exam_paper_auditing">
	<c:import url="common/top.jsp"></c:import> 	
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
			<!-- BEGIN SIDEBAR -->
		<c:import url="common/sidebar.jsp"></c:import>
		<!-- BEGIN PAGE CONTAINER-->
			<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
			<div class="page-content" id="myEpauditingPage">

				<!-- BEGIN PAGE HEADER-->

				<div class="row-fluid">

					<div class="span12">

						<!-- BEGIN PAGE TITLE & BREADCRUMB-->
						<h3 class="page-title">
							试卷管理 <i class="icon-angle-right"></i> 试卷审核
						</h3>

						<!-- END PAGE TITLE & BREADCRUMB-->

					</div>

				</div>	
					<div class="control-group">
                        <span>试卷名称:</span>
                        <input class="m-wrap mycondition" size="16" type="text" value="" id="searchName"/>
                        <button  class="btn blue myredbtn1 mysearchbtn1" onclick="search()">搜索</button>
					</div>			
				<div class="btn-group hidden-phone">
					<a href="javascript:;" class="btn myepbtn" onclick="go('A')" style="background-color:#2d94ff;color:#ffffff;">全部</a>
					<a href="javascript:;" class="btn myepbtn" onclick="go('W')">未审核</a>
					<a href="javascript:;" class="btn myepbtn" onclick="go('P')">已通过</a>
					<a href="javascript:;" class="btn myepbtn" onclick="go('N')">未通过</a>
				</div>

				<!-- END PAGE HEADER-->

				<!-- BEGIN PAGE CONTENT-->

				<div class="row-fluid" id="myEpatable1">

					<div class="span12">

						<!-- BEGIN EXAMPLE TABLE PORTLET-->

						<div class="portlet box light-grey">
							<div class="portlet-body">
								<table class="table table-striped table-bordered table-hover">
									<thead>
										<tr>
											<th style="width:8px;"></th>
											<th>试卷名称</th>
											<th class="hidden-480">考试方式</th>
											<th class="hidden-480">状态信息</th>
											<th >管理</th>
										</tr>
									</thead>

									<tbody class="paper-data">
									
									</tbody>
								</table>
							</div>							
						</div>
					</div>
				</div>
				
				<!-- 点击审核触发的Modal -->
				<div id="responsive" class="modal hide fade" tabindex="-1" data-width="760">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						<h3>审核</h3>
					</div>
					<div class="modal-body">										
							<div class="row-fluid">
					       <p >&#12288;试卷名称：<span id="name">机务安全测试</span></p>
						   <p >考察知识点：<span id="knowledges">线上课程</span></p>
						   <p >&#12288;选题方式：<span id="mode">手动选题</span></p>
						   <p >&#12288;难度系数：<span id="difficulty">难</span></p>
						   <p >&#12288;课程描述：<span id="discribe">关于机场安全的培训课程</span></p>
						   <a class="btn btn-primary btn-lg" id="priview" href="" target="_blank">题目预览</a>
					    </div>	
					    <!--  <div class="row-fluid audit-log">
						     <h5 class="span10">审核记录:</h5>
						     
								 <div class="logs"></div>
						</div>
						-->
						<div class="row-fluid" style="display:none">
						     <h5 class="span10">处理意见：</h5>
						     <select class="small m-wrap span10" id="auditContext" tabindex="1" name="">
                                <option value="处理意见1">同意</option>
                                <option value="处理意见2">不同意</option>
                             </select>  
                             <input type="hidden" name="id">
						</div>
						<div class="row-fluid">
						     <h4 class="span10">审核意见：</h4>
						     <textarea class="large m-wrap myepdtextarea" rows="2" id="auditDesc"></textarea>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" data-dismiss="modal" onclick="audit('J')" class="btn">驳回</button>
						<button type="button" class="btn blue" onclick="audit('A')">通过</button>
					</div>
				</div>
				<!-- <button type="button" id="mysure" class="btn red">删除</button> -->
			
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
	<!--分页-->
	<script src="../js/common/twilight.js" type="text/javascript"></script>
	<script src="../js/common/ui.ajaxpager.js" type="text/javascript"></script>
	<script src="../js/common/sidebar.js" type="text/javascript"></script>

	<script src="../js/app.js"></script>
    <!-- <script src="../js/announcement/toExamine.js"></script> -->
	<!-- <script src="../js/table-managed.js"></script>      -->
<script>

    jQuery(document).ready(function() {
        App.init();
        tableAjax(1,maxVisible,true,"","","paperAuditingList",false);
    });
    
   
    function handle(data){
    	var body = $(".paper-data");
		body.html("");
		var html = null;
		var state = null;
		data = JSON.parse(data).data;
		

		if(data.length <= 0){
			totalNum = 0;
		}
		
		for(var i=0;i<data.length;i++){
			state = data[i].state;
			state = state == 'N' ? '未审核' : (state == 'A' ? '已审核通过' : '已驳回');
			
			html = '<tr class="odd gradeX">'
				+'<td><input type="checkbox" class="checkboxes" value="1" /></td>'
				+'<td><a class="view" href="examPaperDetail.jsp?id='+ data[i].id +'">'+ data[i].name +'</a></td>'
				+'<td class="hidden-480">'+ (data[i].p_type || '' ) +'</td>'
				+'<td class="center hidden-480">'+ state  +'</td>';
				if(data[i].state !='A'){
				   html +='<td class="mycaExamine audit" data-toggle="modal" data-target="#responsive" onclick="load('+ data[i].id +')">';
				   if(data[i].state =='N'){
				   	  html += '审核</td>';
				   }else{
					  html += '重新审核</td>'; 
				   }
				}else{
				   html +='<td>'+ state +'</td>'
				}
				
		    html+='</tr>';
		    body.append(html);
		}
    }
    
    var pageIndex;
    var totalNum = 0;
    //每段的页码数量
    var maxVisible = 20;
    var state = null
    function tableAjax(page,maxVisible,bFlag,name,stateOne,modelName,searchFlag){
    	name = $.trim($("#searchName").val());
    	var obj = {'start':page,'size':maxVisible,'state':state};
    	$http.ajax({
    		isModal : false,
            type: "get",
            url: "jv/examPaper/list.do",
            data: {
            	'name':name,
            	'state':state,
            	'start':page,
            	'size':maxVisible,
            	},
            dataType: "json",
            success: function(data){
//             	console.log(data);
            	handle(data);
            	var numData = JSON.parse(data);
            	totalNum = numData.totalNum;
            	

        		if(numData.data.length <= 0){
        			totalNum = 0;
        		}
            	
                //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
        		 if(searchFlag){
                 	$t.using('tableAjax').reset(totalNum);
                 	$("#page-count").html(totalNum);
                 } else if(bFlag){
            	    /* 分页   */
        	        /*使用方法*/
                    $t.using('tableAjax').init({
    			    	 maxPage:totalNum,
    			    	 name:name,
    			    	 state:state,
    			    	 modelName:modelName,
    			    	 maxVisible:maxVisible
       	 	        }); 
                }
              $("h3").eq(1).trigger('click');  
            }
        });
       
    }
    var myepbtn = $('.myepbtn');
    
    function go(type){
    	switch(type){
    	   case 'A':
    		   state=null;  
    		   myepbtn[0].style.color = "#ffffff";
    		   myepbtn[1].style.color  = "#343941";
    		   myepbtn[2].style.color = "#343941";
    		   myepbtn[3].style.color = "#343941";
    		   myepbtn[0].style.backgroundColor = "#2d94ff";
    		   myepbtn[1].style.backgroundColor = "#ffffff";
    		   myepbtn[2].style.backgroundColor = "#ffffff";
    		   myepbtn[3].style.backgroundColor = "#ffffff";
    		   break;
    	   case 'W':
    		   state='N';
    		   myepbtn[1].style.color = "#ffffff";
    		   myepbtn[0].style.color = "#343941";
    		   myepbtn[2].style.color = "#343941";
    		   myepbtn[3].style.color = "#343941";
    		   myepbtn[1].style.backgroundColor = "#2d94ff";
    		   myepbtn[0].style.backgroundColor = "#ffffff";
    		   myepbtn[2].style.backgroundColor = "#ffffff";
    		   myepbtn[3].style.backgroundColor = "#ffffff";
    		   break;
    	   case 'P':
    		   state='A';
    		   myepbtn[0].style.color = "#343941";
    		   myepbtn[1].style.color  = "#343941";
    		   myepbtn[2].style.color = "#ffffff";
    		   myepbtn[3].style.color = "#343941";
    		   myepbtn[2].style.backgroundColor = "#2d94ff";
    		   myepbtn[0].style.backgroundColor = "#ffffff";
    		   myepbtn[1].style.backgroundColor = "#ffffff";
    		   myepbtn[3].style.backgroundColor = "#ffffff";
    		   break;
    	   case 'N':
    		   state='J';
    		   myepbtn[0].style.color = "#343941";
    		   myepbtn[1].style.color  = "#343941";
    		   myepbtn[2].style.color = "#343941";
    		   myepbtn[3].style.color = "#ffffff";
    		   myepbtn[3].style.backgroundColor = "#2d94ff";
    		   myepbtn[0].style.backgroundColor = "#ffffff";
    		   myepbtn[2].style.backgroundColor = "#ffffff";
    		   myepbtn[1].style.backgroundColor = "#ffffff";
    		   break;
    	}
    	$(this).addClass("active");
    	tableAjax(1,maxVisible,true,"",state,"paperAuditingList",true);
    }
    
    
    function load(id){
    	$.get("jv/examPaper/list.do?id=" + id,function(data){
    		data = JSON.parse(data).data[0];
    		$("#name").text(data.name);
    		$("#knowledges").text(data.knowledgestitle);
    		$("#mode").text(data.mode == 'S' ? '手动添加': (data.mode=='Z' ? '随机生成':'word导入'));
    		$("#difficulty").text(data.difficulty==3?'难':(data.difficulty==2?'中':'易'));
    		$("#discribe").text(data.discribe);
    		$("[name=id]").val(data.id);
    		try{
    			var flag = $(".logs");
    			$(".audit-log").find("p").each(function(){
    				$(this).remove();
    			});
    			var logs = JSON.parse(data.paper_log.value).data;
    			for(var i = 0 ; i < logs.length; i++){
    				var log = logs[i];
    				flag.before($(
    						'<p class="span10 myRecord">'
							 	+'<span>'+ log.date +'</span>'
							 	+'<span>'+ log.person  +'</span>'
							 	+'<span>处理结果：<span>'+ log.comment +'</span></span>'
							 	+'<span>原因：<span>'+ log.comment +'</span></span>'
							 +'</p>'		
    				));
    				console.debug(log)
    			}
    		}catch(e){
    			
    		}
    		
    		$("#priview").attr("href","../views/examPaperDetail.jsp?id=" + id);
    	});
    }
    
    /*搜索*/
    function search(obj) {
    	var searchName = $.trim($("#searchName").val());
    	tableAjax(1,maxVisible,true,searchName,"","paperAuditingList",true);
    }
    
    
    function audit(state){
    	var id = $("[name=id]").val();
    	var logs = $(".audit-log > p");
    	var data = [];
    	for(var i = 0 ; i < logs.length; i++){
    		var log = $(logs[i]);
    		var logDate = log.children(":eq(0)").text();
    		var logPerson = log.children(":eq(1)").text();
    		var logResult = log.children(":eq(2)").find("label").text();
    		var logdesc = log.children(":eq(3)").find("label").text();
    		data.push({
    			person : logPerson, //处理人
    		    date : logDate, //时间
    		    comment:  logdesc ,// 处理意见
    		    result : logResult  // 处理结果
    		});
    	}
    	
    	data.push({
			person : "${user.username}", //处理人
		    date : timeStamp2Str(new Date().getTime()), //时间
		    comment:  $("#auditContext").val() ,// 处理意见
		    result :  $("#auditDesc").val() // 处理结果
		});
    	$.post("jv/examPaper/update.do",{id:id,state:state,auditLog : JSON.stringify({data:data})},function(data){
    		//alert("审核成功");
    		window.location.href="examPaperAuditing.jsp";
    		$("#responsive").modal('hide');
    	});
    	
    }
    
    
</script>
			
</body>

<!-- END BODY -->
</html>