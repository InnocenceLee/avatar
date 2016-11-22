package com.avatar;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFPictureData;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTDrawing;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTPPr;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTR;

import com.cloopen.rest.sdk.utils.encoder.BASE64Decoder;
import com.cloopen.rest.sdk.utils.encoder.BASE64Encoder;

public class WordProcessor {
	//just for .docx
		public static List<Question> analyse(InputStream is,HttpServletRequest request) throws Exception{
			
			XWPFDocument doc = new XWPFDocument(is);
			List<Question> questions=new ArrayList<Question>();
			List<XWPFPictureData> pics=doc.getAllPictures();
			Map<String,Integer> indexMap = new HashMap<String,Integer>();
			indexMap.put("picIndex", 0);
			List<XWPFParagraph> paras=doc.getParagraphs();
			for (int i = 0;i<paras.size();i++) {  
				XWPFParagraph para = paras.get(i);
				if(!para.getText().trim().equals("")){
					CTPPr pr = para.getCTP().getPPr();
					
					if(pr != null && pr.getNumPr()!=null){
						List<String> answers = new ArrayList<String>();
						List<String> options = new ArrayList<String>();
						String title="";
						String expanation="";
						boolean isJudge = true;
						title = dealRun(title,indexMap, para.getRuns(), pics,request).trim();
						
						int nextNumId = -1;
						for(int j = i+1;j<paras.size();j++){
							
							XWPFParagraph tempPara = paras.get(j);
							CTPPr tempPr = tempPara.getCTP().getPPr();
							CTR[] rArray = tempPara.getCTP().getRArray();
							boolean isAnswer=false;
							for(int q=0;q<rArray.length;q++){
								if(rArray[q].getRPr()!=null && rArray[q].getRPr().getColor()!=null && rArray[q].getTList().get(0).getStringValue().trim().length()!=0){
									isAnswer=true;
									break;
								}
							}
							String tempParaText = "";
							String currParaText = tempPara.getText().trim();
							List<XWPFRun> tempRuns = tempPara.getRuns();
							
							if(!currParaText.equals("") && tempPr != null && tempPr.getNumPr() == null && currParaText.substring(0, 1).matches("[A-Z]")){
								isJudge = false;
								tempParaText = dealRun(tempParaText,indexMap, tempRuns, pics,request).trim();
								options.add(tempParaText.substring(1, tempParaText.length()).trim());
								if(isAnswer){
									answers.add(tempParaText.substring(1, tempParaText.length()).trim());
								}
							}else if(!currParaText.equals("") && tempPr != null && tempPr.getNumPr() == null && currParaText.substring(0, 1).matches("[\\*]")){
								tempParaText = dealRun(tempParaText,indexMap, tempRuns, pics,request).trim();
								expanation = tempParaText.substring(1, tempParaText.length()).trim();
							}else if(tempPr != null && tempPr.getNumPr() != null && tempPr.getNumPr().getNumId().getVal().intValue() == pr.getNumPr().getNumId().getVal().intValue()){
								i = j-1;
								break;
							}else if(tempPr != null && tempPr.getNumPr() != null && tempPr.getNumPr().getNumId().getVal().intValue() != pr.getNumPr().getNumId().getVal().intValue()){
								if(nextNumId==-1){
									nextNumId = tempPr.getNumPr().getNumId().getVal().intValue();
								}
								if(tempPr.getNumPr().getNumId().getVal().intValue() == nextNumId){
									isJudge = false;
									tempParaText = dealRun(tempParaText,indexMap, tempRuns, pics,request).trim();
									options.add(tempParaText);
									if(isAnswer){
										answers.add(tempParaText);
									}
								}else{
									i = j-1;
									break;
								}
							}else if(currParaText.equals("") && tempPr != null && tempPr.getNumPr() == null){
								continue;
							}else{
								i = j-1;
								break;
							}
						}
						if(isJudge){
							Judge j=new Judge();
							j.setTitle(title);
							j.setExpanation(expanation);
							if(pr.getRPr() != null && pr.getRPr().getColor()!=null&&pr.getRPr().getColor().getVal() != null){
								j.setAnswer("对");
							}else{
								j.setAnswer("错");
							}
							questions.add(j);
						}else if(answers.size()>1){
							Multiselect m = new Multiselect();
							m.setTitle(title);
							m.setOptions(options);
							m.setAnswer(answers);
							m.setExpanation(expanation);
							questions.add(m);
						}else if(answers.size()==1){
							com.avatar.Single s = new com.avatar.Single();
							s.setTitle(title);
							s.setOptions(options);
							s.setAnswer(answers.get(0));
							s.setExpanation(expanation);
							questions.add(s);
						}
						
						
					}
				}
			} 
			closeStream(is);
			return questions;
		}

	   
	   private static String dealRun(String tempParaText,Map<String,Integer> indexMap,List<XWPFRun> tempRuns,List<XWPFPictureData> pics,HttpServletRequest request){
		   for(XWPFRun r : tempRuns){
			   if(r.getCTR().getRPr() != null && r.getCTR().getRPr().getU()!=null){
					if(r.toString().trim().length()==0){
						r.setText(StringEscapeUtils.unescapeHtml4("&nbsp;&nbsp;"));
					}
					tempParaText += StringEscapeUtils.unescapeHtml4("<u>")+r+StringEscapeUtils.unescapeHtml4("</u>");
				}else{
					tempParaText += r;
				}
				List<CTDrawing> pictList = r.getCTR().getDrawingList();
				if(pictList.size()!=0){
					for(CTDrawing p : pictList){
						XWPFPictureData pictureData = pics.get(indexMap.get("picIndex"));
						byte[] data=pictureData.getData();
						String d = new BASE64Encoder().encode(data);
						
						SimpleDateFormat dateFromat = new SimpleDateFormat("yyy-MM-dd-HH-ss"); // 日期格式化
						String imageName = dateFromat.format(new Date())+".jpg";
						String fileurl = request.getSession().getServletContext()
								.getRealPath("/")+"\\js\\ue"
								+ "\\" + imageName;
						tempParaText += "<img src="+"\"/start/js/ue/"+ imageName+"\"" +"/>";
						GenerateImage(d,fileurl);
						indexMap.put("picIndex", indexMap.get("picIndex")+1);
					}
				}
			}
		   
		   return tempParaText;
	   }
	   
	   private static void closeStream(InputStream is) {  
	      if (is != null) {  
	         try {  
	            is.close();  
	         } catch (IOException e) {  
	            e.printStackTrace();  
	         }  
	      }  
	  } 
	   
	   public static boolean GenerateImage(String imgStr,String imgName)  
	    {   //对字节数组字符串进行Base64解码并生成图片  
	        if (imgStr == null) //图像数据为空  
	            return false;  
	        BASE64Decoder decoder = new BASE64Decoder();  
	        try   
	        {  
	            //Base64解码  
	            byte[] b = decoder.decodeBuffer(imgStr);  
	            for(int i=0;i<b.length;++i)  
	            {  
	                if(b[i]<0)  
	                {//调整异常数据  
	                    b[i]+=256;  
	                }  
	            }  
	            //生成jpeg图片  

	            String imgFilePath = imgName;//新生成的图片  
	            OutputStream out = new FileOutputStream(imgFilePath);      
	            out.write(b);  
	            out.flush();  
	            out.close();  
	            return true;  
	        }   
	        catch (Exception e)   
	        {  
	            return false;  
	        }  
	    }  
}
