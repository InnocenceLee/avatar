<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>知识点管理</title>
<script type="text/javascript">
	function list(){
		$.ajax({
             type: "GET",
             url: "jv/knowledgepoint/list.do",
             data: null,
             dataType: "json",
             success: function(data){
                         alert(data);
                      }
         });
	}

	function add(){
		var title,remarks;
		title = $("#title").val();
		remarks = $("#remarks").val();
		
		$.ajax({
             type: "POST",
             url: "jv/knowledgepoint/add.do",
             data: {
            	 	'title' : title,
            	 	'remarks' : remarks,
            	 	'base' : 5
             		},
             dataType: "json",
             success: function(data){
                 alert(data);
             }
         });
	}

	function del(){
		var id
		id = $("#id").val();
		
		$.ajax({
             type: "POST",
             url: "jv/knowledgepoint/del.do",
             data: {
            	 	'id' : id
             		},
             dataType: "json",
             success: function(data){
                         alert(data);
                      }
         });
	}

	function update(){
		var title,remarks;
		title = $("#title2").val();
		remarks = $("#remarks3").val();
		
		var id = 10;
		
		$.ajax({
             type: "POST",
             url: "jv/knowledgepoint/update.do",
             data: {
            	 params: {
            		 table:{
            			 rows:[
            			       {'id' : id},
            			       {'title' : title},
            			       {'remarks' : remarks},
            			       {'base' : 5}
            			 ]
            		 }
            	 }
             },
             dataType: "json",
             success: function(data){
                         alert(data);
                      }
         });
	}
	
</script>
</head>
<body>
	<div>
		<button onclick="list()">查询列表</button>
	</div>
	
	<br><br>
	
	<div>
		新增知识点
 		标题: <input id="title" name="title" type="text">
		<br>
		说明: <input id="remarks" name="remarks" type="text">
		<br>
		<button onclick="add()">新增知识点</button>
	</div>
	
	<br><br>
	
	<div>
		删除知识点(没有校验数据类型，但是业务功能上，只可能是数字，而且不能输入)
 		标题: <input id="id" name="id" type="text">
		<br>
		<button onclick="del()">删除知识点</button>
	</div>
	
	<br><br>
	
	<div>
		修改知识点
 		标题: <input id="title2" name="title2" type="text">
		<br>
		说明: <input id="remarks3" name="remarks3" type="text">
		<br>
		<button onclick="update()">修改知识点</button>
	</div>
	
	<br><br>
	
</body>
</html>