package com.rkjh.eschool.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.avatar.Node;
import com.rkjh.common.exceptions.BusinessException;
import com.rkjh.common.util.LogUtil;
import com.rkjh.common.util.PageUtil;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.constant.NodeSql;
import com.rkjh.eschool.entity.Data4D2js;
import com.rkjh.eschool.entity.Error;
import com.rkjh.eschool.entity.Error4D2js;
import com.rkjh.eschool.service.ExamQuestionService;

/**
 * @Title: ExamQuestionController.java
 * @Description: 题库管理Controller
 * @author rkjh
 * @date 2016年6月28日 下午1:47:31
 * @version V1.0
 */
@Controller
@RequestMapping("**/jv/examQuestion")
public class ExamQuestionController {

	/**
	 * 题库Service
	 */
	@Autowired
	public ExamQuestionService examQuestionService;

	/**
	 * 查询题库列表
	 * 
	 * @return 题库列表
	 * @throws Exception
	 *             查询失败
	 *             http://localhost:8080/start/jv/examQuestion/list.do?id=&type=
	 *             &difficulty=3&start=20&size=10
	 */
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public Object list(@RequestParam(value = "id", required = false, defaultValue = "0") int id,
			@RequestParam(value = "type", required = false) String type,
			@RequestParam(value = "difficulty", required = false) int[] difficulty,
			@RequestParam(value = "title", required = false) String title,
			@RequestParam(value = "knowledge", required = false) int[] knowledge,
			@RequestParam(value = "start", required = false, defaultValue = "1") int start,
			@RequestParam(value = "size", required = false, defaultValue = "10") int size,HttpServletRequest request) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", id);
			map.put("type", type);
			if (difficulty != null && difficulty.length > 0) {
				map.put("difficulty", difficulty);
			}
			map.put("title", title);
			if(knowledge!=null&&knowledge.length!=0){
				map.put("knowledges", knowledge);
			}
			map.put("start", size * (start - 1));
			map.put("size", size);
			map.put("order", "id");
			try {
				HttpSession session = request.getSession();
				Map<String, Object> sessionUser = (Map) session.getAttribute("user");
				JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
				String nodeSql=null;
				if("OFFICE".equals(sessionJson.getJSONObject("node").getString("type"))){
					Map<String,Object> m = new HashMap<String,Object>();
					String sql = Node.nodeSql((Integer)sessionJson.getJSONObject("node").get("id"), "OFFICE", true);
					m.put("sql", sql);
					Integer dept = examQuestionService.findDept(m);
					nodeSql = Node.nodeSql(dept, "OFFICE", false);
				}else{
					nodeSql = Node.nodeSql((Integer)sessionJson.getJSONObject("node").get("id"), "OFFICE", false);
				}
				map.put("nodeSql", nodeSql);
				
			} catch (Exception e) {
				Error error = new Error();
				error.setMessage("获取视野失败");
				error.setTable("exam_question");
				return JSON.toJSONString(new Error4D2js(error));
			}
			
			Map<String, Object> resultMap = new HashMap<String, Object>();

			List<Map<String, Object>> resultList = examQuestionService.list(map);
			resultMap.put("data", resultList);

			int count = examQuestionService.listCount(map);
			resultMap.put("totalNum", PageUtil.getTotleNum(count, size));// 页数

