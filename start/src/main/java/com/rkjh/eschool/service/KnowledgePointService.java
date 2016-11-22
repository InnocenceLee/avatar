package com.rkjh.eschool.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.rkjh.common.util.ExceptionUtil;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.dao.KnowledgePointDao;

/**
*@Title: KnowledgePointService.java
*@Description: 知识点管理Service
*@author Yang yixuan
*@date 2016年7月1日 下午3:36:47 
*@version V1.0
*/
@Service
public class KnowledgePointService {
	
	@Autowired
	public KnowledgePointDao knowledgePointDao;
	
	/**
	 * 查询知识点列表
	 * @return 知识点列表
	 */
	public List<Map<String, Object>> list(Map<String,Object> m){
		List<Map<String, Object>> resultList = knowledgePointDao.list(m);
		return resultList;
	}
	/**
	 * 查询当前知识点的子知识点及本身
	 * @param m
	 * @return
	 */
	public List<Map<String, Object>> findChildren(Integer base){
		List<Map<String, Object>> resultList = knowledgePointDao.findChildren(base);
		return resultList;
	}
	/**
	 * 根据id查询node
	 * @param id
	 * @return
	 */
	public Integer findById(Integer id){
		Integer result = knowledgePointDao.findById(id);
		return result;
	}
	
	/**
	 * 修改知识点
	 * @param map 知识点信息
	 * @return 成功/失败
	 */
	@Transactional
	public int update(Map<String, Object> map){
		// check是否同名
		int checkResult = checkName(map);
		if(checkResult > 1){
			return CodeEnum.ERROR_CODE_N1;
		}
		int result = knowledgePointDao.update(map);
		checkResult = checkName(map);
		if(checkResult > 1){
			ExceptionUtil.throwBusinessException("修改知识点名字重复");
		}
		return  (result <= 0) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 删除知识点
	 * @param id 知识点id
	 * @return 成功/失败
	 */
	@Transactional
	public int del(int id){
		//check是否被引用
		Map<String, Object> resultMap = knowledgePointDao.count4Del(id);
		long course = 1;
		long paper = 1;
		long question = 1;
		long base = 1;
		int result = CodeEnum.ERROR_CODE_N1;
		//查询课程知识点
		if(resultMap.get("course") != null){
			course = (long)resultMap.get("course");
		}
		//查询试卷知识点
		if(resultMap.get("paper") != null){
			paper = (long)resultMap.get("paper");
		}
		//查询试题知识点
		if(resultMap.get("question") != null){
			question = (long)resultMap.get("question");
		}
		//查询是否是父节点
		if(resultMap.get("base") != null){
			base = (long)resultMap.get("base");
		}
		if((course == 0) && (paper == 0) && (question == 0) && (base == 0)){
			result = knowledgePointDao.del(id);
		}
		return  (result <= 0) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 新增知识点
	 * @param map 知识点
	 * @return 成功失败
	 */
	@Transactional
	public int add(Map<String, Object> map){
		if(StringUtil.isEmpty((String)map.get("title")))
			return CodeEnum.ERROR_CODE_N1;
		// 新增
		knowledgePointDao.add(map);
		// check是否同名
		int checkResult = checkName(map);
		if(checkResult > 1 ){
			ExceptionUtil.throwBusinessException("新增知识点名字重复");
		}
		return  (map.get("id") == null) ? CodeEnum.ERROR_CODE_N1 : CodeEnum.SUCCESS_CODE_0;
	}

	/**
	 * check同一父节点是否同名
	 * @param name 名字
	 * @param base 父节点
	 * @return 同名数
	 */
	public int checkName(Map<String, Object> map){
		return knowledgePointDao.checkName(map);
	}
	
	/**
	 * 根据课程id查询知识点id
	 * @param id 课程id
	 * @return 知识点id
	 */
	public List<Map<String, Object>> findIdByCourseId(int id){
		List<Map<String, Object>> result = knowledgePointDao.findIdByCourseId(id);
		return result;
	}
	
	/**  
	 * 根据知识点base删除知识点
	 * @param id 知识点base
	 * @return 成功/失败
	 */
	public int delByBase(int id){
		int result = knowledgePointDao.delByBase(id);
		if(result < 0){
			return CodeEnum.ERROR_CODE_N1;
		}
		return CodeEnum.SUCCESS_CODE_0;
	}
	
	/**
	 * 加载知识点树数据
	 * @param id
	 * @return
	 */
	public List<Map<String, Object>> loadKnowledgeTree(Integer id) {
		Map<String,Object> args = new HashMap<>();
		args.put("id", id);
 		return knowledgePointDao.loadKnowledgeTree(args);
	}

	public Map<String, Object> getKnowledgePointById(int id) {
		return knowledgePointDao.getKnowledgePointById(id);
	}
}
