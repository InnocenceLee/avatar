package com.avatar.servlet;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.siphon.d2js.D2jsExecutor;

public class CleanUserServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	public void init(ServletConfig config) throws ServletException {
		// TODO Auto-generated method stub
		super.init(config);
		try {
			D2jsExecutor.exec("/sys/online_user.d2js", "cleanAll");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
