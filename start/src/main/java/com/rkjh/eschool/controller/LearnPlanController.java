package com.rkjh.eschool.controller;

import java.io.InputStream;
import java.sql.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.rkjh.common.util.ArrayUtil;
import com.rkjh.common.util.ImportExcelUtil;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.constant.NodeSql;
import com.rkjh.eschool.entity.Data4D2js;
import com.rkjh.eschool.entity.Error;
import com.rkjh.eschool.entity.Error4D2js;
import com.rkjh.eschool.service.CourseService;
import com.rkjh.eschool.service.GroupService;
import com.rkjh.eschool.service.LearnPlanService;
import com.rkjh.eschool.service.PersionManagerService;
import com.rkjh.eschool.service.StudentProgressService;

/**
 * @Title: LearnPlanController.java
 * @Description: 学习计划Controller
 * @Author: Yang yixuan
 * @Create Date: 2016年7月13日上午11:16:14
 * @Version: V1.00
 */
@Controller
@RequestMapping("**/jv/learnplan")
public class LearnPlanController {

	/**
	 * 学习计划Service
	 */
	@Autowired
	public LearnPlanService learnPlanService;
	@Autowired
	public GroupService groupService;

	/**
	 * 课程Service
	 */
	public CourseService courseService;

	/**
	 * 学员学习课程进度Service
	 */
	public StudentProgressService studentProgressService;
	@Autowired
	PersionManagerService persionManagerService;

