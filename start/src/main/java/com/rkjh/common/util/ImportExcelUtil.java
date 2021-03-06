package com.rkjh.common.util;

import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ImportExcelUtil {

	private final static String excel2003L = ".xls"; // 2003- 版本的excel
	private final static String excel2007U = ".xlsx"; // 2007+ 版本的excel

	/**
	 * 描述：获取IO流中的数据，组装成List<List<Object>>对象
	 * 
	 * @param in
	 *            ,fileName
	 * @return
	 * @throws IOException
	 */
	public static List<List<Object>> getBankListByExcel(InputStream in,
			String fileName) throws Exception {
		List<List<Object>> list = null;

		// 创建Excel工作薄
		Workbook work = getWorkbook(in, fileName);
		if (null == work) {
			throw new Exception("创建Excel工作薄为空！");
		}
		Sheet sheet = null;
		Row row = null;
		Cell cell = null;

		list = new ArrayList<List<Object>>();
		// 遍历Excel中所有的sheet
		for (int i = 0; i < work.getNumberOfSheets(); i++) {
			sheet = work.getSheetAt(i);
			if (sheet == null) {
				continue;
			}

			// 遍历当前sheet中的所有行
			for (int j = sheet.getFirstRowNum(); j < sheet.getLastRowNum(); j++) {
				row = sheet.getRow(j);
				if (row == null) {
					continue;
				}

				if (row.getFirstCellNum() == j) {
					if (!String.valueOf(row.getCell(0)).equals("员工编号")) {
						return null;
					}
					if (!String.valueOf(row.getCell(1)).equals("等级")) {
						return null;

					}
					if (!String.valueOf(row.getCell(2)).equals("姓名")) {
						return null;

					}
					if (!String.valueOf(row.getCell(3)).equals("客舱乘务检查员")) {
						return null;

					}
					if (!String.valueOf(row.getCell(4)).equals("客舱乘务教员")) {
						return null;

					}
					if (!String.valueOf(row.getCell(5)).equals("B类教员")) {
						return null;

					}
					if (!String.valueOf(row.getCell(6)).equals("晋级乘务长带飞教员")) {
						return null;

					}
					if (!String.valueOf(row.getCell(7)).equals("国际线资格培训")) {
						return null;

					}
					if (!String.valueOf(row.getCell(8)).equals("330资格")) {
						return null;

					}
					if (!String.valueOf(row.getCell(9)).equals("精品")) {
						return null;

					}
					if (!String.valueOf(row.getCell(10)).equals("广播员")) {
						return null;

					}
					if (!String.valueOf(row.getCell(11)).equals("拉萨")) {
						return null;

					}
					if (!String.valueOf(row.getCell(12)).equals("专包机")) {
						return null;

					}
					if (!String.valueOf(row.getCell(13)).equals("干部")) {
						return null;

					}
					if (!String.valueOf(row.getCell(14)).equals("教员")) {
						return null;

					}
					if (!String.valueOf(row.getCell(15)).equals("班组长")) {
						return null;

					}
					continue;
				}

				// 遍历所有的列
				List<Object> li = new ArrayList<Object>();
				for (int y = row.getFirstCellNum(); y < row.getLastCellNum(); y++) {
					cell = row.getCell(y);
					System.out.print(String.valueOf(y + " : " + cell + "  "));
					li.add(getCellValue(cell));
				}
				System.out.println();
				list.add(li);
			}
		}
		in.close();
		return list;
	}

	public static List<String> getimportExcile(InputStream in,
			String fileName) throws Exception{
		List<String> list = null;

		// 创建Excel工作薄
		Workbook work = getWorkbook(in, fileName);
		if (null == work) {
			throw new Exception("创建Excel工作薄为空！");
		}
		Sheet sheet = null;
		Row row = null;
		Cell cell = null;

		list = new ArrayList<String>();
		// 遍历Excel中所有的sheet
		for (int i = 0; i < work.getNumberOfSheets(); i++) {
			sheet = work.getSheetAt(i);
			if (sheet == null) {
				continue;
			}
			// 遍历当前sheet中的所有行
			for (int j = sheet.getFirstRowNum(); j <= sheet.getLastRowNum(); j++) {
				row = sheet.getRow(j);
				if (row == null) {
					continue;
				}
				if (row.getFirstCellNum() == j) {
					if (!String.valueOf(row.getCell(0)).equals("员工编号")) {
						return null;
					}
					continue;
				}
				// 遍历所有的列
				String li = row.getCell(0) +"";
				System.out.println(li);
				list.add(li);
			}
		}
		in.close();
		return list;
	}
	/**
	 * 描述：根据文件后缀，自适应上传文件的版本
	 * 
	 * @param inStr
	 *            ,fileName
	 * @return
	 * @throws Exception
	 */
	public static Workbook getWorkbook(InputStream inStr, String fileName)
			throws Exception {
		Workbook wb = null;
		String fileType = fileName.substring(fileName.lastIndexOf("."));
		if (excel2003L.equals(fileType)) {
			wb = new HSSFWorkbook(inStr); // 2003-
		} else if (excel2007U.equals(fileType)) {
			wb = new XSSFWorkbook(inStr); // 2007+
		} else {
			throw new Exception("解析的文件格式有误！");
		}
		return wb;
	}

	/**
	 * 描述：对表格中数值进行格式化
	 * 
	 * @param cell
	 * @return
	 */
	public static Object getCellValue(Cell cell) {
		Object value = null;
		DecimalFormat df = new DecimalFormat("0"); // 格式化number String字符
		SimpleDateFormat sdf = new SimpleDateFormat("yyy-MM-dd"); // 日期格式化
		DecimalFormat df2 = new DecimalFormat("0.00"); // 格式化数字

		switch (cell.getCellType()) {
		case Cell.CELL_TYPE_STRING:
			value = cell.getRichStringCellValue().getString();
			break;
		case Cell.CELL_TYPE_NUMERIC:
			if ("General".equals(cell.getCellStyle().getDataFormatString())) {
				value = df.format(cell.getNumericCellValue());
			} else if ("m/d/yy".equals(cell.getCellStyle()
					.getDataFormatString())) {
				value = sdf.format(cell.getDateCellValue());
			} else {
				value = df2.format(cell.getNumericCellValue());
			}
			break;
		case Cell.CELL_TYPE_BOOLEAN:
			value = cell.getBooleanCellValue();
			break;
		case Cell.CELL_TYPE_BLANK:
			value = "";
			break;
		default:
			break;
		}
		return value;
	}

}
