////////////////////////////////////////////////////
///////////////////////引用此模块的 列表  ID必须交  notifyPerson_table       
/////////////////////////////////////////////////
//modify by lyh 20160718
var addPersonPageIndex;
var addPersonTotleNum = 0;
// 每段的页码数量
var addPersonMaxVisible = 5;
var nodeMaxVisible = 10;

var baseUrl = null;
$(function() {
	baseUrl = $("[name=baseUrl]").val();
});
// 课程对象总
var receiver = [];

var nodeId;
var activeTab = {
	name : 'group',
	table : '.mytbody1'
};

// 树
var zTree;
var demoIframe;
var zNodes;

var myModalBody1 = document.getElementById("myModalBody1");
var myModalBody2 = document.getElementById("myModalBody2");
var myModalBody3 = document.getElementById("myModalBody3");
var myModalBody4 = document.getElementById("myModalBody4");
// 部门搜索
var departCheakCondition = {
	employeeNo : "",
	level : "",
	name : "",
	cabinCrewInspector : "",
	cabinCrew : "",
	bClassTeacher : "",
	longFlightInstructor : "",
	internationalQualificationTraining : "",
	threeHundredQualification : "",
	boutique : "",
	Announcer : "",
	Lhasa : "",
	specialCharter : "",
	cadre : "",
	teacher : "",
	foreman : ""
};

var myyellow2 = document.getElementById("myYellow2");
function myNotice1() {
	activeTab = {
		name : 'group',
		table : '.mytbody1'
	};
	myModalBody1.style.display = "block";
	myModalBody2.style.display = "none";
	myModalBody3.style.display = "none";
	myModalBody4.style.display = "none";
	myyellow2.style.display = "block";
	/* myyellow2.style.left="940px"; */
	groupNameTableAjax(1, addPersonMaxVisible, true, "groupName");
}
function myNotice2() {
	activeTab = {
		name : 'dept',
		table : '.myPbtbody1'
	};
	myModalBody1.style.display = "none";
	myModalBody2.style.display = "block";
	myModalBody3.style.display = "none";
	myModalBody4.style.display = "none";
	myyellow2.style.display = "block";
	/* myyellow2.style.left="980px"; */
	xmlAjax();

}
function myNotice3() {
	activeTab = {
		name : 'not',
		table : '.myNotbody1'
	};
	myModalBody1.style.display = "none";
	myModalBody2.style.display = "none";
	myModalBody3.style.display = "block";
	myModalBody4.style.display = "none";
	myyellow2.style.display = "block";
	/*
	 * myyellow2.style.left="930px"; myyellow2.style.top="175px";
	 */

	noEntryPersontableAjax(1, addPersonMaxVisible, true, "", "", null,
			"noEntryPerson", false)
}
function myNotice4() {
	activeTab = {
		name : 'highlevel'
	};
	myModalBody1.style.display = "none";
	myModalBody2.style.display = "none";
	myModalBody3.style.display = "none";
	myModalBody4.style.display = "block";
	myyellow2.style.display = "none";

	$("#myNotbody2").text("");
}

/*
 * var checkboxes=document.getElementsByClassName("checkboxes")[4];
 * alert(checkboxes.parent);
 */
$(function() {
	$("#mychangebtn1").click(function() {
		$(".mytbody1 input:checked").parents(".myodd").appendTo(".mytbody2");
	});
	$("#mychangebtn2").click(
			function() {
				console.log("============"+activeTab.table);
				$(".mytbody2 input:checked").parents(".myodd").appendTo(
						activeTab.table);
			});
});

$(function() {
	$("#mychangebtn7").click(function() {
		addMyNotbody2(nodeId);
	});
	$("#mychangebtn3").click(function() {
		$(".myPbtbody1 input:checked").parents(".myodd").appendTo(".mytbody2");
		getAddPersonTableData("1");
	});
});

$(function() {
	$("#mychangebtn5").click(
			function() {
				$(".myNotbody1 input:checked ").parents(".myodd").appendTo(
						".mytbody2");
			});
});
var myamModal = document.getElementById("myamModal");
// console.log(myamModal.width);

/**
 * Created by Administrator on 2016/7/11.
 */

