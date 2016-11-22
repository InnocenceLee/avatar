package com.rkjh.eschool.interceptor;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.rkjh.common.util.ApplicationContextUtil;
import com.rkjh.eschool.dao.SysFunctionDao;
import com.rkjh.eschool.entity.PermissionPair;

/**
*@Title: IAuthorityHandler.java
*@Description: 权限校验拦截器,主要针对*.do的权限判断
*@author Yang yixuan
*@date 2016年6月29日 下午3:15:21
*@version V1.0
*/
public class IAuthorityHandler extends HandlerInterceptorAdapter {
	
	private static SysFunctionDao permissionDao;
	private static Map<String,String> permissionMap1 = new HashMap<String,String>();
	private static Map<String,String> permissionMap2 = new HashMap<String,String>();

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		System.out.println("+++++++++++++++++++++ 权限校验拦截器 ++++++++++++++++++++++");
		Object sessionUser = request.getSession().getAttribute("user");
		JSONObject sessionUserJson = (JSONObject) JSON.toJSON(sessionUser);
		JSONObject userAllows = sessionUserJson.getJSONObject("allowed");
		
		String requestURI = request.getRequestURI();
		System.out.println("请求的URI ==> "+requestURI);
		
		String toMappingUrl = requestURI.replace(request.getContextPath(), "").replace("//", "/");
		
		//获取所有权限
		if(null==permissionDao){
			permissionDao = ApplicationContextUtil.getContext().getBean(SysFunctionDao.class);
		}else{
//			List<PermissionPair> pairs = permissionDao.listAllPermissionPairs();
//			for(PermissionPair pair : pairs){
//				permissionMap1.put(pair.getCode(), pair.getUrl());
//				permissionMap2.put(pair.getUrl(), pair.getCode());
//			}
		}
		
		boolean hasPermission = false;
		//根据url匹配并判断权限
		if(permissionMap2.containsKey(toMappingUrl)){
			String code = permissionMap2.get(toMappingUrl);
			if(userAllows.containsKey(code) && userAllows.getBooleanValue(code)){
				hasPermission = true;
			}else{
				System.out.println("<============ 当前用户没有此权限 ===========>");
				System.out.println("<== code:"+ code);
				System.out.println("<==========================================>");
			}
		}else{
			System.out.println("<============== 当前权限未配置 =============>");
			System.out.println("<== permission_url:"+ toMappingUrl);
			System.out.println("<==========================================>");
			hasPermission = true;
		}
		
		if(!hasPermission){			
			JSONObject json = new JSONObject();
			json.put("accessDenied", true);
			json.put("msg", "you may not have right to access!");
			response.setCharacterEncoding("UTF-8");
			response.setContentType("application/json;charset=UTF-8");
			PrintWriter pw = response.getWriter(); 
			pw.write(JSON.toJSONString(json));
			pw.flush();
			pw.close();
			return false;
		}else{
		
			return true;
		}

	}

}
