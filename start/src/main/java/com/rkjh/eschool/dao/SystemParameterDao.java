package com.rkjh.eschool.dao;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;

/**
* @Title: SystemParameterDao.java
* @Description: 系统参数Dao
* @Author: Yang yixuan
* @Create Date: 2016年7月17日下午3:33:08
* @Version: V1.00
*/
@Repository
public interface SystemParameterDao {
	
	/**
	 * 查询所有系统参数
	 * @return 系统参数
	 */
	public List<Map<String, Object>> list();

	/**
	 * 修改系统参数
	 * @param data 系统参数
	 * @return 成功/失败
	 */
	public int update(Map<String, Object> data);
	
	/**
	 * 根据名字查询参数数量
	 * @return 数量
	 */
	public Map<String, Object> countName();
	
	/**
	 * 新增系统参数
	 * @param map 系统参数
	 */
	public void add(Map<String, Object> map);
	
	/**
	 * 根据名字查询参数
	 * @param name 参数名
	 * @return 参数
	 */
	public Map<String, Object> findByName(String name);
}
