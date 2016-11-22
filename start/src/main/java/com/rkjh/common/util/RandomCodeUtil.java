package com.rkjh.common.util;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

public class RandomCodeUtil {

	public static final int WIDTH=120;
	public static final int HEIGHT=35;

	
	
	/**
	 * 获取一张验证码图片
	 * @param req
	 * @return
	 * 
	 * ex:
	 * BufferedImage image = RandomCodeUtil.getImage(req);
	 * ImageIO.write(image, "jpg", resp.getOutputStream());
	 * 
	 */
	public static BufferedImage getImage(HttpServletRequest req)
	{
		BufferedImage bi=new BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_INT_RGB);
		Graphics g = bi.getGraphics();
		g.setColor(Color.WHITE);
		g.fillRect(0, 0, WIDTH, HEIGHT);
		g.setColor(new Color(204,204,204));
		g.drawRect(1, 1, WIDTH-2, HEIGHT-2);
		
		for(int i=0;i<5;i++)
		{
			g.setColor(Color.GREEN);
			int x1 = (new Random()).nextInt(30)+5;
			int y1 = (new Random()).nextInt(30);
			int x2 = (new Random()).nextInt(30)+85;
			int y2 = (new Random()).nextInt(30);
			g.drawLine(x1, y1, x2, y2);
		}
		
		g.setColor(Color.RED);
		String st="123465789";
		int x=5;
		
		Graphics2D gr=(Graphics2D)g;
		StringBuffer sb = new StringBuffer();
		for(int i=0;i<4;i++)
		{
			int degree=new Random().nextInt()%30;//旋转的弧度
			gr.rotate(degree*Math.PI/180,x,20);
			gr.setFont(new Font("宋体",Font.BOLD,20));
			String str = st.charAt(new Random().nextInt(st.length()))+"";
			gr.drawString(str, x, 20);
			sb= sb.append(str);
			gr.rotate(-degree*Math.PI/180,x,20);
			x+=30;
		}
		String tr = new String(sb);
		req.getSession().setAttribute("RANDOMCODE_IN_SESSION", tr);
		g.dispose();
		return bi;
	}
	
	/**
	 * 判断用户输入的验证码是否正确
	 * @param randomCode 真实的验证码
	 * @param inputCondeNum 用户输入的数据
	 * @return
	 * 
	 *ex:
	 *String inputnum = req.getParameter("yzm");
	 *if(!RandomCodeUtil.isPass(req, inputnum)){  .... }
	 */
	public static boolean isPass(HttpServletRequest req,String inputCondeNum)
	{
		String randomCode = (String) req.getSession().getAttribute("RANDOMCODE_IN_SESSION");
		if(hasLength(randomCode) && hasLength(inputCondeNum))
			 return randomCode.equals(inputCondeNum);
		return false;
	}
	
	public static boolean hasLength(String s)
	{
		return s!=null && !"".equals(s.trim());
	}
}
