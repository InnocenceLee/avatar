package com.rkjh.eschool.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

/**
 * @Title: CourseDao.java
 * @Description: 课程管理Dao
 * @author Yang yixuan
 * @date 2016年7月2日 下午2:21:38
 * @version V1.0
 */
@Repository
public interface CourseDao {

	/**
	 * 查询课程列表
	 * 
	 * @return 课程列表
	 */
	public List<Map<String, Object>> list(Map<String, Object> page);

	/**
	 * 查询总条数
	 * 
	 * @return 总条数
	 */
	public int count4List(Map<String, Object> map);

	/**
	 * 查询课程审核列表
	 * 
	 * @return 前置课程列表
	 */
	public List<Map<String, Object>> listAuditing(Map<String, Object> map);

	/**
	 * 查询总条数
	 * 
	 * @return 总条数
	 */
	public int count4ListAuditing(Map<String, Object> map);

	/**
	 * 课程审核查询用户部门（判断是否是HR）
	 * 
	 * @param map
	 *            用户id
	 * @return 部门id&部门名称
	 */
	public Map<String, Object> checkNode(Map<String, Object> map);

	/**
	 * 课程审核修改
	 * 
	 * @param map
	 *            审核信息
	 * @return 成功/失败
	 */
	public int updateAuditing(Map<String, Object> map);

	/**
	 * 查询课程详情
	 * 
	 * @param id
	 *            课程id
	 * @return 课程
	 */
	public Map<String, Object> detail(int id);

	/**
	 * 修改课程信息
	 * 
	 * @param map
	 *            修改信息
	 * @return 成功/失败
	 */
	public int update(Map<String, Object> map);

	/**
	 * 删除课程
	 * 
	 * @param id
	 *            课程id
	 * @return 成功/失败
	 */
	public int del(JSONArray id);

	/**
	 * 新增课程
	 * 
	 * @param map
	 *            新增信息
	 * @return 成功/失败
	 */
	public void add(Map<String, Object> obj);

	/**
	 * check同一父节点是否同名
	 * 
	 * @param name
	 *            名字
	 * @param base
	 *            父节点
	 * @return 同名数
	 */
	public int checkName(Map<String, Object> map);

	/**
	 * 根据课程id和学习计划id查询未学习人员名单
	 * 
	 * @param id
	 *            课程id和学习计划id
	 * @return 未学习人员名单
	 */
	public List<Map<String, Object>> notLearnPerson(Map<String, Object> id);

	/**
	 * 查询总条数
	 * 
	 * @return 总条数
	 */
	public int countNotLearnPerson(Map<String, Object> map);

	/**
	 * 根据课程id和学习计划id查询评价信息
	 * 
	 * @param id
	 *            课程id和学习计划id
	 * @return 评价信息
	 */
	public List<Map<String, Object>> comment(Map<String, Object> map);

	/**
	 * 查询总条数
	 * 
	 * @return 总条数
	 */
	public int count4ListComment(Map<String, Object> map);

	/**
	 * 根据课程id查询课程名单
	 * 
	 * @param id
	 *            课程id
	 * @return 课程名单
	 */
	public List<Map<String, Object>> getNames(JSONArray id);

	/**
	 * 根据课程id查看课程是否被学习计划引用
	 * 
	 * @param id
	 *            课程id
	 * @return 引用数
	 */
	public int count4del(int id);

	/**
	 * 根据课程id查看课程是否被前置课程引用
	 * 
	 * @param id
	 *            课程id
	 * @return 引用数
	 */
	public int count4delPre(int id);

	/**
	 * 根据课程id获取课程id和课件id
	 * 
	 * @param id
	 *            课程id
	 * @return 课程id&课件id
	 */
	public List<Map<String, Object>> listById(int id);

	/**
	 * 根据学员id查询课程列表
	 * 
	 * @param map
	 *            学员id 课程名字
	 * @return 课程列表
	 */
	public List<Map<String, Object>> list4Student(Map<String, Object> map);

	/**
	 * cout总页数
	 * 
	 * @return 总页数
	 */
	public int list4StudentConut(Map<String, Object> map);

	/**
	 * 查询总耗时
	 * 
	 * @param id
	 *            学员选学课程id
	 * @return 总耗时
	 */
	public int sumTrain(int id);

	/**
	 * 查询学习进度记录
	 * 
	 * @param id
	 *            学员选学课程id
	 * @return 记录条数
	 */
	public int countSumTrain(int id);

	/**
	 * 查询已学课时
	 * 
	 * @param id
	 *            学员选学课程id
	 * @return 总耗时
	 */
	public int sumPassLesson(int id);

	/**
	 * 查询全部课时
	 * 
	 * @param id
	 *            学员选学课程id
	 * @return 总耗时
	 */
	public int sumLesson(int id);

	/**
	 * 根据用户id获取用户名字
	 * 
	 * @param id
	 *            用户id
	 * @return 用户名字
	 */
	public String getPersonName(int id);

	/**
	 * 根据课程id查询出现有的课时信息
	 * 
	 * @param courseId
	 * @return
	 */
	public List<Map<String, Object>> listLessonsByCourseId(@Param("courseId") Integer courseId);

	/**
	 * 根据课程id和学习计划id查询评价信息
	 * 
	 * @param id
	 *            课程id和学习计划id
	 * @return 评价信息
	 */
	public List<Map<String, Object>> getComment(JSONObject args);
	public List<Map<String, Object>> getComment2(JSONObject args);

	/**
	 * 根据课程id和学习计划id查询未学习人
	 * @param id
	 *  
	 */
	public List<Map<String, Object>> getNoLearnPerson(JSONObject args);
	
	/**
	 * 判断前置课程是否学完
	 * @param map 前置课程id
	 * @return 没有学完的课程
	 */
	public List<Map<String,Object>> count4PreCourses(Map<String, Object> map);
	
	
	public String listTrainLessonNameById(int id);
	
	public String listTrainCourseNameById(int id);
	
}
