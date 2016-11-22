package com.rkjh.eschool.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExceptionResolver;

import com.rkjh.common.exceptions.BusinessException;
import com.rkjh.common.util.LogUtil;

/**
*@Title: IExceptionHandler.java
*@Description: 自定义全局异常拦截器
*@author Yang yixuan
*@date 2016年6月29日 下午2:53:01
*@version V1.0
*/
public class IExceptionHandler extends ExceptionHandlerExceptionResolver  {

	@Override
	protected ModelAndView doResolveHandlerMethodException(HttpServletRequest arg0, HttpServletResponse arg1,
			HandlerMethod arg2, Exception ex) {
		ModelAndView md = new ModelAndView();
		if(ex instanceof BusinessException){
			LogUtil.e(ex.getMessage());
			LogUtil.i(ex.getMessage());
			md.setViewName("_index.jsp");
		} else {
			LogUtil.i(ex.getMessage());
			md.setViewName("_index.jsp");
		}
		
		return md;
		
	}
}
