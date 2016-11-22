/**
 * Created by Administrator on 2016/7/11.
 */
	var nameErrMsg = "名称格式不正确";
	var nameRule = '/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/g';
	
	var durationErrMsg = '时长必须是有效数字';
	var durationRule = '/^([1-9][0-9]*)|(0\.[0-9]*[1-9])|([1-9][0-9]*\.[0-9]*[1-9])$/';
	var timesRule = '/^[1-9][0-9]*$/';
	var lessonIntroductionErrMsg = "描述不能为空";
	/**
	 * 新增数据校验说明
	 */
	/**
	 * 新增考试数据校验说明
	 */
	var dataUpdateExam = {
			data : [
			          // name考试名称
			          {
			        	  id : 'name',
			        	  msg : nameErrMsg,
			        	  rule : nameRule,
			        	  checkFun : 'checkStr'
			          },
			          // examStart考试开始时间	examEnd考试结束时间
			          {
			        	  id : {
			        		  startId : 'examStart',
			        		  endId : 'examEnd'
			        	  },
			        	  msg : '时间不正确',
			        	  checkFun : 'checkDateCompare',
			        	  type : 'date'
			          },
			          // examDuration考试时长
			          {
			        	  id : 'examDuration',
			        	  msg : durationErrMsg,
			        	  rule : durationRule,
			        	  checkFun : 'checkStr'
			          },
			          // passScore分数
			          {
			        	  id : 'passScore',
			        	  msg : "分数必须是数字",
			        	  rule : durationRule,
			        	  checkFun : 'checkStr'
			          },
			          // exmaNum考试次数
			          {
			        	  id : 'exmaNum',
			        	  msg : "考试次数必须是数字",
			        	  rule : timesRule,
			        	  checkFun : 'checkStr'
			          },
			          // examNotice考试须知
			          {
			        	  id : 'examNotice',
			        	  msg : "考试须知不能为空",
			        	  checkFun : 'checkStr'
			          }
			]
	}

//modify by lyh 20160718
var pageIndex;
var totleNum = 0;
//每段的页码数量
var maxVisible = 10;


//选中的试卷 对象
var choosePaperId = 0;
var choosePaper = {};

var personTempData=new Array();//人员列表
/* 创建table*/
function addTable(data,flag){
	switch(flag){
	case "paperList_tbody":
		
		$("#paperList_tbody").text("");
		var strTemp = "";
	    for(var i=0;i<data.data.length;i++){
			strTemp = strTemp + 
			"<tr><td><input type='radio' name='optionsRadios1' value='option1' /></td>" +
			"<td style='display:none'>"+data.data[i].id+"</td>" +
			"<td style='display:none'>"+data.data[i].mode+"</td>" +
			"<td style='display:none'>"+data.data[i].totle_score+"</td>" +
			"<td>"+data.data[i].name+"</td></tr>";
	    }
	    $('#paperList_tbody').html('').html(strTemp);
	    
		break;
	case "notifyPerson_table":
		
		$("#notifyPerson_table").text("");
		var strTemp = "";
	    for(var i=0;i<data.length;i++){
			strTemp = strTemp + 
			"<tr  class='odd gradeX'><td><input type='checkbox' NAME='notifyPersonCheck' class='checkboxes' /></td>" +
			"<td>"+data[i].id+"</td>" +
			"<td>"+data[i].name+"</td>" +
			"<td class='hidden-480'>"+ (data[i].nodeName || '') +"</td>" +
			"<td class='hidden-480 mylistSee'>删除</td></tr>";
	    }
	    $('#notifyPerson_table').html('').html(strTemp);
	    
		break;
	
	}
	
    
	
}


