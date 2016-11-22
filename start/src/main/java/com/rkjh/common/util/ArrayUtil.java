package com.rkjh.common.util;

import java.sql.Array;
import java.sql.SQLException;
import java.util.List;

import com.alibaba.fastjson.JSONArray;

/**
*@Title: ArrayUtil.java
*@Description: 数组集合工具类
*@author Yang yixuan
*@date 2016年6月29日 下午2:47:27
*@version V1.0
*/
public class ArrayUtil {

	/**
	 * 判断数组是否为空，长度为0
	 * @param obj 待判断数组
	 * @return 是/否
	 */
	public static final boolean isEmpty4Array(Object[] obj){
		if(obj != null && obj.length > 0){
			return false;
		}
		return true;
	}
	
	/**
	 * 判断JSON数组是否为空，长度为0
	 * @param obj 待判断数组
	 * @return 是/否
	 */
	public static final boolean isEmpty4Array(JSONArray obj){
		if(obj != null && obj.size() > 0){
			return false;
		}
		return true;
	}
	
	/**
	 * 判断数组是否为空
	 * @param obj 待判断数组
	 * @return 是/否
	 */
	public static final boolean isBlank4Array(Object[] obj){
		if(obj != null){
			return false;
		}
		return true;
	}

	/**
	 * 判断List是否为空，长度为0
	 * @param <F>
	 * @param obj 待判断List
	 * @return 是/否
	 */
	public static final <F> boolean isEmpty4List(List<F> list){
		if(list != null && list.size() > 0){
			return false;
		}
		return true;
	}
	
	/**
	 * 判断List是否为空
	 * @param <T>
	 * @param obj 待判断List
	 * @return 是/否
	 */
	public static final <T> boolean isBlank4List(List<T> list){
		if(list != null && !list.isEmpty()){
			return false;
		}
		return true;
	}
	
	/**
	 * 判断JSONArray是否为空
	 * @param jsons JSONArray
	 * @return 是/否
	 */
	public static final boolean isEmpty4JSONArray(JSONArray jsons){
		if(jsons != null && jsons.size() > 0){
			return false;
		}
		return true;
		
	}
	
	/**
	 * 转换SQLArray为Object
	 * @param arr Array
	 * @return Object
	 */
	public static final Object getObject(Array arr){
		Object obj = null;
		try {
			obj = arr.getArray();
		} catch (SQLException e) {
			ExceptionUtil.throwBusinessException("数组转换失败" + e);
		}
		return obj;
	}
}
