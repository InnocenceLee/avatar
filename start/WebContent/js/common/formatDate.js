/**
 * add by lyh 20160719
 * 公告方法
 */



//输入  时间戳
//输出   2010年12月23日 10:53
function getLocalTime(nS) {     
	var unixTimestamp = new Date(nS * 1000) 
	var commonTime = unixTimestamp.toLocaleString()
	   return commonTime;     
	} 


//json排序，
//in   json，排序的建
//json
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}