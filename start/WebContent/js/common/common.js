Date.prototype.format = function (format) {
    var args = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
};
(function (Date, undefined) {
    var origParse = Date.parse, numericKeys = [ 1, 4, 5, 6, 7, 10, 11 ];
    Date.parse = function (date) {
        var timestamp, struct, minutesOffset = 0;

        // ES5 §15.9.4.2 states that the string should attempt to be parsed as a Date Time String Format string
        // before falling back to any implementation-specific date parsing, so that’s what we do, even if native
        // implementations could be faster
        //              1 YYYY                2 MM       3 DD           4 HH    5 mm       6 ss        7 msec        8 Z 9 ±    10 tzHH    11 tzmm
        if ((struct = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(date))) {
            // avoid NaN timestamps caused by “undefined” values being passed to Date.UTC
            for (var i = 0, k; (k = numericKeys[i]); ++i) {
                struct[k] = +struct[k] || 0;
            }

            // allow undefined days and months
            struct[2] = (+struct[2] || 1) - 1;
            struct[3] = +struct[3] || 1;

            if (struct[8] !== 'Z' && struct[9] !== undefined) {
                minutesOffset = struct[10] * 60 + struct[11];

                if (struct[9] === '+') {
                    minutesOffset = 0 - minutesOffset;
                }
            }

            timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
        }
        else {
            timestamp = origParse ? origParse(date) : NaN;
        }

        return timestamp;
    };
}(Date));
/**
 * add by lyh 20160719
 * 公告方法
 */

var contextPath = null;
$(function(){
	try{
	contextPath = $("[name=contextPath]").val();
	$('input.js-bt-datetimepicker[data-format=datetime]').datetimepicker({
    	language: 'zh-CN',
    	format: 'yyyy-mm-dd hh:ii',
    	minuteStep: 1,
    	autoclose: true,
    	todayBtn: true,
    	todayHighlight: true
    });
	$('input.js-bt-datetimepicker[data-format=date]').datetimepicker({
    	language: 'zh-CN',
    	format: 'yyyy-mm-dd',
    	minView: 2,
    	autoclose: true,
    	todayBtn: true,
    	todayHighlight: true
    });
	}catch(e){}
})

//输入  时间戳
//输出   2010年12月23日 10:53
function getLocalDate(nS) {     
	if(nS == undefined){
		return '--';
	}
	var d = new Date();
	d.setTime(nS);
	return d.format("yyyy-MM-dd hh:mm:ss");
} 

function MillisecondToDate(msd) {  
    var time = parseFloat(msd) /1000;  
    if (null!= time &&""!= time) {  
        if (time >60&& time <60*60) {  
            time = parseInt(time /60.0) +"分钟"+ parseInt((parseFloat(time /60.0) -  
            parseInt(time /60.0)) *60) +"秒";  
        }else if (time >=60*60&& time <60*60*24) {  
            time = parseInt(time /3600.0) +"小时"+ parseInt((parseFloat(time /3600.0) -  
            parseInt(time /3600.0)) *60) +"分钟"+  
            parseInt((parseFloat((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60) -  
            parseInt((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60)) *60) +"秒";  
        }else {  
            time = parseInt(time) +"秒";  
        }  
    }else{  
        time = "0 时 0 分0 秒";  
    }  
    return time;  
  
}

//输入  时间戳
//输出   2010年12月23日 10:53
function getLocalTime(nS) {    
	if(nS == undefined){
		return '--';
	}
	var d = new Date();
	d.setTime(nS);
	return d.format("yyyy-MM-dd hh:mm:ss");
}


//json排序，
//in   json，排序的建
//json
// 示范var ary=[{id:1,name:"b"},{id:2,name:"b"}];
// ary.sort(keysrt('name',true));
function keysrt(key,desc) {
	  return function(a,b){
	    return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
	  }
	}


//删除数组制定元素
//全选 反选
//列头传ID   内容传name
function delJsonByName(delkey,data){
	for(var i=0;i<data.length;i++){
		if(data[i].name == delkey){
			data.remove(data[i]);
		}
	}
	return data;
}


//全选 反选
//列头传ID   内容传name
function checkAll(id,name){
	
	var collid = document.getElementById(id);
	var coll = document.getElementsByName(name);

	if (collid.checked){
	   for(var i = 0; i<coll.length;i++)
	     coll[i].checked = true;
	  // $(".name input:checked");
	}else{
	   for(var i = 0; i < coll.length; i++)
		     coll[i].checked = false;
	   	// $(".name input:checked");
	}
}




//通知
function notifyPerson(notifyMode,title,msg,receiver,url){
	for(var i=0;i<notifyMode.length;i++ ){
		//alert(receiver.join());
		switch(notifyMode[i]){
		case "P":
			$http.ajax({
					isModal : false,
			        type: "POST",
			        url: contextPath + "/jv/notify/add.do",
			        data: {
			        	'title':title,
			        	'receiver':receiver.join() || '',
			        	'content':msg
			        	},
			        dataType: "json",
			        success: function(data){
			        	//alert(data);
			        	console.log(data);
			        	if("" != url){
				        	window.location.href = url;
			        	}
			        }
			    });
			break;
		case "F":
			break;
			
		case "D":
			break;
		case "M":
//			$http.ajax({
//				isModal : false,
//		        type: "POST",
//		        url: contextPath + "/jv/notify/update.do",
//		        data: {
//		        	'id':id,
//		        	'title':title,
//		        	'receiver':receiver.join() || '',
//		        	'content':msg
//		        	},
//		        dataType: "json",
//		        success: function(data){
//		        	//alert(data);
//		        	console.log(data);
//		        	if("" != url){
//			        	window.location.href = url;
//		        	}
//		        }
//		    });
			break;
		}
	}
}




//检查是否是undifend  是返回
function checkUndifend(data){
//	if(undefined == data)
//		data = "";
	return data || '';
}


function getSysParam(name){
	var rs = null;
	$.ajax({
		  url:  contextPath + "/jv/systemparameter/findname.do",
		  async: false,
		  data : {name:name},
		  success : function(data){
			  if(!data) return null;
			  rs = JSON.parse(data);
		  }
    });
	return rs.value;
}



//时间戳转格式字符串
function timeStamp2Str(time){  
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

//时间戳转格式字符串  yyyy-MM-dd HH:mm:ss
function timeStamp2StrH(time){  
    var datetime = new Date();  
    datetime.setTime(time);  
    var year = datetime.getFullYear();  
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;  
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();  
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();  
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();  
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();  
    return year + "-" + month + "-" + date +" "+hour+":"+minute+":"+second;  
}

//时间戳转格式字符串  yyyy-MM-dd HH:mm
function timeStamp2M(time,format){  
    var datetime = new Date();  
    datetime.setTime(time);  
    var year = datetime.getFullYear();  
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;  
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();  
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();  
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();  
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date +" "+hour+":"+minute;  
}









