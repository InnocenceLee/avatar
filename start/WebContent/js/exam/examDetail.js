
var examId = window.location.href.match(/id=\d+/)[0].split("=")[1];
$(function(){
	var obj = new Object();
	obj.id = Number(examId);
	obj.page = 1;
	obj.size = 20;
	
	// 人员信息
	var stds = $("[name=students]");
    var students = [];
    for(var i = 0; i < stds.length; i++){
    	students.push(parseInt($(stds[i]).val()));
    }
	examPersontableAjax(1,obj.size,true,Number(obj.id),students,"","","","examPersontableAjax",false);
	
	// 题型占比统计
	questionType($("[name=pid]").val());
	
	nodeTableAjax(Number(examId));
	// 分数分布图
	markBranch(examId);
	
});


/* 机构统计信息Ajax  */
function nodeTableAjax(planId){
    $.get("jv/exam/examnodestatistic.do",{id:planId},function(data){
	    console.log("统计信息："+data);
    	data = JSON.parse(data);
    	
    	// 按部门统计数据
    	examNodeStatistic(data);
    	
    	if(!data) return; 
		$("#nodeList_tbody").text("");
		var strTemp = "";
	    for(var i=0;i<data.length;i++){
			strTemp = strTemp + 
			"<tr class='odd gradeX'>" 
			+"<td>"+data[i].nodeName+"</td>" 
			+"<td >"+data[i].data.studentsNum+"</td>" 
			+"<td>"+data[i].data.endNum+"</td>" 
			+"<td>"+data[i].data.passNum+"</td>" 
			+"<td>"+data[i].data.unPassNum+"</td>" 
			+"<td>"+data[i].data.maxNum+"</td>" 
			+"<td>"+data[i].data.minNum+"</td>" 
			+"<td>"+data[i].data.avgNum+"</td>"
			+"</tr>";
	    }
	    $("#nodeList_tbody").html(strTemp);
    });
   
}




//时间戳转格式字符串
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



function questionType(pid){
	// 题型占比 （饼图）
    $.ajax({
		  url: "jv/examPaper/list.do?id=" + pid,
		  async: false,
		  success : function(data){
			  data = JSON.parse(data).data[0];
			  
			  var nums = JSON.parse(data.quesions_num.value);
			    /*饼图*/
			    var myChart = echarts.init(document.getElementById('mychart1'));
			    myChart.setOption({
			        series : [
			            {
			                name: '访问来源',
			                type: 'pie',
			                radius: '55%',
			                data:[
			                    {value:nums.single_choice, name:'单选题'},
			                    {value:nums.multiple_choice, name:'多选题'},
			                    {value:nums.judge, name:'判断题'}
			                ]
			            }
			        ]
			    })
			 
		  }
	});
	
}



// 根据部门统计数据
function examNodeStatistic(data){
	var myChart = echarts.init(document.getElementById('main'));
	var nodes = ['市场部','人力部'];  // 部门名称
	var shoulds = [28,17]; // 应参考人数
	var reals = [27,17]; //　　实际参考人数
	var pass = [26,10]; //　　通过人数
	var passRate = [96,87];   // 及格率
	
	
	var obj = null;
	var rate = null
	try{
		if(data){
			for(var i = 0 ; i < data.length ; i++){
				obj = data[i];
				nodes.push(obj.nodeName); 
				shoulds.push(obj.data.studentsNum); 
				reals.push(obj.data.endNum);
				pass.push(obj.data.passNum);
				rate = obj.data.endNum ? (obj.data.passNum/obj.data.endNum).toFixed(2) : 0;
					
				passRate.push(rate);
			}
		}
	}catch(e){
		console.log("统计数据出错");
		showMsg("统计数据出错");
	}
	
	var option = {
		       tooltip : {
		           trigger: 'axis',
		           axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		               type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		           }
		       },
		       legend: {
		           data:['应参考人数','实际参考人数','及格人数','及格率']
		       },
		       grid: {
		           left: '3%',
		           right: '4%',
		           bottom: '3%',
		           containLabel: true
		       },
		       xAxis : [
		           {
		               type : 'category',
		               data : nodes
		           }
		       ],
		       yAxis : [
		           {
		               type : 'value',
		               min: 0
		           },
		           {
		               type: 'value',
		               name: '及格率',
		               min: 0,
		               max: 100,
		               interval: 20,
		           }
		       ],
		       series : [
		           {
		               color : ['#FF7F57'],
		               name : '应参考人数',
		               type : 'bar',
		               data : shoulds
		           },
		           {
		               color:['#91D2F5'],
		               name:'实际参考人数',
		               type:'bar',
		               data: reals
		           },
		          {
		              color: ['#DF6FD4'],
		               name:'及格人数',
		               type:'bar',
		               data : pass
		           },
		           {
		               color: ['#1ACF43'],
		               name:'及格率',
		               type:'bar',
		               data:passRate
		           },
		       ]
		   }
	
	   myChart.setOption(option);
}


