package com.rkjh.eschool.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.rkjh.common.util.RandomCodeUtil;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.entity.Data4D2js;
import com.rkjh.eschool.entity.Error;
import com.rkjh.eschool.entity.Error4D2js;
import com.rkjh.eschool.service.SystemParameterBaseService;
import com.rkjh.eschool.service.SystemParameterService;

/**
* @Title: SystemParameterController.java
* @Description: 系统参数Controller
* @Author: Yang yixuan
* @Create Date: 2016年7月17日下午3:32:29
* @Version: V1.00
*/
@Controller
@RequestMapping("**/jv/systemparameter")
public class SystemParameterController {

	/**
	 * 系统参数Service
	 */
	@Autowired
	public SystemParameterService systemParameterService;
	
	/**
	 * 系统参数baseService
	 */
	@Autowired
	public SystemParameterBaseService systemParameterBaseService;
	
	/**
	 * 查询所有系统参数
	 * @return 系统参数
	 * http://localhost:8080/start/jsp/jv/systemparameter/list.do
	 */
	@RequestMapping(value="/list",method=RequestMethod.GET)
	public ModelAndView list(){
		Map<String, Object> resultMap = systemParameterService.list();
		ModelAndView mav = new ModelAndView();
		mav.addObject("data", resultMap);
		mav.setViewName("systemParameter");
		return mav;
	}

	/**
	 * 查询所有系统参数
	 * @return
	 */
	@RequestMapping(value="/listValue",method=RequestMethod.GET)
	@ResponseBody
	public Object listValue(){
		Map<String, Object> resultMap = systemParameterService.list();
		return JSON.toJSONString(resultMap);	
	}
	
	/**
	 * 查询所有系统参数
	 * @return
	 */
	@RequestMapping(value="/listValueavatar",method=RequestMethod.GET)
	@ResponseBody
	public Object listValueavatar(){
		Map<String, Object> resultMap = systemParameterService.list();
		return resultMap;	
	}
	/**
	 * 修改系统参数
	 * @param data 系统参数
	 * @return 成功/失败
	 */
	@RequestMapping(value="/update",method=RequestMethod.POST)
	@ResponseBody
	public Object update(@RequestParam(value="data", required=true) String data){
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("修改系统参数失败，系统参数信息不能为空");
			error.setTable("system_parameter");
			return JSON.toJSONString(new Error4D2js(error));
		}
		
		JSONObject obj = JSON.parseObject(data);
		int result = systemParameterBaseService.update(obj);
		if(result != CodeEnum.SUCCESS_CODE_0){
			Error error = new Error();
			error.setMessage("修改系统参数失败");
			error.setTable("system_parameter");
			return JSON.toJSONString(new Error4D2js(error));
		}
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}
	
	/**
	 * 查询所有系统参数
	 * @return 系统参数
	 */
	@RequestMapping(value="/findname",method=RequestMethod.GET)
	@ResponseBody
	public Object findByName(@RequestParam(value="name", required=true) String name){
		if(StringUtil.isEmpty(name)){
			Error error = new Error();
			error.setMessage("查询系统参数失败，参数名不能为空");
			error.setTable("system_parameter");
			return JSON.toJSONString(new Error4D2js(error));
		}
		Map<String, Object> result = systemParameterService.findByName(name);
		return JSON.toJSONString(result);
	}
	
	
	@RequestMapping(value="/generateCode")
	public void valiCode(HttpServletRequest req, HttpServletResponse resp) throws IOException{
		BufferedImage image = RandomCodeUtil.getImage(req);
		ImageIO.write(image, "jpg", resp.getOutputStream());
	}
	
	@RequestMapping(value="/valiCode")
	@ResponseBody
	public Map<String,String> valiCode(String inputCondeNum,HttpServletRequest req, HttpServletResponse resp) throws IOException{
		boolean pass = RandomCodeUtil.isPass(req, inputCondeNum);
		Map<String,String> rs = new HashMap<>();
		rs.put("result", pass ? "1" : "0");
		return rs;
	}
	
	
}
