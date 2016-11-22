/**
 * Created by Administrator on 2016/7/11.
 */

//modify by lyh 20160718
var pageIndex;
var totleNum = 0;
//每段的页码数量
var maxVisible = 10;


/* 创建table*/
function addTable(data){
	$("#myNotifyList_tbody").text("");
	var strTemp = "";
    for(var i=0;i<data.data.length;i++){
		strTemp = strTemp + 
		"<tr class='odd gradeX'>" +
		"<td style='width:40px;color: #fb6659;font-style: italic;'>"+data.data[i].readstate+"</td>" +
		"<td><span class='mycaExamine myToolong' onclick='viewNews(this)'>"+data.data[i].title+"</span></td>" +
		"<td>"+data.data[i].create_date+"</td>" +
		"<td style='display:none'>"+data.data[i].id+"</td></tr>";
    }
    $('#myNotifyList_tbody').html('').html(strTemp);
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
			tempData.id = item.id;
			tempData.state = item.state;
			tempData.createdate = getLocalTime(item.createdate);
			
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
function tableAjax(page,maxVisible,bFlag,keyword,dateBegin,dateEnd,modelName,searchFlag){
//	console.log("tableAjax参数：start: "+page +"  size:" + maxVisible +"  keyword:" +keyword+"  modelName:" +modelName +"dateBegin ：" +dateBegin + "dateEnd："+dateEnd);
	
	//alert("tableAjax参数： "+strDate);
	//console.log("tableAjax参数： "+strDate);
	keyword = $.trim($("#searchName").val());
	dateBegin = $.trim($("#searchStartDate").val());
	dateEnd = $.trim($("#searchEndDate").val());
	$http.ajax({
		isModal : false,
        type: "get",
        url: "jv/notify/listByPerson.do",
        data: {
        	'start':page,
        	'size':maxVisible,
        	'keyword':keyword,
        	'dateBegin':dateBegin,
        	'dateEnd':dateEnd
        	},
        dataType: "json",
        success: function(data){
        	console.log(data);
        	data = JSON.parse(data);
        	
        	totleNum = data.totleNum;
        	
        	if(data.data.length <= 0){
        		totleNum = 0;
        	}
        	
            addTable(data);
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
			    	 keyword:keyword,
	            	 dateBegin:dateBegin,
	            	 dateEnd:dateEnd,
			    	 modelName:modelName,
			    	 maxVisible:maxVisible
   	 	        }); 

            }
            
        }
    });
   
}



/*得到选中的值*/
function viewNews(obj) {
    selectedTr = obj.parentNode.parentNode;
    if (selectedTr != null) {
        //console.log("selectedTr不为NULL");
        //console.log(selectedTr.rowIndex);
        //console.log(selectedTr.cells[1].innerText); //获取的方法一 
        var id = selectedTr.cells[3].innerText;
        window.location.href="jv/notify/getById.do?id="+id;
        //alert(id);
    }
    else {
        alert("请选择一行");
    }
    
}




/*搜索*/
function search(obj) {
	var searchName = $.trim($("#searchName").val());
	var searchStartDate = $.trim($("#searchStartDate").val());
	var searchEndDate = $.trim($("#searchEndDate").val());
	//var searchDateEnd = $.trim($("#searchName").val());
//	if((searchName == "")){
//		alert("请填写搜索条件");
//		return false;
//		}
	
	tableAjax(1,maxVisible,true,searchName,searchStartDate,searchEndDate,"notify",true)
}


$(document).ready(function(){
    App.init();
    tableAjax(1,maxVisible,true,"","","","notify",false);
});



