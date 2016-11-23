package privilege;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;
import java.util.SortedMap;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.core.ApplicationPart;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;
import org.siphon.jssp.JsspRequest;

import Utils.HttpXmlUtils;
import Utils.ParseXMLUtils;
import Utils.RandCharsUtils;
import Utils.WXSignUtils;
import Utils.WeixinConfigUtils;
import entity.UnifiedQuery;
import entity.Unifiedorder;
import entity.UnifiedorderResult;

/**
 * ΢��֧������
 * @author xiebin
 * @date 2015��11��26������9:58:19
 */
public class WeixinPayTest {

	@SuppressWarnings("static-access")
	public static void main(String[] args) {
		//WeixinConfigUtils config = new WeixinConfigUtils();
		//功夫财经微信资料
		String appid = "wx2b2533783589cf47";//config.appid;
		System.out.println("appid"+appid);
		String mch_id = "1389223002";//config.mch_id;
		System.out.println("mch_id"+mch_id);
		String nonce_str = RandCharsUtils.getRandomString(16);
		System.out.println("nonce_str"+nonce_str);
		String body = "功夫财经订单";
		String detail = "功夫财经订单";
		String attach = "功夫财经订单";
		String out_trade_no = "2015112500001000811017342394";
		int total_fee = 1;//
		String spbill_create_ip = "127.0.0.1";
		String time_start = RandCharsUtils.timeStart();
		System.out.println(time_start);
		String time_expire = RandCharsUtils.timeExpire();
		System.out.println(time_expire);
		String notify_url = "";//config.notify_url;
		System.out.println("notify_url"+notify_url);
		String trade_type = "APP";
		
		
		//
		SortedMap<Object,Object> parameters = new TreeMap<Object,Object>();
		parameters.put("appid", appid);
		parameters.put("mch_id", mch_id);
		parameters.put("nonce_str", nonce_str);
		parameters.put("body", body);
		parameters.put("nonce_str", nonce_str);
		parameters.put("detail", detail);
		parameters.put("attach", attach);
		parameters.put("out_trade_no", out_trade_no);
		parameters.put("total_fee", total_fee);
		parameters.put("time_start", time_start);
		parameters.put("time_expire", time_expire);
		parameters.put("notify_url", notify_url);
		parameters.put("trade_type", trade_type);
		parameters.put("spbill_create_ip", spbill_create_ip);
		
		String sign = WXSignUtils.createSign("UTF-8", parameters);
		System.out.println("sign"+sign);
		

		Unifiedorder unifiedorder = new Unifiedorder();
		unifiedorder.setAppid(appid);
		unifiedorder.setMch_id(mch_id);
		unifiedorder.setNonce_str(nonce_str);
		unifiedorder.setSign(sign);
		unifiedorder.setBody(body);
		unifiedorder.setDetail(detail);
		unifiedorder.setAttach(attach);
		unifiedorder.setOut_trade_no(out_trade_no);
		unifiedorder.setTotal_fee(total_fee);
		unifiedorder.setSpbill_create_ip(spbill_create_ip);
		unifiedorder.setTime_start(time_start);
		unifiedorder.setTime_expire(time_expire);
		unifiedorder.setNotify_url(notify_url);
		unifiedorder.setTrade_type(trade_type);

		
		//XML
		String xmlInfo = HttpXmlUtils.xmlInfo(unifiedorder);
		
		String wxUrl = "https://api.mch.weixin.qq.com/pay/unifiedorder";
		
		String method = "POST";
		
		String weixinPost = HttpXmlUtils.httpsRequest(wxUrl, method, xmlInfo).toString();
		
		System.out.println(weixinPost);
		
		ParseXMLUtils.jdomParseXml(weixinPost);

	}
	
