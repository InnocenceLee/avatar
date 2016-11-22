package com.rkjh.common.util;

import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;
import java.util.regex.Matcher;
import java.util.regex.Pattern;



/**
 * 一般工具类
 *
 */
public class GeneralUtil
{
	/**
	 * 判断指定字符串是否为电话号码
	 * @param phoneNumber
	 * @return
	 */
	public static boolean isPhoneNumberValid(String phoneNumber)
	{
		if(null == phoneNumber)
			return false;
		
		phoneNumber = phoneNumber.trim();
		if(phoneNumber.isEmpty())
			return false;
		
        boolean isValid = false;
        
        // 手机号
        {
	        String expression = "1[3578][0-9]{9,9}";
	        CharSequence inputStr = phoneNumber;  
	          
	        Pattern pattern = Pattern.compile(expression);          
	        Matcher matcher = pattern.matcher(inputStr);
	          
	        if(matcher.matches())
	            isValid = true;
        }
        
        if(!isValid)
        {// 不是手机号，那看看是不是座机号
	        String expression = "0[1-9][0-9]{9,10}";
	        CharSequence inputStr = phoneNumber;  
	          
	        Pattern pattern = Pattern.compile(expression);          
	        Matcher matcher = pattern.matcher(inputStr);
	          
	        if(matcher.matches())
	            isValid = true;        	
        }
        
        if(!isValid)
        {// 是不是400或者800电话
	        String expression = "[48]00[0-9]{7}";
	        CharSequence inputStr = phoneNumber;  
	          
	        Pattern pattern = Pattern.compile(expression);          
	        Matcher matcher = pattern.matcher(inputStr);
	          
	        if(matcher.matches())
	            isValid = true;      
        }
          
        return isValid;
    }
	
	/**
	 * 判断指定字符串是否是邮箱
	 * @param mailAddr
	 * @return
	 */
	public static boolean isEmailValid(String mailAddr)
	{
		if(null == mailAddr)
			return false;

		mailAddr = mailAddr.trim();
		if(mailAddr.isEmpty())
			return false;
		
        String expression = "^\\s*\\w+(?:\\.{0,1}[\\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\\.[a-zA-Z]+\\s*$";
        CharSequence inputStr = mailAddr;  
          
        Pattern pattern = Pattern.compile(expression);          
        Matcher matcher = pattern.matcher(inputStr);
          
        if(matcher.matches())
            return true;
        
        return false;
	}
	
	
	/**
	 * 判断指定密码是否符合要求。6-20位字母或数字
	 * @param password
	 * @return
	 */
	public static boolean isPasswordValid(String password)
	{
		if(null == password)
			return false;

		password = password.trim();
		if(password.isEmpty())
			return false;

        boolean isValid = false;  
        String expression = "[a-zA-Z\\d]{6,20}";
        CharSequence inputStr = password;

        Pattern pattern = Pattern.compile(expression);          
        Matcher matcher = pattern.matcher(inputStr);

        if(matcher.matches())
            isValid = true;

        return isValid;
    }

	
	/**
	 * 创建随机的验证码
	 * @param nBitCount
	 * @return
	 */
	public static String createRandomVerifyCode(int nBitCount)
	{
		ThreadLocalRandom ran = ThreadLocalRandom.current();//并发随机数
        
        StringBuffer strTmp = new StringBuffer();
        int nTmp = 0;
        char c;
        for(int i = 0 ; i < nBitCount ; ++ i)
        {
        	nTmp = ran.nextInt(35);	// 0-Z
        	if(nTmp < 10)
        		c = (char)(48 + nTmp);
        	else
        		c = (char)(65 + nTmp - 10);
        	
    		strTmp.append(c);
        }

        return strTmp.toString();
	}
	
	/**
	 * 创建随机的数字码
	 * @param nBitCount
	 * @return
	 */
	public static String createRandomNumberCode(int nBitCount)
	{
		ThreadLocalRandom ran = ThreadLocalRandom.current();
        
        StringBuffer strTmp = new StringBuffer();
        int nTmp = 0;
        char c;
        for(int i = 0 ; i < nBitCount ; ++ i)
        {
        	nTmp = ran.nextInt(9);	// 0-9
        	c = (char)(48 + nTmp);
        	
    		strTmp.append(c);
        }

        return strTmp.toString();
	}
	
	
	/**
	 * 创建不超过最大数的随机正整数
	 * @param nMaxVal
	 * @return
	 */
	public static int createRandomNumber(int nMaxVal)
	{
		ThreadLocalRandom ran = ThreadLocalRandom.current();
        
        return ran.nextInt(nMaxVal - 1) + 1;	// 1 - nMaxVal
	}
	
	
	/**
	 * 创建指定范围内的随机整数
	 * @param nMinVal
	 * @param nMaxVal
	 * @return
	 */
	public static int createRandomNumber(int nMinVal,int nMaxVal)
	{
		ThreadLocalRandom ran = ThreadLocalRandom.current();
        return ran.nextInt() % (nMaxVal-nMinVal+1) + nMinVal;
	}

	
	
	/**
	 * 判断字符串是否为空，这里会判断除了空格和回车外，是否还有别的内容，如果没有，则为空
	 * @param strSrc
	 * @return
	 */
	public static boolean isEmptyString(String strSrc)
	{
		if((null == strSrc) || strSrc.isEmpty())
			return true;
		
		String strTmp = strSrc.replace(" ", "");
		strTmp = strTmp.replace("　", "");
		strTmp = strTmp.replace("\n", "");
		strTmp = strTmp.replace("\r", "");
		
		if(strTmp.isEmpty())
			return true;
		else
			return false;
	}

	
	/**
	 * 判断指定字符是否是中文
	 * @param c
	 * @return
	 */
	public static boolean isChinese(char c)
	{
        Character.UnicodeBlock ub = Character.UnicodeBlock.of(c);
        if (ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS
             || ub == Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS
            || ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A
            || ub == Character.UnicodeBlock.GENERAL_PUNCTUATION
            || ub == Character.UnicodeBlock.CJK_SYMBOLS_AND_PUNCTUATION
            || ub == Character.UnicodeBlock.HALFWIDTH_AND_FULLWIDTH_FORMS)
        {
            return true;
        }
        return false;
    }
	
	
	/**
	 * 生成唯一id
	 */
	public static String createUniqueId(){
		return UUID.randomUUID().toString().replace("-", "");
	}
	
}
