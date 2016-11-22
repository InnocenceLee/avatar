package com.rkjh.eschool.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.dao.SystemParameterDao;

/**
* @Title: SystemParameterService.java
* @Description: 系统参数Service
* @Author: Yang yixuan
* @Create Date: 2016年7月17日下午3:33:27
* @Version: V1.00
*/
@Service
public class SystemParameterService {
	
	/**
	 * 系统参数Dao
	 */
	@Autowired
	public SystemParameterDao systemParameterDao;

	/**
	 * 查询所有系统参数
	 * @return 系统参数
	 */
	public Map<String, Object> list(){
		List<Map<String, Object>> result= systemParameterDao.list();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		for(Map<String, Object> item: result){
			resultMap.put((String)item.get("name"), item.get("value"));
		}
		return resultMap;
	}
	
	/**
	 * 修改系统参数
	 * @param key 参数名
	 * @param val 参数值
	 * @return 成功/失败
	 */
	@Transactional
	public int update(String key, String val){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("name", key);
		map.put("value", val);
		
		int result = systemParameterDao.update(map);
		return (result != 1) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 新增系统参数
	 * @param key 参数名
	 * @param val 参数值
	 * @return 成功/失败
	 */
	@Transactional
	public int add(String key, String val){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("name", key);
		map.put("value", val);
		
		systemParameterDao.add(map);
		return (map.get("id") == null) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}

	/**
	 * 根据名字查询参数数量
	 * @return 数量
	 */
	public Map<String, Object> countName(){
		Map<String, Object> result = systemParameterDao.countName();
		return result;
	}
	
	/**
	 * 根据参数名查询参数
	 * @param name 参数名
	 * @return 参数
	 */
	public Map<String, Object> findByName(String name){
		Map<String, Object> result = systemParameterDao.findByName(name);
		return result;
	}
}
