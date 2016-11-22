package com.rkjh.eschool.controller;

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
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.entity.Data4D2js;
import com.rkjh.eschool.entity.Error;
import com.rkjh.eschool.entity.Error4D2js;
import com.rkjh.eschool.service.StudentProgressService;

/**
* @Title: StudentProgressController.java
* @Description: 学习进度Controller
* @Author: Yang yixuan
* @Create Date: 2016年7月9日下午3:18:54
* @Version: V1.00
*/
@Controller
@RequestMapping("**/jv/progress")
public class StudentProgressController {
	
	/**
	 * 学习进度Service
	 */
	@Autowired
	public StudentProgressService studentProgressService;
	
	/**
	 * 根据课程id查询课时评价
	 * 
	 * jv/progress/listcourse.do
	 * {
			page : x,
			size : x,
			trainPlanId : x,
			courseId : x,
			personId : x,
			personName : x,
			nodeName : x,
			lessonName : x
		}
	 * 
	 * @param data 查询条件
	 * @return 课时评价
	 */
	@RequestMapping(value="/listcourse",method=RequestMethod.GET)
	@ResponseBody
	public Object list4Course(@RequestParam(value="data", required=true) String data){
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("查询失败");
			error.setTable("train_student_progress");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSON.parseObject(data);
		List<Map<String, Object>> resultMap = studentProgressService.list4Course(dataObj);
		return JSON.toJSONString(resultMap);
	}
	
	/**
	 * 新增学员学习进度
	 * @param data 学习进度信息 json 格式字符串
	 * studentLearnCourse
	 * lessonId
	 * learnState
	 * progress
	 * trainTime
	 * evaluation
	 * trainComment
	 * type
	 * id
	 * 
	 * @return 成功/失败
	 */
	@RequestMapping(value="/addprogress",method=RequestMethod.POST)
	@ResponseBody
	public Object addProgress(@RequestParam(value="data", required=true) String data,HttpServletRequest request,HttpServletResponse response){
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("新增失败");
			error.setTable("train_student_progress");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSON.parseObject(data);
		HttpSession session =  request.getSession();
		Map<String, Object> sessionUser = (Map)session.getAttribute("user");
		JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
		dataObj.put("studentId", sessionJson.getJSONObject("person").getInteger("id"));
		int result = studentProgressService.studentProgress(dataObj);
		if(result != CodeEnum.SUCCESS_CODE_0){
			Error error = new Error();
			error.setMessage("更新失败");
			error.setTable("train_student_progress");
			return JSON.toJSONString(new Error4D2js(error));
		}
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}
	
	@RequestMapping(value="/updateprogress",method=RequestMethod.POST)
	@ResponseBody
	public Object updateProgress(@RequestParam(value="data", required=true) String data,HttpServletRequest request,HttpServletResponse response){
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("修改失败");
			error.setTable("train_student_progress");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSON.parseObject(data);
		HttpSession session =  request.getSession();
		Map<String, Object> sessionUser = (Map)session.getAttribute("user");
		JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
		dataObj.put("studentId", sessionJson.getJSONObject("person").getInteger("id"));
		int result = studentProgressService.updateProgress(dataObj);
		if(result != CodeEnum.SUCCESS_CODE_0){
			Error error = new Error();
			error.setMessage("更新失败");
			error.setTable("train_student_progress");
			return JSON.toJSONString(new Error4D2js(error));
		}
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}
	
	
	/**
	 * 修改学习状态
	 * @param data
	 * @return
	 */
	@RequestMapping(value="/updateLearnState",method=RequestMethod.POST)
	@ResponseBody
	public Object updateLearnState(@RequestParam(value="data", required=true) String data){
		JSONObject dataObj = JSON.parseObject(data);
		int result = studentProgressService.updateLearnState(dataObj);
		if(result == CodeEnum.SUCCESS_CODE_0){
			return JSON.toJSONString(Data4D2js.SUCCESS);
		}else{
			Error error = new Error();
			error.setMessage("课时的学习状态修改失败");
			return JSON.toJSONString(new Error4D2js(error));
		}
	}
	
}
