package com.rkjh.eschool.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.postgresql.util.PGobject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.avatar.Node;
import com.rkjh.common.exceptions.BusinessException;
import com.rkjh.common.util.LogUtil;
import com.rkjh.common.util.PageUtil;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.constant.NodeSql;
import com.rkjh.eschool.entity.Data4D2js;
import com.rkjh.eschool.entity.Error;
import com.rkjh.eschool.entity.Error4D2js;
import com.rkjh.eschool.service.ExamPaperService;
import com.rkjh.eschool.service.ExamQuestionService;
import com.rkjh.eschool.service.KnowledgePointService;

import net.sf.json.JSONObject;

/**
 * @Title: ExamPaperController.java
 * @Description: 试卷管理Controller
 * @author rkjh
 * @date 2016年6月28日 下午1:47:31
 * @version V1.0
 */
@Controller
@RequestMapping("**/jv/examPaper")
public class ExamPaperController {

	@Autowired
	public ExamPaperService examPaperService;

	@Autowired
	public ExamQuestionService examQuestionService;
	/**
	 * 知识点Service
	 */
	@Autowired
	public KnowledgePointService knowledgePointService;

	/**
	 * 查询试卷列表
	 * 
	 * @return 试卷列表
	 * @throws Exception
	 *             查询失败
	 *             http://localhost:8080/start/jv/examPaper/list.do?id=&name=fds
	 *             &state=&mode=S&start=1&size=10
	 */
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public Object list(@RequestParam(value = "id", required = false, defaultValue = "-1") int id,
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "state", required = false) String state,
			@RequestParam(value = "mode", required = false) Character mode,
			@RequestParam(value = "start", required = false, defaultValue = "1") int start,
			@RequestParam(value = "size", required = false, defaultValue = "10") int size, HttpServletRequest request)
					throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", id);
			map.put("name", name);
			map.put("state", state);
			map.put("mode", mode);
			map.put("start", size * (start - 1));
			map.put("size", size);

			// 新增视野查询 2016-8-23 yangyixuan start
			try {
				String nodeSql = NodeSql.getNodeSql(request.getSession(), "EXAM_PAPER");
				map.put("nodeSql", nodeSql);
			} catch (Exception e) {
				Error error = new Error();
				error.setMessage("获取视野失败");
				error.setTable("exam_paper");
				return JSON.toJSONString(new Error4D2js(error));
			}
			// 新增视野查询 2016-8-23 yangyixuan end
			Map<String, Object> resultData = new HashMap<String, Object>();
			List<Map<String, Object>> resultList = examPaperService.list(map);
			int totalNum = examPaperService.listCount(map);
			resultData.put("data", resultList);
			resultData.put("totalNum", PageUtil.getTotleNum(totalNum, size));

			return JSON.toJSONString(resultData);
		} catch (Exception e) {
			LogUtil.e("试卷查询失败");
			LogUtil.i("试卷查询失败");
			throw new BusinessException("试卷查询失败" + e);
		}
	}
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	@ResponseBody
	public Object Detail(@RequestParam(value = "id") int id){
		try {
			Map<String, Object> resultMap = examPaperService.getExamPaperById(id);
			return JSON.toJSONString(resultMap);
		} catch (Exception e) {
			LogUtil.e("试卷查询失败");
			LogUtil.i("试卷查询失败");
			throw new BusinessException("试卷查询失败" + e);
		}
		
	}
	/**
	 * 查询试卷列表
	 * 
	 * @return 试卷列表
	 * @throws Exception
	 *             查询失败
	 *             http://localhost:8080/start/jv/examPaper/list.do?id=&name=fds
	 *             &state=&mode=S&start=1&size=10
	 */
	@RequestMapping(value = "/listpassauditing", method = RequestMethod.GET)
	@ResponseBody
	public Object listPassAuditing(@RequestParam(value = "id", required = false, defaultValue = "-1") int id,
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "state", required = false) String state,
			@RequestParam(value = "mode", required = false) Character mode,
			@RequestParam(value = "start", required = false, defaultValue = "1") int start,
			@RequestParam(value = "size", required = false, defaultValue = "10") int size, HttpServletRequest request)
					throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", id);
			map.put("name", name);
			map.put("state", state);
			map.put("mode", mode);
			map.put("start", size * (start - 1));
			map.put("size", size);

			// 新增视野查询 2016-8-23 yangyixuan start
			try {
				String nodeSql = NodeSql.getNodeSql(request.getSession(), "EXAM_PAPER");
				map.put("nodeSql", nodeSql);
			} catch (Exception e) {
				Error error = new Error();
				error.setMessage("获取视野失败");
				error.setTable("exam_paper");
				return JSON.toJSONString(new Error4D2js(error));
			}
			// 新增视野查询 2016-8-23 yangyixuan end
			Map<String, Object> resultData = new HashMap<String, Object>();
			List<Map<String, Object>> resultList = examPaperService.listPassAuditing(map);
			int totalNum = examPaperService.listPassAuditingCount(map);
			resultData.put("data", resultList);
			resultData.put("totalNum", PageUtil.getTotleNum(totalNum, size));

			return JSON.toJSONString(resultData);
		} catch (Exception e) {
			LogUtil.e("试卷查询失败");
			LogUtil.i("试卷查询失败");
			throw new BusinessException("试卷查询失败" + e);
		}
	}

	/**
	 * 生产题目
	 * 
	 * @return 试卷信息
	 * @throws Exception
	 *             修改失败
	 * 
	 */
	@RequestMapping(value = "/gennerateQuestion", method = RequestMethod.POST)
	@ResponseBody
	public Object gennerateQuestion(@RequestParam(value = "id", required = false) int id, HttpServletRequest request)
			throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", id);
			map.put("start", 0);
			map.put("size", 1);

			// 新增视野查询 2016-8-23 yangyixuan start
			String nodeSql = null;
			try {
				nodeSql = NodeSql.getNodeSql(request.getSession(), "EXAM_PAPER");
				map.put("nodeSql", nodeSql);
			} catch (Exception e) {
				Error error = new Error();
				error.setMessage("获取视野失败");
				error.setTable("exam_paper");
				return JSON.toJSONString(new Error4D2js(error));
			}
			// 新增视野查询 2016-8-23 yangyixuan end

			List<Map<String, Object>> resultMap = examPaperService.list(map);
			if (resultMap.size() != 1) {
				Error error = new Error();
				error.setMessage("新增内容失败");
				error.setTable("exam_paper");
				return JSON.toJSONString(new Error4D2js(error));
			}
			Map<String, Object> paper = resultMap.get(0);
			String[] split = paper.get("knowledges").toString().split(",");
			List<Integer> knowledges = new ArrayList<Integer>();
			for (int i = 0; i < split.length; i++) {
				knowledges.add(Integer.parseInt(split[i]));
			}

			// Jdbc4Array knowledges = (Jdbc4Array)paper.get("knowledges");
			String mode = (String) paper.get("mode");
			Integer question_count = (Integer) paper.get("question_count");
			Integer difficultys = (Integer) paper.get("difficulty");
			Integer[] difficulty = new Integer[1];
			difficulty[0] = difficultys;
			if (mode.equals("S")||mode.equals("D")) {
				// 手动||word导入
				// 单选
				PGobject question_num = (PGobject) paper.get("quesions_num");
				JSONObject qJson = JSONObject.fromObject(question_num.getValue());
				int singleChoice = qJson.getInt("single_choice");
				int multipleChoice = qJson.getInt("multiple_choice");
				int judge = qJson.getInt("judge");
				// 单选
				map = new HashMap<String, Object>();
				map.put("type", "S");
				map.put("difficulty", difficulty);
				map.put("knowledges", knowledges);
				map.put("random", "random");
				map.put("size", singleChoice);
				map.put("nodeSql", nodeSql);
				List<Map<String, Object>> questionList = examQuestionService.list(map);
				// 多选
				map = new HashMap<String, Object>();
				map.put("type", "M");
				map.put("difficulty", difficulty);
				map.put("knowledges", knowledges);
				map.put("random", "random");
				map.put("size", multipleChoice);
				map.put("nodeSql", nodeSql);
				questionList.addAll(examQuestionService.list(map));
				// 判断
				map = new HashMap<String, Object>();
				map.put("type", "C");
				map.put("difficulty", difficulty);
				map.put("knowledges", knowledges);
				map.put("random", "random");
				map.put("size", judge);
				map.put("nodeSql", nodeSql);
				questionList.addAll(examQuestionService.list(map));
				return questionList;
			} else {
				// 自动
				List<Map<String, Object>> knowledgePointMap = knowledgePointService.findChildren(knowledges.get(0));
				Integer[] ks = new Integer[knowledgePointMap.size()];
				for (int i = 0; i < knowledgePointMap.size(); i++) {
					ks[i]=Integer.parseInt(knowledgePointMap.get(i).get("id").toString());
				}
				PGobject qu = (PGobject)paper.get("quesions_num");
				com.alibaba.fastjson.JSONObject questionsNum = com.alibaba.fastjson.JSONObject.parseObject(qu.getValue());
				
				Integer sNum = (Integer)questionsNum.get("single_choice");
				Integer mNum = (Integer)questionsNum.get("multiple_choice");
				Integer cNum = (Integer)questionsNum.get("judge");
				Map<String, Object> result = examQuestionService.customQuesttion(sNum, mNum, cNum, difficulty[0], null,
						ks,"random");
				return JSON.toJSONString(result.get("questions"));
			}
		} catch (Exception e) {
			LogUtil.e("获取试题失败");
			LogUtil.i("获取试题失败");
			throw new BusinessException("获取试题失败" + e);
		}
	}

	/**
	 * 修改试卷
	 * 
	 * @return 试卷信息
	 * @throws Exception
	 *             修改失败
	 */
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseBody
	public Object update(@RequestParam(value = "id") int id,
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "difficulty", required = false, defaultValue = "0") int difficulty,
			@RequestParam(value = "question_count", required = false, defaultValue = "0") int question_count,
			@RequestParam(value = "knowledges", required = false) int[] knowledges,
			@RequestParam(value = "variance", required = false, defaultValue = "0") int variance,
			@RequestParam(value = "mode", required = false) Character mode,
			@RequestParam(value = "content", required = false) String content,
			@RequestParam(value = "duration", required = false, defaultValue = "0") int duration,
			@RequestParam(value = "state", required = false,defaultValue="N") String state,
			@RequestParam(value = "totle_score", required = false, defaultValue = "0") float totle_score,
			@RequestParam(value = "node", required = false, defaultValue = "0") int node,
			@RequestParam(value = "person", required = false, defaultValue = "0") int person,
			@RequestParam(value = "p_type", required = false) String p_type,
			@RequestParam(value = "quesions_num", required = false) String quesions_num,
			@RequestParam(value = "belong", required = false, defaultValue = "0") int belong,
			@RequestParam(value = "discribe", required = false) String discribe,
			@RequestParam(value = "auditLog", required = false) String auditLog,
			@RequestParam(value = "score", required = false) String score,
			HttpServletRequest request)
					throws Exception {
		try {
			Map<String, Object> idmap = new HashMap<String, Object>();
			idmap.put("id", id);
			idmap.put("start", 0);
			idmap.put("size", 1);

			// 新增视野查询 2016-8-23 yangyixuan start
			try {
				String nodeSql = NodeSql.getNodeSql(request.getSession(), "EXAM_PAPER");
				idmap.put("nodeSql", nodeSql);
			} catch (Exception e) {
				Error error = new Error();
				error.setMessage("获取视野失败");
				error.setTable("exam_paper");
				return JSON.toJSONString(new Error4D2js(error));
			}
			// 新增视野查询 2016-8-23 yangyixuan end

			List<Map<String, Object>> resultMap = examPaperService.list(idmap);
			if (resultMap.size() != 1) {
				Error error = new Error();
				error.setMessage("修改试卷失败,没有对应id");
				error.setTable("examPaper");
				return JSON.toJSONString(new Error4D2js(error));
			}

			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", id);
			if (StringUtils.isNotEmpty(auditLog)) {
				map.put("auditLog", JSON.parse(auditLog));
			}

			if (StringUtils.isNotBlank(name)) {
				map.put("name", name);
			}
			if (difficulty > 0) {
				map.put("difficulty", difficulty);
			}
			if (question_count > 0) {
				map.put("question_count", question_count);
			}
		
				map.put("knowledges", knowledges);
			
			if (variance > 0) {
				map.put("variance", variance);
			}
			if (mode != null) {
				map.put("mode", mode);
			}
			if (StringUtils.isNotBlank(content)) {
				map.put("content", com.alibaba.fastjson.JSONObject.parseObject(content));
			} else {
				map.put("content", JSON.parse(map.get("content") + ""));
			}

			map.put("duration", duration);

			if (StringUtils.isNotBlank(state)) {
				map.put("state", state);
			}
			if (totle_score > 0) {
				map.put("totle_score", totle_score);
			}
			if (belong > 0) {
				map.put("belong", belong);
			}
			if (node > 0) {
				map.put("node", node);
			}
			if (person > 0) {
				map.put("node", person);
			}
			if (StringUtils.isNotBlank(p_type)) {
				map.put("p_type", p_type);
			}
			if (StringUtils.isNotBlank(quesions_num)) {
				map.put("quesions_num", JSON.parse(quesions_num));
			} else {
				map.put("quesions_num", JSON.parse(map.get("quesions_num") + ""));
			}
			if (StringUtils.isNotBlank(discribe)) {
				map.put("discribe", discribe);
			}

			// 新增
			int result = examPaperService.update(map);
			if (result == CodeEnum.ERROR_CODE_N1) {
				Error error = new Error();
				error.setMessage("修改试卷失败");
				error.setTable("knowledge_point");
				return JSON.toJSONString(new Error4D2js(error));
			}

			Map<String, Object> rs = new HashMap<>();
			rs.put("success", true);
			return rs;
		} catch (Exception e) {
			LogUtil.e("试卷修改失败");
			LogUtil.i("试卷修改失败");
			throw new BusinessException("试卷修改失败");
		}
	}

	@RequestMapping(value = "/dels", method = RequestMethod.POST)
	@ResponseBody
	public Object dels(@RequestParam(value = "ids", required = true) int[] ids) throws Exception {
		try {
			int result = examPaperService.dels(ids);
			if (result == CodeEnum.ERROR_CODE_N1) {
				Error error = new Error();
				error.setMessage("删除试卷失败");
				error.setTable("knowledge_point");
				return JSON.toJSONString(new Error4D2js(error));
			}
			return JSON.toJSONString(Data4D2js.SUCCESS);
		} catch (Exception e) {
			LogUtil.e("试卷删除失败");
			LogUtil.i("试卷删除失败");
			throw new BusinessException("试卷删除失败");
		}
	}

	/**
	 * 新增试卷
	 * 
	 * @return 试卷信息
	 * @throws Exception
	 *             新增失败
	 *             http://localhost:8080/start/jsp/jv/examPaper/add.do?name=1&
	 *             difficulty=1&question_count=20&knowledges=1,2,3&mode=A&
	 *             content={1:1}&duration=1&state=N&totle_score=100&belong=1&
	 *             node=1&person=1&p_type=A&quesions_num={single_choice:5,
	 *             multiple_choice:10,judge:20}
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	@ResponseBody
	public Object add(@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "difficulty", defaultValue = "0") int difficulty,
			@RequestParam(value = "question_count", defaultValue = "0") int question_count,
			@RequestParam(value = "knowledges", required = false, defaultValue = "0") int[] knowledges,
			@RequestParam(value = "variance", required = false, defaultValue = "0") int variance,
			@RequestParam(value = "mode") Character mode,
			@RequestParam(value = "content", required = false) String content,
			@RequestParam(value = "duration", defaultValue = "0") int duration,
			@RequestParam(value = "state", required = false, defaultValue = "N") String state,
			@RequestParam(value = "totle_score", required = false, defaultValue = "0") float totle_score,
			@RequestParam(value = "person", defaultValue = "0") int person,
			@RequestParam(value = "p_type", required = false) String p_type,
			@RequestParam(value = "quesions_num", required = false, defaultValue = "{single_choice:0,multiple_choice:0,judge:0}") String quesions_num,
			@RequestParam(value = "belong", required = false, defaultValue = "0") int belong,
			@RequestParam(value = "discribe", required = false, defaultValue = "0") String discribe,
			HttpServletRequest request

	) throws Exception {
           
	         
	  
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("name", name);
			map.put("difficulty", difficulty);
			map.put("question_count", question_count);
			map.put("knowledges", knowledges);
			map.put("variance", variance);
			map.put("mode", mode);
			map.put("content", JSON.parse(content));
			map.put("duration", duration);
			map.put("state", state);
			map.put("totle_score", totle_score);
			map.put("belong", belong);
			map.put("create_date", new Date());
			
			map.put("p_type", p_type);
			map.put("discribe", discribe);
			map.put("quesions_num", JSON.parse(quesions_num));
			HttpSession session = request.getSession();
			Map<String, Object> sessionUser = (Map) session.getAttribute("user");
			com.alibaba.fastjson.JSONObject sessionJson = com.alibaba.fastjson.JSONObject
					.parseObject(JSON.toJSONString(sessionUser));
			map.put("node", sessionJson.getJSONObject("node").getInteger("id"));
			map.put("person", sessionUser.get("id"));
			// 新增
			int result = examPaperService.add(map);
			if (result == CodeEnum.ERROR_CODE_N1) {
				Error error = new Error();
				error.setMessage("新增试卷失败");
				error.setTable("examPaper");
				return JSON.toJSONString(new Error4D2js(error));
			}
			Map<String, String> res = new HashMap<>();
			res.put("success", "success");
			res.put("id", result + "");
			return res;
		} catch (Exception e) {
			LogUtil.e("试卷新增失败");
			LogUtil.i("试卷新增失败");
			throw new BusinessException("新增失败" + e);
		}
	}

	@RequestMapping("/getQuestion")
	@ResponseBody
	public List<Map<String, Object>> getQuestion(String ids, String pid) {
		Map<String, String> result = new HashMap<>();
		if (StringUtils.isEmpty(ids)) {
			result.put("msg", "无请求数据");
		}
		List<Map<String, Object>> questions = examQuestionService.getQuestion(ids);
		return questions;
	}

	@RequestMapping("/insertQuestions")
	@ResponseBody
	public Object insertQuestions(@RequestParam(value = "questions", required = false) String questions,
			HttpServletRequest request) {
		List<Integer> result = new ArrayList<Integer>();
		String nodeSql = null;
		Map<String, Object> param = new HashMap<>();
		try {
			HttpSession session = request.getSession();
			Map<String, Object> sessionUser = (Map) session.getAttribute("user");
			com.alibaba.fastjson.JSONObject sessionJson = com.alibaba.fastjson.JSONObject
					.parseObject(JSON.toJSONString(sessionUser));
			nodeSql = Node.nodeSql((Integer) sessionJson.getJSONObject("node").get("id"), "OFFICE", true);
		} catch (Exception e) {
			Error error = new Error();
			error.setMessage("获取视野失败");
			error.setTable("exam_paper");
			return JSON.toJSONString(new Error4D2js(error));
		}
		List<Object> array = JSON.parseArray(questions);

		param.put("data", array);
		param.put("nodeSql", nodeSql);
		result = examPaperService.insertQuestions(param);
		return result;
	}

	@RequestMapping("/updateOne")
	@ResponseBody
	public Map<String, String> updateOne(int id, String content,Double totalScore,Integer questionCount,String questionsNum) {
		Map<String, String> result = new HashMap<>();
		if (id == 0) {
			result.put("msg", "无请求数据");
		}
		Map<String, Object> param = new HashMap<>();
		param.put("content", com.alibaba.fastjson.JSONObject.parseObject(content));
		param.put("questionsNum", com.alibaba.fastjson.JSONObject.parseObject(questionsNum));
		param.put("id", id);
		param.put("totalScore",totalScore );
		param.put("questionCount", questionCount);
		examPaperService.updateOne(param);
		result.put("msg", "修改成功");

		return result;
	}

	/**
	 * 随机生成的试卷问题
	 * 
	 * @param sNum
	 *            单选题数,
	 * @param mNum
	 *            多选题数,
	 * @param cNum
	 *            判断题数
	 * @param difficulty
	 *            问题难度
	 * @param excludeIds
	 *            排除问题
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/customQuesttion")
	@ResponseBody
	public Map<String, Object> customQuesttion(@RequestParam(value = "sNum", required = false) Integer sNum,
			@RequestParam(value = "mNum", required = false) Integer mNum,
			@RequestParam(value = "cNum", required = false) Integer cNum,
			@RequestParam(value = "difficulty", required = false) Integer difficulty,
			@RequestParam(value = "start", required = false) Integer start,
			@RequestParam(value = "size", required = false) Integer size,
			@RequestParam(value = "excludeIds", required = false) String excludeIds,
			@RequestParam(value = "knowledges", required = true) Integer[] knowledges)
					throws Exception {
		Integer[] intExcludeIds=null;
		if(excludeIds != null && !excludeIds.trim().equals("")){
			String[] tempExcludeIds = excludeIds.split(",");
			intExcludeIds=new Integer[tempExcludeIds.length];
			for(int i=0;i<tempExcludeIds.length;i++){
				intExcludeIds[i]=Integer.parseInt(tempExcludeIds[i]);
			}
		}else{
			intExcludeIds=new Integer[0];
		}
		
		List<Map<String, Object>> knowledgePointMap = knowledgePointService.findChildren(knowledges[0]);
		
		knowledges = new Integer[knowledgePointMap.size()];
		for (int i = 0; i < knowledgePointMap.size(); i++) {
			knowledges[i] = Integer.parseInt(knowledgePointMap.get(i).get("id").toString());
		}
		Map<String, Object> result = examQuestionService.customQuesttion(sNum, mNum, cNum, difficulty, intExcludeIds,
				knowledges,null);
		return result;
	}
	
	
	/**
	 * 手动生成的试卷问题
	 * 
	 * @param sNum
	 *            单选题数,
	 * @param mNum
	 *            多选题数,
	 * @param cNum
	 *            判断题数
	 * @param difficulty
	 *            问题难度
	 * @param excludeIds
	 *            排除问题
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/manualQuesttion")
	@ResponseBody
	public Map<String, Object> manualQuesttion(
			@RequestParam(value = "start", required = false) Integer start,
			@RequestParam(value = "size", required = false) Integer size,
			@RequestParam(value = "knowledges", required = true) Integer[] knowledges)
					throws Exception {
		List<Map<String, Object>> knowledgePointMap = knowledgePointService.findChildren(knowledges[0]);
		
		knowledges = new Integer[knowledgePointMap.size()];
		for (int i = 0; i < knowledgePointMap.size(); i++) {
			knowledges[i] = Integer.parseInt(knowledgePointMap.get(i).get("id").toString());
		}
		
		Map<String, Object> result = examQuestionService.manualQuesttion(knowledges,start,size);
		return result;
		

		
	}
}
