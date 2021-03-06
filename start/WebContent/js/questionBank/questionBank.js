/**
 * add by lyh 20160719
 * 题库管理
 */


	/**
	 * 修改数据校验说明
	 */
	var dataQuestion = {
			data : [
			          // title描述
			          {
			        	  id : 'title',
			        	  msg : "描述不能为空",
			        	  checkFun : 'checkStr'
			          },
			          // analysis解析
			          {
			        	  id : 'analysis',
			        	  msg : "解析不能为空",
			        	  checkFun : 'checkStr'
			          }
			]
	}


//modify by lyh 20160718
var pageIndex;
var totalNum = 0;
//每段的页码数量
var maxVisible = 20;

//全局答案ID
var answerIds = 1000;

//全局修改答案 ID
var answerIndex = 1;


/* 创建table*/
function addTable(data){
	$("#questionBank_tbody").text("");
	var html = null;
    for(var i=0;i<data.length;i++){
//    	console.debug(data[i])
        html =   "<tr>" +
		              "<td difficulty="+ data[i].difficulty +"  questionType="+ data[i].questionType +" >" +
		              "<input type='checkbox' qid="+ data[i].id +" class='checkboxes' name='courseCheck'/>" +
		              "</td>" +
		              "<td class='aid' knowledge='"+ data[i].knowledge +"' title='"+ $('<p>'+data[i].title + '</p>').text() +"'  explanation='"+ data[i].explanation +"' options='"+ escape(data[i].options) +"'><span class='limit title'>"+$(data[i].title).text()+"</span></td>" +
		              "<td>"+data[i].questionTypeName+"</td>" +
		              "<td>"+data[i].difficultyName+"</td>" +
		              "<td title='"+ $('<p>'+data[i].optionsStr + '</p>').text() +"'><span class='limit options'>"+$('<p>'+data[i].optionsStr + '</p>').text()+"<span></td>" +
		              "<td>"+data[i].answerStr+"</td>" +
		              "<td>"+data[i].createdate+"</td>" +
		              //"<td>"+data[i].node+"</td>" +
		              "<td>" +
		              "<span class='mycaExamine' id='updataAswer' >修改</span>&nbsp;&nbsp;&nbsp;&nbsp;" +  
		               "</td>" +
		           "</tr>";
        html = $(html);
        html.data("title",data[i].title);
		$("#questionBank_tbody").append(html);
    }
}

//转换数据
function readData(data){
	var Data = [];
	if(data.length <= 0){
		totalNum = 0;
	}
	for(var i=0;i<data.length;i++){
		var item = data[i];
		
		if(item!=undefined){
			
			var tempData = {};
			tempData.id = item.id;
			tempData.questionType = item.type
			tempData.difficulty = item.difficulty;
			tempData.knowledge = item.knowledge;
			
			if(item.content.value){
				tempData.title = JSON.parse(item.content.value)["title"];
				tempData.explanation = JSON.parse(item.content.value)["explanation"];
				var options = JSON.parse(item.content.value)["options"];
				tempData.options = JSON.stringify(options);
				
				var answer = JSON.parse(item.content.value)["answer"];
				
				if(options){
					tempData.optionsStr = "";
					for(var j=0; j<options.length; j++){
						var code = String.fromCharCode(0x41+j);
						var text = options[j];
						var optionStr = code + ":&nbsp;" + text;
						tempData.optionsStr += optionStr + "&nbsp;&nbsp;&nbsp;";
					}
				}else{
					tempData.optionsStr = "";
				}
				
				
				if(answer){
					if(typeof(answer) == 'string'){
						for(var j=0; j<options.length; j++){
							if(answer == options[j]){
								var answerCode = String.fromCharCode(0x41+j);
								tempData.answerStr = answerCode;
								break;
							}	
						}
						if(tempData.answerStr == undefined){
							tempData.answerStr = "答案不在选项当中";
						}
					}else{
						tempData.answerStr = "";
						tempData.answers = [];
						for(var n=0; n<answer.length; n++){
							for(var j=0; j<options.length; j++){
								if(answer[n] == options[j]){
									var answerCode = String.fromCharCode(0x41+j);
									//tempData.answerStr += answerCode + "&nbsp;&nbsp;&nbsp;&nbsp;";
									tempData.answers.push(answerCode);
									break;
								}	
							}
						}
						tempData.answerStr = tempData.answers.sort();
					}
				}else{
					tempData.answerStr = "";
				}
				
			}else{
				tempData.optionsStr = "";
				tempData.answerStr = "";
			}
			
			tempData.state = item.state;
			tempData.node = item.node;
			tempData.createdate = item.creatdate;
						
			switch(tempData.questionType)
			{
			case "S":
				tempData.questionTypeName = "单选题";			
				break;
			case "M":
				tempData.questionTypeName = "多选题";
				break;
			case "C":
				tempData.questionTypeName = "判断题";
				break;
			default:
				break;
			}
			
			switch(tempData.difficulty)
			{
			case 1:
				tempData.difficultyName = "易";
				break;
			case 2:
				tempData.difficultyName = "中";
				break;
			case 3:
				tempData.difficultyName = "难";
				break;
			default:
				tempData.difficultyName = "未知";
				break;
			}
			
			Data.push(tempData);
		}
	}
/*	console.log("输出data");
	console.log(JSON.stringify(Data));
	console.log("end");*/
	return Data;	
}


