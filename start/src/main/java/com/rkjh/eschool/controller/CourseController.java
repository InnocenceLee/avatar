package com.rkjh.eschool.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
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
import com.rkjh.common.util.ArrayUtil;
import com.rkjh.common.util.ExcelUtil;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.constant.NodeSql;
import com.rkjh.eschool.entity.Data4D2js;
import com.rkjh.eschool.entity.Error;
import com.rkjh.eschool.entity.Error4D2js;
import com.rkjh.eschool.service.CourseLessonService;
import com.rkjh.eschool.service.CourseService;

/**
*@Title: CourseController.java
*@Description: 课程管理Controller 
*@author Yang yixuan
*@date 2016年7月2日 下午2:19:31
*@version V1.0
*/
@Controller
@RequestMapping("**/jv/course")
public class CourseController {
	
	/**
	 * 课程-适配器
	 */
	@Autowired
	public CourseLessonService courseLessonService;

	/**
	 * 课程管理Service
	 */
	@Autowired
	public CourseService courseService;
	
	/**
	 * 查询课程列表
	 * @return 课程列表
	 * @throws Exception 查询失败
	 * 
	 * @param data  json 格式的字符串
	 * name 课程名称
	 * node 部门名称
	 * state 状态  N 未审核     A 已审核   J 拒绝    R使用中    D 已下架
	 * type  S 标准课件   M 通知课件
	 * page 分页信息（当前页）
	 * size 分页信息（一页大小）
	 */
	@RequestMapping(value="/list",method=RequestMethod.GET)
	@ResponseBody
	public Object list(@RequestParam(value="data", required=true) String data
			,HttpServletRequest request){
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("查询失败");
			error.setTable("train_course");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSON.parseObject(data);
// 新增视野查询 2016-8-23 yangyixuan start
		try {
			String nodeSql = NodeSql.getNodeSql(request.getSession(), "TRAIN_COURSE");
			dataObj.put("nodeSql", nodeSql);
		} catch (Exception e) {
			Error error = new Error();
			error.setMessage("获取视野失败"+e.getMessage());
			error.setTable("train_course");
			return JSON.toJSONString(new Error4D2js(error));
		}
// 新增视野查询 2016-8-23 yangyixuan end
		List<Map<String, Object>> resultMap = courseService.list(dataObj);
		return JSON.toJSONString(resultMap);
	}
	
	/**
	 * 查询审核课程列表
	 * @return 审核课程列表
	 * 
	 * @param data  json 格式的字符串 
	 * name 课程名称
	 * 
	 * 
	 * state 状态  N 未审核     A 已审核   J 拒绝    R使用中    D 已下架
	 * type  S 标准课件   M 通知课件 
	 * page 分页信息（当前页）
	 * size 分页信息（一页大小）
	 * 
	 */
	@RequestMapping(value="/listauditing",method=RequestMethod.GET)
	@ResponseBody
	public Object listAuditing(@RequestParam(value="data", required=true) String data,
			HttpServletRequest request,HttpServletResponse response){
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("查询审核列表失败");
			error.setTable("train_course");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSON.parseObject(data);
		HttpSession session =  request.getSession();
		Map<String, Object> sessionUser = (Map)session.getAttribute("user");
		JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
		dataObj.put("person", sessionJson.getJSONObject("person").getInteger("id"));

// 新增视野查询 2016-8-23 yangyixuan start
		try {
			String nodeSql = NodeSql.getNodeSql(session, "TRAIN_COURSE");
			dataObj.put("nodeSql", nodeSql);
		} catch (Exception e) {
			Error error = new Error();
			error.setMessage("获取视野失败");
			error.setTable("train_course");
			return JSON.toJSONString(new Error4D2js(error));
		}
// 新增视野查询 2016-8-23 yangyixuan end
		List<Map<String, Object>> resultMap = courseService.listAuditing(dataObj);
		return JSON.toJSONString(resultMap);
	}
	
	/**
	 * 查询审核课程详情(课程审核)
	 * @param id 课程id
	 * @return 成功/失败
	 * 
	 */
	@RequestMapping(value="/detailauditing",method=RequestMethod.GET)
	@ResponseBody
	public Object detailAuditing(@RequestParam(value="id", required=true) int id){
		Map<String, Object> resultMap = courseService.detail(id);
		return JSON.toJSONString(resultMap);
	}
	
