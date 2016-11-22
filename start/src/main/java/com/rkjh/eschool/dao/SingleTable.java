package com.rkjh.eschool.dao;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;

/**
*@Title: SingleTable.java
*@Description: 单表操作
*@author Yang yixuan
*@date 2016年6月29日 下午6:50:52
*@version V1.0
*/
@Repository
public interface SingleTable {
	
	public Map<String,Object> findById(Object object);
	
	public Map<String,Object> find4Sql(String query, String require, Object... value);
	
	public Map<String,Object> add(Object object);
	
	public int del(Object object);
	
	public int update(Object object);
	
	public List<Map<String,Object>> merge(Object object);

}