var query = {};

/* Ajax  */
function tableAjax(page,maxVisible,bFlag,type,difficulty,title,knowledge,modelName,searchFlag){
	type = $.trim($("#searchQuestionType").val());
	difficulty = $.trim($("#searchDifficulty").val());
	title = $.trim($("#searchTitle").val());
	knowledge = $.trim($("#searchKnowledgeId").val());
	var obj = {'start':page,'size':maxVisible,'type':type,'difficulty':difficulty,'title':title,'knowledge':knowledge};
	$http.ajax({
		isModal : false,
        type: "get",
        url: "jv/examQuestion/list.do",
        data: obj,
        dataType: "json",
        success: function(data){
//        	console.log(data);
        	data = JSON.parse(data);
        	tableData = readData(data.data);
        	totalNum = data.totalNum;
            addTable(tableData);
            //判断是否是点击分页 的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
            if(searchFlag){
            	$t.using('tableAjax').reset(totalNum);
            	$("#page-count").html(totalNum);
            } else if(bFlag){
        	    /* 分页   */
    	        /*使用方法*/
                $t.using('tableAjax').init({
			    	 maxPage:totalNum,
			    	 type:type,
			    	 difficulty:difficulty,
			    	 title:title,
			    	 knowledge:knowledge,
			    	 modelName:modelName,
			    	 maxVisible:maxVisible
		            
   	 	        }); 
            }
            
        }
    });
   
}



    


/*搜索*/
function search(event) {
	query.type = $.trim($("#searchQuestionType").val());
	query.difficulty = $.trim($("#searchDifficulty").val());
	query.title = $.trim($("#searchTitle").val());
	query.knowledge = $.trim($("#searchKnowledgeId").val());
	if(query.type==''){
		query.type=undefined;
	}
	if(query.difficulty==''){
		query.difficulty=undefined;
	}
	if(query.tilte==''){
		query.title=undefined;
	}
	if(query.knowledge==''){
		query.knowledge=undefined;
	}
	tableAjax(1,maxVisible,true,query.type,query.difficulty,query.title,query.knowledge,"questBankList",true);
	event = event || window.event;
	event.preventDefault();
}



/*得到选中的值*/
function viewDetail(obj) {
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
        var id = selectedTr.cells[1].innerText;
    }
    else {
        alert("请选择一行");
    }
}




/*得到选中的值*/
function del(obj) {
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
        var id = selectedTr.cells[1].innerText;
    	var obj = [{'id':id}];
    	var strDate = JSON.stringify(obj);
    	
    	$http.ajax({
    		isModal : false,
	 	    type: "post",
	 	    url: "jv/course/del.do",
	 	    data : {'data' : strDate},
	 	    dataType: "json",
	         success: function(data){
	        	 /*tableAjax();*/
	        	tableAjax(1,maxVisible,true,query.type,query.difficulty,query.title,query.knowledge,"questBankList",true);
	             $('#myDelModal').modal('hide')
	          }
	 	    })
    }
    else {
        alert("请选择一行");
    }
}


