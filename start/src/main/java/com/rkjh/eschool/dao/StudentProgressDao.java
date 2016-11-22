package com.rkjh.eschool.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSONObject;

/**
* @Title: StudentProgressDao.java
* @Description: 学习进度Dao
* @Author: Yang yixuan
* @Create Date: 2016年7月9日下午3:22:45
* @Version: V1.00
*/
@Repository
public interface StudentProgressDao {

	/**
	 * 根据课程id查询课时评价
	 * @param map 查询条件
	 * @return 课时评价
	 */
	public List<Map<String, Object>> list4Course(Map<String, Object> map);
	
	/**
	 * 查询总条数
	 * @return 总条数
	 */
	public int countList4Course(Map<String, Object> map);
	
	/**
	 * 修改学习进度（员工端）
	 * @param map 学习记录信息
	 * @return 成功/失败
	 */
	public int studentProgressUpdate(Map<String, Object> map);
	
	/**
	 * 新增学习进度（员工端）
	 * @param map 学习记录信息
	 * @return 成功/失败
	 */
	public int studentProgressAdd(Map<String, Object> map);
	
	/**
	 * 查询学习进度是否存在
	 * @param map 学员选学课程id&课时id
	 * @return 学习进度条数
	 */
	public int checkStudentProgress(Map<String, Object> map);
	
	/**
	 * 更新学习进度
	 * @param map 学习进度
	 * @return 成功/失败
	 */
	public int updateLearnState(Map<String, Object> map);
	
	/**
	 * 查询课程是否全部学习完
	 * @return 已完成数量
	 */
	public Map<String, Object> countPassLessonNum(Map<String, Object> map);
	
	/**
	 * 查询课程所有课时
	 * @return 课时
	 */
	public int countLessonNum(int trainStudentLearnCourseId);
	
	/**
	 * 更新历史学习记录状态
	 * @param map
	 */
	public void UpdateTrainStudentProgress(Map<String, Object> map);
}
