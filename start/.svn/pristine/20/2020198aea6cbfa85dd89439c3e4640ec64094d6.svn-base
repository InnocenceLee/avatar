package com.rkjh.eschool.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.rkjh.common.util.ArrayUtil;
import com.rkjh.common.util.ExceptionUtil;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.constant.BusiEnum;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.dao.HelpDao;

@Service
public class HelpService {

	/**
	 * 帮助管理Service
	 */
	@Autowired
	public HelpDao helpDao;

	
	@Transactional
	public int addHelp(Map<String, Object> obj){
		helpDao.add(obj);
		return 1;
	}
	
	@Transactional
	public List<Map<String, Object>> helpList(){
		
		return helpDao.helpList();
	}
	
	@Transactional
	public Map<String, Object> gethelpDetail(int id){
		
		return helpDao.gethelpDetail(id);	
	}
	
	@Transactional
	public int modyfyHelp(Map<String, Object> obj){
		helpDao.modyfy(obj);
		return 1;
	}
	
	@Transactional
	public int helpDel(int id){
		return helpDao.helpDel(id);
	}
	
}
