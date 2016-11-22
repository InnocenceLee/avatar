<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>未入职人员管理</title>
</head>
<body>
	<div>未入职人员管理</div>
	
	<div>
		<div>
			<div>名称：</div>
			<input name="name" id="name" type="text">
		</div>
		<div>
			<div>部门：</div>
			<input name="node" id="node" type="text">
		</div>
		<button onclick="find()">搜索</button>
	</div>
	
	<div>
		<table class="table table-striped table-hover table-bordered datatable" id="article">
			<thead>
				<tr>
				<th>姓名</th>
				<th>身份证号</th>
				<th>性别</th>
				<th>入职部门</th>
				<th>管理</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
	
</body>
</html>

<script type="text/javascript">
	function find(){
		
		var data = {};
		var name,node;
		
		name = $("#name").val();
		node = $("#node").val();
		data = {
			"name" : name,
			"node" : node
		};
		
		$.ajax({
            type: "GET",
            url: "jv/nonentrymanagement/find.do",
            data: data,
            dataType: "json",
            success: function(data){
            	//knowledge_point
                        /* $('#resText').empty();   //清空resText里面的所有内容
                        var html = ''; 
                        $.each(data, function(commentIndex, comment){
                              html += '<div class="comment"><h6>' + comment['username']
                                        + ':</h6><p class="para"' + comment['content']
                                        + '</p></div>';
                        });
                        $('#resText').html(html); */
                        alert(data);
                     }
        });
	}
	
	
</script>