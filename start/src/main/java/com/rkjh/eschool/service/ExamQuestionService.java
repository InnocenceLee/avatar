package com.rkjh.eschool.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.dao.ExamQuestionDao;

@Service
public class ExamQuestionService {
	
	@Autowired
	public ExamQuestionDao examQuestionDao;
	
	public List<Map<String, Object>> list(Map<String, Object> map){		
		List<Map<String, Object>> resultList = examQuestionDao.list(map);	
		return resultList;
	}
	
	public Integer findDept(Map<String,Object> map){
		Integer deptId = examQuestionDao.findDept(map);
		return deptId;
	}
	public int listCount(Map<String, Object> map){
		 return examQuestionDao.listCount(map);
	}
	
	
	/**
	 * 修改题库
	 * @param map 题库信息
	 * @return 成功/失败
	 */
	public int update(Map<String, Object> map){
		// check是否同名
		int result = examQuestionDao.update(map);
		return  (result <= 0) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	
	public int dels(int[] idsInt){
		//check是否被引用
		//查询试卷题库
		//查询课程题库
		//查询试题题库
		int result = examQuestionDao.dels(idsInt);
		return  (result <= 0) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 新增题库
	 * @param map 题库
	 * @return 成功失败
	 */
	public int add(Map<String, Object> map){
		String node = examQuestionDao.findNodeName(map);
		map.put("node", node);
		examQuestionDao.add(map);
		return  (map.get("id") == null) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}

	/**
	 * 获取问题
	 * @param ids
	 * @return 
	 */
	public List<Map<String, Object>> getQuestion(String ids) {
		String[] sids = ids.split(",");
		int[] is = new int[sids.length];
		for(int i = 0 ; i < sids.length ; i++){
			is[i] = Integer.parseInt(sids[i]);
		}
		return examQuestionDao.getByIds(is);
		
	}

	/**
	 * 自定义生成的试卷问题
	 * @param sNum 单选题数, 
	 * @param mNum 多选题数,
	 * @param cNum 判断题数
	 * @param difficulty 问题难度
	 * @param excludeIds 排除问题 id集
	 * @param size 
	 * @param start 
	 * @return
	 */
	public Map<String,Object> customQuesttion(Integer sNum, Integer mNum, Integer cNum, Integer difficulty,
			Integer[] excludeIds,Integer[] knowledges,String random) {
		Map<String,Object> param = new HashMap<>();
		param.put("sNum", sNum);
		param.put("mNum", mNum);
		param.put("cNum", cNum);
		param.put("difficulty", difficulty);
		if(excludeIds!=null&&excludeIds.length>0){
		param.put("excludeIds", excludeIds);
		}
		param.put("knowledges", knowledges);
		if(random!=null){
			param.put("random", "random");
		}
		
		Map<String,Object> rs = new HashMap<>();
		List<Map<String, Object>> questions = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> sQuestions = examQuestionDao.findSQuestions(param);
		List<Map<String, Object>> mQuestions = examQuestionDao.findMQuestions(param);
		List<Map<String, Object>> cQuestions = examQuestionDao.findCQuestions(param);
		questions.addAll(sQuestions);
		questions.addAll(mQuestions);
		questions.addAll(cQuestions);
		
		rs.put("questions", questions);
		
		return rs;
	}
	
	
	public Map<String,Object> manualQuesttion(Integer[] knowledges, Integer start, Integer size) {
		Map<String,Object> param = new HashMap<>();
		param.put("knowledges", knowledges);
		if(start != null){
			param.put("start", size * (start-1));
			param.put("size", size);
		}
		
		Map<String,Object> rs = new HashMap<>();
		
		List<Map<String, Object>> questions = examQuestionDao.customQuesttion(param);
		rs.put("questions", questions);
		Integer count = examQuestionDao.count4customQuesttion(param);
		if(start != null){
			rs.put("totalNum", count%size == 0 ? count/size : count/size + 1);
		}
		return rs;
	}
	/**
	 * 根据题目ids查询题目信息
	 * @param questionId 题目ids
	 * @return 题目信息
	 */
	public List<Map<String, Object>> list4Id(JSONArray questionId){
		List<Map<String, Object>> resultMap = examQuestionDao.list4Id(questionId);
		return resultMap;
	}


	public List<Map<String, Object>> list4Ids(Map<String, Object> args) {
		return examQuestionDao.list4Ids(args);
	}
}
