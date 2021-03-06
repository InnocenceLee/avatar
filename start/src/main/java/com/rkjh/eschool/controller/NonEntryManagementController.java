package com.rkjh.eschool.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.rkjh.common.util.ArrayUtil;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.constant.BusiEnum;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.entity.Data4D2js;
import com.rkjh.eschool.entity.Error;
import com.rkjh.eschool.entity.Error4D2js;
import com.rkjh.eschool.service.NonEntryManagementService;

import jxl.Sheet;
import jxl.Workbook;

/**
*@Title: NonEntryManagementController.java
*@Description: 未入职人员管理
*@author Yang yixuan
*@date 2016年6月29日 下午8:37:41
*@version V1.0
*/
@Controller
@RequestMapping("**/jv/nonentrymanagement")
public class NonEntryManagementController {
	
	/**
	 * 未入职人员Service
	 */
	@Autowired
	public NonEntryManagementService nonEntryManagementService;
	
	/**
	 * 查询未入职人员列表
	 * @param data 查询条件 json 格式字符串
	 * name 人员名称
	 * nodeName 部门名称
	 * personId 人员id
	 * @return 人员列表
	 */
	@RequestMapping(value="/list",method=RequestMethod.GET)
	@ResponseBody
	public Object find(@RequestParam(value="data", required=true) String data){
		if(StringUtil.isEmpty(data)){
			Error error = new Error();
			error.setMessage("查询未入职人员失败");
			error.setTable("person");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject obj = JSON.parseObject(data);
		List<Map<String, Object>> resultMap = nonEntryManagementService.list(obj);
		
		return JSON.toJSONString(resultMap);
	}
	
	/**
	 * 删除未入职人员信息
	 * 
	 * @param id 人员id json 格式字符串
	 * person
	 * @return 成功/失败
	 */
	@RequestMapping(value = "/del", method = RequestMethod.POST)
	@ResponseBody
	public Object del(String id) {
		if (StringUtil.isEmpty(id)) {
			return JSON.toJSONString("{error:'找不到删除人员'}");
		}
		JSONObject obj = JSON.parseObject(id);
		if(ArrayUtil.isEmpty4JSONArray(obj.getJSONArray("person"))){
			Error error = new Error();
			error.setMessage("没有删除人员");
			error.setTable("person");
			return JSON.toJSONString(new Error4D2js(error));
		}
		int result = nonEntryManagementService.del(obj);
		if(result != CodeEnum.SUCCESS_CODE_0){
			Error error = new Error();
			error.setMessage("删除未入职人员失败");
			error.setTable("person");
			return JSON.toJSONString(new Error4D2js(error));
		}
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}
	
	/**
	 * 新增未入职人员
	 * 
	 * @param String
	 * name
	 * gender
	 * idCard
	 * tag
	 *      
	 * @return String JSON
	 */
	@RequestMapping(value = "/add", method = RequestMethod.GET)
	@ResponseBody
	public String add(@RequestParam(value = "data", required = true) String data) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("未入职人员不能为空");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject obj = JSONObject.parseObject(data);
		
		System.out.println(">>>>>>>"+obj.toJSONString());
		// 添加信息
		int result = nonEntryManagementService.add(obj);
		if (result != CodeEnum.SUCCESS_CODE_0) {
			Error error = new Error();
			error.setMessage("新增未入职人员失败");
			return JSON.toJSONString(new Error4D2js(error));
		}

		return JSON.toJSONString(Data4D2js.SUCCESS);
	}
	
	/**
	 * 修改未入职人员
	 * 
	 * @param String data
	 * name
	 * gender
	 * idCard
	 * tag
	 * 
	 * @return String JSON
	 */
	@RequestMapping("/update")
	@ResponseBody
	public String update(@RequestParam(value = "data", required = true) String data) {
		if (StringUtil.isEmpty(data)) {
			Error error = new Error();
			error.setMessage("未入职人员不能为空");
			return JSON.toJSONString(new Error4D2js(error));
		}
		JSONObject obj = JSONObject.parseObject(data);
		int result = nonEntryManagementService.update(obj);
		if (result != CodeEnum.SUCCESS_CODE_0) {
			Error error = new Error();
			error.setMessage("修改内容失败");
			return JSON.toJSONString(new Error4D2js(error));
		}
		return JSON.toJSONString(Data4D2js.SUCCESS);
	}
	
