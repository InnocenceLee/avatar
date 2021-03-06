package com.rkjh.eschool.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.avatar.Node;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.entity.Data4D2js;
import com.rkjh.eschool.entity.Error4D2js;
import com.rkjh.eschool.entity.Error;
import com.rkjh.eschool.service.ExamQuestionService;
import com.rkjh.eschool.service.KnowledgePointService;

/**
 * @Title: KnowledgePointController.java
 * @Description: 知识点管理Controller
 * @author Yang yixuan
 * @date 2016年6月28日 下午1:47:31
 * @version V1.0
 */
@Controller
@RequestMapping("**/jv/knowledgepoint")
public class KnowledgePointController {
	@Autowired
	public ExamQuestionService examQuestionService;
	/**
	 * 知识点Service
	 */
	@Autowired
	public KnowledgePointService knowledgePointService;

	/**
	 * 查询知识点列表
	 * 
	 * @return 知识点列表
	 * @throws Exception
	 *             查询失败
	 */
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public Object list(HttpServletRequest request) throws Exception {
		HttpSession session = request.getSession();
		Map<String, Object> sessionUser = (Map) session.getAttribute("user");
		JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
		String nodeSql=null;
		Map<String,Object> m = new HashMap<String,Object>();
		String sql = Node.nodeSql((Integer)sessionJson.getJSONObject("node").get("id"), "OFFICE", true);
		m.put("sql", sql);
		Integer dept = examQuestionService.findDept(m);
		nodeSql = Node.nodeSql(dept, "OFFICE", false);
		m.put("nodeSql", nodeSql);
		List<Map<String, Object>> resultMap = knowledgePointService.list(m);
		return JSON.toJSONString(resultMap);
	}
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	@ResponseBody
	public Object Detail(@RequestParam(value = "id", required = true) int id){
		Map<String, Object> resultMap = knowledgePointService.getKnowledgePointById(id);
		return JSON.toJSONString(resultMap);
	}
	/**
	 * 修改知识点
	 * @param  data json 格式字符串
	 * title  知识点名称
	 * remarks 描述
	 * base 父节点
	 * id id
	 * 
	 * @return 知识点信息
	 * @throws Exception
	 *             修改失败
	 */
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseBody
	public Object update(@RequestParam(value = "data", required = true) String data) throws Exception {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("修改知识点失败");
			error.setTable("knowledge_point");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject obj = JSON.parseObject(data);
		int result = CodeEnum.SUCCESS_CODE_0;
		try {
			Integer.parseInt(obj.getString("id"));
			Integer.parseInt(obj.getString("base"));
			result = knowledgePointService.update(obj);
		} catch (Exception e) {
			result = CodeEnum.ERROR_CODE_N1;
		}
		if (result != CodeEnum.SUCCESS_CODE_0) {
			Error error = new Error();
			error.setMessage("修改知识点失败");
			error.setTable("knowledge_point");
			return JSON.toJSONString(new Error4D2js(error));
		}
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}

	/**
	 * 删除知识点
	 * 
	 * @return 知识点id
	 * @throws Exception
	 *             删除失败
	 */
	@RequestMapping(value = "/del", method = RequestMethod.POST)
	@ResponseBody
	public Object del(@RequestParam(value = "id", required = true) int id) {
		int result = knowledgePointService.del(id);
		if (result != CodeEnum.SUCCESS_CODE_0) {
			Error error = new Error();
			error.setMessage("删除知识点失败,知识点已被引用");
			error.setTable("knowledge_point");
			return JSON.toJSONString(new Error4D2js(error));
		}
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}

	/**
	 * 新增知识点
	 * 
	 * @return 知识点信息
	 * @throws Exception
	 *             新增失败
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	@ResponseBody
	public Object add(@RequestParam(value = "title", required = true) String title,
			@RequestParam(value = "remarks") String remarks, @RequestParam(value = "base") int base,
			HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("title", title);
		map.put("remarks", remarks);
		map.put("base", base);
		HttpSession session = request.getSession();
		Map<String, Object> sessionUser = (Map) session.getAttribute("user");
		JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
		map.put("node", sessionJson.getJSONObject("node").get("id"));
		// 新增
		int result = knowledgePointService.add(map);
		if (result != CodeEnum.SUCCESS_CODE_0) {
			Error error = new Error();
			error.setMessage("新增知识点失败");
			error.setTable("knowledge_point");
			return JSON.toJSONString(new Error4D2js(error));
		}
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}

	@RequestMapping("/loadTree")
	@ResponseBody
	public List<Map<String, Object>> loadKnowledgeTree(Integer id) {
		return knowledgePointService.loadKnowledgeTree(id);
	}
}