// 修改或更新
function saveAnswer(){
	var type = $("#type").val();
	var difficulty = $("#difficulty").val();
	var title = UE.getEditor('title').getContent();
	var analysis = UE.getEditor('analysis').getContent();
	var knowledge = $("#klId").val() || 0;
	var qid = $("#qid").val();
	
	if (!title) {
		$('span[data-for=title]').show();
	} else {
		$('span[data-for=title]').hide();
	}
	if (!analysis) {
		$('span[data-for=analysis]').show();
	} else {
		$('span[data-for=analysis]').hide();
	}
	if (!knowledge) {
		$('span[data-for=klId]').show();
	} else {
		$('span[data-for=klId]').hide();
	}
	if(!title || !analysis || !knowledge ){
		return;
	}
	
	var content = {};
	content.title = title;
	
	var answers = $(".answers .Answer"); // 所有选项div
	
	var options = [];
	var as = null;
	var answer = [];
	var ueId = null;
	for(var i=0;i< answers.length;i++){
		var ueId = $(answers[i]).data("id");
		as = UE.getEditor(ueId).getContent();
		
		options.push(as);
		if($(answers[i]).find("input:checked").length == 1){// 正确答案
			answer.push(as);
		}
	}
	
	if(answer.length == 0){
		$('#errMsg').text("未添加正确答案！");
		$('#myCommonAlert').modal('show');
		return;
	}
	
	content.options = options;
	content.answer = answer;
		
	content.explanation = analysis;
	content = JSON.stringify(content);	
	
	if(qid){// 更新操作
		var param = {type:type,difficulty:difficulty,content:content,knowledge:knowledge,id:qid};
		$.post("jv/examQuestion/update.do",param,function(data){
			window.location.reload();
		}); 
	}else{// 添加操作
		var name =  type == 'S' ? 'singleScore' : (type == 'M' ? 'multipleScore' : 'judgeScore');
		var score = null;
		$.ajax({
			url: "jv/systemparameter/findname.do",
			async: false,
			data:{name : name},
		    success : function(data){
		    	data = JSON.parse(data);
		    	score = data.value;
		    	
				var param = {type:type,difficulty:difficulty,content:content,score:score,knowledge:knowledge,r_num:0,w_num:0};
				$.post("jv/examQuestion/add.do",param,function(){
					$("#myModifyModal").modal('hide')
					$('#errMsg').text("新增成功！");
					$('#myCommonAlert').modal('show');
					window.location.reload();
				});
		    }
		})
		
//		 $.ajax({
//             type: "POST",
//             url: "jv/examQuestion/add.do",
//             data: {username:$("#username").val(), content:$("#content").val()},
//             dataType: "json",
//             success: function(data){
//                         $('#resText').empty();   //清空resText里面的所有内容
//                         var html = ''; 
//                         $.each(data, function(commentIndex, comment){
//                               html += '<div class="comment"><h6>' + comment['username']
//                                         + ':</h6><p class="para"' + comment['content']
//                                         + '</p></div>';
//                         });
//                         $('#resText').html(html);
//                      }
//         });
		

	}
	
	
	
}


function batchAddAnswer(id,content,isRight,type){
	var temp = $("#templet");
	var child = temp.clone().show();
	child.data("id",id);
	child.find('.option').attr("id",id);
	
	if(type == 'M'){ // 多选题
	    child.find(".set-answer").attr("type","checkbox");
	}
	
	if(isRight){
		child.find(".set-answer").click();
	}
	
	$(".answers").append(child);
	//加载完控件触发的事件
	UE.getEditor(id).ready(function(){
		UE.getEditor(id).setContent(content); 
		
	});
	UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
	UE.Editor.prototype.getActionUrl = function(action) {
		 if (action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadimage') {
		    return '/start/jv/help/uploadimage.do?';
		  } else if (action == 'uploadvideo') {
		     return 'http://a.b.com/video.php';
		  } else {
		      return this._bkGetActionUrl.call(this, action);
		 }
	}

	
}


function addAnswer(){
	var temp = $("#templet");
	var child = temp.clone().show();
	child.removeAttr("id");
	
	var type = $("#type").val();
	if(type == 'M'){
		child.find(".set-answer").attr("type","checkbox");
	}
	
	var id = "option"+ (answerIds);
	child.data("id",id);
	child.find('.option').attr("id",id);
	$(".answers").append(child);
	UE.getEditor(id);
	UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
	UE.Editor.prototype.getActionUrl = function(action) {
		 if (action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadimage') {
		    return '/start/jv/help/uploadimage.do?';
		  } else if (action == 'uploadvideo') {
		     return 'http://a.b.com/video.php';
		  } else {
		      return this._bkGetActionUrl.call(this, action);
		 }
	}
	//加载完控件触发的事件

	answerIds++;
}

