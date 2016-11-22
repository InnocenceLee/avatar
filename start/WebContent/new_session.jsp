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
//	Cookie cookie = request.getCookies()[0];	
//  	HttpSession sn = request.getSession(true);
// 	if(StringUtils.isEmpty((String)sn.getValue("content"))){
// 		sn.putValue("content", "new session !!");
// 	}
	String sessionId = session.getId(); 
	
 	response.setHeader("Set-Cookie", "JSESSIONID=RESET; Path=/sqxm_jssp/; HttpOnly"); 	
	//response.sendRedirect("disp_session.jsp");
	
	
// 	cookie = new Cookie("JSESSIONID", sessionId);
//  	cookie.setHttpOnly(true);
//  	cookie.setPath("/sqxm_jssp/");
//  	cookie.setMaxAge(-1);
 	
// 	response.addCookie(cookie);
%>

<a href="disp_session.jsp" target="_self">in new session</a> &nbsp;

<a href="disp_session.jsp?SETSESSIONID=<%= sessionId %>" target="_self">in prev session</a> &nbsp;

<a href="disp_session.jsp;JSESSIONID=<%= sessionId %>?a=1" target="_self">prev session (JSESSIONID) new window</a> &nbsp;

<a href="disp_session.jsp?jsessionid=<%= sessionId %>" target="_self">prev session (jsessionid) new window</a> &nbsp;


</body>
</html>