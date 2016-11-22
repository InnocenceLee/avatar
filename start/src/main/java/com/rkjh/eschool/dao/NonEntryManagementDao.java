package com.rkjh.eschool.dao;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;
import com.alibaba.fastjson.JSONArray;

/**
*@Title: NonEntryManagementDao.java
*@Description: 未入职人员管理Dao
*@author Yang yixuan
*@date 2016年6月29日 下午8:44:33
*@version V1.0
*/
@Repository
public interface NonEntryManagementDao {
	
	/**
	 * 查询未入职人员列表
	 * @return 未入职人员列表
	 */
	public List<Map<String, Object>> list(Map<String, Object> map);

	/**
	 * 查询总条数
	 * @return 总条数
	 */
	public int count4List(Map<String, Object> map);
	
	/**
	 * 修改为入职人员信息
	 * @param map 修改信息
	 * @return 成功/失败
	 */
	public int update(Map<String, Object> map);
	
	/**
	 * 删除人员
	 * @param id 人员id
	 * @return 成功/失败
	 */
	public int del(JSONArray id);
	
	/**
	 * 新增未入职人员
	 * @param map 人员信息
	 * @return 插入记录的id
	 */
	public int add(Map<String, Object> map);
	
	public List<Map<String, Object>>  listPersonByIds(Map<String, Object> map);
	
	public List<Map<String, Object>>  listPersonByNames(Map<String, Object> map);
	
	/**
	 * 获取人员信息
	 * @param 
	 */
	public List<Map<String, Object>> getPersonByIds(Map<String, Object> param);
	public Map<String, Object> getPersonById(int id);
	
	/**
	 * 新增员工（未入职）
	 * @param map
	 * @return employeeId
	 */
	public int addEmployee(Map<String, Object> map);
	
	
	public int findDefaultNodeId();
	
	public int findDefaultStationId();
	
	public int addEmployeeStation(Map<String, Object> map);
	
	public int updateEmployee(Map<String,Object> map); 
}
