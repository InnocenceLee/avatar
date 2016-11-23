package Utils;

import java.io.IOException;
import java.io.StringReader;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.xml.sax.InputSource;

import entity.UnifiedQuery;
import entity.UnifiedorderResult;

public class ParseXMLUtils {

	/**
	 * 1��DOM����
	 */
	@SuppressWarnings("rawtypes")
	public static void beginXMLParse(String xml){
		Document doc = null;
		try {
			doc = DocumentHelper.parseText(xml); // ���ַ���תΪXML

			Element rootElt = doc.getRootElement(); // ��ȡ���ڵ�smsReport

			System.out.println("���ڵ��ǣ�"+rootElt.getName());

			Iterator iters = rootElt.elementIterator("sendResp"); // ��ȡ���ڵ��µ��ӽڵ�sms

			while (iters.hasNext()) {
				Element recordEle1 = (Element) iters.next();
				Iterator iter = recordEle1.elementIterator("sms");

				while (iter.hasNext()) {
					Element recordEle = (Element) iter.next();
					String phone = recordEle.elementTextTrim("phone"); // �õ�sms�ڵ��µ��ӽڵ�statֵ

					String smsID = recordEle.elementTextTrim("smsID"); // �õ�sms�ڵ��µ��ӽڵ�statֵ

					System.out.println(phone+":"+smsID);
				}
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 2��DOM4j����XML��֧��xpath��
	 * ������ʱ���Զ�ȥ��CDMA
	 * @param xml
	 */
	public static void xpathParseXml(String xml){
		try { 
			StringReader read = new StringReader(xml);
			SAXReader saxReader = new SAXReader();
			Document doc = saxReader.read(read);
			String xpath ="/xml/appid";
			System.out.print(doc.selectSingleNode(xpath).getText());  
		} catch (DocumentException e) {
			e.printStackTrace();
		}  
	}

	/**
	 * 3��JDOM����XML
	 * ������ʱ���Զ�ȥ��CDMA
	 * @param xml
	 */
	@SuppressWarnings("unchecked")
	public static UnifiedorderResult jdomParseXml(String xml){
		UnifiedorderResult re = new UnifiedorderResult();
		try { 
			
			StringReader read = new StringReader(xml);
			// �����µ�����ԴSAX ��������ʹ�� InputSource ������ȷ����ζ�ȡ XML ����
			InputSource source = new InputSource(read);
			// ����һ���µ�SAXBuilder
			SAXBuilder sb = new SAXBuilder();
			// ͨ������Դ����һ��Document
			org.jdom.Document doc;
			doc = (org.jdom.Document) sb.build(source);

			org.jdom.Element root = doc.getRootElement();// ָ����ڵ�
			List<org.jdom.Element> list = root.getChildren();
			
			if(list!=null&&list.size()>0){
				for (org.jdom.Element element : list) {
					System.out.println("key"+element.getName()+"Text"+element.getText());
					if(element.getName().equals("return_code"))
					{
						re.setReturn_code(element.getText());
					}else if(element.getName().equals("return_msg"))
					{
						re.setReturn_msg(element.getText());
					}else if(element.getName().equals("appid"))
					{
						re.setAppid(element.getText());
					}else if(element.getName().equals("mch_id"))
					{
						re.setMch_id(element.getText());
					}else if(element.getName().equals("nonce_str"))
					{
						re.setNonce_str(element.getText());
					}else if(element.getName().equals("sign"))
					{
						re.setSign(element.getText());
					}else if(element.getName().equals("result_code"))
					{
						re.setResult_code(element.getText());
					}else if(element.getName().equals("prepay_id"))
					{
						re.setPrepay_id(element.getText());
					}else if(element.getName().equals("trade_type"))
					{
						re.setTrade_type(element.getText());
					}
					/*try{
						methodName =  element.getName();
						Method m = v.getClass().getMethod("set" + methodName, new Class[] { String.class });
						if(parseInt(methodName)){
							m.invoke(v, new Object[] { Integer.parseInt(element.getText()) });
						}else{
							m.invoke(v, new Object[] { element.getText() });
						}
					}catch(Exception ex){
						ex.printStackTrace();
					}*/

				}
			}

		} catch (JDOMException e) {
			e.printStackTrace();
		}  catch (IOException e) {
			e.printStackTrace();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return re;
	}
	/**
	 * 解析查询结果
	 * @param xml
	 */
	@SuppressWarnings("unchecked")
	public static boolean jdomParseOrderXml(String xml){
		UnifiedQuery re = new UnifiedQuery();
		try { 
			
			StringReader read = new StringReader(xml);
			// �����µ�����ԴSAX ��������ʹ�� InputSource ������ȷ����ζ�ȡ XML ����
			InputSource source = new InputSource(read);
			// ����һ���µ�SAXBuilder
			SAXBuilder sb = new SAXBuilder();
			// ͨ������Դ����һ��Document
			org.jdom.Document doc;
			doc = (org.jdom.Document) sb.build(source);

			org.jdom.Element root = doc.getRootElement();// ָ����ڵ�
			List<org.jdom.Element> list = root.getChildren();
			
			if(list!=null&&list.size()>0){
				for (org.jdom.Element element : list) {
					if(element.getName().equals("trade_state"))
					{
						if(element.getText().equals("SUCCESS"))
						{
							return true;
						}
					}
				}
			}

		} catch (JDOMException e) {
			e.printStackTrace();
		}  catch (IOException e) {
			e.printStackTrace();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	public static boolean parseInt(String key){
		if(!StringUtils.isEmpty(key)){
			if(key.equals("total_fee")||key.equals("cash_fee")||key.equals("coupon_fee")||key.equals("coupon_count")||key.equals("coupon_fee_0")){
				return true;
			}
		}

		return false;
	}



	


}
