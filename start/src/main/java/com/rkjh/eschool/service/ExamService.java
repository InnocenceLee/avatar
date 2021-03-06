package com.rkjh.eschool.service;

import java.math.BigDecimal;
import java.sql.Array;
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

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.rkjh.common.util.ArrayUtil;
import com.rkjh.common.util.ExceptionUtil;
import com.rkjh.common.util.PageUtil;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.constant.BusiEnum;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.dao.ExamDao;

/**
* @Title: ExamService.java
* @Description: 考试Service
* @Author: Yang yixuan
* @Create Date: 2016年7月18日下午5:57:31
* @Version: V1.00
*/
@Service
public class ExamService {

	@Autowired
	public ExamDao examDao;

	/**
	 * 查询考试列表
	 * @return 考试列表
	 */
	public List<Map<String, Object>> list(JSONObject dataObj){
		PageUtil.getPage(dataObj);
		/*if(!StringUtil.isEmpty(dataObj.getString("name"))){
			String name = "%" + dataObj.getString("name") + "%";
			dataObj.put("name", name);
		}*/
		List<Map<String, Object>> result = examDao.list(dataObj);
		if(!ArrayUtil.isBlank4List(result)){
			for(Map<String, Object> map : result){
				if(map.get("students") != null){
					Array preCourse = (Array)map.get("students");
					Object preCourses = ArrayUtil.getObject(preCourse);
					map.put("students", preCourses);
					map.put("avgnum",String.format("%.2f", map.get("avgnum")));
				}
			}
			int totleNum = examDao.count4List(dataObj);
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
	 * 查询考试注意
	 * @param id
	 * @return
	 */
	public String examNotic(int id){
		
		return examDao.examNotic(id);	
	}
	/**
	 * 根据考试计划id获取考试计划
	 * @param id 考试计划id
	 * @return 考试计划
	 */
	public Map<String, Object> listExamPlan(int id){
		Map<String, Object> result = examDao.listExamPlan(id);
		return result;
	}
	
	/**
	 * 新增考试计划
	 * @param map 考试计划
	 */
	@Transactional
	public int addExamPlan(Map<String, Object> obj){
		examDao.addExamPlan(obj);
		return (obj.get("id") == null) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 根据学员新增考试记录
	 * @param map 考试记录
	 */
	@Transactional
	public int addExam(Map<String, Object> obj){
		examDao.addExam(obj);
		return (obj.get("id") == null) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 根据考试计划id删除考试计划
	 * @param ids 考试计划
	 * @return 成功/失败
	 */
	@Transactional
	public int delExamPlan(JSONArray ids){
		int result = examDao.delExamPlan(ids);
		if(result < 1){
			return CodeEnum.ERROR_CODE_N1;
		}
		return (result < 1) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 删除考试记录
	 * @param stu 考试
	 * @return 成功/失败
	 */
	@Transactional
	public int delExam(Map<String, Object> stu){
		int result = examDao.delExam(stu);
		if(result < 0){
			return CodeEnum.ERROR_CODE_N1;
		}
		return CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 根据考试计划id删除考试计划[1,2,3]
	 * @param ids 考试计划
	 * @return 成功/失败
	 */
	public int delExamPlanByPlanIds(JSONArray ids){
		int result = examDao.delExamPlanByPlanIds(ids);
		if(result < 1){
			return CodeEnum.ERROR_CODE_N1;
		}
		return (result < 1) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 删除考试记录
	 * @param int 考试计划id
	 * @return 成功/失败
	 */
	public int delExamByPlanId(int id){
		int result = examDao.delExamByPlanId(id);
		if(result < 1){
			return CodeEnum.ERROR_CODE_N1;
		}
		return CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 根据考试计划id查询是否是课时考试
	 * @param id 考试计划id
	 * @return 是/否
	 */
	public int checkExamIsLesson(int id){
		int result = examDao.checkExamIsLesson(id);
		if(result == 1){
			return CodeEnum.SUCCESS_CODE_0;
		}
		return CodeEnum.ERROR_CODE_N1;
	}
	
	/**
	 * 根据考试计划id修改考试计划
	 * @param map 考试计划
	 * @return 成功/失败
	 */
	@Transactional
	public int updateExamPlan(Map<String, Object> obj){
		int result = examDao.updateExamPlan(obj);
		return (result != 1) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 根据考试id修改考试记录
	 * @param map 考试记录
	 * @return 成功/失败
	 */
	@Transactional
	public int updateExam(Map<String, Object> obj){
		int result = examDao.updateExam(obj);
		return (result != 1) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 根据学员ids和考试计划id查询考试记录ids
	 * @return 考试记录ids
	 */
	public List<Integer> list4ExamId(Map<String, Object> obj){
		List<Integer> result = examDao.list4ExamId(obj);
		return result;
	}
	
	/**
	 * 根据考试计划id查询考试计划详情
	 * @param id 考试计划id
	 * @return 考试计划详情
	 */
	public Map<String, Object> examDetail(int id){
		Map<String, Object> result = examDao.examDetail(id);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", result.get("examPlanId"));
		
		/*String[] split = result.get("students").toString().split("[,\\{\\}]");
		int[] sts = new int[split.length];
		for (int i = 0; i < split.length; i++) {
			if(StringUtil.isEmpty(split[i])) continue;
			sts[i] = Integer.parseInt(split[i]);
		}*/
		if(result.get("students") != null){
			Array students = (Array)result.get("students");
			Object studentsObj = ArrayUtil.getObject(students);
			map.put("students", studentsObj);
			int passScore = examDao.findPassScore(map);
			map.put("passScore", passScore);
			result.put("students", studentsObj);
			Map<String, Object> resultStatistic = examDao.examDetailStatistic(map);
			resultStatistic.put("avgNum", String.format("%.2f", resultStatistic.get("avgNum")));
			result.put("statistic", resultStatistic);
		}
		
//		map.put("students", sts);
//		Map<String, Object> resultStatistic = examDao.examDetailStatistic(map);
//		result.put("statistic", resultStatistic);
//		result.put("students", sts);
		return result;
	}
	
	/**
	 * 根据考试计划id&学员列表查询参考人员列表信息
	 * @param map 考试计划id&学员列表
	 * @return 参考人员列表
	 */
	public List<Map<String, Object>> examPerson(JSONObject dataObj){
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
		List<Map<String, Object>> result = examDao.examPerson(dataObj);
		if(!ArrayUtil.isBlank4List(result)){
			int totleNum = examDao.count4ExamPerson(dataObj);
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
	 * 根据学员id查询考试列表
	 * @param map 学员id和考试计划名
	 * @return 考试列表
	 */
	public List<Map<String, Object>> list4Student(Map<String, Object> map){
		List<Map<String, Object>> result = examDao.list4Student(map);
		// 判断考试次数
		for(Map<String, Object> resultMap : result){
			// 判断考试是否过期
			try {
				SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd");
				Date now = new Date();
				Date examEnd = sdf.parse(resultMap.get("examEnd")+"");
				if(now.after(examEnd)){
					// 已考次数
					int exmaNumEnd = (int)resultMap.get("examNumEnd");
					// 考试次数
					int exmaNum = (int)resultMap.get("examNum");
					if(exmaNum >= exmaNumEnd){
						resultMap.put("exmaNumState", BusiEnum.EXAM_STATE_D);
					} else {
						resultMap.put("exmaNumState", BusiEnum.EXAM_STATE_Y);
					}
				} else {
					resultMap.put("exmaNumState", BusiEnum.EXAM_STATE_G);
				}
			} catch (Exception e) {
				if(e instanceof ParseException){
					ExceptionUtil.throwBusinessException("判断考试是否过期失败" + e);
				} else {
					ExceptionUtil.throwBusinessException("查询考试列表失败" + e);
				}
			}
		}
		return result;
	}
	
	/**
	 * 根据考试id查询试卷信息
	 * @param id 考试id
	 * @return 试卷信息
	 */
	public Map<String, Object> examPaperContent(int id){
		Map<String, Object> result = examDao.examPaperContent(id);
		return result;
	}
	
	/**
	 * 查询考试次数
	 * @param map 考试计划id&考试id
	 * @return 考试次数
	 */
	public Map<String, Object> examNum(JSONObject dataObj){
		Map<String, Object> result = examDao.examNum(dataObj);
		return result;
	}
	
	/**
	 * 查询考试次数(课时考试)
	 * @param map 考试计划id&考试id
	 * @return 考试次数
	 */
	public Map<String, Object> examNum4Lesson(JSONObject dataObj){
		Map<String, Object> result = examDao.examNum4Lesson(dataObj);
		return result;
	}
	
	/**
	 * 根据考试计划id查询是否有人开始考试
	 * @param id 考试计划id
	 * @return 开始人数
	 */
	public int check4Del(int id){
		int result = examDao.check4Del(id);
		if(result > 0){
			return CodeEnum.ERROR_CODE_N1;
		}
		return CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 获取考试信息
	 * @param param
	 * @return
	 */
	public List<Map<String, Object>> examList(Map<String, Object> param) {
		return examDao.examList(param);
	}
	
	/**
	 * 根据考试计划id 查询机构统计信息
	 * @param planId 考试计划id
	 * @return 机构统计信息
	 */
	public List<Map<String, Object>> exam4NodeStatistic(int planId){
		// 获取及格分数
		Map<String, Object> examMap = examDao.examDetail(planId);
		if(examMap == null){
			return null;
		}
		Object passScoreObj = examMap.get("passScore");
		
		// 获取考试计划下所有学员
		Map<String, Object> studentsMap = examDao.examStudents2NodeStatistic(planId);
		if(studentsMap == null){
			return null;
		}
		if(studentsMap.get("students") != null){
			// 获取所有学员部门信息
			List<Map<String, Object>> studentsList = examDao.examNode2NodeStatistic(studentsMap);
			if(!ArrayUtil.isBlank4List(studentsList)){
				// 查询部门id
				List<Integer> nodeId = new LinkedList<Integer>();
				for(Map<String, Object> studentMap : studentsList){
					// 根据部门id 去重
					if(studentMap.get("nodeId") == null){
						continue;
					}
					if(!nodeId.contains(studentMap.get("nodeId"))){
						BigDecimal temp = new BigDecimal(studentMap.get("nodeId").toString());
						int noId = temp.intValue();
						nodeId.add(noId);
					}
				}
				if(ArrayUtil.isEmpty4List(nodeId)){
					return null;
				}
				// 统计信息返回值Map
				List<Map<String, Object>> resultList = new LinkedList<Map<String, Object>>();
				Map<String, Object> resultMap = null;
				// 同部门学员idsMap
				Map<String, Object> studentidsMap = new HashMap<String, Object>();
				// 根据部门数量，初始化map
				for(int i = 0; i < nodeId.size(); ++i){
					studentidsMap.put(nodeId.get(i).toString(), new JSONArray());
				}
				
				// 根据部门对学员id分组
				for(Map<String, Object> studentMap : studentsList){
					for(int i = 0; i < nodeId.size(); ++i){
						// 是否是同部门
						if(studentMap.get("nodeId") != null){
								BigDecimal nodeIdTemp = new BigDecimal(studentMap.get("nodeId").toString());
							int noIdTemp = nodeIdTemp.intValue();
							if(nodeId.get(i) == noIdTemp){
								JSONArray arr = (JSONArray)studentidsMap.get(nodeId.get(i).toString());
								resultMap = new HashMap<String, Object>();
								BigDecimal temp = new BigDecimal(studentMap.get("nodeId").toString());
								int noId = temp.intValue();
								resultMap.put("nodeId", noId);
								resultMap.put("nodeName", studentMap.get("nodeName"));
								resultList.add(resultMap);
								arr.add(studentMap.get("personId"));
							}
						}
					}
				}
				
				// 循环查询统计信息
				for(Map<String, Object> resultMapTemp : resultList){
					// 获取key
					String key = resultMapTemp.get("nodeId").toString();
					
					// 同部门的学员id数组
					JSONArray arr = (JSONArray)studentidsMap.get(key);
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("id", planId);
					map.put("students", arr);
					map.put("passScore", passScoreObj);
					
					// 查询统计信息
					Map<String, Object> statisticMap = examDao.examDetailStatistic(map);
//					BigDecimal temp = new BigDecimal(statisticMap.get("avgNum") + "");
//					int avg = temp.intValue();
//					statisticMap.put("avgNum", avg);
					resultMapTemp.put("data", statisticMap);
				}
				
				return resultList;
			}
		}
		return null;
	}

	/**
	 * 根据考试计划id 查询各个分数段统计信息
	 * @param planId 考试计划id
	 * @return 各个分数段统计信息
	 */
	public Map<String, Object> exam2ScoreStatistic(int planId){
		Map<String, Object> resltMap = examDao.exam2ScoreStatistic(planId);
		return resltMap;
	}
	
	/**
	 * 根据考试计划id 查询题型分布统计信息
	 * @param planId 考试计划id
	 * @return 题型分布统计信息
	 */
	public Map<String, Object> exam2TypeStatistic(int planId){
		Map<String, Object> resltMap = examDao.exam2TypeStatistic(planId);
		return resltMap;
	}
	
	public Map<String, String> findScore(Map<String, Object> map){
		Map<String, String> resltMap = examDao.findScore(map);
		return resltMap;
	}
	/**
	 * 根据考试计划id&学员id 查询考试表记录（课时考试）
	 * @param map 考试计划id&学员id
	 * @return 考试表记录
	 */
	public int count4Exam(Map<String, Object> map){
		int result = examDao.count4Exam(map);
		return result;
	}
	
	
	
	/**
	 *
	 * @param map 考试计划
	 */
	@Transactional
	public List<Map<String, Object>> excellist(Integer id,String type){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		map.put("type", type);
		return examDao.excellist(map);
	}
	
	/**
	 * 根据考试id查询课时考试详情
	 * @param id 考试id
	 * @return 课时考试详情
	 */
	public Map<String, Object> detail4LessonExam(int id){
		Map<String, Object> resultMap = examDao.detail4LessonExam(id);
		if(resultMap.get("students") != null){
			Array students = (Array)resultMap.get("students");
			Object studentsObj = ArrayUtil.getObject(students);
			resultMap.put("students", studentsObj);
		}
		return resultMap;
	}
	/**
	 * 根据考试id 判断还能否重考
	 * @param eid
	 * @return
	 */
	public Map<String, Object> reExamAble(int eid) {
		return examDao.reExamAble(eid);
	}
	
	/**
	 * 导出excel
	 * @param obj
	 * @return
	 */
	@Transactional
	public int add4LessonExam(JSONObject obj){
		examDao.add4LessonExam(obj);
		return (obj.get("id") == null) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
}
	
