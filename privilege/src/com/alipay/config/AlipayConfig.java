package com.alipay.config;
/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *版本：3.3
 *日期：2012-08-10
 *说明：
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
	
 *提示：如何获取安全校验码和合作身份者ID
 *1.用您的签约支付宝账号登录支付宝网站(www.alipay.com)
 *2.点击“商家服务”(https://b.alipay.com/order/myOrder.htm)
 *3.点击“查询合作者身份(PID)”、“查询安全校验码(Key)”

 *安全校验码查看时，输入支付密码后，页面呈灰色的现象，怎么办？
 *解决方法：
 *1、检查浏览器配置，不让浏览器做弹框屏蔽设置
 *2、更换浏览器或电脑，重新登录查询。
 */

public class AlipayConfig {
	
	//↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
	// 合作身份者ID，以2088开头由16位纯数字组成的字符串
	public static String partner = "2088421369842940";
	// 商户的私钥
	public static String private_key = "MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBANvTMUaI4so+Ctav"
			+"5BgKjQlw/YpbAZDxry1OiwDkLyVw64zW3sRNFVX4c0NT6rHr/FIOD+bNmrc58Aq6"
			+"aaCNRI4vV6FV84QndThRMVhFCmU7BCoychIXPwiEU3agEKf7JM7SzAe/sKAnQ9HP"
			+"sn9d1AEbfbCE0VIHxg6odRIDffz9AgMBAAECgYAoUiumqXMX75tjV6357u2BvtTy"
			+"rNCzunEMWWzLxA8Vygmassr3rL/uHf1eayUQb52/m061Yh8v3pO2FA1N4ruhFcxe"
			+"wSL5NRGMCdHuRNwvYDWNqRf6MQaFXqi24ZP+Ngwr4U5+Pr9G/4q0MC07QWfztM91"
			+"xKVhja6n5YUuttOoYQJBAPp6h8kI/90rN7N3DiEmgFHQPH+96aJ5+7mzzJiQs5j9"
			+"h7pwIj3xXtEogK7WcQI5qd0LFUQ6by8t4sHN5PZdHSUCQQDgq65gu4fCs8cWbzgV"
			+"6Qr1aDEbjU7U4o7SSdnPumVAbwEgnSg+Wu9UPS7zYjDYCAjQymtKkvag9vKsud5y"
			+"gtT5AkEAqMfiMZwn1V+m0/6YfcwU0YxRB/7vrPUno3W9mtx+uMu2JvIikLzRmH0D"
			+"YUzMr6Qtiu5J8USy4Qa5csCL1VrfJQJBAIamnlYfTphkgtdxRN3s08KM9ZGbuTlh"
			+"p1NlK4OSJQje/n/7cJkeiv2jxbXcjYWMGyx3hKInPmTuXDclFqruupECQQCwTXVl"
			+"FpReRPuJXfyCIYTUxBneWIgatYbeZBGMF/RWrvain5X1qqQCtEqVCWDo6xIqB4K0"
			+"MV058+D6IWIMEZ+h";
	// 支付宝的公钥，无需修改该值
	public static String ali_public_key  = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDb0zFGiOLKPgrWr+QYCo0JcP2K"
			+"WwGQ8a8tTosA5C8lcOuM1t7ETRVV+HNDU+qx6/xSDg/mzZq3OfAKummgjUSOL1eh"
			+"VfOEJ3U4UTFYRQplOwQqMnISFz8IhFN2oBCn+yTO0swHv7CgJ0PRz7J/XdQBG32w"
			+"hNFSB8YOqHUSA338/QIDAQAB";

	//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	public static final String SIGN_ALGORITHMS = "SHA1WithRSA";

	// 调试用，创建TXT日志文件夹路径
	public static String log_path = "D:\\";

	// 字符编码格式 目前支持 gbk 或 utf-8
	public static String input_charset = "utf-8";
	
	// 签名方式 不需修改
	public static String sign_type = "RSA";

}
