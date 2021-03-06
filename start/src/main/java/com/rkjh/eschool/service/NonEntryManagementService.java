package com.rkjh.eschool.service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.postgresql.util.PGobject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.rkjh.common.util.ArrayUtil;
import com.rkjh.common.util.ExceptionUtil;
import com.rkjh.common.util.PageUtil;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.constant.BusiEnum;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.dao.NonEntryManagementDao;

/**
 * @Title: NonEntryManagementService.java
 * @Description: 未入职人员管理Service
 * @author Yang yixuan
 * @date 2016年6月29日 下午8:42:46
 * @version V1.0
 */
@Service
public class NonEntryManagementService {

	@Autowired
	public NonEntryManagementDao nonEntryManagementDao;

	/**
	 * 查询未入职人员列表
	 * 
	 * @param obj
	 *            查询条件
	 * @return 人员列表
	 */
	public List<Map<String, Object>> list(JSONObject obj) {
		PageUtil.getPage(obj);
		/*
		 * if(!StringUtil.isEmpty(obj.getString("name"))){ String name =
		 * obj.getString("name"); name = "%" + name + "%"; obj.put("name",
		 * name); } if(!StringUtil.isEmpty(obj.getString("nodeName"))){ String
		 * nodeName = obj.getString("nodeName"); nodeName = "%" + nodeName +
		 * "%"; obj.put("nodeName", nodeName); }
		 */
		if (StringUtil.isEmpty(obj.getString("personId"))) {
			obj.put("personId", null);
		} else {
			obj.put("personId", obj.getInteger("personId"));
		}
		List<Map<String, Object>> result = nonEntryManagementDao.list(obj);
		if (!ArrayUtil.isBlank4List(result)) {
			for (Map<String, Object> map : result) {
				String gender = (String) map.get("gender");
				if (StringUtil.equals(BusiEnum.PERSON_GENDER_F, gender)) {
					map.put("genderName", "女");
				} else if (StringUtil.equals(BusiEnum.PERSON_GENDER_M, gender)) {
					map.put("genderName", "男");
				}
				map.put("tag", map.get("tag") + "");

			}
			int totleNum = nonEntryManagementDao.count4List(obj);
			int size = obj.getInteger("size");
			totleNum = PageUtil.getTotleNum(totleNum, size);
			Map<String, Object> map = result.get(0);
			if (map != null) {
				map.put("totleNum", totleNum);
			}
		}
		return result;
	}

	/**
	 * 修改未入职人员信息
	 * 
	 * @param obj
	 *            人员信息
	 * @return 成功/失败
	 */
	@Transactional
	public int update(JSONObject obj) {
		Map<String, Object> objj = nonEntryManagementDao.getPersonById(obj
				.getInteger("id"));
		PGobject pGobject2 = (PGobject) objj.get("tag");
		JSONObject oldJObject;
		if (pGobject2 == null) {
			oldJObject = new JSONObject();
		} else {
			
			String pGobjectString = pGobject2.getValue();
			if(pGobjectString == null||pGobjectString.equals("null")){
				oldJObject = new JSONObject();
			}else{
			  oldJObject = JSONObject.parseObject(pGobjectString);
			}
		}
		System.out.println(obj + "");
		oldJObject.put("intentDepatment", obj.get("intentDepatment"));
		obj.put("tag", oldJObject);
		System.out.println(obj + "");
		int result = nonEntryManagementDao.update(obj);
		int employeeResult = nonEntryManagementDao.updateEmployee(obj);
		if (result != 1 || employeeResult != 1) {
			ExceptionUtil.throwBusinessException("修改为入职人员信息失败");
		}
		return CodeEnum.SUCCESS_CODE_0;
	}

	/**
	 * 新增未入职人员
	 * 
	 * @param obj
	 *            人员信息
	 * @return 成功/失败
	 */
	@Transactional
	public int add(JSONObject obj) {
		if(obj.get("employeeNo") == null){
			obj.put("employeeNo", 'O' + obj.getString("idCard"));
		}
		int personId = nonEntryManagementDao.add(obj);
		int nodeId = nonEntryManagementDao.findDefaultNodeId();
		int stationId = nonEntryManagementDao.findDefaultStationId();
		obj.put("personId", personId);
		obj.put("nodes", Arrays.asList(nodeId));
		obj.put("stationId", stationId);
		obj.put("stations", Arrays.asList(stationId));
		
		int employeeId = nonEntryManagementDao.addEmployee(obj);
		obj.put("employeeId", employeeId);
		System.out.println("新增人员的全部参数为：" + obj.toJSONString());
		nonEntryManagementDao.addEmployeeStation(obj);
		
		if (personId < 0 || employeeId < 0) {
			ExceptionUtil.throwBusinessException("新增未入职人员信息失败");
		}
		return CodeEnum.SUCCESS_CODE_0;
	}

	/**
	 * 删除人员
	 * 
	 * @param obj
	 *            人员id
	 * @return 成功/失败
	 */
	@Transactional
	public int del(JSONObject obj) {
		JSONArray arr = obj.getJSONArray("person");
		int result = nonEntryManagementDao.del(arr);
		if (result < 1) {
			ExceptionUtil.throwBusinessException("删除未入职人员信息失败");
		}
		return CodeEnum.SUCCESS_CODE_0;
	}

	public List<Map<String, Object>> listPersonByIds(Map<String, Object> map) {
		List<Map<String, Object>> resultList = nonEntryManagementDao
				.listPersonByIds(map);
		return resultList;
	}

	public List<Map<String, Object>> listPersonByNames(Map<String, Object> map) {
		List<Map<String, Object>> resultList = nonEntryManagementDao
				.listPersonByNames(map);
		return resultList;
	}

	public List<Map<String, Object>> getPersonByIds(Map<String, Object> param) {
		List<Map<String, Object>> resultList = nonEntryManagementDao
				.getPersonByIds(param);
		return resultList;
	}

	/**
	 * 导入未入职人员
	 * 
	 * @param obj
	 *            人员信息
	 * @return 成功/失败
	 */
//	@Transactional
//	public int add(Map<String, Object> obj) {
//		JSONObject jsonObj = (JSONObject) obj;
//		nonEntryManagementDao.add(jsonObj);
//		if (jsonObj.get("id") == null) {
//			ExceptionUtil.throwBusinessException("新增未入职人员信息失败");
//		}
//		return CodeEnum.SUCCESS_CODE_0;
//	}

}
