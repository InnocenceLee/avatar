package com.rkjh.eschool.entity;
/**
*@Title: ErrorMessage4D2js.java
*@Description: 返回给d2js的异常信息 
*@author Yang yixuan
*@date 2016年7月1日 上午11:26:10
*@version V1.0
*/
public class Error {
	private String name;
	private String field;
	private String validator;
	private String message;
	private String table;
	private int idx;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	public String getValidator() {
		return validator;
	}
	public void setValidator(String validator) {
		this.validator = validator;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getTable() {
		return table;
	}
	public void setTable(String table) {
		this.table = table;
	}
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	public Error(String name, String field, String validator, String message, String table, int idx) {
		this.name = name;
		this.field = field;
		this.validator = validator;
		this.message = message;
		this.table = table;
		this.idx = idx;
	}
	public Error() {
	}
	
}

