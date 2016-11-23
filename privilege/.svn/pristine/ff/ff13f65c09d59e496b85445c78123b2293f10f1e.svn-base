package privilege;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.unionpay.acp.sdk.LogUtil;
import com.unionpay.acp.sdk.SDKConfig;
import com.unionpay.acp.sdk.SDKConstants;
import com.unionpay.acp.sdk.SDKUtil;
import com.unionpay.acp.sdk.AcpService;



/**
 * 名称：商户后台通知类
 * 功能： 
 * 类属性：
 * 方法调用 版本：5.0 
 * 日期：2014-07 
 * 作者：中国银联ACP团队 
 * 版权：中国银联
 * 说明：以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。该代码仅供参考。
 * */

public class BackRcvResponse extends HttpServlet{

/**
	 * 
	 */
	private static final long serialVersionUID = 3414800502432002480L;

//	private static final long serialVersionUID = 7929266381995228569L;

	
	protected Map<String, String> doPost(HttpServletRequest req)
			throws ServletException, IOException {

		LogUtil.writeLog("BackRcvResponse接收后台通知开始");

		req.setCharacterEncoding("ISO-8859-1");
		String encoding = req.getParameter(SDKConstants.param_encoding);
		// 获取请求参数中所有的信息
		Map<String, String> reqParam = getAllRequestParam(req);
		// 打印请求报文
		LogUtil.printRequestLog(reqParam);

		Map<String, String> valideData = null;
		if (null != reqParam && !reqParam.isEmpty()) {
			Iterator<Entry<String, String>> it = reqParam.entrySet().iterator();
			valideData = new HashMap<String, String>(reqParam.size());
			while (it.hasNext()) {
				Entry<String, String> e = it.next();
				String key = (String) e.getKey();
				String value = (String) e.getValue();
				value = new String(value.getBytes("ISO-8859-1"), encoding);
				valideData.put(key, value);
				WriteTxt.contentToTxt("key："+key+",value："+value+"\r\n");
			}
		}
		Map<String, String> contentData = new HashMap<String, String>();
		/***银联全渠道系统，产品参数，除了encoding自行选择外其他不需修改***/
		contentData.put("version", "5.0.0");            //版本号 全渠道默认值
		contentData.put("encoding", "UTF-8");     //字符集编码 可以使用UTF-8,GBK两种方式
		contentData.put("signMethod", "01");           		 	//签名方法 目前只支持01：RSA方式证书加密
		contentData.put("txnType", "01");              		 	//交易类型 01:消费
		contentData.put("txnSubType", "01");           		 	//交易子类 01：消费
		contentData.put("bizType", "000201");          		 	//填写000201
		contentData.put("channelType", "08");          		 	//渠道类型 08手机
		/***商户接入参数***/
		contentData.put("merId", "777290058137424");   		 				//商户号码，请改成自己申请的商户号或者open上注册得来的777商户号测试
		contentData.put("accessType", "0");            		 	//接入类型，商户接入填0 ，不需修改（0：直连商户， 1： 收单机构 2：平台商户）
		contentData.put("orderId", valideData.get("orderId"));        	 	    //商户订单号，8-40位数字字母，不能含“-”或“_”，可以自行定制规则	
		contentData.put("txnTime", valideData.get("txnTime"));		 		    //订单发送时间，取系统时间，格式为YYYYMMDDhhmmss，必须取当前时间，否则会报txnTime无效
		contentData.put("accType", "01");					 	//账号类型 01：银行卡02：存折03：IC卡帐号类型(卡介质)
		contentData.put("txnAmt", valideData.get("txnAmt"));						//交易金额 单位为分，不能带小数点
		contentData.put("currencyCode", "156");                 //境内商户固定 156 人民币
		contentData.put("reqReserved", valideData.get("reqReserved"));

		// 验证签名
		if(AcpService.validate(contentData,  "UTF-8")){
			
			LogUtil.writeLog("验证签名结果[成功].");
			WriteTxt.contentToTxt("验证签名结果[成功].");
		} else {
			LogUtil.writeLog("验证签名结果[失败].");
			WriteTxt.contentToTxt("验证签名结果[失败].");
		}

		LogUtil.writeLog("BackRcvResponse接收后台通知结束");
		WriteTxt.contentToTxt("BackRcvResponse接收后台通知结束");
		return valideData;
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
			IOException {
		this.doPost(req, resp);
	}

	/**
	 * 获取请求参数中所有的信息
	 * 
	 * @param request
	 * @return
	 */
	public static Map<String, String> getAllRequestParam(final HttpServletRequest request) {
		Map<String, String> res = new HashMap<String, String>();
		Enumeration<?> temp = request.getParameterNames();
		if (null != temp) {
			while (temp.hasMoreElements()) {
				String en = (String) temp.nextElement();
				String value = request.getParameter(en);
				res.put(en, value);
				//在报文上送时，如果字段的值为空，则不上送<下面的处理为在获取所有参数数据时，判断若值为空，则删除这个字段>
				//System.out.println("ServletUtil类247行  temp数据的键=="+en+"     值==="+value);
				if (null == res.get(en) || "".equals(res.get(en))) {
					res.remove(en);
				}
			}
		}
		return res;
	}

}
