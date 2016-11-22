package com.rkjh.eschool.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSONArray;

/**
* @Title: ExamDao.java
* @Description: 考试Dao
* @Author: Yang yixuan
* @Create Date: 2016年7月18日下午3:51:51
* @Version: V1.00
*/
@Repository
public interface ExamDao {

	/**
	 * 查询考试列表
	 * @return 考试列表
	 */
	public List<Map<String, Object>> list(Map<String, Object> map);
	/**
	 * 根据考试计划查询及格分数
	 * @param id 考试计划id
	 * @return 及格分数
	 */
	public Integer findPassScore(Map<String,Object> map);
	
	/**
	 * 导出excel数据
	 * @return excel数据
	 */
	public List<Map<String, Object>> excellist(Map<String, Object> map);
	
	/**
	 * 获取总条数
	 * @return 总条数
	 */
	public int count4List(Map<String, Object> map);
	
	/**
	 * 查询考试须知
	 * @param id
	 * @return
	 */
	public String examNotic(int id);
	
	/**
	 * 根据学员id查询考试列表
	 * @param map 学员id和考试计划名
	 * @return 考试列表
	 */
	public List<Map<String, Object>> list4Student(Map<String, Object> map);
	
	/**
	 * 根据考试计划id获取考试计划
	 * @param id 考试计划id
	 * @return 考试计划
	 */
	public Map<String, Object> listExamPlan(int id);
	/**
	 * 查询各个题型的分数
	 * @param map
	 * @return
	 */
	public Map<String,String> findScore(Map<String, Object> map);
	
	/**
	 * 新增考试计划
	 * @param map 考试计划
	 */
	public void addExamPlan(Map<String, Object> map);
	
	/**
	 * 根据学员新增考试记录
	 * @param map 考试记录
	 */
	public void addExam(Map<String, Object> map);
	
	/**
	 * 根据考试计划id删除考试计划{id : xx}
	 * @param ids 考试计划
	 * @return 成功/失败
	 */
	public int delExamPlan(JSONArray ids);
	
	/**
	 * 删除考试记录
	 * @param map 考试
	 * @return 成功/失败
	 */
	public int delExam(Map<String, Object> map);
	
	/**
	 * 根据考试计划id删除考试计划[1,2,3]
	 * @param ids 考试计划
	 * @return 成功/失败
	 */
	public int delExamPlanByPlanIds(JSONArray ids);
	
	/**
	 * 删除考试记录
	 * @param int 考试计划id
	 * @return 成功/失败
	 */
	public int delExamByPlanId(int id);
	
	/**
	 * 根据考试计划id查询是否是课时考试
	 * @param id 考试计划id
	 * @return 是/否
	 */
	public int checkExamIsLesson(int id);
	
	/**
	 * 根据考试计划id修改考试计划
	 * @param map 考试计划
	 * @return 成功/失败
	 */
	public int updateExamPlan(Map<String, Object> map);
	
	/**
	 * 根据考试id修改考试记录
	 * @param map 考试记录
	 * @return 成功/失败
	 */
	public int updateExam(Map<String, Object> map);
	
	/**
	 * 根据学员ids和考试计划id查询考试记录ids
	 * @return 考试记录ids
	 */
	public List<Integer> list4ExamId(Map<String, Object> map);
	
	/**
	 * 根据考试计划id查询考试计划详情
	 * @param id 考试计划id
	 * @return 考试计划详情
	 */
	public Map<String, Object> examDetail(int id);
	
	/**
	 * 考试计划详情统计信息
	 * @param map 考试计划信息
	 * @return 统计信息
	 */
	public Map<String, Object> examDetailStatistic(Map<String, Object> map);
	
	/**
	 * 根据考试计划id&学员列表查询参考人员列表信息
	 * @param map 考试计划id&学员列表
	 * @return 参考人员列表
	 */
	public List<Map<String, Object>> examPerson(Map<String, Object> map);
	
	/**
	 * 查询总条数
	 * @return 总条数
	 */
	public int count4ExamPerson(Map<String, Object> map);
	
	/**
	 * 根据考试id查询试卷信息
	 * @param id 考试id
	 * @return 试卷信息
	 */
	public Map<String, Object> examPaperContent(int id);
	
	/**
	 * 查询考试次数
	 * @param map 考试计划id&考试id
	 * @return 考试次数
	 */
	public Map<String, Object> examNum(Map<String, Object> map);
	
	/**
	 * 查询考试次数 (课时考试)
	 * @param map 考试计划id&考试id
	 * @return 考试次数
	 */
	public Map<String, Object> examNum4Lesson(Map<String, Object> map);
	
	/**
	 * 根据考试计划id查询是否有人开始考试
	 * @param id 考试计划id
	 * @return 开始人数
	 */
	public int check4Del(int id);
	
	/**
	 * 获取考试信息
	 * @param param
	 * @return
	 */
	public List<Map<String, Object>> examList(Map<String, Object> param);
	
	/**
	 * 根据考试计划id查询所有题目
	 * @param id 考试计划id
	 * @return 题目id
	 */
	public List<Map<String, Object>> listQuestion(int id);
	
	/**
	 * 根据考试计划id统计题型分布
	 * @param id 考试计划id
	 * @return 题型分布
	 */
	public Map<String, Object> statisticQuestion(int id);
	
	/**
	 * 根据考试计划id 查询改考试计划下所有学员
	 * @param planId 考试计划id
	 * @return 考试计划下所有学员id
	 */
	public Map<String, Object> examStudents2NodeStatistic(int planId);
	
	/**
	 * 根据学员id数组 查询所有学员的部门信息
	 * @param students 学员id数组
	 * @return 部门信息
	 */
	public List<Map<String, Object>> examNode2NodeStatistic(Map<String, Object> students);
	
	/**
	 * 根据考试计划id 查询各个分数段统计信息
	 * @param planId 考试计划id
	 * @return 各个分数段统计信息
	 */
	public Map<String, Object> exam2ScoreStatistic(int planId);
	
	/**
	 * 根据考试计划id 查询题型分布统计信息
	 * @param planId 考试计划id
	 * @return 题型分布统计信息
	 */
	public Map<String, Object> exam2TypeStatistic(int planId);
	
	/**
	 * 根据考试计划id&学员id 查询考试表记录（课时考试）
	 * @param map 考试计划id&学员id
	 * @return 考试表记录
	 */
	public int count4Exam(Map<String, Object> map);
	
	/**
	 * 新增考试计划(课时考试第一次交卷)
	 * @param map 考试计划
	 */
	public void add4LessonExam(Map<String, Object> map);
	
	/**
	 * 根据考试id查询课时考试详情
	 * @param id 考试id
	 * @return 课时考试详情
	 */
	public Map<String, Object> detail4LessonExam(int id);
	/**
	 * 根据考试id 判断还能否重考
	 * @param eid
	 * @return
	 */
	public Map<String, Object> reExamAble(int eid);
}
