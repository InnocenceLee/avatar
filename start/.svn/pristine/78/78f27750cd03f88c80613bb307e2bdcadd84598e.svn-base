package com.rkjh.eschool.dao;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSONObject;

/**
*@Title: LessonDao.java
*@Description: 课时管理Dao
*@author Yang yixuan
*@date 2016年7月2日 下午2:49:38 
*@version V1.0
*/
@Repository
public interface LessonDao {
	
	/**
	 * 根据课程id查询课时列表
	 * @return 课时列表
	 */
	public List<Map<String, Object>> list(Map<String, Object> id);
	
	/**
	 * 根据课程id查询课时列表学员端
	 * @return 课时列表
	 */
	public List<Map<String, Object>> listStudent(Map<String, Object> id);
	
	/**
	 * 课时名字列表（下拉选择列表）
	 * @param 课程id
	 * @return 课时列表
	 */
	public List<Map<String, Object>> listName(int id);
	
	/**
	 * 修改课时信息
	 * @param map 修改信息
	 * @return 成功/失败
	 */
	public int update(Map<String, Object> map);

	/**
	 * 查询课时详情
	 * @param id 课时id
	 * @return 课时
	 */
	public List<Map<String, Object>> detail(int id);
	
	/**
	 * 新增课时
	 * @param map 新增信息
	 * @return 成功/失败
	 */
	public void add(Map<String, Object> obj);
	
	/**
	 * 根据课程id和学习计划id查询学习记录
	 * @param map 课程id和学习计划id
	 * @return 学习记录
	 */
	public List<Map<String, Object>> learnLog(Map<String, Object> map);
	/**
	 * 根据课程id和学习计划id查询学习人员
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> learnPerson(Map<String, Object> map);

	
	
	/**
	 * 获取总条数
	 * @return 总条数
	 */
	public int count4LearnLog(Map<String, Object> map);

	/**
	 * 获取总条数2
	 * @return 总条数
	 */
	public int count4LearnLog2(Map<String, Object> map);
	/**
	 * 获取课程学习人员
	 * @return 总条数
	 */
	public int count4LearnPerson(Map<String, Object> map);
	
	/**
	 * 根据课程id删除课时
	 * @param id
	 * @return 成功/失败
	 */
	public int delBycourseId(int id);
	
	/**
	 * 根据课程id查询课时id
	 * @param id 课程id
	 * @return 课时id
	 */
	public List<Map<String, Object>> list4del(int id);

	/**
	 * 根据课时id批量删除课时
	 * @param id 课时id
	 * @return 成功/失败
	 */
	public int del(int[] id);
	
	/**
	 * 根据课时id查询课时
	 * @return 课时
	 */
	public Map<String, Object> lesson(int id);
	
	/**
	 * 获取总条数
	 * @return 总条数
	 */
	public int count4List(Map<String, Object> id);
	
	/**
	 * 获取总条数学员端
	 * @return 总条数
	 */
	public int count4ListStudent(Map<String, Object> id);
	
	/**
	 * 统计平均学习时间分布图
	 * @param map 学习计划Id&课程id
	 * @return 统计平均学习时间分布图
	 */
	public Map<String, Object> statisticLearnTime(Map<String, Object> map);
	
	/**
	 * 统计部门人员分布
	 * @param map 学习计划Id&课程id
	 * @return 统计部门人员分布
	 */
	public List<Map<String, Object>> statisticLearnNode(Map<String, Object> map);
	
	/**
	 * 统计部门人员分布部门id
	 * @param map 学习计划Id&课程id
	 * @return 部门id
	 */
	public List<Map<String, Object>> distinctLearnNode(Map<String, Object> map);
	
	/**
	 * 统计星级评价树状图
	 * @param map 学习计划Id&课程id
	 * @return 统计星级评价树状图
	 */
	public Map<String, Object> statisticLearnEvaluation(Map<String, Object> map);
	 /**
     * 获取课程学习人员
     * @param args  学习计划Id&课程id
     * @return
     */
	public List<Map<String, Object>> getLearnPerson(Map<String, Object> args);
	/**
	 * 导出课程学习人员
	 * @param args
	 * @return
	 */
	public List<Map<String, Object>> exportLearnPerson(Map<String, Object> args);
	
	/**
	 * 获取课件信息
	 * @param id
	 * @return
	 */
	public List<Map<String, Object>> getCourseWare(int id);
	
	/**
	 * 查询学员端学习记录
	 * @param map 选学课程id&课时id
	 * @return 学习记录
	 */
	public Map<String, Object> learnLog4Student(Map<String, Object> map);
	
	/**
	 * 查询学员端考试记录
	 * @param map 选学课程id&课时id
	 * @return 考试记录
	 */
	public Map<String, Object> examLog4Student(int examPaper);
}
