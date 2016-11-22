<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="utf-8"%>


<div id="myamModal" class="modal hide fade" tabindex="-1" ms-controller="box">
	<input name="baseUrl" type="hidden"
		value="${pageContext.request.contextPath }">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true"></button>
		<h4 class="modal-title" id="myModalLabel3">添加人员</h4>
	</div>
	<div class="mySetUp row-fluid">
		<div class="modal-body">
			<div class="btn-group hidden-phone span12">
				<a href="javascript:;" ms-visible="type=='分组'" class="btn active" ms-click="setType('分组')">分组</a>
				<a href="javascript:;" ms-visible="type!='分组'" class="btn" ms-click="setType('分组')">分组</a>
				<a href="javascript:;" ms-visible="type=='部门'" class="btn" ms-click="setType('部门')">部门</a> 
				<a href="javascript:;" ms-visible="type!='部门'" class="btn" ms-click="setType('部门')">部门</a> 
				<a href="javascript:;" ms-visible="type=='未入职人员'" class="btn" ms-click="setType('未入职人员')">未入职人员</a>
				<a href="javascript:;" ms-visible="type!='未入职人员'" class="btn" ms-click="setType('未入职人员')">未入职人员</a>
			</div>
			<div class="row-fluid">
				<div class="span7">
					<!-- 分组 -->
					<div class="portlet box blue" style="margin: 0px;" ms-visible="type=='分组'">
						<div class="portlet-title">
							<div class="caption">按分组</div>
						</div>
						<div class="portlet-body" style="overflow: auto;">
							<div class="span3">
								<table class="table table-striped table-bordered table-hover">
									<thead>
										<tr>
											<th colspan="2">分组名称</th>
										</tr>
									</thead>
									<tbody id="groupName_tbody">
										<tr style='cursor:pointer'  ms-repeat-obj='groups'>
											<td ms-click="SetGroupName(obj)">{{obj.name}}</td>
											<td style="    text-align: center;" ms-click="DeleteGroup(obj)">
												<i class='icon-trash'></i>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							
							<div class="span9">
								
								<div id="weiruzhi_box">
									<div>
										<p>
											<button class="btn blue mychangebtn1" ms-click="GroupToSelect()">分配</button>
										</p>
										<table class="table table-striped table-bordered table-hover" >
											<thead>
												<tr>
													<th style="width: 8px;">
														<input ms-duplex-checked="AllGroupSelect" type="checkbox" ms-click="GroupChange()"/>
													</th>	
													<th class="hidden-480">员工ID</th>
													<th class="hidden-480">员工姓名</th>
													<th class="hidden-480">所属部门</th>
												</tr>
											</thead>
											<tbody id="group_tbody" >
												<tr ms-repeat-obj="noselectedList4group">
													<td ms-if="obj.noselect" >
														<input checked="checked"  type="checkbox" ms-duplex-checked="obj.noselect">
													</td>
													<td ms-if="!obj.noselect" >
														<input  type="checkbox" ms-duplex-checked="obj.noselect">
													</td>
													<td class="hidden-480">{{obj.username}}</td>
													<td class="hidden-480">{{obj.name}}</td>
													<td class="hidden-480">{{obj.nodename}}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!--按部门-->
					<div class="portlet box blue" style="margin: 0px;" ms-visible="type=='部门'">
						<div class="portlet-title">
							<div class="caption">按部门</div>
						</div>
						<div class="portlet-body" style="overflow: auto;">
							<div class="span5" id="tree" style="overflow: auto;">
								
							</div>
							
							<div class="span7">
								
								<div id="weiruzhi_box">
									<div>
										<p>
											<button class="btn blue myredbtn1" data-toggle="modal" data-target="#cheakCondition" style="margin-left: 0px;">高级过滤</button>
											<button class="btn blue mychangebtn1" ms-click="DepartmentToSelect()">分配</button>
										</p>
										<table class="table table-striped table-bordered table-hover" >
											<thead>
												<tr>
													<th style="width: 8px;">
														<input ms-duplex-checked="AllDepartmentSelect" type="checkbox" ms-click="DepartmentChange()"/>
													</th>
													
													<th style="display: none;"></th>	
													<th class="hidden-480">员工编号</th>
													<th class="hidden-480">员工姓名</th>
													<th class="hidden-480">所属部门</th>
												</tr>
											</thead>
											<tbody id="group_tbody" class="mytbody1" >
												<tr ms-repeat-obj="noselectedList4department">
													<td ms-if="obj.noselect" >
														<input checked="checked"  type="checkbox" ms-duplex-checked="obj.noselect">
													</td>
													<td ms-if="!obj.noselect" >
														<input  type="checkbox" ms-duplex-checked="obj.noselect">
													</td>
													<td class="hidden-480">{{obj.username}}</td>
													<td class="hidden-480">{{obj.name}}</td>
													<td class="hidden-480">{{obj.nodename}}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 未入职人员 -->
					
					<div class="portlet box blue" style="margin: 0px;"  ms-visible="type=='未入职人员'">
						<div class="portlet-title">
							<div class="caption">未入职人员</div>
						</div>
						<div class="portlet-body" style="overflow: auto;">
							<div class="span12">
								
								<div id="weiruzhi_box">
									<div>
										<p>
											<button class="btn blue mychangebtn1" ms-click="NoDepartmentToSelect()">分配</button>
										</p>
										<table class="table table-striped table-bordered table-hover" id="sample_1">
											<thead>
												<tr>
													<th style="width: 8px;">
														<input ms-duplex-checked="AllNoDepartmentSelect" type="checkbox" ms-click="NoDepartmentChange()"/>
													</th>
													<th style="display: none;"></th>	
													<th class="hidden-480">身份证号</th>
													<th class="hidden-480">姓名</th>
													<th class="hidden-480">所属部门</th>
												</tr>
											</thead>
											<tbody id="group_tbody" class="mytbody1">
												<tr ms-repeat-obj="noselectedList4NoDepartment">
													<td ms-if="obj.noselect" >
														<input checked="checked"  type="checkbox" ms-duplex-checked="obj.noselect">
													</td>
													<td ms-if="!obj.noselect" >
														<input  type="checkbox" ms-duplex-checked="obj.noselect">
													</td>
													<td class="hidden-480">{{obj.idCard}}</td>
													<td class="hidden-480">{{obj.name}}</td>
													<td class="hidden-480">{{obj.nodename}}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="span5">
					<div class="portlet box blue" style="margin: 0px;">
						<div class="portlet-title">
							<div class="caption">已选人员</div>
						</div>
						<div class="portlet-body" style="position: relative;">
							<p>
								<button class="btn red mychangebtn2" ms-click="deleteSelect" >删除</button>
								<button class="btn blue mychangebtn2" data-toggle="modal"
					   data-target="#myAddPersionModal" >导入人员</button>
								<button class="btn yellow mychangebtn2" ms-click="downtemplates" >模板下载</button>
							</p>
							<table class="table table-striped table-bordered table-hover" id="sample_1">
								<thead>
									<tr>
										<th style="width: 8px;"><input ms-duplex-checked="AllSelect" type="checkbox" ms-click="SelectChange()"/></th>
										<th class="hidden-480">员工编号</th>
										<th class="hidden-480">员工姓名</th>
										<th class="hidden-480">部门或科室</th>
									</tr>
								</thead>
								<tbody class="mytbody2">
									<tr ms-repeat-obj="selectedList">
										<td ms-if="obj.select" >
											<input checked="checked"  type="checkbox" ms-duplex-checked="obj.select">
										</td>
										<td ms-if="!obj.select" >
											<input  type="checkbox" ms-duplex-checked="obj.select">
										</td>
										<td class="hidden-480">{{obj.username}}</td>
										<td class="hidden-480">{{obj.name}}</td>
										<td class="hidden-480">{{obj.nodename}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="btn">取消</button>
		<button id="addPersonBtn_new" type="button" class="btn blue">确定</button>
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

<div id="myAddPersionModal" class="modal hide fade" tabindex="-1"
						data-width="500" ms-controller="box">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true"></button>
							<h4 class="modal-title" id="myModalLabel3">导入学习人员</h4>
						</div>
						<div class="modal-body">
							<div class="control-group" id="myEagroup1">
								<div class="row-fluid">
									<form method="POST" enctype="multipart/form-data" id="form1">
										<td>学习人员:</td>
										<td><input id="upfile" type="file" name="upfile"></td>
									</form>
								</div>

							</div>

						</div>
						<div class="modal-footer">
							<button type="button" data-dismiss="modal" class="btn">取消</button>
							<button type="button" ms-click="inportlearnPerson" class="btn blue">确定</button>
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
                 <button type="button" class="btn btn-primary myalertbtn" data-dismiss="modal" aria-label="Close">取消</button>
                <button type="button" class="btn btn-primary blue myalertbtn" data-dismiss="modal" onclick="delGroup()">确定</button>
               
            </div>
        </div>
    </div>
</div>