function viewDetail(id) {
    window.location.href="../views/staffExamResult.jsp?eid=" + id;
}
function exam(args) {
	post("../views/staffExam.jsp",JSON.parse(args));
}

function loadData(){
	var name = $("[name=name]").val();
	var args = {};
	if(name){
		args.name = name;
	}
	
	$.get("jv/exam/liststudent.do",args,function(data){
		var obj = null;
		var list = $(".list-plan");
		list.html("");
		var html = null;
		var state = null;
		var option  = null;
		var color = null;
		
		if(data.error){
   	    	showMsg(err.error.message);
   	    	return;
		}

		
		for(var i = 0 ; i < data.length ; i++){
			obj = data[i];
//			console.debug(obj)
			color = "state-close";
			switch(obj.state){
			   case 'Q': state = '缺考';
			       option = "已过期";
			       break;
			   case 'D': state = '待考';
			   	   var start = Date.parse(obj.examStart.replace(/\s/, 'T'));
			   	   var end = Date.parse(obj.examEnd.replace(/\s/, 'T'));
			   	   if(start <= new Date() && end>= new Date()){// 前往考试 
			   		   color = "state-active";
			   		   var args = {pid:obj.examPaper,eid:obj.examId,paid:obj.examPlanId,duration:obj.duration};
			   		   option  = "<a onclick='exam(\""+ (JSON.stringify(args).replace(/"/g,"\\\"")) +"\")'>前往考试</a>";
			   	   }else if(end < new Date()){
			   		   option = "已过期";
			   	   }else if(start > new Date()){ // 未开始
			   		   option  = '未开始'
			   	   }
			       break;
			   case 'Y': state = '已考';
			   	   try{
			   		   var publicModel = JSON.parse(obj.exam_answer_publish.value);
			   		   switch(publicModel.mode){
			   		      case 'no' :
			   		    	  option = "<a>不发布</a>";
			   		    	  break;
			   		      case 'delay' : 
			   		    	  var current = new Date();
			   		    	  var endTime = Date.parse(obj.examEnd.replace(/\s/, 'T'));
			   		    	  var delayDuration = publicModel.delayDuration; // 延迟发布时间(分)
			   		    	  if((endTime.getTime() + delayDuration * 24 * 60 * 60 * 1000) < current.getTime()){
			   		    		color = "state-active";
				   		        option = "<a onclick='viewDetail("+ obj.examId +")'>查看详情</a>";
			   		    	  }else{
			   		    		  option = "<a>待发布</a>";
			   		    	  }
			   		    	  break;
			   		      case 'immediately' :
			   		    	  color = "state-active";
			   		          option = "<a onclick='viewDetail("+ obj.examId +")'>查看详情</a>";
			   		    	  break;
			   		      default : 
			   		    	  color = "state-active";
			   		    	  option = "<a onclick='viewDetail("+ obj.examId +")'>查看详情</a>";
			   		   }
			   	   }catch(e){
			   		   color = "state-active";
			   		   option = "<a onclick='viewDetail("+ obj.examId +")'>查看详情</a>";
			   	   }
			       break;
			   case 'K': state = '考试中';
			       
			       break;
			}
			
			
			html = 
				'<div class="portlet-body" id="myPortetBody1">'
				    +'<h5>'+ obj.name +'</h5>'
				    +'<p class="subject" style="text-indent:0">'+ obj.examStart +'</p>'
	                +'<p class="subject" style="text-indent:0">'+ obj.duration +'分钟</p>'
					+'<p id="mystate">'+ state +'</p>'
					+'<p id="mySeloperation" class="'+ color +'">'+ option +'</p>'
				+'</div>';
			list.append(html);
		}
	});
}

$(function(){
	loadData();
	
	$(".btn-serach").click(function(){
		loadData();
	})
})





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





