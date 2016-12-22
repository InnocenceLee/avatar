package com.avatar.listener;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.log4j.Logger;
import org.siphon.d2js.D2jsExecutor;

public class SessionListener implements HttpSessionListener {
	
	static Logger logger = Logger.getLogger(SessionListener.class); 
	@Override
	public void sessionCreated(HttpSessionEvent se) {
		
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
		
		HttpSession session = se.getSession();
		logger.info("当前在线：" + session.getAttribute("onlineJava"));
		Object o = session.getAttribute("onlineJava");
		if(o != null){
			try {
				D2jsExecutor.exec("/sys/online_user.d2js", "destroy", session.getAttribute("onlineJava"));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		

	}

}
