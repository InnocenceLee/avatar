/**
 * Created by Administrator on 2016/7/11.
 */

//modify by lyh 20160718
var pageIndex;
var totleNum = 0;
//每段的页码数量
var maxVisible = 20;

//点击列删除的 ID
var delId = 0;



/* 创建table*/
function addTable(data){
	$("#courseList_tbody").text("");
	var strTemp = "";
    for(var i=0;i<data.length;i++){
		strTemp = strTemp + 
		"<tr>" +
		"<td><input type='checkbox' class='checkboxes' name='courseCheck'/></td>" +
		"<td>"+checkUndifend(data[i].id)+"</td>" +
		"<td>"+checkUndifend(data[i].name)+"</td>" +
		"<td class='hidden-480'>"+checkUndifend(data[i].trainTypeName)+"</td>" +
		"<td class='hidden-480'>"+checkUndifend(data[i].createdate)+"</td>" +
		"<td class='hidden-480'>"+checkUndifend(data[i].person)+"</td>" +
		"<td class='center hidden-480' >"+checkUndifend(data[i].node)+"</td>" +
		"<td class='center hidden-480'>"+checkUndifend(data[i].stateName)+"</td>" +
		"<td  ><span class='center hidden-480 mylistSee' onclick='viewDetail(this)'> 查看 </span></td>" +
		"<td><perm:checkPerm permissionCode='course_list.edit'><span class='mycaExamine' onclick='modify(this,"+data[i].createdate+")'>修改</span></perm:checkPerm></td></tr>";
    }
	var tbody=document.getElementById("courseList_tbody");
	$(tbody).html(strTemp);
//    tbody.innerHTML = "";
//    tbody.innerHTML += strTemp;
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
			tempData.node = item.node;
			tempData.trainType = item.trainType;
			tempData.name = item.name;
			tempData.person = item.person;
			tempData.id = item.id;
			tempData.state = item.state;
			tempData.createdate = item.createdate;
			
			switch(item.trainType)
			{
			case "S":
				tempData.trainTypeName = "标准课件";
				break;
			case "M":
				tempData.trainTypeName = "通知课件";
				break;
			default:
				break;
			}
			
			switch(item.state)
			{
			case "N":
				tempData.stateName = "未审核";
				break;
			case "A":
				tempData.stateName = "已审核";
				break;
			case "J":
				tempData.stateName = "拒绝";
				break;
			case "R":
				tempData.stateName = "使用中";
				break;
			case "D":
				tempData.stateName = "已下架";
				break;
			default:
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


/* Ajax  */
function tableAjax(page,maxVisible,bFlag,name,node,state,modelName,searchFlag){
	name = $.trim($("#searchName").val());
	node = $.trim($("#searchNode").val());
	state = $.trim($("#searchState").val());
	var obj = {'page':page,'size':maxVisible,'name':name,'node':node,'state':state};
	var strDate = JSON.stringify(obj);
	//alert("tableAjax参数： "+strDate);
//	console.log("tableAjax参数： "+strDate);
    $.ajax({
        type: "get",
        url: "jv/course/list.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
        	console.log(data);
        	data = JSON.parse(data);
        	tableData = readData(data);
            addTable(tableData);
            //判断是否是点击分页后的事件，如果是点击分页后的事件，则屏蔽分页控件初始化
            if(searchFlag){
            	$t.using('tableAjax').reset(totleNum);
            	$("#page-count").html(totleNum);
            } else if(bFlag){
            	//UIGeneral.init(page,totleNum,maxVisible,modelName);
            	
        	    /* 分页   */
    	        /*使用方法*/
                $t.using('tableAjax').init({
			    	 maxPage:totleNum,
			    	 name:name,
			    	 node:node,
			    	 state:state,
			    	 modelName:modelName,
			    	 maxVisible:maxVisible
		            
   	 	        }); 

            }
            
        }
    });
   
}


$(document).ready(function(){
    App.init();
    tableAjax(1,maxVisible,true,"","","","courseList",false);
   
});
    

$(function(){
	  //清除弹框内容  
	 $(".clean-data").click(function(){
		 $(".Bomb-box").html("");
		 $(".Bomb-box").val("");
		 $("#lessonDragFlag").prop("checked",false);
	 })
	 
	 
	 
	 //删除
	 $("#myDelBtn").click(function(){
		 var idTemp = [];
			var dataTemp = document.getElementsByName('courseCheck');
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
		    //判断是勾选删除 还是直接点击列
		      else{
			    	if(delId != 0){
			    		 idTemp.push(Number(delId));
			    		 //delId初始化
			    		 delId = 0;
			    	}
		 		       
		      }
		     }

		    
		    var obj = {data : idTemp};
			var strDate = JSON.stringify(obj);
//			console.log("删除课程参数：" + strDate);
			
			$http.ajax({
				 isModal : true,
		         type: "POST",
		         url: "jv/course/del.do",
		         data: {'data':strDate},
		         dataType: "json",
		         success: function(data){
		        	 tableAjax(1,maxVisible,true,"","","","courseList");
		        	 $('#myDelModal').modal('hide');
		          },
		          error : function(e){
		        	  $('#myDelModal').modal('hide');
		        	  showMsg("删除失败！");
		          }
		 	    });
	 })
});





/*查看详情*/
function viewDetail(obj) {
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
        //console.log("selectedTr不为NULL");
        //console.log(selectedTr.rowIndex);
        //console.log(selectedTr.cells[1].innerText); //获取的方法一 
        var id = selectedTr.cells[1].innerText;
        window.location.href="jv/course/detail.do?id="+id;
    }
    else {
        alert("请选择一行");
    }
}


/*查看详情*/
function modify(obj,creTime) {
    selectedTr = $(obj).closest("tr").get(0);
    console.log(123);
    console.log(creTime);
    if (selectedTr != null) {
        //console.log("selectedTr不为NULL");
        //console.log(selectedTr.rowIndex);
        //console.log(selectedTr.cells[1].innerText); //获取的方法一 
        var id = selectedTr.cells[1].innerText;
        window.location.href="jv/course/detailupdate.do?id="+id;
    }
    else {
        alert("请选择一行");
    }
}



/*搜索*/
function search(obj) {
	var searchName = $.trim($("#searchName").val());
	var searchNode = $.trim($("#searchNode").val());
	var searchState = $.trim($("#searchState").val());
/*	if((searchName == "") && (searchNode == "")&& (searchState == "")){
		alert("请填写搜索条件");
		return false;
		}*/
	
	tableAjax(1,maxVisible,true,searchName,searchNode,searchState,"courseList",true);
}





//批量删除
function del(obj) {
	
	selectedTr = obj.parentNode.parentNode;
//	console.log(selectedTr);
	    if (selectedTr != null) {
	        //console.log("selectedTr不为NULL");
	        //console.log(selectedTr.rowIndex);
	        //console.log(selectedTr.cells[1].innerText); //获取的方法一 
	        var id = selectedTr.cells[1].innerText;
	        delId = id;
	    }
	    else {
	        alert("请选择一行");
	    }
	

}



