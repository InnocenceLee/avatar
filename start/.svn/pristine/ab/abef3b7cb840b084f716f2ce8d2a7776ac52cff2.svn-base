package com.rkjh.eschool.entity;

import java.util.List;
import com.rkjh.common.util.ArrayUtil;
import com.rkjh.common.util.StringUtil;

/**
*@Title: Data4D2js.java
*@Description: 传递给d2js的数据模型
*@author Yang yixuan
*@date 2016年6月30日 下午4:30:12
*@version V1.0
*/
public class Data4D2js {
	public static final String SUCCESS = "{\"success\":true}";
	private List<String> name;
	private List<String> type;
	private List<Object> value;
	private String resultStr = "{columns:[%s],rows:[%s]}";
	private String columns = "{name:'%s',type:'%s'}";
	private String rows = "%s:'%s'";
	
	public Data4D2js(List<String> name, List<String> type, List<Object> value) {
		this.name = name;
		this.type = type;
		this.value = value;
	}

	public Data4D2js() {
	}
	

	public List<String> getName() {
		return name;
	}

	public void setName(List<String> name) {
		this.name = name;
	}

	public String getResultStr() {
		return resultStr;
	}

	public void setResultStr(String resultStr) {
		this.resultStr = resultStr;
	}

	public String getColumns() {
		return columns;
	}

	public void setColumns(String columns) {
		this.columns = columns;
	}

	public void setData(List<String> name, List<String> type, List<Object> value) {
		this.name = name;
		this.type = type;
		this.value = value;
	}
	
	public String getData(){
		if(ArrayUtil.isEmpty4List(name) && ArrayUtil.isEmpty4List(type)
				&& ArrayUtil.isEmpty4List(value))
			return "";
		if((name.size() != type.size()) || (name.size() < 1))
			return "";
			
		String tempClo = "";
		String tempRow = "{";
		
		for(int i = 0; i < name.size(); ++i){
			tempClo = tempClo.concat(String.format(columns, name.get(i),type.get(i))).concat(",");
		}

		int col = 0;
		for(int i = 0, j = name.size(); i < value.size(); ++i){
			tempRow = tempRow.concat(String.format(rows, name.get(col),value.get(i))).concat(",");
			if(col == j - 1){
				col = 0;
				tempRow = tempRow.substring(0, tempRow.length() - 1);
				tempRow = tempRow.concat("},{");
			} else {
				++col;
			}
		}
		
		if(!StringUtil.isEmpty(tempClo)){
			tempClo = tempClo.substring(0, tempClo.length() - 1);
		}
		if(!StringUtil.isEmpty(tempRow) && value.size() > 0){
			tempRow = tempRow.substring(0, tempRow.length() - 2);
		}
		if(!StringUtil.isEmpty(tempRow) && value.size() == 0){
			tempRow = tempRow.substring(0, tempRow.length() - 1);
		}
		resultStr = String.format(resultStr, tempClo, tempRow);
		return resultStr;
	}
}