// 上传主程序
function uploadfile(id) {
	var form;
	if ("name" == id) {
		// alert("1");
		form = $("#nameUpload");
	} else {
		// alert("2");
		form = $("#idUpload");
	}

	form.ajaxSubmit({
		type : 'post',
		dataType : "json",
		success : function(data) {
			// alert( "success");
			console.log(data);
			data = JSON.parse(data);
			addPersonTable(data, "senior_table");
			if ("name" == id) {
				$('#importNameModal').modal('hide');
			} else {
				$('#importIdModal').modal('hide');
			}

		},
		error : function(XmlHttpRequest, textStatus, errorThrown) {
			// alert( "error");
		}
	});

}

function batchIdsSearch() {
	var personIds = $.trim($("#personIds").val());

	console.log("batchIdsSearch参数： " + personIds);
	$http.ajax({
		isModal : false,
		type : "get",
		url : "jv/nonentrymanagement/exportUserByIdString.do",
		data : {
			'data' : personIds
		},
		dataType : "json",
		success : function(data) {
			console.log(data);
			data = JSON.parse(data);
			addPersonTable(data, "senior_table");
			// 判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
			$('#idsSearchModal').modal('hide');
		}
	});

}

function batchNamesSearch() {
	var personNames = $.trim($("#personNames").val());

	console.log("batchIdsSearch参数： " + personNames);
	$http.ajax({
		isModal : false,
		type : "get",
		url : "jv/nonentrymanagement/exportUserByNameString.do",
		data : {
			'data' : personNames
		},
		dataType : "json",
		success : function(data) {
			console.log(data);
			data = JSON.parse(data);
			addPersonTable(data, "senior_table");
			// 判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
			$('#namesSearchModal').modal('hide');

		}
	});

}

function cleanCheck() {

	var collid = document.getElementsByName('all');
	var coll = document.getElementsByName('preCheck');
	collid.checked = false;
	console.log(collid);

	for (var i = 0; i < coll.length; i++) {
		coll[i].checked = false;
	}
}

