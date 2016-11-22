package com.rkjh.eschool.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSONArray;


/**
*@Title: ExamPaperDao.java
*@Description: 题库Dao
*@author rkjh
*@date 2016年7月1日 上午11:38:38 
*@version V1.0
*/
@Repository
public interface ExamQuestionDao {
	
	/**
	 * 查询题库列表
	 * @param size 
	 * @param start 
	 * @param difficulty 
	 * @param type 
	 * @return 题库列表
	 */
	public List<Map<String, Object>> list(Map<String, Object> map);
	
	/**
	 * 条件查询题库列表数目
	 * @param difficulty 
	 * @param type 
	 * @return 题库列表
	 */
	public int listCount(Map<String, Object> map);
	
	/**
	 * 修改题库信息
	 * @param map 修改信息
	 * @return 成功/失败
	 */
	public int update(Map<String, Object> map);
	
	/**  
	 * 删除题库
	 * @param id 人员id
	 * @return 成功/失败
	 */
	public int dels(int[] idsInt);
	
	/**
	 * 新增题库
	 * @param map 新增信息
	 * @return 成功/失败
	 */
	public void add(Map<String, Object> map);
	/**
	 * 查询当前用户node名称
	 * @param map
	 * @return
	 */
	public String findNodeName(Map<String, Object> map);
	/**
	 * 获取题
	 * @param ids id集合
	 * @return
	 */
	public List<Map<String, Object>> getByIds(int[] ids);

	
	/**
	 * 自定义生成的试卷问题
	 * @return
	 */
	public List<Map<String, Object>> customQuesttion(Map<String,Object> params);
	/**
	 * 根据条件查询单选题
	 * @param params
	 * @return
	 */
	public List<Map<String, Object>> findSQuestions(Map<String, Object> params);	
	
	/**
	 * 根据条件查询多选题
	 * @param params
	 * @return
	 */
	public List<Map<String, Object>> findMQuestions(Map<String, Object> params);	
	
	/**
	 * 根据条件查询判断题
	 * @param params
	 * @return
	 */
	public List<Map<String, Object>> findCQuestions(Map<String, Object> params);	
	
	/**
	 * 根据题目ids查询题目信息
	 * @param questionId 题目ids
	 * @return 题目信息
	 */
	public List<Map<String, Object>> list4Id(JSONArray questionId);
	

	public List<Map<String, Object>> list4Ids(Map<String, Object> args);

	/**
	 * 自定义生成的试卷问题（分页）总就数
	 * @return
	 */
	public Integer count4customQuesttion(Map<String, Object> param);
	
	
	public Integer selectCurrentId();
	
	public Integer findDept(Map<String,Object> map);
}
