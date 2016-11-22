package com.rkjh.common.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * @author fernador
 * 获取ApplicationContext的工具类
 */
public class ApplicationContextUtil implements ApplicationContextAware {

	private static ApplicationContext context = null ;
	
	public void setApplicationContext(ApplicationContext context) throws BeansException {
		ApplicationContextUtil.context = context ;
	}

	public static ApplicationContext getContext() {
		return context;
	}

	public static void setContext(ApplicationContext context) {
		ApplicationContextUtil.context = context;
	}
}
