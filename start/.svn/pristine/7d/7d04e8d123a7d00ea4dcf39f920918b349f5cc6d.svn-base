/**
 * Created by lyh on 2016/720.
 */

//modify by lyh 20160718
var pageIndex;
var totleNum = 0;
//每段的页码数量
var maxVisible = 10;

/*课时与课时评价的切换*/
var myCdBtn1 = document.getElementById("myCdBtn1");
var myCdBtn2 = document.getElementById("myCdBtn2");
var myClassHour =document.getElementById("myClassHour");
var evaluation =document.getElementById("evaluation");



/* 创建table*/
function addTable(data,modelName){
	$("#courseDetailList_tbody").text("");
	var strTemp = "";
	var num = 0;
	if("courseDetailList" == modelName){
	    for(var i=0;i<data.length;i++){
	    	num = i+1;
			strTemp = strTemp + "<tr class='odd gradeX'><td>"+num+"</td><td style='display:none'>"+data[i].id+"</td><td>"+checkUndifend(data[i].name)+"</td><td class='hidden-480'>"+checkUndifend(data[i].typeName)+"</td><td class='center hidden-480'><span class='myToolong'>"+checkUndifend(data[i].introduction)+"</span></td><td></td><td><span class='mycaExamine' onclick='viewDetail(this)'> 查看 </span></td></tr>";
	    }
		var tbody=document.getElementById("courseDetailList_tbody");
	    $(tbody).html('');
	    $(tbody).html($(tbody).html() + strTemp);
	}
	else if("courseDetailComment" == modelName){
		
	}
}

//转换数据
function readData(data,modelName){
	var Data = [];
	if("courseDetailList" == modelName){
		for(var i=0;i<data.length;i++){
			var item = data[i];
			if(item!=undefined){
				
				if(item.totleNum != undefined/*rid*/){
					totleNum = item.totleNum;
					
				}
				
				var tempData = {};
				tempData.courseId = item.courseId;
				tempData.name = item.name;
				tempData.id = item.id;
				tempData.type = item.type;
				tempData.introduction = item.introduction;
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
	}
	else if("courseDetailComment" == modelName){
		
	}

/*	console.log("输出data");
	console.log(JSON.stringify(Data));
	console.log("end");*/
	return Data;	
}


/* Ajax  */
function TableAjax(page,maxVisible,modelName,bFlag,id){
	var obj = {'page':page,'size':maxVisible,'id':id};
	var strDate = JSON.stringify(obj);
	
	if("courseDetailList" == modelName){
	    $.ajax({
	        type: "get",
	        url: "jv/lesson/list.do",
	        data: {
	       	 'data' : strDate
	        },
	        dataType: "json",
	        success: function(data){
//	        	console.log(data);
	        	data = JSON.parse(data);
	        	var tableData = readData(data,modelName);
//	        	console.log("tableData:"+JSON.stringify(tableData));
	        	
	            addTable(tableData,modelName);
	            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
	            if(bFlag){
	        	    /* 分页   */
	    	        /*使用方法*/
	                $t.using('tableAjax').init({
				    	 maxPage:totleNum,
				    	 modelName:modelName,
				    	 id:id,
				    	 maxVisible:maxVisible
			            
	   	 	        }); 
	            }
	            
	        }
	    });
	}
	else if("courseDetailComment" == modelName){
	    $.ajax({
	        type: "get",
	        url: "jv/progress/listcourse.do",
	        data: {
	       	 'id' : id
	        },
	        dataType: "json",
	        success: function(data){
	        	data = JSON.parse(data);
	        	var tableData = readData(data,modelName);
	        	
	            // 评价table addTable(tableData,modelName);
	            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
	            if(bFlag){
	        	    /* 分页   */
	    	        /*使用方法*/
	                $t.using('tableAjax').init({
				    	 maxPage:totleNum,
				    	 modelName:modelName,
				    	 id:id,
				    	 maxVisible:maxVisible
			            
	   	 	        }); 
	            }
	            
	        }
	    });
	}

   
}




/*点击课时选项卡*/
function lessList(id) {
	TableAjax(1,maxVisible,"courseDetailList",true,id);
	myClassHour.style.display = "block";
	evaluation.style.display = "none";
	myCdBtn1.style.backgroundColor = "#4D90FE";
	myCdBtn2.style.backgroundColor = "#ffffff";
}

/*点击评价选项卡*/
function lessComment(id) {
	TableAjax(1,maxVisible,"courseDetailComment",true,id);
	myClassHour.style.display = "none";
	evaluation.style.display = "block";
	myCdBtn1.style.backgroundColor = "#ffffff";
	myCdBtn2.style.backgroundColor = "#4D90FE";
}


/*查看详情*/
function viewDetail(obj) {
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
        //console.log("selectedTr不为NULL");
        //console.log(selectedTr.rowIndex);
        //console.log(selectedTr.cells[1].innerText); //获取的方法一 
        var id = selectedTr.cells[1].innerText;
        //alert(id);
        window.location.href="jv/lesson/lessonbi.do?id="+Number(id);
    }
    else {
        alert("请选择一行");
    }
}

