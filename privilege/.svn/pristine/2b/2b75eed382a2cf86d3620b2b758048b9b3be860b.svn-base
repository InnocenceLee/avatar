package privilege;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.net.ConnectException;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.net.ssl.HttpsURLConnection;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.alibaba.fastjson.JSONObject;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.core.util.QuickWriter;
import com.thoughtworks.xstream.io.HierarchicalStreamWriter;
import com.thoughtworks.xstream.io.xml.PrettyPrintWriter;
import com.thoughtworks.xstream.io.xml.XppDriver;

public class CommonUtils {
	private static Logger log = Logger.getLogger(CommonUtils.class);
	
	public static JSONObject httpsRequestToJsonObject(String requestUrl, String requestMethod, String outputStr) {
		JSONObject jsonObject = null;
		try {
			StringBuffer buffer = httpsRequest(requestUrl, requestMethod, outputStr);
			jsonObject = JSONObject.parseObject(buffer.toString(), JSONObject.class);
		} catch (ConnectException ce) {
			log.error("连接超时：" + ce.getMessage());
		} catch (Exception e) {
			log.error("https请求异常：" + e.getMessage());
		}
		return jsonObject;
	}

	public static StringBuffer httpsRequest(String requestUrl, String requestMethod, String output)
			throws NoSuchAlgorithmException, NoSuchProviderException, KeyManagementException, MalformedURLException,
			IOException, ProtocolException, UnsupportedEncodingException {
		URL url = new URL(requestUrl);
		HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
		connection.setDoOutput(true);
		connection.setDoInput(true);
		connection.setUseCaches(false);
		connection.setRequestMethod(requestMethod);
		if (null != output) {
			OutputStream outputStream = connection.getOutputStream();
			outputStream.write(output.getBytes("UTF-8"));
			outputStream.close();
		}
		// 从输入流读取返回内容
		InputStream inputStream = connection.getInputStream();
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
		connection.disconnect();
		return buffer;
	}

	/**
	 * @Title: requestToMap @Description: TODO(请求报文转成Map) @param @param
	 * request @param @return @param @throws Exception 参数 @return
	 * Map<String,String> 返回类型 @throws
	 */
	// public static Map<String, String> requestXMLToMap(HttpServletRequest
	// request) throws Exception{
	// // 从输入流读取返回内容
	// InputStream inputStream = request.getInputStream();
	// InputStreamReader inputStreamReader = new InputStreamReader(inputStream,
	// "utf-8");
	// BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
	// String str = null;
	// StringBuffer buffer = new StringBuffer();
	// while ((str = bufferedReader.readLine()) != null) {
	// buffer.append(str);
	// }
	// bufferedReader.close();
	// inputStreamReader.close();
	// inputStream.close();
	// inputStream = null;
	// return parseXml(buffer.toString());
	// }

	public static String create_nonce_str() {
		return UUID.randomUUID().toString().replace("-", "");
	}

	/**
	 * 将字节数组转换为十六进制字符串
	 * 
	 * @param byteArray
	 * @return
	 */
	public static String byteToStr(byte[] byteArray) {
		String strDigest = "";
		for (int i = 0; i < byteArray.length; i++) {
			strDigest += byteToHexStr(byteArray[i]);
		}
		return strDigest;
	}

	/**
	 * 将字节转换为十六进制字符串
	 * 
	 * @param btyes
	 * @return
	 */
	public static String byteToHexStr(byte bytes) {
		String ret = "";
		String hex = Integer.toHexString(bytes & 0xFF);
		if (hex.length() == 1) {
			hex = '0' + hex;
		}
		ret += hex.toUpperCase();
		return ret;
	}

	/**
	 * 获取ip地址
	 * 
	 * @param request
	 * @return
	 */
	// public static String getIpAddr(HttpServletRequest request) {
	// InetAddress addr = null;
	// try {
	// addr = InetAddress.getLocalHost();
	// } catch (UnknownHostException e) {
	// return request.getRemoteAddr();
	// }
	// byte[] ipAddr = addr.getAddress();
	// String ipAddrStr = "";
	// for (int i = 0; i < ipAddr.length; i++) {
	// if (i > 1) {
	// ipAddrStr += ".";
	// }
	// ipAddrStr += ipAddr[i];
	// }
	// return ipAddrStr;
	// }


	@SuppressWarnings("unchecked")
	public static Map<String, String> parseXml(String xml) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		Document document = DocumentHelper.parseText(xml);
		Element root = document.getRootElement();
		List<Element> elementList = root.elements();
		for (Element e : elementList)
		{
			map.put(e.getName(), e.getText());
			System.out.println(e.getName()+"："+e.getText());
		}
			
		System.out.println("------------Map转换end------------");
		return map;
	}

	public static Map<String, String> parseUrlString(String str) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		String[] arrays=str.split("&");
		for (String array : arrays) {
			String[] keyValue=array.split("=");
			map.put(keyValue[0], keyValue[1]);
		}
		return map;
	}
	
	/**
	 * @Title: httpsRequestToXML @Description: TODO(调用统一下单接口) @param @param
	 * requestUrl @param @param requestMethod @param @param
	 * outputStr @param @return 参数 @return Map<String,String> 返回类型 @throws
	 */
	public static Map<String, String> httpsRequestToXML(String requestUrl, String requestMethod, String outputStr) {
		Map<String, String> result = new HashMap<>();
		try {
			StringBuffer buffer = httpsRequest(requestUrl, requestMethod, outputStr);
			result = parseXml(buffer.toString());
		} catch (ConnectException ce) {
			log.error("连接超时：" + ce.getMessage());
		} catch (Exception e) {
			log.error("https请求异常：" + e);
		}
		return result;
	}

}

/**
 * 获取用户的openId，并放入session
 * 
 * @param code
 *            微信返回的code
 *//*
	 * private void setOpenId(String code) { session.put("code", code); String
	 * oauth_url = Constants.oauth_url.replace("APPID",
	 * Constants.appid).replace("SECRET", Constants.appsecret).replace("CODE",
	 * String.valueOf(session.get("code"))); log.info("oauth_url:"+oauth_url);
	 * JSONObject jsonObject = CommonUtil.httpsRequestToJsonObject(oauth_url,
	 * "POST", null); log.info("jsonObject:"+jsonObject); Object errorCode =
	 * jsonObject.get("errcode"); if(errorCode != null) { log.info("code不合法");
	 * }else{ String openId = jsonObject.getString("openid");
	 * log.info("openId:"+openId); session.put("openId", openId); }
	 */
