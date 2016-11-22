    function getKonwledgePoints(){
    	try{
    	$http.ajax({
    		isModal : false,
    	    type: "GET",
    	    url: "jv/knowledgepoint/list.do",
    	    data: null,
    	    dataType: "json",
    	    success: function(data){
    				data = JSON.parse(data);
    				var obj=new Object();
        	    	obj.core=new Object();
        	    	obj.core.data=new Array();
        	    	var item = createTreeData(data);
        	    	obj.core.data = item;
        	    	if($('#jtree').length>0){
        	    		$('#jtree').jstree(obj);
            	    	$('#jtree').jstree(true).settings.core.data = item;
            	    	$('#jtree').jstree(true).refresh();
            	    	$('#jtree').on('select_node.jstree', function (e, data) {
            	    		zTreeOnClick(data.node.id,data.node.text);
            	    	});
        	    	}
             }
    	});
    	}catch(e){}
	}

    
   

//    $(document).ready(function(){
//    	getKonwledgePoints();
//    });
