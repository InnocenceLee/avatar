<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
  <%@ taglib prefix="perm" uri="/mytaglib/permission"%>
 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->

<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->

<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<title>考试列表</title>

	<meta content="" name="description" />
	<meta content="" name="author" />
	<!--强制使用ie的edge兼容模式-->
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge"/>

	<c:import url="common/head.jsp"></c:import> 
	<!-- BEGIN PAGE LEVEL STYLES -->

	<link rel="stylesheet" href="../css/DT_bootstrap.css" />
   	<!--当前页-->
    <link rel="stylesheet" href="../css/common/common.css">
    <!-- 分页 -->
    <link rel="stylesheet" href="../css/common/page.css"/>	
	<!-- END PAGE LEVEL STYLES -->
</head>
    <!-- BEGIN BODY -->
<body class="page-header-fixed" code="exam" sub-code="exam_list">

	<c:import url="common/top.jsp"></c:import> 	
	
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
			<!-- BEGIN SIDEBAR -->
		<c:import url="common/sidebar.jsp"></c:import>
		<!-- BEGIN PAGE CONTAINER-->
		
		
		<!-- -------------------------------从这里开始 ------------------------------------------------------ -->
		<div class="page-content" id="myElPage">
            <!-- BEGIN PAGE HEADER-->
            <div class="row-fluid">
                <div class="span12">
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                    <h3 class="page-title">
                      考试管理 <i class="icon-angle-right"></i> 考试列表
                    </h3>

                    <!-- END PAGE TITLE & BREADCRUMB-->

                </div>

            </div>
                <!-- ---------------------搜索条件------------------------------------------- -->
                <div class="control-group">
                        <span class="myAllCondition">考试名称:</span>
                        <input class="m-wrap mycondition" size="16" type="text" value="" id="searchName"/>
                       <!-- <span>考试类别:</span>
                        <input class="m-wrap mycondition" placeholder="临时" size="16" type="text" value="" id="ui_date_picker_change_year_month"/> -->
                        <button class="btn blue myredbtn1 mysearchbtn1" onclick="search()">搜索</button>
                </div>           

           	<div class="control-group">
           	<perm:checkPerm permissionCode="exam_list.add">
               <button id="basic_opener3" class="btn blue myredbtn1" onclick="window.location.href='examAdd.jsp'">新增考试</button>
            </perm:checkPerm>
           	<perm:checkPerm permissionCode="exam_list.delete">
               <button class="btn red myredbtn1"  data-toggle='modal' data-target='#myDelModal'>删除</button>      
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
                                    <th style="width:8px;"><input type="checkbox" class="checkboxes" value="1" id="allExam" onclick="checkAll('allExam','examCheck')"/></th>
                                    <th>考试名称</th>
                                    <th class="hidden-480">考试分类</th>
                                    <th class="hidden-480">考试时间</th>
                                    <th class="hidden-480">结束时间</th>
                                    <th class="hidden-480">及格分数</th>
                                    <th class="hidden-480">时长</th>
                                    <th class="hidden-480">状态</th>
                                    <th class="hidden-480">应考人数</th>
<!--                                      <th class="hidden-480">缺考人数</th> -->
                                    <th class="hidden-480">及格人数</th>
                                    <th class="hidden-480">平均分</th>
                                    <th class="hidden-480">最高分</th>
                                    <th class="hidden-480">最低分</th>
                                    <th>管理</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody id="examList_tbody">
<!--                                 <tr class="odd gradeX">
                                    <td><input type="checkbox" class="checkboxes" value="1" /></td>
                                    <td>客服部测试试卷</td>
                                    <td class="hidden-480">演示考试</td>
                                    <td class="hidden-480">2014/03/27</td>  
                                    <td class="hidden-480">2014/03/27 </td>   
                                    <td class="hidden-480">60</td>
                                    <td class="hidden-480">120分钟</td>
                                    <td class="hidden-480">未开始</td>     
                                    <td class="hidden-480">90</td> 
                                    <td class="hidden-480">2</td>     
                                    <td class="hidden-480">80</td>
                                    <td class="hidden-480">70</td>
                                    <td class="hidden-480">100</td>     
                                    <td class="hidden-480">65</td>                                                                      
                                    <td class="center hidden-480 mylistSee"><span onclick="viewDetail(this)">详情</span></span></td>
                                    <td class="mylistSee"><span onclick="modify(this)">管理</span></td>
                                </tr> -->
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
                                        
                        </div>
                    </div>
                    <!-- END EXAMPLE TABLE PORTLET-->
                </div>
            </div>
          <!-- 点击查看触发的Modal -->
		    <!-- Modal -->
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
		                    <button onclick="del()" type="button" class="btn btn-primary blue" >确定</button>
		                </div>
		            </div>
		        </div>
		    </div>
       	</div>
        <!-- END PAGE -->
        </div>
    </div>

	<c:import url="common/bottom.jsp"></c:import>
	<!-- 引入共通弹出框 -->
	<c:import url="common/commonAlert.jsp"></c:import> 
		<!-- BEGIN PAGE LEVEL PLUGINS -->
     	
<script type="text/javascript" src="../js/httpclient.js"></script>
	<!--分页-->
	<script src="../js/common/twilight.js" type="text/javascript"></script>
	<script src="../js/common/ui.ajaxpager.js" type="text/javascript"></script>

<script src="../js/exam/examList.js" type="text/javascript"></script>
	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->

	<script src="../js/app.js"></script>
	<script src="../js/common/sidebar.js" type="text/javascript"></script>

			
</body>

<!-- END BODY -->
</html>