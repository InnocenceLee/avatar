package privilege;

public class SysCommConstant {
	/**
	 * 表中行数据状态：0已删除
	 */
	public static final String ROW_IS_DELETE_Y="0";
	/**
	 * 表中行数据状态：1未删除
	 */
	public static final String ROW_IS_DELETE_N="1";
	/**
	 * 用户操作结果--0000成功
	 */
	public static final String USER_OP_RESULT_SUCCESS="0000";
	/**
	 * 用户操作结果--0001失败
	 */
	public static final String USER_OP_RESULT_FAILED="0001";
	/**
	 * 资源表编码类型--indicator 指标
	 */
	public static final String CODE_VALUE_TYPE_INDICATOR="indicator";
	/**
	 * 接口请求返回标识--retMsg返回操作信息
	 */
	public static final String APPLICATION_RET_MSG="retMsg";
	/**
	 * 接口请求返回标识--retCode返回编码
	 */
	public static final String APPLICATION_RET_CODE="retCode";
	/**
	 * 接口请求返回标识--result返回查询结果
	 */
	public static final String APPLICATION_RET_RESULT="result";
	/**
	 * 淘宝开发者appkey+secret
	 */
	public static final String TAOBAO_SDK_URL="http://gw.api.taobao.com/router/rest";
	public static final String TAOBAO_SDK_APPKEY="23387614";
	public static final String TAOBAO_SDK_SERCRET="279fb5a1b4f4e47e25fff01b1ddb7354";
	/**
	 * 阿里大鱼短信验证签名
	 */
	public static final String TAOBAO_SDK_SMS_SIGNNAME="变更验证";
	/**
	 * 忘记密码
	 */
	public static final String TAOBAO_SDK_SMS_TYPE_0="0";
	public static final String TAOBAO_SDK_SMS_TYPE_FORGETPWD="SMS_10621134";
	/**
	 * 上传图片类型0：头像
	 */
	public static final String UPLOAD_PIC_TYPE_0="0";
	/**
	 * 上传图片类型1：注册时身份证
	 */
	public static final String UPLOAD_PIC_TYPE_1="1";
	/**
	 * 上传图片类型2：添加关爱人时身份证
	 */
	public static final String UPLOAD_PIC_TYPE_2="1";
	
	/**
	 * 默认每页返回的数据条数
	 */
	public static final int APPLICATION_DEFAULT_PAGESIZE= 10;

	/**
	 * 错误组
	 */
	public static final String ERROR_GROUP = "ERROR_GROUP";
	
	/**
	 * 访问拒绝，禁止无效访问，访问中必须带有token
	 */
	public static final String ERROR_ACCESS_DENIED = "ERROR_ACCESS_DENIED";
	
	/**
	 * token加密解密秘钥
	 */
	public static final String DES_KEY = "ASKGANGHOOD_DES_KEY_001";
	
	/**
	 * token信息之间的分隔符
	 */
	public static final String SPLIT_TOKEN_CHAR = "\\|\\|";

	
	public static final String ACCESS_ERROR_TIP = "接口访问出错";
	
	/**
	 * 重置密码功能
	 */
	public final static String BP_DEFAULT_PASS = "BP_DEFAULT_PASS";
	/**
	 * 微信支付--appID
	 */
	public final static String WX_PAY_APPID="wx68d88bd6a9663e6f";
	/**
	 * 微信支付--appsecret
	 */
	public final static String WX_PAY_APPSECRET="3f88471739b08c9425c46b131de06e55";
	/**
	 * 微信支付--商户ID
	 */
	public final static String WX_PAY_MCH_ID="1341858301";
	
	/**
	 * 微信支付--package
	 */
	public final static String WX_PACKAGE="Sign=WXPay";
	
	/**
	 * 微信支付--签名key
	 */
	public final static String WX_PAY_KEY="cheyoutianxiahiroadcheyoutianxia";
	public final static String WX_PAY_NOTIFY_URL="http://hiroad-share.hi-road.com/share/fenxiang.html";
	
