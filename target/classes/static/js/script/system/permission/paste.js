var id = "";
var code = "";
var zTree;
var setting = {
    view: {
        dblClickExpand: false,
        showLine: true,
        selectedMulti: true
    },
    check: {
        enable: true,
	},
	view: {
	    dblClickExpand: false,
	    showLine: true,
	    selectedMulti: false
	},
	data: {
	    simpleData: {
	        enable:true,
	        idKey: "id",
	        pIdKey: "pid",
	        rootPId: ""
	    }
	},
    callback: {
    	onClick: function (e, treeId, treeNode, clickFlag) { 
    		zTree.checkNode(treeNode, !treeNode.checked, true);
    	} 
    }
};

function zTreeOnClick(event, treeId, treeNode) {
	treeNode.checked = true; 
};

$(function () {
	usertree();
});

 
//获取用户
function usertree(){
	 $.ajax({
			url : '../per/queryUserTree.do',
			dataType:'json',
			success : function(data) {
				 $.fn.zTree.init($("#usertree"), setting, data);
				 zTree = $.fn.zTree.getZTreeObj("usertree");
				 zTree.expandAll(true); 
			}
		});
}
