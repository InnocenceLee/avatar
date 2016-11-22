package com.avatar;

import java.util.List;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;
import org.siphon.d2js.D2jsExecutor;

public class Node {

	/**
	 * 生成一个别名为 nd （反转时为 ndr）的 with 语句，用于构造查询。
	 * 用法如
	 * 
	 * nodeSql(2, 'TRAIN_PLAN', false) + " select p.* from train_plan p, nd where p.node = nd.id"
	 * 
	 * @param startNode 出发节点ID。必填。默认可取 session.userJava.node。
	 * @param childType	子节点类型。如 TRAIN_COURSE, TRAIN_PLAN, OFFICE 等
	 * @param reverse 是否反转。反转后别名为 ndr。
	 * @return
	 * @throws Exception
	 */
	public static String nodeSql(Integer startNode, String childType, boolean reverse) throws Exception{
		List<String> types =  (List<String>) D2jsExecutor.exec("/sys/node.d2js", "findAncientTypesAnd", childType);
		String alias = "nd";
		String sql = "with recursive t as (select *, 1 lv, name::varchar(2000) path from node where id = :node"  
					 + " union select d.*, t.lv + 1, (t.path || d.name) :: varchar(2000) from node d, t where d.parent_id = t.id "; 
		if(reverse){
			alias = "ndr";
			sql = "with recursive t as (select *, 1 lv, name::varchar(2000) path from node where id = :node"  
			 		 + " union select d.*, t.lv + 1, (t.path || d.name) :: varchar(2000) from node d, t where d.id = t.parent_id " ;
		}
		if(!types.isEmpty()){
			StringBuffer s = new StringBuffer();
			for(String t : types){
				s.append("'" + t.toUpperCase() + "',");
			}
			s.setLength(s.length()-1);
			
			sql +=  " and d.type in (" + s + ")";
		}
		sql += " ) select id, name, parent_id, type, lv, path from t order by path";
		sql = sql.replaceAll(":node", startNode.toString());
		
		return "with " + alias + " as (" + sql + ")";
	}
}
