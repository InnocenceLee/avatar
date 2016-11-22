package com.rkjh.common.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.Properties;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import org.apache.commons.lang.StringUtils;

public class ZipUtil {
	private static String ZIP_EXE_PATH = null;
	private static String OS = null;

	static {
		try {
			OS = System.getenv("OS");
			// 加载配置
			InputStream in = ZipUtil.class.getResourceAsStream("/config.properties");
			Properties po = new Properties();
			po.load(in);
			ZIP_EXE_PATH = po.get("zipexepath") + "";
			in.close();
		} catch (IOException e) {
			LogUtil.e("load config fail.");
		}
	}

	// 解压
	public static void unzip(File zipFile, String unzipPath) {
		// 文件不存在
		if (!zipFile.exists()) return;

		try {
			String zipFilePath = zipFile.getAbsolutePath();
			if (OS.indexOf("Windows") != -1) { // windows
				String s = "cmd /c \"" + ZIP_EXE_PATH + "\" x -o+  " + zipFilePath + " " + unzipPath;
				Runtime.getRuntime().exec("cmd /c \"" + ZIP_EXE_PATH + "\" x -o+  " + zipFilePath + " " + unzipPath);
			} else {// linux
				Runtime.getRuntime().exec("unzip  " + zipFilePath + " " + unzipPath);
			}
		} catch (IOException e) {
			LogUtil.e("unzip course file fail. path" + zipFile.getAbsolutePath());
		}

	}
	
	
	public static boolean unzip(String zipFilePath, String unzipPath) throws Exception {
		if (StringUtils.isEmpty(zipFilePath) || StringUtils.isEmpty(unzipPath)){
			LogUtil.e("--lh--压缩文件未知,或解压路径未知---unzipPath:" +  zipFilePath +"    unzipPath:" + unzipPath);
			return false;
		}
		File zipFile = new File(zipFilePath);
		// 创建解压缩文件保存的路径
		File unzipFileDir = new File(unzipPath);
		if (!unzipFileDir.exists()) {
			unzipFileDir.mkdirs();
		}
		// 开始解压
		ZipEntry entry = null;
		String entryFilePath = null;
		File entryFile = null;
		int count = 0, bufferSize = 1024;
		byte[] buffer = new byte[bufferSize];
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		ZipFile zip = new ZipFile(zipFile);
		Enumeration<ZipEntry> entries = ((Enumeration<ZipEntry>) zip.entries());
		// 循环对压缩包里的每一个文件进行解压
		while (entries.hasMoreElements()) {
			entry = entries.nextElement();
			// 构建压缩包中一个文件解压后保存的文件全路径
			entryFilePath = unzipPath + File.separator + entry.getName();
			// 创建解压文件
			entryFile = new File(entryFilePath);
			
			if (entryFile.exists()){ // 存在
				continue;
			}else{// 不存在目录 
				if(entry.isDirectory()){
					entryFile.mkdirs();
					continue;
				}else{
					entryFile.getParentFile().mkdirs();
				}
			}

			// 写入文件
			bos = new BufferedOutputStream(new FileOutputStream(entryFile));
			bis = new BufferedInputStream(zip.getInputStream(entry));
			while ((count = bis.read(buffer, 0, bufferSize)) != -1) {
				bos.write(buffer, 0, count);
			}
			bos.close();
		}
		zip.close();
		return true;
	}

}
