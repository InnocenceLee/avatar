<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="utf-8"%>



<div id="myamModal" class="modal hide fade" tabindex="-1">
	<input name="baseUrl" type="hidden"
		value="${pageContext.request.contextPath }">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true"></button>
		<h4 class="modal-title" id="myModalLabel3">添加人员</h4>
	</div>
	<div class="mySetUp row-fluid">
		<div class="modal-body">
			<div class="myModalBody1" id="myModalBody1">
				<!--                                                                                -->
				<!--   ----------------------------------------------------分组---------------------------------------------------------------------- -->
				<!--                                                                            -->
				<div class="btn-group hidden-phone span12">
					<a href="javascript:;" class="btn active mybtn1"
						onclick="myNotice1()">分组</a> <a href="javascript:;" class="btn"
						onclick="myNotice2()">部门</a> <a href="javascript:;" class="btn"
						onclick="myNotice3()">未入职人员</a> <a href="javascript:;" class="btn"
						onclick="myNotice4()" style="display: none;">高级筛选</a>
				</div>
				<!-- 第一个表格 -->
				<table class="table table-striped table-bordered table-hover span2" id="mysample_1">
					<thead>
						<tr>
							<th style="width: 80%;">分组名称</th>
							<th style="width: 10%;"></th>
						</tr>
					</thead>
					<tbody id="groupName_tbody">
					</tbody>
				</table>
				<!-- 第二个表格 -->
				<div class="portlet box yellow myyellow1 span4">
					<div class="portlet-title">
						<div class="caption">未选人员</div>
					</div>
					<div class="portlet-body">
						<p>
							<button class="btn blue mychangebtn1" id="mychangebtn1">分配</button>
						</p>
						<table class="table table-striped table-bordered table-hover"
							id="sample_1">
							<thead>
								<tr>
									<th style="width: 8px;"><input type="checkbox" value="1"
										id="allGroup" onclick="checkAll('allGroup','groupCheck')" /></th>
									<th style="display: none;"></th>	
									<th class="hidden-480">员工ID</th>
									<th class="hidden-480">员工姓名</th>
									<th class="hidden-480">所属部门</th>
								</tr>
							</thead>
							<tbody id="group_tbody" class="mytbody1">
							</tbody>
						</table>
					</div>
				</div>
				<!-- 第三个表格 -->
			</div>

			<div class="myModalBody2" id="myModalBody2">
				<!--                                                                 -->
				<!--   ------                         -------------部门--------                                            ------------ -->
				<!--                                                                 -->
				<div class="btn-group hidden-phone span12">
					<a href="javascript:;" class="btn mybtn1" onclick="myNotice1()">分组</a>
					<a href="javascript:;" class="btn active" onclick="myNotice2()">部门</a>
					<a href="javascript:;" class="btn" onclick="myNotice3()">未入职人员</a>
					<a href="javascript:;" class="btn" onclick="myNotice4()" style="display: none;">高级筛选</a>
				</div>
				<!-- 第一个表格 -->
				<div class="portlet box yellow myyellow3 span3"
					style="margin: 0 3px 0 10px; max-height: 450px; overflow-y: auto; overflow-x: hidden;">
					<div class="portlet-body span12" id="myTreeBody">
						<div class="container-fluid span12">
							<!--/////////////树///////////////////-->
							<div class="row">
								<ul id="tree" class="ztree"></ul>
							</div>
						</div>
					</div>
				</div>
				<!-- 第二个表格 -->
				<div class="portlet box yellow myyellow1 span4" id="myPbyellow1">
					<div class="portlet-title">
						<div class="caption">未选人员</div>
					</div>
					<div class="portlet-body">
						<p>
							<!-- <button id="mychangebtn7" class="btn blue mychangebtn1">全部分配</button> -->
							<button class="btn blue myredbtn1" data-toggle="modal"
								data-target="#cheakCondition" style="margin-left: 0px;">高级查询</button>
							<button id="mychangebtn3" class="btn blue mychangebtn1">分配</button>

						</p>
						<table class="table table-striped table-bordered table-hover"
							id="sample_1">
							<thead>
								<tr>
									<th style="width: 8px;"><input type="checkbox" value="1"
										id="allNode" onclick="checkAll('allNode','nodePersonCheck')" /></th>
									<th style="display: none;"></th>
									<th class="hidden-480">员工ID</th>
									<th class="hidden-480">员工姓名</th>
									<th class="hidden-480">所属部门</th>
								</tr>
							</thead>
							<tbody id="node_tbody" class="myPbtbody1">

							</tbody>
						</table>
						<div class="container-fluid">
							<div id="ui-pager-2" class="ui-pager">
								<div id="ui-pager-wrap-2" class="ui-pager-wrap">
									<div id="ui-page-num-2" class="ui-page-num">
										<a id="prev-2" class="prev disable">&lt;</a> <a id="next-2"
											href="#" class="next">&gt;</a> 共<em id="page-count-2"
											class="page-count"></em>页，到第 <input id="target-page-text-2"
											class="target-page-text" type="text">页 <a
											id="target-page-btn-2" class="target-page-btn">确定</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="myModalBody3" id="myModalBody3">
				<!--                                                                 -->
				<!--   -----------------------------------------------未入职人员------------------------------------------------------------ -->
				<!--                                                                 -->
				<div class="btn-group hidden-phone span12">
					<a href="javascript:;" class="btn mybtn1" onclick="myNotice1()">分组</a>
					<a href="javascript:;" class="btn" onclick="myNotice2()">部门</a> <a
						href="javascript:;" class="btn active" onclick="myNotice3()">未入职人员</a>
					<a href="javascript:;" class="btn" onclick="myNotice4()"  style="display: none;">高级筛选</a>
				</div>
				<!-- 			      <div class="controls span12" id="myAmacontrols">
					<input class="m-wrap mywrap" size="16" type="text" value="" />
					<button id="mynobt1" class="btn blue mybluebtn1">搜索</button>
				  </div>	 -->
				<!-- 第一个表格 -->
				<div class="portlet box yellow myyellow1 span6"
					style="margin-left: 10px">
					<div class="portlet-title">
						<div class="caption">未选人员</div>
					</div>
					<div class="portlet-body">
						<div class="control-group">
							<!-- <label class="myAllCondition">编号:</label> <input
								class="m-wrap mywrap1" size="16" type="text" value=""
								id="ui_date_picker_id" /> --> <label class="myAllCondition">姓名:</label>
							<input class="m-wrap mywrap1" size="16" type="text" value=""
								id="ui_date_picker_name" />
							<button class="btn blue myredbtn1 mysearchbtn1"
								onclick="search()">搜索</button>
