var vm = avalon.define({  
    $id: "box",
    type:'分组',
    selectedList:[],//已选择人员
    groups:[],
    AllGroupSelect:false,//全选
    AllDepartmentSelect:false,
    AllNoDepartmentSelect:false,
    AllSelect:false,//已选人员列表中的全选
    noselectedList4group:[],//分组列表中的未选人员
    noselectedList4department:[],//部门列表中的未选人员
    noselectedList4NoDepartment:[],//未入职列表中的未选人员
    selectNodes:[],
    departmentList:[],//部门人员
	departCheakCondition:{},
    init:function(){
    	vm.type='分组';
    	vm.selectedList=[];
    	vm.AllGroupSelect=false;
    	vm.AllDepartmentSelect=false;
    	vm.AllNoDepartmentSelect=false;
    	vm.AllSelect=false;
    	vm.noselectedList4group=[];
    	vm.noselectedList4department=[];
    	vm.selectNodes=[];
    	console.log('窗体初始化成功');
    },
    setType:function(type){
    	vm.type=type;
    },
    loadGroup:function(){
    	$.ajax({
    		isModal : false,
    		type : "get",
    		url : "jv/group/listByBelong.do",
    		dataType : "json",
    		success : function(data) {
    			 var items = typeof data == 'object' ? data : $.parseJSON(data);
    			 vm.groups=items.data;
    			
    		}
    	});
    },
    SetGroupName:function(obj){
    	$http.ajax({
			isModal : false,
			type : "get",
			url : "jv/group/listPersonByGroup.do",
			data : {
				'names' : obj.name
			},
			dataType : "json",
			success : function(data) {
				vm.noselectedList4group.splice(0,vm.noselectedList4group.length);
				data = typeof data == 'object' ? data : $.parseJSON(data);
				for(var i=0;i<data.data.length;i++){
					data.data[i].select=false;
					data.data[i].noselect=false;
					vm.noselectedList4group.push(data.data[i]);		
				}
			}
		});
    },
    GroupChange:function(){
    	for(var i=0;i<vm.noselectedList4group.length;i++){
    		vm.noselectedList4group[i].noselect=vm.AllGroupSelect;
    		console.log(vm.noselectedList4group[i].noselect);
    		
    	}
    },

	downtemplates:function(){
		window.open('/start/filetemplate/学习人员导入模板.xlsx');
	},
	inportlearnPerson:function(){
			$('#form1').ajaxSubmit({
				url : 'jv/learnplan/importLearnStudent.do',
				dataType : 'text',
				success : resutlMsg,
				error : errorMsg
			});
			function resutlMsg(data) {
				var result = JSON.parse(data)
				if (result.success) {
					var arr = result.student.data;
					for(var j = 0; j < vm.selectedList.length;j++){
						for(var i = 0; i < arr.length ;i++){
							if(vm.selectedList[j].username ==arr[i].username ){
								arr.remove(i);	
							}
						}
					}
					for(var i = 0; i < arr.length ;i++){
						arr[i].select=false;
						vm.selectedList.push(arr[i]);
						
					}
					$('#myAddPersionModal').modal('hide');
					
					if(result.un.length == 0){
						alert("导入学习人员成功！");	
					}else{
						alert("导入学习人员成功!部分员工未录入系统,员工号为："+JSON.stringify(result.un))	;
					}
					$("#upfile").val("");
				} else {
					  
					$("#upfile").val("");
				}
			}
			function errorMsg() {
				alert("导入excel出错！");
			}
		
},
    SelectChange:function(){
    	for(var i=0;i<vm.selectedList.length;i++){
    		vm.selectedList[i].select=vm.AllSelect;
    	}    	
    },
    GroupToSelect:function(){
    	for(var i=vm.noselectedList4group.length-1;i>=0;i--){
    		if(vm.noselectedList4group[i].noselect){
    			var exist=false;
    			for(var j=0;j<vm.selectedList.length;j++){
    				if(vm.noselectedList4group[i].id == vm.selectedList[j].id){
    					exist=true;
    					break;
    				}
    			}
    			if(!exist){
    				vm.selectedList.push(vm.noselectedList4group[i]);
    			}
    		}
    	}
    },
    //删除已选人员
    deleteSelect:function(){
    	var tempList  = [];
    	for(var i = 0; i < vm.selectedList.length;i++){
    		tempList.push(vm.selectedList[i]);
    	}
    	for(var i=vm.selectedList.length-1;i>=0;i--){
    		if(vm.selectedList[i].select){
    			tempList.splice(i,1);
    		}
    	}
    	vm.selectedList = tempList;
    },
    loadDepartment:function(){
    	$.ajax({
    		type : "GET",
    		url : "/start/common/node.d2js?_m=listAll",
    		data : null,
    		dataType : "json",
    		success : function(data) {
    			data = typeof data == 'object' ? data : $.parseJSON(data);
    			var obj=new Object();
    	    	obj.core=new Object();
    	    	obj.core.data=new Array();
    	    	obj.plugins=new Array();;
    	    	obj.plugins.push('checkbox');
    	    	var item = createNodeJTreeData(data.rows);
    	    	obj.core.data = item;
    	    	$('#tree').on('changed.jstree.jstree', function (e, data) {
    	    		if(data.selected.length==0){
    	    			data.selected.push(-1);
    	    		}
    	    		vm.selectNodes = data.selected;
    	    		vm.loadDepartmentPerson(data.selected,{});
    	    	}).jstree(obj);
    		}
    	});
    },
    //加载部门人员
    loadDepartmentPerson:function(select,parms){
    	$.ajax({
			isModal : false,
			type : "get",
			url : "jv/group/GetPersonByNodes.do",
			data:{
				'inNodes':vm.getArrayStr(select),
				'employeeNo' : parms.employeeNo,
				'level' : parms.level,
				'cheakusername' : parms.name,
				'cabinCrewInspector' : parms.cabinCrewInspector,
				'no_state':'D',
				'cabinCrew' : parms.cabinCrew,
				'bClassTeacher' : parms.bClassTeacher,
				'longFlightInstructor' : parms.longFlightInstructor,
				'internationalQualificationTraining' : parms.internationalQualificationTraining,
				'threeHundredQualification' : parms.threeHundredQualification,
				'boutique' : parms.boutique,
				'Announcer' : parms.Announcer,
				'Lhasa' : parms.Lhasa,
				'specialCharter' : parms.specialCharter,
				'cadre' : parms.cadre,
				'teacher' : parms.teacher,
				'foreman' : parms.foreman
			},
			dataType : "json",
			success : function(data) {
				vm.noselectedList4department.splice(0,vm.noselectedList4department.length);
				data = typeof data == 'object' ? data : $.parseJSON(data);
				for(var i=0;i<data.length;i++){
					data[i].select=false;
					data[i].noselect=false;
					vm.noselectedList4department.push(data[i]);		
				}
			}
		});
    },
    DepartmentChange:function(){
    	for(var i=0;i<vm.noselectedList4department.length;i++){
    		vm.noselectedList4department[i].noselect=vm.AllDepartmentSelect;    		
    	}
    },
    getArrayStr:function(array){
    	var r='';
    	for(var i=0;i<array.length;i++){
    		if(i==array.length-1){
    			r+=array[i]+'';
    		}else{
    			r+=array[i]+',';
    		}
    	}
    	return r;
    },
    DepartmentToSelect:function(){
    	for(var i=vm.noselectedList4department.length-1;i>=0;i--){
    		if(vm.noselectedList4department[i].noselect){
    			var exist=false;
    			for(var j=0;j<vm.selectedList.length;j++){
    				if(vm.noselectedList4department[i].id == vm.selectedList[j].id){
    					exist=true;
    					break;
    				}
    			}
    			if(!exist){
    				vm.selectedList.push(vm.noselectedList4department[i]);
    			}
    		}
    	}
    },
    loadNoNodePerson:function(name,nodeName){
    	var obj = {
    			'page' : 1,
    			'size' : 9999,
    			'name' : name,
    			'nodeName' : nodeName,
    			'personId' : ''
    		};
    		var strDate = JSON.stringify(obj);
    		$.ajax({
    			isModal : false,
    			type : "get",
    			url : "jv/nonentrymanagement/list.do",
    			data : {
    				'data' : strDate
    			},
    			dataType : "json",
    			success : function(data) {
    				vm.noselectedList4NoDepartment.splice(0,vm.noselectedList4NoDepartment.length);
    				data = typeof data == 'object' ? data : $.parseJSON(data);
    				for(var i=0;i<data.length;i++){
    					data[i].select=false;
    					data[i].noselect=false;
    					vm.noselectedList4NoDepartment.push(data[i]);		
    				}
    			}
    		});
    },
    NoDepartmentChange:function(){
    	for(var i=0;i<vm.noselectedList4NoDepartment.length;i++){
    		vm.noselectedList4NoDepartment[i].noselect=vm.AllNoDepartmentSelect;    		
    	}
    },
    NoDepartmentToSelect:function(){
    	for(var i=vm.noselectedList4NoDepartment.length-1;i>=0;i--){
    		if(vm.noselectedList4NoDepartment[i].noselect){
    			var exist=false;
    			for(var j=0;j<vm.selectedList.length;j++){
    				if(vm.noselectedList4NoDepartment[i].id == vm.selectedList[j].id){
    					exist=true;
    					break;
    				}
    			}
    			if(!exist){
    				vm.selectedList.push(vm.noselectedList4NoDepartment[i]);
    			}
    		}
    	}
    },
    getSelectPerson:function(){
    	return vm.selectedList.$model;
    },
    DeleteGroup:function(obj){
    	$("#delGroup #delId").val(obj.id);
		$('#delGroup').modal('show');
    }
  });
