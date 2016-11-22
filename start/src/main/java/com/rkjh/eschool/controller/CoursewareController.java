package com.rkjh.eschool.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.rkjh.common.exceptions.BusinessException;
import com.rkjh.common.util.FileUtil;
import com.rkjh.common.util.LogUtil;
import com.rkjh.common.util.StringUtil;
import com.rkjh.common.util.ZipUtil;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.constant.SysEnum;
import com.rkjh.eschool.entity.Data4D2js;
import com.rkjh.eschool.entity.Error;
import com.rkjh.eschool.entity.Error4D2js;
import com.rkjh.eschool.service.CoursewareService;

/**
*@Title: CoursewareController.java
*@Description: 课件Controller
*@author Yang yixuan
*@date 2016年7月6日 下午12:41:10
*@version V1.0
*/
@Controller
@RequestMapping("**/jv/courseware")
public class CoursewareController {
    
	/**
	 * 课件解压目录
	 */
	private static final String UNZIP_DIR  = "/courseData";
	
	
	@Autowired
	public CoursewareService coursewareService;
	
	/**
	 * 课件上传
	 * @param file
	 * @return
	 */
	@RequestMapping(value="/upload",method=RequestMethod.POST)
	public void upload(@RequestParam(value = "courseware", required = true) MultipartFile courseware,
			HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> rs = new HashMap<>();
		response.setContentType( "text/html; charset=utf-8" );
		response.setHeader( "Cache-Control", "no-cache" );
		PrintWriter writer = response.getWriter();
		try {
			ServletContext context = request.getSession().getServletContext();
			// 获取项目路径
			String path = context.getRealPath(SysEnum.COURSEWARE_PATH);
			FileUtil.createDir(path);//创建目录
			// 获取文件名 
			String coursewareFileName = courseware.getOriginalFilename();
			String baseName = new Date().getTime() + "";
			byte[] fileData = courseware.getBytes();
			String qualPath = path + File.separator + coursewareFileName;
		
			FileOutputStream out = new FileOutputStream(qualPath);
			out.write(fileData);
			out.flush();
			out.close();
			
			if(!"zip".equals(FilenameUtils.getExtension(coursewareFileName))){
				rs.put("state", "-1");// 非压缩文件
				writer.write(JSON.toJSONString(rs));
				writer.close();
				return;
			}
			
			// 课件文件
			String unzipPath = context.getRealPath(UNZIP_DIR) + File.separator + baseName;
			if(new File(unzipPath).exists()){ // 上传了同名的课件  加时间戳
				long time = new Date().getTime();
				unzipPath += time;
				baseName += time;
			}
			
			FileUtil.createDir(unzipPath);//创建目录
			boolean success = false;
			// 解压缩课件
			try{
				success = ZipUtil.unzip(qualPath,unzipPath);
			}catch(Exception e){
				LogUtil.e("--lh--解压文件失败：" + e);
			}
			rs.put("fileName", baseName.trim());
			rs.put("showName", coursewareFileName);
			rs.put("state", success ? "1" : "0");// 成功
		} catch (Exception e) {
			LogUtil.e("课件上传失败" + e);
			rs.put("state", "0"); // 失败
		}
		writer.write(JSON.toJSONString(rs));
		writer.close();
	}
	
	
	public Object add(@RequestParam(value = "obj", required = true) String obj)
			throws Exception{
		try {
			if(StringUtil.isEmpty(obj)){
				Error error = new Error();
				error.setMessage("新增课件失败");
				error.setTable("train_courseware");
				return JSON.toJSONString(new Error4D2js(error));
			}
			JSONArray coursewareObject = JSONArray.parseArray(obj);
			//新增课件
			int result = coursewareService.add(coursewareObject);
			if(result != CodeEnum.SUCCESS_CODE_0){
				Error error = new Error();
				error.setMessage("新增课件失败");
				error.setTable("train_courseware");
				return JSON.toJSONString(new Error4D2js(error));
			}
			
			return JSON.toJSONString(Data4D2js.SUCCESS);
		} catch (Exception e) {
			LogUtil.e("新增课件失败" + e);
			LogUtil.i("新增课件失败" + e);
			throw new BusinessException("新增课件失败");
		}
	}
	
}
