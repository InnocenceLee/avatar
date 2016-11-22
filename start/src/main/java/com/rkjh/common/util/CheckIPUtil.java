package com.rkjh.common.util;

public class CheckIPUtil {
	public static boolean ipIsValid(String ipSection, String ip) {      
        ipSection = ipSection.trim();     
        ip = ip.trim();     
        int idx = ipSection.indexOf('-');     
        String[] sips = ipSection.substring(0, idx).split("\\.");     
        String[] sipe = ipSection.substring(idx + 1).split("\\.");     
        String[] sipt = ip.split("\\.");     
        long ips = 0L, ipe = 0L, ipt = 0L;     
        for (int i = 0; i < 4; ++i) {     
            ips = ips << 8 | Integer.parseInt(sips[i]);     
            System.out.println("ips:" + ips);
            ipe = ipe << 8 | Integer.parseInt(sipe[i]);     
            System.out.println("ipe:" + ipe);
            ipt = ipt << 8 | Integer.parseInt(sipt[i]);     
            System.out.println("ipt:" + ipt);
        }     
        if (ips > ipe) {     
            long t = ips;     
            ips = ipe;     
            ipe = t;     
        }
        return ips <= ipt && ipt <= ipe;     
    }     
}