vm.loadDepartment();
vm.loadGroup();
vm.loadNoNodePerson();
function saveGroup(name, persons) {
	$http.ajax({
		isModal : false,
		type : "POST",
		url : "jv/group/add.do",
		data : {
			'name' : name,
			'persons' : persons
		},
		dataType : "json",
		success : function(data) {
			data = typeof data == 'object' ? data : $.parseJSON(data);
			console.log(data);

		}
	});
}

function createNodeJTreeData(data){
	
	var treeData = [];
	for(var i=0;i<data.length;i++){
		var item = data[i];
		if(item!=undefined){
			if(item.parent_id != null/*rid*/){
				var tempData = {};
				if(item.parent_id == 0/*rid*/){
					tempData.id = item.id;
					tempData.text = item.name;
					tempData.parent = item.parent_id;
				}
				else{
					tempData.id = item.id;
					tempData.text = item.name;
					tempData.parent = item.parent_id;
				}
				treeData.push(tempData); 
			}
		}
	}
	treeData[0].parent='#';
	return treeData;	
}
$(function(){
	$("#addPersonBtn_new").click(function(){
		var dataTemp = vm.getSelectPerson();
		addPersonTable(dataTemp,"notifyPerson_table");
		for(var i=0;i<dataTemp.length;i++){
			var exist=false;
			for(var j=0;j<personTempData.length;j++){
				if(personTempData[j].id == dataTemp[i].id){
					exist=true;
					break;
				}
			}
			if(!exist){
				personTempData.push(dataTemp[i]);
			}
		}
		addPersonTable(personTempData,"notifyPerson_table");
		$('#myamModal').modal('hide');
	});	
});