/* Ajax  */
function tableAjax(page,maxVisible,bFlag,name,modelName,searchFlag){
	var obj = {'page':page,'size':maxVisible,};
	var strDate = JSON.stringify(obj);
	//console.log("tableAjax参数： "+strDate);
	$http.ajax({
		isModal : false,
        type: "get",
        url: "jv/examPaper/listpassauditing.do",
        data: {
        	'start':page,
        	'size':maxVisible,
        	'name':name
        	},
        dataType: "json",
        success: function(data){
//        	console.log(data);
        	data = JSON.parse(data);
        	
        	totleNum = data.totalNum;
        	
        	if(data.data.length <= 0){
        		totleNum = 0;
        	}
        	
            addTable(data,"paperList_tbody");
            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
        	if(searchFlag){
            	$t.using('tableAjax').reset(totleNum);
            } else if(bFlag){
            	//UIGeneral.init(page,totleNum,maxVisible,modelName);
            	
        	    /* 分页   */
    	        /*使用方法*/
                $t.using('tableAjax').init({
			    	 maxPage:totleNum,
			    	 name:name,
			    	 modelName:modelName,
			    	 maxVisible:maxVisible
		            
   	 	        }); 

            }
            
        }
    });
   
}


$(document).ready(function(){
    App.init();

   
});
    

$(function() {
	  //清除弹框内容  
	 $(".clean-data").click(function(){
		 $(".Bomb-box").html("");
		 $(".Bomb-box").val("");
	 })

	 // 添加           
	$("#addPaperBtn").click(function(){
		   
        var dataTemp = document.getElementsByName('optionsRadios1');
	    for(var i = 0; i <dataTemp.length; i++){
	      if(dataTemp[i].checked){
	    	  selectedTr = dataTemp[i].parentNode.parentNode;
	     	    if (selectedTr != null) {
	     	    	var tempData = {};
	     	    	
	     	    	choosePaperId = Number(selectedTr.cells[1].innerText);
	     	    	choosePaper.mode = selectedTr.cells[2].innerText;
	     	        
	     	    	 $("#choosePaperName").val(selectedTr.cells[4].innerText); 
	     	    	$("#choosePaperScroe").val(selectedTr.cells[3].innerText); 
	     	    	
	     			//courseDataTemp.push(tempData);
	     	    }
	     	    else {
	     	    	 alert("请选择一行");
	     	    }
	      	}
	     }
		
		$('#myeaModal').modal('hide');
	})
	
	
		 // 添加         
 	$("#addPersonBtn").click(function(){
 		var dataTemp = getAddPersonTableData();
 		console.log('新添的'+dataTemp);
 		var oldData = getOldPersonTableData();
 		console.log('原有的'+dataTemp);
 		for(var i =0;i<oldData.length;i++){
 			dataTemp.push(oldData[i]);
 		}
 		
 		addPersonTable(dataTemp,"notifyPerson_table");
 		
 		$('#myamModal').modal('hide');
	})
	
	
	
	//baocun fenzu
	  $("#saveGroupBtn").click(function(){
		  var groupName = $.trim($("#groupName").val());
		  if(groupName == ""){
			  alert("请输入分组名称");
		  }
		  var personIds = getNotifyPersonTableData;
/*		  var ids = "";
		  for(var i=0;i<personIds.length;i++){
			  ids += personIds[i].value;
		  }*/
		  saveGroup(groupName,personIds);
	    $('#myGroupingModal').modal('hide');
	 })
	 
	 
	
});



/*点击选择试卷按钮*/

function cPaper(obj) {
    tableAjax(1,99999,true,"","examPaperList",false);
}
/**
 * 试卷搜索
 */
function searchPaper(obj) {
	//alert("dsaddf");
	var searchExamPaperName = $.trim($("#searchExamPaperName").val());
	tableAjax(1,maxVisible,true,searchExamPaperName,"examPaperList",true);
}


//获取已经有的人员信息
function getOldPersonTableData(){

	 var tableDataTemp = [];
	 
	 var dataTemp = document.getElementsByName('notifyPersonCheck');
	    for(var i = 0; i < dataTemp.length; i++){
	     	 var selectedTr = dataTemp[i].parentNode.parentNode;
	     	    if (selectedTr != null) {	     	    	
	     			var tempData = {};
	     			tempData.id = Number(selectedTr.cells[1].innerText);
	     			tempData.name = selectedTr.cells[2].innerText;
	     			tempData.node = selectedTr.cells[3].innerText;
	     	    	
	     	    	tableDataTemp.push(tempData);
	     	    }
	     	 
	     	    else {
	     	    	 alert("请选择一行");
	     	    }
	     }
	return tableDataTemp;	
}


