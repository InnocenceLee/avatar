
var pagePamrs={limit:1,PageSize:1}
var del = -1;
function getHelpList() {
	$http.ajax({
		type : "POST",
		url : "jv/help/helpList.do",
		data : {
			limit:pagePamrs.limit,
			PageSize:pagePamrs.PageSize
		},
		dataType : "json",
		success : function(data) {
			data = JSON.parse(data);
			addTable(data);

		}
	});
}


function addTable(data){
	$("#planList_tbody").text("");
	var strTemp = "";
    for(var i=0;i<data.length;i++){
    	var temp = data[i];
		strTemp = strTemp + 
		"<tr>" +
		"<td style='display:none'>"+data[i].id+"</td>" +
		"<td >"+data[i].name+"</td>" +
		"<td class='center mylistSee' ><span  onclick='helpDetail("+data[i].id+")'>查看</span> <span  onclick='helpModify("+data[i].id+")'>修改</span>" +
				" <span  onclick='helpDel("+data[i].id+" )'>删除</span></td>";// +
		+"</tr>";
    }
	var tbody=document.getElementById("planList_tbody");
	$("#planList_tbody").html(strTemp)
}

function helpModify(obj){
	 window.location.href="jv/help/helpModify.do?id="+obj;
}
function helpDetail(obj){
	 window.location.href="jv/help/showhelp.do?id="+obj;
}
function helpDel(id){
	$("#delP").html(   "你确定要删除本条帮助数据吗!");
	del = id;
	$('#myDelModal').modal('show')
}

function delOk(){
	
	if(del == -1){
		return;
	}
	$http.ajax({
		type : "POST",
		url : "jv/help/helpDel.do",
		data : {
			id:del
		},
		dataType : "json",
		success : function(data) {
			data = JSON.parse(data);
			if(data.success == true){
				$('#myDelModal').modal('hide')
				alert("删除成功");
			}else{
				alert("删除失败");
			}
			getHelpList() 
			del = -1;

		}
	});
	
}
getHelpList();