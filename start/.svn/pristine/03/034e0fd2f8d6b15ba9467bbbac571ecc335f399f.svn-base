/**
 * Created by Administrator on 2016/7/11.
 */

var userNameErrMsg = "名称格式不正确";
var userIdnumberErrMsg = "身份证号码格式不正确";
var userNameRule = '/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/g';
var userIdnumberRule = '/^\\d{17}[X\\d]{1}$|^\\d{15}$/g';

/**
 * 新增数据校验说明
 */
var dataAdd = {
	data : [
	// userName
	{
		id : 'userName',
		msg : userNameErrMsg,
		rule : userNameRule,
		checkFun : 'checkStr'
	},
	// userIdnumber
	{
		id : 'userIdnumber',
		msg : userIdnumberErrMsg,
		rule : userIdnumberRule,
		checkFun : 'checkStr'
	} ]
}
/**
 * 修改数据校验说明
 */
var dataUpdate = {
	data : [
	// modifyName
	{
		id : 'modifyName',
		msg : userNameErrMsg,
		rule : userNameRule,
		checkFun : 'checkStr'
	},
	// modifyNum
	{
		id : 'modifyNum',
		msg : userIdnumberErrMsg,
		rule : userIdnumberRule,
		checkFun : 'checkStr'
	} ]
}

// modify by lyh 20160718
var pageIndex;
var totleNum = 0;
// 每段的页码数量
var maxVisible = 20;
// 员工对象
var useronData = [];
// 人员序号
var sequence = 1;

// 单条删除当前行的ID
var delCurrId = 0;

// 新增人员 部门ID
var nodeID = 0;

/* 创建table */
function addTable(data) {
	$("#personList_tbody").text("");
	var strTemp = "";
	for (var i = 0; i < data.length; i++) {
		strTemp = strTemp
				+ "<tr class='odd gradeX'><td><input name='personCheck' type='checkbox' class='checkboxes' value='1' /></td>"
				+ "<td style='display:none'>"
				+ checkUndifend(data[i].id)
				+ "</td>"
				+ "<td>"
				+ checkUndifend(data[i].name)
				+ "</td>"
				+ "<td class='hidden-480'>"
				+ checkUndifend(data[i].idCard)
				+ "</td>"
				+ "<td class='hidden-480'>"
				+ checkUndifend(data[i].genderName)
				+ "</td>"
				+

				"<td class='hidden-480'>"
				+ checkUndifend(data[i].tag.intentDepatment)
				+ "</td>"
				+

				"<perm:checkPerm permissionCode='no_nentry_management.add'>"
				+ "<td><span class='mycaExamine clean-data' onclick='modify(this)' data-toggle='modal' data-target='#myclModal'>修改</span></td>"
				+ "</perm:checkPerm>";
	}
    $('#personList_tbody').html('').html(strTemp);
}

