package privilege;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import com.alibaba.fastjson.JSON;
import com.alipay.config.AlipayConfig;
import com.alipay.sign.RSA;
import com.alipay.util.AlipayCore;
import com.alipay.util.AlipayNotify;
import com.alipay.util.httpClient.HttpRequest;
import com.alipay.util.httpClient.HttpResultType;

public class AliPay {
	public static String Alipay(String order) {
		try {
			JSONObject jsStr = new JSONObject(order); // 将字符串{“id”：1}
			String out_trade_no_ = new SimpleDateFormat("yyyyMMdd").format(new Date()) + System.currentTimeMillis();
			Map<String, String> sParaTemp = new HashMap<String, String>();
			sParaTemp.put("service", "mobile.securitypay.pay");
			sParaTemp.put("partner", "2088421369842940");
			sParaTemp.put("_input_charset", "utf-8");
			HttpRequest request = new HttpRequest(HttpResultType.BYTES);
//			String notifyUrl = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+"/start/pay/receiveALIResult";
			String notifyUrl = "http://182.92.99.123:8080/privilege/notifyUrl/notifyUrl_Ali.jssp";
			String notifyUrl_ = URLEncoder.encode(notifyUrl, "UTF-8");
			sParaTemp.put("notify_url", "http://182.92.99.123:8080/privilege/notifyUrl/notifyUrl_Ali.jssp");
//			sParaTemp.put("notify_url", "http://localhost:8080/alipay/notify_url.jsp");
			sParaTemp.put("out_trade_no",jsStr.getString("order_no").equals("") ? out_trade_no_: jsStr.getString("order_no") == null ? out_trade_no_ : jsStr.getString("order_no"));

			
			sParaTemp.put("return_url", "www");
			sParaTemp.put("seller_id", "2088421369842940");

			sParaTemp.put("subject", jsStr.getString("description"));
			sParaTemp.put("total_fee",jsStr.getInt("total")+"");
			if(jsStr.getString("type").equals("order"))
			{
				sParaTemp.put("payment_type", "0");
			}else{
				sParaTemp.put("payment_type", "1");
			}
			sParaTemp.put("body",jsStr.getString("gf_id"));
					//(jsStr.get("total") == "" ? 1 : jsStr.get("total") == null ? 1 : jsStr.get("total")) + "");
			String LinkString = AlipayCore.createLinkString(sParaTemp);
			String sign_ = RSA.sign(LinkString, SysCommConstant.ALI_PRIVATE_KEY, "UTF-8");
			String sign = URLEncoder.encode(sign_, "UTF-8");
			//String newSign = new String(sign_.getBytes("US-ASCII"),"UTF-8");
			sParaTemp.put("sign", sign);
			sParaTemp.put("sign_type", "RSA");
			// String result = JSON.toJSONString(sParaTemp);
			boolean t = RSA.verify(LinkString, sign_, SysCommConstant.ALI_PUBLIC_KEY, "utf-8");
			String LinkString2 = AlipayCore.createLinkString(sParaTemp);
			
			return LinkString2;
		} catch (Exception ex) {
			System.out.println(ex.toString());
			return null;
		}
	}
	/**
	支付宝回调接口
	*/
	public static String aliNotifyUrl(String params) {
//		HttpRequest request = new HttpRequest(HttpResultType.BYTES);
//		HttpResponse respon =new HttpResponse();
		String result = "";
		JSONObject jsStr = new JSONObject(params);
		try {
			//String LinkString =(String)session.getAttribute("LinkString");
			//boolean isVerify = RSA.verify(LinkString, jsStr.getString("sign"), SysCommConstant.ALI_PUBLIC_KEY, "utf-8");
		
			Map<String, String> map = (Map<String, String>)JSON.parse(params);
			contentToTxt(params);
			boolean isVerify=AlipayNotify.verify(map);
			contentToTxt(isVerify+"");
			if(isVerify){//校验成功
				if(map.get("payment_type")=="0")
				{
					contentToTxt("{\"gf_order_id\":\""+map.get("body")+"\"}");
					return "{\"gf_order_id\":\""+map.get("body")+"\"}";
				}else{
					contentToTxt("{\"gf_order_id\":\"-"+map.get("body")+"\"}");
					return "{\"gf_order_id\":\"-"+map.get("body")+"\"}";
				}
			}else{//校验失败
				return "fail";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	/**
	支付宝查询接口
	*/
	public static String aliTrade(String params) {
//		HttpRequest request = new HttpRequest(HttpResultType.BYTES);
//		HttpResponse respon =new HttpResponse();
		String result = "";
		JSONObject jsStr = new JSONObject(params);
		try {
			//String LinkString =(String)session.getAttribute("LinkString");
			//boolean isVerify = RSA.verify(LinkString, jsStr.getString("sign"), SysCommConstant.ALI_PUBLIC_KEY, "utf-8");
		
			Map<String, String> map = (Map<String, String>)JSON.parse(params);
			contentToTxt(params);
			boolean isVerify=AlipayNotify.verify(map);
			contentToTxt(isVerify+"");
			if(isVerify){//校验成功
				if(map.get("payment_type")=="0")
				{
					contentToTxt("{\"gf_order_id\":\""+map.get("body")+"\"}");
					return "{\"gf_order_id\":\""+map.get("body")+"\"}";
				}else{
					contentToTxt("{\"gf_order_id\":\"-"+map.get("body")+"\"}");
					return "{\"gf_order_id\":\"-"+map.get("body")+"\"}";
				}
			}else{//校验失败
				return "fail";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	public static void contentToTxt(String content) {  
        String str = new String(); //原有txt内容  
        String s1 = new String();//内容更新  
        try {  
            File f = new File("D:\\alipay.txt");  
            if (f.exists()) {  
                System.out.print("文件存在");  
            } else {  
                System.out.print("文件不存在");  
                f.createNewFile();// 不存在则创建  
            }  
            BufferedReader input = new BufferedReader(new FileReader(f));  
  
            while ((str = input.readLine()) != null) {  
                s1 += str + "\r\n";  
            }  
            System.out.println(s1);  
            input.close();  
            s1 += content;  
  
            BufferedWriter output = new BufferedWriter(new FileWriter(f));  
            output.write(s1);  
            output.close();  
        } catch (Exception e) {  
            e.printStackTrace();  
  
        }  
    }  
  
}