<button id="mychangebtn5" class="btn blue mychangebtn1">分配</button>
						</div>
						<table class="table table-striped table-bordered table-hover"
							id="sample_1">
							<thead>
								<tr>
									<th style="width: 8px;"><input type="checkbox" value="1"
										id="allNoEntry"
										onclick="checkAll('allNoEntry','noEntryCheck')" /></th>
									<th style="display: none;"></th>
									<th class="hidden-480">员工姓名</th>
									<th class="hidden-480">意向部门</th>
								</tr>
							</thead>
							<tbody id="noEntryPerson_table" class="myNotbody1">

							</tbody>
						</table>
					</div>
					<!--////////////////分页//////////////-->
					<div class="container-fluid">
						<div id="ui-pager" class="ui-pager">
							<div id="ui-pager-wrap" class="ui-pager-wrap">
								<div id="ui-page-num" class="ui-page-num">
									<a id="prev" class="prev disable">&lt;</a> <a id="next"
										href="#" class="next">&gt;</a> 共<em id="page-count"
										class="page-count"></em>页，到第 <input id="target-page-text"
										class="target-page-text" type="text">页 <a
										id="target-page-btn" class="target-page-btn">确定</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!--  公共的表格  -->
			<div class="portlet box yellow myyellow2 span5" id="myYellow2"
				style="margin: 0px;">
				<div class="portlet-title">
					<div class="caption">已选人员</div>
				</div>
				<div class="portlet-body" style="position: relative;">
					<div class="control-group">
						<label class="myAllCondition">编号:</label> <input
							class="m-wrap mywrap1" size="16" type="text" value=""
							id="ui_date_picker_id_pub" style="margin-right: 8px;" /> <label class="myAllCondition">姓名:</label>
						<input class="m-wrap mywrap1" size="16" type="text" value=""
							id="ui_date_picker_name_pub" /><br>
