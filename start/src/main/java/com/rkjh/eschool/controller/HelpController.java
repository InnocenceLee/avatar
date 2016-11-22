package com.rkjh.eschool.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.avatar.UeResult;
import com.baidu.ueditor.ActionEnter;
import com.rkjh.common.util.ArrayUtil;
import com.rkjh.common.util.ExcelUtil;
import com.rkjh.common.util.StringUtil;
import com.rkjh.eschool.constant.CodeEnum;
import com.rkjh.eschool.constant.NodeSql;
import com.rkjh.eschool.entity.Data4D2js;
import com.rkjh.eschool.entity.Error;
import com.rkjh.eschool.entity.Error4D2js;
import com.rkjh.eschool.service.CourseLessonService;
import com.rkjh.eschool.service.CourseService;
import com.rkjh.eschool.service.HelpService;
import com.sun.istack.internal.NotNull;

@Controller
@RequestMapping("**/jv/help")
public class HelpController {

	@Autowired
	private HelpService helpService;

	@RequestMapping(value = "/helpAdd", method = RequestMethod.POST)
	@ResponseBody
	public Object addHelp(@NotNull String name, @NotNull String content) {

		Map<String, Object> help = new HashMap<String, Object>();
		help.put("name", name);
		help.put("content", content);
		helpService.addHelp(help);
		return null;
	}

	@RequestMapping(value = "/helpMofify", method = RequestMethod.POST)
	@ResponseBody
	public Object helpMofify(@NotNull int id, @NotNull String name,
			@NotNull String content) {

		Map<String, Object> help = new HashMap<String, Object>();
		help.put("name", name);
		help.put("content", content);
		System.out.print(content);
		help.put("id", id);
		helpService.modyfyHelp(help);
		return null;
	}

	@RequestMapping(value = "/helpList", method = RequestMethod.POST)
	@ResponseBody
	public Object helpList() {

		Map<String, Object> help = new HashMap<String, Object>();

		return JSON.toJSONString(helpService.helpList());
	}

	@RequestMapping(value = "/showhelp", method = RequestMethod.GET)
	public ModelAndView detailUpdate(@NotNull int id) {

		Map<String, Object> help = helpService.gethelpDetail(id);
		ModelAndView mav = new ModelAndView();
		mav.setViewName("showhelp");
		mav.addObject("help", help);
		return mav;
	}

	@RequestMapping(value = "/helpModify", method = RequestMethod.GET)
	public ModelAndView helpModify(@NotNull int id) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("helpmodify");
		mav.addObject("id", id);
		return mav;
	}

	@RequestMapping(value = "/helpObj", method = RequestMethod.POST)
	@ResponseBody
	public Object helpObj(@NotNull int id) {

		Map<String, Object> help = helpService.gethelpDetail(id);
		return JSON.toJSONString(help);
	}

	@RequestMapping(value = "/uploadimage", method = { RequestMethod.POST,RequestMethod.GET })
	@ResponseBody
	public Object uploadimage(
			@RequestParam(value="upfile", required=false) CommonsMultipartFile upfile,
			HttpServletResponse response, HttpServletRequest request) {
		String path = null;// 文件路径
		String type = null;// 文件类型
		UeResult result2 = null;
		String fileName;
		if (upfile != null) {// 判断上传的文件是否为空
		    fileName = upfile.getOriginalFilename();// 文件原名称
			System.out.println("上传的文件原名称:" + fileName);
			// 判断文件类型
			type = fileName.indexOf(".") != -1 ? fileName.substring(
					fileName.lastIndexOf(".") + 1, fileName.length()) : null;
			if (type != null) {// 判断文件类型是否为空
				if ("GIF".equals(type.toUpperCase())
						|| "PNG".equals(type.toUpperCase())
						|| "JPG".equals(type.toUpperCase())) {
					// 项目在容器中实际发布运行的根路径
					String realPath = request.getSession().getServletContext()
							.getRealPath("/")+"\\js\\ue"
									+ "\\";
					path = realPath
							+ /* System.getProperty("file.separator")+ */fileName;
					System.out.println("存放图片文件的路径:" + path);
					// 转存文件到指定的路径
					try {
						upfile.transferTo(new File(path));
						
					} catch (IllegalStateException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				    result2 = new UeResult();
					result2.setOriginal(fileName);
					result2.setUrl(fileName);
					result2.setState("SUCCESS");
					result2.setTitle(fileName);
					System.out.println("文件成功上传到指定目录下");
				} else {
					System.out.println("不是我们想要的文件类型,请按要求重新上传");
					return null;
				}
			} else {
				System.out.println("文件类型为空");
				return null;
			}
		} else {
			System.out.println("没有找到相对应的文件");
			return null;
		}


		return result2;
	}

	@RequestMapping(value = "/helpDel", method = RequestMethod.POST)
	@ResponseBody
	public Object helpdel(@NotNull int id) {
		Map<String, Object> help = new HashMap<String, Object>();
		int successflag = helpService.helpDel(id);
		if (successflag <= 0) {
			help.put("success", false);
		} else {
			help.put("success", true);
		}

		return JSON.toJSONString(help);
	}
}
