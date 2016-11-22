package com.rkjh.eschool.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

/**
*@Title: KnowledgePointDao.java
*@Description: 知识点管理Dao
*@author Yang yixuan
*@date 2016年7月1日 上午11:38:38 
*@version V1.0
*/
@Repository
public interface KnowledgePointDao {
	
	/**
	 * 查询知识点列表
	 * @return 知识点列表
	 */
	public List<Map<String, Object>> list(Map<String,Object> m);
	/**
	 * 查询当前知识点的子知识点及本身
	 * @param m
	 * @return
	 */
	public List<Map<String, Object>> findChildren(Integer base);
	/**
	 * 根据id查询node
	 * @param id
	 * @return
	 */
	public Integer findById(Integer id);
	/**
	 * 修改知识点信息
	 * @param map 修改信息
	 * @return 成功/失败
	 */
	public int update(Map<String, Object> map);
	
	/**  
	 * 删除知识点
	 * @param id 人员id
	 * @return 成功/失败
	 */
	public int del(int id);
	
	/**
	 * 新增知识点
	 * @param map 新增信息
	 * @return 成功/失败
	 */
	public void add(Map<String, Object> map);
	
	/**
	 * check同一父节点是否同名
	 * @param name 名字
	 * @param base 父节点
	 * @return 同名数
	 */
	public int checkName(Map<String, Object> map);
	
	/**
	 * 查看知识点是否被引用
	 * @param id 知识点id
	 * @return 引用数
	 */
	public Map<String, Object> count4Del(int id);
	
	/**
	 * 根据课程id查询知识点id
	 * @param id 课程id
	 * @return 知识点id
	 */
	public List<Map<String, Object>> findIdByCourseId(int id);
	
	/**  
	 * 根据知识点base删除知识点
	 * @param id 知识点base
	 * @return 成功/失败
	 */
	public int delByBase(int id);
	
	/**
	 * 获取知识点树数据
	 * @param id
	 * @return
	 */
	public List<Map<String, Object>> loadKnowledgeTree(Map<String,Object> args);

	public Map<String, Object> getKnowledgePointById(int id);
}