/* 创建table */
function addPersonTable(data, flag) {
	switch (flag) {
	case "notifyPerson_table":
		$("#notifyPerson_table").text("");
		var strTemp = "";
		for (var i = 0; i < data.length; i++) {
			strTemp = strTemp
					+ "<tr class='odd gradeX myodd'><td><input type='checkbox' name='notifyPersonCheck' value='option1' /></td>"
					+'<td style="display:none">'+data[i].id+'</td>'
					+"<td>"+data[i].username+"</td>"
					+ "<td>" + data[i].name + "</td>" + "<td>"
					+ checkUndifend(data[i].nodename) + "</td>" + "<td></td></tr>";
		}
		var tbody = document.getElementById("notifyPerson_table");
		tbody.innerHTML = "";
		tbody.innerHTML += strTemp;
		break;
	}

}


function DepatsearchOk() {

	vm.departCheakCondition.employeeNo = $.trim($("#depart_cheak_employeeNo")
			.val());
	vm.departCheakCondition.level = $.trim($("#depart_cheak_level").val());
	vm.departCheakCondition.name = $.trim($("#depart_cheak_name").val());
	vm.departCheakCondition.cabinCrewInspector = $.trim($(
			"#depart_cheak_cabinCrewInspector").val());
	vm.departCheakCondition.cabinCrew = $.trim($("#depart_cheak_cabinCrew").val());
	vm.departCheakCondition.bClassTeacher = $
			.trim($("#depart_cheak_bClassTeacher").val());
	vm.departCheakCondition.longFlightInstructor = $.trim($(
			"#depart_cheak_longFlightInstructor").val());
	vm.departCheakCondition.internationalQualificationTraining = $.trim($(
			"#depart_cheak_internationalQualificationTraining").val());
	vm.departCheakCondition.threeHundredQualification = $.trim($(
			"#depart_cheak_threeHundredQualification").val());
	vm.departCheakCondition.boutique = $.trim($("#depart_cheak_boutique").val());
	vm.departCheakCondition.Announcer = $.trim($("#depart_cheak_Announcer").val());
	vm.departCheakCondition.Lhasa = $.trim($("#depart_cheak_Lhasa").val());
	vm.departCheakCondition.specialCharter = $.trim($(
			"#depart_cheak_specialCharter").val());
	vm.departCheakCondition.cadre = $.trim($("#depart_cheak_cadre").val());
	vm.departCheakCondition.teacher = $.trim($("#depart_cheak_teacher").val());
	vm.departCheakCondition.foreman = $.trim($("#depart_cheak_foreman").val());
	vm.loadDepartmentPerson(vm.selectNodes,vm.departCheakCondition);
}
function resertsearchOk() {
	vm.departCheakCondition.employeeNo = "";
	$("#depart_cheak_employeeNo").val("");
	vm.departCheakCondition.level = "";
	$("#depart_cheak_level").val("");
	vm.departCheakCondition.name = "";
	$("#depart_cheak_name").val("");
	vm.departCheakCondition.cabinCrewInspector = "";
	$("#depart_cheak_cabinCrewInspector").val("");
	vm.departCheakCondition.cabinCrew = "";
	$("#depart_cheak_cabinCrew").val("");
	vm.departCheakCondition.bClassTeacher = "";
	$("#depart_cheak_bClassTeacher").val("");
	vm.departCheakCondition.longFlightInstructor = "" ;
	$("#depart_cheak_longFlightInstructor").val("");
	vm.departCheakCondition.internationalQualificationTraining = "";
	$("#depart_cheak_internationalQualificationTraining").val("");
	vm.departCheakCondition.threeHundredQualification =""; 
	$("#depart_cheak_threeHundredQualification").val("");
	vm.departCheakCondition.boutique = "";
	$("#depart_cheak_boutique").val("");
	vm.departCheakCondition.Announcer = "";
	$("#depart_cheak_Announcer").val("");
	vm.departCheakCondition.Lhasa = "";
	$("#depart_cheak_Lhasa").val("");
	vm.departCheakCondition.specialCharter = "";
    $("#depart_cheak_specialCharter").val("");
    vm.departCheakCondition.cadre = "";
	$("#depart_cheak_cadre").val("");
	vm.departCheakCondition.teacher = "";
	$("#depart_cheak_teacher").val("");
	vm.departCheakCondition.foreman = "";
   $("#depart_cheak_foreman").val("");
}

function delGroup(){
	var groupId = $("#delGroup #delId").val();
	$http.ajax({
		isModal : false,
		type : "POST",
		url : "jv/group/dels.do",
		data : {
			'ids' : groupId
		},
		dataType : "json",
		success : function(data) {
			data = typeof data == 'object' ? data : $.parseJSON(data);
			vm.loadGroup();
		}
	});
}

function notifyPeople(){
	vm.init()
}
Array.prototype.remove=function(dx) 
{ 
  if(isNaN(dx)||dx>this.length){return false;} 
  for(var i=0,n=0;i<this.length;i++) 
  { 
    if(this[i]!=this[dx]) 
    { 
      this[n++]=this[i] 
    } 
  } 
  this.length-=1 
}
