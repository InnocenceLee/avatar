package com.rkjh.eschool.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.rkjh.common.exceptions.BusinessException;
import com.rkjh.common.util.ArrayUtil;
import com.rkjh.common.util.LogUtil;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.entity.Data4D2js;
import com.rkjh.eschool.entity.Error;
import com.rkjh.eschool.entity.Error4D2js;
import com.rkjh.eschool.service.NotifyService;

/**
 * @Title: NotifyController.java
 * @Description: 公告管理Controller
 * @author rkjh
 * @date 2016年6月28日 下午1:47:31
 * @version V1.0
 */
@Controller
@RequestMapping("**/jv/notify")
public class NotifyController {

	/**
	 * 公告Service
	 */
	@Autowired
	public NotifyService notifyService;

	/**
	 * 查询公告列表
	 * 
	 * @return 公告列表
	 * @throws Exception
	 *             查询失败
	 *             http://localhost:8080/start/jsp/jv/notify/list.do?keyword=测试&
	 *             persionId=&dateBegin=2016-07-28&dateEnd=&start=&size=
	 */
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public Object list(@RequestParam(value = "keyword", required = false, defaultValue = "") String keyword,
			@RequestParam(value = "dateBegin", required = false, defaultValue = "") String dateBegin,
			@RequestParam(value = "dateEnd", required = false, defaultValue = "") String dateEnd,
			@RequestParam(value = "start", required = false, defaultValue = "1") int start,
			@RequestParam(value = "size", required = false, defaultValue = "10") int size,
			HttpServletRequest request) throws Exception {
		try {
			HttpSession session =  request.getSession();
			Map<String, Object> sessionUser = (Map)session.getAttribute("user");
			JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("persionId", sessionJson.getJSONObject("person").getInteger("id"));
			map.put("keyword", keyword);
			map.put("dateBegin", dateBegin);
			map.put("dateEnd", dateEnd);
			map.put("start", size * (start - 1));
			map.put("size", size);
			Map<String, Object> resultMaps = notifyService.list(map);
			return JSON.toJSONString(resultMaps);
		} catch (Exception e) {
			LogUtil.e("公告查询失败");
			LogUtil.i("公告查询失败");
			throw new BusinessException("公告查询失败" + e);
		}
	}