/* 创建table */
function addPersonTable(data, flag) {
	switch (flag) {
	case "groupName_tbody":
		
		$("#groupName_tbody").text("");
		var strTemp = "";
		for (var i = 0; i < data.data.length; i++) {
			strTemp = strTemp
					+ "<tr style='cursor:pointer' class='odd gradeX myodd'>"
					+ 	'<td onclick="groupPerson(this,true,\''+data.data[i].name+'\')">'
					+ 		checkUndifend(data.data[i].name)
					+ 	"</td>"
					+ "<td><i class='icon-remove-circle' onclick='showConfirmBox("+ data.data[i].id +")'></i></td></tr>";

		}
		var tbody = document.getElementById("groupName_tbody");
		tbody.innerHTML = "";
		tbody.innerHTML += strTemp;
		console.log(strTemp);
		break;

	case "group_tbody"://分组人员列表
		
		$("#group_tbody").text("");
		var strTemp = "";
		for (var i = 0; i < data.data.length; i++) {
			strTemp = strTemp
					+ "<tr  class='odd gradeX myodd'><td><input type='checkbox' class='checkboxes' name='groupCheck'/> </td>"
					+ "<td style='display:none;'>"+data.data[i].id+"</td>"
					+ "<td>"+data.data[i].username+"</td>" + "<td>"
					+ checkUndifend(data.data[i].name) + "</td>" + "<td>"
					+ checkUndifend(data.data[i].nodename) + "</td></tr>";
		}
		var tbody = document.getElementById("group_tbody");
		tbody.innerHTML = "";
		tbody.innerHTML += strTemp;

		break;

	case "noEntryPerson_table":
		$("#noEntryPerson_table").text("");
		var strTemp = "";
		for (var i = 0; i < data.length; i++) {
			strTemp = strTemp
					+ "<tr  class='odd gradeX myodd'><td><input type='checkbox' class='checkboxes' name='noEntryCheck'/> </td>"
					+ "<td style='display:none'>"+data[i].id+"</td>"
					+ "<td>"
					+ checkUndifend(data[i].name) + "</td>" + "<td>"+checkUndifend(data[i].intentDepatment)+"</td></tr>";
		}
		var tbody = document.getElementById("noEntryPerson_table");
		tbody.innerHTML = "";
		tbody.innerHTML += strTemp;

		break;

	case "notifyPerson_table":
		$("#notifyPerson_table").text("");
		var strTemp = "";
		for (var i = 0; i < data.length; i++) {
			strTemp = strTemp
					+ "<tr class='odd gradeX myodd'><td><input type='checkbox' name='notifyPersonCheck' value='option1' /></td>"
					+"<td>"+data[i].id+"</td>"
					+ "<td>" + data[i].name + "</td>" + "<td>"
					+ checkUndifend(data[i].node) + "</td>" + "<td></td></tr>";
		}
		var tbody = document.getElementById("notifyPerson_table");
		tbody.innerHTML = "";
		tbody.innerHTML += strTemp;
		break;

	case "node_tbody":
		$("#node_tbody").text("");
		var strTemp = "";
		for (var i = 0; i < data.length; i++) {
			strTemp = strTemp
					+ "<tr class='odd gradeX myodd'><td><input type='checkbox' class='checkboxes' name='nodePersonCheck' /></td>"
					+ "<td style='display:none;'>"+data[i].person_id+"</td>"
					+"<td>" + data[i].employee_no + "</td>" + "<td>"
					+ checkUndifend(data[i].name) + "</td>" + "<td>"
					+ checkUndifend(data[i].node_names) + "</td></tr>";
		}
		var tbody = document.getElementById("node_tbody");
		tbody.innerHTML = "";
		tbody.innerHTML += strTemp;
		break;

	case "senior_table":

		$("#senior_table").text("");
		var strTemp = "";
		for (var i = 0; i < data.data.length; i++) {
			strTemp = strTemp
					+ "<tr  class='odd gradeX myodd'>"
					+ "<td><input type='checkbox' class='checkboxes' name='SeniorCheck'/> </td>"
					+ "<td>"
					+ data.data[i].id
					+ "</td>"
					+ "<td>"
					+ checkUndifend(data.data[i].name)
					+ "</td>"
					+ "<td>"
					+ checkUndifend(data.data[i].nodename)
					+ "</td>"
					+ "<td class='hidden-480 myDeletetd' onclick='delSenior(this)'>删除</td>"
					+ "</tr>";
		}
		var tbody = document.getElementById("senior_table");
		tbody.innerHTML = "";
		tbody.innerHTML += strTemp;

		break;

	case "myNotbody2":
		var strTemp = "";
		for (var i = 0; i < data.length; i++) {
			strTemp = strTemp
					+ "<tr class='odd gradeX myodd'><td><input type='checkbox' class='checkboxes' name=myNotbody2Check' checked='checked'/></td>"
					+ "<td>" + data[i].id + "</td>" + "<td>"
					+ checkUndifend(data[i].name) + "</td>" + "<td>"
					+ checkUndifend(data[i].node) + "</td></tr>";
		}
		var tbody = document.getElementById("myNotbody2");
		tbody.innerHTML;
		tbody.innerHTML += strTemp;
		break;

	}

}

// 转换数据
function readAddPersonData(data) {
	var Data = [];
	if (data.length <= 0) {
		addPersonTotleNum = 0;
	}

	for (var i = 0; i < data.length; i++) {
		var item = data[i];
		if (item != undefined) {

			if (item.totleNum != undefined/* rid */) {
				addPersonTotleNum = item.totleNum;

			}

			var tempData = {};
			tempData.node = item.node;
			tempData.trainType = item.trainType;
			tempData.name = item.name;
			tempData.id = item.id;
			tempData.intentDepatment=item.intentdepatment;
			tempData.state = item.state;
			tempData.createdate = getLocalTime(item.createdate);

			switch (item.trainType) {
			case "S":
				tempData.trainTypeName = "标准课件";
				break;
			case "M":
				tempData.trainTypeName = "通知课件";
				break;
			default:
				break;
			}

			switch (item.state) {
			case "N":
				tempData.stateName = "未审核";
				break;
			case "A":
				tempData.stateName = "已审核";
				break;
			case "J":
				tempData.stateName = "拒绝";
				break;
			case "R":
				tempData.stateName = "使用中";
				break;
			case "D":
				tempData.stateName = "已下架";
				break;
			default:
				break;
			}
			Data.push(tempData);
		}
	}
	/*
	 * console.log("输出data"); console.log(JSON.stringify(Data));
	 * console.log("end");
	 */
	return Data;
}

