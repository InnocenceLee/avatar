package privilege;

import com.gexin.rp.sdk.base.IPushResult;
import com.gexin.rp.sdk.base.ITemplate;
import com.gexin.rp.sdk.base.impl.AppMessage;
import com.gexin.rp.sdk.base.impl.ListMessage;
import com.gexin.rp.sdk.base.impl.SingleMessage;
import com.gexin.rp.sdk.base.impl.Target;
import com.gexin.rp.sdk.base.payload.APNPayload;
import com.gexin.rp.sdk.exceptions.RequestException;
import com.gexin.rp.sdk.http.IGtPush;
import com.gexin.rp.sdk.template.APNTemplate;
import com.gexin.rp.sdk.template.LinkTemplate;
import com.gexin.rp.sdk.template.NotificationTemplate;
import com.gexin.rp.sdk.template.TransmissionTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
public class AppPush {
	//????, appId?appKey?masterSecret ????? "??? ?????? "????????
	private static String appId = "L2hxk8Dkyl9rcZ8XK38px5";
	private static String appKey = "9Pcq3lzWdBAPJIdBOjXwT7";
	private static String masterSecret = "tInc2D8x3y7Lv716jjI1Q9";
	private static String url = "http://sdk.open.api.igexin.com/apiex.htm";
	public static String Push2(String title,String text) throws IOException {
		IGtPush push = new IGtPush(url, appKey, masterSecret);
		// ??"??????????"????????????
		LinkTemplate template = new LinkTemplate();
		template.setAppId(appId);
		template.setAppkey(appKey);
		template.setTitle(title);
		template.setText(text);
		template.setUrl("http://getui.com");
		List<String> appIds = new ArrayList<String>();
		appIds.add(appId);
		// ??"AppMessage"?????????????????????App?????????????????????(????)
		AppMessage message = new AppMessage();
		message.setData(template);
		message.setAppIdList(appIds);
		message.setOffline(true);
		message.setOfflineExpireTime(1000 * 600);
		IPushResult ret = push.pushMessageToApp(message);
		System.out.println(ret.getResponse().toString());
		return ret.getResponse().get("result").toString();
	}
	//单个PUSH入口！！！
	public static String Push(String title,String text){
	 IGtPush push = new IGtPush(url, appKey, masterSecret);
	 ITemplate template = null;
	 template = getTemplate(title,text,"good/307");
	
     SingleMessage message = new SingleMessage();
     message.setOffline(true);
     // 离线有效时间，单位为毫秒，可选
     message.setOfflineExpireTime(24 * 3600 * 1000);
     message.setData(template);
     // 可选，1为wifi，0为不限制网络环境。根据手机处于的网络情况，决定是否下发
     message.setPushNetWorkType(0); 
     Target target = new Target();
     target.setAppId(appId);
     target.setClientId("e38b6843b9c14ebfb4ca1fa20e4058da");
     //target.setAlias(Alias);
     IPushResult ret = null;
     try {
         ret = push.pushMessageToSingle(message, target);
     } catch (RequestException e) {
         e.printStackTrace();
         ret = push.pushMessageToSingle(message, target, e.getRequestId());
     }
     if (ret != null) {
         System.out.println(ret.getResponse().toString());
     } else {
         System.out.println("服务器响应异常");
     }
     return ret.getResponse().get("result").toString();
 }
	//安卓多用户PUSH入口！！！
	public static String AllPush_A(String title,String text,String action,List<String> cids){
		// 配置返回每个用户返回用户状态，可选
        System.setProperty("gexin.rp.sdk.pushlist.needDetails", "true");
        IGtPush push = new IGtPush(url, appKey, masterSecret);
        // 通知模板
        NotificationTemplate template = notificationTemplateDemo(title,text,action);
        ListMessage message = new ListMessage();
        message.setData(template);
        // 设置消息离线，并设置离线时间
        message.setOffline(true);
        // 离线有效时间，单位为毫秒，可选
        message.setOfflineExpireTime(24 * 1000 * 3600);
        // 配置推送目标
        List targets = new ArrayList();
        for(int i=0;i<cids.size();i++)
        {
        	 Target target1 = new Target();
        	 target1.setAppId(appId);
             target1.setClientId(cids.get(i));
             //target1.setAlias(Alias1);
             targets.add(target1);
        }
       
        // taskId用于在推送时去查找对应的message
        String taskId = push.getContentId(message);
        IPushResult ret = push.pushMessageToList(taskId, targets);
        System.out.println(ret.getResponse().toString());
        return ret.getResponse().get("result").toString();
	}
	//安卓多用户PUSH入口！！！
		public static String AllPush_I(String title,String text,String action,List<String> cids){
			// 配置返回每个用户返回用户状态，可选
	        System.setProperty("gexin.rp.sdk.pushlist.needDetails", "true");
	        IGtPush push = new IGtPush(url, appKey, masterSecret);
	        // 通知透传模板
	        TransmissionTemplate template = getTemplate(title,text,action);
	        ListMessage message = new ListMessage();
	        message.setData(template);
	        // 设置消息离线，并设置离线时间
	        message.setOffline(true);
	        // 离线有效时间，单位为毫秒，可选
	        message.setOfflineExpireTime(24 * 1000 * 3600);
	        // 配置推送目标
	        List targets = new ArrayList();
	        for(int i=0;i<cids.size();i++)
	        {
	        	 Target target1 = new Target();
	        	 target1.setAppId(appId);
	             target1.setClientId(cids.get(i));
	             //target1.setAlias(Alias1);
	             targets.add(target1);
	        }
	       
	        // taskId用于在推送时去查找对应的message
	        String taskId = push.getContentId(message);
	        IPushResult ret = push.pushMessageToList(taskId, targets);
	        System.out.println(ret.getResponse().toString());
	        return ret.getResponse().get("result").toString();
		}
 
