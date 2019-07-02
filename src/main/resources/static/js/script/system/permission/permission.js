var zTree;
var setting = {
	check: {
	        enable: true,
	        chkStyle: "radio",
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
    		orgtree(treeNode.id);
    	},
    	onCheck:function (e, treeId, treeNode, clickFlag) { 
    		orgtree(treeNode.id);
    	}
    }
};

var setting1 = {
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

$(function () {
	$("#usertree").height(document.body.clientHeight - 158);
	usertree();
	$("#orgtree").height(document.body.clientHeight - 180);
	//orgtree();
});

 
//获取用户树
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


//获取机构树
function orgtree(id){ 
	 $.ajax({
		url : '../per/queryOrgTree.do?userid='+id,
		dataType:'json',
		success : function(data) {
			 $.fn.zTree.init($("#orgtree"), setting1, data);
			 var zTree = $.fn.zTree.getZTreeObj("orgtree");
			 zTree.expandAll(true); 
		}
	});
}

function add(){
	
	 var usertreeObj = $.fn.zTree.getZTreeObj("usertree");
     var usernodes = usertreeObj.getCheckedNodes(true);
     var selectuserNodes = "";
     for(var j = 0 ; j < usernodes.length ; j++){
    	 if (selectuserNodes != '') {
    		 selectuserNodes += ',';
 		 }
    	 selectuserNodes += usernodes[j].id;
     }

     
     var orgtreeObj = $.fn.zTree.getZTreeObj("orgtree");
     var orgnodes = orgtreeObj.getCheckedNodes(true);
     var selectorgNodes = "";
     for(var i = 0 ; i < orgnodes.length ; i++){
    	 if (selectorgNodes != '') {
    		 selectorgNodes += ',';
 		 }
    	 selectorgNodes += orgnodes[i].id;
     }
     
     if((selectuserNodes == "")&&(selectorgNodes != "")){
    	 layer.alert('请选择需要配置权限的用户');
     }else if((selectuserNodes != "")&&(selectorgNodes == "")){
    	 layer.alert('请选择需要配置权限的机构');
     }else{
    	 console.log(selectuserNodes + "---" + selectorgNodes);
    	 $.ajax({
    			url : '../per/setper.do?' + Math.random(),
    			dataType:'text',
    			data : {
    				'selectuserNodes' : selectuserNodes,
    				'selectorgNodes' : selectorgNodes
    			},
    			success : function(data) {
    				layer.alert('操作成功');
    			}
    		});
     }
}

function checkorgs(){
	var orgtreeObj = $.fn.zTree.getZTreeObj('orgtree');
	if (document.getElementById("orgs").checked) {
		orgtreeObj.checkAllNodes(true);
	} else {
		orgtreeObj.checkAllNodes(false);
	}
}

function checkusers(){
	var usertreeObj = $.fn.zTree.getZTreeObj('usertree');
	if (document.getElementById("users").checked) {
		usertreeObj.checkAllNodes(true);
	} else {
		usertreeObj.checkAllNodes(false);
	}
}

function copyset(){

	 var usertreeObj = $.fn.zTree.getZTreeObj("usertree");
     var usernodes = usertreeObj.getCheckedNodes(true);
     var selectuserNodes = "";
    
     selectuserNodes += usernodes[0].id;

     
   	if (selectuserNodes == "") {
		layer.alert("请选择要复制的用户");
	} else {
		var index = layer.open({
			  type: 2,
			  title: '权限配置',
			  shadeClose: false, //点击遮罩关闭层
			  area : ['500px' , '95%'],
			  content: '../per/topaste.do',
			  btn: ['确定'],
			  
			  yes:function(index){
				  var treeObj = frames[0].$.fn.zTree.getZTreeObj("usertree");
				  var nodes = treeObj.getCheckedNodes(true);
				  if(nodes != ''){
					  $.ajax({
							url : '../per/paste.do?nodes=' + JSON.stringify(nodes) + '&userId=' + selectuserNodes,
							dataType:'text',
							success : function(data) {
								if(data=='true'){
									layer.alert('操作成功');
									layer.close(index);
								}else{
									layer.alert('操作失败');
								}
							}
						});
				 }else{
						layer.close(index);
				 }
			  }
		});
	}
    
}