/* 搜索 */
function search(obj) {
	var searchId = $.trim($("#ui_date_picker_id").val());
	var searchName = $.trim($("#ui_date_picker_name").val());
	/*
	 * if((searchName == "") && (searchNode == "")&& (searchState == "")){
	 * alert("请填写搜索条件"); return false; }
	 */

	noEntryPersontableAjax(1, addPersonMaxVisible, true, searchName, null,
			searchId, "noEntryPerson", true);
}

/* 未入职人员Ajax */
function noEntryPersontableAjax(page, addPersonMaxVisible, bFlag, name,
		nodeName, personId, modelName, searchFlag) {

	var obj = {
		'page' : page,
		'size' : addPersonMaxVisible,
		'name' : name,
		'nodeName' : nodeName,
		'personId' : personId
	};
	var strDate = JSON.stringify(obj);
	// console.log("tableAjax参数： "+strDate);
	$http.ajax({
		isModal : false,
		type : "get",
		url : "jv/nonentrymanagement/list.do",
		data : {
			'data' : strDate
		},
		dataType : "json",
		success : function(data) {
			console.log(data);
			data = JSON.parse(data);
			tableData = readAddPersonData(data);
			addPersonTable(tableData, "noEntryPerson_table");
			// 判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
			if (searchFlag) {
				$t.using('tableAjax').reset(addPersonTotleNum);
			} else if (bFlag) {
				// UIGeneral.init(page,totleNum,maxVisible,modelName);

				/* 分页 */
				/* 使用方法 */
				$t.using('tableAjax').init({
					maxPage : addPersonTotleNum,
					modelName : modelName,
					name : name,
					nodeName : nodeName,
					personId : personId,
					maxVisible : addPersonMaxVisible

				});

			}

		}
	});

}

/* 分组列表Ajax */
function groupNameTableAjax(page, addPersonMaxVisible, bFlag, modelName) {

	$http.ajax({
		isModal : false,
		type : "get",
		url : "jv/group/listByBelong.do",
		dataType : "json",
		success : function(data) {
			console.log(data);
			data = JSON.parse(data);
			addPersonTable(data, "groupName_tbody");

		}
	});

}

// 获取当前列表中的数据
function getAddPersonTableData() {

	var tableDataTemp = [];

	var dataTemp = document.getElementById('myNotbody2').children;
	console.log(dataTemp);
	if (dataTemp.length > 0) {
		for (var i = 0; i < dataTemp.length; i++) {
			var selectedTr = dataTemp[i];
			if (selectedTr != null) {
				var tempData = {};

				tempData.id = selectedTr.cells[1].innerText;
				tempData.employee_no = selectedTr.cells[2].innerText;
				tempData.name = selectedTr.cells[3].innerText;
				tempData.nodeName = selectedTr.cells[4].innerText;

				tableDataTemp.push(tempData);
			}

			else {
				alert("请选择一行");
			}
		}
	} else {
		dataTemp = document.getElementById('senior_table').children;

		for (var i = 0; i < dataTemp.length; i++) {
			var selectedTr = dataTemp[i];
			if (selectedTr != null) {
				var tempData = {};

				tempData.id = selectedTr.cells[1].innerText;
				tempData.name = selectedTr.cells[2].innerText;
				tempData.nodeName = selectedTr.cells[3].innerText;

				tableDataTemp.push(tempData);
			}

			else {
				alert("请选择一行");
			}
		}
	}

	/*
	 * console.log("输出tableDataTemp");
	 * console.log(JSON.stringify(tableDataTemp)); console.log("end");
	 */
	return tableDataTemp;
}

$(function() {
	// 清除弹框内容
	$(".clean-data").click(function() {
		$(".Bomb-box").html("");
		$(".Bomb-box").val("");
		$("#lessonDragFlag").prop("checked", false);
	})

	/*
	 * // 添加 $("#addPersonBtn").click(function(){
	 * 
	 * var dataTemp = getAddPersonTableData(); console.log(dataTemp);
	 * 
	 * 
	 * addPersonTable(dataTem,"notifyPerson_table");
	 * 
	 * $('#myamModal').modal('hide'); })
	 */

});