	/**
	 * 支付宝支付--公钥
	 */
	public final static String ALI_PUBLIC_KEY="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDb0zFGiOLKPgrWr+QYCo0JcP2K"
			+"WwGQ8a8tTosA5C8lcOuM1t7ETRVV+HNDU+qx6/xSDg/mzZq3OfAKummgjUSOL1eh"
			+"VfOEJ3U4UTFYRQplOwQqMnISFz8IhFN2oBCn+yTO0swHv7CgJ0PRz7J/XdQBG32w"
			+"hNFSB8YOqHUSA338/QIDAQAB";
	/**
	 * 支付宝支付--私钥
	 */
	public final static String ALI_PRIVATE_KEY="MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBANvTMUaI4so+Ctav"
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
	/**
	 * 支付宝支付--签约合作者身份ID
	 */
	public final static String ALI_PARTNER="2088421369842940";
	/**
	 * 支付宝支付--签约卖家支付宝账号
	 */
	public final static String ALI_SELLER="cdavatar@aliyun.com";
	/**
	 * 支付宝支付--服务接口名称， 固定值
	 */
	public final static String ALI_SERVICE="mobile.securitypay.pay";
	/**
	 * 支付宝支付--支付类型， 固定值
	 */
	public final static String ALI_PAYMENT_TYPE="1";
	/**
	 * 支付宝支付--参数编码， 固定值
	 */
	public final static String ALI_INPUT_CHARSET="utf-8";
	/**
	 * 设置未付款交易的超时时间
	 */
	public final static String ALI_IT_B_PAY="30m";
	/**
	 * 签名类型，目前仅支持RSA
	 */
	public final static String ALI_SIGN_TYPE="RSA";
	
	/****************友盟推送-start******************/
	
	/**
	 * android-设备
	 */
	public final static String ANDROID_DEVICE="android";
	/**
	 * 友盟android-APPKey
	 */
	public final static String UMENG_ANDROID_APP_KEY="57281c2b67e58e6d1b000185";
	/**
	 * 友盟android-APP_MASTER_SECRET
	 */
	public final static String UMENG_ANDROID_APP_MASTER_SECRET="5ornt0lx04zqiwhg1euwrn8euxu8ku0v";
	
	/**
	 * ios-设备
	 */
	public final static String IOS_DEVICE="ios";
	/**
	 * 友盟IOS-APPKey
	 */
	public final static String UMENG_IOS_APP_KEY="57281cc367e58e0aea0001b3";
	/**
	 * 友盟IOS-APP_MASTER_SECRET
	 */
	public final static String UMENG_IOS_APP_MASTER_SECRET="rzxtpjvep23h2wispfmuusmwyqgg43w0";
	
	/****************友盟推送-end******************/
	
	
	
	/****************友盟即时通讯-start******************/
	
	/**
	 * 友盟APP_MASTER_SECRET
	 */
	public final static String UMENG_APP_MASTER_SECRET="7c36cf350525f1d98aa30b5715c4ed46";
	/**
	 * 友盟UMENG_IM_APP_KEY
	 */
	public final static String UMENG_IM_APP_KEY="23358383";
	/**
	 * 友盟IM群默认名称
	 */
	public final static String UMENG_IM_TRIBE_NAME="茶馆";
	/**
	 * 友盟IM群默认公告
	 */
	public final static String UMENG_IM_TRIBE_NOTICE="默认公告";
	/**
	 * 友盟IM群类型
	 */
	public final static Long UMENG_IM_TRIBE_TYPE=0L;
	/**
	 * 友盟IM群管理员账号
	 */
	public final static String UMENG_IM_ADMIN_ID="admin";
	/**
	 * 友盟IM账号默认密码
	 */
	public final static String UMENG_IM_USER_PASSWORD="123456";
	
	/****************友盟即时通讯-end******************/
}
