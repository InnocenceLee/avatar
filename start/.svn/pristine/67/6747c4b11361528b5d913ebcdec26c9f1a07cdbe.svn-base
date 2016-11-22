package com.rkjh.eschool.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.rkjh.common.util.ExcelUtil;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.entity.Error;
import com.rkjh.eschool.entity.Error4D2js;
import com.rkjh.eschool.service.LessonService;

/**
*@Title: LessonController.java
*@Description: 课时管理Controller 
*@author Yang yixuan
*@date 2016年7月2日 下午2:53:31
*@version V1.0
*/
@Controller
@RequestMapping("**/jv/lesson")
public class LessonController {
	
	@Autowired
	public LessonService lessonService;
	
	/**
	 * 根据课程id查询课时列表
	 * @param data json格式字符串
	 * id
	 * @return 课时列表
	 */
	@RequestMapping(value="/list",method=RequestMethod.GET)
	@ResponseBody
	public Object list(@RequestParam(value="data", required=true) String data){ 
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("查询失败");
			error.setTable("train_lesson");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSON.parseObject(data);
		List<Map<String, Object>> resultMap = lessonService.list(dataObj);
		return JSON.toJSONString(resultMap);
	}
	
	/**
	 * 根据课程id查询课时列表学员端
	 * @param data json 格式字符串
	 * id
	 * @return 课时列表
	 */
	@RequestMapping(value="/liststudent",method=RequestMethod.GET)
	@ResponseBody
	public Object listStudent(@RequestParam(value="data", required=true) String data){ 
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("查询失败");
			error.setTable("train_lesson");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSON.parseObject(data);
		List<Map<String, Object>> resultMap = lessonService.listStudent(dataObj);
		return JSON.toJSONString(resultMap);
	}
	
	/**
	 * 课时名字列表（下拉选择列表）
	 * @param 课程id
	 * @return 课时列表
	 */
	@RequestMapping(value="/listname",method=RequestMethod.GET)
	@ResponseBody
	public Object listName(int id){ 
			List<Map<String, Object>> resultMap = lessonService.listName(id);
			return JSON.toJSONString(resultMap);
	}

	/**
	 * 查询课时详情
	 * @param 课时id
	 * @return 课时
	 */
	@RequestMapping(value="/detail",method=RequestMethod.GET)
	@ResponseBody
	public Object detail(@RequestParam(value="id", required=true) int id){
		List<Map<String, Object>> resultMap = lessonService.detail(id);
		return JSON.toJSONString(resultMap);
	}
	
	/**
	 * 根据课程id和学习计划id查询学习记录
	 * @param id 课程id和学习计划id
	 * @return 学习记录
	 */
	@RequestMapping(value="/learnlog",method=RequestMethod.GET)
	@ResponseBody
	public Object learnLog(@RequestParam(value="data", required=true) String data){
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("查询失败");
			error.setTable("train_student_learn_course");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSONObject.parseObject(data);
		List<Map<String, Object>> resultMap = lessonService.learnLog(dataObj);
		return JSON.toJSONString(resultMap);
	}
	
	/**
	 * 学习人员
	 * @param data
	 * @return
	 */
	@RequestMapping(value="/learnPerson",method=RequestMethod.GET)
	@ResponseBody
	public Object learnPerson(@RequestParam(value="data", required=true) String data){
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("查询失败");
			error.setTable("train_student_learn_course");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSONObject.parseObject(data);
		List<Map<String, Object>> resultMap = lessonService.learnPerson(dataObj);
		return JSON.toJSONString(resultMap);
	}
	
	/**
	 * 根据课时id查询课时
	 * @return 课时
	 */
	@RequestMapping(value="/lesson",method=RequestMethod.GET)
	@ResponseBody
	public Object lesson(@RequestParam(value="id", required=true) int id){
		Map<String, Object> result = lessonService.lesson(id);
		return JSON.toJSONString(result);
	}
	
	
	/**
	 * 根据课时id查询课时
	 * @return 课时
	 */
	@RequestMapping(value="/lessonbi",method=RequestMethod.GET)
	public ModelAndView lessonById(@RequestParam(value="id", required=true) int id){
		Map<String, Object> result = lessonService.lesson(id);
		// 课件信息
		List<Map<String,Object>> courseWare = lessonService.getCourseWare(id);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("data", result);
		mav.addObject("courseWare", courseWare);
		mav.setViewName("lessonDetail");
		return mav;
	}
	