	public static String WeiXinPay(String order) {
		try{
			
	
		JSONObject jsStr = new JSONObject(order);
		//WeixinConfigUtils config = new WeixinConfigUtils();
				//功夫财经微信资料
			String out_trade_no_ = new SimpleDateFormat("yyyyMMdd").format(new Date())+System.currentTimeMillis();
				String appid = "wx2b2533783589cf47";//config.appid;
				System.out.println("appid"+appid);
				String mch_id = "1389223002";//config.mch_id;
				System.out.println("mch_id"+mch_id);
				String nonce_str = RandCharsUtils.getRandomString(16);
				System.out.println("nonce_str"+nonce_str);
				String body = jsStr.getString("description");
				String detail = jsStr.getString("description");
				String attach = jsStr.getString("gf_id");
				if(!jsStr.getString("type").equals("order"))
				{
					attach = "-"+attach;
				}
				String out_trade_no = jsStr.getString("order_no").equals("") ? out_trade_no_:jsStr.getString("order_no") == null ? out_trade_no_ : jsStr.getString("order_no");//"2015112500001000811017342394";
				int total_fee = jsStr.getInt("total")*1000;//
				String spbill_create_ip = "127.0.0.1";
				String time_start = RandCharsUtils.timeStart();
				System.out.println(time_start);
				String time_expire = RandCharsUtils.timeExpire();
				System.out.println(time_expire);
				String notify_url = "http://182.92.99.123:8080/privilege/notifyUrl/notifyUrl_Wx.jssp";//config.notify_url;
				System.out.println("notify_url"+notify_url);
				String trade_type = "APP";
			
		
				//
				SortedMap<Object,Object> parameters = new TreeMap<Object,Object>();
				parameters.put("appid", appid);
				parameters.put("mch_id", mch_id);
				parameters.put("nonce_str", nonce_str);
				parameters.put("body", body);
				//parameters.put("nonce_str", nonce_str);
				parameters.put("detail", detail);
				parameters.put("attach", attach);
				parameters.put("out_trade_no", out_trade_no);
				parameters.put("total_fee", total_fee);
				parameters.put("time_start", time_start);
				parameters.put("time_expire", time_expire);
				parameters.put("notify_url", notify_url);
				parameters.put("trade_type", trade_type);
				parameters.put("spbill_create_ip", spbill_create_ip);
				
				String sign = WXSignUtils.createSign("UTF-8", parameters);
				System.out.println("sign"+sign);
				

				Unifiedorder unifiedorder = new Unifiedorder();
				unifiedorder.setAppid(appid);
				unifiedorder.setMch_id(mch_id);
				unifiedorder.setNonce_str(nonce_str);
				unifiedorder.setSign(sign);
				unifiedorder.setBody(body);
				unifiedorder.setDetail(detail);
				unifiedorder.setAttach(attach);
				unifiedorder.setOut_trade_no(out_trade_no);
				unifiedorder.setTotal_fee(total_fee);
				unifiedorder.setSpbill_create_ip(spbill_create_ip);
				unifiedorder.setTime_start(time_start);
				unifiedorder.setTime_expire(time_expire);
				unifiedorder.setNotify_url(notify_url);
				unifiedorder.setTrade_type(trade_type);

				
				//XML
				String xmlInfo = HttpXmlUtils.xmlInfo(unifiedorder);
				
				String wxUrl = "https://api.mch.weixin.qq.com/pay/unifiedorder";
				
				String method = "POST";
				
				String weixinPost = HttpXmlUtils.httpsRequest(wxUrl, method, xmlInfo).toString();
				
				UnifiedorderResult re =ParseXMLUtils.jdomParseXml(weixinPost);
				String timestamp=(System.currentTimeMillis()/1000)+"";
				String nonce_str2 = RandCharsUtils.getRandomString(16);
				System.out.println("timestamp"+timestamp);
				SortedMap<Object,Object> parameters2 = new TreeMap<Object,Object>();
				parameters2.put("appid", appid);
				parameters2.put("partnerid", mch_id);
				parameters2.put("prepayid", re.getPrepay_id());
				
				parameters2.put("package", "Sign=WXPay");
				parameters2.put("noncestr", nonce_str2);
				parameters2.put("timestamp", timestamp);
				
				String sign2 = WXSignUtils.createSign("UTF-8", parameters2);
				re.setSign(sign2);
				re.setNonce_str(nonce_str2);
				re.setTimestamp(timestamp);
				String xmlInfo2 = HttpXmlUtils.xmlResult(re);
				System.out.println(weixinPost);
				
				ParseXMLUtils.jdomParseXml(weixinPost);
				return xmlInfo2;
}catch(Exception ex){
	System.out.println(ex.toString());
			return null;
		}
	}
	public static Map<String, String> wxRequestXMLToMap(HttpServletRequest request) throws Exception{
		// 从输入流读取返回内容
		System.out.println("------------XMLToMap执行start111------------");
		InputStream inputStream = request.getInputStream();
		InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "utf-8");
		BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
		String str = null;
		StringBuffer buffer = new StringBuffer();
		while ((str = bufferedReader.readLine()) != null) {
			buffer.append(str);
		}
		bufferedReader.close();
		inputStreamReader.close();
		inputStream.close();
		inputStream = null;
		System.out.println("------------XMLToMap执行end------------");
		System.out.println("------------从微信支付request返回的结果：------------"+buffer.toString());
		WriteTxt.contentToTxt("从微信支付request返回的结果："+buffer.toString());
		
