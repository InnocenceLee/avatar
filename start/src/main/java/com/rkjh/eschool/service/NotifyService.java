package com.rkjh.eschool.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONArray;
import com.rkjh.common.exceptions.BusinessException;
import com.rkjh.common.util.LogUtil;
import com.rkjh.common.util.PageUtil;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.dao.NotifyDao;

@Service
public class NotifyService {
	
	@Autowired
	public NotifyDao notifyDao;
	
	public Map<String, Object> list(Map<String, Object> map){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try{
			List<Map<String, Object>> resultList = notifyDao.list(map);
			for (Map<String, Object> result : resultList) {
				String nodeNames = "";
				String[] peopleIds = result.get("receiver").toString().split(",");
				for (String peopleId : peopleIds) {
					Map<String, Object> nodemap = new HashMap<String, Object>();
					nodemap.put("person", Integer.parseInt(peopleId));
					String nodeName = this.getNodeName(nodemap);
					if(StringUtils.isEmpty(nodeName)) continue;
					nodeNames += nodeName+",";
				}
				result.put("nodeNames", nodeNames);
			}
			resultMap.put("data", resultList);
			int totleNum = notifyDao.listCount(map);
			resultMap.put("totleNum", PageUtil.getTotleNum(totleNum, (int)map.get("size")));
		} catch(Exception e){
			e.printStackTrace();
			LogUtil.e("公告查询失败");
			LogUtil.i("公告查询失败");
			throw new BusinessException("公告查询失败"+e);
		}
		return resultMap;
	}
	
	public Map<String, Object> listByPerson(Map<String, Object> map){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try{
			List<Map<String, Object>> resultList = notifyDao.listByPerson(map);
			for (Map<String, Object> result : resultList) {
				String nodeNames = "";
				String[] peopleIds = result.get("receiver").toString().split(",");
				for (String peopleId : peopleIds) {
					Map<String, Object> nodemap = new HashMap<String, Object>();
					nodemap.put("person", Integer.parseInt(peopleId));
					nodemap.put("station",map.get("station"));
					String nodeName = this.getNodeName(nodemap);
					if(StringUtils.isEmpty(nodeName)) continue;
					nodeNames += nodeName+",";
				}
				result.put("nodeNames", nodeNames);
			}
			resultMap.put("data", resultList);
			int totleNum = notifyDao.listCountByPerson(map);
			int newCount = notifyDao.listNewCountByPerson(map);
			resultMap.put("newCount", newCount);
			resultMap.put("totleNum", PageUtil.getTotleNum(totleNum, (int)map.get("size")));
		} catch(Exception e){
			e.printStackTrace();
			LogUtil.e("公告查询失败");
			LogUtil.i("公告查询失败");
			throw new BusinessException("公告查询失败"+e);
		}
		return resultMap;
	}
	public Map<String, Object>  getById(Map<String, Object> map){
		Map<String, Object> resultList = notifyDao.getById(map);
		if(resultList!=null){
			notifyDao.updateNotifyById(map);
			resultList.put("newCount", notifyDao.listNewCountByPerson(map));
		}
		return resultList;
	}
	public Integer listNewCount(Map<String, Object> map){
		Integer newCount = notifyDao.listNewCountByPerson(map);
		return newCount;
	}
	
	public String getNodeName(Map<String, Object> map){
		return notifyDao.getNodeName(map);
	}
	
	
	/**
	 * 新增公告
	 * @param map 公告
	 * @return 成功失败
	 */
	public int add(Map<String, Object> map){
		notifyDao.add(map);
		return  (map.get("id") == null) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	@Transactional
	public int update(Map<String, Object> map){
		notifyDao.update(map);
		return  (map.get("id") == null) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	@Transactional
	public int delNotifyByIds(JSONArray ids){
		int result = notifyDao.delNotifyByIds(ids);
		if(result < 0){
			return CodeEnum.ERROR_CODE_N1;
		}
		return CodeEnum.SUCCESS_CODE_0;
	}
	
}
