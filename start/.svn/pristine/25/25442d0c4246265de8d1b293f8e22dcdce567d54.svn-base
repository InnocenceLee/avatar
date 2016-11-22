package com.rkjh.common.exceptions;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

/**
 * @Title: BusinessExceptionHandler.java
 * @Description: 自定义异常handler
 * @Author: Yang yixuan
 * @Create Date: 2016年8月18日下午3:25:09
 * @Version: V1.00
 */
@Component
public class BusinessExceptionHandler implements HandlerExceptionResolver {

	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			Exception ex) {
		if(ex instanceof BusinessException){
			ModelAndView mv = new ModelAndView();
			Map attributes = new HashMap();
			attributes.put("message", ex.getMessage());
			org.springframework.web.servlet.view.json.MappingJackson2JsonView view = new org.springframework.web.servlet.view.json.MappingJackson2JsonView();
			view.setAttributesMap(attributes);
			mv.setView(view);
			return mv;
		}
		return null;
	}

}
