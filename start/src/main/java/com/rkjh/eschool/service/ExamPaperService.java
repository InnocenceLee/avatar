package com.rkjh.eschool.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.postgresql.jdbc4.Jdbc4Array;
import org.postgresql.util.PGobject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.rkjh.common.exceptions.BusinessException;
import com.rkjh.common.util.ArrayUtil;
import com.rkjh.common.util.LogUtil;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.dao.ExamPaperDao;
import com.rkjh.eschool.dao.ExamQuestionDao;
import com.rkjh.eschool.entity.Error;
import com.rkjh.eschool.entity.Error4D2js;

import net.sf.json.JSONObject;

@Service
public class ExamPaperService {
	
	@Autowired
	public ExamPaperDao examPaperDao;
	@Autowired
	public ExamQuestionDao examQuestionDao;
	
	
	public List<Map<String, Object>> list(Map<String, Object> map){
		Map<String, Object> resultData = new HashMap<String, Object>();
		List<Map<String, Object>> resultList = examPaperDao.list(map);
		int totalNum = examPaperDao.listCount(map);
		resultData.put("data", resultList);
		resultData.put("totalNum", totalNum);
		return resultList;
	}
	
	public int listCount(Map<String, Object> map){
		int totalNum = examPaperDao.listCount(map);
		return totalNum;
	}

	public List<Map<String, Object>> listPassAuditing(Map<String, Object> map){
		Map<String, Object> resultData = new HashMap<String, Object>();
		List<Map<String, Object>> resultList = examPaperDao.listPassAuditing(map);
		int totalNum = examPaperDao.listCount(map);
		resultData.put("data", resultList);
		resultData.put("totalNum", totalNum);
		return resultList;
	}
	
	public int listPassAuditingCount(Map<String, Object> map){
		int totalNum = examPaperDao.listPassAuditingCount(map);
		return totalNum;
	}
	