//获取当前列表中的数据
function getNotifyPersonTableData(){
	 var tableDataTemp = [];
	 var dataTemp = document.getElementsByName('notifyPersonCheck');
	    for(var i = 0; i < dataTemp.length; i++){
	     	var selectedTr = dataTemp[i].parentNode.parentNode;
     	    if (selectedTr != null) {	     	    	
     	    	var id = Number(selectedTr.cells[1].innerText);
     	    	tableDataTemp.push(id);
     	    }else {
     	    	 alert("请选择一行");
     	    }
	     }
	return tableDataTemp;	
}


//获取当前通知方式
function getNotifyTypeData(){

	 var tableDataTemp = [];
	 
	 var dataTemp = document.getElementsByName('notifyType');
	    for(var i = 0; i < dataTemp.length; i++){
	    	var type = dataTemp[i].value;
	    	tableDataTemp.push(type);
	     }
/*	console.log("输出tableDataTemp");
	console.log(JSON.stringify(tableDataTemp));
	console.log("end");*/
	return tableDataTemp;	
}





/*点击选择试卷按钮*/

function saveExam(obj) {

	var name= $.trim($("#name").val());
	var examStart= $.trim($("#examStart").val());
	var examEnd= $.trim($("#examEnd").val());
	var examClassifications= $.trim($("#examClassifications").val());
	var examType= $.trim($("#examType").val());
	var passScore= $.trim($("#passScore").val());
	var exmaNum= $.trim($("#exmaNum").val());
	var examAnswerPublish= $.trim($("#examAnswerPublish").val());
	var paperMode= $.trim($("#paper_mode").val());
	var randomOrder= $.trim($("#randomOrder").val());
	var totleScore= $.trim($("#choosePaperScroe").val());
	var examNotice= $.trim($("#examNotice").val());
	var examDuration= $.trim($("#examDuration").val());
	var examPaper = choosePaperId;
	
	// 调用数据校验
	var isPass = checkData(dataUpdateExam);
	// 判断校验是否成功
	if(!isPass){
		return;
	}
	
	/*if ( (name == "")||(examStart=="")||(examEnd == "")||(passScore=="")||
			(examNotice=="")||(exmaNum == "")||(examAnswerPublish=="")){
		alert("请填写完信息");
		return false;
	}*/
	
	if("O" != paperMode ){
		paper_mode = "F";
	}
	
/*	if("delay" == examAnswerPublish){
		
	}
	else if("immediately" == examAnswerPublish){
		
	}*/
	
	if("Y" == randomOrder){
		
	}
	
	var examAnswerPublish = {
		mode : examAnswerPublish,
		delayDuration : $("#myDelayed input[type=text]:visible").val() || ''
	};
	//当前课时表中的数据
	var students = getAllPerson();
//	console.log(students);
	if(students.length <= 0){
		alert("请选择人员");
		return false;
	}
	
	var examData = {};
	
	//填写考试
	examData.name = name;
	examData.examStart = examStart;
	examData.students = students;
	examData.randomOrder = randomOrder;
	examData.examAnswerPublish = examAnswerPublish;
	examData.paperMode = paperMode;
	examData.examEnd = examEnd;
	examData.examClassifications = examClassifications;
	examData.examType = examType;
	examData.passScore = Number(passScore);
	examData.paperMode = paperMode;
	examData.examNum = Number(exmaNum);
	examData.examNotice = examNotice;
	examData.examPaper = examPaper;
	examData.examPaperContent = choosePaper;
	examData.id = Number(id);
	examData.duration = parseFloat(examDuration);


	var strDate = JSON.stringify(examData);

	$http.ajax({
		isModal : false,
        type: "POST",
        url: "jv/exam/update.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
        	//alert(data);
//        	console.log(data);
        	var notifyMode = getNotifyTypeData();
        	if(notifyMode.length > 0){
            	var title= "考试通知";
            	var content= "内容";
//            	console.log("考试通知参数： title+"+title +"  content:" + content+"  receiver:" + students +"views/examList.jsp");
            	notifyPerson(notifyMode,title,content,students,"../../../views/examList.jsp");
        	}
        	else{
        		window.location.href="../../../views/examList.jsp";
        	}

        }
    });
    
}

