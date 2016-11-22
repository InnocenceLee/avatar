/**
* 自定义封装的ajax客户端
**/
$http = {};

$http.ajax = function(param){
	$.ajax({
	    type: param.type,
	    url: param.url,
	    data: param.data,
	    dataType: param.dataType,
	    success: function(data){
        	if(data.message){
        		showMsg(data.message);
        	} else {
        		var err = JSON.parse(data);
        		while (typeof err === 'string') {
        			err = JSON.parse(err);
        		}
           	    if(err.error){
           	    	if(param.isModal){
           	    		param.success(data);
           	    	} else {
               	    	showMsg(err.error.message);
           	    	}
    	    	}else{
    	    		param.success(data);
    	    	}	
        	}
        },
        error: function(data){
        	if(data.message){
        		showMsg(data.message);
        	}
        }
	});
}

