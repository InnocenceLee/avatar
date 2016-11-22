/**
 * 
 */

//modify by  20160718
var pageIndex;
var totleNum = 0;
//每段的页码数量
var maxVisible = 1000;

//课程 ID
var id = 0;
//学员选学课程表ID
var trainStudentLearnCourseId = 0;



/* 创建div*/
function addDiv(data){
	//$("#lessonContent").text("");
	var strTemp = "<h4 class='media-heading myKnowtitle'>课时内容</h4>";
	var num = 1;
	var lessonOrder = 'M';
	if(data[0]){
		if(data[0].lessonOrder == 'S'){
			lessonOrder = 'S';
		}
	}
	
    for(var i=0;i<data.length;i++){
    	data[i].trainTime = parseFloat(data[i].trainTime) || 0;
    	trainMinute = Math.floor(data[i].trainTime / 1000 / 60);
    	trainSecond = Math.floor(data[i].trainTime / 1000 % 60);
    	var tr1 = $("<div class='portlet-body myscdportlet'></div>");
    	var tr2 = "<h5>"+num +". "+ data[i].name+"</h5>" +
    			"<input type='text'style='display:none' value="+data[i].id+"/>" +
    			"<input type='text'style='display:none' value="+data[i].avoid+"/>" +
    			"<input type='text'style='display:none' value="+data[i].idleDuration+"/>" +
    			"<input type='text'style='display:none' value="+data[i].train_course_lesson+"/>" +
    			"<p class='subject'>时长："+(data[i].duration || 0)+"分钟<span style='display: inline-block; width: 40px;'></span>已学习时间："+ trainMinute +"分钟" + trainSecond + "秒&#12288;&#12288;" +
    			"<p class='subject span9' style='word-wrap: break-word;'>"+(data[i].introduction || '')+"</p>";
    	if(data[i].type == 'E'){
    		var obj = data[i];
    		var args = {fileName:obj.filename,dragFlag:obj.dragFlag,avoid:obj.avoid,duration: obj.duration,idleDuration:obj.idleDuration,train_course_lesson:obj.train_course_lesson};
//    		if(lessonOrder == 'S'){
        		if(data[i].leanrLessonType){
        			if(data[i].leanrLessonType == 'M'){// 没完成
                		tr2 += "<button class='btn blue myscdbtn' onclick='study(\""+  (JSON.stringify(args).replace(/"/g,"\\\"")) +"\")'>立即学习</button>";
            		} else if(data[i].leanrLessonType == 'L'){// 立即评价
            			var args = {fileName:obj.filename,dragFlag:obj.dragFlag,avoid:obj.avoid,idleDuration:obj.idleDuration,train_course_lesson:obj.train_course_lesson,opt:'l'};
            			/*tr2 += "<button class='btn blue myscdbtn'>立即评价</button>";*/
                		tr2 += "<button class='btn blue myscdbtn' onclick='study(\""+  (JSON.stringify(args).replace(/"/g,"\\\"")) +"\")'>温故而知新</button>";
            		} else if(data[i].leanrLessonType == 'W'){//温故
            			var args = {fileName:obj.filename,dragFlag:obj.dragFlag,avoid:obj.avoid,idleDuration:obj.idleDuration,train_course_lesson:obj.train_course_lesson,opt:'v'};
                		tr2 += "<button class='btn blue myscdbtn' onclick='study(\""+  (JSON.stringify(args).replace(/"/g,"\\\"")) +"\")'>温故而知新</button>";
            		} else {
            			tr2 += "<button class='btn blue myscdbtn' onclick='study(\""+  (JSON.stringify(args).replace(/"/g,"\\\"")) +"\")'>温故而知新</button>";
            		}
        		} else {
        			tr2 += '';
        		}
//    		}
    		
//    		tr2 += "<button class='btn blue myscdbtn' onclick='study(\""+  (JSON.stringify(args).replace(/"/g,"\\\"")) +"\")'>立即学习</button>";
    	}else if(data[i].type == 'X'){
    		var obj = data[i];
    		var args = {paid:obj.examPaper,eid:obj.examId,duration:obj.duration};
    		
//    		if(lessonOrder == 'S'){
        		if(data[i].leanrLessonType){
        			if(data[i].leanrLessonType == 'M'){// 没完成
        				tr2 += "<button class='btn blue myscdbtn' onclick='exam(\""+ (JSON.stringify(args).replace(/"/g,"\\\"")) +"\")'>前往考试</button>";
            		} else 
            		if(data[i].leanrLessonType == 'C'){// 重考
            			tr2 += "<button class='btn blue myscdbtn' onclick='exam(\""+ (JSON.stringify(args).replace(/"/g,"\\\"")) +"\")'>重考</button>";
            		} else {
            			tr2 += '';
            		}
        		} else {
        			tr2 += '';
        		}
//    		}
    		
//    		tr2 += "<button class='btn blue myscdbtn' onclick='exam(\""+ (JSON.stringify(args).replace(/"/g,"\\\"")) +"\")'>前往考试</button>";
    	}
    	tr2 = $(tr2);
    	tr1.append(tr2);
    	$("#lessonContent").append(tr1);
		/*strTemp = strTemp + 
		$("<div class='portlet-body myscdportlet'><h5>"+data[i].name+"</h5>") +
		$("<input type='text'style='display:none' value=")+data[i].id+$("/>")+
		$("<p class='subject'>时长：分钟&#12288;&#12288;")+
		$("<p class='subject'>"+data[i].introduction+"</p>")+
		$("<a href='views/staffStudy.jsp?s=n&id=")+data[i].id+$(" class='btn blue myscdbtn'>温故而知新</a>");*/
    }
/*	
    $('#lessonContent').html('').html(strTemp);*/
}




