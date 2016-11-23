
//新建一个全局变量用于保存当前会员的ID
String.prototype.trim=function(){
　　    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim=function(){
　　    return this.replace(/(^\s*)/g,"");
}
String.prototype.rtrim=function(){
　　 return this.replace(/(\s*$)/g,"");
}

//定义返回类型
function JsonResult(){
	this.code=-1;
	this.msg ='';
	this.exception='';
	this.items=new Array();
	this.entity=new Object();
}
/**
 * 生成多位随机数
 * @param n
 * @returns
 */
function RndNum(n) {
    var rnd = "";
    for (var i = 0; i < n; i++)
      rnd += Math.floor(Math.random() * 10);
    return rnd;
  }

/**
 * 模拟登陆
 * @returns
 */
function getCurrentMemberId(){
	return session.CurrentMemeberId;
}
function setCurrentMemberId(id){
	session.CurrentMemeberId=id;
}

/**
 * 设置session.user: password,id,mobile,name,gender,photo,username
 * @returns
 */
function getSessionAppUser(){
	return session.appUser;
}
function setSessionAppUser(appUser){
	session.appUser=appUser;
}
/**
 * 扩展一个uuid方法
 * 
 * @returns
 */
function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

/*定义加密的V*/
function getEncryptV(){
	var random = java.util.UUID.randomUUID().toString();
	random=random.replace(/-/g,'').substr(0,20);
}
function WriteTxt(){
	var fso,tf;
	fso = new ActiveXObject("Scripting.FileSystemObject");
	tf = fso.CreateTextFile("D:\\test.txt",true);
	tf.WriteLine("Testing 1,2,3.");
	tf.writeBlankLines(3);
	tf.Write("This is a test.");
	tf.Close();
	alert("文件写入成功！");
}
/**
扩展数组方法

*/
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};