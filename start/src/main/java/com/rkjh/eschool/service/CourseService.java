package com.rkjh.eschool.service;

import java.sql.Array;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
import com.rkjh.eschool.constant.BusiDisplay;
import com.rkjh.eschool.constant.BusiEnum;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.dao.CourseDao;

/**
*@Title: CourseService.java
*@Description: 课程管理Service
*@author Yang yixuan
*@date 2016年7月2日 下午2:20:47 
*@version V1.0
*/
@Service
public class CourseService {

	/**
	 * 课程管理Dao
	 */
	@Autowired
	public CourseDao courseDao;
	
	/**
	 * 查询课程列表
	 * @return 课程列表
	 */
	public List<Map<String, Object>> list(JSONObject dataObj){
		PageUtil.getPage(dataObj);
		/*if(!StringUtil.isEmpty(dataObj.getString("name"))){
			String name = "%" + dataObj.getString("name") + "%";
			dataObj.put("name", name);
		}
		if(!StringUtil.isEmpty(dataObj.getString("node"))){
			String node = "%" + dataObj.getString("node") + "%";
			dataObj.put("node", node);
		}*/
		List<Map<String, Object>> result = courseDao.list(dataObj);
		if(!ArrayUtil.isBlank4List(result)){
			int totleNum = courseDao.count4List(dataObj);
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
	 * 查看课程审核列表
	 * @return 课程审核列表
	 */
	public List<Map<String, Object>> listAuditing(JSONObject dataObj){
		PageUtil.getPage(dataObj);
		/*if(!StringUtil.isEmpty(dataObj.getString("name"))){
			String name = "%" + dataObj.getString("name") + "%";
			dataObj.put("name", name);
		}*/
		
		// 查询用户是否是HR
		/*List<Map<String, Object>> result = null;
		if(dataObj.getInteger("person") == 0){
			// root用户放过
			dataObj.put("node", 0);
			result = courseDao.listAuditing(dataObj);
			if(!ArrayUtil.isBlank4List(result)){
				int totleNum = courseDao.count4ListAuditing(dataObj);
				int size = dataObj.getInteger("size");
				totleNum = PageUtil.getTotleNum(totleNum, size);
				Map<String, Object> map = result.get(0);
				if(map != null){
					map.put("totleNum", totleNum);
				}
			}
		} else {
			Map<String, Object> nodeMap = courseDao.checkNode(dataObj);
			if(nodeMap != null){
				// 判断用户是否是HR 未处理
				dataObj.put("node", nodeMap.get("id"));
				result = courseDao.listAuditing(dataObj);
				if(!ArrayUtil.isBlank4List(result)){
					int totleNum = courseDao.count4List(dataObj);
					int size = dataObj.getInteger("size");
					totleNum = PageUtil.getTotleNum(totleNum, size);
					Map<String, Object> map = result.get(0);
					if(map != null){
						map.put("totleNum", totleNum);
					}
				}
			}
		}*/
// 新增视野查询 2016-8-23 yangyixuan start
		List<Map<String, Object>> result = courseDao.listAuditing(dataObj);
		if(!ArrayUtil.isBlank4List(result)){
			int totleNum = courseDao.count4ListAuditing(dataObj);
			int size = dataObj.getInteger("size");
			totleNum = PageUtil.getTotleNum(totleNum, size);
			Map<String, Object> map = result.get(0);
			if(map != null){
				map.put("totleNum", totleNum);
			}
		}
// 新增视野查询 2016-8-23 yangyixuan end
		return result;
	}
	
	/**
	 * 课程审核修改
	 * @param dataObj 审核信息
	 * @return 成功/失败
	 */
	@Transactional
	public int updateAuditing(JSONObject dataObj){
		// 获取审核人
		String personName = courseDao.getPersonName(dataObj.getInteger("personId"));
		JSONObject trainLog = dataObj.getJSONObject("trainLog");
		trainLog.put("person", personName);
		// 获取当前时间
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String dateStr = df.format(new Date());
		trainLog.put("date", dateStr);
		int result = courseDao.updateAuditing(dataObj);
		if(result != 1){
			ExceptionUtil.throwBusinessException("课程审核修改失败");
		}
		return CodeEnum.SUCCESS_CODE_0;
		
	}
	
	public static void main(String[] args) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String temp = df.format(new Date());
		System.out.println(temp);
	}
	
	/**
	 * 查看课程详情
	 * @param id 课程id
	 * @return 课程
	 */
	public Map<String, Object> detail(int id){
		Map<String, Object> result = courseDao.detail(id);
		if(result == null){
			ExceptionUtil.throwBusinessException("查看课程详情失败");
		}
		if(result.get("preCourses") != null){
			Array preCourse = (Array)result.get("preCourses");
			Object preCourses = ArrayUtil.getObject(preCourse);
			result.put("preCourses", preCourses);
			// 字典表转换
			String trainTypeCode = (String)result.get("trainType");
			String trainTypeName = BusiDisplay.getTrainType(trainTypeCode);
			result.put("trainTypeName", trainTypeName);
			// 查询前置课程名
			JSONArray arr = JSON.parseArray(JSON.toJSONString(preCourses));
			List<Map<String, Object>> preName = courseDao.getNames(arr);
			StringBuilder preCoursesName = new StringBuilder();
			for(Map<String, Object> map : preName){
				preCoursesName.append(map.get("name")+";");
			}
			result.put("preCoursesName", preCoursesName);
		} else {
			result.put("preCoursesName", "无");
		}
		String trainType = (String)result.get("trainType");
		result.put("trainTypeName", BusiDisplay.getTrainType(trainType));
		result.put("lessonClassificationsName", "线上课程");
		return result;
	}
	
	/**
	 * 修改课程信息
	 * @param map 修改信息
	 * @return 成功/失败
	 */
	@Transactional
	public int update(JSONObject map){
		int result = courseDao.update(map);
		if(result != 1){
			ExceptionUtil.throwBusinessException("修改课程失败");
		}
		result = checkName(map);
		if(result > 1 ){
			ExceptionUtil.throwBusinessException("修改课程名字重复");
		}
		return CodeEnum.SUCCESS_CODE_0;
	}
	
	/**  
	 * 删除课程
	 * @param id 课程id
	 * @return 成功/失败
	 */
	@Transactional
	public int del(JSONArray id){
		for(int i = 0; i < id.size(); ++i){
			// 查看课程是否被学习计划引用
			int result = courseDao.count4del(id.getInteger(i));
			if(result > 0){
				return CodeEnum.ERROR_CODE_N1;
			}
			// 查看课程是否被前置课程引用
			result = courseDao.count4delPre(id.getInteger(i));
			if(result > 0){
				return CodeEnum.ERROR_CODE_N1;
			}
		}
		int result = courseDao.del(id);
		return  (result != id.size()) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	/**
	 * 检查课程是否被引用
	 * @param id
	 * @return
	 */
	@Transactional
	public int cheakDelLesson(Integer id){
		int result = courseDao.count4del(id);
		if(result > 0){
			return CodeEnum.ERROR_CODE_N1;
		}else{
			return CodeEnum.SUCCESS_CODE_0;
		}
	}
	
	/**
	 * 新增课程
	 * @param map 新增信息
	 * @return 成功/失败
	 */
	@Transactional
	public int add(JSONObject map){
		// 数据校验
		// 添加课程
		if(StringUtil.equals(BusiEnum.COURSE_TYPE_M, map.getString("trainType"))){
			map.put("state", BusiEnum.COURSE_STATE_A);
		}
		courseDao.add(map);
		if(map.get("id") == null){
			return CodeEnum.ERROR_CODE_N1;
		}
		int result = checkName(map);
		if(result > 1 ){
			ExceptionUtil.throwBusinessException("新增课程名字重复");
		}
		return CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * check同一父节点是否同名
	 * @param name 名字
	 * @param base 父节点
	 * @return count
	 */
	public int checkName(Map<String, Object> map){
		return courseDao.checkName(map);
	}
	
	
	public String listTrainLessonNameById(int id){
		return courseDao.listTrainLessonNameById(id);
	}
	/**
	 * 根据课程id和学习计划id查询未学习人员名单
	 * @param id 课程id和学习计划id
	 * @return 未学习人员名单
	 */
	public List<Map<String, Object>> notLearnPerson(JSONObject dataObj){
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
		if(StringUtil.isEmpty(dataObj.getString("lessonId"))){
			dataObj.put("lessonId", null);
		}
		List<Map<String, Object>> result = courseDao.notLearnPerson(dataObj);
		if(!ArrayUtil.isBlank4List(result)){
			int totleNum = courseDao.countNotLearnPerson(dataObj);
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
	 * 根据课程id和学习计划id查询评价信息
	 * @param id 课程id和学习计划id
	 * @return 评价信息
	 */
	public List<Map<String, Object>> comment(JSONObject dataObj){
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
		}
		if(!StringUtil.isEmpty(dataObj.getString("lessonName"))){
			String lessonName = dataObj.getString("lessonName");
			lessonName = "%" + lessonName + "%";
			dataObj.put("lessonName", lessonName);
		}*/
		List<Map<String, Object>> result = courseDao.comment(dataObj);
		if(!ArrayUtil.isBlank4List(result)){
			int totleNum = courseDao.count4ListComment(dataObj);
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
	 * 根据课程id获取课程id和课件id
	 * @param id 课程id
	 * @return 课程id&课件id
	 */
	public List<Map<String, Object>> listById(int id){
		List<Map<String, Object>> result = courseDao.listById(id);
		return result;
	}
	
	/**
	 * 根据课程id查询课程名单
	 * @param id 课程id
	 * @return 课程名单
	 */
	public List<Map<String, Object>> getNames(JSONArray id){
		List<Map<String, Object>> result = courseDao.getNames(id);
		return result;
	}
	
	/**
	 * 根据学员id查询课程列表
	 * @param map 学员id 课程名字
	 * @return 课程列表
	 */
	public List<Map<String, Object>> list4Student(JSONObject dataObj){
		PageUtil.getPage(dataObj);
		// 查询列表
		List<Map<String, Object>> result = courseDao.list4Student(dataObj);
		if(!ArrayUtil.isBlank4List(result)){
			int totleNum = courseDao.list4StudentConut(dataObj);
			int size = dataObj.getInteger("size");
			totleNum = PageUtil.getTotleNum(totleNum, size);
			// 查询统计信息
			String preMsg = "";
			for(int i = 0; i < result.size(); ++i){
				Map<String, Object> map = result.get(i);
				String stateCode = (String)map.get("state");
				String stateName = BusiDisplay.getStateName(stateCode);
				map.put("stateName", stateName);
				int id = (int)map.get("id");
				int count4SunTrain = courseDao.countSumTrain(id);
				int sumTrain = 0;
				if(count4SunTrain > 0){
					sumTrain = courseDao.sumTrain(id);
				}
				int sumPassLesson = courseDao.sumPassLesson(id);
				int sumLesson = courseDao.sumLesson(id);
				map.put("sumTrain", sumTrain);
				map.put("sumPassLesson", sumPassLesson);
				map.put("sumLesson", sumLesson);
				
//学员端课程列表 前置课程 20160829 yangyixuan Start
				if((map.get("planStart") != null) && (map.get("planEnd") != null)){
					SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd");
					Date now = new Date();
					Date planStart = null;
					Date planEnd = null;
					try {
						planStart = sdf.parse(map.get("planStart")+"");
						planEnd = sdf.parse(map.get("planEnd")+"");
					} catch (ParseException e) {
						ExceptionUtil.throwBusinessException("判断课程开始时间失败");
					}
					// 判断当前时间是否在计划安排时间内
					if(now.after(planStart)){
						if(!StringUtil.equals(BusiEnum.LEARN_STATE_O, stateCode)){
							// 查询前置课程名
							if(map.get("preCourses") != null){
								Array preCourse = (Array)map.get("preCourses");
								Object preCourses = ArrayUtil.getObject(preCourse);
								JSONArray arr = JSON.parseArray(JSON.toJSONString(preCourses));
								map.put("preCourses", arr);
								List<Map<String,Object>> preC= courseDao.count4PreCourses(map);
								if(preC.size() > 0){
									map.put("isReady4Course", false);
									Set<String> preSet = new HashSet<String>();
									for(Map<String,Object> m : preC){
										String name = courseDao.listTrainCourseNameById((int)(m.get("train_course_lesson")));
										preSet.add(name);
									}
									Object[] st = preSet.toArray();
									String msg = "";
									for(int k = 0; k  < st.length; k++){
										if(k != st.length -1){
											msg += "《"+(String)st[k] + "》,";
										}else{
											msg += "《"+(String)st[k] + "》";
										}
									}
									preMsg += msg;
									map.put("msg", "你有"+preMsg+"等前置课程需要先行学习");
									preMsg = "";
									continue;
								}
							}
						}else{
							if(map.get("preCourses") != null){
								Array preCourse = (Array)map.get("preCourses");
								Object preCourses = ArrayUtil.getObject(preCourse);
								map.put("preCourses", preCourses);
							}
						}
						map.put("isReady4Course", true);
					} else {
						if(map.get("preCourses") != null){
							Array preCourse = (Array)map.get("preCourses");
							Object preCourses = ArrayUtil.getObject(preCourse);
							map.put("preCourses", preCourses);
						}
						map.put("isReady4Course", false);
						map.put("msg", "该课程学习时间尚未开放！");
					}
				}
				
				preMsg = "";
//学员端课程列表 前置课程 20160829 yangyixuan end			
			}
			
			Map<String, Object> map = result.get(0);
			if(map != null){
				map.put("totleNum", totleNum);
			}
		}
		return result;
	}

	
	/**
	 * 根据课程id查询出现有的课时信息
	 * @param courseId
	 * @return
	 */
	public List<Map<String, Object>> listLessonsByCourseId(Integer courseId) {
		return courseDao.listLessonsByCourseId(courseId);
	}
	
	/**
	 * 根据课程id和学习计划id查询评价信息
	 * @param id 课程id和学习计划id
	 * @return 评价信息
	 */
	public List<Map<String, Object>> getComment(JSONObject args) {
		return courseDao.getComment2(args);
	}
	
	/**
	 * 查询未学习人员
	 * @param args
	 * @return
	 */
	public List<Map<String, Object>> getNoLearn(JSONObject args) {
		// TODO Auto-generated method stub
		return courseDao.getNoLearnPerson(args);
	}
}