	/**
	 * 查询学习计划列表
	 * @param  data json 字符串
	 * name 计划名称
	 * 
	 * @return 学习计划列表
	 */
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public Object list(@RequestParam(value = "data", required = true) String data, HttpServletRequest request) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("查询失败");
			error.setTable("train_plan");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSON.parseObject(data);
		// 新增视野查询 2016-8-23 yangyixuan start
		try {
			String nodeSql = NodeSql.getNodeSql(request.getSession(), "TRAIN_PLAN");
			dataObj.put("nodeSql", nodeSql);
		} catch (Exception e) {
			Error error = new Error();
			error.setMessage("获取视野失败");
			error.setTable("train_plan");
			return JSON.toJSONString(new Error4D2js(error));
		}
		// 新增视野查询 2016-8-23 yangyixuan end
		List<Map<String, Object>> resultMap = learnPlanService.list(dataObj);
		return JSON.toJSONString(resultMap);
	}

	/**
	 * 根据学习计划id查询学习计划详情
	 * 
	 * @param id
	 *            学习计划id
	 * @return 学习计划
	 */
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	public ModelAndView detail(@RequestParam(value = "id", required = true) int id) {
		Map<String, Object> result = learnPlanService.detail(id);
		ModelAndView mav = new ModelAndView();
		mav.addObject("data", result);
		mav.setViewName("learnPlanDetail");
		return mav;
	}

	/**
	 * 修改学习计划
	 * 
	 * @param id
	 *            学习计划id
	 * @return 学习计划修改页面
	 */
	@RequestMapping(value = "/detailupdate", method = RequestMethod.GET)
	public ModelAndView detailUpdate(@RequestParam(value = "id", required = true) int id) {
		Map<String, Object> result = learnPlanService.detail(id);
		ModelAndView mav = new ModelAndView();
		mav.addObject("data", result);
		mav.setViewName("learnPlanUpdate");
		return mav;
	}

	/**
	 * 根据学习计划查询课程内容列表
	 * 
	 * @param data json 格式字符串
	 * id  学习计划id
	 * @return 课程内容列表
	 */
	@RequestMapping(value = "/coursecontent", method = RequestMethod.GET)
	@ResponseBody
	public Object courseContent(@RequestParam(value = "data", required = true) String data) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("查询失败");
			error.setTable("train_student_learn_course");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSON.parseObject(data);

		// 获取学习计划信息
		List<Map<String, Object>> resultNameList = learnPlanService.getPlan(dataObj);
		if (ArrayUtil.isBlank4List(resultNameList)) {
			Error error = new Error();
			error.setMessage("查询课程内容失败");
			error.setTable("train_plan");
			return JSON.toJSONString(new Error4D2js(error));
		}

		for (Map<String, Object> map : resultNameList) {

			// 获取完成人数，学习人数，未开始人数
			Map<String, Object> resultCount = learnPlanService.courseContent(map);
			if (resultCount == null) {
				Error error = new Error();
				error.setMessage("查询课程内容失败");
				error.setTable("train_student_learn_course");
				return JSON.toJSONString(new Error4D2js(error));
			}

			if (map.get("notify_mode") != null) {
				Array preCourse = (Array) map.get("notify_mode");
				Object preCourses = ArrayUtil.getObject(preCourse);
				map.put("notify_mode", preCourses);
			}

			// 完成人数
			Object endPersonNum = resultCount.get("end");
			// 正在学习人数
			Object startedPersonNum = resultCount.get("started");
			// 未开始学习人数
			Object unstartPersonNum = resultCount.get("unstart");

			map.put("end", endPersonNum);
			map.put("started", startedPersonNum);
			map.put("unstart", unstartPersonNum);
		}
		return JSON.toJSONString(resultNameList);
	}

	/**
	 * 根据学习计划id查询学习人员信息
	 * 
	 * @param data
	 * personId 学员id
	 * personName 学员名称
	 * students 学员id[]
	 * nodeName 部门名称
	 * state 状态
	 * id 
	 * 
	 * id 学习计划id
	 * @return 学员信息
	 */
	@RequestMapping(value = "/person", method = RequestMethod.GET)
	@ResponseBody
	public Object getPerson(@RequestParam(value = "data", required = true) String data) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("查询失败");
			error.setTable("train_course");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSON.parseObject(data);
		List<Map<String, Object>> result = learnPlanService.getPerson(dataObj);
		if (ArrayUtil.isBlank4List(result)) {
			Error error = new Error();
			error.setMessage("查询学习人员信息失败");
			return JSON.toJSONString(new Error4D2js(error));
		}
		return JSON.toJSONString(result);
	}

	@RequestMapping(value ="/importLearnStudent",method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Object importLearnStudent(HttpServletRequest request){
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		InputStream in = null;
		List<String> listob = null;
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			MultipartFile file = multipartRequest.getFile("upfile");
			if (file.isEmpty()) {
				throw new Exception("文件不存在！");
			}
			in = file.getInputStream();
			listob = ImportExcelUtil.getimportExcile(in, file.getOriginalFilename());
			if (listob == null) {
				resultMap.put("success", false);
				resultMap.put("msg", "excel格式不正确!");
				return resultMap;
			}
			Map<String, Object>  student = groupService.listPersonByUserName(listob);
			in.close();
			List<String> nostudent = new ArrayList<String>();
		    JSONObject json = JSONObject.parseObject(JSON.toJSONString(student));
		    JSONArray  studentArray = json.getJSONArray("data");
		    for (String username : listob) {
				int flag = 0;
		    	for(int i = 0; i < studentArray.size();i++ ){
		    		if(username.equals(studentArray.getJSONObject(i).getString("username"))){
		    			flag ++;
		    		}
		    	}
		    	if(flag <= 0){
		    		nostudent.add(username);
		    	}
			}
            resultMap.put("un", nostudent);
			resultMap.put("success", true);
			resultMap.put("student", student);
			resultMap.put("msg", "导入成功!");

		} catch (Exception e) {
			System.out.println(e.getMessage());
			resultMap.put("success", false);
			resultMap.put("msg", "导入失败!");
		}

		return resultMap;
	}
	/**
	 * 根据学习计划id查询通知人员列表
	 * 
	 * @param data json格式字符串
	 * personId 学员id
	 * personName 学员名称
	 * nodeName 部门
	 * id 学习计划id
	 * @return 通知人员列表
	 * 
	 *         参数结构说明 ： { page size id : 学习计划id personId personName nodeName }
	 * 
	 */
	@RequestMapping(value = "/notifyperson", method = RequestMethod.GET)
	@ResponseBody
	public Object getNotifyPerson(@RequestParam(value = "data", required = true) String data) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("询通知人员列表");
			error.setTable("train_plan");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSON.parseObject(data);
		List<Map<String, Object>> result = learnPlanService.notifyPersonList(dataObj);
