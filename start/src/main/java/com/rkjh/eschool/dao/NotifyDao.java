package com.rkjh.eschool.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSONArray;


/**
*@Title: NotifyDao.java
*@Description: 公告Dao
*@author rkjh
*@date 2016年7月1日 上午11:38:38 
*@version V1.0
*/
@Repository
public interface NotifyDao {
	
	/**
	 * 查询公告列表
	 * @param size 
	 * @param start 
	 * @param difficulty 
	 * @param type 
	 * @return 公告列表
	 */
	public List<Map<String, Object>> list(Map<String, Object> map);
	
	public List<Map<String, Object>> listByPerson(Map<String, Object> map);
	
	public Integer listCount(Map<String, Object> map);
	
	public Integer listCountByPerson(Map<String, Object> map);
	
	public Integer listNewCountByPerson(Map<String, Object> map);
	
	public Map<String, Object> getById(Map<String, Object> map);
	
	public void updateNotifyById(Map<String, Object> map);
	
	public String getNodeName(Map<String, Object> map);
	/**
	 * 新增公告
	 * @param map 新增信息
	 * @return 成功/失败
	 */
	public void add(Map<String, Object> map);
	
	public void update(Map<String, Object> map);
	
	public int delNotifyByIds(JSONArray ids);
}
