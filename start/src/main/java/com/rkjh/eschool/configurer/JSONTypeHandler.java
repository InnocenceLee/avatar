package com.rkjh.eschool.configurer;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.postgresql.util.PGobject;
import com.alibaba.fastjson.JSONObject;

/**
* @Title: JSONTypeHandler.java
* @Description: 类型转换器
* @Author: Yang yixuan
* @Create Date: 2016年7月11日下午3:31:08
* @Version: V1.00
*/


@MappedJdbcTypes(JdbcType.OTHER)
public class JSONTypeHandler extends BaseTypeHandler<JSONObject> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i,
    		JSONObject parameter, JdbcType jdbcType) throws SQLException {
        PGobject jsonObject = new PGobject();
        jsonObject.setType("jsonb");
        jsonObject.setValue(parameter.toString());
        ps.setObject(i, jsonObject);
    }

    @Override
    public JSONObject getNullableResult(ResultSet rs, String columnName)
            throws SQLException {
    	JSONObject obj = new JSONObject();
    	if(rs.getObject(columnName) != null){
    		obj = (JSONObject) rs.getObject(columnName);
    	}
        return obj;
    }

    @Override
    public JSONObject getNullableResult(ResultSet rs, int columnIndex)
            throws SQLException {
    	JSONObject obj = new JSONObject();
    	if(rs.getObject(columnIndex) != null){
    		obj = (JSONObject) rs.getObject(columnIndex);
    	}
    	return obj;
    }

    @Override
    public JSONObject getNullableResult(CallableStatement cs, int columnIndex)
            throws SQLException {
    	JSONObject obj = new JSONObject();
    	if(cs.getObject(columnIndex) != null){
    		obj = (JSONObject) cs.getObject(columnIndex);
    	}
    	return obj;
    }
}
