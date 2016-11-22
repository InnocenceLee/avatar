/**
 * Created by Administrator on 2016/7/11.
 */
function checkTypeNum(id, rule, canNull) {
	if ($("[name=mode]").val() != 'Z') {
		return true;
	} else {
		var checkNode = $("#" + id);
		var checkNodeVal = checkNode.val();

		var checkNodeValTemp = checkNodeVal.replace(/\s/g, "");
		if (!checkNodeValTemp && !canNull) {
			return false;
		}

		if (rule == 0) {
			return true;
		}
		return checkNodeVal.match(rule) ? true : false;
	}
}
var paperNameRule = '/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/g';
var paperScoreRule = '/^([1-9][0-9]*)|(0\.[0-9]*[1-9])|([1-9][0-9]*\.[0-9]*[1-9])$/';
/**
 * 新增数据校验说明
 */
var dataAddPaper = {
	data : [
	// paperName试卷名称
	{
		id : 'paperName',
		msg : "名称格式不正确",
		rule : paperNameRule,
		checkFun : 'checkStr'
	},
	// 知识点
	{
		id : 'knowledges',
		msg : '知识点不能为空',
		rule : '/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/g',
		checkFun : 'checkStr'
	},
	// 单选题目分数
	{
		id : 'singleScore',
		type : 'multi',
		msg : '单选题分数必须为有效数字',
		rule : paperScoreRule,
		checkFun : 'checkStr'
	},
	// 多选题目分数
	{
		id : 'multipleScore',
		type : 'multi',
		msg : '多选题分数必须为有效数字',
		rule : paperScoreRule,
		checkFun : 'checkStr'
	},
	// 判断题分数
	{
		id : 'judgeScore',
		type : 'multi',
		msg : '判断题分数必须为有效数字',
		rule : paperScoreRule,
		checkFun : 'checkStr'
	} ]
}

// modify by lyh 20160718
var pageIndex;
var totleNum = 0;
// 每段的页码数量
var maxVisible = 10;

// 课程对象总
var submitData = {};
// 课程对象
var courseData = {};
// 课程记录
var trainLog = {};
// 课时对象
var lessonData = [];
// 课时挂机对象
var avoidIdle = {};
// 课时序号
var sequence = 1;

// 树
var zTree;
var demoIframe;
var zNodes;
// 树

// addHoverDom 方法 控制悬停时得菜单
function addHoverDom(treeId, treeNode) {

};

