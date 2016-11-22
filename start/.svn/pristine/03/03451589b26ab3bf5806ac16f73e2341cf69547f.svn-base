package com.rkjh.eschool.service;

import java.sql.Array;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.rkjh.common.util.ArrayUtil;
import com.rkjh.common.util.ExceptionUtil;
import com.rkjh.common.util.PageUtil;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.constant.BusiEnum;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.dao.LearnPlanDao;

/**
* @Title: LearnPlanService.java
* @Description: 学习计划Service 
* @Author: Yang yixuan
* @Create Date: 2016年7月13日上午11:14:06
* @Version: V1.00
*/
@Service
public class LearnPlanService {
	
	/**
	 * 学习计划Dao
	 */
	@Autowired
	public LearnPlanDao learnPlanDao;
	
	/**
	 * 查询学习计划列表
	 * @return 学习计划列表
	 */
	public List<Map<String, Object>> list(JSONObject dataObj){
		PageUtil.getPage(dataObj);
		List<Map<String, Object>> resultList = learnPlanDao.list(dataObj);
		if(!ArrayUtil.isBlank4List(resultList)){
			int courseSize = 0;
			for(Map<String, Object> map : resultList){
				if(map.get("courses") != null){
					Array courses = (Array)map.get("courses");
					Object preCourses = ArrayUtil.getObject(courses);
					JSONArray arr = JSON.parseArray(JSON.toJSONString(preCourses));
					map.put("courses", arr);
					courseSize = arr.size();
					map.put("courseSize", courseSize);
				}
			}

			int totleNum = learnPlanDao.count4List(dataObj);
			int size = dataObj.getInteger("size");
			totleNum = PageUtil.getTotleNum(totleNum, size);
			Map<String, Object> map = resultList.get(0);
			if(map != null){
				map.put("totleNum", totleNum);
			}
		}
		return resultList;
	}
	
	/**
	 * 根据学习计划id查询学习计划详情
	 * @param id 学习计划id
	 * @return 学习计划
	 */
	public Map<String, Object> detail(int id){
		Map<String, Object> result = learnPlanDao.detail(id);
		return result;
	}
	
	/**
	 * 根据学习计划id统计人数
	 * @param id 学习计划id
	 * @return 完成人数&开始人数&未完成人数
	 */
	public Map<String, Object> courseContent(Map<String, Object> map){
		Map<String, Object> result = learnPlanDao.courseContent(map);
		return result;
	}
	
	/**
	 * 根据学习计划id查询学习人员名单和课程名单
	 * @param id 学习计划id
	 * @return 学习人员&课程名单
	 */
	public List<Map<String, Object>> getPlan(JSONObject dataObj){
		PageUtil.getPage(dataObj);
		List<Map<String, Object>> result = learnPlanDao.getPlan(dataObj);
		if(!ArrayUtil.isBlank4List(result)){
			int totleNum = learnPlanDao.count4GetPlan(dataObj);
			int size = dataObj.getInteger("size");
			totleNum = PageUtil.getTotleNum(totleNum, size);
			Map<String, Object> map = result.get(0);
			if(map != null){
				map.put("totleNum", totleNum);
			}
		}
		return result;
	}
	
	/**
	 * 根据学习计划id查询学习学员 信息
	 * @param id 学习计划id
	 * @return 学习人员
	 */
	public List<Map<String, Object>> getPerson(JSONObject dataObj){
		PageUtil.getPage(dataObj);
		/*if(!StringUtil.isEmpty(dataObj.getString("personName"))){
			String personName = dataObj.getString("personName");
			personName = "%" + personName + "%";
			dataObj.put("personName", personName);
		}
		if(!StringUtil.isEmpty(dataObj.getString("nodeName"))){
			String nodeName = dataObj.getString("nodeName");
			nodeName = "%" + nodeName + "%";
			dataObj.put("nodeName", nodeName);
		}*/
		List<Map<String, Object>> result = learnPlanDao.getPerson(dataObj);
		if(!ArrayUtil.isBlank4List(result)){
			int totleNum = learnPlanDao.count4GetPerson(dataObj);
			int size = dataObj.getInteger("size");
			totleNum = PageUtil.getTotleNum(totleNum, size);
			Map<String, Object> map = result.get(0);
			if(map != null){
				map.put("totleNum", totleNum);
			}
		}
		return result;
	}
	
