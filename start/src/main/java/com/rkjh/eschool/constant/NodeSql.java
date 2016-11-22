package com.rkjh.eschool.constant;

import java.util.Map;

import javax.servlet.http.HttpSession;

import com.avatar.Node;

/**
* @Title: NodeSql.java
* @Description: 获取nodeSql
* @Author: Yang yixuan
* @Create Date: 2016年8月23日下午1:46:17
* @Version: V1.00
*/

public class NodeSql {
	public static String getNodeSql(HttpSession session, String tableName) throws Exception{
		Map m = (Map)session.getAttribute("userJava");
		m = (Map)m.get("node");
		Double node = (Double)m.get("id");
		String sql = Node.nodeSql(node.intValue(), tableName, false);
		return sql;
	}
}
