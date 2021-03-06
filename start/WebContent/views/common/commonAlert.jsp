 <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <!-- Modal -->
<div class="modal fade" id="myCommonAlert" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
                <h4 class="modal-title" id="myModalLabelTitle">操作提示</h4>
            </div>
            <div class="modal-body">
                <p id="errMsg" style="text-align: left;">
                  
                </p>
            </div>
            <div class="modal-footer">
                <span style=" margin-right:50px"></span>
                <!-- btn-default -->
                <button type="button" class="btn btn-primary blue myalertbtn" data-dismiss="modal">确定</button>
                <!-- <button type="button" class="btn btn-primary blue" id="myCommonAlertBtn">确定</button> -->
            </div>
        </div>
    </div>
</div>

<!-- 考试须知 -->
<div class="modal fade" id="myCommonAlertExam" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
               
                <h4 class="modal-title" id="myModalLabelTitle">考试须知</h4>
            </div>
            <div class="modal-body">
                <p id="myCommonAlertExamInfo" style="text-align: left;">
                  
                </p>
            </div>
            <div class="modal-footer">
                <span style=" margin-right:50px"></span>
                <!-- btn-default -->
                <button type="button" class="btn btn-primary blue" id="myCommonAlertBtnExam">确定</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="jumpMessage" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
                <h4 class="modal-title" id="myModalLabelTitle">操作提示</h4>
            </div>
            <div class="modal-body">
                
   				<p id="msg" style="text-align: left;" >
                  	
                </p>
                <p id="sysMsg">
                  	
                </p>
            </div>
            <div class="modal-footer">
                <span style=" margin-right:50px"></span>
                <button type="button" class="btn btn-primary blue myalertbtn" data-dismiss="modal">跳转</button>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
function showMsg(msg){
	$('#myCommonAlert #errMsg').text(msg);
	$('#myCommonAlert').modal('show');
}
function hideMsg(){
    $('#myCommonAlert #errMsg').text('');
    $('#myCommonAlert').modal('hide');
}


/**
 * msg 提示消息
 * second 秒后执行callBack 操作 
 * callBack 跳转逻辑在这个函数中写
 */
function showJumpMsg(msg,second,callBack){
	$('#jumpMessage').modal('show');
	$("#jumpMessage #msg").text(msg);
	var it =  window.setInterval(function(){
		$("#jumpMessage #sysMsg").text(second + " 秒后将跳转到新页面");
		second--;
		if(second == -1){
			callBack();
			window.clearInterval(it);
		}
	},1000);
	
}

</script>