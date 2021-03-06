package com.rkjh.eschool.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.rkjh.common.exceptions.BusinessException;
import com.rkjh.common.util.LogUtil;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.entity.Data4D2js;
import com.rkjh.eschool.entity.Error;
import com.rkjh.eschool.entity.Error4D2js;
import com.rkjh.eschool.service.GroupService;

import jxl.Sheet;
import jxl.Workbook;

/**
*@Title: NotifyController.java
*@Description: 公告管理Controller 
*@author rkjh
*@date 2016年6月28日 下午1:47:31
*@version V1.0
*/
@Controller
@RequestMapping("**/jv/group")
public class GroupController {

	/**
	 * 公告Service
	 */
	@Autowired
	public GroupService groupService;
	
	/**
	 * 
	 * @param name
	 * @param persons
	 * @param request
	 * @return
	 * @throws Exception
	 * http://localhost:8080/start/jv/group/add.do?name=测试&persons=1,2
	 */
	@RequestMapping(value="/add",method=RequestMethod.POST)
	@ResponseBody
	public Object add(
			@RequestParam(value="name") String name,
			@RequestParam(value="persons") int[] persons,HttpServletRequest request) throws Exception{
		try{
			if(persons.length == 0){
				throw new Exception("分组人员不能为空");
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("name", name);
			map.put("persons", persons);
			HttpSession session =  request.getSession();
			Map<String, Object> sessionUser = (Map)session.getAttribute("user");
			JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
			map.put("belong", sessionJson.getJSONObject("person").getInteger("id"));
			// 新增
			int result = groupService.add(map);
			if(result == CodeEnum.ERROR_CODE_N1){
				Error error = new Error();
				error.setMessage("新增分组失败");
				error.setTable("knowledge_point");
				return JSON.toJSONString(new Error4D2js(error));
			}
			return JSON.toJSONString(Data4D2js.SUCCESS);
		} catch(Exception e){
			LogUtil.e("分组新增失败");
			LogUtil.i("分组新增失败");
			throw new BusinessException("新增失败" + e.getMessage());
		}
	}
	
	/**
	 * 
	 * @param ids
	 * @return
	 * @throws Exception
	 * http://localhost:8080/start/jv/group/dels.do?ids=1,2,3
	 */
	@RequestMapping(value="/dels",method=RequestMethod.POST)
	@ResponseBody
	public Object dels(@RequestParam(value="ids", required=true) int[] ids) throws Exception{
		try{
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("ids", ids);
			int result = groupService.dels(map);
			if(result == CodeEnum.ERROR_CODE_N1){
				Error error = new Error();
				error.setMessage("删除分组失败");
				error.setTable("knowledge_point");
				return JSON.toJSONString(new Error4D2js(error));
			}
			return JSON.toJSONString(Data4D2js.SUCCESS);
		} catch(Exception e){
			LogUtil.e("分组删除失败");
			LogUtil.i("分组删除失败");
			throw new BusinessException("分组删除失败");
		}
	}
	
	
	/**
	 * 根据创建者查询分组
	 * @return 公告列表
	 * @throws Exception 查询失败
	 * http://localhost:8080/start/jsp/jv/group/listByBelong.do
	 */
	@RequestMapping(value="/listByBelong",method=RequestMethod.GET)
	@ResponseBody
	public Object listByBelong(HttpServletRequest request) throws Exception{
		try{
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("belong", 1);
			HttpSession session =  request.getSession();
			Map<String, Object> sessionUser = (Map)session.getAttribute("user");
			JSONObject sessionJson = JSONObject.parseObject(JSON.toJSONString(sessionUser));
			map.put("belong", sessionJson.getJSONObject("person").getInteger("id"));
			Map<String, Object> resultMaps = groupService.listByBelong(map);
			return JSON.toJSONString(resultMaps);
		} catch(Exception e){
			LogUtil.e("分组查询失败");
			LogUtil.i("分组查询失败");
			throw new BusinessException("分组查询失败"+e);
		}
	}
	
	/**
	 * 根据分组名称得到用户
	 * @param names
	 * @return
	 * @throws Exception
	 * http://localhost:8080/start/jsp/jv/group/listPersonByGroup.do?names=测试1,测试
	 */
	@RequestMapping(value="/listPersonByGroup",method=RequestMethod.GET)
	@ResponseBody
	public Object listPersonByGroup(
			@RequestParam(value="names") String[] names) throws Exception{
		try{
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("names", names);
			Map<String, Object> resultMaps = groupService.listPersonByGroup(map);
			return JSON.toJSONString(resultMaps);
		} catch(Exception e){
			LogUtil.e("分组查询失败");
			LogUtil.i("分组查询失败");
			throw new BusinessException("分组查询失败"+e);
		}
	}
	@RequestMapping(value="/GetPersonByNodes",method=RequestMethod.GET)
	@ResponseBody
	public Object GetPersonByNodes(@RequestParam(value="inNodes") String[] inNodes,
			String employeeNo,
			String level,
			String cheakusername,
			String cabinCrewInspector,
			String no_state,
			String cabinCrew,
			String bClassTeacher,
			String longFlightInstructor,
			String internationalQualificationTraining,
			String threeHundredQualification,
			String boutique,
			String Announcer,
			String Lhasa,
			String specialCharter,
			String cadre,
			String teacher,
			String foreman){

		List<Map<String, Object>> resultMaps = groupService.GetPersonByNodes(inNodes, employeeNo,
				 level,
				 cheakusername,
				 cabinCrewInspector,
				 no_state,
				 cabinCrew,
				 bClassTeacher,
				 longFlightInstructor,
				 internationalQualificationTraining,
				 threeHundredQualification,
				 boutique,
				 Announcer,
				 Lhasa,
				 specialCharter,
				 cadre,
				 teacher,
				 foreman);
		return JSON.toJSONString(resultMaps);
	}
	
}