function getAllPerson(){
	var studentIds=[];
	for(var i=0;i<personTempData.length;i++){
		studentIds.push(personTempData[i].id);
	}
	return studentIds;
}


/*得到选中的值*/
function modify(obj) {
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
        //console.log("selectedTr不为NULL");
        //console.log(selectedTr.rowIndex);
        //console.log(selectedTr.cells[1].innerText); //获取的方法一 
        var id = selectedTr.cells[1].innerText;
        //window.location.href="jv/course/detail.do?id="+id;
    }
    else {
        alert("请选择一行");
    }
    window.location.href="../../../views/examUpdate.jsp";
}


/*得到选中的值*/
function exit(obj) {
    window.location.href="../../../views/examList.jsp";
}



function notifyPeople(obj){
//	   groupNameTableAjax(1,addPersonMaxVisible,true,"groupName");
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


/*得到选中的值*/
function del(obj) {
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
        var id = selectedTr.cells[1].innerText;
    	var obj = [{'id':id}];
    	var strDate = JSON.stringify(obj);
    	
		$.ajax({
	 	    type: "post",
	 	    url: "jv/course/del.do",
	 	    data : {'data' : strDate},
	 	    dataType: "json",
	         success: function(data){
	        	 tableAjax();
	             $('#myDelModal').modal('hide')
	          }
	 	    })
    }
    else {
        alert("请选择一行");
    }
}



var id = window.location.href.match(/id=\d+/)[0].split("=")[1];
$(function(){
	// 获取url 上的id  /start/views/examUpdate.jsp?id=6
	var obj = new Object();
	obj.id = id;
	obj.page = 1;
	obj.size = 1;
	// 试卷信息
    $.ajax({
		  url: "jv/examPaper/list.do?id=" + $("[name=pid]").val(),
		  async: false,
		  success : function(data){
			  data = JSON.parse(data).data[0];
			  $("#choosePaperName").val(data.name);
			  $("#choosePaperScroe").val(data.totle_score);
//			  console.debug(data);
			  choosePaperId = data.id;
			  choosePaper.mode = data.mode;
		  }
	});
    // 人员信息
    var stds = $("[name=students]");
    var students = [];
    for(var i = 0; i < stds.length; i++){
    	students.push($(stds[i]).val());
    }
    examPersontableAjax(1,maxVisible,true,Number(id),students,"","","","examPersontableAjax",false);
    
    var paramObj = {'page':1,'size':99999,'planId':Number(id),'students':students};
	var convertParam = JSON.stringify(paramObj);
	$http.ajax({
		isModal : false,
		  url: "jv/exam/examperson.do",
		  async: false,
		  type:'get',
		  traditional:true,
		  data :{'data':convertParam},
		  success : function(data){
			 data = JSON.parse(data);
			 for(var i=0 ; i < data.length;i++ ){
				 personTempData.push({id:data[i].personId,name:data[i].personName,nodename:data[i].nodeName || '',username:data[i].person_no});
			 }
		 }
	});
});


$(".person-del").live("click",function(){
	var isDel = confirm("确认删除？");
	if(isDel){
		$(this).closest("tr").remove();
	}
});



