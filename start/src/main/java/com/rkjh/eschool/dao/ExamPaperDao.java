package com.rkjh.eschool.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;


/**
*@Title: ExamPaperDao.java
*@Description: 试卷Dao
*@author rkjh
*@date 2016年7月1日 上午11:38:38 
*@version V1.0
*/
@Repository
public interface ExamPaperDao {
	
	/**
	 * 查询试卷列表
	 * @param map 
	 * @return 试卷列表
	 */
	public List<Map<String, Object>> list(Map<String, Object> map);
	
	public int listCount(Map<String, Object> map);
	
	/**
	 * 查询试卷列表（审核已通过）
	 * @param map 
	 * @return 试卷列表
	 */
	public List<Map<String, Object>> listPassAuditing(Map<String, Object> map);
	
	public int listPassAuditingCount(Map<String, Object> map);
	
	/**
	 * 修改试卷信息
	 * @param map 修改信息
	 * @return 成功/失败
	 */
	public int update(Map<String, Object> map);
	
	/**  
	 * 删除试卷
	 * @param id 人员id
	 * @return 成功/失败
	 */
	public int dels(int[] idsInt);
	
	/**
	 * 新增试卷
	 * @param map 新增信息
	 * @return 成功/失败
	 */
	public void add(Map<String, Object> map);
	/**
	 * 修改试卷信息
	 * @param map 修改信息
	 * @return 成功/失败
	 */
	public int updateOne(Map<String, Object> param);

	public Map<String, Object> getExamPaperById(int id);
	
}
