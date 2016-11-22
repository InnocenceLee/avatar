package com.rkjh.common.util;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.rkjh.common.exceptions.BusinessException;

public class ExcelUtil {
	
	  static SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
	  
	  public static String formatDuring(long mss) {  
		    long days = mss / (1000 * 60 * 60 * 24);  
		    long hours = (mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);  
		    long minutes = (mss % (1000 * 60 * 60)) / (1000 * 60);  
		    long seconds = (mss % (1000 * 60)) / 1000;  
		    String result="";
		    if(days != 0){
		    	result = days + "天" + hours + "小时" + minutes + "分钟 "  
			            + seconds + " 秒 ";	
		    }else if(hours !=0){
		    	result = hours + "小时" + minutes + "分钟 "  
			            + seconds + " 秒 "; 
		    }else if(minutes != 0){
		    	result =  minutes + "分钟 "  
			            + seconds + " 秒 ";  
		    }else{
		    	result = seconds + " 秒 ";  
		    }	
		    return result;  
		}  

	/**
	 * 导出   Excle 
	 * @param data  导出的数据
	 * @param mapping 列标题与列的映射关系   eg:  "姓名:name"
	 */
	public static HSSFWorkbook export(List<Map<String,Object>> data,List<String> mapping) throws BusinessException{
		if(data == null || data.size() == 0){
			throw new BusinessException("导出  Excel : 无数据");
		}
		if(mapping == null || mapping.size() == 0){
			throw new BusinessException("导出  Excel : 无列映射关系");
		}
		HSSFWorkbook book = new HSSFWorkbook(); // 创建一个execl
		HSSFSheet sheet = book.createSheet(); // 创建sheet
		
		List<String> titles = new ArrayList<>();
		List<String> keys = new ArrayList<>(); 
		for (int i = 0; i < mapping.size(); i++) {
			String[] map = mapping.get(i).split(":");
			titles.add( map[0]);

			keys.add( map[1]);
		}
		
		HSSFRow row  = null;
		row = sheet.createRow(0); // 标题行
		HSSFCell cell = null;
		for (int i = 0; i < titles.size(); i++) {
			cell = row.createCell(i);
			cell.setCellValue(titles.get(i));
		}
	
		Map<String, Object> rowData = null;
		for (int i = 0; i < data.size(); i++) {
			row = sheet.createRow(i + 1); // 数据行
			rowData = data.get(i); // 行数据
			String cellData = null;
			for (int j = 0; j < keys.size(); j++) {
				Object val = rowData.get(keys.get(j));

				cellData = val == null ? "" : val.toString();
				
				if(j == 4 || j == 5){
				  
					if(!cellData.equals("--") ){
						  try {
							  Long time=new Long(cellData);  
							  cellData = format.format(time);
						} catch (NumberFormatException e) {
							
						}  
					}
				}else if (j == 6){
					Long ms=new Long(cellData);  
					cellData = formatDuring(ms);
				}
				row.createCell(j).setCellValue(cellData);
			}
		}
		return book;
		
	}
	
	
//	
}
