package com.rkjh.common.util;

import javax.servlet.ServletContextEvent;


/**
 * @author fernador
 * 在加载时获取工程路径
 */
public class WebAppRootListener extends org.springframework.web.util.WebAppRootListener{

	private static String webAppRoot;

	@Override
	public void contextInitialized(ServletContextEvent event) {
		super.contextInitialized(event);
		String root = event.getServletContext().getRealPath("/");
		webAppRoot = root;
	}

	public static String getWebAppRoot() {
		return webAppRoot;
	}
}