	/**
	 * 查询公告列表
	 * 
	 * @return 公告列表
	 * @throws Exception
	 *             查询失败
	 *             http://localhost:8080/start/jsp/jv/notify/listByPerson.do
	 */
	@RequestMapping(value = "/listByPerson", method = RequestMethod.GET)
	@ResponseBody
	public Object listByPerson(HttpServletRequest request,
			@RequestParam(value = "keyword", required = false, defaultValue = "") String keyword,
			@RequestParam(value = "dateBegin", required = false, defaultValue = "") String dateBegin,
			@RequestParam(value = "dateEnd", required = false, defaultValue = "") String dateEnd,
			@RequestParam(value = "start", required = false, defaultValue = "1") int start,
			@RequestParam(value = "size", required = false, defaultValue = "10") int size) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("keyword", keyword);
			map.put("dateBegin", dateBegin);
			map.put("dateEnd", dateEnd);
			map.put("start", size * (start - 1));
			map.put("size", size);
			HttpSession session = request.getSession();
			Map<String, Object> sessionUser = (Map) session.getAttribute("user");
			JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
			map.put("persionId", sessionJson.getJSONObject("person").getInteger("id"));
			map.put("station", sessionJson.getJSONObject("role").getInteger("station_id"));
			/*
			 * if(sessionJson.getJSONObject("user") != null){
			 * map.put("persionId",
			 * sessionJson.getJSONObject("user").getJSONObject("person").
			 * getInteger("id")); }else{ map.put("persionId", 0); }
			 */
			Map<String, Object> resultMaps = notifyService.listByPerson(map);
			session.setAttribute("newCount", resultMaps.get("newCount"));
			return JSON.toJSONString(resultMaps);
		} catch (Exception e) {
			LogUtil.e("公告查询失败");
			LogUtil.i("公告查询失败");
			throw new BusinessException("公告查询失败" + e);
		}
	}

	@RequestMapping(value = "/listNewCount", method = RequestMethod.GET)
	@ResponseBody
	public Object listNewCount(HttpServletRequest request) throws Exception {
		Integer newCount;
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			HttpSession session = request.getSession();
			Map<String, Object> sessionUser = (Map) session.getAttribute("user");
			JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
			map.put("persionId", sessionJson.getJSONObject("person").getInteger("id"));
			newCount = notifyService.listNewCount(map);
			session.setAttribute("newCount", newCount);
		} catch (Exception e) {
			LogUtil.e("公告查询失败");
			LogUtil.i("公告查询失败");
			throw new BusinessException("公告查询失败" + e);
		}
		return newCount;
	}

	/**
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 *             http://localhost:8080/start/jsp/jv/notify/getById.do?id=15
	 */
	@RequestMapping(value = "/getById", method = RequestMethod.GET)
	public ModelAndView getById(@RequestParam(value = "id", required = true) int id, HttpServletRequest request)
			throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			HttpSession session = request.getSession();
			Map<String, Object> sessionUser = (Map) session.getAttribute("user");
			JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
			map.put("persionId", sessionJson.getJSONObject("person").getInteger("id"));
			map.put("id", id);
			Map<String, Object> resultMaps = notifyService.getById(map);
			session.setAttribute("newCount", resultMaps.get("newCount"));
			ModelAndView mav = new ModelAndView();
			mav.addObject("data", resultMaps);
			mav.setViewName("notifyDetail");
			return mav;
		} catch (Exception e) {
			LogUtil.e("公告查询失败");
			LogUtil.i("公告查询失败");
			throw new BusinessException("公告查询失败" + e);
		}
	}

	@RequestMapping(value="/findById",method=RequestMethod.GET)
	@ResponseBody
	public Object findById(@RequestParam(value="id",required=true)int id){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		Map<String, Object> resultMaps = notifyService.getById(map);
		return JSON.toJSONString(resultMaps);
		
	}
	/**
	 * 新增公告
	 * 
	 * @return 公告信息
	 * @throws Exception
	 *             新增失败
	 *             http://localhost:8080/start/jsp/jv/notify/add.do?title=测试标题&
	 *             receiver=1,2,3&content=测试内容
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	@ResponseBody
	public Object add(@RequestParam(value = "title") String title, @RequestParam(value = "receiver") int[] receiver,
			@RequestParam(value = "content", defaultValue = "") String content, HttpServletRequest request)
					throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("title", title);
			map.put("receiver", receiver);
			map.put("content", content);
			map.put("create_date", new Date());
			// 创建者

			HttpSession session = request.getSession();
			Map<String, Object> sessionUser = (Map) session.getAttribute("user");
			JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
			map.put("sender", sessionJson.getJSONObject("person").getInteger("id"));
			/*
			 * if(sessionJson.getJSONObject("user") != null){ map.put("sender",
			 * sessionJson.getJSONObject("user").getJSONObject("person").
			 * getInteger("id")); }else{ map.put("sender", 0); }
			 */
			// 新增
			int result = notifyService.add(map);
			if (result == CodeEnum.ERROR_CODE_N1) {
				Error error = new Error();
				error.setMessage("新增公告失败");
				error.setTable("knowledge_point");
				return JSON.toJSONString(new Error4D2js(error));
			}
			return JSON.toJSONString(Data4D2js.SUCCESS);
		} catch (Exception e) {
			LogUtil.e("公告新增失败");
			LogUtil.i("公告新增失败");
			throw new BusinessException("新增失败" + e.getMessage());
		}
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseBody
	public Object update(@RequestParam(value = "id") int id,@RequestParam(value = "title") String title, @RequestParam(value = "receiver") int[] receiver,
			@RequestParam(value = "content", defaultValue = "") String content, HttpServletRequest request)
					throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", id);
			map.put("title", title);
			map.put("receiver", receiver);
			map.put("content", content);
			map.put("create_date", new Date());
//			// 创建者
//
//			HttpSession session = request.getSession();
//			Map<String, Object> sessionUser = (Map) session.getAttribute("user");
//			JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
//			map.put("sender", sessionJson.getJSONObject("person").getInteger("id"));
			
			// 修改
			int result = notifyService.update(map);
			if (result == CodeEnum.ERROR_CODE_N1) {
				Error error = new Error();
				error.setMessage("修改公告失败");
				error.setTable("knowledge_point");
				return JSON.toJSONString(new Error4D2js(error));
			}
			return JSON.toJSONString(Data4D2js.SUCCESS);
		} catch (Exception e) {
			LogUtil.e("公告修改失败");
			LogUtil.i("公告修改失败");
			throw new BusinessException("修改失败" + e.getMessage());
		}
	}
	
	@RequestMapping(value = "/del", method = RequestMethod.POST)
	@ResponseBody
	public Object del(@RequestParam(value = "data", required = true) String data) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("删除公告失败");
			error.setTable("notify");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject obj = JSONObject.parseObject(data);
		JSONArray jsonArray = obj.getJSONArray("ids");
		if (ArrayUtil.isEmpty4JSONArray(jsonArray)) {
			Error error = new Error();
			error.setMessage("删除公告失败，没有公告信息");
			error.setTable("notify");
			return JSON.toJSONString(new Error4D2js(error));
		}
		int result = notifyService.delNotifyByIds(jsonArray);
		if (result != CodeEnum.SUCCESS_CODE_0) {
			Error error = new Error();
			error.setMessage("删除公告失败");
			error.setTable("notify");
			return JSON.toJSONString(new Error4D2js(error));
		}
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}
}
