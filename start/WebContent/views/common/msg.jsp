<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<div class="modal fade" id="msg-box" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">消息提示</h4>
            </div>
            <div class="modal-body">
                <p id="msginfo">这是消息内容</p>
            </div>
            <div class="modal-footer">
                <span style=" margin-right:50px" class="Bomb-box"></span>
                <button id="myDelBtn" type="button" class="btn btn-primary"  data-dismiss="modal">确定</button>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
function msg(msg,fn){
	$("#msg-box #msginfo").text(msg);
	$('#msg-box').modal('show');
}
</script>
