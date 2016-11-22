<%@page import="org.apache.commons.lang.StringUtils"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
</head>

<body>

<%
	if(!StringUtils.isEmpty(request.getParameter("SETSESSIONID"))){
		response.setHeader("Set-Cookie", "JSESSIONID=" + request.getParameter("SETSESSIONID") +"; Path=/sqxm_jssp/; HttpOnly");
		response.sendRedirect("disp_session.jsp");
	}

%>

<p>Session Id : <%= session.getId() %></p>

<%
	if("1".equals(request.getParameter("t"))){
		session.putValue("content", request.getParameter("content"));
	}	

	out.print(StringUtils.defaultIfEmpty((String)session.getValue("content"), "(no content in session)"));
%>
<p>

<a href="disp_session.jsp" target="_blank">old session new window</a> &nbsp;

<a href="new_session.jsp" target="_blank">new session new window</a> &nbsp;

<a href="../fuck-session/new_session.jsp" target="_blank">new session new window at another site</a> &nbsp;

<a href="new_session.jsp" target="_self">new session</a> &nbsp;

<a href="disp_session.jsp;JSESSIONID=RESET?a=1" target="_blank">new session (JSESSIONID) new window</a> &nbsp;

<a href="disp_session.jsp?jsessionid=RESET" target="_blank">new session (jsessionid) new window</a> &nbsp;


<a href="disp_session.jsp" target="_self">refresh</a> &nbsp;

</p>

<form action="disp_session.jsp?t=1" method="post">
	input session content : <input name="content">	
	<input type="submit">
</form>

</body>
</html>