	@RequestMapping(value="/listPersonsByIds",method=RequestMethod.POST)
	@ResponseBody
	public Object listPersonsByIds(@RequestParam(value="ids", required=true) String data){
		System.out.println("....................."+data);
		
		
//		JSONObject obj = JSON.parseObject(data);
//		System.out.println("....................."+obj.get("ids"));
		Map<String, Object> map = new HashMap<String, Object>();
		List<Integer> ids = new ArrayList<Integer>();
		String[] str = data.split(",");
		for(int i = 0; i < str.length; i++){
			ids.add(Integer.parseInt(str[i]));
		}
		map.put("ids", ids);
		return JSON.toJSONString(nonEntryManagementService.listPersonByIds(map));
	}
	
	
	/**
	 * 按编号导入
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 * http://localhost:8080/start/jsp/jv/nonentrymanagement/exportUserById.do
	 * 返回值：{"data":[{"nodename":"四川航空","name":"王英巧","id":3},{"nodename":"人事部","name":"马彬彬","id":2}]}
	 */
    @RequestMapping(value = "/exportUserById", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public Object exportUserById(Model model,HttpServletRequest request) throws Exception {
    	 MultipartHttpServletRequest mRequest = (MultipartHttpServletRequest) request;
         MultipartFile file = mRequest.getFile("file");
         Map<String, Object> resultData = new HashMap<String, Object>();
         if (file == null) {
        	 resultData.put("data", "");
             return JSON.toJSONString(resultData);
		}
		try {
			Workbook rwb = Workbook.getWorkbook(file.getInputStream());
			Sheet rs = rwb.getSheet(0);// 或者rwb.getSheet(0)
			int clos = rs.getColumns();// 得到所有的列
			int rows = rs.getRows();// 得到所有的行

			System.out.println(clos + " rows:" + rows);
			List<Integer> ids = new ArrayList<Integer>();
			for (int i = 0; i < rows; i++) {
				for (int j = 0; j < clos; j++) {
					// 第一个是列数，第二个是行数
					String id = rs.getCell(j++, i).getContents();
					if (StringUtils.isNotBlank(id)) {
						ids.add(Integer.parseInt(id));
					}
					System.out.println(id);
				}
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("ids", ids);
			resultData.put("data", nonEntryManagementService.listPersonByIds(map));
			return JSON.toJSONString(resultData);
		} catch (Exception e) {
			e.printStackTrace();
			resultData.put("data", "");
            return JSON.toJSONString(resultData);
		}
    }
    
	/**
	 * 按名称导入
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 * http://localhost:8080/start/jsp/jv/nonentrymanagement/exportUserByName.do
	 * 返回值：{"data":[{"nodename":"四川航空","name":"王英巧","id":3},{"nodename":"人事部","name":"马彬彬","id":2}]}
	 */
    @RequestMapping(value = "/exportUserByName", method = RequestMethod.POST)
    @ResponseBody
    public Object exportUserByName(Model model,HttpServletRequest request) throws Exception {
    	 MultipartHttpServletRequest mRequest = (MultipartHttpServletRequest) request;
         MultipartFile file = mRequest.getFile("file");
         Map<String, Object> resultData = new HashMap<String, Object>();
         if (file == null) {
        	 resultData.put("data", "");
             return JSON.toJSONString(resultData);
		}
		try {
			Workbook rwb = Workbook.getWorkbook(file.getInputStream());
			Sheet rs = rwb.getSheet(0);// 或者rwb.getSheet(0)
			int clos = rs.getColumns();// 得到所有的列
			int rows = rs.getRows();// 得到所有的行

			System.out.println(clos + " rows:" + rows);
			List<String> names = new ArrayList<String>();
			for (int i = 0; i < rows; i++) {
				for (int j = 0; j < clos; j++) {
					// 第一个是列数，第二个是行数
					String name = rs.getCell(j++, i).getContents();
					names.add(name);
					System.out.println(name);
				}
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("names", names);
			resultData.put("data", nonEntryManagementService.listPersonByNames(map));
			return JSON.toJSONString(resultData);
		} catch (Exception e) {
			e.printStackTrace();
			resultData.put("data", "");
            return JSON.toJSONString(resultData);
		}
    }
    
    /**
     * 获取person 信息
     * @param ids id集合
     * @return
     */
    @RequestMapping("/getPerson")
    @ResponseBody
    public List<Map<String, Object>> get(int[] ids){
    	Map<String, Object> args = new HashMap<>();
    	args.put("ids", ids);
    	return nonEntryManagementService.getPersonByIds(args);
    }
    
	/**
	 * 按名称查询
	 * @return
	 * @throws Exception
	 * http://localhost:8080/start/jsp/jv/nonentrymanagement/exportUserByNameString.do
	 * 返回值：{"data":[{"nodename":"四川航空","name":"王英巧","id":3},{"nodename":"人事部","name":"马彬彬","id":2}]}
	 */
    @RequestMapping(value = "/exportUserByNameString", method = RequestMethod.GET)
    @ResponseBody
    public Object exportUserByNameString(@RequestParam(value="data", required=true) String data
    		,HttpServletRequest request) throws Exception {
        Map<String, Object> resultData = new HashMap<String, Object>();
		try {
			if(StringUtil.isEmpty(data)){
				resultData.put("data", "");
				return JSON.toJSONString(resultData);
			}
			List<String> names = new ArrayList<String>();
			Map<String, Object> map = new HashMap<String, Object>();
			// 英文逗号
			int indexEComma = data.indexOf(",");
			if(indexEComma > 0){
				String[] namesEComma = data.split(",");
				for(int i = 0; i < namesEComma.length; ++i){
					names.add(namesEComma[i]);
				}
			} else {
				// 英文句号
				int indexEStop = data.indexOf(".");
				if(indexEStop > 0){
					String[] namesEStop = data.split(".");
					for(int i = 0; i < namesEStop.length; ++i){
						names.add(namesEStop[i]);
					}
				} else {
					// 中文逗号
					int indexCComma = data.indexOf("，");
					if(indexCComma > 0){
						String[] namesCComma = data.split("，");
						for(int i = 0; i < namesCComma.length; ++i){
							names.add(namesCComma[i]);
						}
					} else {
						// 中文句号
						int indexCStop = data.indexOf("。");
						if(indexCStop > 0){
							String[] namesCStop = data.split("。");
							for(int i = 0; i < namesCStop.length; ++i){
								names.add(namesCStop[i]);
							}
						}
					}
				}
			}

			if(names.size() < 1){
				map.put("names", data);
			} else {
				map.put("names", names);
			}
			resultData.put("data", nonEntryManagementService.listPersonByNames(map));
			return JSON.toJSONString(resultData);
		} catch (Exception e) {
			e.printStackTrace();
			resultData.put("data", "");
            return JSON.toJSONString(resultData);
		}
    }
    
	/**
	 * 按id查询
	 * @return
	 * @throws Exception
	 * http://localhost:8080/start/jsp/jv/nonentrymanagement/exportUserByIdString.do
	 * 返回值：{"data":[{"nodename":"四川航空","name":"王英巧","id":3},{"nodename":"人事部","name":"马彬彬","id":2}]}
	 */
    @RequestMapping(value = "/exportUserByIdString", method = RequestMethod.GET)
    @ResponseBody
    public Object exportUserByIdString(@RequestParam(value="data", required=true) String data
    		,HttpServletRequest request) throws Exception {
        Map<String, Object> resultData = new HashMap<String, Object>();
		try {
			if(StringUtil.isEmpty(data)){
				resultData.put("data", "");
				return JSON.toJSONString(resultData);
			}
			List<Integer> ids = new ArrayList<Integer>();
			Map<String, Object> map = new HashMap<String, Object>();
			// 英文逗号
			int indexEComma = data.indexOf(",");
			if(indexEComma > 0){
				String[] namesEComma = data.split(",");
				for(int i = 0; i < namesEComma.length; ++i){
					ids.add(Integer.parseInt(namesEComma[i]));
				}
			} else {
				// 英文句号
				int indexEStop = data.indexOf(".");
				if(indexEStop > 0){
					String[] namesEStop = data.split(".");
					for(int i = 0; i < namesEStop.length; ++i){
						ids.add(Integer.parseInt(namesEStop[i]));
					}
				} else {
					// 中文逗号
					int indexCComma = data.indexOf("，");
					if(indexCComma > 0){
						String[] namesCComma = data.split("，");
						for(int i = 0; i < namesCComma.length; ++i){
							ids.add(Integer.parseInt(namesCComma[i]));
						}
					} else {
						// 中文句号
						int indexCStop = data.indexOf("。");
						if(indexCStop > 0){
							String[] namesCStop = data.split("。");
							for(int i = 0; i < namesCStop.length; ++i){
								ids.add(Integer.parseInt(namesCStop[i]));
							}
						}
					}
				}
			}
			if(ids.size() < 1){
				resultData.put("data", "");
	            return JSON.toJSONString(resultData);
			} else {
				map.put("ids", ids);
			}
			resultData.put("data", nonEntryManagementService.listPersonByIds(map));
			return JSON.toJSONString(resultData);
		} catch (Exception e) {
			e.printStackTrace();
			resultData.put("data", "");
            return JSON.toJSONString(resultData);
		}
    }
	
	/**
	 * 非入职人员导入
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
    @RequestMapping(value = "/exportuserall", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public Object exportUserAll(Model model,HttpServletRequest request) throws Exception {
    	 MultipartHttpServletRequest mRequest = (MultipartHttpServletRequest) request;
         MultipartFile file = mRequest.getFile("file");
         List<Map<String, Object>> resultData = new ArrayList<Map<String, Object>>();
         if (file == null) {
        	Error error = new Error();
			error.setMessage("文件丢失");
			error.setTable("person");
			return JSON.toJSONString(new Error4D2js(error));
		}
		try {
			Workbook rwb = Workbook.getWorkbook(file.getInputStream());
			Sheet rs = rwb.getSheet(0);// 或者rwb.getSheet(0)
			int clos = rs.getColumns();// 得到所有的列
			int rows = rs.getRows();// 得到所有的行

			System.out.println(clos + " rows:" + rows);
			List<Map<String, Object>> personList = new ArrayList<Map<String, Object>>();
			for (int i = 1; i < rows; i++) {
				Map<String, Object> personMap = new HashMap<String, Object>();
				String name = rs.getCell(0,i).getContents();
				String gender = rs.getCell(1,i).getContents();
				String idCard = rs.getCell(2,i).getContents();
				String department = rs.getCell(3,i).getContents();
				if(StringUtil.isEmpty(name) || StringUtil.isEmpty(gender) || StringUtil.isEmpty(idCard)){
					Error error = new Error();
					error.setMessage("导入失败，请保证人员的名称、性别、身份证都存在。");
					error.setTable("person");
					return JSON.toJSONString(new Error4D2js(error));
				}
				personMap.put("name", name);
				if(StringUtil.equals("女", gender)){
					personMap.put("gender", BusiEnum.PERSON_GENDER_F);	
				} else if(StringUtil.equals("男", gender)){
					personMap.put("gender", BusiEnum.PERSON_GENDER_M);
				}
				personMap.put("idCard", idCard);
				JSONObject obj = JSON.parseObject("{\"intentDepatment\":\""+department+"\"}");
				
				personMap.put("tag", obj);
				personList.add(personMap);
			}
			for(Map<String, Object> map : personList){
				JSONObject obj = new JSONObject(map);
				int result = nonEntryManagementService.add(obj);
				if(result != CodeEnum.SUCCESS_CODE_0){
					Error error = new Error();
					error.setMessage("导入失败");
					error.setTable("person");
					return JSON.toJSONString(new Error4D2js(error));
				}
			}
			JSONObject obj = new JSONObject();
			obj.put("page", 1);
			obj.put("size", 10);
			resultData = nonEntryManagementService.list(obj);
			return JSON.toJSONString(resultData);
		} catch (Exception e) {
			e.printStackTrace();
			Error error = new Error();
			error.setMessage("导入失败");
			error.setTable("person");
			return JSON.toJSONString(new Error4D2js(error));
		}
    }
    
}