// /查询分组人员
function groupPerson(obj, bFlag,groupName) {

	selectedTr = obj.parentNode;
	// console.log(selectedTr);
	if (selectedTr != null) {
		var name = groupName;

		var strDate = JSON.stringify(obj);
		console.log("groupTableAjax参数： " + name);
		$http.ajax({
			isModal : false,
			type : "get",
			url : "jv/group/listPersonByGroup.do",
			data : {
				'names' : name
			},
			dataType : "json",
			success : function(data) {
				console.log(data);
				data = JSON.parse(data);
				addPersonTable(data, "group_tbody");
				addPersonTotleNum = data.totalCount;
			}
		});

	} else {
		alert("请选择一行");
	}
}



/* 删除分组 */
function del() {
	var id = $("#delGroup #delId").val();
	
	if(!id) {
		showMsg("删除失败!");
		return;
	}
	
	console.log("del参数： " + id);
	$http.ajax({
		isModal : false,
		type : "POST",
		url : "jv/group/dels.do",
		data : {
			'ids' : id
		},
		dataType : "json",
		success : function(data) {
			console.log(data);
			data = JSON.parse(data);
			groupNameTableAjax(1, maxVisible, true, "groupName");

		}
	});
}

function showConfirmBox(id){
	$("#delGroup #delId").val(id);
	$('#delGroup').modal('show');
}

/* baocun分组 */
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
			console.log(data);

		}
	});
}

// //////////////////////////////////树

// /查询部门人员
function nodePerson(page, id, maxVisible, bFlag) {

	// var obj = {'start':page,'limit':maxVisible};
	// var strDate = JSON.stringify(obj);
	console.log("nodePerson参数： " + id);
	var params = {
		'node' : id,
		'_page' : {
			'start' : page * maxVisible,
			'limit' : maxVisible
		},
		'employeeNo' : departCheakCondition.employeeNo,
		'level' : departCheakCondition.level,
		'cheakusername' : departCheakCondition.name,
		'cabinCrewInspector' : departCheakCondition.cabinCrewInspector,
		'no_state':'D',
		'cabinCrew' : departCheakCondition.cabinCrew,
		'bClassTeacher' : departCheakCondition.bClassTeacher,
		'longFlightInstructor' : departCheakCondition.longFlightInstructor,
		'internationalQualificationTraining' : departCheakCondition.internationalQualificationTraining,
		'threeHundredQualification' : departCheakCondition.threeHundredQualification,
		'boutique' : departCheakCondition.boutique,
		'Announcer' : departCheakCondition.Announcer,
		'Lhasa' : departCheakCondition.Lhasa,
		'specialCharter' : departCheakCondition.specialCharter,
		'cadre' : departCheakCondition.cadre,
		'teacher' : departCheakCondition.teacher,
		'foreman' : departCheakCondition.foreman
	};
	$.ajax({
		isModal : false,
		type : "get",
		url : baseUrl + "/entity/employee.d2js",
		data : {
			'_m' : "fetch",
			'params' : JSON.stringify(params)
		},
		dataType : "json",
		success : function(data) {
			console.log(data.rows);
			// data = JSON.parse(data);
			addPersonTable(data.rows, "node_tbody");

			// addPersonTotleNum = data.totalCount;
			// 判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
			if (bFlag) {
				// UIGeneral.init(page,totleNum,maxVisible,modelName);
				var maxPage = Math.ceil(data.total / maxVisible);
				// 分页
				// 使用方法
				$t.using('table2Ajax').init({
					maxPage : maxPage,
					id : id,
					page : page,
					modelName : "nodePersonAjax",
					maxVisible : maxVisible
				});

			}
			$('#cheakCondition').modal('hide');
			$("#DepatsearchConditionvalue").val("");
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("查询失败！");
		}
	});

}


