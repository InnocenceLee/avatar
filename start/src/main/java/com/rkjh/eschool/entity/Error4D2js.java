package com.rkjh.eschool.entity;


/**
*@Title: Error4D2js.java
*@Description: 返回给d2js异常对象
*@author Yang yixuan
*@date 2016年6月30日 下午4:42:06
*@version V1.0
*/
public class Error4D2js {
	private Error error;

	public Error getError() {
		return error;
	}

	public void setError(Error error) {
		this.error = error;
	}

	public Error4D2js(Error error) {
		this.error = error;
	}
	
	public Error4D2js() {
	}
	
}
