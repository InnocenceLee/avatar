package com.rkjh.eschool.service;

import java.sql.Array;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.aspectj.apache.bcel.generic.RET;
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
import com.rkjh.eschool.dao.ExamPaperDao;

/**
* @Title: ExamBaseService.java
* @Description: 考试BaseService
* @Author: Yang yixuan
* @Create Date: 2016年7月18日下午5:57:41
* @Version: V1.00
*/
@Service
public class ExamBaseService {

	/**
	 * 考试Service
	 */
	@Autowired
	public ExamService examService;
	
	/**
	 * 试卷Service
	 */
	@Autowired
	public ExamPaperService examPaperService;
	
	/**
	 * 试卷Dao
	 */
	@Autowired
	public ExamPaperDao examPaperDao;
	
	/**
	 * 题库Service
	 */
	@Autowired
	public ExamQuestionService examQuestionService;
	
	/**
	 * 新增考试
	 * @param obj 考试
	 * @return 成功/失败
	 */
	@Transactional
	public int add(JSONObject obj){

		// 获取开始时间
		String start = obj.getString("examStart");
		if(StringUtil.isEmpty(start)){
			ExceptionUtil.throwBusinessException("新增考试计划失败,开始时间不能为空");
		}
		// 获取结束时间
		String end = obj.getString("examEnd");
		if(StringUtil.isEmpty(end)){
			ExceptionUtil.throwBusinessException("新增考试计划失败,结束时间不能为空");
		}
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		Date starttime = null;
		Date endtime = null;
		Timestamp startTimestamp = null;
		Timestamp endTimestamp = null;
		try {
			starttime = sdf.parse(start);
			endtime = sdf.parse(end);
			startTimestamp = new Timestamp(starttime.getTime());
			endTimestamp = new Timestamp(endtime.getTime());
			obj.put("examStart", startTimestamp);
			obj.put("examEnd", endTimestamp);
		} catch (ParseException e) {
			ExceptionUtil.throwBusinessException("新增考试失败,时间格式错误");
		}
		
		int result = examService.addExamPlan(obj);
		if(result == CodeEnum.ERROR_CODE_N1){
			ExceptionUtil.throwBusinessException("新增考试计划失败");
		}
		
		// 根据试卷id获取试卷信息（试卷内容，试卷生成方式）?
		JSONObject examPaper = obj.getJSONObject("examPaperContent");


		Object content = null;
		boolean isModeM = false;
		if(StringUtil.equals((String)examPaper.get("mode"), BusiEnum.EXAM_PAPER_MODE_S) || StringUtil.equals((String)examPaper.get("mode"), BusiEnum.EXAM_PAPER_MODE_D)){
			isModeM = true;
		}
		if(!ArrayUtil.isEmpty4JSONArray(obj.getJSONArray("students"))){

			for(int i = 0; i < obj.getJSONArray("students").size(); ++i){
				Map<String, Object> exam = new HashMap<String, Object>();
				if(isModeM){
					List<Map<String, Object>> list = new LinkedList<Map<String, Object>>();
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("id", obj.get("examPaper"));
					map.put("start", 0);
					map.put("size", 1);
					map.put("nodeSql", obj.get("nodeSql"));
					/*list = examPaperService.list(map);
					content = list.get(0);*/

					List<Map<String, Object>> resultList = examPaperDao.list(map);
					content = resultList.get(0);
				}
				exam.put("examMode", examPaper.get("mode"));
				if(content != null){
					JSONObject contentObj = JSON.parseObject(JSON.toJSONString(content));
					exam.put("examPaperContent", contentObj);
				} else {
					exam.put("examPaperContent", content);
				}
				exam.put("examPlan", obj.getInteger("id"));
				exam.put("student", obj.getJSONArray("students").getInteger(i));
				exam.put("state", BusiEnum.EXAM_STATE_D);
				exam.put("examStart", startTimestamp);
				exam.put("examEnd", endTimestamp);
				
				result = examService.addExam(exam);
				if(result == CodeEnum.ERROR_CODE_N1){
					ExceptionUtil.throwBusinessException("新增考试计划失败");
				}
			}
		}
		
		return CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 修改考试计划
	 * @param obj 考试计划
	 * @return 成功/失败
	 */
	@Transactional
	public int update(JSONObject obj){
		// 获取原考试计划
		if(obj.get("id") == null){
			return CodeEnum.ERROR_CODE_N1;
		}
		int result = CodeEnum.ERROR_CODE_N1;
		
		Map<String, Object> examOld = examService.listExamPlan(obj.getInteger("id"));
		// 获取原考试计划学员
		JSONArray studentsOld = null;
		Array examStudents = (Array)examOld.get("students");
		Object studentsObj = ArrayUtil.getObject(examStudents);
		studentsOld = JSONArray.parseArray(JSON.toJSONString(studentsObj));
		// 获取试卷信息
		JSONObject examPaper = obj.getJSONObject("examPaperContent");

		// 判断判断试卷生成方式是否是手动生成
		Object content = null;
		// 修改后学员
		JSONArray students = obj.getJSONArray("students");
		
		// 修改学员
		JSONArray addStu = new JSONArray();
		// 新增学员
		JSONArray upadteStu = new JSONArray();
		
		for(int i = 0; i < students.size(); ++i){
			Object stu = students.get(i);
			boolean isContains = studentsOld.contains(stu);
			if(isContains){
				upadteStu.add(stu);
				studentsOld.remove(stu);
			} else {
				addStu.add(stu);
			}
		}
		boolean isModeM = false;
		if(StringUtil.equals((String)examPaper.get("mode"), BusiEnum.EXAM_PAPER_MODE_S)){
			isModeM = true;
		}
		
		String start = obj.getString("examStart");
		String end = obj.getString("examEnd");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		Date starttime = null;
		Date endtime = null;
		Timestamp startTimestamp = null;
		Timestamp endTimestamp = null;
		try {
			starttime = sdf.parse(start);
			endtime = sdf.parse(end);
			startTimestamp = new Timestamp(starttime.getTime());
			endTimestamp = new Timestamp(endtime.getTime());
		} catch (ParseException e) {
			ExceptionUtil.throwBusinessException("修改考试计划失败,时间格式错误");
		}
		// 新增addStu
		for(int i = 0; i < addStu.size(); ++i){
			Map<String, Object> exam = new HashMap<String, Object>();
			if(isModeM){
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("id", obj.get("examPaper"));
				map.put("start", 0);
				map.put("size", 1);
				map.put("nodeSql",obj.getString("nodeSql"));
				List<Map<String, Object>> resultPaper = examPaperService.list(map);
				if(!ArrayUtil.isBlank4List(resultPaper)){
					content = resultPaper.get(0);
				} else {
					ExceptionUtil.throwBusinessException("修改考试计划失败,根据试卷id获取试卷信息失败：" + obj.get("examPaper"));
				}
			}
			exam.put("examPaperContent", JSONObject.parseObject(JSON.toJSONString(content)));
			exam.put("examPlan", obj.getInteger("id"));
			exam.put("student", addStu.get(i));
			exam.put("state", BusiEnum.EXAM_STATE_D);
			
			exam.put("examStart", startTimestamp);
			exam.put("examEnd", endTimestamp);
			exam.put("examMode", examPaper.get("mode"));
			examService.addExam(exam);
			if(exam.get("id") == null){
				ExceptionUtil.throwBusinessException("修改考试计划失败");
			}
		}
		
		// 删除studentsOld
		for(int i = 0; i < studentsOld.size(); ++i){
			Map<String, Object> stuMap = new HashMap<String, Object>();
			stuMap.put("student", studentsOld.getInteger(i));
			stuMap.put("examPlan", obj.getInteger("id"));
			result = examService.delExam(stuMap);
			if(result == CodeEnum.ERROR_CODE_N1){
				ExceptionUtil.throwBusinessException("修改考试计划失败");
			}
		}
		
		// 修改upadteStu
		for(int i = 0; i < upadteStu.size(); ++i){
			Map<String, Object> exam = new HashMap<String, Object>();
			if(isModeM){
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("id", obj.get("examPaper"));
				map.put("start", 0);
				map.put("size", 1);
				map.put("nodeSql", obj.get("nodeSql"));
				content = examPaperService.list(map).get(0);
			}
			exam.put("examPlan", obj.getInteger("id"));
			exam.put("mode", examPaper.get("mode"));
			exam.put("student", upadteStu.get(i));
			exam.put("examPaperContent", JSONObject.parseObject(JSON.toJSONString(content)));
			exam.put("examStart", startTimestamp);
			exam.put("examEnd", endTimestamp);
			result = examService.updateExam(exam);
			if(result == CodeEnum.ERROR_CODE_N1){
				ExceptionUtil.throwBusinessException("修改考试计划失败");
			}
		}
		obj.put("examStart", startTimestamp);
		obj.put("examEnd", endTimestamp);
		result = examService.updateExamPlan(obj);
		if(result == CodeEnum.ERROR_CODE_N1){
			ExceptionUtil.throwBusinessException("修改考试计划失败");
		}
		
		return CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 删除考试计划
	 * @param obj 考试计划
	 * @return 成功/失败
	 */
	@Transactional
	public int del(JSONObject obj){
		JSONArray arr = obj.getJSONArray("examPlan");
		// 判断是否有人开始考试
		for(int i = 0; i < arr.size(); ++i){
			int result = examService.check4Del(arr.getInteger(i));
			if(result == CodeEnum.ERROR_CODE_N1){
				return CodeEnum.ERROR_CODE_N1;
			}
		}
		int result = CodeEnum.ERROR_CODE_N1;
		// 获取考试计划id
		for(int i = 0; i < arr.size(); ++i){
			int planId = arr.getInteger(i);
			// 查询考试是否是课时考试
			result = examService.checkExamIsLesson(planId);
			if(result == CodeEnum.ERROR_CODE_N1){
				// 不是课时考试
				result = examService.delExamByPlanId(planId);
				if(result == CodeEnum.ERROR_CODE_N1){
					ExceptionUtil.throwBusinessException("删除考试计划失败");
				}
			}
		}
		result = examService.delExamPlanByPlanIds(arr);
		if(result == CodeEnum.ERROR_CODE_N1){
			ExceptionUtil.throwBusinessException("删除考试计划失败");
		}
		
		return CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 新增课程时删除考试计划
	 * @param obj 考试计划
	 * @return 成功/失败
	 */
	@Transactional
	public int del4course(JSONObject obj){
		JSONArray arr = obj.getJSONArray("examPlan");
		// 判断是否有人开始考试
		for(int i = 0; i < arr.size(); ++i){
			int result = examService.check4Del(arr.getInteger(i));
			if(result == CodeEnum.ERROR_CODE_N1){
				return CodeEnum.ERROR_CODE_N1;
			}
		}
		int result = examService.delExamPlanByPlanIds(arr);
		if(result == CodeEnum.ERROR_CODE_N1){
			ExceptionUtil.throwBusinessException("删除考试计划失败");
		}
		
		return CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 考试答题交卷
	 * @param dataObj 试卷信息
	 * @return 成功/失败
	 */
	@Transactional
	public int Answer(JSONObject dataObj){

		// 判断记录是否存在
		int isInDb4Exam =  examService.count4Exam(dataObj);
		
		Map<String, String> scoreMap = examService.findScore(dataObj);
		// 查询考试次数&已考次数
		int examNumEnd = 0;
		int examNumOld = 0;
		String examMode="";
		Map<String, Object> resultMap = null;
		if(isInDb4Exam > 0){
			resultMap = examService.examNum(dataObj);
			if(resultMap.get("examNumEnd") != null){
				examNumEnd = (int)resultMap.get("examNumEnd");
				examNumOld = (int)resultMap.get("examNumEnd");
			}
			examMode=(String)resultMap.get("examMode");
			int examNum = (int)resultMap.get("examNum");
			if(examNumEnd >= examNum){
				return CodeEnum.ERROR_CODE_N1;
			}
		} else {
			// 课时考试 获取考试计划信息 考试次数
			resultMap = examService.examNum4Lesson(dataObj);
			if(resultMap.get("examNumEnd") != null){
				examNumEnd = (int)resultMap.get("examNumEnd");
			}
			int examNum = (int)resultMap.get("examNum");
			if(examNumEnd >= examNum){
				return CodeEnum.ERROR_CODE_N1;
			}
		}

		// 获取开始时间
		String start = dataObj.getString("examStart");
		if(StringUtil.isEmpty(start)){
			ExceptionUtil.throwBusinessException("新增考试计划失败,开始时间不能为空");
		}
		// 获取结束时间
		String end = dataObj.getString("examEnd");
		if(StringUtil.isEmpty(end)){
			ExceptionUtil.throwBusinessException("新增考试计划失败,结束时间不能为空");
		}

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date starttime = null;
		Date endtime = null;
		Timestamp startTimestamp = null;
		Timestamp endTimestamp = null;
		try {
//			starttime = sdf.parse(start);
//			endtime = sdf.parse(end);
//			startTimestamp = new Timestamp(starttime.getTime());
//			endTimestamp = new Timestamp(endtime.getTime());
			startTimestamp = new Timestamp(Long.parseLong(start));
			endTimestamp = new Timestamp(Long.parseLong(end));
		} catch (Exception e) {
			ExceptionUtil.throwBusinessException("考试答题交卷失败,时间格式错误");
		}
		
		
		// 获取答题信息
		JSONArray arr = dataObj.getJSONArray("questions");
		JSONArray arr4ExamQuestion = new JSONArray();
		for(int i = 0; i < arr.size(); ++i){
			arr4ExamQuestion.add(arr.getJSONObject(i).getInteger("id"));
		}
		
		// 根据题目ids查询所有题目信息列表
		List<Map<String, Object>> resultRuestions = examQuestionService.list4Id(arr4ExamQuestion);
		JSONArray questions = JSONArray.parseArray(JSON.toJSONString(resultRuestions));
		// 计算得分
		float achievement = 0;
		// 记录得分
		float achievementOld = 0;
		if(resultMap.get("examScore") != null){
			achievementOld = (float)resultMap.get("examScore");
		}
		
		// 统计得分
		for(int j = 0; j < questions.size(); ++j){
			JSONObject answerMap = questions.getJSONObject(j);
			JSONObject answerContent = answerMap.getJSONObject("content");
			JSONObject answerValue = JSONObject.parseObject(answerContent.getString("value"));
			// 正确数
			int rNum = 0;
			// 错误数
			int wNum = 0;
			if(answerMap.getInteger("r_num") != null){
				rNum = answerMap.getInteger("r_num");
			}
			if(answerMap.getInteger("w_num") != null){
				wNum = answerMap.getInteger("w_num");
			}
			// 匹配题目计算得分
			for(int i = 0; i < arr.size(); ++i){
				JSONObject answerObj = arr.getJSONObject(i);
				if(answerObj.getInteger("id") == (int)answerMap.get("id")){
					// 判断题型
					if(StringUtil.equals(answerMap.getString("type"), BusiEnum.question_type_M)){
						// 多选题
						// 答案
						JSONArray answerArr = answerValue.getJSONArray("answer");
						// 学员答案
						JSONArray answerArrUser = answerObj.getJSONArray("userAnswer");
						boolean isRight = true;

						// 判断是否答对
						if(answerArr.size() == answerArrUser.size()){
							for(int k = 0; k < answerArrUser.size(); ++k){
								String uns = answerArrUser.getString(k);
								int resultIndex = answerArr.indexOf(uns);
								if(resultIndex < 0){
									isRight = false;
								}
							}
						} else {
							isRight = false;
						}
						if(isRight){
							// 回答正确
//							achievement += answerMap.getInteger("score");
							achievement += Float.parseFloat(scoreMap.get("multipleScore"));
							++rNum;
							answerMap.put("r_num", rNum);
						} else {
							++wNum;
							answerMap.put("w_num", wNum);
						}
					} else {
						// 学员答案
						JSONArray answerArrUser = answerObj.getJSONArray("userAnswer");
						// 正确答案
						JSONArray answer = answerValue.getJSONArray("answer");
						if(answerArrUser.size() != 1){
							ExceptionUtil.throwBusinessException("单选题或判断题选择答案数量不为1");
						}
						if(StringUtil.equals(answerArrUser.getString(0)
								,answer.getString(0))){
							if(StringUtil.equals(answerMap.getString("type"), BusiEnum.question_type_S)){
								achievement += Float.parseFloat(scoreMap.get("singleScore"));
							}else{
								achievement += Float.parseFloat(scoreMap.get("judgeScore"));
							}
							
							++rNum;
							answerMap.put("r_num", rNum);
						} else {
							++wNum;
							answerMap.put("w_num", wNum);
						}
					}
				}
			}
		}
		// 修改考试表
		JSONObject answer = new JSONObject();
		answer.put("student", dataObj.getInteger("studentId"));
		JSONObject obj = new JSONObject();
		obj.put("questions", dataObj.get("questions"));
		answer.put("examPaperContent", obj);
		answer.put("examScore", achievement);
		answer.put("examPlan", dataObj.getInteger("examPlanId"));
		answer.put("state", BusiEnum.EXAM_STATE_Y);
		answer.put("examStart", startTimestamp);
		answer.put("examEnd", endTimestamp);
		answer.put("examNumEnd", ++examNumEnd);
		answer.put("examMode", examMode);

		if(isInDb4Exam < 1){
			// 第一次交卷，考试记录不存在（考试为课时考试），新增一条
			answer.put("examMode", BusiEnum.EXAM_PAPER_MODE_S);
			int result = examService.add4LessonExam(answer);
			if(result == CodeEnum.ERROR_CODE_N1){
				ExceptionUtil.throwBusinessException("课时考试答题交卷失败");
			}
		} else {
			// 考试记录已存在，考试不为课时考试，或者已经交卷至少一次
			if(examNumOld==0){
				int result = examService.updateExam(answer);
				if(result == CodeEnum.ERROR_CODE_N1){
					ExceptionUtil.throwBusinessException("考试答题交卷失败");
				}
			}else{
				int result = examService.addExam(answer);
				if(result == CodeEnum.ERROR_CODE_N1){
					ExceptionUtil.throwBusinessException("考试答题交卷失败");
				}
			}
			
		}
		return CodeEnum.SUCCESS_CODE_0;
	}
}
