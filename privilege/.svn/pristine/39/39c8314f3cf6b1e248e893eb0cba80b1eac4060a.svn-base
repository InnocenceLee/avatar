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

public class WriteTxt {
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
            //System.out.println(s1);  
            input.close();  
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
            s1 += df.format(new Date())+content;  
  
            BufferedWriter output = new BufferedWriter(new FileWriter(f));  
            output.write(s1);  
            output.close();  
        } catch (Exception e) {  
            e.printStackTrace();  
  
        }  
    }  
	public static void androidBUGToTxt(String content) {  
        String str = new String(); //原有txt内容  
        String s1 = new String();//内容更新  
        try {  
            File f = new File("D:\\androidBUG.txt");  
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
            //System.out.println(s1);  
            input.close();  
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
            s1 += df.format(new Date())+content;  
  
            BufferedWriter output = new BufferedWriter(new FileWriter(f));  
            output.write(s1);  
            output.close();  
        } catch (Exception e) {  
            e.printStackTrace();  
  
        }  
    }  
}
