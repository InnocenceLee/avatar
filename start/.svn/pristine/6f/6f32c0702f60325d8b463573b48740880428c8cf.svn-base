package com.rkjh.common.util;

import java.math.BigInteger;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.Charset;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

/**
 * 加解密工具
 * @author fernador
 *
 */
public class CryptoUtil
{
	
	public static final String CLIENT_FIX_SALTVALUE = "83ea78767386e7378";//加密的固定盐
	
	private static final String PBKDF2_ALGORITHM = "PBKDF2WithHmacSHA1";

	private static final int SALT_BYTE_SIZE = 24;			// 动态盐的字节数
	private static final int HASH_BYTE_SIZE = 24;			// hash结果的字节数
	private static final int PBKDF2_ITERATIONS = 1000;		// hash算法的迭代次数，为了减慢hash速度
	
	public static String quickCreateHash(String psw, String salt)
	{
		// 获取hash值
        byte[] hash;
		try
		{
			hash = pbkdf2(psw.toCharArray(), fromHex(salt), 1, HASH_BYTE_SIZE);
	        
	        // 将字符数组转换为字符串
	        return toHex(hash);
		}
		catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		catch (InvalidKeySpecException e) {
			e.printStackTrace();
		}
		
		return "";
	}
	
	public static String quickCreateHashByBytes(String psw, String salt)
	{
		byte[] tmp = psw.getBytes();
		for(int n = 0 ; n < tmp.length ; ++ n)
		{
			if(tmp[n] < 0)
				tmp[n] = (byte)(tmp[n] + 128);
		}
		
		return quickCreateHash(tmp, salt);
	}
	
	public static String quickCreateHash(byte[] psw, String salt)
	{
		// 获取hash值
        byte[] hash;
		try
		{
			hash = pbkdf2(getChars(psw), fromHex(salt), 1, HASH_BYTE_SIZE);
	        
	        // 将字符数组转换为字符串
	        return toHex(hash);
		}
		catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		catch (InvalidKeySpecException e) {
			e.printStackTrace();
		}
		
		return "";
	}
	
	private static char[] getChars (byte[] bytes) {
	      Charset cs = Charset.forName ("UTF-8");
	      ByteBuffer bb = ByteBuffer.allocate (bytes.length);
	      bb.put (bytes);
	                 bb.flip ();
	       CharBuffer cb = cs.decode (bb);
	  
	   return cb.array();
	}
	 
	/**
	 * 对密码进行加盐hash
	 * @param psw		要hash的密码
	 * @param salt		要加的盐
	 * @return
	 * @throws NoSuchAlgorithmException
	 * @throws InvalidKeySpecException
	 */
	public static String createHash(String psw, String salt)
	{
		// 获取hash值
        byte[] hash;
		try
		{
			hash = pbkdf2(psw.toCharArray(), fromHex(salt), PBKDF2_ITERATIONS, HASH_BYTE_SIZE);
	        
	        // 将字符数组转换为字符串
	        return toHex(hash);
		}
		catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		catch (InvalidKeySpecException e) {
			e.printStackTrace();
		}
		
		return "";
	}
	
	/**
	 * 生成动态盐
	 * @return
	 */
	public static String createDynamicSalt()
	{
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[SALT_BYTE_SIZE];
        random.nextBytes(salt);
        
        return toHex(salt);
	}
	
    /**
     * 用hash方式验证密码.
     * @param   password	待验证密码
     * @param   salt		之前hash密码时加的盐
     * @param   correctHash	最终正确的hash值
     * @return	密码正确返回true，密码错误返回false
     */
    public static boolean validatePassword(String password, String salt, String correctHash)
    {
    	// 根据密码和盐生成一个新的hash串
		try
		{
			byte[] byteCorrectHash = fromHex(correctHash);
			byte[] testHash = pbkdf2(password.toCharArray(), fromHex(salt), PBKDF2_ITERATIONS, byteCorrectHash.length);
			
	        // 比较两个hash值是否相同
	        return slowEquals(byteCorrectHash, testHash);
		}
		catch (NoSuchAlgorithmException e)
		{
			e.printStackTrace();
		}
		catch (InvalidKeySpecException e)
		{
			e.printStackTrace();
		}

		return false;
    }
	
    /**
     * 对两个字符数组进行慢比较。
     * 慢比较的目的是减慢比较速度，以避免时间攻击。
     * @param	a
     * @param	b
     * @return	相等返回true，不等返回false
     */
    private static boolean slowEquals(byte[] a, byte[] b)
    {
        int diff = a.length ^ b.length;
        for(int i = 0; i < a.length && i < b.length; i++)
            diff |= a[i] ^ b[i];
        return diff == 0;
    }
 
    /**
     *  进行PBKDF2 hash
     *
     * @param	password	要hash的字符串
     * @param	salt		要加的盐
     * @param	iterations	遍历次数
     * @param	bytes		hash长度
     * @return	hash结果
     */
    private static byte[] pbkdf2(char[] password, byte[] salt, int iterations, int bytes)
        throws NoSuchAlgorithmException, InvalidKeySpecException
    {
        PBEKeySpec spec = new PBEKeySpec(password, salt, iterations, bytes * 8);
        SecretKeyFactory skf = SecretKeyFactory.getInstance(PBKDF2_ALGORITHM);  
        
        return skf.generateSecret(spec).getEncoded();
    }
    
    /**
     * 将16进制的字符串转换为字符数组
     * @param	hex	要转换的字符串
     * @return
     */
    private static byte[] fromHex(String hex)
    {
        byte[] binary = new byte[hex.length() / 2];
        for(int i = 0; i < binary.length; i++)
        {
            binary[i] = (byte)Integer.parseInt(hex.substring(2*i, 2*i+2), 16);
        }
        return binary;
    }
 
    /**
     * 将字符数组转换为16进制的字符串
     * @param	array	要转换的字符数组
     * @return
     */
    private static String toHex(byte[] array)
    {
        BigInteger bi = new BigInteger(1, array);
        String hex = bi.toString(16);
        int paddingLength = (array.length * 2) - hex.length();
        if(paddingLength > 0)
            return String.format("%0" + paddingLength + "d", 0) + hex;
        else
            return hex;
    }
    
    
    /**
     * 将字符串转化为16进制的字符串
     * @param str
     * @return
     */
    public static String str2HexStr(String str) {    
        char[] chars = "0123456789ABCDEF".toCharArray();    
        StringBuilder sb = new StringBuilder("");  
        byte[] bs = str.getBytes();    
        int bit;    
        for (int i = 0; i < bs.length; i++) {    
            bit = (bs[i] & 0x0f0) >> 4;    
            sb.append(chars[bit]);    
            bit = bs[i] & 0x0f;    
            sb.append(chars[bit]);    
        }    
        return sb.toString();    
    }
}