			return JSON.toJSONString(resultMap);
		} catch (Exception e) {
			LogUtil.e("题库查询失败");
			LogUtil.i("题库查询失败");
			throw new BusinessException("题库查询失败" + e);
		}
	}

	/**
	 * 修改题库
	 * 
	 * @return 题库信息
	 * @throws Exception
	 *             修改失败
	 */
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseBody
	public Object update(@RequestParam(value = "id", required = true) int id,
			@RequestParam(value = "difficulty", required = false, defaultValue = "0") int difficulty,
			@RequestParam(value = "type", required = false) String type,
			@RequestParam(value = "content", required = false) String content,
			@RequestParam(value = "state", required = false) String state,
			@RequestParam(value = "score", required = false, defaultValue = "0") int score,
			@RequestParam(value = "knowledge", required = false, defaultValue = "0") int knowledge,
			@RequestParam(value = "r_num", required = false, defaultValue = "0") int r_num,
			@RequestParam(value = "w_num", required = false, defaultValue = "0") int w_num,
			HttpServletRequest request) throws Exception {
		try {

			Map<String, Object> idmap = new HashMap<String, Object>();
			idmap.put("id", id);
			idmap.put("start", 0);
			idmap.put("size", 1);
			try {
				HttpSession session = request.getSession();
				Map<String, Object> sessionUser = (Map) session.getAttribute("user");
				JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
				String nodeSql=null;
				if("OFFICE".equals(sessionJson.getJSONObject("node").getString("type"))){
					Map<String,Object> m = new HashMap<String,Object>();
					String sql = Node.nodeSql((Integer)sessionJson.getJSONObject("node").get("id"), "OFFICE", true);
					m.put("sql", sql);
					Integer dept = examQuestionService.findDept(m);
					nodeSql = Node.nodeSql(dept, "OFFICE", false);
				}else{
					nodeSql = Node.nodeSql((Integer)sessionJson.getJSONObject("node").get("id"), "OFFICE", false);
				}
				idmap.put("nodeSql", nodeSql);
				
			} catch (Exception e) {
				Error error = new Error();
				error.setMessage("获取视野失败");
				error.setTable("exam_question");
				return JSON.toJSONString(new Error4D2js(error));
			}
			List<Map<String, Object>> resultMap = examQuestionService.list(idmap);
			if (resultMap.size() != 1) {
				Error error = new Error();
				error.setMessage("修改题库失败,没有对应id");
				error.setTable("examQuestion");
				return JSON.toJSONString(new Error4D2js(error));
			}

			Map<String, Object> map = resultMap.get(0);
			if (difficulty > 0) {
				map.put("difficulty", difficulty);
			}
			if (StringUtils.isNotBlank(type)) {
				map.put("type", type);
			}
			if (StringUtils.isNotBlank(content)) {
				map.put("content", JSON.parse(content));
			} else {
				map.put("content", JSON.parse(map.get("content").toString()));
			}
			if (StringUtils.isNotBlank(state)) {
				map.put("state", state);
			}
			// 分数调用方法计算
			// map.put("score", score);
			if (knowledge > 0) {
				map.put("knowledge", knowledge);
			}
			if (r_num > 0) {
				map.put("r_num", r_num);
			}
			if (knowledge > 0) {
				map.put("w_num", w_num);
			}
			// 新增
			int result = examQuestionService.update(map);
			if (result == CodeEnum.ERROR_CODE_N1) {
				Error error = new Error();
				error.setMessage("修改题库失败");
				error.setTable("knowledge_point");
				return JSON.toJSONString(new Error4D2js(error));
			}
			return JSON.toJSONString(Data4D2js.SUCCESS);
		} catch (Exception e) {
			LogUtil.e("题库修改失败");
			LogUtil.i("题库修改失败");
			throw new BusinessException("题库修改失败" + e);
		}
	}

	@RequestMapping(value = "/dels", method = RequestMethod.POST)
	@ResponseBody
	public Object dels(@RequestParam(value = "ids", required = true, defaultValue = "0") int[] ids) throws Exception {
		try {
			int result = examQuestionService.dels(ids);
			if (result == CodeEnum.ERROR_CODE_N1) {
				Error error = new Error();
				error.setMessage("删除题库失败");
				error.setTable("knowledge_point");
				return JSON.toJSONString(new Error4D2js(error));
			}
			return JSON.toJSONString(Data4D2js.SUCCESS);
		} catch (Exception e) {
			LogUtil.e("题库删除失败");
			LogUtil.i("题库删除失败");
			throw new BusinessException("题库删除失败");
		}
	}

	/**
	 * 新增题库
	 * 
	 * @return 题库信息
	 * @throws Exception
	 *             新增失败 http://localhost:8080/start/jsp/jv/examQuestion/add.do?
	 *             difficulty=3&score=6&w_num=8&r_num=7&state=A&type=S&content={
	 *             1:1}&knowledge=1
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	@ResponseBody
	public Object add(@RequestParam(value = "difficulty") int difficulty, @RequestParam(value = "type") String type,
			@RequestParam(value = "content") String content,
			@RequestParam(value = "state", defaultValue = "A") String state, @RequestParam(value = "score") double score,
			@RequestParam(value = "knowledge") int knowledge, @RequestParam(value = "r_num") int r_num,
			@RequestParam(value = "w_num") int w_num, HttpServletRequest request) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("difficulty", difficulty);
			map.put("type", type);
			map.put("content", JSON.parse(content));
			map.put("state", state);
			map.put("score", score);
			map.put("knowledge", knowledge);
			map.put("r_num", r_num);
			map.put("w_num", w_num);

			HttpSession session = request.getSession();
			Map<String, Object> sessionUser = (Map) session.getAttribute("user");
			JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
			String nodeSql = Node.nodeSql((Integer)sessionJson.getJSONObject("node").get("id"), "OFFICE", true);
			map.put("nodeSql", nodeSql);
			// 新增
			int result = examQuestionService.add(map);
			if (result == CodeEnum.ERROR_CODE_N1) {
				Error error = new Error();
				error.setMessage("新增题库失败");
				error.setTable("knowledge_point");
				return JSON.toJSONString(new Error4D2js(error));
			}
			return Data4D2js.SUCCESS;
		} catch (Exception e) {
			LogUtil.e("题库新增失败");
			LogUtil.i("题库新增失败");
			throw new BusinessException("新增失败" + e.getMessage());
		}
	}

	@RequestMapping("/upload")
	@ResponseBody
	public Map<String, String> upload(MultipartFile upfile, HttpServletRequest req) {
		ServletContext context = req.getSession().getServletContext();
		Map<String, String> rs = new HashMap<>();
		try {
			String originalName = upfile.getOriginalFilename();

			String basePath = context.getRealPath("upload/image");
			String name = new Date().getTime() + "." + FilenameUtils.getExtension(originalName);
			String fileName = basePath + File.separator + name;
			FileOutputStream out = new FileOutputStream(new File(fileName));
			out.write(upfile.getBytes());
			out.close();

			rs.put("url", "upload/image/" + name);
			rs.put("type", FilenameUtils.getExtension(originalName));
			rs.put("original", originalName);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return rs;
	}

	@RequestMapping("/export")
	public void export(@RequestParam(value = "type", required = false) String type,
			@RequestParam(value = "difficulty", required = false) int difficulty,HttpServletRequest req,HttpServletResponse resp) {
		
		Map<String, Object> map = new HashMap<>();
		List<Map<String, Object>> lists = examQuestionService.list(map );
		System.out.println(lists);
//		ExcelUtil.export(lists, mapping)

	}

}