function readData(data){
	var Data = [];
	
	for(var i=0;i<data.length;i++){
		var item = data[i];
		if(item!=undefined){
			
			if(item.totleNum != undefined/*rid*/){
				totleNum = item.totleNum;
				
			}
			
			var tempData = {};
			tempData.courseId = item.courseId;
			tempData.dragFlag = item.dragFlag;
			tempData.avoid = item.avoidIdle.value.avoid;
			tempData.idleDuration = item.avoidIdle.value.idleDuration;
			tempData.sequence = item.sequence;
			tempData.duration = item.duration;
			tempData.filename = item.filename;
			tempData.coursewareId = item.coursewareId;
			tempData.train_course_lesson = item.train_course_lesson;
			tempData.name = item.name;
			tempData.id = item.id;
			tempData.type = item.type;
			tempData.introduction = item.introduction;
			tempData.examPaper = item.examPaper;
			tempData.lessonOrder = item.lessonOrder;
			tempData.leanrLessonType = item.leanrLessonType;
			tempData.trainTime = item.trainTime;
//			console.debug(item)
			//tempData.createdate = getLocalTime(item.createdate);
			
			switch(item.type)
			{
			case "E":
				tempData.typeName = "学习";
				break;
			case "R":
				tempData.typeName = "大课";
				break;
			case "M":
				tempData.typeName = "模拟机";
				break;
			case "X":
				tempData.typeName = "考试";
				break;
			default:
				break;
			}
			Data.push(tempData);
		}
	}
	return Data;
}

/* Ajax  */
function tableAjax(page,maxVisible,id){
	
	var obj = {'page':page,'size':maxVisible,'id':id,'trainStudentLearnCourseId':trainStudentLearnCourseId};
	var strDate = JSON.stringify(obj);
//	console.log("tableAjax参数： "+strDate);
	 $.ajax({
	        type: "get",
	        url: "jv/lesson/liststudent.do",
	        data: {
	       	 'data' : strDate
	        },
	        dataType: "json",
	        success: function(data){
	        	console.debug("<>"+data);
	        	data = JSON.parse(data);
	        	for(var i=0;i<data.length;i++){
	        		data[i].avoidIdle.value = JSON.parse(data[i].avoidIdle.value);
	        	}
	        	
	        	var tableData = readData(data);
	        	
	            addDiv(tableData);
	            
	        }
	    });
   
}



// 传文件路径
function study(args) {
	args = JSON.parse(args);
//    console.debug(args);
	var obj = {'studentLearnCourse':trainStudentLearnCourseId,
			'learnState':0,'lessonId':args.train_course_lesson,'trainTime':0,'type':"E"};
	var strDate = JSON.stringify(obj);
	console.log("opt:"+args.opt);
	if(args.opt != 'v' && args.opt != 'l'){
		$.ajax({
			url : 'jv/progress/updateLearnState.do',
			type : 'post',
			dataType: "json",
			data: {
		       	 'data' : strDate
		        },
			async : false,
			success : function(data){}
		});
	}
	//直接进入学习页面
	var param = {sId:trainStudentLearnCourseId,lId:args.train_course_lesson,cn:$.trim(args.fileName),s:args.dragFlag,duration: args.duration,i:args.idleDuration || 0,opt:args.opt};
	post("../../views/staffStudyDetail.jsp",param);
}


function exam(args){
	args = JSON.parse(args);
	var pid = null;
	$.ajax({
		url : 'jv/exam/courseDetail.do',
		data : {id:args.paid},
		async : false,
		success : function(data){
//			data = JSON.parse(data);
			args.pid = data.examPaper;
		}
	});
	post("../../views/staffExam.jsp",args);
}

function post(url, params) {
    var temp = document.createElement("form");
    temp.action = url;
    temp.method = "post";
    temp.target="_blank";
    temp.style.display = "none";
    for (var x in params) {
        var opt = document.createElement("input");
//        opt.name = x;
//        opt.value = params[x];
        $(opt).attr("name",x);
        $(opt).attr("value",params[x]);
        
        temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    temp.submit();
    return temp;
}