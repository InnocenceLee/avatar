package com.rkjh.eschool.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.dao.CoursewareDao;

/**
*@Title: CoursewareService.java
*@Description: 课件Service
*@author Yang yixuan
*@date 2016年7月6日 上午11:44:53
*@version V1.0
*/
@Service
public class CoursewareService {
	
	@Autowired
	public CoursewareDao coursewareDao;
	
	/**
	 * 课件上传
	 * @return
	 */
	public Map<String, Object> upload(MultipartFile file){
		Map<String, Object> mesg = new HashMap<String, Object>();
		return mesg;
	}
	
	/**
	 * 新增课件
	 * @param obj 课件
	 * @return 成功/失败
	 */
	@Transactional
	public int add(JSONObject courseware){
		int result = CodeEnum.ERROR_CODE_N1;
		//数据校验
		result = checkData(courseware);
		if(result == CodeEnum.ERROR_CODE_N1){
			return result;
		}
		coursewareDao.add(courseware);
		if(courseware.get("id") == null){
			return CodeEnum.ERROR_CODE_N1;
		}
		return CodeEnum.SUCCESS_CODE_0;
	}

	
	/**
	 * 新增课件
	 * @param obj 课件
	 * @return 成功/失败
	 */
	@Transactional
	public int add(JSONArray list){
		int result = CodeEnum.ERROR_CODE_N1;
		for(int i = 0; i < list.size(); ++i){
			//数据校验
			JSONObject map = list.getJSONObject(i);
			result = checkData(map);
			if(result == CodeEnum.ERROR_CODE_N1){
				return CodeEnum.ERROR_CODE_N1;
			}
			coursewareDao.add(map);
			if(map.get("id") == null){
				return  CodeEnum.ERROR_CODE_N1;
			}
		}
		return CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 数据校验
	 * @param map 课件
	 * @return 成功/失败
	 */
	public int checkData(Map<String, Object> map){
		// 数据校验
		return CodeEnum.SUCCESS_CODE_0; 
	}
	
	/**
	 * 根据课时id删除课件
	 * @param id
	 * @return 成功/失败
	 */
	@Transactional
	public int delBylessonId(int id){
		int result = coursewareDao.delBylessonId(id);
		return (result < 0) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 根据课件id修改课件
	 * @param courseware 课件
	 * @return 成功/失败
	 */
	public int update(JSONObject courseware){
		int result = coursewareDao.update(courseware);
		return (result < 0) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 根据课件id批量删除课件
	 * @param id 课件id
	 * @return 成功/失败
	 */
	public int del(List<Map<String, Object>> id){
		int[] ids = new int[id.size()];
		for(int i = 0; i < id.size(); ++i){
			Map<String, Object> coursewareMap = id.get(i);
			ids[i] = (int)coursewareMap.get("courseId");
		}
		int result = coursewareDao.del(ids);
		return  (result != id.size()) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
}