<button class="btn red mychangebtn2" id="mychangebtn2" style="position: absolute; right: 11px; top: 10px;">解除</button>
					</div>
					<table class="table table-striped table-bordered table-hover"
						id="sample_1">
						<thead>
							<tr>
								<th style="width: 8px;"></th>
								<th class="hidden-480">员工编号</th>
								<th class="hidden-480">员工姓名</th>
								<th class="hidden-480">部门或科室</th>
							</tr>
						</thead>
						<tbody class="mytbody2" id="myNotbody2">
						</tbody>
					</table>
				</div>

			</div>
			<div class="myModalBody4" id="myModalBody4">
				<!--                                                                 -->
				<!--   -------------------------------------------------------高级筛选---------------------------------------------------------- -->
				<!--                                                                 -->
				<div class="btn-group hidden-phone">
					<a href="javascript:;" class="btn mybtn1" onclick="myNotice1()">分组</a>
					<a href="javascript:;" class="btn" onclick="myNotice2()">部门</a> <a
						href="javascript:;" class="btn" onclick="myNotice3()">未入职人员</a> <a
						href="javascript:;" class="btn active" onclick="myNotice4()"  style="display: none;">高级筛选</a>
				</div>
				<div class="controls row-fluid">
					<button id="myAdvancedBtn1" data-toggle="modal"
						data-target="#importIdModal" class="btn mybtn span3">通过含有人员编号的excel导入</button>
					<button id="myAdvancedBtn2" data-toggle="modal"
						data-target="#importNameModal" class="btn mybtn span3">通过含有人员姓名的excel导入</button>
					<button id="myAdvancedBtn3" data-toggle="modal"
						data-target="#idsSearchModal" class="btn mybtn span3">通过编号模糊查找</button>
					<button id="myAdvancedBtn4" data-toggle="modal"
						data-target="#namesSearchModal" class="btn mybtn span3">通过名称模糊查找</button>
				</div>
				<table
					class="table table-striped table-bordered table-hover mytable">
					<thead>
						<tr>
							<th style="width: 8px;"></th>
							<th class="hidden-480">员工ID</th>
							<th class="hidden-480">员工姓名</th>
							<th class="hidden-480">所属部门</th>
							<th class="hidden-480">操作</th>
						</tr>
					</thead>
					<tbody id="senior_table">

					</tbody>
				</table>

			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="btn">取消</button>
		<button id="addPersonBtn" type="button" class="btn blue">确定</button>
	</div>
