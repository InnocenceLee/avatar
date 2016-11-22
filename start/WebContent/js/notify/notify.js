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
	$("#notify_tbody").text("");
	var strTemp = "";
    for(var i=0;i<data.data.length;i++){
		//strTemp = strTemp + "<tr class='odd gradeX'><td style='display:none'>"+data[i].id+"</td><td>"+data[i].name+"</td><td class='hidden-480'>"+data[i].trainTypeName+"</td><td class='hidden-480'>"+data[i].createdate+"</td><td class='hidden-480' >"+data[i].createdate"</td></tr>";
		strTemp = strTemp + 
		"<tr class='odd gradeX myContenttr'>" +
		"<td><input type='checkbox' class='checkboxes' name='notifyCheck'/></td>" +
		"<td style='display:none'>"+data.data[i].id+"</td>" +
		"<td >"+checkUndifend(data.data[i].title)+"</td>" +
//		"<td class='hidden-480'>"+ (data.data[i].nodeNames || '无') +"</td>" +
		"<td class='hidden-480 detailsContent'><a href='jv/notify/getById.do?id="+ checkUndifend(data.data[i].id) +"' class='view-detail myToolong'  target='_blank'>"+checkUndifend(data.data[i].content)+"</a></td>" +
		"<td class='hidden-480' >"+checkUndifend(data.data[i].create_date)+"</td></tr>";
//		"<td class='hidden-480' ><a onclick='update("+data.data[i].id+")'>修改</a></td></tr>";
    }
    $("#notify_tbody").html(strTemp);
	
}


/* 公告 列表Ajax  */
function tableAjax(page,maxVisible,bFlag,keyword,dateBegin,dateEnd,modelName,searchFlag){

//	console.log("tableAjax参数：start: "+page +"  size:" + maxVisible +"  keyword:" +keyword+"  modelName:" +modelName +"  dateBegin ：" +dateBegin + "dateEnd："+dateEnd);
	keyword = $.trim($("#searchName").val());
	$http.ajax({
        type: "get",
        url: "jv/notify/list.do",
        data: {'start':page,
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


$(document).ready(function(){
    App.init();
    tableAjax(1,maxVisible,true,"","","","notify",false);
   
    
//  //删除
//	 $("#myDelBtn").click(function(){
//		 var idTemp = [];
//			var dataTemp = document.getElementsByName('notifyCheck');
//		    for(var i = 0; i <dataTemp.length; i++){
//		      if(dataTemp[i].checked){
//		     	 selectedTr = dataTemp[i].parentNode.parentNode;
//		     	    if (selectedTr != null) {
//		     	        var id = Number(selectedTr.cells[1].innerText);
//		     	        
//		     	       idTemp.push(id);
//		     	    }
//		     	 
//		     	    else {
//		     	    	 alert("请选择一行");
//		     	    }
//		      	}
//		    //判断是勾选删除 还是直接点击列
//		      else{
//			    	if(delId != 0){
//			    		 idTemp.push(Number(delId));
//			    		 //delId初始化
//			    		 delId = 0;
//			    	}
//		 		       
//		      }
//		     }
//
//		    
//		    var obj = {ids : idTemp};
//			var strDate = JSON.stringify(obj);
//			console.log("删除参数：" + strDate);
//			
//			$http.ajax({
//				 isModal : true,
//		         type: "POST",
//		         url: "jv/notify/del.do",
//		         data: {'data':strDate},
//		         dataType: "json",
//		         success: function(data){
//		        	 $('#myDelModal').modal('hide');
//		        	 tableAjax(1,maxVisible,true,"","","","notify",false)
//		          },
//		          error : function(e){
//		        	  $('#myDelModal').modal('hide');
//		        	  showMsg("删除失败！");
//		          }
//		 	    });
//	 })
});
    


/*查看详情*/
function viewDetail(obj) {
    //selectedTr = obj.parentNode.parentNode;
	var selectedTr = obj;
	
    if (selectedTr != null) {
        //console.log("selectedTr不为NULL");
        //console.log(selectedTr.rowIndex);
        //console.log(selectedTr.cells[1].innerText); //获取的方法一 
        var id = selectedTr.cells[0].innerText;
        $(".detailsContent").css("color","#2d94ff");
        //alert(id);
        window.location.href="jv/notify/getById.do?id="+id;
    }
    else {
        alert("请选择一行");
    }
}

function update(id){
	window.location.replace('announcementManageUpdate.jsp?id=' + id);
}

/*搜索*/
function search(obj) {
	var searchName = $.trim($("#searchName").val());
	
	tableAjax(1,maxVisible,true,searchName,"","","notify",true);
}