//		if (ArrayUtil.isBlank4List(result)) {
//			Error error = new Error();
//			error.setMessage("查询询通知人员列表失败");
//			return JSON.toJSONString(new Error4D2js(error));
//		}
		return JSON.toJSONString(result);
	}

	/**
	 * 新增学习计划
	 * 
	 * @param data 学习计划（json 格式字符串）
	 * trainBatchStart 学习开始时间
	 * trainBatchEnd 学习结束时间
	 * courses 课程id[]
	 * students 学员id[]
	 * name 计划名称
	 * planner
	 * describe 描述
	 * node 部门
	 * 
	 * @return 成功/失败
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	@ResponseBody
	public Object add(@RequestParam(value = "data", required = true) String data, HttpServletRequest request,
			HttpServletResponse response) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("学习计划信息不能为空");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject obj = JSONObject.parseObject(data);
		HttpSession session = request.getSession();
		Map<String, Object> sessionUser = (Map) session.getAttribute("user");
		JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
		obj.put("planner", sessionJson.getJSONObject("person").getInteger("id"));
		obj.put("node", sessionJson.getJSONObject("node").getInteger("id"));
		int result = learnPlanService.add(obj);
		if (result != CodeEnum.SUCCESS_CODE_0) {
			Error error = new Error();
			error.setMessage("学习计划新增失败");
			return JSON.toJSONString(new Error4D2js(error));
		}

		// 获取通知方式
		JSONArray notifyMode = obj.getJSONArray("notifyMode");
		// 发送通知
		/*
		 * for(int i = 0; i < notifyMode.size(); ++i){ String mode =
		 * notifyMode.getString(i); if(StringUtil.equals("P", mode)){ //公告 }
		 * if(StringUtil.equals("p", mode)){ //飞行员准备网 }
		 * if(StringUtil.equals("D", mode)){ //叮咚 } if(StringUtil.equals("M",
		 * mode)){ //短信 } }
		 */

		return JSON.toJSONString(Data4D2js.SUCCESS);
	}

	/**
	 * 删除学习计划
	 * @param 学习计划id
	 * @return 成功/失败
	 */
	@RequestMapping(value = "/delplan", method = RequestMethod.POST)
	@ResponseBody
	public Object delPlan(@RequestParam(value = "data", required = true) String data) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("删除学习计划失败");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject obj = JSONObject.parseObject(data);
		JSONArray ids = obj.getJSONArray("id");
		for (int i = 0; i < ids.size(); ++i) {
			int result = learnPlanService.delPlan(ids.getInteger(i));
			if (result != CodeEnum.SUCCESS_CODE_0) {
				Error error = new Error();
				error.setMessage("学习计划删除失败");
				return JSON.toJSONString(new Error4D2js(error));
			}
		}
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}

	/**
	 * 修改学习计划
	 * 
	 * @param data  学习计划
	 * trainBatchStart 学习开始时间
	 * trainBatchEnd 学习结束时间
	 * courses 课程id[]
	 * students 学员id[]
	 * name 计划名称
	 * describe 描述
	 * node 部门
	 * @return 成功/失败
	 */
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseBody
	public Object update(@RequestParam(value = "data", required = true) String data, HttpServletRequest request,
			HttpServletResponse response) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("学习计划信息不能为空");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject obj = JSONObject.parseObject(data);
		HttpSession session = request.getSession();
		Map<String, Object> sessionUser = (Map) session.getAttribute("user");
		JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
		obj.put("planner", sessionJson.getJSONObject("person").getInteger("id"));

		int result = learnPlanService.update(obj);
		if (result != CodeEnum.SUCCESS_CODE_0) {
			Error error = new Error();
			error.setMessage("学习计划修改失败");
			return JSON.toJSONString(new Error4D2js(error));
		}

		// 获取通知方式
		JSONArray notifyMode = obj.getJSONArray("notifyMode");
		// 发送通知
		/*
		 * for(int i = 0; i < notifyMode.size(); ++i){ String mode =
		 * notifyMode.getString(i); if(StringUtil.equals("P", mode)){ //公告 }
		 * if(StringUtil.equals("p", mode)){ //飞行员准备网 }
		 * if(StringUtil.equals("D", mode)){ //叮咚 } if(StringUtil.equals("M",
		 * mode)){ //短信 } }
		 */

		return JSON.toJSONString(Data4D2js.SUCCESS);
	}

	/**
	 * 修改学习进度（员工端）
	 * 
	 * @param data 学习记录信息
	 * learnState 学习状态
	 * progress 进度
	 * studentLearnCourse 学习课程
	 * lessonId 课程id
	 * trainTime 学习时间
	 * evaluation 
	 * trainComment
	 * type
	 * 
	 * @return 成功/失败
	 */
	@RequestMapping(value = "/studentprogress", method = RequestMethod.POST)
	@ResponseBody
	public Object studentProgress(@RequestParam(value = "data", required = true) String data,
			HttpServletRequest request) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("查询评价信息失败");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSONObject.parseObject(data);
		HttpSession session = request.getSession();
		Map<String, Object> sessionUser = (Map) session.getAttribute("user");
		JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
		dataObj.put("studentId", sessionJson.getJSONObject("person").getInteger("id"));
		int result = studentProgressService.studentProgress(dataObj);
		if (result != CodeEnum.SUCCESS_CODE_0) {
			Error error = new Error();
			error.setMessage("新增课程失败");
			error.setTable("train_course");
			return JSON.toJSONString(new Error4D2js(error));
		}
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}

	/**
	 *
	 * 导入员工界面
	 * 
	 * @return
	 */
	@RequestMapping(value = "/import", method = RequestMethod.GET)
	public ModelAndView importPersion() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("importPersion");
		return mav;
	}

	/**
	 * 导入员工excel文件
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "uploadExcel", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Map<String, Object> uploadExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		InputStream in = null;
		List<List<Object>> listob = null;
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			MultipartFile file = multipartRequest.getFile("upfile");
			if (file.isEmpty()) {
				throw new Exception("文件不存在！");
			}
			in = file.getInputStream();
			listob = ImportExcelUtil.getBankListByExcel(in, file.getOriginalFilename());
			if (listob == null) {
				resultMap.put("success", false);
				resultMap.put("msg", "excel格式不正确!");
				return resultMap;
			}
			in.close();
			List<Object> list = new ArrayList<Object>();
			for (int i = 0; i < listob.size(); i++) {
				List<Object> lo = listob.get(i);
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("employeeNo", String.valueOf(lo.get(0)));// 员工编号
				jsonObject.put("level", String.valueOf(lo.get(1)));// 等级
				jsonObject.put("name", String.valueOf(lo.get(2)));// 姓名
				jsonObject.put("cabinCrewInspector", String.valueOf(lo.get(3)));// 客舱乘务检查员
				jsonObject.put("cabinCrew", String.valueOf(lo.get(4)));// 客舱乘务教员
				jsonObject.put("bClassTeacher", String.valueOf(lo.get(5)));// B类教员
				jsonObject.put("longFlightInstructor", String.valueOf(lo.get(6)));// 晋级乘务长带飞教员
				jsonObject.put("internationalQualificationTraining", String.valueOf(lo.get(7)));// 国际线资格培训
				jsonObject.put("threeHundredQualification", String.valueOf(lo.get(8)));// 330资格
				jsonObject.put("boutique", String.valueOf(lo.get(9)));// 精品
				jsonObject.put("Announcer", String.valueOf(lo.get(10)));// 广播员
				jsonObject.put("Lhasa", String.valueOf(lo.get(11)));// 拉萨
				jsonObject.put("specialCharter", String.valueOf(lo.get(12)));// 专包机
				jsonObject.put("cadre", String.valueOf(lo.get(13)));// 干部
				jsonObject.put("teacher", String.valueOf(lo.get(14)));// 教员
				jsonObject.put("foreman", String.valueOf(lo.get(15)));// 班组长
				list.add(jsonObject);
			}
			resultMap.put("date", list);
			resultMap.put("success", true);
			resultMap.put("msg", "导入成功!");

		} catch (Exception e) {
			resultMap.put("success", false);
			resultMap.put("msg", "导入失败!");
		}

		return resultMap;
	}

	/**
	 * 
	 * 上传人员信息
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "submitPersion", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public Map<String, Object> submitPersion(String personDate) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			JSONArray jsonArray = JSONArray.parseArray(personDate);
			List<String> fail = new ArrayList<String>();
			for (int i = 0; i < jsonArray.size(); i++) {
				JSONObject jsonObject = jsonArray.getJSONObject(i);
				// System.out.println(jsonObject.get("employeeNo") + "---"
				// + jsonObject.get("level") + "---" + jsonObject.get("name")
				// + "---" + jsonObject.get("cabinCrewInspector") + "---"
				// + jsonObject.get("cabinCrew") + "---"
				// + jsonObject.get("bClassTeacher") + "---"
				// + jsonObject.get("longFlightInstructor") + "---"
				// + jsonObject.get("internationalQualificationTraining") +
				// "---"
				// + jsonObject.get("threeHundredQualification") + "---"
				// + jsonObject.get("boutique") + "---"
				// + jsonObject.get("Announcer") + "---"
				// + jsonObject.get("Lhasa") + "---"
				// + jsonObject.get("specialCharter") + "---"
				// + jsonObject.get("cadre") + "---"
				// +jsonObject.get("teacher") + "---"
				// +jsonObject.get("foreman") + "---");
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("username", jsonObject.get("employeeNo"));
				map.put("tag", jsonObject);
				if (!persionManagerService.impotPersion(map)) {
					fail.add(jsonObject.getString("name"));
				}
				;

			}
			resultMap.put("success", true);
			if (fail.size() == 0) {
				resultMap.put("msg", "数据导入成功");
			} else {
				resultMap.put("msg", "部分员工数据导入失败！" + fail);
			}

		} catch (Exception e) {
			System.out.println(e.toString());
			resultMap.put("success", false);
			resultMap.put("msg", "提交失败！");
		}

		return resultMap;
	}
}
