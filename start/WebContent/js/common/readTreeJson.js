/**
 * 解析后台传来的树控件的 json  通用
 * add by  lyh 20160713
 */


//find
//主方法，运用递归实现

function createTreeData(data){
	
	for(var i=0;i<data.length;i++){
		if(data[i].parent==0){
			data[i].parent='#';
		}
	}
	return data;		
}




function createNodeJTreeData(data){
	var treeData = [];
	for(var i=0;i<data.length;i++){
		var item = data[i];
		if(item!=undefined){
			if(item.parent_id != null/*rid*/){
				var tempData = {};
				if(item.parent_id == 0/*rid*/){
					tempData.id = item.id;
					tempData.text = item.name;
					tempData.parent = item.parent_id;
					tempData.remarks = item.remarks;
				}
				else{
					tempData.id = item.id;
					tempData.text = item.name;
					tempData.parent = item.parent_id;
					tempData.remarks = item.remarks;
				}
				treeData.push(tempData); 
			}
		}
	}
	treeData[0].parent='#';
	return treeData;	
}