</div>
<div id="cheakCondition" class="modal hide fade" tabindex="-1"
	data-width="860">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true"></button>
		<h4 class="modal-title" id="myModalLabel3">查询条件</h4>
	</div>
	
	<div class="modal-body">
		<div class="control-group" id="myEagroup1">
			<div>
				<label class="myAllCondition">员工 编号:</label> 
				<input class="m-wrap mywrap1 span1" size="16" type="text" value="" id="depart_cheak_employeeNo" /> 
				<label class="myAllCondition">姓名:</label> 
				<input class="m-wrap mywrap1 span1" size="16" type="text" value="" id="depart_cheak_name" /> 
				<label class="myAllCondition">拉 萨 :</label> 
				<select class="small m-wrap mycondition" tabindex="1"
					id="depart_cheak_Lhasa" style="margin-left: 0px;">
					<option value=""></option>
					<option value="具备">具备</option>
					<option value="不具备">不具备</option>
				</select> 
				<label class="myAllCondition">班组长:</label> 
				<select
					class="small m-wrap mycondition" tabindex="1"
					id="depart_cheak_foreman" style="margin-left: 0px;">
					<option value=""></option>
					<option value="具备">具备</option>
					<option value="不具备">不具备</option>
				</select>
			</div>
			<div>
				<label class="myAllCondition">330资格:</label> 
				<select
					class="small m-wrap mycondition" tabindex="1"
					id="depart_cheak_threeHundredQualification"
					style="margin-left: 0px;">
					<option value=""></option>
					<option value="具备">具备</option>
					<option value="不具备">不具备</option>
				</select> 
				<label class="myAllCondition">客 舱 乘 务 检 查 员 :</label> 
				<select
					class="small m-wrap mycondition" tabindex="1"
					style="margin-left: 0px;" id="depart_cheak_cabinCrewInspector">
					<option value=""></option>
					<option value="具备">具备</option>
					<option value="不具备">不具备</option>
				</select> 
				<label class="myAllCondition">精品:</label> 
				<select
					class="small m-wrap mycondition" tabindex="1"
					style="margin-left: 0px;" id="depart_cheak_boutique">
					<option value=""></option>
					<option value="具备">具备</option>
					<option value="不具备">不具备</option>
				</select>
			</div>
			<div>
				<label class="myAllCondition">B类教员:</label> 
				<select
					class="small m-wrap mycondition" tabindex="1"
					id="depart_cheak_bClassTeacher" style="margin-left: 0px;">
					<option value=""></option>
					<option value="具备">具备</option>
					<option value="不具备">不具备</option>
				</select> 
				<label class="myAllCondition">国 际 线 资 格 培 训 :</label> 
				<select
					class="small m-wrap mycondition" tabindex="1"
					style="margin-left: 0px;"
					id="depart_cheak_internationalQualificationTraining">
					<option value=""></option>
					<option value="具备">具备</option>
					<option value="不具备">不具备</option>
				</select> 
				<label class="myAllCondition">等级:</label> 
				<select
					class="small m-wrap mycondition" tabindex="1"
					style="margin-left: 0px;" id="depart_cheak_level">
					<option value=""></option>
					<option value="乘务员">乘务员</option>
					<option value="头等舱">头等舱</option>
					<option value="乘务长">乘务长</option>
					<option value="主任乘务长">主任乘务长</option>
				</select>
			</div>
			<div>
				<label class="myAllCondition">广 播 员:</label> 
				<select
					class="small m-wrap mycondition" tabindex="1"
					id="depart_cheak_Announcer" style="margin-left: 0px;">
					<option value=""></option>
					<option value="具备">具备</option>
					<option value="不具备">不具备</option>
				</select> 
				<label class="myAllCondition"> 客 舱 乘 务 教员&nbsp&nbsp&nbsp&nbsp:</label> 
				<select class="small m-wrap mycondition"
					tabindex="1" style="margin-left: 0px;" id="depart_cheak_cabinCrew">
					<option value=""></option>
					<option value="具备">具备</option>
					<option value="不具备">不具备</option>
				</select> 
				<label class="myAllCondition">干部:</label> 
				<select
					class="small m-wrap mycondition" tabindex="1"
					style="margin-left: 0px;" id="depart_cheak_cadre">
					<option value=""></option>
					<option value="具备">具备</option>
					<option value="不具备">不具备</option>
				</select>
			</div>
			<div>
				<label class="myAllCondition">专 包 机:</label> 
				<select
					class="small m-wrap mycondition" tabindex="1"
					id="depart_cheak_specialCharter" style="margin-left: 0px;">
					<option value=""></option>
					<option value="具备">具备</option>
					<option value="不具备">不具备</option>
				</select> <label class="myAllCondition">晋级乘务长带飞教员:</label> 
				<select
					class="small m-wrap mycondition" tabindex="1"
					style="margin-left: 0px;" id="depart_cheak_longFlightInstructor">
					<option value=""></option>
					<option value="具备">具备</option>
					<option value="不具备">不具备</option>
				</select> <label class="myAllCondition">教员:</label> 
				<select
					class="small m-wrap mycondition" tabindex="1"
					style="margin-left: 0px;" id="depart_cheak_teacher">
					<option value=""></option>
					<option value="具备">具备</option>
					<option value="不具备">不具备</option>
				</select>
			</div>

		</div>

	</div>

	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="btn">取消</button>
		<button type="button" onclick="resertsearchOk()" class="btn blue">重置</button>
		<button type="button" onclick="DepatsearchOk()" class="btn blue">确定</button>
	</div>