// 转换数据
function readData(data) {
	var Data = [];
	if (data.length <= 0) {
		totleNum = 0;
	}
	for (var i = 0; i < data.length; i++) {
		var item = data[i];
		if (item != undefined) {

			if (item.totleNum != undefined/* rid */) {
				totleNum = item.totleNum;

			}
			var tempData = {};
			tempData.node = item.node;
			tempData.trainType = item.trainType;
			tempData.name = item.name;
			tempData.id = item.id;
			tempData.idCard = item.idCard;
			tempData.genderName = item.genderName;
			tempData.state = item.state;
			tempData.tag = JSON.parse(item.tag);
			if (tempData.tag == undefined ||tempData.tag == null) {
				tempData.tag = JSON.parse("{\"intentDepatment\": \" \"}");
			}
			tempData.createdate = getLocalTime(item.createdate);

			switch (item.idCard) {
			case "F":
				tempData.idCardName = "女";
				break;
			case "M":
				tempData.idCardName = "男";
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

/* 获取列表Ajax */
function tableAjax(page, maxVisible, bFlag, name, modelName, searchFlag) {
	name = $.trim($("#searchName").val());
	var obj = {
		'page' : page,
		'size' : maxVisible,
		'name' : name
	};
	var strDate = JSON.stringify(obj);
	console.log("tableAjax参数： " + strDate);
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

			tableData = readData(data);

			addTable(tableData);
			// 判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
			if (searchFlag) {
				$t.using('tableAjax').reset(totleNum);
				$("#page-count").html(totleNum);
			} else if (bFlag) {
				// UIGeneral.init(page,totleNum,maxVisible,modelName);

				/* 分页 */
				/* 使用方法 */
				$t.using('tableAjax').init({
					maxPage : totleNum,
					name : name,
					modelName : modelName,
					maxVisible : maxVisible

				});

			}

		}
	});

}

$(document).ready(function() {
	App.init();
	tableAjax(1, maxVisible, true, "", "nonEntryManagement", false);
});

$(function() {
	// 清除弹框内容
	$(".clean-data").click(function() {
		$(".Bomb-box").html("");
		$(".Bomb-box").val("");
		$(".errorPrompt").html("");
		$(".cerrorPrompt").html("");
		$(".icon-remove-sign").css("opacity", "0");
		$(".Bomb-box").css("border-color", "#e6e6eb");
	})
	// 添加人员
	$("#addUserBtn").click(function() {

		// 调用数据校验
		var isPass = checkData(dataAdd);
		// 判断校验是否成功
		if (!isPass) {
			return;
		}

		/*
		 * if($.trim($("#userName").val()) == ""){
		 * $("#nameError").html("请填写姓名");
		 * $("#userName").css("border-color","#fc4f3f");
		 * $("#nameIcon").css("opacity","1"); return false; }else{
		 * $("#userName").css("border-color","#e6e6eb");
		 * $("#nameError").empty(); $("#nameIcon").css("opacity","0"); }
		 * if($.trim($("#userSex").val()) == ""){ $(".Bomb-box").html("请填写性别");
		 * return false; } if($.trim($("#userIdnumber").val()) == ""){
		 * $("#numberError").html("请填写身份证号");
		 * $("#userIdnumber").css("border-color","#fc4f3f");
		 * $("#numberIcon").css("opacity","1"); return false; }else{
		 * $("#userIdnumber").css("border-color","#e6e6eb");
		 * $("#numberError").empty(); $("#numberIcon").css("opacity","0"); } if
		 * ($("#userIdnumber").val() != "" &&
		 * !/^(\d{15}|\d{17}[\dXx])$/.test($("#userIdnumber").val())) {
		 * $("#numberError").html("请输入正确的身份证号码");
		 * $("#userIdnumber").css("border-color","#fc4f3f");
		 * $("#numberIcon").css("opacity","1"); return false; }else{
		 * $("#userIdnumber").css("border-color","#e6e6eb");
		 * $("#numberError").empty(); $("#numberIcon").css("opacity","0"); }
		 */

		var tag = {
			intentDepatment : ""
		};
		var userName = $("#userName").val();
		var userSex = $("#userSex").val();
		var userIdnumber = $("#userIdnumber").val();
		var employeeNo = $("#employeeNo").val();
		console.log("员工编号：" + employeeNo);
		tag.intentDepatment = $("#intentDepatment").val();

		var obj = {
			'name' : userName,
			'gender' : userSex,
			'idCard' : userIdnumber,
			'employeeNo': employeeNo,
			'tag' : tag
		};
		/* var obj = {'name':userName}; */
		var strDate = JSON.stringify(obj);

		console.log("未入职人员新增参数：" + strDate);

		$http.ajax({
			isModal : true,
			type : "get",
			url : "jv/nonentrymanagement/add.do",
			data : {
				'data' : strDate
			},
			dataType : "json",
			success : function(data) {
				var err = JSON.parse(data);
				if (err.error) {
					// err.error.message
					var modalTitle = "操作失败";
					$(".Bomb-box").html(err.error.message);
					return;
				}
				console.log(data);
				tableAjax(1, maxVisible, true, "", "nonEntryManagement", true);
				$('#mynemModal').modal('hide'); // 隐藏新增模态框
			}
		});

//		formValidate();

	})

	// 修改(点击确定按钮之后的操作)
	$("#modifyUserBtn").click(function() {

		// 调用数据校验
		var isPass = checkData(dataUpdate);
		// 判断校验是否成功
		if (!isPass) {
			return;
		}

		/*
		 * if($.trim($("#modifyName").val()) == ""){
		 * $("#cnameError").html("请填写姓名");
		 * $("#modifyName").css("border-color","#fc4f3f");
		 * $("#cnameIcon").css("opacity","1"); return false; }else{
		 * $("#cnameError").empty();
		 * $("#modifyName").css("border-color","#e6e6eb");
		 * $("#cnameIcon").css("opacity","0"); }
		 * if($.trim($("#modifyNum").val()) == ""){
		 * $("#cnumberError").html("请填写身份证号");
		 * $("#modifyNum").css("border-color","#fc4f3f");
		 * $("#cnumberIcon").css("opacity","1"); return false; }else{
		 * $("#cnumberError").empty();
		 * $("#modifyNum").css("border-color","#e6e6eb");
		 * $("#cnumberIcon").css("opacity","0"); }
		 */

		var userName = $("#modifyName").val();
		var userSex = $("#modifySex").val();
		var userIdnumber = $("#modifyNum").val();
		var modifyId = Number($("#modifyId").val());
		var employeeNo = $("#modifyEmployeeNo").val();
		var modifyintentDepatment = $("#modifyintentDepatment").val();
		var obj = {
			'id' : modifyId,
			'name' : userName,
			'gender' : userSex,
			'idCard' : userIdnumber,
			'employeeNo' : employeeNo,
			'intentDepatment': modifyintentDepatment
		};

		var strDate = JSON.stringify(obj);

		console.log("未入职人员修改参数：" + strDate);

		$http.ajax({
			isModal : true,
			type : "get",
			url : "jv/nonentrymanagement/update.do",
			data : {
				'data' : strDate
			},
			dataType : "json",
			success : function(data) {
				var err = JSON.parse(data);
				if (err.error) {
					// err.error.message
					var modalTitle = "操作失败";
					$(".Bomb-box").html(err.error.message);
					return;
				}
				console.log(data);
				tableAjax(1, maxVisible, true, "", "nonEntryManagement", true);
				$('#myclModal').modal('hide'); // 隐藏修改模态框
			}
		});

	})

	// 删除
	$("#delUserBtn").click(function() {
		var idTemp = [];
		var dataTemp = document.getElementsByName('personCheck');
		for (var i = 0; i < dataTemp.length; i++) {
			if (dataTemp[i].checked) {
				selectedTr = dataTemp[i].parentNode.parentNode;
				if (selectedTr != null) {
					var id = Number(selectedTr.cells[1].innerText);

					idTemp.push(id);
				} else {
					showMsg("请选择一行");
				}
			}
		}

		if ((idTemp.length <= 0) && (0 != delCurrId)) {
			idTemp.push(delCurrId);
		}

		var obj = {
			person : idTemp
		};
		var strDate = JSON.stringify(obj);
		console.log("未入职人员删除参数：" + strDate);
		$http.ajax({
			isModal : true,
			type : "POST",
			url : "jv/nonentrymanagement/del.do",
			data : {
				'id' : strDate
			},
			dataType : "json",
			success : function(data) {
				// 删除失败
				var err = JSON.parse(data);
				if (err.error) {
					// err.error.message
					var modalTitle = "操作失败";
					$(".Bomb-box").html(err.error.message);
					return;
				}
				tableAjax(1, maxVisible, true, "", "nonEntryManagement", true);
				$('#myDelModal').modal('hide');
			}
		});
	})

	tableAjax(1, maxVisible, true, "", "nonEntryManagement", true);
});

/* 得到选中的值 修改 */
function modify(obj) {
	selectedTr = obj.parentNode.parentNode;
	if (selectedTr != null) {
		modifyCurrId = selectedTr.cells[1].innerText;
		$("#modifyId").val(selectedTr.cells[1].innerText);
		$("#modifyName").val(selectedTr.cells[2].innerText);
		$("#modifyNum").val(selectedTr.cells[3].innerText);
		$("#modifyEmployeeNo").val('O' + selectedTr.cells[3].innerText);
		$("#modifyintentDepatment").val(selectedTr.cells[5].innerText);
		if ("男" == selectedTr.cells[4].innerText) {
			$("#modifySex").val('M');
		} else if ("女" == selectedTr.cells[4].innerText) {
			$("#modifySex").val('F');
		}
	} else {
		showMsg("请选择一行");
	}
}
/* 点击单条删除 */
function del(obj) {
	selectedTr = obj.parentNode.parentNode;
	if (selectedTr != null) {
		// selectedTr.cells[1].innerText 选中那一排数据的第一个
		delCurrId = selectedTr.cells[1].innerText;

	} else {
		showMsg("请选择一行");
	}
}
/* 搜索 */
function search(obj) {
	var searchName = $.trim($("#searchName").val());
	// if ((searchName == "")&&(searchNode == "")) {
	// alert("请填写搜索条件");
	// return false;
	// }
	//	
	if ("" == searchName) {
		tableAjax(1, maxVisible, true, "", "nonEntryManagement", true);
	} else {
		tableAjax(1, maxVisible, true, searchName, "nonEntryManagement", true);
	}

}

// 上传主程序
function uploadfile() {
	var form = $("#allUpload");

	var file = $("input[name=file]").val();
	if (!file) {
		showMsg("请先选择文件！");
		return;
	}
	form.ajaxSubmit({
		type : 'post',
		dataType : "json",
		success : function(data) {
			data = JSON.parse(data);
			if (data.error) {
				showMsg("导入失败！");
				return;
			}
			tableAjax(1, maxVisible, true, "", "nonEntryManagement", true);
			$('#importModal').modal('hide');
		},
		error : function(XmlHttpRequest, textStatus, errorThrown) {
			showMsg("导入失败！");
		}
	});

}
