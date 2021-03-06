package com.rkjh.eschool.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.swing.JOptionPane;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.rkjh.common.util.ArrayUtil;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.constant.NodeSql;
import com.rkjh.eschool.entity.Data4D2js;
import com.rkjh.eschool.entity.Error;
import com.rkjh.eschool.entity.Error4D2js;
import com.rkjh.eschool.service.ExamBaseService;
import com.rkjh.eschool.service.ExamPaperService;
import com.rkjh.eschool.service.ExamService;
import com.rkjh.eschool.service.SystemParameterService;

/**
 * @Title: ExamController.java
 * @Description: 考试Controller
 * @Author: Yang yixuan
 * @Create Date: 2016年7月20日下午6:23:51
 * @Version: V1.00
 */
@Controller
@RequestMapping("**/jv/exam")
public class ExamController {

	/**
	 * 考试BaseService
	 */
	
	@Autowired
	public ExamBaseService examBaseService;
	@Autowired
	public ExamPaperService examPaperService;
	/**
	 * 考试Service
	 */
	@Autowired
	public ExamService examService;

	/**
	 * 根据考试计划id查询考试计划列表
	 * 
	 * @return 考试计划列表
	 * 
	 * @param json
	 *            格式字符串 name 计划名称 paid 考试计划id
	 * 
	 */
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public Object list(@RequestParam(value = "data", required = true) String data, HttpServletRequest request) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("查询失败");
			error.setTable("exam_plan");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject dataObj = JSON.parseObject(data);
		// 新增视野查询 2016-8-23 yangyixuan start
		try {
			String nodeSql = "";
			if(dataObj.get("formalExam")!=null){
				nodeSql = "with nd as (with recursive t as (select *, 1 lv, name::varchar(2000) path from node where id = 0 union select d.*, t.lv + 1, (t.path || d.name) :: varchar(2000) from node d, t where d.parent_id = t.id  and d.type in ('OFFICE','COMPANY','ROOT','DEPT','EXAM_PLAN') ) select id, name, parent_id, type, lv, path from t order by path)";
			}else{
				nodeSql = NodeSql.getNodeSql(request.getSession(), "EXAM_PLAN");
			}
			
			dataObj.put("nodeSql", nodeSql);
		} catch (Exception e) {
			Error error = new Error();
			error.setMessage("获取视野失败");
			error.setTable("exam_plan");
			return JSON.toJSONString(new Error4D2js(error));
		}
		// 新增视野查询 2016-8-23 yangyixuan end
		List<Map<String, Object>> result = examService.list(dataObj);
		return JSON.toJSONString(result);
	}
	


	@RequestMapping("/examList")
	@ResponseBody
	public Map<String, Object> examList(Integer examPlanId) {
		Map<String, Object> rs = new HashMap<>();
		if (examPlanId == null) {
			rs.put("msg", "非法参数");
			return rs;
		}
		Map<String, Object> param = new HashMap<>();
		List<Map<String, Object>> list = examService.examList(param);
		rs.put("data", list);
		return rs;

	}
	
	/**
	 * 获取考试须知
	 * @param examPlanId
	 * @return
	 */
	@RequestMapping(value="/examNotic",method = RequestMethod.POST)
	@ResponseBody
	public String examNotic(Integer examPlanId) {
		Map<String, Object> rs = new HashMap<>();
		if (examPlanId == null) {
			rs.put("msg", "非法参数");
			return JSON.toJSONString(rs);
		}
		String Notic  = examService.examNotic(examPlanId);
		rs.put("data", Notic);
		return JSON.toJSONString(rs);

	}
	
	/**
	 * 导出成绩
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="ajaxExport.do",method={RequestMethod.GET,RequestMethod.POST})
	public  String  ajaxUploadExcel(HttpServletRequest request,HttpServletResponse response,String type,int id,String name) throws Exception {    // 声明一个工作薄
        
		String excileName="" ;
		OutputStream out = null;
		if("all".equals(type)){
			excileName = name+ "全部成绩";
		}
	   if("top".equals(type)){
		   excileName = name+ "最高分成绩";
		}
	   if("pass".equals(type)){
		   excileName = name+ "及格成绩";
	   }
	   System.out.println(excileName);
		List<Map<String, Object>>ddd =   examService.excellist(id,type);
//		for(int i = 0; i < ddd.size();i++){
//			System.out.println(ddd.get(i).get("usernumber")+"");
//		}
//		
		HSSFWorkbook wb = new HSSFWorkbook();
        //声明一个单子并命名
        HSSFSheet sheet = wb.createSheet(excileName);
        //给单子名称一个长度
        sheet.setDefaultColumnWidth((short)15);
        // 生成一个样式  
        HSSFCellStyle style = wb.createCellStyle();
        style.setBorderBottom(CellStyle.BORDER_THIN); //下边框
        style.setBorderLeft(CellStyle.BORDER_THIN);//左边框
        style.setBorderTop(CellStyle.BORDER_THIN);//上边框
        style.setBorderRight(CellStyle.BORDER_THIN);//右边框

        style.setAlignment(CellStyle.ALIGN_CENTER); // 居中 
        //创建第一行（也可以称为表头）
        HSSFRow row = sheet.createRow(0);
        //样式字体居中
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        //给表头第一行一次创建单元格
        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("员工编号"); 
        cell.setCellStyle(style);
        cell = row.createCell( (short) 1);  
        cell.setCellValue("员工姓名");  
        cell.setCellStyle(style);  
        cell = row.createCell((short) 2);  
        cell.setCellValue("所属部门");  
        cell.setCellStyle(style); 
        cell = row.createCell((short) 3);  
        cell.setCellValue("开考时间");  
        cell.setCellStyle(style); 
        cell = row.createCell((short) 4 );  
        cell.setCellValue("交卷时间");  
        cell.setCellStyle(style); 
        cell = row.createCell((short) 5);  
        cell.setCellValue("员工得分");  
        cell.setCellStyle(style); 
               //向单元格里填充数据
           for (int i = 0; i < ddd.size(); i++) {
                row = sheet.createRow(i + 1);
                row.createCell(0).setCellValue(ddd.get(i).get("usernumber")+"");
                row.createCell(1).setCellValue(ddd.get(i).get("person_name")+"");
                row.createCell(2).setCellValue(ddd.get(i).get("depat_name")+"");
                row.createCell(3).setCellValue(ddd.get(i).get("exam_start")+"");
                row.createCell(4).setCellValue(ddd.get(i).get("exam_end")+"");
                row.createCell(5).setCellValue(ddd.get(i).get("exam_score")+"");
                row.getCell(0).setCellStyle(style);
                row.getCell(1).setCellStyle(style);
                row.getCell(2).setCellStyle(style);
                row.getCell(3).setCellStyle(style);
                row.getCell(4).setCellStyle(style);
                row.getCell(5).setCellStyle(style);
                
            }
         
           try {
            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-disposition", "attachment;filename="+ URLEncoder.encode(excileName+".xls", "utf-8"));
            out = response.getOutputStream();
            wb.write(out);
           

        } catch (FileNotFoundException e) {
            
            e.printStackTrace();
        } catch (IOException e) {
           
            e.printStackTrace();
        }finally{
        	 out.flush();
             out.close();
        	
        }
       return null;       
	}


	/**
	 * 修改考试计划
	 * 
	 * @param String
	 *            考试计划
	 * @return 成功/失败
	 * 
	 * @param data
	 *            json格式字符串 examPaperContent 试卷内容 examScore 分数 student 学生 state
	 *            状态 examStart 开始时间 examEnd 结束时间 mode 考试模式 examNumEnd
	 * 
	 */
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseBody
	public Object update(@RequestParam(value = "data", required = true) String data, HttpServletRequest request) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("修改考试失败");
			error.setTable("exam_plan");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject obj = JSONObject.parseObject(data);
		// 新增视野查询 2016-8-30 yangyixuan start
		try {
			String nodeSql = NodeSql.getNodeSql(request.getSession(), "EXAM_PLAN");
			obj.put("nodeSql", nodeSql);
		} catch (Exception e) {
			Error error = new Error();
			error.setMessage("获取视野失败");
			error.setTable("exam_plan");
			return JSON.toJSONString(new Error4D2js(error));
		}
		// 新增视野查询 2016-8-30 yangyixuan end
		int result = examBaseService.update(obj);
		if (result != CodeEnum.SUCCESS_CODE_0) {
			Error error = new Error();
			error.setMessage("修改考试失败");
			error.setTable("exam_plan");
			return JSON.toJSONString(new Error4D2js(error));
		}
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}

	/**
	 * 新增考试计划
	 * 
	 * @param data 考试计划   json 格式字符串
	 * examPaperContent 试卷内容
	 * passScore 通过分数
	 * examPlan 计划id
	 * student  学员id
	 * examStart 考试开始时间
	 * state 状态
	 * examEnd 考试结束时间
	 * examMode 考试模式
	 * 
	 * @return 成功/失败
	 * 
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	@ResponseBody
	public Object add(@RequestParam(value = "data", required = true) String data, HttpServletRequest request) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("新增考试失败");
			error.setTable("exam_plan");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject obj = JSONObject.parseObject(data);
		HttpSession session = request.getSession();
		Map<String, Object> sessionUser = (Map) session.getAttribute("user");
		JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
		obj.put("node", sessionJson.getJSONObject("node").getInteger("id"));
		// 新增视野查询 2016-8-23 yangyixuan start
		try {
			String nodeSql = NodeSql.getNodeSql(request.getSession(), "EXAM_PLAN");
			obj.put("nodeSql", nodeSql);
		} catch (Exception e) {
			Error error = new Error();
			error.setMessage("获取视野失败");
			error.setTable("exam_plan");
			return JSON.toJSONString(new Error4D2js(error));
		}
		int result = examBaseService.add(obj);
		if (result != CodeEnum.SUCCESS_CODE_0) {
			Error error = new Error();
			error.setMessage("新增考试失败");
			error.setTable("exam_plan");
			return JSON.toJSONString(new Error4D2js(error));
		}
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}

	/**
	 * 新增考试计划
	 * 
	 * @param data 考试计划 json 格式字符串
	 * name  计划名称
	 * duration 时间
	 * paperMode 试卷模式
	 * examAnswerPublish  发布方式
	 * examNotice 
	 * examPaper试卷
	 * students 学生
	 * examStart 开始时间
	 * randomOrder  是否乱序
	 * passScore 通过分数
	 * examEnd 结束时间
	 * examType 考试类型
	 * examNum  考试次数
	 * node 部门
	 * 
	 * 
	 * @return 成功/失败
	 */
	@RequestMapping(value = "/lessonadd", method = RequestMethod.POST)
	@ResponseBody
	public Object lessonAdd(@RequestParam(value = "data", required = true) String data) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("新增考试失败");
			error.setTable("exam_plan");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject obj = JSONObject.parseObject(data);
		int result = examBaseService.add(obj);
		if (result != CodeEnum.SUCCESS_CODE_0) {
			Error error = new Error();
			error.setMessage("新增考试失败");
			error.setTable("exam_plan");
			obj.put("error", error);
			return JSON.toJSONString(obj);
		}
		obj.put("success", true);
		return JSON.toJSONString(obj);
	}

	/**
	 * 删除考试计划
	 * 
	 * @param data  考试计划 json格式字符串
	 * examPlan[]  计划ids
	 * 
	 * 
	 * @return 成功/失败
	 */
	@RequestMapping(value = "/del", method = RequestMethod.POST)
	@ResponseBody
	public Object del(@RequestParam(value = "data", required = true) String data) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("删除考试失败");
			error.setTable("exam_plan");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject obj = JSONObject.parseObject(data);
		if (ArrayUtil.isEmpty4JSONArray(obj.getJSONArray("examPlan"))) {
			Error error = new Error();
			error.setMessage("删除考试失败，没有考试信息");
			error.setTable("exam_plan");
			return JSON.toJSONString(new Error4D2js(error));
		}
		int result = examBaseService.del(obj);
		if (result != CodeEnum.SUCCESS_CODE_0) {
			Error error = new Error();
			error.setMessage("删除考试计划失败");
			error.setTable("exam_plan");
			return JSON.toJSONString(new Error4D2js(error));
		}
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}

	/**
	 * 新增课程时删除考试计划
	 * 
	 * @param data 考试计划 json 格式字符串
	 * examPlan[] 计划id
	 * 
	 * @return 成功/失败
	 */
	@RequestMapping(value = "/delbycourse", method = RequestMethod.POST)
	@ResponseBody
	public Object del4course(@RequestParam(value = "data", required = true) String data) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("新增考试失败");
			error.setTable("exam_plan");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject obj = JSONObject.parseObject(data);
		int result = examBaseService.del4course(obj);
		if (result != CodeEnum.SUCCESS_CODE_0) {
			Error error = new Error();
			error.setMessage("删除课时失败！");
			error.setTable("exam_plan");
			return JSON.toJSONString(new Error4D2js(error));
		}
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}

	/**
	 * 根据考试计划id查询考试计划详情
	 * 
	 * @param id 考试计划id
	 * @return 考试计划详情
	 */
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	public ModelAndView examDetail(@RequestParam(value = "id", required = true) int id) {
		Map<String, Object> resultMap = examService.examDetail(id);
		ModelAndView mav = new ModelAndView();
		mav.addObject("data", resultMap);
		mav.setViewName("examDetail");
		return mav;
	}

	/**
	 * 根据考试计划id查询考试计划详情
	 * 
	 * @param id
	 *            考试计划id
	 * @return 考试计划详情
	 */
	@RequestMapping(value = "/courseDetail", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> courseDetail(@RequestParam(value = "id", required = true) int id) {
		Map<String, Object> resultMap = examService.detail4LessonExam(id);
		return resultMap;
	}

	/**
	 * 根据考试计划id查询考试计划详情员工端
	 * 
	 * @param id
	 *            考试计划id
	 * @return 考试计划详情
	 */
	@RequestMapping(value = "/detailstudent", method = RequestMethod.GET)
	public ModelAndView examDetail4Student(@RequestParam(value = "id", required = true) int id) {
		Map<String, Object> resultMap = examService.examDetail(id);
		ModelAndView mav = new ModelAndView();
		mav.addObject("data", resultMap);
		mav.setViewName("examDetail");
		return mav;
	}

	/**
	 * 根据考试计划id查询考试计划详情修改页面
	 * 
	 * @param id
	 *            考试计划id
	 * @return 考试计划详情
	 */
	@RequestMapping(value = "/detailupdate", method = RequestMethod.GET)
	public ModelAndView examDetail4Update(@RequestParam(value = "id", required = true) int id) {
		Map<String, Object> resultMap = examService.examDetail(id);
		ModelAndView mav = new ModelAndView();
		mav.addObject("data", resultMap);
		mav.setViewName("examUpdate");
		return mav;
	}

	/**
	 * 根据学员id查询考试列表
	 * 
	 * @param name
	 *            考试计划名
	 * @return 考试列表
	 */
	@RequestMapping(value = "/liststudent", method = RequestMethod.GET)
	@ResponseBody
	public Object list4Student(@RequestParam(value = "name", required = false) String name,
			HttpServletRequest request) {
		Map<String, Object> data = new HashMap<String, Object>();
		HttpSession session = request.getSession();
		Map<String, Object> sessionUser = (Map) session.getAttribute("user");
		JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
		data.put("id", sessionJson.getJSONObject("person").getInteger("id"));

		if (!StringUtil.isEmpty(name)) {
			data.put("name", name);
		}
		List<Map<String, Object>> result = examService.list4Student(data);
		return result;
	}

	/**
	 * 根据考试id查询试卷信息
	 * 
	 * @param id
	 *            考试id
	 * @return 试卷信息查看成绩
	 */
	@RequestMapping(value = "/exampapercontent", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> examPaperContent(@RequestParam(value = "id", required = true) int id) {
		Map<String, Object> resultMap = examService.examPaperContent(id);
		return resultMap;
	}

	/**
	 * 根据考试id查询试卷信息(员工端)
	 * 
	 * @param id
	 * @return 试卷信息考试页面
	 */
	@RequestMapping(value = "/examPaperContentanswer", method = RequestMethod.GET)
	public ModelAndView examPaperContentAnswer(@RequestParam(value = "id", required = true) int id) {
		Map<String, Object> resultMap = examService.examPaperContent(id);
		ModelAndView mav = new ModelAndView();
		mav.addObject("data", resultMap);
		mav.setViewName("examPaperDetail");
		return mav;
	}

	/**
	 * 根据考试计划id&学员列表查询参考人员列表信息
	 * 
	 * @param data 查询条件 json格式字符串
	 * personId 人员id
	 * planId 计划id
	 * state 状态
	 * students 学员
	 * personName 人员名称
	 * nodeName 部门
	 * 
	 * @return 参考人员列表信息
	 */
	@RequestMapping(value = "/examperson", method = RequestMethod.GET)
	@ResponseBody
	public Object examPerson(@RequestParam(value = "data", required = true) String data) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("新增考试失败");
			error.setTable("exam");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject obj = JSONObject.parseObject(data);
		List<Map<String, Object>> result = examService.examPerson(obj);
		return JSON.toJSONString(result);
	}

	/**
	 * 考试答题交卷
	 * 
	 * @param data 试卷信息 json格式字符串
	 * studentId 学员id
	 * examPlanId 计划id
	 * examId 考试id 
	 * questions 答题内容
	 * 
	 * @return 成功/失败
	 */
	@RequestMapping(value = "/examperson", method = RequestMethod.POST)
	@ResponseBody
	public Object Answer(@RequestParam(value = "data", required = true) String data, HttpServletRequest request) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("考试答题交卷失败");
			error.setTable("exam");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject obj = JSONObject.parseObject(data);
		HttpSession session = request.getSession();
		Map<String, Object> sessionUser = (Map) session.getAttribute("user");
		JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
		obj.put("studentId", sessionJson.getJSONObject("person").getInteger("id"));
		int result = examBaseService.Answer(obj);
		if (result != CodeEnum.SUCCESS_CODE_0) {
			Error error = new Error();
			error.setMessage("考试答题交卷失败");
			error.setTable("exam");
			return JSON.toJSONString(new Error4D2js(error));
		}
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}

	/**
	 * 根据考试计划id 查询机构统计信息
	 * 
	 * @param id
	 *            考试计划id
	 * @return 机构统计信息(没有数据则返回null)
	 * 
	 *         返回结构说明： [ { nodeId : 部门id, nodeName : 部门名字, data : 统计表数据 { maxNum
	 *         : 最高分 minNum : 最低分 avgNum : 平均分 studentsNum : 应考人数 endNum : 已考人数
	 *         missNum : 未考人数 passNum : 及格人数 unPassNum : 不及格人数 } } ]
	 * 
	 */
	@RequestMapping(value = "/examnodestatistic", method = RequestMethod.GET)
	@ResponseBody
	public Object exam4NodeStatistic(@RequestParam(value = "id", required = true) int id) {
		List<Map<String, Object>> resultMap = examService.exam4NodeStatistic(id);
		return JSON.toJSONString(resultMap);
	}

	/**
	 * 根据考试计划id 查询各个分数段统计信息
	 * 
	 * @param id
	 *            考试计划id
	 * @return 各个分数段统计信息
	 * 
	 *         返回结构说明： { lessThirty : 30分以下的人 lessForty : 30到39分的人 lessFifty :
	 *         40到49分的人 lessSixty : 50到59分的人 lessSeventy : 60到69分的人 lessEighty :
	 *         70到79分的人 lessNinety : 80到89分的人 lessHundred : 90到99分的人
	 *         lessHundredTwenty : 100到120分的人 personNum : 总人数 }
	 */
	@RequestMapping(value = "/examscorestatistic", method = RequestMethod.GET)
	@ResponseBody
	public Object exam2ScoreStatistic(@RequestParam(value = "id", required = true) int id) {
		Map<String, Object> resultMap = examService.exam2ScoreStatistic(id);
		return JSON.toJSONString(resultMap);
	}

	/**
	 * 根据考试计划id 查询题型分布统计信息
	 * 
	 * @param id
	 *            考试计划id
	 * @return 题型分布统计信息
	 */
	@RequestMapping(value = "/examtypestatistic", method = RequestMethod.GET)
	@ResponseBody
	public Object exam2TypeStatistic(@RequestParam(value = "id", required = true) int id) {
		Map<String, Object> resultMap = examService.exam2TypeStatistic(id);
		return JSON.toJSONString(resultMap);
	}

	/**
	 * 根据考试id 判断还能否重考
	 * 
	 * @param eid
	 * @return
	 */
	@RequestMapping("/reExamAble")
	@ResponseBody
	public Map<String, Object> reExamAble(@RequestParam(value = "eid", required = true) int eid) {
		Map<String, Object> rs = examService.reExamAble(eid);
		return rs;
	}

}
