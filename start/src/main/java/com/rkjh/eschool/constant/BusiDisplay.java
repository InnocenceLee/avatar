package com.rkjh.eschool.constant;

/**
* @Title: BusiDisplay.java
* @Description: 
* @Author: Yang yixuan
* @Create Date: 2016年7月21日下午5:37:43
* @Version: V1.00
*/

public class BusiDisplay {
	
	/**
	 * 获取课程类型
	 * @param type 类型
	 * @return 类型名
	 */
	public static final String getTrainType(String type){
		switch (type) {
		case "S":
			return "标准课件";
		case "M":
			return "通知课件";
		default:
			return "";
		}
	}
	
	public static final String getStateName(String stateCode){
		String stateName = "";
		switch (stateCode) {
		case "N":
			stateName = "未审核";
			break;
		case "A":
			stateName = "审核通过";
			break;
		case "J":
			stateName = "审核不通过";
			break;
		case "R":
			stateName = "就绪";
			break;
		case "L":
			stateName = "学习中";
			break;
		case "O":
			stateName = "完成";
			break;
		case "E":
			stateName = "错误";
			break;
		default:
			break;
		}
		return stateName;
	}
}