	@RequestMapping(value="/listTrainLessonNameById",method=RequestMethod.POST)
	@ResponseBody
	public Object listTrainLessonById(@RequestParam(value="id", required=true) int id){
		String name = courseService.listTrainLessonNameById(id);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("name", name);
		return JSON.toJSONString(resultMap);
	}
	/**
	 * 课程审核修改
	 * @param data 审核信息
	 * @return 成功/失败
	 * 
	 * @param data  json 格式的字符串
	 * trainLog 审核日志   
	 * state  状态
	 * id
	 */
	@RequestMapping(value="/updateauditing",method=RequestMethod.POST)
	@ResponseBody
	public Object updateAuditing(@RequestParam(value="data", required=true) String data,
			HttpServletRequest request,HttpServletResponse response){
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("课程审核修改失败");
			error.setTable("train_course");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSON.parseObject(data);
		HttpSession session =  request.getSession();
		Map<String, Object> sessionUser = (Map)session.getAttribute("user");
		JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
		dataObj.put("personId", sessionJson.getJSONObject("person").getInteger("id"));
		int result = courseService.updateAuditing(dataObj);
		if(result != CodeEnum.SUCCESS_CODE_0){
			Error error = new Error();
			error.setMessage("课程审核修改失败");
			error.setTable("train_course");
			return JSON.toJSONString(new Error4D2js(error));
		}
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}
	
	/**
	 * 查询课程详情
	 * @param id 课程id
	 * @return 成功/失败
	 * @throws Exception 查询课程详情失败
	 */
	@RequestMapping(value="/detail",method=RequestMethod.GET)
	public ModelAndView detail(@RequestParam(value="id", required=true) int id){
		Map<String, Object> resultMap = courseService.detail(id);
		ModelAndView mav = new ModelAndView();
		mav.addObject("data", resultMap);
		mav.setViewName("courseDetail");
		return mav;
	}
	
	/**
	 * 查询课程详情员工端
	 * @param id 课程id
	 * @return 成功/失败
	 * @throws Exception 查询课程详情失败
	 */
	@RequestMapping(value="/detailstudent",method=RequestMethod.GET)
	public ModelAndView detail4Student(@RequestParam(value="id", required=true) int id,
			@RequestParam(value="trainStudentLearnCourseId", required=true) int trainStudentLearnCourseId,
			@RequestParam(value="learnDate", required=true) String learnDate){
		Map<String, Object> resultMap = courseService.detail(id);
		ModelAndView mav = new ModelAndView();
		resultMap.put("trainStudentLearnCourseId", trainStudentLearnCourseId);
		resultMap.put("learnDate", learnDate);
		// 根据trainStudentLearnCourseId查找是否存在学习进度
		
		mav.addObject("data", resultMap);
		mav.setViewName("staffCourseDetail");
		return mav;
	}
	
	/**
	 * 根据课程ID 查询课程详情
	 * @param id 课程ID和学习计划ID
	 * @return 学习计划课程详情页面
	 */
	@RequestMapping(value="/detaillearn",method=RequestMethod.GET)
	public ModelAndView detail4learn(@RequestParam(value="id", required=true) int id,
			@RequestParam(value="learnId", required=true) int learnId){
		Map<String, Object> resultMap = courseService.detail(id);
		ModelAndView mav = new ModelAndView();
		resultMap.put("learnId", learnId);
		mav.addObject("data", resultMap);
		mav.setViewName("learnCourseDetail");
		return mav;
	}
	
	/**
	 * 查询课程详情修改页面
	 * @param id 课程id
	 * @return 成功/失败
	 * @throws Exception 查询课程详情失败
	 */
	@RequestMapping(value="/detailupdate",method=RequestMethod.GET)
	public ModelAndView detail4Update(@RequestParam(value="id", required=true) int id){
		Map<String, Object> resultMap = courseService.detail(id);
		ModelAndView mav = new ModelAndView();
		mav.addObject("data", resultMap);
		mav.setViewName("courseUpdate");
		return mav;
	}
	
