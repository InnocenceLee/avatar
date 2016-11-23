package ueditor;

import java.io.UnsupportedEncodingException;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.baidu.ueditor.ActionEnter;

public class Ueditor {
	public static String Update(HttpServletRequest request,HttpServletResponse response) {
		
		try {
			request.setCharacterEncoding( "utf-8" );
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		response.setHeader("Content-Type" , "text/html");
		
		String rootPath = request.getRealPath("/");
		
		return new ActionEnter( request, rootPath ).exec();
	}
}
