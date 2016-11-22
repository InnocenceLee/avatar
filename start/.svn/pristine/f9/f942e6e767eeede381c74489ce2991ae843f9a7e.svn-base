package com.rkjh.eschool.service;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONObject;
import com.rkjh.common.util.ExceptionUtil;
import com.rkjh.eschool.constant.CodeEnum;

/**
* @Title: SystemParameterBaseService.java
* @Description: 系统参数baseService
* @Author: Yang yixuan
* @Create Date: 2016年7月17日下午4:35:26
* @Version: V1.00
*/
@Service
public class SystemParameterBaseService {

	@Autowired
	public SystemParameterService systemParameterService;
	
	/**
	 * 修改系统参数
	 * @param obj 系统参数
	 * @return 成功/失败
	 */
	@Transactional
	public int update(JSONObject obj){
		int result = CodeEnum.ERROR_CODE_N1;
		
		Map<String, Object> count = systemParameterService.countName();

		Iterator<Entry<String, Object>> countIt = count.entrySet().iterator();
		while(countIt.hasNext()){
			Entry<String, Object> countObj = countIt.next();
			String key = (String) countObj.getKey();
			Long valL = (Long) countObj.getValue();
			int val = Integer.parseInt(valL.toString());
			switch (val) {
			case 0:
				// 新增
				result = systemParameterService.add(key, obj.getString(key));
				break;
			case 1:
				// 修改
				result = systemParameterService.update(key, obj.getString(key));
				break;
			default:
				// 异常
				ExceptionUtil.throwBusinessException("修改系统参数失败");
				return CodeEnum.ERROR_CODE_N1;
			}
			if(result == CodeEnum.ERROR_CODE_N1){
				ExceptionUtil.throwBusinessException("修改系统参数失败");
			}
		}
		
		return result;
	}
	
}
