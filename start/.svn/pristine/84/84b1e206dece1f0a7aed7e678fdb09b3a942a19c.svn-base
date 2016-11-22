package com.rkjh.eschool.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONObject;

/**
* @Title: LearnPlanDao.java
* @Description: 学习计划Dao
* @Author: Yang yixuan
* @Create Date: 2016年7月13日上午11:11:34
* @Version: V1.00
*/
@Repository
public interface LearnPlanDao {
	
	/**
	 * 查询学习计划列表
	 * @return 学习计划列表
	 */
	public List<Map<String, Object>> list(Map<String, Object> dataObj);
	
	/**
	 * 获取总页数
	 * @return 总页数
	 */
	public int count4List(Map<String, Object> map);
	
	/**
	 * 根据学习计划id查询学习计划详情
	 * @param id 学习计划id
	 * @return 学习计划
	 */
	public Map<String, Object> detail(int id);
	
	/**
	 * 根据学习计划id统计人数
	 * @param map 学习计划id&课程id
	 * @return 完成人数&开始人数&未完成人数
	 */
	public Map<String, Object> courseContent(Map<String, Object> map);
	
	/**
	 * 根据学习计划id查询学习人员名单和课程名单
	 * @param id 学习计划id
	 * @return 学习人员&课程名单
	 */
	public List<Map<String, Object>> getPlan(Map<String, Object> map);
	
	/**
	 * 根据学习计划id查询学习人员名单
	 * @param id 学习计划id
	 * @return 学习人员
	 */
	public List<Map<String, Object>> getPerson(Map<String, Object> id);
	
	/**
	 * 新增学习计划
	 * @param plan 学习计划
	 */
	public void add(Map<String, Object> plan);
	
	/**
	 * 学员选学课程记录
	 * @param log 记录
	 */
	public void addLearnLog(Map<String, Object> log);
	
	/**
	 * 修改学习计划
	 * @param plan 学习计划
	 * @return 成功/失败
	 */
	public int update(Map<String, Object> plan);
	
	/**
	 * 根据学习计划id获取学员和课程
	 * @param id 学习计划id
	 * @return 学员和课程
	 */
	public Map<String, Object> getStudentCourse(int id);
	
	/**
	 * 根据学习计划id 学员id 课程id 删除学习记录
	 * @param id 学习计划id 学员id 课程id
	 * @return 成功/失败
	 */
	public int delLog(Map<String, Object> id);
	
	/**
	 * 根据学习计划id查询学习计划是否有人开始学习
	 * @param id 学习计划id
	 * @return 学习人数
	 */
	public int count4Del(int id);
	
	/**
	 * 根据学习计划id删除学习计划
	 * @param id 学习计划id
	 * @return 成功/失败
	 */
	public int delPlan(int id);
	
	/**
	 * 根据学习计划id删除学习记录
	 * @param id 学习计划id
	 * @return 成功/失败
	 */
	public int delPlanLog(int id);
	
	/**
	 * 获取总条数
	 * @return 总条数
	 */
	public int count4GetPlan(Map<String, Object> map);

	/**
	 * 获取总条数
	 * @return 总条数
	 */
	public int count4GetPerson(Map<String, Object> map);
	
	/**
	 * 获取总条数
	 * @return 总条数
	 */
	public int countNotifyPersonList(Map<String, Object> map);
	
	/**
	 * 根据学习计划id获取通知人员列表
	 * @param map 学习计划id
	 * @return 通知人员列表
	 */
	public List<Map<String, Object>> notifyPersonList(Map<String, Object> map);
	
}
