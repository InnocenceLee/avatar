package com.rkjh.common.util;
/**
*@Title: StringUtil.java
*@Description: 字符串工具类
*@author Yang yixuan
*@date 2016年6月29日 下午2:44:21
*@version V1.0
*/
public class StringUtil {
	
	/**
	 * 判断字符串是否为空
	 * @param str 待验证字符串
	 * @return 为空：true，否则：false
	 */
	public static final boolean isEmpty(String str){
		if( null == str || ("").equals(str) || str.trim().length() == 0){
			return true;
		}
		return false;
	}
	
	/**
	 * 判断字符串长度是否为0
	 * @param str 待验证字符串
	 * @return 为0：true，否则：false
	 */
	public static final boolean isBlank(String str){
		if( null == str || ("").equals(str)){
			return true;
		}
		return false;
	}
	
	/**
	 * 字符串是否相同
	 * @param str 字符串
	 * @param equ 字符串
	 * @return true/false
	 */
	public static final boolean equals(String str, String equ){
		boolean result = false;
		if(str == null || equ == null)
			return result;
		if(str.equals(equ))
			result = true;
		return result;
	}
	
}