/*  参考人员Ajax  */
function examPersontableAjax(page,maxVisible,bFlag,planId,students,personId,personName,nodeName,modelName,searchFlag){
	var obj = {'page':page,'size':99999,'planId':planId,'students':students,'personId':personId,'personName':personName,'nodeName':nodeName};
	var strDate = JSON.stringify(obj);
	//alert("tableAjax参数： "+strDate);
//	console.log("examPersontableAjax参数： "+strDate);
	$http.ajax({
		isModal : false,
		  url: "jv/exam/examperson.do",
		  async: false,
		  type:'get',
		  traditional:true,
		  data :{'data':strDate},
		  success : function(data){
//			  console.log("*"+data);
			  data = JSON.parse(data);
			  if(data.length <= 0){
				totleNum = 0;
			  }
			  for(var i=0;i<data.length;i++){
					var item = data[i];
					if(item!=undefined){
						if(item.totleNum != undefined/*rid*/){
							totleNum = item.totleNum;
						}
					}
			 }
			  
			 var body =  $("#notifyPerson_table");
			 body.html("");
			 for(var i=0 ; i < data.length;i++ ){
				 var html =                               
					 '<tr class="odd gradeX">'
		                 +'<td><input type="checkbox" class="checkboxes" name="notifyPersonCheck" value="1" /></td>'
		                 +'<td style="display:none">'+data[i].personId+'</td>'
		                 +'<td>'+ data[i].person_no +'</td>'
		                 +'<td>'+ data[i].personName +'</td>'
		                 +'<td class="hidden-480">'+ (data[i].nodeName || '') +'</td>'                               
		             +'</tr>';
				 body.append(html);
			 }

			 if(searchFlag){
			            	$t.using('tableAjax').reset(totleNum);
            } else if(bFlag){
	            	//UIGeneral.init(page,totleNum,maxVisible,modelName);
	            	
	        	    /* 分页   */
	    	        /*使用方法*/
	                $t.using('tableAjax').init({
				    	 maxPage:totleNum,
				    	 planId:planId,
				    	 students:students,
				    	 personId:personId,
				    	 personName:personName,
				    	 nodeName:nodeName,
				    	 modelName:modelName,
				    	 maxVisible:maxVisible
			            
	   	 	        }); 
	        	}
			 
		  }
	});
}


$("#delNotifyPersonBtn").click(function(){
	var data = [];
	var dataTemp = document.getElementsByName('notifyPersonCheck');
    for(var i = 0; i <dataTemp.length; i++){
    	selectedTr = dataTemp[i].parentNode.parentNode;
    	var temp = {};
  	    if (selectedTr != null) {
  	    	temp.id = Number(selectedTr.cells[1].innerText);
  	    	temp.username = selectedTr.cells[2].innerText;
  	    	temp.name = selectedTr.cells[3].innerText;
  	    	temp.nodename = selectedTr.cells[4].innerText;
  	    }
      if(dataTemp[i].checked){
    	  for(var m=0;m<personTempData.length;m++){
    		  if(personTempData[m].id==temp.id){
    			  personTempData.splice(m, 1);
    			  break;
    		  }
    	  }
      }else{
    	  data.push(temp);
      }
    }
    addPersonTable(data,"notifyPerson_table");
	
	
});
	

/*搜索人原*/
function searchExamPerson(obj) {
	var searchExamPersonId = $.trim($("#searchExamPersonId").val());
	var searchExamPersonName = $.trim($("#searchExamPersonName").val());
	var searchExamPersonNodeName = $.trim($("#searchExamPersonNodeName").val());
//	if( (searchCourseName == "") && (searchPersonID == "")&& (searchPersonNode == "")){
//		alert("请输入搜索条件");
//		return false;
//	}
}



// 时间戳转格式字符串
function timeStamp2String(time){  
    var datetime = new Date();  
    datetime.setTime(time);  
    var year = datetime.getFullYear();  
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;  
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();  
//    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();  
//    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();  
//    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();  
    return year + "-" + month + "-" + date ;//+" "+hour+":"+minute+":"+second;  
}  


/*成绩发布*/
/*var myDelayed = document.getElementById("myDelayed");
var examAnswerPublish = document.getElementById("examAnswerPublish");
examAnswerPublish.onchange = function (){
	var val = this.value;
	if(val == "delay"){
		 myDelayed.style.display = "block";
	}else{
		myDelayed.style.display = "none";
	}
}*/