 //打开应用消息模版---------------适用于安卓----------------------------------------------------------
 public static NotificationTemplate notificationTemplateDemo(String title,String text,String action) {
	    NotificationTemplate template = new NotificationTemplate();
	    // 设置APPID与APPKEY
	    template.setAppId(appId);
	    template.setAppkey(appKey);
	    // 设置通知栏标题与内容
	    template.setTitle(title);
	    template.setText(text);
	    // 配置通知栏图标
	    template.setLogo("icon.png");
	    // 配置通知栏网络图标
	    template.setLogoUrl("");
	    // 设置通知是否响铃，震动，或者可清除
	    template.setIsRing(true);
	    template.setIsVibrate(true);
	    template.setIsClearable(true);
	    // 透传消息设置，1为强制启动应用，客户端接收到消息后就会立即启动应用；2为等待应用启动
	    template.setTransmissionType(2);
	    template.setTransmissionContent("{\"title\":\""+title+"\",\"content\":\""+text+"\",\"action\":\""+action+"\"}");
	    // 设置定时展示时间
	    // template.setDuration("2015-01-16 11:40:00", "2015-01-16 12:24:00");
	    return template;
	}
 
//透传消息模版-------------------适用IOS---------------------------------------------------------------
public static TransmissionTemplate getTemplate(String title,String text,String action) {
	    TransmissionTemplate template = new TransmissionTemplate();
	    template.setAppId(appId);
	    template.setAppkey(appKey);
	    template.setTransmissionContent("{\"title\":\""+title+"\",\"content\":\""+text+"\",\"action\":\""+action+"\"}");
	    //template.setTransmissionContent("消息消息");
	    template.setTransmissionType(2);
	    APNPayload payload = new APNPayload();
	    payload.setBadge(1);
	    payload.setContentAvailable(1);
	    payload.setSound("default");
	    payload.setCategory("$由客户端定义");
	    //简单模式APNPayload.SimpleMsg 
	    payload.setAlertMsg(new APNPayload.SimpleAlertMsg(text));
	    //字典模式使用下者
	    //payload.setAlertMsg(getDictionaryAlertMsg());
	    template.setAPNInfo(payload);
	    return template;
	}

 public static  String Push4(String title,String text) throws Exception {
     IGtPush push = new IGtPush(url, appKey, masterSecret);  
     APNTemplate t = new APNTemplate();
     APNPayload apnpayload = new APNPayload();
     apnpayload.setSound("");
     //apn高级推送
     APNPayload.DictionaryAlertMsg alertMsg = new APNPayload.DictionaryAlertMsg();
     ////通知文本消息标题
     alertMsg.setTitle("测试推送");
     //通知文本消息字符串
     alertMsg.setBody("你是杨强");
     //对于标题指定执行按钮所使用的Localizable.strings,仅支持IOS8.2以上版本
     alertMsg.setTitleLocKey("ccccc");
     //指定执行按钮所使用的Localizable.strings
     alertMsg.setActionLocKey("ddddd");
     apnpayload.setAlertMsg(alertMsg);

     t.setAPNInfo(apnpayload);
     SingleMessage sm = new SingleMessage();
     sm.setData(t);
     IPushResult ret0 = push.pushAPNMessageToSingle(appId, "70ac0169edde2e2cd74ae83a86e0056780de829a64500ff7acfd53c8dba3dd00", sm);
     System.out.println(ret0.getResponse());
     return ret0.getResponse().get("result").toString();
}
 
 //---------------------------------------打开网址模板-----------------------------------------------
 public static LinkTemplate linkTemplateDemo() {
     LinkTemplate template = new LinkTemplate();
     // 设置APPID与APPKEY
     template.setAppId(appId);
     template.setAppkey(appKey);
     // 设置通知栏标题与内容
     template.setTitle("测试");
     template.setText("你是杨强");
     // 配置通知栏图标
     template.setLogo("icon.png");
     // 配置通知栏网络图标，填写图标URL地址
     template.setLogoUrl("");
     // 设置通知是否响铃，震动，或者可清除
     template.setIsRing(true);
     template.setIsVibrate(true);
     template.setIsClearable(true);
     // 设置打开的网址地址
     template.setUrl("http://www.baidu.com");
     return template;
 }
 
	private static APNPayload.DictionaryAlertMsg getDictionaryAlertMsg(){
	    APNPayload.DictionaryAlertMsg alertMsg = new APNPayload.DictionaryAlertMsg();
	    alertMsg.setBody("body");
	    alertMsg.setActionLocKey("ActionLockey");
	    alertMsg.setLocKey("LocKey");
	    alertMsg.addLocArg("loc-args");
	    alertMsg.setLaunchImage("launch-image");
	    // IOS8.2以上版本支持
	    alertMsg.setTitle("Title");
	    alertMsg.setTitleLocKey("TitleLocKey");
	    alertMsg.addTitleLocArg("TitleLocArg");
	    return alertMsg;
	}
}
