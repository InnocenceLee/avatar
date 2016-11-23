package privilege;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class HotWordUtils {

	private static ConcurrentHashMap<String, List<String>> hotWordCacheMap=new ConcurrentHashMap<String, List<String>>();//存储热门词汇的全局变量
	private static final String IS_NOT_EXIST_KEY="IS_NOT_EXIST_KEY";//map中不存在KEY记录
	private static final String IS_NOT_EXIST_KEY_VALUE="IS_NOT_EXIST_KEY_VALUE";//map中不存在KEY-VALUE记录
	private static final String IS_EXIST_KEY_VALUE="IS_EXIST_KEY_VALUE";//map中存在KEY-VALUE记录
	
	/*
	 * 判断hotWordCacheMap是否包含:当前用户输入的关键字
	 */
	public static String isExist(String keyWord,String cid) {
		String result=IS_NOT_EXIST_KEY_VALUE;//初始状态：不存在KEY-VALUE记录
		List<String> values=hotWordCacheMap.get(keyWord);
		if(values!=null && values.size()>0){
			for (String value : values) {
				if(cid.equals(value)){//存在KEY-VALUE，则设置状态IS_EXIST_KEY_VALUE
					result=IS_EXIST_KEY_VALUE;
					break;
				}
			}
			if(!IS_EXIST_KEY_VALUE.equals(result)){//如果不存在KEY-VALUE，则设置状态IS_NOT_EXIST_KEY_VALUE
				result=IS_NOT_EXIST_KEY_VALUE;
			}
		}else{//不存在KEY，则设置状态IS_NOT_EXIST_KEY
			result=IS_NOT_EXIST_KEY;
		}
		System.out.println(result);
		return result;
	}
	
	/*
	 * 当前用户输入的关键字插入到hotWordCacheMap中
	 */
	public static String insert2CacheMap(String keyWord,String cid) {
		String result="IS_NOT_NEED";
		if(keyWord==null || "".equals(keyWord)){//关键字为空，则不作处理
			return result;
		}
		String isExist=isExist(keyWord,cid);//先判断map中是否有记录
		List<String> list=null;
		if(IS_NOT_EXIST_KEY.equals(isExist)){//map中不存在KEY记录，则插入到map中
			list=new ArrayList<>();
			list.add(cid);
			hotWordCacheMap.put(keyWord, list);
		}else if(IS_NOT_EXIST_KEY_VALUE.equals(isExist)){
			list=hotWordCacheMap.get(keyWord);
			list.add(cid);
			hotWordCacheMap.put(keyWord, list);
			if(list.size()>=3){
				result="IS_NEED_UPDATE";
			}
		}else{
			System.out.println("存在KEY-VALUE记录，不需要重复插入！");
		}
		return result;
	}
	/**
	 * 清除内存中热词
	 * @param keyWord
	 * @return
	 */
	public static boolean removeHotword(String keyWord) {

		if(keyWord==null || "".equals(keyWord)){//关键字为空，则不作处理
			return false;
		}
		List<String> values=hotWordCacheMap.get(keyWord);
		if(values == null){
			return false;	
		}else{
			hotWordCacheMap.remove(keyWord);
			return true;
		}
		
		
	}
}
