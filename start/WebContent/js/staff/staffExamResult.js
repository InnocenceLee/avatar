
// exam id
var id = window.location.href.match(/eid=\d+/)[0].split("=")[1];

var resizeExamPaper = function () {
	$('.list').css('overflow-y', 'auto');
	$('.list').height($(window).height() - 209);
}

$(function(){
	App.init();
	loadData(); // 加载考试结果信息
	reExamAble(); // 判断能否重考
	resizeExamPaper();
})

$(window).resize(function () {
	resizeExamPaper();
});

function loadData(){
	$.get("jv/exam/exampapercontent.do?id=" + id,function(data){
//		console.debug(data);
		handle(data);
	});
}


function handle(examRs){
	$(".begintime").text("开始作答时间：" + (timeStamp2String(examRs.examStart)));
	$(".endtime").text("结束作答时间：" + (timeStamp2String(examRs.examEnd)));
	$(".myScoreSpan").text("总分：" + examRs.examScore);
	var list = $(".list");
	var questions = JSON.parse(examRs.examPaperContent.value).questions;
	
	for(var i=0 ; i < questions.length; i++){
		var obj = questions[i];
//		console.debug(obj)
		var userAnswer = obj.userAnswer;
		var answer = obj.answer;
		var options = obj.options;
		var rights = "";
		var isRight = false;
		
		
		if(userAnswer.length == answer.length){
			for(var n = 0 ; n < userAnswer.length; n++){ // 考试选中的答案
				var end = false;
				for(var m = 0 ; m < answer.length; m++){ // 正确答案
					if(answer[m].indexOf(userAnswer[n]) != -1 && userAnswer[n].indexOf(answer[m]) != -1){ // 正确的选项 
						isRight = true;
						break;
					}
					if(m==answer.length-1){
						isRight = false;
						end = true;
					}
				}
				if(end){
					break;
				}
			}
		}else{
			isRight = false;
		}
			
		
	    var html = 
			'<div class="portlet box yellow">'
			+'<div class="portlet-title">'
				+'<div class="caption">'+ (i+1) +'、'+ (obj.type == 'S' ? '单选题' : (obj.type=='M' ? '多选题' : '判断题')) +'</div>'
		        +'<span class="myeqmspan1">结果:<span class="myResultSpan1">'+ (isRight ? '正确' : '错误')  +'</span></span>'                             
			+'</div>'
			+'<div class="portlet-body">'
				+'<p class="subject">'
		        + obj.title       
				+'</p>'
				+'<div class="control-group">'
					+'<div class="controls">';
						for(var j = 0 ; j < options.length; j++){ // 全部选项
							var right = false;
							for(var k = 0 ; k < userAnswer.length; k++){ // 考试选中的答案
								if(options[j].indexOf(userAnswer[k]) != -1 && userAnswer[k].indexOf(options[j]) !=-1){
									right = true;
									break;
								} 
							}
							var no = String.fromCharCode(65 + j);
							
							
							for(var s = 0 ; s < answer.length; s++){ // 正确答案
								if(options[j] == answer[s]){
									rights += no + " ";
									break;
								} 
							}
							
							
							html += 
							'<label class="radio line">'
							+'<div class="radio"><span class="'+ (right?'checked':'') +'"><input type="radio" name="optionsRadios'+ new Date().getTime() +'" value="option2" checked="'+ (right?'checked':'') +'"></span></div>'
							+ no + '、' + options[j]
							+'</label>' ;
						}
					html += '</div>'
				+'</div>'		
				+'<p class="subject">正确答案：'+ rights +'</p>'
				+'<p class="subject">解析：'+ obj.explanation +'</p>'
			+'</div>'
		  +'</div>';
		 			
		 list.append(html);		
	}
  
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

var args = null
function reExamAble(){
	$.get("jv/exam/reExamAble.do?eid=" + id,function(data){
		if(!data) return;
		args = {pid:data.pid,eid:data.eid,paid:data.paid,duration:data.duration};
		$(".re-exam").show();
	});
}

function exam() {
	post("../views/staffExam.jsp",args);
}

function post(url, params) {
    var temp = document.createElement("form");
    temp.action = url;
    temp.method = "post";
    temp.target = '_blank';
    temp.style.display = "none";
    for (var x in params) {
        var opt = document.createElement("input");
        $(opt).attr("name",x);
        $(opt).attr("value",params[x]);
        temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    temp.submit();
    return temp;
}


