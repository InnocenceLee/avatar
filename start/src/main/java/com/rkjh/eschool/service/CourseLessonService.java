package com.rkjh.eschool.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.rkjh.common.util.ArrayUtil;
import com.rkjh.common.util.ExceptionUtil;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.constant.BusiEnum;
import com.rkjh.eschool.constant.CodeEnum;

/**
*@Title: CourseLessonService.java
*@Description: 课程-适配器
*@author Yang yixuan
*@date 2016年7月8日 下午2:26:38
*@version V1.0
*/
@Service
public class CourseLessonService {

	/**
	 * 课程管理Service
	 */
	@Autowired
	public CourseService courseService;

	/**
	 * 课时管理Service
	 */
	@Autowired
	public LessonService lessonService;

	/**
	 * 课件管理Service
	 */
	@Autowired
	public CoursewareService coursewareService;
	
	/**
	 * 知识点Service
	 */
	@Autowired
	public KnowledgePointService KnowledgePointService;
	
	/**
	 * 考试Service
	 */
	@Autowired
	public ExamService examService;
	
	/**
	 * 新增课程
	 * @param course 课程
	 * @param courseware 课件
	 * @return 成功/失败
	 */
	@Transactional
	public int addCourse(JSONObject course,int node){
		
		// 添加课程
		int result = courseService.add(course);
		if(result == CodeEnum.ERROR_CODE_N1){
			ExceptionUtil.throwBusinessException("新增课程失败");
		}
		int courseKnowledgePoint = 0;
		if(course.get("knowledgePoint") != null){
			//课程加入节点
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("title", course.get("name"));
			map.put("remarks", course.get("introduction"));
			map.put("base", course.get("knowledgePoint"));
			map.put("node", node);
			result = KnowledgePointService.add(map);
			courseKnowledgePoint = (int)map.get("id");
			if(result == CodeEnum.ERROR_CODE_N1){
				ExceptionUtil.throwBusinessException("课程添加失败，课程名称或者课时名称与已经存在的知识点重名");
			}
		} else {
			ExceptionUtil.throwBusinessException("课程加入节点失败");
		}
				
		// 添加课时
		JSONArray trainLesson = course.getJSONArray("lesson");
		if(ArrayUtil.isEmpty4Array(trainLesson)){
			ExceptionUtil.throwBusinessException("课程缺少课时");
		}
		for(int i = 0; i < trainLesson.size(); ++i){
			JSONObject lessonObj = trainLesson.getJSONObject(i);
			lessonObj.put("trainCourse", course.get("id"));
			lessonObj.put("knowledgePoint", courseKnowledgePoint);
			if(BusiEnum.JION_SYSTEM_Y.equals(lessonObj.getString("jionSystem"))){
				//加入节点
				Map<String, Object> lessonMap = new HashMap<String, Object>();
				lessonMap.put("title", lessonObj.get("name"));
				lessonMap.put("remarks", lessonObj.get("introduction"));
				lessonMap.put("base", courseKnowledgePoint);
				lessonMap.put("node", node);
				result = KnowledgePointService.add(lessonMap);
				if(result == CodeEnum.ERROR_CODE_N1){
					ExceptionUtil.throwBusinessException("课时加入节点失败");
				}
			}
		}
		result = lessonService.batAdd(trainLesson);
		if(result == CodeEnum.ERROR_CODE_N1){
			ExceptionUtil.throwBusinessException("新增课时失败");
		}
		// 添加课件
		for(int i = 0; i < trainLesson.size(); ++i){
			JSONObject lessonObj = trainLesson.getJSONObject(i);
			JSONObject courseware = lessonObj.getJSONObject("courseware");
			courseware.put("trainCourseLesson", lessonObj.getInteger("id"));
			result = coursewareService.add(courseware);
			if(result == CodeEnum.ERROR_CODE_N1){
				ExceptionUtil.throwBusinessException("新增课件失败");
			}
		}
		
		return CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 修改课程
	 * @param course 课程
	 * @return 成功/失败
	 */
	@Transactional
	public int updateCourse(JSONObject course){
		if(course.get("id") == null){
			return CodeEnum.ERROR_CODE_N1;
		}
		if(StringUtil.isEmpty(course.getString("knowledgePoint"))){
			course.put("knowledgePoint", null);
		}
		//根据id修改课程
		int result = courseService.update(course);
		if(result == CodeEnum.ERROR_CODE_N1){
			ExceptionUtil.throwBusinessException("修改课程失败");
		}
		//修改课程节点信息
		if(course.get("knowledgePoint") != null){
			// 修改课程节点
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", course.get("knowledgePointId"));
			map.put("title", course.get("name"));
			map.put("remarks", course.get("introduction"));
			map.put("base", course.get("knowledgePoint"));
			result = KnowledgePointService.update(map);
			if(result == CodeEnum.ERROR_CODE_N1){
				ExceptionUtil.throwBusinessException("修改课程节点失败");
			}
		} else {
			ExceptionUtil.throwBusinessException("修改课程节点失败, 课程节点不存在");
		}

		
		
		//先根据课程id查询出现有的课时信息，以和传递过来的课时信息作比较
		List<Map<String, Object>> lessonList = courseService.listLessonsByCourseId(course.getInteger("id"));
		
		//获取前端页面传来的课时数组
		JSONArray lessonArray = course.getJSONArray("lesson");
		List<JSONObject> updateList = new ArrayList<JSONObject>();
		List<JSONObject> addList = new ArrayList<JSONObject>();
		List<Map<String, Object>> deleteList = new ArrayList<Map<String, Object>>();
		
		Map<Integer,JSONObject> updateIdMap = new HashMap<Integer,JSONObject>();
		
		//找出新增和更新
		for(int i = 0; i < lessonArray.size(); ++i){
			JSONObject lesson = lessonArray.getJSONObject(i);
			Integer lessonId = lesson.getInteger("id");
			if(null!=lessonId && lessonId > 0){
				updateList.add(lesson);
				updateIdMap.put(lessonId,lesson);
			}else{
				addList.add(lesson);
			}
		}
		//找出删除
		for(Map<String, Object> lesson : lessonList){
			Integer lessonIdOld = (Integer) lesson.get("lessonId");
			if(!updateIdMap.containsKey(lessonIdOld)){
				JSONObject json = new JSONObject();
				json.put("lessonId", lessonIdOld);
				json.put("courseId", course.getInteger("id"));
				deleteList.add(json);
			}
		}
			
	
		//更新
		for(JSONObject lesson : updateList){
			// 更新课时
			result = lessonService.update(lesson);
			if(result == CodeEnum.ERROR_CODE_N1){
				ExceptionUtil.throwBusinessException("修改课时失败");
			}
			// 获取课件
			JSONObject courseware = lesson.getJSONObject("courseware");
			courseware.put("trainCourseLesson", lesson.get("id"));
			// 修改课件
			result = coursewareService.update(courseware);
			if(result == CodeEnum.ERROR_CODE_N1){
				ExceptionUtil.throwBusinessException("修改课件失败");
			}
		}
		
		//新增
		for(JSONObject lesson : addList){
			int ret = lessonService.add(lesson);
			if(ret==CodeEnum.SUCCESS_CODE_0){
				JSONObject caourseware = lesson.getJSONObject("courseware");
				caourseware.put("trainCourseLesson", lesson.get("id"));
				//新增课件
				result = coursewareService.add(caourseware);
				if(result == CodeEnum.ERROR_CODE_N1){
					ExceptionUtil.throwBusinessException("新增课件失败");
				}
			}else{
				ExceptionUtil.throwBusinessException("新增课时失败");
			}
		}
		
		
		if(deleteList.size()>0){
			// 删除课件
			for(Map<String, Object> lesson : deleteList){
				result = coursewareService.delBylessonId((Integer)lesson.get("lessonId"));
				if(result == CodeEnum.ERROR_CODE_N1){
					ExceptionUtil.throwBusinessException("删除课件失败");
				}
			}
			// 删除课时
			result = lessonService.del(deleteList);
			if(result == CodeEnum.ERROR_CODE_N1){
				ExceptionUtil.throwBusinessException("删除课时失败");
			}
		}
		
		return CodeEnum.SUCCESS_CODE_0;
	}
	@Transactional
	public int cheakDelLesson(Integer courseId){
		int result = courseService.cheakDelLesson(courseId);
		if(result != CodeEnum.SUCCESS_CODE_0){
			ExceptionUtil.throwBusinessException("该课程已经被引用，无法删除课时");
		}
		return result;
	}
	
	/**
	 * 删除课程
	 * @param id 课程
	 * @return 成功/失败
	 */
	@Transactional
	public int del(JSONArray id){
		JSONArray examId = new JSONArray();
		for(int index = 0; index < id.size(); ++index){
			int courseId = id.getInteger(index);
			// 获取课时
			List<Map<String, Object>> lessonList = null;
			lessonList = lessonService.list4del(courseId);
			if(ArrayUtil.isEmpty4List(lessonList)){
				ExceptionUtil.throwBusinessException("删除课程失败,课时不存在");
			}
			
			// 删除课件
			for(Map<String, Object> lesson : lessonList){
				if(StringUtil.equals((String)lesson.get("type"), BusiEnum.LESSON_TYPE_X)){
					// 课时为考试，保存考试计划id
					int examPaper =  (int)lesson.get("examPaper");
					examId.add(examPaper);
				} else {
					// 课时为学习
					int leesonId = (int)lesson.get("id");
					int result = coursewareService.delBylessonId(leesonId);
					if(result != CodeEnum.SUCCESS_CODE_0){
						ExceptionUtil.throwBusinessException("删除课件失败");
					}
				}
			}
			// 删除课时
			int result = lessonService.delBycourseId(courseId);
			if(result != CodeEnum.SUCCESS_CODE_0){
				ExceptionUtil.throwBusinessException("删除课时失败");
			}
			// 删除知识点
			List<Map<String, Object>> resultList = KnowledgePointService.findIdByCourseId(courseId);
			if(resultList.size() == 1){
				int knowledgePointId = (int)resultList.get(0).get("id");
				result = KnowledgePointService.delByBase(knowledgePointId);
				if(result != CodeEnum.SUCCESS_CODE_0){
					ExceptionUtil.throwBusinessException("删除课件失败");
				}
				
				result = KnowledgePointService.del(knowledgePointId);
				if(result != CodeEnum.SUCCESS_CODE_0){
					ExceptionUtil.throwBusinessException("删除课件失败");
				}
			}
		}
		// 删除课程
		int result = courseService.del(id);
		if(result != CodeEnum.SUCCESS_CODE_0){
			ExceptionUtil.throwBusinessException("该课程已被使用，无法删除");
		}
		// 删除考试计划
		if(!ArrayUtil.isEmpty4JSONArray(examId)){
			result = examService.delExamPlanByPlanIds(examId);
			if(result != CodeEnum.SUCCESS_CODE_0){
				ExceptionUtil.throwBusinessException("删除考试计划失败");
			}
		}
		return CodeEnum.SUCCESS_CODE_0;
	}
	
}
