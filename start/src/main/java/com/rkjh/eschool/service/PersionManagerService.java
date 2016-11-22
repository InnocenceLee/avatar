package com.rkjh.eschool.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.postgresql.util.PGobject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.rkjh.eschool.dao.PersionManagerDao;

@Service
public class PersionManagerService {

	@Autowired
	PersionManagerDao persionManagerDao;

	public Boolean impotPersion(Map<String, Object> map)
			throws Exception {
		Map<String, Object> queryObj = persionManagerDao
				.getPersionByemployeeNo((String) map.get("username"));
		if (queryObj == null) {
			return false;
		}
		PGobject pGobject = (PGobject) queryObj.get("tag");
		JSONObject oldJObject = null;
		if (pGobject == null) {
			oldJObject = new JSONObject();
		} else {
			String pGobjectString = pGobject.getValue();
			oldJObject= JSONObject.parseObject(pGobjectString);
		}

		JSONObject addDate = (JSONObject) map.get("tag");
		oldJObject.put("employeeNo", addDate.get("employeeNo"));
		oldJObject.put("level", addDate.get("level"));
		oldJObject.put("name", addDate.get("name"));
		oldJObject.put("cabinCrewInspector", addDate.get("cabinCrewInspector"));
		oldJObject.put("cabinCrew", addDate.get("cabinCrew"));
		oldJObject.put("bClassTeacher", addDate.get("bClassTeacher"));
		oldJObject.put("longFlightInstructor",
				addDate.get("longFlightInstructor"));
		oldJObject.put("internationalQualificationTraining",
				addDate.get("internationalQualificationTraining"));
		oldJObject.put("threeHundredQualification",
				addDate.get("threeHundredQualification"));
		oldJObject.put("boutique", addDate.get("boutique"));
		oldJObject.put("Announcer", addDate.get("Announcer"));
		oldJObject.put("Lhasa", addDate.get("Lhasa"));
		oldJObject.put("specialCharter", addDate.get("specialCharter"));
		oldJObject.put("cadre", addDate.get("cadre"));
		oldJObject.put("teacher", addDate.get("teacher"));
		oldJObject.put("foreman", addDate.get("foreman"));
		System.out.println(oldJObject.toJSONString());
		map.put("tag", oldJObject);
		persionManagerDao.update(map);
		return true;
	}
}
