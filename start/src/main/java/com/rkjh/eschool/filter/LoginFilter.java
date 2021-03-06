package com.rkjh.eschool.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.JOptionPane;

import org.siphon.d2js.D2jsExecutor;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;


/**
 * Servlet Filter implementation class LoginFilter
 * 全局登录拦截器，拦截页面和ajax请求
 * @author fernador
 *
 */
@WebFilter(servletNames="loginFilter",urlPatterns={"*.do","*.jsp","*.d2js","*.jssp","*.htm","*.html"})
public class LoginFilter implements Filter {

    /**
     * Default constructor. 
     */
    public LoginFilter() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		Object sessionUser = httpRequest.getSession().getAttribute("user");
		
		String requestURI = httpRequest.getRequestURI();
		System.out.println("请求的URI ==> "+requestURI);
		System.out.println("请求的USER ==> "+JSON.toJSONString(sessionUser));
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		//需要放开首页和登录请求
		if(null==sessionUser && 
				!(
						requestURI.equals(httpRequest.getContextPath()+"/") 
						|| requestURI.equals(httpRequest.getContextPath()+"/login.d2js")
						|| requestURI.equals(httpRequest.getContextPath()+"/index.jssp")
						|| requestURI.equals(httpRequest.getContextPath()+"/sys/validation.d2js")
						|| (httpRequest.getQueryString() != null && httpRequest.getQueryString().contains("_la=true"))
				)){
			if(requestURI.equals(httpRequest.getContextPath()+"/front/main.jssp")){
				Cookie c = new Cookie("test", "");
				c.setPath("/start/");
				c.setMaxAge(0);
				c.setHttpOnly(true);
				httpResponse.addCookie(c);
			}
			httpResponse.sendRedirect(httpRequest.getContextPath());
			
		}else{
//			   String referer = httpRequest.getHeader("Referer");
//			   System.out.println("referer:"+referer);
//			   System.out.println("__________________________");
//			   if ((referer != null) && !(referer.trim().startsWith("http://192.168.1.54") || referer.trim().startsWith("http://localhost1")) && !(requestURI.endsWith("index.jssp"))) {
//				   try {
//					if(referer.trim().endsWith("/start/") || referer.trim().indexOf("index.jssp") != -1){
////						httpRequest.getSession().setAttribute("error", "检测到你访问来源存在问题");
////						httpResponse.sendRedirect(httpRequest.getContextPath() + "/index.jssp?_m=logout");
////						return;
//					}else{
//						JSONObject o = (JSONObject) JSON.toJSON(sessionUser);
//						Integer em  = (o.getJSONObject("person").getInteger("employee") != null)?o.getJSONObject("person").getInteger("employee"):-1;
//						Map<String,String> obj = new HashMap<String,String>();
//						obj.put("em", String.valueOf(em));
//						obj.put("error", "检测到你访问来源存在威胁，已退出系统");
//						D2jsExecutor.exec(httpRequest, httpResponse, "/login.d2js", "logout", obj);
//						return;
//					}
//				} catch (Exception e) {
//						
//					}
//			   }
			   
			if(requestURI.equals(httpRequest.getContextPath()+"/")){
				
				Cookie[] cookies = httpRequest.getCookies();
				boolean flag = true;
				if(cookies != null){
					for(Cookie c : cookies){
						if("test".equals(c.getName())){
							flag = false;
							break;
						}
					}
				}
				
				if(flag){
					httpRequest.getSession().invalidate();
				}
			}
			// pass the request along the filter chain
			chain.doFilter(request, response);
		}
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