$(".delAnswer").live("click",function(){
	$(this).closest(".Answer").remove();
});

// 初始化判断题
function initC(){
	var temp = $("#templet");
	var child = temp.clone().show();
	child.removeAttr("id");
	child.find(".delAnswer").remove();
	
	var id = "coption1";
	child.data("id",id);
	child.find('.option').attr("id",id);
	$(".answers").append(child);
	child.find("[type='radio']").click();
	
	var c1 =  window.setInterval(function(){
		try{
			UE.getEditor("coption1").ready(function(){
				UE.getEditor("coption1").setContent("对"); 
				UE.getEditor("coption1").setDisabled();
			}); 
			UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
			UE.Editor.prototype.getActionUrl = function(action) {
				 if (action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadimage') {
				    return '/start/jv/help/uploadimage.do?';
				  } else if (action == 'uploadvideo') {
				     return 'http://a.b.com/video.php';
				  } else {
				      return this._bkGetActionUrl.call(this, action);
				 }
			}

			window.clearInterval(c1);
		}catch(e){}
	},10);

	//
	child = temp.clone().show();
	child.removeAttr("id");
	child.find(".delAnswer").remove();
	
	id = "coption2";
	child.data("id",id);
	child.find('.option').attr("id",id);
	$(".answers").append(child);
	UE.getEditor("coption2");

	
	var c2 =  window.setInterval(function(){
		try{
			UE.getEditor("coption2").ready(function(){
				UE.getEditor("coption2").setContent("错"); 
				UE.getEditor("coption2").setDisabled();
			});
			window.clearInterval(c2);
		}catch(e){}
	},10);
	
}

//题型选择框发生变化，清空答案选项（需重新选择答案）
$("#type").change(function(){ 
	var answers =  $(".answers .Answer");
	
	if($(this).val() == 'C'){// 销毁editor
		UE.getEditor("coption1").destroy();
		UE.getEditor("coption2").destroy();
	}
	
	$(".answers").html("");
	if($(this).val() == 'C'){// 判断题
		$("#addKl").hide();
		initC();
		return;
	}
	$("#addKl").show();
})

$("#delAnswer").live("click",function(){
	var id = $(this).closest("tr").find(".aid").text();
	var param = {ids : id};
	$.post("jv/examQuestion/dels.do",param,function(){
		showMsg("删除成功");
		window.location.reload();
	});
});


//　清空数据
function clearPanel(){
	if($("#type").val() == 'C'){// 销毁editor
		try{
			UE.getEditor("coption1").destroy();
			UE.getEditor("coption2").destroy();
		}catch(e){}
	}
	$("#qid").val("");
	$("#klName").val("");
	$("#klId").val("");
	$("#type").val("C");
	$("#difficulty").val("3");
	$(".answers").html("");
	try{
		UE.getEditor('title').setContent(""); 
		UE.getEditor('analysis').setContent(""); 
	}catch(e){
		console.log("清空数据失败！");
	}
}

function add(){
	clearPanel();
	initC();
	$("#myModalLabel3").text("添加问题");
	$('#myModifyModal').modal('show');
}



//当模态框对用户可见时触发（将等待 CSS 过渡效果完成）。
$('#myModifyModal').on('shown.bs.modal', function () {
	try{
		UE.getEditor('analysis');
	 	UE.getEditor('title');
	}catch(e){}
 	if($("#type").val() == 'C'){// 判断题
		$("#addKl").hide();
		return;
	}
	$("#addKl").show();
});