///查询部门人员
function nodePersonTypecheak(page, id, maxVisible, bFlag) {

	// var obj = {'start':page,'limit':maxVisible};
	// var strDate = JSON.stringify(obj);
	console.log("nodePerson参数： " + id);
	var params = {
		'node' : id,
		'_page' : {
			'start' : page * maxVisible,
			'limit' : maxVisible
		},
		'employeeNo' : departCheakCondition.employeeNo,
		'level' : departCheakCondition.level,
		'cheakusername' : departCheakCondition.name,
		'cabinCrewInspector' : departCheakCondition.cabinCrewInspector,
		'cabinCrew' : departCheakCondition.cabinCrew,
		'bClassTeacher' : departCheakCondition.bClassTeacher,
		'longFlightInstructor' : departCheakCondition.longFlightInstructor,
		'internationalQualificationTraining' : departCheakCondition.internationalQualificationTraining,
		'threeHundredQualification' : departCheakCondition.threeHundredQualification,
		'boutique' : departCheakCondition.boutique,
		'Announcer' : departCheakCondition.Announcer,
		'Lhasa' : departCheakCondition.Lhasa,
		'specialCharter' : departCheakCondition.specialCharter,
		'cadre' : departCheakCondition.cadre,
		'teacher' : departCheakCondition.teacher,
		'foreman' : departCheakCondition.foreman
	};
	$.ajax({
		isModal : false,
		type : "get",
		url : baseUrl + "/entity/person.d2js",
		data : {
			'_m' : "fetch",
			'params' : JSON.stringify(params)
		},
		dataType : "json",
		success : function(data) {
			console.log(data.rows);
			// data = JSON.parse(data);
			addPersonTable(data.rows, "node_tbody");

			// addPersonTotleNum = data.totalCount;
			// 判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
			if (bFlag) {
				// UIGeneral.init(page,totleNum,maxVisible,modelName);
				var maxPage = Math.ceil(data.total / maxVisible);
				// 分页
				// 使用方法
				$t.using('table2Ajax').init({
					maxPage : maxPage,
					id : id,
					page : page,
					modelName : "nodePersonAjax",
					maxVisible : maxVisible
				});

			}
			$('#cheakCondition').modal('hide');
			$("#DepatsearchConditionvalue").val("");
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("查询失败！");
		}
	});

}

function DepatsearchOk() {
	departCheakCondition.employeeNo = $.trim($("#depart_cheak_employeeNo")
			.val());
	departCheakCondition.level = $.trim($("#depart_cheak_level").val());
	departCheakCondition.name = $.trim($("#depart_cheak_name").val());
	departCheakCondition.cabinCrewInspector = $.trim($(
			"#depart_cheak_cabinCrewInspector").val());
	departCheakCondition.cabinCrew = $.trim($("#depart_cheak_cabinCrew").val());
	departCheakCondition.bClassTeacher = $
			.trim($("#depart_cheak_bClassTeacher").val());
	departCheakCondition.longFlightInstructor = $.trim($(
			"#depart_cheak_longFlightInstructor").val());
	departCheakCondition.internationalQualificationTraining = $.trim($(
			"#depart_cheak_internationalQualificationTraining").val());
	departCheakCondition.threeHundredQualification = $.trim($(
			"#depart_cheak_threeHundredQualification").val());
	departCheakCondition.boutique = $.trim($("#depart_cheak_boutique").val());
	departCheakCondition.Announcer = $.trim($("#depart_cheak_Announcer").val());
	departCheakCondition.Lhasa = $.trim($("#depart_cheak_Lhasa").val());
	departCheakCondition.specialCharter = $.trim($(
			"#depart_cheak_specialCharter").val());
	departCheakCondition.cadre = $.trim($("#depart_cheak_cadre").val());
	departCheakCondition.teacher = $.trim($("#depart_cheak_teacher").val());
	departCheakCondition.foreman = $.trim($("#depart_cheak_foreman").val());
	nodePersonTypecheak(0, nodeId, nodeMaxVisible, true);
}
function resertsearchOk() {
	departCheakCondition.employeeNo = "";
	$("#depart_cheak_employeeNo").val("");
	departCheakCondition.level = "";
	$("#depart_cheak_level").val("");
	departCheakCondition.name = "";
	$("#depart_cheak_name").val("");
	departCheakCondition.cabinCrewInspector = "";
	$("#depart_cheak_cabinCrewInspector").val("");
	departCheakCondition.cabinCrew = "";
	$("#depart_cheak_cabinCrew").val("");
	departCheakCondition.bClassTeacher = "";
	$("#depart_cheak_bClassTeacher").val("");
	departCheakCondition.longFlightInstructor = "" ;
	$("#depart_cheak_longFlightInstructor").val("");
	departCheakCondition.internationalQualificationTraining = "";
	$("#depart_cheak_internationalQualificationTraining").val("");
	departCheakCondition.threeHundredQualification =""; 
	$("#depart_cheak_threeHundredQualification").val("");
	departCheakCondition.boutique = "";
	$("#depart_cheak_boutique").val("");
	departCheakCondition.Announcer = "";
	$("#depart_cheak_Announcer").val("");
	departCheakCondition.Lhasa = "";
	$("#depart_cheak_Lhasa").val("");
	departCheakCondition.specialCharter = "";
    $("#depart_cheak_specialCharter").val("");
	departCheakCondition.cadre = "";
	$("#depart_cheak_cadre").val("");
	departCheakCondition.teacher = "";
	$("#depart_cheak_teacher").val("");
	departCheakCondition.foreman = "";
   $("#depart_cheak_foreman").val("");
}
function addMyNotbody2(nodeId) {
	if (nodeId) {
		var params = {
			'node' : Number(nodeId)
		// '_page':{'start': 0, 'limit': maxVisible}
		};
		$http.ajax({
			isModal : false,
			type : "get",
			url : baseUrl + "/sys/person.d2js",
			data : {
				'_m' : "fetch",
				'params' : JSON.stringify(params)
			},
			dataType : "json",
			success : function(data) {
				console.log(data.rows);
				// data = JSON.parse(data);
				addPersonTable(data.rows, "myNotbody2");
			}
		});
	}
}