function markBranch(planId){
	$.get("jv/exam/examscorestatistic.do",{id:planId},function(data){
		data =  JSON.parse(data);
		
		var myChart = echarts.init(document.getElementById('chart'));
		var marks = [];
		marks.push((data.lessHundredTwenty/data.personNum).toFixed(2));
		marks.push((data.lessHundred).toFixed(2));
		marks.push((data.lessNinety).toFixed(2));
		marks.push((data.lessEighty).toFixed(2));
		marks.push((data.lessSeventy).toFixed(2));
		marks.push((data.lessSixty).toFixed(2));
		marks.push((data.lessFifty).toFixed(2));
		marks.push((data.lessForty).toFixed(2));
		marks.push((data.lessThirty).toFixed(2));
		
		
	    // 指定图表的配置项和数据
	    var option = {
	        title: {
	            text: '各分数段分布统计'
	        },
	        color: ['#4880BC'],
	        tooltip : {
	            trigger: 'axis',
	            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	            }
	        },
	        grid: {
	            left: '3%',
	            right: '4%',
	            bottom: '3%',
	            containLabel: true
	        },
	        xAxis : [
	            {
	                type : 'category',
	                data : ['120-100', '99-90', '89-80', '79-70', '69-60', '59-50', '49-40','39-30','30以下'],
	                 axisTick: {
	                    alignWithLabel: true
	                }
	            }
	        ],
	        yAxis : [
	            {
	                type : 'value',              
	                min: 0,
	                max: 30,
	                interval: 5,
	                axisLabel: {
	                    formatter: '{value} %'
	                }
	            }
	        ],
	        series : [
	            {
	                name:'直接访问',
	                type:'bar',
	                barWidth: '40%',
	                data : marks
	            }
	        ]
	    };

	    // 使用刚指定的配置项和数据显示图表。
	    myChart.setOption(option);
	});
}


/*  参考人员Ajax  */
function examPersontableAjax(page,maxVisible,bFlag,planId,students,personId,personName,nodeName,modelName,searchFlag){
	
	personId = $("#uid").val();
	personName = $("#uname").val();
	nodeName = $("#node").val();
	
	// 人员信息
	var stds = $("[name=students]");
    var students = [];
    for(var i = 0; i < stds.length; i++){
    	students.push(parseInt($(stds[i]).val()));
    }
	var obj = {'page':page,'size':maxVisible,'planId':planId,'students':students,'personId':personId,'personName':personName,'nodeName':nodeName};
	var strDate = JSON.stringify(obj);
	$http.ajax({
		isModal : false,
		  url: "jv/exam/examperson.do",
		  async: false,
		  type:'get',
		  traditional:true,
		  data :{'data':strDate},
		  success : function(data){
			  //console.log(data);
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
//			  console.log(JSON.stringify(data));
			 var body =  $("#notifyPerson_table");
			 body.html("");
			 for(var i=0 ; i < data.length;i++ ){
				 var html =                               
					 '<tr class="odd gradeX">'
		                 +'<td><input type="checkbox" class="checkboxes" name="notifyPersonCheck" value="1" /></td>'
		                 +'<td>'+ checkUndifend(data[i].person_no) +'</td>'
		                 +'<td>'+ checkUndifend(data[i].personName) +'</td>'
		                 +'<td class="hidden-480">'+ checkUndifend(data[i].nodeName) +'</td>'                               
		             +'</tr>';
				 body.append(html);
			 }

			 if(searchFlag){
			            	$t.using('tableAjax').reset(totleNum);
			            	$("#page-count").html(totleNum);
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


function serach(){
	var personId = $("#uid").val();
	var personName = $("#uname").val();
	var nodeName = $("#node").val();
	
	// 人员信息
	var stds = $("[name=students]");
    var students = [];
    for(var i = 0; i < stds.length; i++){
    	students.push(parseInt($(stds[i]).val()));
    }
	examPersontableAjax(1,20,true,Number(examId),students,personId,personName,nodeName,"examPersontableAjax",true);
}


function downscore(){
	var value  = $('input[name="scoreCheck"]:checked').val();

			$('#form2').ajaxSubmit({  
				dataType: 'text',
				error: errorMsg,
				data: "type="+value
			}); 
	     	function errorMsg(){ 
			alert("导出excel出错！");    
		  }

}


