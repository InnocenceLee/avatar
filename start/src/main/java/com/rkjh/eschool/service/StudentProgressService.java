package com.rkjh.eschool.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONObject;
import com.rkjh.common.util.ArrayUtil;
import com.rkjh.common.util.ExceptionUtil;
import com.rkjh.common.util.PageUtil;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.constant.BusiEnum;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.dao.CourseDao;
import com.rkjh.eschool.dao.StudentProgressDao;

/**
* @Title: StudentProgressService.java
* @Description: 学习进度Service
* @Author: Yang yixuan
* @Create Date: 2016年7月9日下午3:22:54
* @Version: V1.00
*/
@Service
public class StudentProgressService {

	/**
	 * 学习进度Dao
	 */
	@Autowired
	public StudentProgressDao studentProgressDao;

	@Autowired
	public CourseDao courseDao;
	/**
	 * 根据课程id查询课时评价
	 * @param map 查询条件
	 * @return 课时评价
	 */
	public List<Map<String, Object>> list4Course(JSONObject dataObj){
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
		List<Map<String, Object>> result = studentProgressDao.list4Course(dataObj);
		if(!ArrayUtil.isBlank4List(result)){
			int totleNum = studentProgressDao.countList4Course(dataObj);
			int size = dataObj.getInteger("size");
			totleNum = PageUtil.getTotleNum(totleNum, size);
			Map<String, Object> map = result.get(0);
			if(map != null){
				map.put("totleNum", totleNum);
			}
		}
		return result;
	}
	
	@Transactional
	public int updateProgress(JSONObject dataObj){
		if(dataObj.get("studentLearnCourse") == null){
			return CodeEnum.ERROR_CODE_N1;
		} else {
			studentProgressDao.UpdateTrainStudentProgress(dataObj);
			return CodeEnum.SUCCESS_CODE_0;
		}
	}
	
	/**
	 * 新增学习进度（员工端）
	 * @param dataObj 学习记录信息
	 * @return 成功/失败
	 */
	@Transactional
	public int studentProgress(JSONObject dataObj){
		// 获取学员学习课程进度ID
		if(dataObj.get("studentLearnCourse") == null){
			return CodeEnum.ERROR_CODE_N1;
		} else {
			//更新以前的学习记录，把learn_state设置成0
//			 studentProgressDao.UpdateTrainStudentProgressState(dataObj);
			//插入进的学习记录
			studentProgressDao.studentProgressAdd(dataObj);
			if(dataObj.get("id") == null){
				ExceptionUtil.throwBusinessException("新增学习进度失败");
			}
			
			
			
			
			/*
			// 判断学习进度是否存在
			int checkResult = studentProgressDao.checupdateLearnStateress(dataObj);
			if(checkResult > 0){
				// 修改
				//这儿需要计算学习时间
				int result = studentProgressDao.studentProgressUpdate(dataObj);
				if(result < 1){
					ExceptionUtil.throwBusinessException("修改学习进度失败");
				}
			} else {
				// 新增
				studentProgressDao.studentProgressAdd(dataObj);
				if(dataObj.get("id") == null){
					ExceptionUtil.throwBusinessException("新增学习进度失败");
				}
			}

			Map<String, Object> resultMap = studentProgressDao.countPassLessonNum(dataObj);
			if(resultMap != null){
				if((resultMap.get("passLesson") != null) && (resultMap.get("passExam") != null) && (resultMap.get("lessonNum") != null)){
					int lessonNum = Integer.parseInt(resultMap.get("lessonNum").toString());
					int passLesson = Integer.parseInt(resultMap.get("passLesson").toString());
					int passExam = Integer.parseInt(resultMap.get("passExam").toString());
					if(lessonNum == (passLesson + passExam)){
						// 已完成
						dataObj.put("trainLearnState", BusiEnum.LEARN_STATE_O);

						// 更新学习状态
						int result4State = studentProgressDao.updateLearnState(dataObj);
						if(result4State < 1){
							return CodeEnum.ERROR_CODE_N1;
						}
//						// 学习中
//						dataObj.put("trainLearnState", BsiEnum.LEARNu_STATE_L);
					}
				}
			}
			*/
		}
		return CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 修改学员相应课时的状态（就绪，学习中，完成）
	 * @param dataObj
	 * @return
	 */
	public int updateLearnState(JSONObject dataObj){
		if(dataObj.get("isOver") == null){
			dataObj.put("trainLearnState", BusiEnum.LEARN_STATE_L);
		}else{
			int sumPassLesson = courseDao.sumPassLesson(dataObj.getInteger("studentLearnCourse")) + 1;
			int sumLesson = courseDao.sumLesson(dataObj.getInteger("studentLearnCourse"));
			if(sumLesson > sumPassLesson){
				if(sumPassLesson == 0)
					dataObj.put("trainLearnState", "R");
				else
					dataObj.put("trainLearnState", BusiEnum.LEARN_STATE_L);
			}else{
				dataObj.put("trainLearnState", BusiEnum.LEARN_STATE_O);
			}
		}
		int result = studentProgressDao.updateLearnState(dataObj);
		if(result < 1){
			return CodeEnum.ERROR_CODE_N1;
		}
		
		return CodeEnum.SUCCESS_CODE_0;
	}
	
}