function zTreeOnClick(currentId, currentName) {
	$("#klName").val(currentName);
	$("#knowledges").val(currentId);
	courseData.knowledgePoint = Number(currentId);
	$('#mycuModal').modal('hide');
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

	$http.ajax({
		isModal : false,
		type : "GET",
		url : "jv/knowledgepoint/list.do",
		data : null,
		dataType : "json",
		success : function(data) {
			console.log(data);
			data = JSON.parse(data);
			zNodes = createTreeData(data);

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

function findSocre() {

	$http.ajax({
		isModal : false,
		type : "GET",
		url : "jv/systemparameter/listValue.do",
		data : null,
		dataType : "json",
		success : function(data) {
			data = JSON.parse(data);
			$("#singleScore").val(data.singleScore);
			$("#judgeScore").val(data.judgeScore);
			$("#multipleScore").val(data.multipleScore);
		}
	});
}

$(document).ready(function() {
	App.init();
	xmlAjax();
	findSocre();
});

$("#klBtn").click(function() {
	$('#mycuModal').modal('hide');
})

// 数据校验
function validata() {

}

$("[id$=_num]").change(
		function() {
			var num = parseInt($("#s_num").val() || 0)
					+ parseInt($("#m_num").val() || 0)
					+ parseInt($("#c_num").val() || 0);
			$("[name='question_count']").val(num);
		});

$("[name=mode]").change(function() {
	if ($("[name=mode]").val() == 'Z') {
		$('#question-type').attr('style', 'display:block');
		$('#question-acount').attr('style', 'display:block');
		$('#difficulty').attr('style', 'display:block');
	} else {
		$('#question-type').attr('style', 'display:none');
		$('#question-acount').attr('style', 'display:none');
		$('#difficulty').attr('style', 'display:none');
	}

});

function save() {

	// 调用数据校验
	var isPass = checkData(dataAddPaper);
	// 判断校验是否成功
	if (!isPass) {
		return;
	}
	
	var name = $("[name=name]").val();
	var knowledges = $("[name=knowledges]").val();
	var mode = $("[name=mode]").val();
	var difficulty = $("[name=difficulty]").val();
	var discribe = $("[name=discribe]").val();
	var single_choice = parseInt($("#s_num").val() || 0);
	var multiple_choice = parseInt($("#m_num").val() || 0);
	var judge = parseInt($("#c_num").val() || 0);
	
	var single_score = parseFloat($("#singleScore").val());
	var judge_score = parseFloat($("#judgeScore").val());
	var multiple_score = parseFloat($("#multipleScore").val());
	var qcout = $("[name=question_count]").val();
	if(parseInt(qcout) == 0 && mode == 'Z'){
		$("[name=question_count]").css("border-color","#fc4f3f");
		var option='<p class="errorPrompt" id="mypq_count">请至少选择一道题(单选，多选，判断等)</p>';
		var icon = '<i class="icon-remove-sign myicon" id="myIq_count"></i>';
		$("[name=question_count]").after(option);
		$("[name=question_count]").after(icon);
		return;
	}
	if (knowledges == '') {
		showMsg("请选择知识点");
		return;
	}
	
	var param = new Object();
	param.name = name;
	param.knowledges = knowledges;
	param.mode = mode;
	param.difficulty = difficulty;
	param.discribe = discribe;
	param.p_type = "线上自主";

	var content = new Object();
	content.single_score = single_score;
	content.judge_score = judge_score;
	content.multiple_score = multiple_score;
	param.content = JSON.stringify(content);

	param.quesions_num = JSON.stringify({
		single_choice : single_choice,
		multiple_choice : multiple_choice,
		judge : judge
	});
	var question_count = $("[name=question_count]").val();
	param.question_count = question_count;
	if(mode == 'Z'){
		param.totle_score = single_choice*single_score + multiple_choice*multiple_score + judge*judge_score;
	}
	var score = JSON.stringify({
		single_score : single_score,
		judge_score : judge_score,
		multiple_score : multiple_score
	});
	
	if(mode == 'S'){
		$.post("jv/examPaper/manualQuesttion.do",{knowledges:knowledges},function(data){
	    	var questions = data.questions;
	    	if(questions.length == 0 ){
	    		isPass=false;
	    		showMsg("当前知识点下未查询到试题,请添加试题后再创建试卷");
	    		return;
	    	}
	    	addPaper(param, score,mode,difficulty,knowledges);
		});
	}else if (mode == 'Z') {
		var paramObj = {
			sNum : single_choice,
			mNum : multiple_choice,
			cNum : judge,
			difficulty : difficulty,
			knowledges : parseInt(knowledges)
		};
		var pass = true;
		if (mode != 'D') {
			$.ajax({
				type : "GET",
				url : "../jv/examPaper/customQuesttion.do",
				async : false,
				data : paramObj,
				success : function(data) {
					if (data.questions.length < qcout) {
						pass = false;
					}
				}
			});
		}

		if (!pass) {
			showMsg("随机试卷需要根据条件选择题目，但没有查询到符合所选条件的题目，选择题目的条件保证知识点、每一种类型题目的个数，题目的难度系数");
			return;
		}
		addPaper(param, score,mode,difficulty,knowledges);
	}else if(mode == 'D'){
		addPaper(param, score,mode,difficulty,knowledges)
	}
}
function addPaper(param, score,mode,difficulty,knowledges){
	
	$.post("jv/examPaper/add.do", JSON.parse(JSON.stringify(param)), function(
			data) {
		if (data.success) {
			if (mode == 'S' || mode == 'D') {
				window.location.assign("../views/examPaperPreview.jsp?id="
						+ data.id + "&opt=u&score=" + score + "&mode=" + mode
						+ "&difficulty=" + difficulty + "&knowledge="
						+ knowledges);
				return;
			}
		}
		window.location.assign("../views/examPaperList.jsp");
	});
	
}

