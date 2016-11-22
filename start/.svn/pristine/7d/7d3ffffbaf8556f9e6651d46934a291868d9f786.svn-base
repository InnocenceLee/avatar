<%@page import="com.avatar.WordProcessor"%>
<%@page import="org.json.JSONObject"%><%@page import="java.util.List"%><%@page import="java.io.InputStream"%><%@ page language="java" contentType="text/json; charset=UTF-8"
    pageEncoding="UTF-8"%><%
	
 	InputStream inStream = request.getPart("file").getInputStream();
	List ls = WordProcessor.analyse(inStream,request);
	
 	out.write(JSONObject.valueToString(ls));

%>
