package privilege;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import org.json.JSONObject;

import com.alipay.sign.Base64;

public class ApplePost {
	private static String testUrl="https://sandbox.itunes.apple.com/verifyReceipt";
	private static String buyUrl="https://buy.itunes.apple.com/verifyReceipt";
	public static int dopost(String info){
		try {
			int flag=verifyReceipt(info,buyUrl);
			
			if(flag==21007)
			{
				flag=verifyReceipt(info,testUrl);
			}else if(flag==21008)
			{
				flag=verifyReceipt(info,buyUrl);
			}
			if(flag==0)
			{
				return 1;//苹果支付成功
			}else{
				return 0;//苹果支付失败
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return 0;
	}
	public static int verifyReceipt(String data,String posturl) throws IOException {  
	       int status = -1;  
	  
	        //This is the URL of the REST webservice in iTunes App Store  
	        URL url = new URL(posturl);  
	  
	        //make connection, use post mode  
	        HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();  
	        connection.setRequestMethod("POST");  
	        connection.setDoOutput(true);  
	        connection.setAllowUserInteraction(false);  
	  
	        //Encode the binary receipt data into Base 64  
	        //Here I'm using org.apache.commons.codec.binary.Base64 as an encoder, since commons-codec is already in Grails classpath  
//       Base64 encoder = new Base64();  
//	     String encodedReceipt = new String(encoder.encode(receipt));  
	  
	        //Create a JSON query object  
	        //Here I'm using Grails' org.codehaus.groovy.grails.web.json.JSONObject  
	        Map map = new HashMap();  
	        map.put("receipt-data", data);  
	        JSONObject jsonObject = new JSONObject(map);  
	  
	        //Write the JSON query object to the connection output stream  
	        PrintStream ps = new PrintStream(connection.getOutputStream());  
	        ps.print(jsonObject.toString());  
	        ps.close();  
	  
	        //Call the service  
	        BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));  
	        //Extract response  
	        String str;  
	        StringBuffer sb = new StringBuffer();  
	        while ((str = br.readLine()) != null) {  
	            sb.append(str);  
	            //sb.append("/n");  
	        }  
	        br.close();  
	        String response = sb.toString();  
	  
	        //Deserialize response  
	        JSONObject result = new JSONObject(response);  
	       status = result.getInt("status");  
	        if (status == 0) {  
	            //provide content  
	        } else{  
	            //signal error, throw an exception, do your stuff honey!  	
	        }
			return status;  
	  
	  
	    }
}
