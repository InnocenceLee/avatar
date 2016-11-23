package privilege;

import java.io.InputStream;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

public class WCPayUtils {
	/**
	 * 将微信支付所需参数拼接为xml字符串
	 * @param <T>
	 * 
	 * @param paramsMap
	 * @return 
	 * @throws Exception
	 */
	public static <T> String getXmlFromParamsMap(Map<String, T> paramsMap) throws Exception {
		if (paramsMap != null && paramsMap.size() > 0) {
			Map<String, Object> params = new TreeMap<String, Object>(new Comparator<String>() {
				public int compare(String s1, String s2) {
					return s1.compareTo(s2);
				}
			});
			params.putAll(paramsMap);
			StringBuffer ss = new StringBuffer("<xml>");
			for (Entry<String, Object> param : params.entrySet()) {
				if (!"key".equals(param.getKey())) {
					ss.append("<" + param.getKey() + "><![CDATA[").append(param.getValue())
							.append("]]></" + param.getKey() + ">");
				}
			}
			String sign = getSignFromParamMap(params);
			ss.append("<sign>" + sign + "</sign>");
			ss.append("</xml>");
			String xmlString = ss.toString();
			return new String(xmlString.getBytes(), "ISO-8859-1");
		}
		return null;
	}
	
	/**
	 * 从xml字符串中解析参数
	 * @param xml
	 * @return
	 * @throws Exception
	 */
	public static Map<String, String> getParamsMapFromXml(InputStream xml) throws Exception {
		Map<String, String> params = new HashMap<String, String>(0);
		SAXReader saxReader = new SAXReader();
		Document read = saxReader.read(xml);
		Element node = read.getRootElement();
		listNodes(node, params);
		return params;
	}

	/**
	 * 生成count位的随机数
	 * 
	 * @param count
	 * @return
	 */
	public static String getRandomNumber(int count) {
		StringBuffer ss = new StringBuffer(count);
		for (int i = 0; i < count; i++) {
			int a = (int) (Math.random() * 10);
			ss.append(a);
		}
		return ss.toString();
	}

	@SuppressWarnings({ "unchecked" })
	public static void listNodes(Element node, Map<String, String> params) {
		// 获取当前节点的所有属性节点
		List<Attribute> list = node.attributes();
		// 遍历属性节点
		if ((list == null || list.size() == 0) && !(node.getTextTrim().equals(""))) {
			if(node.getTextTrim().contains("<![CDATA[")){
				String[] split = node.getTextTrim().split("<![CDATA[");
				split[1].replaceAll("]]>", "");
				params.put(node.getName(), split[1]);
			}else{
				params.put(node.getName(),node.getTextTrim());
			}
		}
		// 当前节点下面子节点迭代器
		Iterator<Element> it = node.elementIterator();
		// 遍历
		while (it.hasNext()) {
			// 获取某个子节点对象
			Element e = it.next();
			// 对子节点进行遍历
			listNodes(e, params);
		}
	}
	
	/**
	 * 从map中获取签名sign
	 * @param paramsMap
	 * @return
	 * @throws Exception
	 */
	public static <T> String getSignFromParamMap(Map<String, T> paramsMap) throws Exception{
		if (paramsMap != null && paramsMap.size() > 0) {
			Map<String, T> params = new TreeMap<String, T>(new Comparator<String>() {
				public int compare(String s1, String s2) {
					return s1.compareTo(s2);
				}

			});
			params.putAll(paramsMap);
			StringBuffer tempStr = new StringBuffer();
			for (Entry<String, T> param : params.entrySet()) {
				if (!"sign".equals(param.getKey()) && !"key".equals(param.getKey()) 
						&& !"".equals(param.getValue()) && param.getValue() != null) {
					tempStr.append(param.getKey() + "=" + param.getValue() + "&");
				}
			}
			String temp = tempStr.toString().concat("key="+params.get("key"));
			return MD5Utils.getMD5(temp).toUpperCase();
		}
		return null;
	}
	
	/**
	 * 签名认证
	 * @param paramsMap
	 * @return
	 * @throws Exception
	 */
	public static <T> boolean checkSign(Map<String, T> paramsMap) throws Exception {
			String sign = getSignFromParamMap(paramsMap);
			return paramsMap.get("sign").equals(sign);
	}

}
