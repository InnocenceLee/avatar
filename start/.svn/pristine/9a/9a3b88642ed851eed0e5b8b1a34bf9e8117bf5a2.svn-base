package com.rkjh.common.util;

import com.alibaba.fastjson.JSONObject;

/**
* @Title: PageUtil.java
* @Description: 分页
* @Author: Yang yixuan
* @Create Date: 2016年7月15日下午6:10:26
* @Version: V1.00
*/

public class PageUtil {
	
	/**
	 * 当前页数
	 */
	public static final String STR_PAGE = "page"; 
	
	/**
	 * 每页显示数
	 */
	public static final String STR_SIZE = "size"; 
	
	/**
	 * 查询条件
	 */
	public static final String STR_DATA = "data"; 
	
	/**
	 * 解析分页信息
	 * @param page 分页信息
	 * @return 分页信息
	 */
	public static final void getPage(JSONObject page){
		int pageNo = page.getInteger(STR_PAGE);
		int sizeNo = page.getInteger(STR_SIZE);
		int	result = ( pageNo - 1 ) * sizeNo;
		page.put(STR_PAGE, result);
	}
	
	/**
	 * 获取总行数
	 * @param totleNum 总条数
	 * @param size 一页条数
	 * @return 总行数
	 */
	public static final int getTotleNum(int totleNum, int size){
		if(totleNum == 0 || size == 0){
			return 1;
		}
		int temp = totleNum % size;
		totleNum = totleNum / size;
		if(temp > 0){
			totleNum += 1;
		}
		return totleNum;
	}
}