	/**
	 * 修改课程
	 * @param String 课程
	 * @return 成功/失败
	 * 
	 * @param data json格式字符串
	 * name 课程名称
	 * trainType 课程类型
	 * state 状态
	 * preCourses 前置课程
	 * knowledgePoint 知识点
	 * lessonOrder  顺序是否固定     S 顺序    M 不固定顺序
	 * introduction 描述
	 * id  课程id
	 * 
	 */
	@RequestMapping(value="/update",method=RequestMethod.POST)
	@ResponseBody
	public Object update(@RequestParam(value="data", required=true) String data){
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("修改课程失败");
			error.setTable("train_course");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject course = JSONObject.parseObject(data);
		//根据id修改课程
		int result = courseLessonService.updateCourse(course);
		if(result == CodeEnum.ERROR_CODE_N1){
			Error error = new Error();
			error.setMessage("修改课程失败");
			error.setTable("train_course");
			return JSON.toJSONString(new Error4D2js(error));
		}
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}
	
	
	
	/**
	 * 删除课程
	 * @param String 课程id
	 * @return 成功/失败
	 * 
	 * @param data json格式字符串
	 * id 数组
	 * 
	 */
	@RequestMapping(value="/del",method=RequestMethod.POST)
	@ResponseBody
	public Object del(@RequestParam(value="data", required=true) String data){
		if( StringUtil.isEmpty(data) ){
			Error error = new Error();
			error.setMessage("删除课程失败");
			error.setTable("train_course");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject obj = JSONObject.parseObject(data);
		JSONArray jsonArray = obj.getJSONArray("data");
		// id不能未空
		if( ArrayUtil.isEmpty4JSONArray(jsonArray) ){
			Error error = new Error();
			error.setMessage("删除课程失败");
			error.setTable("train_course");
			return JSON.toJSONString(new Error4D2js(error));
		}

		int result = courseLessonService.del(jsonArray);
		if( result != CodeEnum.SUCCESS_CODE_0 ){
			Error error = new Error();
			error.setMessage("删除课程失败");
			error.setTable("train_course");
			return JSON.toJSONString(new Error4D2js(error));
		}
		
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}
	
	/**
	 * 检查课程是否被引用
	 * @param courseId
	 * @return
	 */
	@RequestMapping(value="/cheakdelLesson",method=RequestMethod.POST)
	@ResponseBody
	public Object cheakDelLesson(@RequestParam(value="courseId", required=true) Integer courseId){
		if(courseId == null){
			Error error = new Error();
			error.setMessage("删除课时失败");
			error.setTable("train_course");
			return JSON.toJSONString(new Error4D2js(error));
		}
		int result = courseLessonService.cheakDelLesson(courseId);
		if( result != CodeEnum.SUCCESS_CODE_0 ){
			Error error = new Error();
			error.setMessage("删除课时失败");
			error.setTable("train_lesson");
			return JSON.toJSONString(new Error4D2js(error));
		}
		
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}
	
	/**
	 * 新增课程
	 * @return 课程信息
	 * 
	 * @param  json 格式字符串
	 * course 课程信息（json）
	 *       name  
	 *       introduction
	 *       enName
	 *       remarks
	 *       knowledgePoint
	 *       preCourses
	 *       trainType
	 *       state
	 *       trainLog
	 *       lessonClassifications
	 *       person
	 *       node
	 * 
	 */
	@RequestMapping(value="/add",method=RequestMethod.POST)
	@ResponseBody
	public Object add(@RequestParam(value="data", required=true) String data,
			HttpServletRequest request,HttpServletResponse response){

		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("课程信息不能为空");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject objCourse = JSONObject.parseObject(data);
		JSONObject course = objCourse.getJSONObject("course");
		
		HttpSession session =  request.getSession();
		Map<String, Object> sessionUser = (Map)session.getAttribute("user");
		JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
		course.put("person", sessionJson.getJSONObject("person").getInteger("id"));
		course.put("node", sessionJson.getJSONObject("node").getInteger("id"));
		
		//新增课程
		int result = courseLessonService.addCourse(course,(Integer)sessionJson.getJSONObject("node").get("id"));
		if(result != CodeEnum.SUCCESS_CODE_0){
			Error error = new Error();
			error.setMessage("新增课程失败");
			error.setTable("train_course");
			return JSON.toJSONString(new Error4D2js(error));
		}
		
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}
	
	/**
	 * 根据课程id和学习计划id查询未学习人员名单
	 * @param data 课程id和学习计划id  (课时ID可以不穿)
	 * @return 未学习人员名单
	 * 
	 * @param  json 格式字符串
	 * trainPlanId
	 * courseId
	 * lessonId
	 * personId
	 * personName
	 * nodeName
	 * 
	 */
	@RequestMapping(value="/notLearnPerson",method=RequestMethod.GET)
	@ResponseBody
	public Object notLearnPerson(@RequestParam(value="data", required=true) String data){
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("查询未学习人员名单失败");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject id = JSONObject.parseObject(data);
		List<Map<String, Object>> result = courseService.notLearnPerson(id);
		return JSON.toJSONString(result);
	}
	
	/**
	 * 根据课程id和学习计划id查询评价信息
	 * @param data 课程id和学习计划id
	 * @return 评价信息
	 * 
	 * @param  json 格式字符串
	 * lessonId
	 * personId
	 * personName
	 * nodeName
	 * lessonName
	 * page 分页对象（当前页）
	 * size 分页对象（一页大小）
	 * 
	 */
	@RequestMapping(value="/comment",method=RequestMethod.GET)
	@ResponseBody
	public Object comment(@RequestParam(value="data", required=true) String data){
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("查询评价信息失败");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSONObject.parseObject(data);
		List<Map<String, Object>> result = courseService.comment(dataObj);
		return JSON.toJSONString(result);
		
	}

	/**
	 * 跟据学员id获取课程列表 
	 * @param data 课程名
	 * @return 课程列表
	 * 
	 * @param json 格式字符串
	 * name
	 * 
	 */
	@RequestMapping(value="/liststudent",method=RequestMethod.GET)
	@ResponseBody
	public Object list4Student(@RequestParam(value="data", required=true) String data,HttpServletRequest request){
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("查询评价信息失败");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSONObject.parseObject(data);
		HttpSession session =  request.getSession();
		Map<String, Object> sessionUser = (Map)session.getAttribute("user");
		JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
		dataObj.put("id", sessionJson.getJSONObject("person").getInteger("id"));
		List<Map<String, Object>> result = courseService.list4Student(dataObj);
		return JSON.toJSONString(result);
	}
	
	/**
	 * 评价导出
	 * @param data json 格式字符串
	 * personId  
	 * personName
	 * nodeName
	 * lessonName
	 * lessonId
	 * 
	 * @throws Exception
	 * 
	 */
	@RequestMapping("exportComment")
	public void exportComment(String data,HttpServletResponse res) throws Exception{
		res.setHeader("Content-Disposition", "attachment; filename=comment.xls");  
        res.setContentType("application/octet-stream; charset=utf-8");
		JSONObject args = JSONObject.parseObject(data);
		List<Map<String, Object>> rs = courseService.getComment(args);
		if(rs.size() == 0) return;
		List<String> mapping = new ArrayList<>();
		
		mapping.add("课时名称:lessonName");
		mapping.add("员工编号:personId");
		mapping.add("员工姓名:personName");
		mapping.add("星级:evaluation");
		mapping.add("评价:trainComment");
		mapping.add("评价时间:commentTime");
		
		HSSFWorkbook book = ExcelUtil.export(rs, mapping);
		ServletOutputStream out = res.getOutputStream();
	    book.write(out);
		out.close();
	}
	
	/**
	 * 未学习人员导出
	 * @param data  json 格式字符串
	 * lessonId
	 * personId
	 * personName
	 * nodeName
	 * 
	 * 
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("exportNolearn")
	public void exportNolearn(String data,HttpServletResponse res) throws Exception{
		res.setHeader("Content-Disposition", "attachment; filename=nolearn.xls");  
        res.setContentType("application/octet-stream; charset=utf-8");
		JSONObject args = JSONObject.parseObject(data);
		List<Map<String, Object>> rs = courseService.getNoLearn(args);
		if(rs.size() == 0) return;
		List<String> mapping = new ArrayList<>();
		
		mapping.add("课程名称:lessonName");
		mapping.add("员工编号:employeeNo");
		mapping.add("员工姓名:personName");
		mapping.add("所属部门:nodeName");
		
		HSSFWorkbook book = ExcelUtil.export(rs, mapping);
		ServletOutputStream out = res.getOutputStream();
	    book.write(out);
		out.close();
	}
	
	
	
	
	
	
}
