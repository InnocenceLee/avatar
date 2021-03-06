//获取数字签名
var getSignature = function(params){
		var input = params.input;
		var api_secret = params.api_secret;
		var imports =  new JavaImporter(java.lang,java.util, java.net,org.apache.http,java.security,java.exception);
		with(imports){
			var hexValue = new java.lang.StringBuffer();
			var paramList = new java.util.ArrayList();
			var keyAndValue = input.split("&");
			for(var i =0; i < keyAndValue.length; i++){
				var twoParts = keyAndValue[i].split("=");
				var param = URLEncoder.encode(twoParts[1]);
				paramList.add(twoParts[0] + param);
			}
			Collections.sort(paramList);
			var result = "";
			for(var i = 0; i<paramList.size(); i++){
				result += paramList.get(i);
			}
			result += api_secret;
			var md5 =  MessageDigest.getInstance("MD5");
			var md5Bytes = md5.digest(result.getBytes());
			
			for (var i = 0; i < md5Bytes.length; i++) {
				var val = md5Bytes[i] & 0xff;
				if (val < 16)
					hexValue.append("0");
				hexValue.append(Integer.toHexString(val));
			}
			
			return hexValue.toString();
		}
}




//获取人员、部门数据
var fetchData = function(params){
	var dataType = params.dataType;
	var lastId = params.lastId?params.lastId:0;
	var fetchAll = params.fetchAll?params.fetchAll:0;
	
	var imports = new JavaImporter(java.lang,org.apache.http);
	with(imports){
		var httpClient = new org.apache.http.impl.client.DefaultHttpClient();
//		var param = "apiKey=2d707967e9464e049ace74477811373b&callName="+dataType+"&requestTime="+System.currentTimeMillis()+"&version=1&count=100&lastId="+lastId+"&fetchAll="+fetchAll;
//		var api_secret = "021a7a937e54c4cae12a1afd57864ce81a87c1724a5823af3057be5af50d4350";
		var param = "apiKey=25ce5f3a2410a26bc618e4c6a221363d&callName="+dataType+"&requestTime="+System.currentTimeMillis()+"&version=1&count=100&lastId="+lastId+"&fetchAll="+fetchAll;
		var api_secret = "b389335d715633cb8254a18ddd66b27422eaa4758d5598b4f69c2ba3ea5cd165";
		
		
		
		var signature = getSignature({"input":param,"api_secret":api_secret});
		var httpGet = new org.apache.http.client.methods.HttpGet("http://114.215.142.122:9001/api/external_applications/execute?" + param +"&signature="+signature);
		var resp = httpClient.execute(httpGet);
		var str = org.apache.http.util.EntityUtils.toString(resp.getEntity(),"UTF-8");
		var jsonObj = JSON.parse(str);
		System.out.println(JSON.stringify(jsonObj.data));
		return jsonObj.data;
	}
}