		return CommonUtils.parseXml(buffer.toString());
	}
	public static String wxNotifyUrl(HttpServletRequest request){
		System.out.println("------------微信支付回调执行start111------------");
		String result="";
		try {
			Map<String, String> map=wxRequestXMLToMap(request);
			System.out.println("------------微信支付回调解析end------------");
			String returnCode="";
			String returnMsg="";
			boolean success=true;
			if (map.get("result_code").toString().equalsIgnoreCase("SUCCESS")) {
				boolean notifySuccess=verifyWXSignResponse(map);//校验微信支付返回的sign、signType
				if(notifySuccess){//成功则进行写表操作
					returnCode="<![CDATA[SUCCESS]]>";
					returnMsg="<![CDATA[OK]]>";
					success=true;
				}else{
					returnCode="<![CDATA[FAIL]]>";
					returnMsg="<![CDATA[校验sign错误]]>";
					success=false;
				}
			}else{
				returnCode="<![CDATA[FAIL]]>";
				returnMsg="<![CDATA[微信回调FAIL]]>";
				success=false;
			}
			//String text=returnWXNotify(returnCode,returnMsg);
			//text=text.replace("\"", "'");
				WriteTxt.contentToTxt("{\"gf_order_id\":\""+map.get("attach")+"\"}");
				WriteTxt.contentToTxt("微信支付完成");
				return "{\"gf_order_id\":\""+map.get("attach")+"\"}";// 告诉微信服务器，我收到信息了，不要在调用回调action了

			
		} catch (Exception e) {
			e.printStackTrace();
			WriteTxt.contentToTxt("微信支付出错："+e.getMessage());
		}
		WriteTxt.contentToTxt("------------微信支付回调执行end------------");
		return "fail";
	}
	public static String aliNotifyUrl2(HttpServletRequest request) {
		WriteTxt.contentToTxt("进入微信测试");
		return "{\"gf_order_id\":\"-292\"}";
	}
	/**
	 * @Title: verifyWXSignResponse
	 * @Description: TODO(校验微信支付返回的sign)
	 * @param @return    参数
	 * @return String    返回类型
	 * @throws
	 */
	private static boolean verifyWXSignResponse(Map<String,String> map){
		try {
		/*String signBack=map.get("sign");//返回的sign
		String sign="";
			
			SortedMap<Object,Object> parameters = new TreeMap<Object,Object>();
			parameters.put("appid", map.get("appid"));
			parameters.put("mch_id", map.get("mch_id"));
			parameters.put("nonce_str", map.get("nonce_str"));
			parameters.put("body", map.get("body"));
			//parameters.put("nonce_str", nonce_str);
			parameters.put("detail", map.get("detail"));
			parameters.put("attach", map.get("attach"));
			parameters.put("out_trade_no", map.get("out_trade_no"));
			parameters.put("total_fee", map.get("total_fee"));
			parameters.put("notify_url", map.get("notify_url"));
			parameters.put("trade_type", "APP");
			parameters.put("spbill_create_ip", map.get("spbill_create_ip"));
		    sign = WXSignUtils.createSign("UTF-8", parameters);

			if(!StringUtils.isEmpty(signBack)&&!StringUtils.isEmpty(sign)&&sign.equals(signBack)){//验证码sign成功
				WriteTxt.contentToTxt("sign比较成功，signBack="+signBack+" sign="+sign);
				return true;
			}else{
				WriteTxt.contentToTxt("sign比较失败，signBack="+signBack+" sign="+sign);
			}*/
		if(map.get("transaction_id")!=null||map.get("transaction_id")!=""){
			return true;
		}
		} catch (Exception e) {
			e.printStackTrace();
			WriteTxt.contentToTxt("微信验证失败，"+map.get("transaction_id"));
		}
		return false;
	}
	/**
	 * @Title: returnWXNotify
	 * @Description: TODO(回调返回给微信，告诉微信回调的结果)
	 * @param @return    参数
	 * @return String    返回类型
	 * @throws
	 */
	private static String returnWXNotify(String returnCode, String returnMsg) {
		/*<xml>
		  <return_code><![CDATA[SUCCESS]]></return_code>
		  <return_msg><![CDATA[OK]]></return_msg>
		</xml>*/
		String text="";
		Document document = DocumentHelper.createDocument();
		Element xmlEl=document.addElement("xml");
		xmlEl.addElement("return_code").setText(returnCode);
		xmlEl.addElement("return_msg").setText(returnMsg);
		text = document.asXML();
		WriteTxt.contentToTxt("notify_url回调返回给微信的数据: "+text);
		return text;
	}
	public static boolean orderquery(String out_trade_no){
		String appid = "wx2b2533783589cf47";//config.appid;
		System.out.println("appid"+appid);
		String mch_id = "1389223002";//config.mch_id;
		System.out.println("mch_id"+mch_id);
		String nonce_str = RandCharsUtils.getRandomString(16);
		System.out.println("nonce_str"+nonce_str);
		try {
			String sign="";
			SortedMap<Object,Object> parameters = new TreeMap<Object,Object>();
			parameters.put("appid", appid);
			parameters.put("mch_id", mch_id);
			parameters.put("out_trade_no",out_trade_no);
			parameters.put("nonce_str", nonce_str);

		    sign = WXSignUtils.createSign("UTF-8", parameters);
		    UnifiedQuery unifiedQuery = new UnifiedQuery();
		    unifiedQuery.setAppid(appid);
		    unifiedQuery.setMch_id(mch_id);
		    unifiedQuery.setOut_trade_no(out_trade_no);
		    unifiedQuery.setNonce_str(nonce_str);
		    unifiedQuery.setSign(sign);
		  //XML
			String xmlInfo = HttpXmlUtils.xmlQuery(unifiedQuery);
			
			String wxUrl = "https://api.mch.weixin.qq.com/pay/orderquery";
			
			String method = "POST";
			
			String weixinPost = HttpXmlUtils.httpsRequest(wxUrl, method, xmlInfo).toString();
			boolean flag=false;
			//执行10次查询直到查询成功
			for(int i=0;i<10;i++)
			{
				boolean t_flag=ParseXMLUtils.jdomParseOrderXml(weixinPost);
				if(t_flag)
				{
					flag=true;
					break;
				}
				Thread.sleep(1000);
			}
			return flag;
		}catch(Exception ex){
			System.out.println(ex.toString());
		}
		return false;
	}
}