</div>
<!--  导入窗口 -->
<div id="importIdModal" class="modal hide fade" tabindex="-1"
	data-width="560" style="width: 500px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true"></button>
		<h4 class="modal-title" id="myModalLabel3">编号导入</h4>
	</div>
	<form id="idUpload" action="jv/nonentrymanagement/exportUserById.do"
		method="post" enctype="multipart/form-data">
		<div class="modal-body">
			<!-- <span>选择文件：</span> -->
			<!-- <input disabled='disabled' id="coursewareFilename" class="m-wrap hasDatepicker Bomb-box" size="16" type="text" value="">
							<input class="fileupload-new myfile" value= " 选择模板"> -->
			<input name="file" type="file"><br>
		</div>
		<div class="modal-footer">
			<span style="margin-right: 50px" class="Bomb-box"></span>
			<button type="button" data-dismiss="modal" class="btn">取消</button>
			<button type="button" class="btn blue" onclick="uploadfile('id')">保存</button>
		</div>
	</form>
</div>


<!--  名字导入窗口 -->
<div id="importNameModal" class="modal hide fade" tabindex="-1"
	data-width="760" style="width: 700px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true"></button>
		<h4 class="modal-title" id="myModalLabel3">姓名导入</h4>
	</div>
	<form id="nameUpload"
		action="jv/nonentrymanagement/exportUserByName.do" method="post"
		enctype="multipart/form-data">
		<div class="modal-body">
			<input name="file" type="file"><br>
		</div>
		<div class="modal-footer">
			<span style="margin-right: 50px" class="Bomb-box"></span>
			<button type="button" data-dismiss="modal" class="btn">取消</button>
			<button type="button" class="btn blue" onclick="uploadfile('name')">保存</button>
		</div>
	</form>
</div>

<!--  编号输入搜索窗口 -->
<div id="idsSearchModal" class="modal hide fade" tabindex="-1"
	data-width="760" style="width: 700px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true"></button>
		<h4 class="modal-title" id="myModalLabel3">编号搜索</h4>
	</div>
	<div class="modal-body">
		<div class="control-group">
			<label class="control-label">人员编号：</label>
			<div class="controls mycontrols">
				<input id="personIds" type="text" placeholder="1,2,3,4"
					class="m-wrap medium">
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<span style="margin-right: 50px" class="Bomb-box"></span>
		<button type="button" data-dismiss="modal" class="btn">取消</button>
		<button type="button" class="btn blue" onclick="batchIdsSearch()">搜索</button>
	</div>
</div>

<!--  名字输入搜索窗口 -->
<div id="namesSearchModal" class="modal hide fade" tabindex="-1"
	data-width="760" style="width: 700px;">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true"></button>
		<h4 class="modal-title" id="myModalLabel3">名字搜索</h4>
	</div>
	<div class="modal-body">
		<div class="control-group">
			<label class="control-label">人员姓名：</label>
			<div class="controls mycontrols">
				<input id="personNames" type="text" placeholder="张三,李四"
					class="m-wrap medium">
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<span style="margin-right: 50px" class="Bomb-box"></span>
		<button type="button" data-dismiss="modal" class="btn">取消</button>
		<button type="button" class="btn blue" onclick="batchNamesSearch()">搜索</button>
	</div>
</div>


<div class="modal fade" id="delGroup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
                <h4 class="modal-title" id="myModalLabelTitle">提示</h4>
            </div>
            <div class="modal-body">
                <p id="errMsg">
                  	你确定要删除该分组吗？
                </p>
                <p>
		            <input class="hidden" id="delId" type="hidden" disable="disable" />
                </p>
   				
            </div>
            <div class="modal-footer">
                <span style=" margin-right:50px"></span>
                <!-- btn-default -->
                <button type="button" class="btn btn-primary blue myalertbtn" data-dismiss="modal" onclick="del()">确定</button>
                <button type="button" class="btn btn-primary blue myalertbtn" data-dismiss="modal" aria-label="Close">取消</button>
            </div>
        </div>
    </div>
</div>


