<%@page import="com.avatar.Node"%>
<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<%
		Map m = (Map)session.getAttribute("userJava");
		m = (Map)m.get("node");
		Double node = (Double)m.get("id");
		String sql = Node.nodeSql(node.intValue(), "DEPT", false);
		
		out.print(sql);
	%>
</body>
</html>