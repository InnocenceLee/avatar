/**
 * Created by Administrator on 2016/7/11.
 */

//modify by lyh 20160718
var pageIndex;
var totleNum = 0;
//每段的页码数量
var maxVisible = 20;

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/* 创建table*/
function addTable(data){
	$("#List_tbody").text("");
	var strTemp = "";
    for(var i=0;i<data.length;i++){
//    	console.debug(data[i])
    	var status = data[i].state == 'N' ? '待审核' : (data[i].state == 'A' ? '审核通过' : '已驳回');
		strTemp += '<tr class="odd gradeX">'
				         +'<td><input type="checkbox" class="checkboxes" value="1" /></td>'
				         +'<td pid="'+ data[i].id +'">'+ data[i].name +'</td>'
				         +'<td>'+ (data[i].p_type ? data[i].p_type : '') +'</td>'
				         +'<td class="hidden-480">'+ (data[i].mode == 'S' ? '手动' : (data[i].mode == 'Z' ? '随机' : 'word导入')) +'</td>'
//				         +'<td class="hidden-480">'+ (data[i].difficulty == '3' ? '难' : (data[i].difficulty == '2' ? '中' : '易' )) +'</td>'
				         +'<td class="center hidden-480">'+ data[i].question_count +'</td>'
				         +'<td class="center hidden-480">'+ data[i].totle_score +'</td>'
				         +'<td class="hidden-480">'+ data[i].personname +'</td>'
				         +'<td class="hidden-480">'+ data[i].nodename +'</td>'
				         +'<td class="center hidden-480">'+ new Date(data[i].create_date).Format("yyyy-MM-dd hh:mm:ss") +'</td>'
				         +'<td class="center hidden-480">'+ status +'</td>'
				         +'<td class="center hidden-480 mylistSee" data-toggle="modal"  onclick="update('+ data[i].id +')">修改</td>'
				         //+'<td class="mycaExamine" data-toggle="modal" data-target="#responsive" id="delete" >删除</td>'
				         +'<td><a href="examPaperDetail.jsp?id='+ data[i].id +'" class="mylistSee">详情</a></td>'
				    +'</tr>';
    }
	var tbody=document.getElementById("List_tbody");
	$(tbody).html(strTemp);
}



/* Ajax  */
function tableAjax(page,maxVisible,bFlag,name,mode,state,modelName,searchFlag){
	name = $.trim($("#searchName").val());
	mode = $.trim($("#searchMode").val());
	var obj = {'page':page,'size':maxVisible,'name':name,'mode':"",'state':state};
	var strDate = JSON.stringify(obj);
	$http.ajax({
		isModal : false,
        type: "get",
        url: "jv/examPaper/list.do",
        data: {
        	'name':name,
        	'state':state,
        	'mode':mode,
        	'start':page,
        	'size':maxVisible,
        	},
        dataType: "json",
        success: function(data){
        	data = JSON.parse(data);
        	totleNum = data.totalNum;
        	
        	if(data.data.length <= 0){
        		totleNum = 0;
        	}
        	
            addTable(data.data);
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
			    	 mode:mode,
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
    tableAjax(1,maxVisible,true,"","","","examPaperList",false);
   
});
    
function confirmDel(){
	
}


/*搜索*/
function search(obj) {
	var searchName = $.trim($("#searchName").val());
	var searchMode = $.trim($("#searchMode").val());
	tableAjax(1,maxVisible,true,searchName,searchMode,"","examPaperList",true);
}




$("#delete").live("click",function(data){
	var pid = $(this).closest("tr").find("[pid]").attr("pid");
	del([pid]);
});

function del(ids){
	var args = "?";
	for(var i=0 ; i< ids.length;i++){
		args += ("ids=" + ids[i]+"&");
	}
	
	
	$.post("jv/examPaper/dels.do" + args,function(data){
		window.location.reload();
	});
}


$("#myDelBtn").click(function(){
	var dels = $(":checkbox:checked");
	var ids = [];
	var pid = -1;
	for(var i=0; i< dels.length ; i++){
		pid = $(dels[i]).closest("tr").find("[pid]").attr("pid");
		ids.push(pid);
	}
	del(ids);
});



function update(id){
	window.location.replace('examPaperUpdate.jsp?id=' + id)
}

function submitUpdate(){
	var param = $("#paperUpdate-form").serialize();
	$.post("jv/examPaper/update.do",param,function(data){
		
	});
	
}








