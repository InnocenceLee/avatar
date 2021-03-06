// 试卷id

var pid = null;
var eid = null;
var paid = null;
var duration = null;
var mode=null;
var currentPaper = null;
var resizeExamPaper = function () {
	$('.question-end').css('overflow-y', 'auto');
	$('.question-end').height($(window).height() - 200);
}

$(function(){
	pid = $("[name=pid]").val();
	eid = $("[name=eid]").val();
	paid = $("[name=paid]").val();
	duration = $("[name=duration]").val();
	resizeExamPaper();
});

$(window).resize(function () {
	resizeExamPaper();
});

// 点击选项时，去掉题目的红色警告
$('.question-end').on('click', '.option', function () {
	$(this).closest('.question').removeClass('red').addClass('yellow');
});

var examStart = null;
var examEnd = null;

$(function(){
	if(!pid) return;
	loadPaper();
});

function loadPaper(){
	var paperMode, // 答题模式 O:显示全部  F：每次一道
	    randomOrder;  // 试题是否乱序
	var examPlanInfo = true;
	$.ajax({
		url : "jv/exam/list.do",
		data : {data : JSON.stringify({page : 1,size : 10,paid : parseInt(paid),formalExam:true})},
		async : false,
		success : function(data){
			try{
				data = JSON.parse(data)[0];
				paperMode = data.paperMode;
				randomOrder = data.randomOrder;
			}catch(e){
				showMsg("获取试题信息失败！");
				examPlanInfo = false;
			}
		}
	});
	
	if(!examPlanInfo) return;
	
	$.get("jv/examPaper/list.do?id=" + pid,function(data){
		data = JSON.parse(data);
		var paper = data.data[0];
		if(!paper){
			alert("未找到试卷信息!");
			return;
		}
		mode=paper.mode;
		if(paper.mode=='S' || paper.mode=='D'){// 手动试卷||word导入试卷
			S(paper,paperMode,randomOrder);
		}else{// 自动试卷
			Z(paper,paperMode,randomOrder);
		}
		// 开始计时
		start(paper);
		examStart = new Date().getTime();
	});
}



// 手动试卷
function S(paper,paperMode,randomOrder){
	var content = paper.content.value;
	var questions = JSON.parse(content).questions;
	cretePaper(questions,paperMode == 'O',randomOrder == 'Y');
}

// 自动试卷

function Z(paper,paperMode,randomOrder){
	$.post("jv/examPaper/gennerateQuestion.do",{id:paper.id},function(data){
		var questions = JSON.parse(data);
		cretePaper(questions,paperMode == 'O',randomOrder == 'Y');
	});
}

function random(array){
	array.sort(function(){
		return Math.random() > 0.5 ? -1 : 1;
	});
}

/*
 * questions 试题
 * showAll  显示全部(true)
 * randomOrder  试题乱序(true)
 * 
 * */
function cretePaper(questions,showAll,randomOrder){
	var obj = null;
	var html  = null;
	var templet = $("#templet"); // 模板
	var end = $(".question-end");
	var cacheData = null;
	
	if(randomOrder){ // 试题 、 答案乱序
		random(questions);
	}
	
	for(var i=0;i<questions.length;i++){
		cacheData = JSON.stringify(questions[i]);
		obj = questions[i];
		html = templet.clone();
		html.data("info",cacheData);
		html.removeClass(".question");
		html.find("[name=no]").text(i+1);
		html.find("[name=type]").text(obj.type=='S' ? '单选题' :(obj.type=='M' ? '多选题' : '判断题'));
		if(mode!='Z'){
			html.find("[name=title]").replaceWith($(obj.title).addClass("subject"));
		}
//		console.log(JSON.stringify(obj));
		var options = obj.options;
		if(mode=='Z'){
			var temp = JSON.parse(obj.content.value);
			options=temp.options;
			html.find("[name=title]").replaceWith($(temp.title).addClass("subject"));
		}
		if(randomOrder){// 试题 、 答案乱序
			random(options);
		}
		var optionList = html.find(".optionlist");
		var option = null;
		var count = 0;
		for(var j = 0; j < options.length; j++){// 答案选项
			option = 
				'<label class="radio option line">'
					+'<div class="'+ (obj.type != 'M' ? 'radio' : '') +' mycheck"><span ><input type="'+ (obj.type == 'M' ? 'checkbox' : 'radio' ) +'" name="options'+ obj.id + (obj.type!='M' ? '' : new Date().getTime() + (++count)) +'"></span></div>'
					+'<span name="option-title"  class="myOptionTitle">'+ String.fromCharCode(65 + j) +'</span>、<span name="option-content">'+ options[j] +'</span>'
				+'</label>';
			optionList.append(option);
		}
		end.append(showAll ? html.show() : html);
	}
	
	if(!showAll){
		$($(".question").get(0)).show();// 显示第一题
	    $(".chq").removeClass("chq"); // 上一题 下一题按钮显示
	}
}