	/**
	 * 根据学习计划课时id查询课时
	 * @return 课时
	 */
	@RequestMapping(value="/lessonlearn",method=RequestMethod.GET)
	public ModelAndView lesson4Learn(@RequestParam(value="planId", required=true) int planId,
			@RequestParam(value="courseId", required=true) int courseId,
			@RequestParam(value="lessonId", required=true) int lessonId){
		Map<String, Object> result = lessonService.lesson(lessonId);
		ModelAndView mav = new ModelAndView();
		result.put("planId", planId);
		result.put("courseId", courseId);
		// 课件信息
		List<Map<String,Object>> courseWare = lessonService.getCourseWare(lessonId);
		result.put("courseWare", courseWare);
		
		mav.addObject("data", result);
		mav.setViewName("learnLessonDetail");
		return mav;
	}
	
	/**
	 * 统计平均学习时间分布图
	 * @param data 学习计划Id&课程id(json 格式字符串)
	 * trainCourseLesson 
	 * trainPlan
	 * @return 统计平均学习时间分布图
	 */
	@RequestMapping(value="/statisticlearntime",method=RequestMethod.GET)
	@ResponseBody
	public Object statisticLearnTime(@RequestParam(value="data", required=true) String data){
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("查询统计平均学习时间分布图失败");
			error.setTable("train_student_learn_course");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSONObject.parseObject(data);
		Map<String, Object> resultMap = lessonService.statisticLearnTime(dataObj);
		return JSON.toJSONString(resultMap);
	}
	
	/**
	 * 统计星级评价树状图
	 * @param data 学习计划Id&课程id
	 * trainCourseLesson
	 * trainPlan
	 * 
	 * @return 统计星级评价树状图
	 */
	@RequestMapping(value="/statisticlearnevaluation",method=RequestMethod.GET)
	@ResponseBody
	public Object statisticLearnEvaluation(@RequestParam(value="data", required=true) String data){
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("查询统计星级评价树状图失败");
			error.setTable("train_student_progress");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSONObject.parseObject(data);
		Map<String, Object> resultMap = lessonService.statisticLearnEvaluation(dataObj);
		return JSON.toJSONString(resultMap);
	}
	
	/**
	 * 统计部门人员分布
	 * @param data 学习计划Id&课程id
	 * trainCourseLesson
	 * trainPlan
	 * @return 统计部门人员分布
	 */
	@RequestMapping(value="/statisticlearnnode",method=RequestMethod.GET)
	@ResponseBody
	public Object statisticLearnNode(@RequestParam(value="data", required=true) String data){
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("查询统计部门人员分布失败");
			error.setTable("person");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSONObject.parseObject(data);
		List<Map<String, Object>> resultMap = lessonService.statisticLearnNode(dataObj);
		return JSON.toJSONString(resultMap);
	}
	
	/**
	 * 课程学习 导出
	 * @param data
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("exportLearn")
	public void exportPerson(String data,HttpServletResponse res) throws Exception{
		res.setHeader("Content-Disposition", "attachment; filename=learn.xls");  
        res.setContentType("application/octet-stream; charset=utf-8");
		JSONObject args = JSONObject.parseObject(data);
		List<Map<String, Object>> rs = lessonService.getLearnPerson(args);
		if(rs.size() == 0) return;
		List<String> mapping = new ArrayList<>();
		String opt = args.get("opt") + "";
		if("person".equals(opt)){
			mapping.add("课时名称:lessonName");
			mapping.add("员工编号:personId");
			mapping.add("员工姓名:personName");
			mapping.add("所属部门:nodeName");
		}else if("record".equals(opt)){
			mapping.add("课时名称:lessonName");
			mapping.add("员工编号:personId");
			mapping.add("员工姓名:personName");
			mapping.add("所属部门:nodeName");
			mapping.add("开始时间:progress_start");
			mapping.add("结束时间:progress_end");
			mapping.add("学习时长:trainTime");
		}
		HSSFWorkbook book = ExcelUtil.export(rs, mapping);
		ServletOutputStream out = res.getOutputStream();
	    book.write(out);
		out.close();
	}
	
	/**
	 * 学习人员导出
	 * @param data
	 * @param res
	 * @throws Exception
	 */
	@RequestMapping("exportPerson")
	public void exportLearnPerson(String data,HttpServletResponse res) throws Exception{
		res.setHeader("Content-Disposition", "attachment; filename=learn.xls");  
        res.setContentType("application/octet-stream; charset=utf-8");
		JSONObject args = JSONObject.parseObject(data);
		List<Map<String, Object>> rs = lessonService.exportLearnPerson(args);
		if(rs.size() == 0) return;
		List<String> mapping = new ArrayList<>();

			mapping.add("课程名称:lessonName");
			mapping.add("员工编号:personId");
			mapping.add("员工姓名:personName");
			mapping.add("所属部门:nodeName");
		HSSFWorkbook book = ExcelUtil.export(rs, mapping);
		ServletOutputStream out = res.getOutputStream();
	    book.write(out);
		out.close();
	}
	
	
	
//	
}
