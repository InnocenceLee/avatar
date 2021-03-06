/**
 * Created by Administrator on 2016/7/11.
 */

	var numberRule = '/^[1-9][0-9]*$/g';
	var doubleRule = '/^([1-9][0-9]*)|(0\.[0-9]*[1-9])|([1-9][0-9]*\.[0-9]*[1-9])$/';

	/**
	 * 新增数据校验说明
	 */
	var dataAddSystemParameter = {
			data : [
			          // day到期提醒默认天数
			          {
			        	  id : 'day',
			        	  msg : "天数必须是数字",
			        	  rule : numberRule,
			        	  checkFun : 'checkStr'
			          },
			          // examEndMin考试截止时间
			          {
			        	  id : 'examEndMin',
			        	  msg : "时间不正确",
			        	  checkFun : 'checkDate'
			          },
			          // validateMin验证码间隔时间
			          {
			        	  id : 'validateMin',
			        	  msg : "验证码间隔必须是有效数字",
			        	  rule:doubleRule,
			        	  checkFun : 'checkStr'
			          },
			          // validateMin验证码间隔时间
			          {
			        	  id : 'validateMin',
			        	  msg : "验证码间隔必须是有效数字",
			        	  rule:doubleRule,
			        	  checkFun : 'checkStr'
			          },
			          // score及格分数
			          {
			        	  id : 'score',
			        	  msg : "及格分数必须是有效数字",
			        	  rule:doubleRule,
			        	  checkFun : 'checkStr'
			          },
			          // examMin考试时长
			          {
			        	  id : 'examMin',
			        	  msg : "考试时长必须是有效数字",
			        	  rule:doubleRule,
			        	  checkFun : 'checkStr'
			          },
			          // examMin考试时长
			          {
			        	  id : 'examMin',
			        	  msg : "考试时长必须是有效数字",
			        	  rule:doubleRule,
			        	  checkFun : 'checkStr'
			          },
			          // TotleNum题目总数
//			          {
//			        	  id : 'TotleNum',
//			        	  msg : "题目总数必须是数字",
//			        	  rule : numberRule,
//			        	  checkFun : 'checkStr'
//			          },
			          // judgeScore判断题分数
			          {
			        	  id : 'judgeScore',
			        	  msg : "判断题分数必须是有效数字",
			        	  rule:doubleRule,
			        	  checkFun : 'checkStr'
			          },
			          // singleScore单选题分数
			          {
			        	  id : 'singleScore',
			        	  msg : "单选题分数必须是有效数字",
			        	  rule:doubleRule,
			        	  checkFun : 'checkStr'
			          },
			          // multipleScore多选题分数
			          {
			        	  id : 'multipleScore',
			        	  msg : "多选题分数必须是有效数字",
			        	  rule:doubleRule,
			        	  checkFun : 'checkStr'
			          }
			]
	}


/*查看详情*/
function modify(obj) {
		
		// 调用数据校验
	var isPass = checkData(dataAddSystemParameter);
	// 判断校验是否成功
	if(!isPass){
		return;
	}
	var ips = [];
    
	var inoutIps = $.trim($("#ipBegin").val());
	if(!inoutIps==""){
		ips = inoutIps.split(",");
		var regIp = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])[-]((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])$/;
		for(var m=0;m<ips.length;m++){
			if(!regIp.test(ips[m])){
				$("#ipBeginError").html("正确格式：x.x.x.x-x.x.x.x 多个ip段以英文逗号(,)分隔");
				return;
			}
		}
	}
	
	
	var obj = {};
	
	obj.day = $.trim($("#day").val());
	obj.examEndMin = $.trim($("#examEndMin").val());
	obj.validateMin = $.trim($("#validateMin").val());
	obj.score = $.trim($("#score").val());
	obj.examMin = $.trim($("#examMin").val());
	obj.totleNum = $.trim($("#TotleNum").val());
	obj.ipBegin = $.trim($("#ipBegin").val());
	obj.judgeScore = $.trim($("#judgeScore").val());
	obj.singleScore = $.trim($("#singleScore").val());
	obj.multipleScore = $.trim($("#multipleScore").val());

	
	if(document.getElementById("lessonOrder").checked){
		obj.lessonOrder = "S";
	}
	else{
		obj.lessonOrder = "M";
	}
	
	if(document.getElementById("dragFlag").checked){
		obj.dragFlag = "Y";
	}
	else{
		obj.dragFlag = "N";
	}
	
	if(document.getElementById("avoidIdle").checked){
		obj.avoidIdle = "Y";
	}
	else{
		obj.avoidIdle = "N";
	}
	
	if(document.getElementById("randomOrder").checked){
		obj.randomOrder = "Y";
	}
	else{
		obj.randomOrder = "N";
	}
	
	var strDate = JSON.stringify(obj);
	console.log("更新系统参数： "+strDate);
    $.ajax({
        type: "POST",
        url: "jv/systemparameter/update.do",
        data: {'data':strDate},
        dataType: "json",
        success: function(data){
        	window.location.href="jv/systemparameter/list.do";
        }
    });
	
	
}

