package com.rkjh.common.util;

import org.apache.log4j.Logger;


/**
 * @author fernador
 * log工具
 */
public class LogUtil {

	//记录访问信息
	private static Logger infoLogger = Logger.getLogger("com.rkjh.eschool.infoLogger");
	
	//记录错误
	private static Logger errorLogger = Logger.getLogger("com.rkjh.eschool.errorLogger");
	
	
	public static void i(String msg){
		infoLogger.info(msg);
	}
	
	public static void e(String msg){
		errorLogger.error(msg);
	}
}
