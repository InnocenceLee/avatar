<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath }/plugs/ztree/zTreeStyle/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery-1.10.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/plugs/ztree/js/jquery.ztree.core.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/plugs/ztree/js/jquery.ztree.excheck.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/plugs/ztree/js/jquery.ztree.exedit.min.js"></script>
<script type="text/javascript">
var setting = {
		async : {
			enable : true,
			url : "jv/knowledgepoint/loadTree.do",
			autoParam : [ "id"],
			dataFilter : filter
		},
		view : {
			expandSpeed : "",
			addHoverDom : addHoverDom,
			removeHoverDom : removeHoverDom,
			selectedMulti : false
		},
		edit : {
			enable : true
		},
		data : {
			simpleData : {
				enable : true,
				idKey: "id",
				pIdKey: "base",
				rootPId: 0
			},
			key : {
				name : "title"
			}
		},
		callback : {
			beforeRemove : beforeRemove,
			beforeRename : beforeRename
		},
		check: {
			enable: true,
			chkStyle: "radio",
			radioType: "all"
		}
	};

	function filter(treeId, parentNode, childNodes) {
		if (!childNodes)
			return null;
		for (var i = 0, l = childNodes.length; i < l; i++) {
			childNodes[i].isParent = childNodes[i].childNum != 0;
		}
		return childNodes;
	}
	function beforeRemove(treeId, treeNode) {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		zTree.selectNode(treeNode);
		return confirm("确认删除 " + treeNode.title + " 吗？");
	}
	function beforeRename(treeId, treeNode, newName) {
		if (newName.length == 0) {
			alert("节点名称不能为空.");
			return false;
		}
		return true;
	}

	var newCount = 1;
	function addHoverDom(treeId, treeNode) {
		var sObj = $("#" + treeNode.tId + "_span");
		if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0)
			return;
		var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
				+ "' title='add node' onfocus='this.blur();'></span>";
		sObj.after(addStr);
		var btn = $("#addBtn_" + treeNode.tId);
		if (btn)
			btn.bind("click", function() {
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				zTree.addNodes(treeNode, {
					id : (100 + newCount),
					pId : treeNode.id,
					name : "new node" + (newCount++)
				});
				return false;
			});
	};
	function removeHoverDom(treeId, treeNode) {
		$("#addBtn_" + treeNode.tId).unbind().remove();
	};

	$(function(){
		$.fn.zTree.init($(".ztree"), setting);
		showTree();
	});
	
	// 通过id 获取树
	function getTree(id){
		return  $.fn.zTree.getZTreeObj(id);
	}
	
	// 显示树
	function showTree(back){
		$("#treeModal .ok").click(back);
		$("#treeModal").modal('show');
	}
	
</script>
<style type="text/css">
.ztree li span.button.add {
	margin-left: 2px;
	margin-right: -1px;
	background-position: -144px 0;
	vertical-align: top;
	*vertical-align: middle
}
</style>
</head>
<body>

	<div id="treeModal" class="modal hide fade" tabindex="-1" data-width="760">
	    <div class="modal-header">
		    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
		    <h4 class="modal-title" id="myModalLabel3">选择知识点</h4>                                          
	    </div>
	    <div class="modal-body">
	        <!-- /////////////树/////////////////// -->
			<div class="row" style="padding-left: 50px">
			     <ul id="knowledgeTree" class="ztree" style="width:500px; overflow:auto;"></ul>
			</div>
	    </div>
	    <div class="modal-footer">
	         <button type="button" data-dismiss="modal" class="btn">取消</button>
	         <button type="button"  class="btn blue ok">确定</button>
	    </div>
    </div> 
    
</body>
</html>