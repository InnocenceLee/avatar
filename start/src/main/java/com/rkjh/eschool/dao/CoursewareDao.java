package com.rkjh.eschool.dao;

import java.util.Map;
import org.springframework.stereotype.Repository;

/**
*@Title: CoursewareDao.java
*@Description: 课件Dao
*@author Yang yixuan
*@date 2016年7月6日 上午11:43:08
*@version V1.0
*/
@Repository
public interface CoursewareDao {
	
	/**
	 * 新增课件
	 * @param map 新增信息
	 * @return 成功/失败
	 */
	public void add(Map<String, Object> map);
	
	/**
	 * 根据课时id删除课件
	 * @param id
	 * @return 成功/失败
	 */
	public int delBylessonId(int id);
	
	/**
	 * 根据课件id修改课件
	 * @param courseware 课件
	 * @return 成功/失败
	 */
	public int update(Map<String, Object> courseware);
	
	/**
	 * 根据课件id批量删除课件
	 * @param id 课件id
	 * @return 成功/失败
	 */
	public int del(int[] id);
}
