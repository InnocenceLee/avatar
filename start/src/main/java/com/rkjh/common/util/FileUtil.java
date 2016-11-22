package com.rkjh.common.util;

import java.io.File;
import java.util.Calendar;
import java.util.UUID;

import org.apache.commons.io.FileUtils;

public class FileUtil extends FileUtils{
	
	public static final String BLANK_SPACE = " ";

	/**
	 * 拼接路径
	 */
	public static String concatPath(String... paths) {
		String result = "";
		for (String path : paths) {
			if (null != path) {
				if(result.endsWith("\\")||result.endsWith("/")){
					result = result.substring(0, result.length()-1);
				}
				if (!result.equals("") && (!(path.startsWith("/") || path.startsWith(File.separator)))) {
					path = String.format("%s%s", File.separator,path);
				}
				result = String.format("%s%s", result,path);
			}
		}
		return result;
	}
	
	
	/**
	 * 创建文件夹
	 * @param destDirName
	 * @return
	 */
	public static boolean createDir(String destDirName) {
		File dir = new File(destDirName);
		//在linux 下java 的默认的文件写入权限仅局限在执行目录之下。
		//如果需要在其他目录写入文件或者文件夹 需要手动设置以下权限。
		dir.setWritable(true, false);
		if (dir.exists()) {
			return false;
		}
		if (!destDirName.endsWith(File.separator)) {
			destDirName = destDirName + File.separator;
		}
		// 创建目录
		if (dir.mkdirs()) {
			return true;
		} else {
			return false;
		}
	}
	
	
	/**
	 * 生成日期路径字符串
	 */
	private static String createDatePathStr() {
		Calendar cal = Calendar.getInstance();
		String year = cal.get(Calendar.YEAR) + "";
		String month = (cal.get(Calendar.MONTH) + 1) + "";
		if (month.length() != 2) {
			month = "0" + month;
		}
		String date = cal.get(Calendar.DATE) + "";
		if (date.length() != 2) {
			date = "0" + date;
		}
		String yearMonth = year + month;
		String yearMonthDate = year + month + date;
		return "/" + year + "/" + yearMonth + "/" + yearMonthDate;
	}
	
	
	/**
	 * 在指定路径下生成日期路径
	 */
	public static String createDateDir(String parentDirName) {
		String datePathStr = createDatePathStr();
		String targetPath = concatPath(parentDirName,datePathStr);
		if(createDir(targetPath)){
			return targetPath;
		}else{
			return null;
		}
	}
	
	
	/**
	 * 在指定路径下生成hash文件夹
	 */
	public static String createHashDir(String parentDirName) {
	    int hashcode = UUID.randomUUID().toString().hashCode();
	    String dir1 = String.format("%d", (hashcode&0xf)>>4);  //0--15
	    String dir2 = String.format("%d", (hashcode&0xf0)>>4); //0-15
		String targetPath = concatPath(parentDirName,dir1,dir2);
		if(createDir(targetPath)){
			return targetPath;
		}else{
			return null;
		}
	}
	
	
	/**
	 * 在指定路径下生成唯一文件夹
	 */
	public static String createUniqueDir(String parentDirName) {
		String uuidPath = GeneralUtil.createUniqueId();
		String targetPath = concatPath(parentDirName,uuidPath);
		if(createDir(targetPath)){
			return targetPath;
		}else{
			return null;
		}
	}
}
