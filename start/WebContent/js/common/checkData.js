/**
 * 提交按钮数据校验
 * @param data 校验说明对象json
 * @param 说明1：普通input校验（包含单个的时间校验）
 * {
 * 	data : [
 * 			{
 * 				id : 元素id
 * 				rule ： 校验规则（正则）可以为空，默认判定非空
 * 				msg : 错误提示信息
 * 				checkFun ： 校验方法(checkStr 或者 checkDate)
 * 			}
 * 		]
 * }
 * @param 说明2：两个时间的校验
 * {
 * 	data : [
 * 			{
 * 				id : {
 * 						startId : 开始时间
 * 						endId : 结束时间
 * 					}
 * 				msg : 错误提示信息
 * 				checkFun ： 校验方法(checkDateCompare)
 * 				type : 'date' 固定写法
 * 			}
 * 		]
 * }
 * 
 * @param return 成功/失败
 */
function checkData(data){
	for(var i = 0; i < data.data.length; ++i){
		var functionName = data.data[i].checkFun;
		if(data.data[i].type == 'date'){
			var str = functionName+"('"+data.data[i].id.startId+"','"+data.data[i].id.endId+"')";
		} else {
			var str = functionName+"('"+data.data[i].id+"',"+(data.data[i].rule || 0)+","+data.data[i].canNull+")";
		}
		var isPass = eval(str);
		// 校验失败，修改样式，提示错误信息
		if(isPass == false){
			//data.data[i]
			$.ErrorDate(data.data[i]);
			return isPass;
		}else{
			$.trueDate(data.data[i]);
		}
	}
	// 循环结束，校验通过
	return true;
}

/**
 * 字符串校验（含中文）
 * @param id 校验元素id
 * @param rule 校验规则（正则）
 */
function checkStr(id,rule,canNull){
	var checkNode = $("#"+id);
	var checkNodeVal = checkNode.val();
	
	var checkNodeValTemp = checkNodeVal.replace(/\s/g, "");
	if(!checkNodeValTemp && !canNull){
		return false;
	}
	
	if(rule == 0){
		return true;
	}
	return checkNodeVal.trim().match(rule) ?  true : false;
}

/**
 * 时间校验，比较前一个时间是不是小于后一个时间
 * @param startId 开始时间元素id
 * @param endId 结束时间元素id
 * @returns 是/否
 */
function checkDateCompare(startId,endId){
	var checkNodeStart = $("#"+startId);
	var checkNodeValStart = checkNodeStart.val();
	var checkNodeEnd = $("#"+endId);
	var checkNodeValEnd = checkNodeEnd.val();

	if(!checkNodeValStart){
		
		return false;
	}
	if(!checkNodeValEnd){
		return false;
	}
	checkNodeValStart;
	var start = Date.parse(checkNodeValStart.replace(/\s/, 'T'));
	var end = Date.parse(checkNodeValEnd.replace(/\s/, 'T'));
	
	if(start <= end){
		return true;
	}
	return false;
}

/**
 * 判断时间是否为空
 * @param id 时间元素id
 * @returns 是/否
 */
function checkDate(id){
	var checkNode = $("#"+id);
	var checkNodeVal = checkNode.val();
	if(!checkNodeVal){
		return false;
	}
	return true;
}
/*判断为空后显示的内容*/
jQuery.extend({
	ErrorDate:function(data){
		$('#' + data.id).focus();
		if($('.errorPrompt').length ==0 || $('.myicon').length ==0){
				if(data.type == 'date'){
					$('#'+data.id.startId).addClass("error")//.css("border-color","#fc4f3f !important");
					$('#'+data.id.endId).addClass("error")//css("border-color","#fc4f3f !important");
					option='<p class="errorPrompt" id="myp'+data.id.startId+'">'+data.msg+'</p>';
					$('#'+data.id.endId).after(option);
				}else if(data.type == 'multi'){
					$('#'+data.id).css("border-color","#fc4f3f");
					option='<p class="errorPrompt" id="myp'+data.id+'">'+data.msg+'</p>';
					$('#'+data.id).parent().append(option);
				}else if(data.type == 'combo'){
					$('#'+data.id).css("border-color","#fc4f3f");
					option='<p class="errorPrompt" id="myp'+data.id+'">'+data.msg+'</p>';
					icon = '<i class="icon-remove-sign myicon" id="myI'+data.id+'"></i>';
					$('#'+data.id).parent().append(icon);
					$('#'+data.id).parent().append(option);
				}else{
					$('#'+data.id).css("border-color","#fc4f3f");
					option='<p class="errorPrompt" id="myp'+data.id+'">'+data.msg+'</p>';
					icon = '<i class="icon-remove-sign myicon" id="myI'+data.id+'"></i>';
					$('#'+data.id).after(option);
					$('#'+data.id).after(icon);
				}	
		}
	},
    trueDate:function(data){
    	if(data.type == 'date'){
    		$('#'+data.id.startId).removeClass("error") // css("border-color","#e6e6eb");
    		$('#'+data.id.dateEnd).removeClass("error")//css("border-color","#e6e6eb");
    		$("p").remove('.errorPrompt');
    	}else{
    		$('#'+data.id).css("border-color","#e6e6eb");
        	$("p").remove('.errorPrompt');
        	$("i").remove('.icon-remove-sign');
    	}
    }
});
/*点击取消按钮清空错误信息*/
$(function(data){
	$(".myCancelbtn").click(function(){
		$('#'+data.id).css("border-color","#e6e6eb");
    	$("p").remove('.errorPrompt');
		$("i").remove('.icon-remove-sign');
   })
});
	