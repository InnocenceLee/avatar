/**
 * 提交的数据
 */
var submitDate = [];

/**
 * 添加表格数据
 * 
 * @param personlist
 */
function adddate(personlist) {
	$("#planList_tbody").text("");
	var strTemp = "";
	for (var i = 0; i < personlist.length; i++) {
		strTemp = strTemp + "<tr>" + "<td>" + personlist[i].employeeNo
				+ "</td>" // 员工编号
				+ "<td>" + personlist[i].level + "</td>" + "<td>"// 等级
				+ personlist[i].name + "</td>" + "<td >"// 姓名
				+ personlist[i].cabinCrewInspector + "</td>" + "<td>"// 客舱乘务检查员
				+ personlist[i].cabinCrew + "</td>" + "<td>"// 客舱乘务教员
				+ personlist[i].bClassTeacher + "</td>" + "<td>"// B类教员
				+ personlist[i].longFlightInstructor + "</td>" + "<td>"// 晋级乘务长带飞教员
				+ personlist[i].internationalQualificationTraining + "</td>"
				+ "<td>"// 国际线资格培训
				+ personlist[i].threeHundredQualification + "</td>" + "<td>"// 330资格
				+ personlist[i].boutique + "</td>" + "<td>"// 精品
				+ personlist[i].Announcer + "</td>" + "<td>"// 广播员
				+ personlist[i].Lhasa + "</td>" + "<td>"// 拉萨
				+ personlist[i].specialCharter + "</td>" + "<td>"// 专包机
				+ personlist[i].cadre + "</td>" + "<td>"// 干部
				+ personlist[i].teacher + "</td>" + "<td>"// 教员
				+ personlist[i].foreman + "</td>" + "</tr>"// 班组长
	}
	var tbody = document.getElementById("planList_tbody");
	$("#planList_tbody").html(strTemp)
}

/**
 * 导入员工excel
 */
function updata() {
	if (checkData()) {
		$('#form1').ajaxSubmit({
			url : 'uploadExcel.do',
			dataType : 'text',
			success : resutlMsg,
			error : errorMsg
		});
		function resutlMsg(data) {
			var result = JSON.parse(data)
			var date = result.date;
			if (result.success) {
				submitDate = date;
				adddate(date);
				$('#myAddPersionModal').modal('hide');
				$("#upfile").val("");
			} else {
				alert(result.msg);
				$("#upfile").val("");
			}

		}
		function errorMsg() {
			alert("导入excel出错！");
		}
	}

}

/**
 * 提交员工数据
 */
function submitPersionDate() {
	$.ajax({
		type : "POST",
		url : "submitPersion.do",
		data : {
			personDate : JSON.stringify(submitDate)
		},
		dataType : "json",
		success : function(data) {
			// var result = JSON.parse(data);
			if (data.success == true) {
				alert(data.msg);
			} else {
				alert("上传数据失败！");
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("上传数据失败！");
		}
	});

}

/**
 * 数据校验
 */
function checkData() {
	var fileDir = $("#upfile").val();
	var suffix = fileDir.substr(fileDir.lastIndexOf("."));
	if ("" == fileDir) {
		alert("选择需要导入的Excel文件！");
		return false;
	}
	if (".xls" != suffix && ".xlsx" != suffix) {
		alert("选择Excel格式的文件导入！");
		return false;
	}
	return true;
}

function addPersonTable(data) {
	$("#courseList_tbody").text("");
	var strTemp = "";
	for (var i = 0; i < data.length; i++) {
		strTemp = strTemp
				+ "<tr>"
				+ "<td><input type='checkbox' class='checkboxes' name='learnAddCourse'/></td>"
				+ "<td style='display:none'>" + checkUndifend(data[i].id)
				+ "</td>" + "<td>" + checkUndifend(data[i].name) + "</td>"
				+ "<td class='hidden-480'>"
				+ checkUndifend(data[i].trainTypeName) + "</td>"
				+ "<td class='hidden-480'>" + checkUndifend(data[i].createdate)
				+ "</td>" + "<td class='center hidden-480' >"
				+ checkUndifend(data[i].node) + "</td>" + "</tr>";
	}
	$("#courseList_tbody").html(strTemp);
}