	/**
	 * 修改题库
	 * @param map 题库信息
	 * @return 成功/失败
	 */
	public int update(Map<String, Object> map){
		// check是否同名
		int result = examPaperDao.update(map);
		return  (result <= 0) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	public int dels(int[] idsInt){
		//check是否被引用
		//查询试卷题库
		//查询课程题库
		//查询试题题库
		int result = examPaperDao.dels(idsInt);
		return  (result <= 0) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 新增题库
	 * @param map 题库
	 * @return 成功失败
	 */
	public int add(Map<String, Object> map){
		examPaperDao.add(map);
		return  (map.get("id") == null) ? CodeEnum.ERROR_CODE_N1 : Integer.parseInt(map.get("id").toString());
	}


	public int dels(String[] ids) {
		// TODO Auto-generated method stub
		return 0;
	}
	
	public Object gennerateQuestion(int id) throws Exception{
		try{
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", id);
			map.put("start", 0);
			map.put("size", 1);
			List<Map<String, Object>> resultMap = this.list(map);
			if(resultMap.size() != 1){
				Error error = new Error();
				error.setMessage("新增内容失败");
				error.setTable("exam_paper");
				return JSON.toJSONString(new Error4D2js(error));
			}
			Map<String, Object> paper = resultMap.get(0);
			Jdbc4Array knowledges = (Jdbc4Array)paper.get("knowledges");
			String mode = (String)paper.get("mode");
			Integer question_count = (Integer)paper.get("question_count");
			Integer difficultys = (Integer)paper.get("difficulty");
			Integer[] difficulty = new Integer[1];
			difficulty[0] = difficultys;
			if(mode.equals("M")){
				//手动
				//单选
				PGobject question_num = (PGobject)paper.get("quesions_num");
				JSONObject qJson = JSONObject.fromObject(question_num.getValue());
				int singleChoice = qJson.getInt("single_choice");
				int multipleChoice = qJson.getInt("multiple_choice");
				int judge = qJson.getInt("judge");
				//单选
				map = new HashMap<String, Object>();
				map.put("type", "S");
				map.put("difficulty", difficulty);
				map.put("knowledges", knowledges.getArray());
				map.put("random", "random");
				map.put("size", singleChoice);
				List<Map<String, Object>> questionList = examQuestionDao.list(map);
				//多选
				map = new HashMap<String, Object>();
				map.put("type", "M");
				map.put("difficulty", difficulty);
				map.put("knowledges", knowledges.getArray());
				map.put("random", "random");
				map.put("size", multipleChoice);
				questionList.addAll(examQuestionDao.list(map));
				//判断
				map = new HashMap<String, Object>();
				map.put("type", "C");
				map.put("difficulty", difficulty);
				map.put("knowledges", knowledges.getArray());
				map.put("random", "random");
				map.put("size", judge);
				questionList.addAll(examQuestionDao.list(map));
				return JSON.toJSONString(questionList);
			}else{
				//自动
				map = new HashMap<String, Object>();
				map.put("difficulty", difficulty);
				map.put("knowledges", knowledges.getArray());
				map.put("size", question_count);
				map.put("random", "random");
				List<Map<String, Object>> questionList = examQuestionDao.list(map);
				return JSON.toJSONString(questionList);
			}
		} catch(Exception e){
			LogUtil.e("试卷修改失败");
			LogUtil.i("试卷修改失败");
			throw new BusinessException("试卷修改失败"+e);
		}
	}
	
	/**
	 * 更新数据
	 * @param param
	 * @return
	 */
	public int updateOne(Map<String, Object> param) {
		
//新增2016-8-12 试卷总分计算 start
		int score = 0;
		if(param.get("content") != null){
			// 获取试卷内容信息
			com.alibaba.fastjson.JSONObject contentObj = (com.alibaba.fastjson.JSONObject)param.get("content");
			
			// 获取试卷中所有的题目id
			JSONArray ids = new JSONArray();
			JSONArray questionsArray = contentObj.getJSONArray("questions");
			if(!ArrayUtil.isEmpty4JSONArray(questionsArray)){
				for(int i = 0; i < questionsArray.size(); ++i){
					int id = questionsArray.getJSONObject(i).getInteger("id");
					ids.add(id);
				}
				// 根据ids获取所有题目的分数
				List<Map<String, Object>> questionList = examQuestionDao.list4Id(ids);
				for(Map<String, Object> map : questionList){
					score += Integer.parseInt(map.get("score").toString());
				}
				// 保存试卷总分
				param.put("score", score);
			}
		}
//新增2016-8-12 试卷总分计算 end
		
		int result = examPaperDao.updateOne(param);
		return result;
	}
	
	
	/**
	 * 新增word导入的exam_question
	 * @param param
	 * @return
	 */
	@Transactional
	public List<Integer> insertQuestions(Map<String, Object> param) {
		
		List<Integer> ids = new ArrayList<Integer>();
		String node = examQuestionDao.findNodeName(param);
		if(param.get("data") != null){
			
			com.alibaba.fastjson.JSONArray tempArray = (com.alibaba.fastjson.JSONArray)param.get("data");
			for(int i=0;i<tempArray.size();i++){
				com.alibaba.fastjson.JSONObject obj = (com.alibaba.fastjson.JSONObject) tempArray.get(i);
				Map<String,Object> tempMap = new HashMap<String,Object>();
				tempMap.put("difficulty", obj.getInteger("difficulty"));
				tempMap.put("score", obj.getInteger("score"));
				tempMap.put("w_num", obj.getInteger("w_num"));
				tempMap.put("r_num", obj.getInteger("r_num"));
				tempMap.put("state", obj.getString("state"));
				tempMap.put("type", obj.getString("type"));
				tempMap.put("content", obj.getJSONObject("content"));
				tempMap.put("knowledge", obj.getInteger("knowledge"));
				tempMap.put("node", node);
				tempMap.put("creatdate", new Date());
				examQuestionDao.add(tempMap);
				ids.add(examQuestionDao.selectCurrentId());
			}
		
		}
		
		return ids;
	}

	public Map<String, Object> getExamPaperById(int id) {
		return examPaperDao.getExamPaperById(id);
	}

	
}