// 删除高级搜索中的人员
function delSenior(obj) {

	// 当前行的ID
	var delId = 0;
	current = obj.parentNode;
	// console.log(current);
	if (current != null) {
		delId = current.cells[1].innerText;

	} else {
		alert("请选择一行");
	}

	var persomData = {};
	var tempData = [];
	var dataTemp = document.getElementsByName('SeniorCheck');
	for (var i = 0; i < dataTemp.length; i++) {
		if (dataTemp[i].checked) {
		}
		// 保留未选中的数据
		else {
			selectedTr = dataTemp[i].parentNode.parentNode;
			if (selectedTr != null) {
				if (selectedTr.cells[1].innerText != delId) {
					var temp = {};

					temp.id = selectedTr.cells[1].innerText;
					temp.name = selectedTr.cells[2].innerText;
					temp.nodename = selectedTr.cells[3].innerText;

					tempData.push(temp);
				}
			}

			else {
				alert("请选择一行");
			}
		}
	}

	persomData.data = tempData;
	console.log(persomData);
	addPersonTable(persomData, "senior_table");

}

// addHoverDom 方法 控制悬停时得菜单
function addHoverDom(treeId, treeNode) {

};

function zTreeOnClick(event, treeId, treeNode) {
	var currentId;
	var currentName;
	currentId = treeNode.id;
	currentName = treeNode.name;

	nodeId = Number(currentId);
	nodePerson(0, Number(currentId), nodeMaxVisible);

};

function removeHoverDom(treeId, treeNode) {
	$("#addBtn_" + treeNode.tId).unbind().remove();
	$("#removeBtn_" + treeNode.tId).unbind().remove();
	$("#editBtn_" + treeNode.tId).unbind().remove();
};

function loadReady() {
	var bodyH = demoIframe.contents().find("body").get(0).scrollHeight, htmlH = demoIframe
			.contents().find("html").get(0).scrollHeight, maxH = Math.max(
			bodyH, htmlH), minH = Math.min(bodyH, htmlH), h = demoIframe
			.height() >= maxH ? minH : maxH;
	if (h < 530)
		h = 530;
	demoIframe.height(h);
}

var setting = {
	check : {
		enable : false
	},
	view : {
		addHoverDom : addHoverDom,
		removeHoverDom : removeHoverDom,
		dblClickExpand : false,
		showLine : true,
		selectedMulti : false
	},
	data : {
		simpleData : {
			enable : true,
			idKey : "id",
			pIdKey : "pId",
			rootPId : ""
		}
	},
	callback : {
		onClick : zTreeOnClick
	}
};

function xmlAjax() {

	$.ajax({
		type : "GET",
		url : baseUrl + "/common/node.d2js?_m=listAll",
		data : null,
		dataType : "json",
		success : function(data) {
			console.log(data);
			// data = JSON.parse(data);
			console.log(data.rows);
			zNodes = createNodeTreeData(data.rows);
			
			var t = $("#tree");
			t = $.fn.zTree.init(t, setting, zNodes);
			demoIframe = $("#testIframe");
			demoIframe.bind("load", loadReady);
			var zTree = $.fn.zTree.getZTreeObj("tree");
			// 默认选中哪个节点 lyh
			// zTree.selectNode(zTree.getNodeByParam("id", 103));

		}
	});
}

