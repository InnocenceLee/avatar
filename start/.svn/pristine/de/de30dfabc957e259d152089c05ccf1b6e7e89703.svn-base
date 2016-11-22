package com.rkjh.eschool.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

@Repository
public interface HelpDao {


	/**
	 * 添加帮助
	 * 
	 * @param map
	 *            新增信息
	 * @return 成功/失败
	 */
	public void add(Map<String, Object> obj);
	
	
	/**
	 * 获取帮助列表
	 */
	public List<Map<String, Object>> helpList();
	
	
	/**
	 * 获取帮助详情
	 * @param id
	 * @return
	 */
	public Map<String, Object> gethelpDetail(int id);
	/**
	 * 修改帮助
	 * @param obj
	 */
	public void modyfy(Map<String, Object> obj);
	
	/**
	 * 删除帮助
	 * @param obj
	 */
	public int helpDel(int id);
	
}
