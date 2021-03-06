/**
 * Created by Administrator on 2016/7/11.
 */

//modify by lyh 20160718
var pageIndex;
var totleNum = 0;
//每段的页码数量
var maxVisible = 20;



/* 创建table*/
function addTable(data){
	$("#planList_tbody").text("");
	var strTemp = "";
    for(var i=0;i<data.length;i++){
		strTemp = strTemp + 
		"<tr><td><input name='planCheck' type='checkbox' class='checkboxes' value='1' /></td>" +
		"<td style='display:none'>"+data[i].id+"</td>" +
		"<td>"+data[i].planName+"</td>" +
		"<td>"+data[i].courseSize+"</td>" +
		"<td >"+data[i].trainBatchStart +" ~ "+data[i].trainBatchEnd+"</td>" +
		"<td>"+data[i].personName+"</td>" +
		"<td>"+data[i].createDate+"</td>" +
		"<td class='center mylistSee' ><span  onclick='viewDetail(this)'>查看</span> </td>";// +
		//"<td class='mylistSee' ><perm:checkPerm permissionCode='learnplan.update'><span onclick='modify(this)'>修改</span></perm:checkPerm></td></tr>";
    }
	var tbody=document.getElementById("planList_tbody");
	$("#planList_tbody").html(strTemp)
}

//转换数据
function readData(data){
	var Data = [];
	
	if(data.length <= 0){
		totleNum = 0;
	}
	for(var i=0;i<data.length;i++){
		var item = data[i];
		if(item!=undefined){
			
			if(item.totleNum != undefined/*rid*/){
				totleNum = item.totleNum;
				
			}
			
			var tempData = {};
			tempData.personName = item.personName;
			tempData.courses = item.courses;
			tempData.planName = item.planName;
			tempData.id = item.planId;
			tempData.personId = item.personId;
			tempData.courseSize = item.courseSize;
			tempData.trainBatchEnd = item.trainBatchEnd;
			tempData.trainBatchStart = item.trainBatchStart;
			tempData.createDate = item.createDate;
			
			
			Data.push(tempData);
		}
	}
/*	console.log("输出data");
	console.log(JSON.stringify(Data));
	console.log("end");*/
	return Data;	
}


/* Ajax  */
function tableAjax(page,maxVisible,bFlag,name,modelName,searchFlag){
	name = $.trim($("#searchName").val());
	var obj = {'page':page,'size':maxVisible,'name':name};
	var strDate = JSON.stringify(obj);
	//alert("tableAjax参数： "+strDate);
//	console.log("tableAjax参数： "+strDate);
    $.ajax({
        type: "get",
        url: "jv/learnplan/list.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
//        	console.log("学习计划列表："+ data);
        	data = JSON.parse(data);
        	tableData = readData(data);
            addTable(tableData);
            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
            if(searchFlag){
            	$t.using('tableAjax').reset(totleNum);
            	$("#page-count").html(totleNum);
            }
            else if(bFlag){
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
    tableAjax(1,maxVisible,true,"","learnPlayList",false);
   
});
    







/*查看详情*/
function viewDetail(obj) {
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
        //console.log("selectedTr不为NULL");
        //console.log(selectedTr.rowIndex);
        //console.log(selectedTr.cells[1].innerText); //获取的方法一 
        var id = selectedTr.cells[1].innerText;
        window.location.href="jv/learnplan/detail.do?id="+id;
    }
    else {
        alert("请选择一行");
    }
}


/*修改*/
function modify(obj) {
    selectedTr = $(obj).closest("tr")[0];
    if (selectedTr != null) {
        //console.log("selectedTr不为NULL");
        //console.log(selectedTr.rowIndex);
        //console.log(selectedTr.cells[1].innerText); //获取的方法一 
        var id = selectedTr.cells[1].innerText;
        window.location.href="jv/learnplan/detailupdate.do?id="+id;
        
    }
    else {
        alert("请选择一行");
    }
}



/*搜索*/
function search(obj) {
	var searchName = $.trim($("#searchName").val());
//	if((searchName == "")){
//		alert("请填写搜索条件");
//		return false;
//		}
	
	tableAjax(1,maxVisible,true,searchName,"learnPlayList",true);
}










$(function() {
	  //清除弹框内容  
	 $(".clean-data").click(function(){
		 $(".Bomb-box").html("");
		 $(".Bomb-box").val("");
		 $("#lessonDragFlag").prop("checked",false);
	 })

	 
	 
//批量删除         
	$("#delPlanBtn").click(function(){
		var idTemp = [];
		var dataTemp = document.getElementsByName('planCheck');
	    for(var i = 0; i <dataTemp.length; i++){
	      if(dataTemp[i].checked){
	     	 selectedTr = dataTemp[i].parentNode.parentNode;
	     	    if (selectedTr != null) {
	     	        var id = Number(selectedTr.cells[1].innerText);
	     	        
	     	       idTemp.push(id);
	     	    }
	     	    else {
	     	        alert("请选择一行");
	     	    }
	      	}
	     }
	    
	    var obj = {'id':idTemp};
		var strDate = JSON.stringify(obj);
		
		$http.ajax({
			 isModal : true,
	         type: "POST",
	         url: "jv/learnplan/delplan.do",
	         data: {'data':strDate},
	         dataType: "json",
	         success: function(data){
	        	 tableAjax(1,maxVisible,true,"","learnPlayList",false);
	        	 $('#myDelModal').modal('hide');
	         }
	 	    });
		
	})
	
	
});