$("#updataAswer").live("click",function(){
	$("#myModalLabel3").text("修改问题");
	$('#myModifyModal').modal('show');
	
	var tr = $(this).closest("tr");
	var id = tr.find("td:nth-child(1) > input").attr("qid");
	$("#qid").val(id);
	
	var it4title =  window.setInterval(function(){
		try{
			UE.getEditor("title").ready(function(){
				UE.getEditor('title').setContent(tr.data("title")); 
			});
			window.clearInterval(it4title);
		}catch(e){
			UE.getEditor("title").destroy();
		}
	},10);
	
	var analysis = tr.find(".aid").attr("explanation");
	var it4analysis =  window.setInterval(function(){
		try{
			UE.getEditor("analysis").ready(function(){
				UE.getEditor('analysis').setContent(analysis); 
			});
			window.clearInterval(it4analysis);
		}catch(e){
			UE.getEditor("analysis").destroy();
		}
	},10);
	
	
	var type = tr.find("td:eq(0)").attr("questionType");
	$('#myModifyModal #type').val(type);
	
	var difficulty = tr.find("td:eq(0)").attr("difficulty");
	$('#myModifyModal #difficulty').val(difficulty);
	
	var knowledge = tr.find("td:eq(1)").attr("knowledge");
	$("#klId").val(knowledge);
	
	// 知识点名称
	for(var i = 0 ; i < KnowledgePoints.length; i++){ 
		if(knowledge == KnowledgePoints[i].id){
			$("#klName").val(KnowledgePoints[i].title);
			break;
		}
	}
	
	var answer = unescape(tr.find("td:eq(1)").attr("options"));
	var answers = JSON.parse(answer);
	
	var rightAnswer = tr.find("td:eq(5)").text();
	// 答案选项
	$(".answers").html(""); // 清空所有答案选项
	
    var rights = rightAnswer.split(",");

	var x = 1;
	var y = 0;
	
	for(var i=0 ; i<answers.length; i++){
		var answerIdTemp = "option"+ answerIndex.toString();
		var right = false;
		for(var j = 0; j < rights.length ; j++){
			if(i == (rights[j].charCodeAt() - 65)){
				right = true;
				break;
			}
		}
		batchAddAnswer(answerIdTemp,answers[i],right,type);
		answerIndex++;
		
	}

});



////////////////////树
//addHoverDom 方法 控制悬停时得菜单
function addHoverDom(treeId, treeNode) {

};

function zTreeOnClick(currentId,currentName) {
  	$("#klName").val(currentName);
  	$("#klId").val(currentId);
  	
  	$('#mycuModal').modal('hide');
};


function removeHoverDom(treeId, treeNode) {
  $("#addBtn_"+treeNode.tId).unbind().remove();
  $("#removeBtn_"+treeNode.tId).unbind().remove();
  $("#editBtn_"+treeNode.tId).unbind().remove();
};

function loadReady() {
  var bodyH = demoIframe.contents().find("body").get(0).scrollHeight,
          htmlH = demoIframe.contents().find("html").get(0).scrollHeight,
          maxH = Math.max(bodyH, htmlH), minH = Math.min(bodyH, htmlH),
          h = demoIframe.height() >= maxH ? minH:maxH ;
  if (h < 530) h = 530;
  demoIframe.height(h);
}

var setting = {
  check: {
      enable: false
  },
  view: {
      addHoverDom: addHoverDom,
      removeHoverDom: removeHoverDom,
      dblClickExpand: false,
      showLine: true,
      selectedMulti: false
  },
  data: {
      simpleData: {
          enable:true,
          idKey: "id",
          pIdKey: "pId",
          rootPId: ""
      }
  },
  callback: {
  	onClick: zTreeOnClick
  }
};

var KnowledgePoints = null; 
function xmlAjax(){

	$http.ajax({
		isModal : false,
	    type: "GET",
	    url: "jv/knowledgepoint/list.do",
	    data: null,
	    dataType: "json",
	    success: function(data){
				data = JSON.parse(data);
				KnowledgePoints = data;
				zNodes = createTreeData(data);

	            var t = $("#tree");
	            t = $.fn.zTree.init(t, setting, zNodes);
	            demoIframe = $("#testIframe");
	            demoIframe.bind("load", loadReady);
	            var zTree = $.fn.zTree.getZTreeObj("tree");
	            //默认选中哪个节点  lyh
	            //zTree.selectNode(zTree.getNodeByParam("id", 103));
	            
       }
	});
}



$(document).ready(function(){
    /*App.init();*/
    tableAjax(1,maxVisible,true,undefined,undefined,undefined,undefined,"questBankList",false);
    xmlAjax();
    
});


function closeModel(){
	$('#mycuModal').modal('hide')
}



function dels(){
	var chks = $(":checkbox:checked");
	var args = "?";
	var id = null;
	for(var i=0 ; i< chks.length;i++){
		qid = $(chks[i]).attr("qid");
		if(!qid) continue;
		args += ("ids=" + qid+"&");
	}
	$.post("jv/examQuestion/dels.do" + args,function(data){
		window.location.reload();
	});
	
}


