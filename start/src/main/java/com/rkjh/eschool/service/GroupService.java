package com.rkjh.eschool.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rkjh.common.exceptions.BusinessException;
import com.rkjh.common.util.LogUtil;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.dao.GroupDao;

@Service
public class GroupService {
	
	@Autowired
	public GroupDao groupDao;
	
	public int add(Map<String, Object> map){
		groupDao.add(map);
		return  (map.get("id") == null) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	
	public int dels(Map<String, Object> map){
		//check是否被引用
		//查询试卷题库
		//查询课程题库
		//查询试题题库
		int result = groupDao.dels(map);
		return  (result <= 0) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	public Map<String, Object> listByBelong(Map<String, Object> map) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			List<Map<String, Object>> resultList = groupDao.list(map);
			resultMap.put("data", resultList);
		} catch (Exception e) {
			e.printStackTrace();
			LogUtil.e("分组查询失败");
			LogUtil.i("分组查询失败");
			throw new BusinessException("分组查询失败" + e);
		}
		return resultMap;
	}
	
	public Map<String, Object> listPersonByGroup(Map<String, Object> map) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			//获取人员ids
			List<Map<String, Object>> resultList = groupDao.list(map);
			List<Integer> personIds = new ArrayList<Integer>();
			for (Map<String, Object> result : resultList) {
				String[] persons = result.get("persons").toString().split(",");
				for (String person : persons) {
					personIds.add(Integer.parseInt(person));
				}
			}
			//获取人员详细信息
			map.put("ids", personIds);
			List<Map<String, Object>> personList = new ArrayList<Map<String, Object>>();
			int totalCount = 0;
			if(personIds.size() > 0){
				personList = groupDao.listPersonByIds(map);
				totalCount = groupDao.listPersonCountByIds(map);
			}
			resultMap.put("data", personList);
			resultMap.put("totalCount", totalCount);
		} catch (Exception e) {
			e.printStackTrace();
			LogUtil.e("公告查询失败");
			LogUtil.i("公告查询失败");
			throw new BusinessException("公告查询失败" + e);
		}
		return resultMap;
	}

	public Map<String, Object> listPersonByUserName(List<String> usernames) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> map = new HashMap<String, Object>();
		try {

			//获取人员详细信息
			map.put("UserNames", usernames);
			List<Map<String, Object>> personList = new ArrayList<Map<String, Object>>();
			int totalCount = 0;
			if(usernames.size() > 0){
				personList = groupDao.listPersonUserName(map);
				totalCount = groupDao.listPersonCountUserName(map);
			}
			resultMap.put("data", personList);
			resultMap.put("totalCount", totalCount);
		} catch (Exception e) {
			e.printStackTrace();
			LogUtil.e("人员导入失败");
			LogUtil.i("人员导入失败");
			throw new BusinessException("人员导入失败" + e);
		}
		return resultMap;
	}

	public List<Map<String, Object>>  GetPersonByNodes(String[] inNodes,String employeeNo,
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
			String foreman) {
		List<Integer> inNodesSql = new ArrayList<Integer>();
		List<Integer> notInNodesSql = new ArrayList<Integer>();
		Map<String, Object> map = new HashMap<String, Object>();
		for(int i=0;i<inNodes.length;i++){
			inNodesSql.add(Integer.parseInt(inNodes[i]));
		}
		map.put("inNodes", inNodesSql);
		map.put("employeeNo", employeeNo);
		map.put("level", level);
		map.put("cheakusername", cheakusername);
		map.put("cabinCrewInspector", cabinCrewInspector);
		map.put("no_state", no_state);
		map.put("cabinCrew", cabinCrew);
		map.put("bClassTeacher", bClassTeacher);
		map.put("longFlightInstructor", longFlightInstructor);
		map.put("internationalQualificationTraining", internationalQualificationTraining);
		map.put("threeHundredQualification", threeHundredQualification);
		map.put("boutique", boutique);
		map.put("Announcer", Announcer);
		map.put("Lhasa", Lhasa);
		map.put("specialCharter", specialCharter);
		map.put("cadre", cadre);
		map.put("teacher", teacher);
		map.put("foreman", foreman);
		List<Map<String, Object>>  resultList =  groupDao.GetPersonByNodes(map);
		return resultList;
	}
	
}