/**
 * 初始化公共表格中，部门下拉选项数据
 */
$(document).ready(function() {
	// $.ajax({
	// type: "GET",
	// url: "../../../common/node.d2js?_m=listAll",
	// data: null,
	// dataType: "json",
	// success: function(data){
	// console.log(data);
	// console.log(data.rows);
	// zNodes = createNodeTreeData(data.rows);
	// var select = $('#myYellow2Nodes');
	// select.empty();
	// select.prepend("<option value='全部' selected='selected'>全部</option>");
	// for(var i = 0; i < data.rows.length; ++i){
	//					
	// var nodeName = data.rows[i].name;
	//					
	// select.append("<option value="+ nodeName +">"+ nodeName +"</option>");
	// }
	// }
	// });
});
/**
 * 公共表格查询搜索
 */
$(function() {
	$("#mybasic_opener4").click(
			function() {
				var id = $('#ui_date_picker_id_pub').val();
				var name = $('#ui_date_picker_name_pub').val();
				var node = $('#myYellow2Nodes').val();
				/*
				 * console.debug("id"+id); console.debug("name"+name);
				 * console.debug("node"+node);
				 */

				var tr = $("#myNotbody2").children();

				if (!id) {
					if (!name) {
						if (node == '全部') {
							// 查全部
							tr.each(function() {
								$(this).show();
							});
						} else {
							// node
							tr.each(function() {
								$(this).hide();
								var td = $($(this).find("td").get(3));
								if (node == td.text()) {
									td.parent().show();
								}
							});
						}
					} else {
						if (node == '全部') {
							// name
							tr.each(function() {
								$(this).hide();
								var td = $($(this).find("td").get(2));
								if (name == td.text()) {
									td.parent().show();
								}
							});
						} else {
							// name + node
							tr.each(function() {
								$(this).hide();
								var td2 = $($(this).find("td").get(2));
								var td3 = $($(this).find("td").get(3));
								if ((name == td2.text())
										&& (node == td3.text())) {
									td2.parent().show();
								}
							});
						}
					}
				} else {
					if (!name) {
						if (node == '全部') {
							// id
							tr.each(function() {
								$(this).hide();
								var td = $($(this).find("td").get(1));
								if (id == td.text()) {
									td.parent().show();
								}
							});
						} else {
							// id + node
							tr
									.each(function() {
										$(this).hide();
										var td1 = $($(this).find("td").get(1));
										var td3 = $($(this).find("td").get(3));
										if ((id == td1.text())
												&& (node == td3.text())) {
											td1.parent().show();
										}
									});
						}
					} else {
						if (node == '全部') {
							// id + name
							tr
									.each(function() {
										$(this).hide();
										var td1 = $($(this).find("td").get(1));
										var td2 = $($(this).find("td").get(2));
										if ((id == td1.text())
												&& (name == td2.text())) {
											td1.parent().show();
										}
									});
						} else {
							// id + name + node
							tr.each(function() {
								$(this).hide();
								var td1 = $($(this).find("td").get(1));
								var td2 = $($(this).find("td").get(2));
								var td3 = $($(this).find("td").get(3));
								if ((id == td1.text()) && (name == td2.text())
										&& (node == td3.text())) {
									td1.parent().show();
								}
							});
						}
					}
				}

				/*
				 * if(id){ tr.each( function(){ $(this).hide(); var td =
				 * $($(this).find("td").get(1)); if(id == td.text()){
				 * td.parent().show(); } } ); } if(name){ tr.each( function(){
				 * $(this).hide(); var td = $($(this).find("td").get(2));
				 * if(name == td.text()){ td.parent().show(); } } ); } if(node){
				 * if(node != '全部'){ tr.each( function(){ $(this).hide(); var td =
				 * $($(this).find("td").get(3)); if(node == td.text()){
				 * td.parent().show(); } } ); } }
				 */
			});
});

$(function() {
	// 默认加载分组信息
	myNotice1();
})