function start(paper){

	$http.ajax({
		type : "POST",
		url : "jv/exam/examNotic.do",
		data : {
			examPlanId: Number(paid)
		},
		dataType : "json",
		success : function(data) {
			data = JSON.parse(data);
			if(data.data != "" && data.data != undefined){
				$('#myCommonAlertExamInfo').html(data.data);
				
				$('#myCommonAlertExam').modal('show').on('hidden',function() {
					examOKClick(paper);
				}
				);	
				$('#myCommonAlertBtnExam').click(function() {
					$('#myCommonAlertExam').modal('hide');
				});
				
			}else{
				examOKClick(paper);
			}
		 }
	});
	
}

function examOKClick(){
	$("[name=beginTime]").text(timeStamp2String(new Date().getTime()));
	var sum  = 1*60*parseFloat(duration); // 秒
    var iv = window.setInterval(function(){
    	if(sum <=0){
    		window.clearInterval(iv);
    		end();
    		return;
    	}
		sum--;
		var h = parseInt(sum/(60*60));
        var m = parseInt((sum % 3600)/60);
        var s = (sum % 3600) % 60
        var time = PrefixInteger(h,2)+"时" + PrefixInteger(m,2) + "分" + PrefixInteger(s,2) + "秒";
        $(".mySurplus1").text(time);
        
	},1000);
	

}

function end(){ // 考试结束
	sumbitPaper(true);
}


//时间戳转格式字符串
function timeStamp2String(time){  
    var datetime = new Date();  
    datetime.setTime(time);  
    var year = datetime.getFullYear();  
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;  
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();  
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();  
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();  
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();  
    return year + "-" + month + "-" + date +" "+hour+":"+minute+":"+second;  
}


var isSubmit = false;
function sumbitPaper(isTimeOver){
	var questions = $("div.question");
	var cache = null;
	var paper = {};
	paper.questions = [];
	paper.examId =Number(eid);
	paper.examPlanId = Number(paid);
	paper.examEnd = new Date().getTime();
	paper.examStart = examStart;
	
	var isNullUserAnswer=false;
	
	for(var i = 0; i < questions.length; i++){
		cache =  $(questions[i]).data("info");
		if(!cache) continue;
		cache =  JSON.parse($(questions[i]).data("info"));
		
		var as = $(questions[i]).find(".optionlist label");//所有答案
		
		
		var ass = []; // 多个回答
		for(var j=0;j<as.length;j++){
			if($(as[j]).find("span.checked").length != 1 && $(as[j]).find(":checkbox:checked").length != 1) continue; 
			var ua = $(as[j]).find("[name='option-content']").html();
			var reg = /<img[^>]+>/g;
			ua = ua.replace(reg,function(t){
				if(t.charAt(t.length -2) != '/'){
					return t.substr(0,t.length-1) + '/' +t.charAt(t.length-1);
				}
			});
			ass.push(ua);
		}
		cache.userAnswer = ass;
		if(ass.length==0){
			$(questions[i]).removeClass('yellow').addClass('red');
			isNullUserAnswer=true;
		} else {
			$(questions[i]).removeClass('red').addClass('yellow');
		}
		if(mode=='Z'){
			var conObj = JSON.parse(cache.content.value);
			var tempCache={};
			tempCache.id=cache.id;
			tempCache.type=cache.type;
			tempCache.title=conObj.title;
			tempCache.answer=conObj.answer;
			tempCache.options=conObj.options;
			tempCache.difficulty=cache.difficulty;
			tempCache.userAnswer=cache.userAnswer;
			tempCache.explanation=conObj.explanation;
			cache=tempCache;
		}
		paper.questions.push(cache);
	}
	if(!isNullUserAnswer || isTimeOver){
		// 提交数据
		if(isTimeOver){
			for(var m=0;m<paper.questions.length;m++){
				if(paper.questions[m].userAnswer.length==0){
					paper.questions[m].userAnswer.push(" ");
				}
			}
		}
		if(!isSubmit){
			isSubmit=true;
			$.post("jv/exam/examperson.do",{data : JSON.stringify(paper) },function(data){
				showJumpMsg("交卷完成！",5,toStaffExamList);
			});
		}
		
	}else{
		showMsg("题目未做完！");
	}
	
	
}

function toStaffExamList(){
	window.location.href = "../views/staffExamList.jsp";
}


function PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}


$("[type=radio]").live("click",function(){
	var name = $(this).attr("name")
	var groups = $("[type=radio][name="+ name +"]");
	for(var i=0 ; i< groups.length; i++){
		$(groups[i]).parent().removeClass("checked");
	}
	var span = $(this).parent();
	span.toggleClass("checked");
});


function change(opt){
	var current = $(".question:visible");// 当前题目
	if(opt==1){// 下一题
		var next = current.next(".question");
		if(next.length != 1) return; // 没有下一题
		current.hide();
		next.show();
		if(next.next(".question").length == 0){ // 最后一题
			$(".down").attr("disabled","disabled");
			$(".up").removeAttr("disabled")
			return;
		}
	}else{ // 上一题
		var prev = current.prev(".question");
		if(prev.length != 1) return; // 没有上一题
		current.hide();
		prev.show();
		if(prev.prev(".question").length == 0){ // 第一题
			$(".up").attr("disabled","disabled");
			$(".down").removeAttr("disabled")
			return;
		}
	}
	$(".up").removeAttr("disabled");
	$(".down").removeAttr("disabled");
}





window.document.oncontextmenu = function(){
	return false
}

window.document.onkeydown = function(){  
	event.returnValue=false; 
}  






