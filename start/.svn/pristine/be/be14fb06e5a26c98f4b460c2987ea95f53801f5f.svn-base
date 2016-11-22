package com.rkjh.eschool.service;

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
import com.rkjh.common.util.PageUtil;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.constant.BusiEnum;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.dao.LessonDao;

/**
*@Title: LessonService.java
*@Description: 课时管理Service
*@author Yang yixuan
*@date 2016年7月2日 下午2:50:47 
*@version V1.0
*/
@Service
public class LessonService {
	
	@Autowired
	public LessonDao lessonDao;
	
	/**
	 * 根据课程id查询课时列表
	 * @return 课时列表
	 */
	public List<Map<String, Object>> list(JSONObject dataObj){
		PageUtil.getPage(dataObj);
		List<Map<String, Object>> resultList = lessonDao.list(dataObj);
		if(!ArrayUtil.isBlank4List(resultList)){
			int totleNum = lessonDao.count4List(dataObj);
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
	 * 根据课程id查询课时列表学员端
	 * @return 课时列表
	 */
	public List<Map<String, Object>> listStudent(JSONObject dataObj){
		PageUtil.getPage(dataObj);
		List<Map<String, Object>> resultList = lessonDao.listStudent(dataObj);
		if(!ArrayUtil.isBlank4List(resultList)){
			int totleNum = lessonDao.count4ListStudent(dataObj);
			int size = dataObj.getInteger("size");
			totleNum = PageUtil.getTotleNum(totleNum, size);
			Map<String, Object> map = resultList.get(0);
			if(map != null){
				map.put("totleNum", totleNum);

				String lessonOder = map.get("lessonOrder").toString();

				int trainStudentLearnCourseId = dataObj.getInteger("trainStudentLearnCourseId");
				
				// 判断是否固定顺序
				if(StringUtil.equals(lessonOder, BusiEnum.LESSON_ODER_S)){
					// 课时顺序：判断课时是否学完
					JSONArray lessonIdsArr = new JSONArray();
					for(Map<String, Object> lessonMap : resultList){
						// 获取课时类型:学习/考试
						if(StringUtil.equals(lessonMap.get("type").toString(), BusiEnum.LESSON_TYPE_E)){
							Map<String, Object> lessonData = new HashMap<String, Object>();
							lessonData.put("lessonId", lessonMap.get("id"));
							lessonData.put("trainStudentLearnCourseId", trainStudentLearnCourseId);
							
							Map<String, Object> lessonResultMap = lessonDao.learnLog4Student(lessonData);
							// 判断是否学习过{"end": "1472435089050", "start": "1472435088475", "progress": 1}train_comment
							if(lessonResultMap != null){
								lessonMap.put("trainTime",lessonResultMap.get("trainTime") == null ? 0:lessonResultMap.get("trainTime"));

								if(lessonResultMap.get("progress") != null){
									JSONObject lessonObj = JSONObject.parseObject(lessonResultMap.get("progress").toString());
									int progress = lessonObj.getInteger("progress");
									if(progress == 1){
										// 已完成
										// 判断有没有评价信息？立即评价：温顾
										if(lessonResultMap.get("trainComment") == null){
											lessonMap.put("leanrLessonType", "L");
										} else {
											lessonMap.put("leanrLessonType", "W");
										}
									} else {
										// 学习中
										lessonMap.put("leanrLessonType", "M");
									}
								} else {
									// 没有学习过
									lessonMap.put("leanrLessonType", "M");
								}
							} else {
								// 没有学习过
								lessonMap.put("leanrLessonType", "M");
								lessonMap.put("trainTime",0);

							}
						} else {
							// 判断是否考试过examPaper
							int examPaper = Integer.parseInt(lessonMap.get("examPaper").toString());
							Map<String, Object> examLogResult = lessonDao.examLog4Student(examPaper);
							if(examLogResult != null){
								if(examLogResult.get("examNum") != null){
									int examNum = Integer.parseInt(examLogResult.get("examNum").toString());
									if(examNum > 1){
										int examPlanNum = Integer.parseInt(examLogResult.get("examPlanNum").toString());
										// 判断是否还能考试？重考
										if(examNum+1 <= examPlanNum){
											lessonMap.put("leanrLessonType", "C");
										} else {
											lessonMap.put("leanrLessonType", "B");
										}
									} else {
										// 没有考试过
										lessonMap.put("leanrLessonType", "M");
									}
								} else {
									// 没有考试过
									lessonMap.put("leanrLessonType", "M");
								}
							} else {
								// 没有考试过
								lessonMap.put("leanrLessonType", "M");
							}
						}
					}
				} else if(StringUtil.equals(lessonOder, BusiEnum.LESSON_ODER_M)){
					// 课时顺序：判断课时是否学完
					JSONArray lessonIdsArr = new JSONArray();
					for(Map<String, Object> lessonMap : resultList){
						// 获取课时类型:学习/考试
						if(StringUtil.equals(lessonMap.get("type").toString(), BusiEnum.LESSON_TYPE_E)){
							Map<String, Object> lessonData = new HashMap<String, Object>();
							lessonData.put("lessonId", lessonMap.get("id"));
							lessonData.put("trainStudentLearnCourseId", trainStudentLearnCourseId);
							
							Map<String, Object> lessonResultMap = lessonDao.learnLog4Student(lessonData);
							// 判断是否学习过{"end": "1472435089050", "start": "1472435088475", "progress": 1}train_comment
							if(lessonResultMap != null){
								if(lessonResultMap.get("progress") != null){
									JSONObject lessonObj = JSONObject.parseObject(lessonResultMap.get("progress").toString());
									int progress = lessonObj.getInteger("progress");
									if(progress == 1){
										// 已完成
										// 判断有没有评价信息？立即评价：温顾
										if(lessonResultMap.get("trainComment") == null){
											lessonMap.put("leanrLessonType", "L");
										} else {
											lessonMap.put("leanrLessonType", "W");
										}
									} else {
										// 学习中
										lessonMap.put("leanrLessonType", "M");
									}
								} else {
									// 没有学习过
									lessonMap.put("leanrLessonType", "M");
								}
							} else {
								// 没有学习过
								lessonMap.put("leanrLessonType", "M");
							}

						} else {
							// 判断是否考试过examPaper
							int examPaper = Integer.parseInt(lessonMap.get("examPaper").toString());
							Map<String, Object> examLogResult = lessonDao.examLog4Student(examPaper);
							if(examLogResult != null){
								if(examLogResult.get("examNum") != null){
									int examNum = Integer.parseInt(examLogResult.get("examNum").toString());
									if(examNum > 1){
										int examPlanNum = Integer.parseInt(examLogResult.get("examPlanNum").toString());
										// 判断是否还能考试？重考
										if(examNum+1 <= examPlanNum){
											lessonMap.put("leanrLessonType", "C");
										} else {
											lessonMap.put("leanrLessonType", "B");
										}
									} else {
										// 没有考试过
										lessonMap.put("leanrLessonType", "M");
									}
								} else {
									// 没有考试过
									lessonMap.put("leanrLessonType", "M");
								}
							} else {
								// 没有考试过
								lessonMap.put("leanrLessonType", "M");
							}
						}
					}
				}
			}
		}
		return resultList;
	}
	
	/**
	 * 课时名字列表（下拉选择列表）
	 * @param 课程id
	 * @return 课时列表
	 */
	public List<Map<String, Object>> listName(int id){
		List<Map<String, Object>> resultList = lessonDao.listName(id);
		return resultList;
	}
	
	/**
	 * 查询课时详情
	 * @param id 课时id
	 * @return 课时
	 */
	public List<Map<String, Object>> detail(int id){
		List<Map<String, Object>> resultList = lessonDao.detail(id);
		return resultList;
	}
	
	/**
	 * 修改课时
	 * @param map 课时信息
	 * @return 成功/失败
	 */
	@Transactional
	public int update(Map<String, Object> map){
		// check是否同名
		int result = lessonDao.update(map);
		return  (result <= 0) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	
	/**
	 * 新增课时
	 * @param map 课时
	 * @return 成功失败
	 */
	@Transactional
	public int add(JSONObject lesson){
		lessonDao.add(lesson);
		// id校验?
		if(lesson.get("id") == null){
			return CodeEnum.ERROR_CODE_N1;
		}else{
			return  CodeEnum.SUCCESS_CODE_0;
		}
	}
	
	
	/**
	 * 批量新增课时
	 * @param map 课时
	 * @return 成功失败
	 */
	@Transactional
	public int batAdd(JSONArray array){
		// 数据校验
		// 添加课时
		for(int i = 0; i < array.size(); ++i){
			JSONObject obj = array.getJSONObject(i);
			lessonDao.add(obj);
			// id校验?
			if(obj.get("id") == null){
				return CodeEnum.ERROR_CODE_N1;
			}
		}
		return  CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 根据课程id和学习计划id查询学习记录
	 * @param id 课程id和学习计划id
	 * @return 学习记录
	 */
	public List<Map<String, Object>> learnLog(JSONObject dataObj){
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
		List<Map<String, Object>> result = lessonDao.learnLog(dataObj);
		if(!ArrayUtil.isBlank4List(result)){
			int totleNum = lessonDao.count4LearnLog2(dataObj);
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
	 * 获取学习人员，非导出
	 * @param dataObj
	 * @return
	 */
	public List<Map<String, Object>> learnPerson(JSONObject dataObj){
		PageUtil.getPage(dataObj);
		if(StringUtil.isEmpty(dataObj.getString("personId"))){
			dataObj.put("personId", null);
		}
		
		List<Map<String, Object>> result = lessonDao.learnPerson(dataObj);
		if(!ArrayUtil.isBlank4List(result)){
			int totleNum = lessonDao.count4LearnPerson(dataObj);
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
	 * 根据课程id查询课时id
	 * @param id 课程id
	 * @return 课时id
	 */
	public List<Map<String, Object>> list4del(int id){
		List<Map<String, Object>> result = lessonDao.list4del(id);
		return result;
	}
	
	/**
	 * 根据课程id删除课时
	 * @param id
	 * @return 成功/失败
	 */
	@Transactional
	public int delBycourseId(int id){
		int result = lessonDao.delBycourseId(id);
		return (result < 0) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 根据课时id批量删除课时
	 * @param id 课时id
	 * @return 成功/失败
	 */
	public int del(List<Map<String, Object>> id){
		int[] ids = new int[id.size()];
		for(int i = 0; i < id.size(); ++i){
			Map<String, Object> coursewareMap = id.get(i);
			ids[i] = (int)coursewareMap.get("lessonId");
		}
		int result = lessonDao.del(ids);
		return  (result < 1) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 根据课时id查询课时
	 * @return 课时
	 */
	public Map<String, Object> lesson(int id){
		Map<String, Object> lesson = lessonDao.lesson(id);
		return lesson;
	}
	
	/**
	 * 统计平均学习时间分布图
	 * @param map 学习计划Id&课程id
	 * @return 统计平均学习时间分布图
	 */
	public Map<String, Object> statisticLearnTime(JSONObject dataObj){
		Map<String, Object> result = lessonDao.statisticLearnTime(dataObj);
		return result;
	}
	
	

    /**
     * 获取课程学习人员
     * @param args  学习计划Id&课程id
     * @return
     */
	public List<Map<String, Object>> getLearnPerson(JSONObject args){
		List<Map<String, Object>> result = lessonDao.getLearnPerson(args);
		return result;
	}
    /**
     * 导出学习人员
     * @param args
     * @return
     */
	public List<Map<String, Object>> exportLearnPerson(JSONObject args){
		List<Map<String, Object>> result = lessonDao.exportLearnPerson(args);
		return result;
	}
	/**
	 * 统计星级评价树状图
	 * @param map 学习计划Id&课程id
	 * @return 统计星级评价树状图
	 */
	public Map<String, Object> statisticLearnEvaluation(JSONObject dataObj){
		Map<String, Object> result = lessonDao.statisticLearnEvaluation(dataObj);
		return result;
	}
	
	/**
	 * 统计部门人员分布
	 * @param map 学习计划Id&课程id
	 * @return 统计部门人员分布
	 */
	public List<Map<String, Object>> statisticLearnNode(JSONObject dataObj){
		// 部门id,name
		List<Map<String, Object>> nodeMap = lessonDao.distinctLearnNode(dataObj);
		// 统计部门人员分布信息
		List<Map<String, Object>> result = lessonDao.statisticLearnNode(dataObj);
		
		Map<String, Object> resultMap = null;
		List<Map<String, Object>> resultList = null;
		
		if(!ArrayUtil.isBlank4List(result) && !ArrayUtil.isBlank4List(nodeMap)){
			resultMap = new HashMap<String, Object>();
			resultList = new LinkedList<Map<String, Object>>();
			
			for (int i = 0; i < nodeMap.size(); ++i) {
				int personNum = 0;
				int nodeId = (int)nodeMap.get(i).get("id");
				String nodeName = (String)nodeMap.get(i).get("name");
				for(int j = 0; j < result.size(); ++j){
					// 判断部门id是否相同
					if((int)result.get(i).get("id") == nodeId){
						// 部门人数加1
						++personNum;
					}
				}
				resultMap.put("nodeId", nodeId);
				resultMap.put("nodeName", nodeName);
				resultMap.put("personNum", personNum);
				resultList.add(resultMap);			}
		}
		return resultList;
	}

	public List<Map<String, Object>> getCourseWare(int id) {
		return lessonDao.getCourseWare(id);
	}
}