	/**
	 * 新增学习计划
	 * @param plan 学习计划
	 * @return 成功/失败
	 */
	@Transactional
	public int add(JSONObject plan){
		// 获取开始时间
		String start = plan.getString("trainBatchStart");
		if(StringUtil.isEmpty(start)){
			ExceptionUtil.throwBusinessException("新增学习计划失败,开始时间不能为空");
		}
		// 获取结束时间
		String end = plan.getString("trainBatchEnd");
		if(StringUtil.isEmpty(end)){
			ExceptionUtil.throwBusinessException("新增学习计划失败,结束时间不能为空");
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date starttime = null;
		Date endtime = null;
		Timestamp startTimestamp = null;
		Timestamp endTimestamp = null;
		try {
			starttime = sdf.parse(start);
			endtime = sdf.parse(end);
			startTimestamp = new Timestamp(starttime.getTime());
			endTimestamp = new Timestamp(endtime.getTime());
			plan.put("trainBatchStart", startTimestamp);
			plan.put("trainBatchEnd", endTimestamp);
		} catch (ParseException e) {
			ExceptionUtil.throwBusinessException("新增学习计划失败,时间格式错误");
		}
		// 添加学习计划
		learnPlanDao.add(plan);
		if(plan.get("id") == null){
			ExceptionUtil.throwBusinessException("新增学习计划失败");
		}
		
		// 课程id
		JSONArray courses = plan.getJSONArray("courses");
		// 学员id
		JSONArray students = plan.getJSONArray("students");
		// 计划id
		int planId = plan.getInteger("id");
		
		for(int i = 0; i < courses.size(); ++i){
			int courseId = courses.getInteger(i);
			for(int j = 0; j < students.size(); ++j){
				int studentId = students.getInteger(j);
				// 新增学习记录
				Map<String, Object> log = new HashMap<String, Object>();
				log.put("trainCourseLesson", courseId);
				log.put("student", studentId);
				log.put("trainPlan", planId);
				log.put("state", BusiEnum.PLAN_LOG_STATE_R);
				log.put("planner", plan.get("planner"));
				log.put("planStart", startTimestamp);
				log.put("planEnd", endTimestamp);
				learnPlanDao.addLearnLog(log);
				if(log.get("id") == null){
					ExceptionUtil.throwBusinessException("新增学习计划记录失败");
				}
			}
		}
		return CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 修改学习计划
	 * @param plan 学习计划
	 * @return 成功/失败
	 */
	@Transactional
	public int update(JSONObject plan){
		// 获取开始时间
		String start = plan.getString("trainBatchStart");
		if(StringUtil.isEmpty(start)){
			ExceptionUtil.throwBusinessException("修改学习计划失败,开始时间不能为空");
		}
		// 获取结束时间
		String end = plan.getString("trainBatchEnd");
		if(StringUtil.isEmpty(end)){
			ExceptionUtil.throwBusinessException("修改学习计划失败,结束时间不能为空");
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date starttime = null;
		Date endtime = null;
		Timestamp startTimestamp = null;
		Timestamp endTimestamp = null;
		try {
			starttime = sdf.parse(start);
			endtime = sdf.parse(end);
			startTimestamp = new Timestamp(starttime.getTime());
			endTimestamp = new Timestamp(endtime.getTime());
			plan.put("trainBatchStart", startTimestamp);
			plan.put("trainBatchEnd", endTimestamp);
		} catch (ParseException e) {
			ExceptionUtil.throwBusinessException("修改学习计划失败,时间格式错误");
		}
		
		// 获取学习计划id
		int planId = plan.getInteger("id");
		
		Map<String, Object> studentCourse = learnPlanDao.getStudentCourse(planId);
		
		Array students = (Array)studentCourse.get("students");
		Object studentsObj = ArrayUtil.getObject(students);
		JSONArray studentsArray4Db = JSON.parseArray(JSON.toJSONString(studentsObj));
		
		Array courses = (Array)studentCourse.get("courses");
		Object coursesObj = ArrayUtil.getObject(courses);
		JSONArray coursesArray4Db = JSON.parseArray(JSON.toJSONString(coursesObj));
		
		// 页面传递学习人员名单
		JSONArray studentsArray = plan.getJSONArray("students");
		// 页面传递课程名单
		JSONArray coursesArray = plan.getJSONArray("courses");
		
		// 修改学习计划
		int result = learnPlanDao.update(plan);
		if(result < 1){
			ExceptionUtil.throwBusinessException("修改学习计划失败");
		}

		// 删除原已存在的学习记录
		Map<String, Object> oldLog = new HashMap<String, Object>();
		oldLog.put("trainPlan", planId);
		result = learnPlanDao.delLog(oldLog);
		if(result < 1){
			ExceptionUtil.throwBusinessException("删除原已存在的学习记录失败");
		}
		
		// 新增学习记录
		for(int i = 0; i < studentsArray.size(); ++i){
			int studentId = studentsArray.getInteger(i);
			for(int j = 0; j < coursesArray.size(); ++j){
				int courseId = coursesArray.getInteger(j);
				// 新增学习记录
				Map<String, Object> log = new HashMap<String, Object>();
				log.put("trainCourseLesson", courseId);
				log.put("student", studentId);
				log.put("trainPlan", planId);
				log.put("state", BusiEnum.PLAN_LOG_STATE_R);
				log.put("planner", plan.get("planner"));
				log.put("planStart", plan.get("trainBatchStart"));
				log.put("planEnd", plan.get("trainBatchEnd"));
				learnPlanDao.addLearnLog(log);
				if(log.get("id") == null){
					ExceptionUtil.throwBusinessException("修改学习计划记录失败");
				}
			}
		}
		return CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 根据学习计划id删除学习计划
	 * @param id 学习计划id
	 * @return 成功/失败
	 */
	@Transactional
	public int delPlan(int id){
		// 是否有人开始学习
		int result = learnPlanDao.count4Del(id);
		if(result > 0){
			ExceptionUtil.throwBusinessException("该学习计划被使用，无法删除！");
		}
		// 删除学习计划记录
		result = learnPlanDao.delPlanLog(id);
		if(result < 0){
			ExceptionUtil.throwBusinessException("删除改计划学习记录失败！");
		}
		// 删除学习计划
		result = learnPlanDao.delPlan(id);
		if(result < 0){
			ExceptionUtil.throwBusinessException("删除学习计划失败！");
		}
		return CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 根据学习计划id获取通知人员列表
	 * @param map 学习计划id
	 * @return 通知人员列表
	 */
	public List<Map<String, Object>> notifyPersonList(JSONObject dataObj){
		PageUtil.getPage(dataObj);
		/*if(!StringUtil.isEmpty(dataObj.getString("personName"))){
			String personName = dataObj.getString("personName");
			personName = "%" + personName + "%";
			dataObj.put("personName", personName);
		}*/
		if(StringUtil.isEmpty(dataObj.getString("personId"))){
			dataObj.put("personId", null);
		}
		/*if(!StringUtil.isEmpty(dataObj.getString("nodeName"))){
			String nodeName = dataObj.getString("nodeName");
			nodeName = "%" + nodeName + "%";
			dataObj.put("nodeName", nodeName);
		}*/
		List<Map<String, Object>> result = learnPlanDao.notifyPersonList(dataObj);
		if(!ArrayUtil.isBlank4List(result)){
			int totleNum = learnPlanDao.countNotifyPersonList(dataObj);
			int size = dataObj.getInteger("size");
			totleNum = PageUtil.getTotleNum(totleNum, size);
			Map<String, Object> map = result.get(0);
			if(map != null){
				map.put("totleNum", totleNum);
			}
		}
		return result;
	}
}
