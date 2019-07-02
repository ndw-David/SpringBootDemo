var zTree;
var setting = {
    view: {
        dblClickExpand: false,
        showLine: true,
        selectedMulti: false
    },
    data: {
        simpleData: {
            enable:true,
            idKey: "code",
            pIdKey: "pid",
            rootPId: ""
        }
    },
    callback: {
        beforeClick: function(treeId, o) {
        	if(o.children == undefined ){
				$("#btn_del").show();
			}else{
				$("#btn_del").hide();
			}
			$("#btn_edit").show();
			getMenuById(o.id);
			id = o.id;
			code = o.code;
			name = o.name;
        }
    }
};
$(function () {
	$("#menutree").height(document.body.clientHeight - 100);
	$("#menucontent").height(document.body.clientHeight - 85);
	menutree();
});
var id = "";
var code = "";
var name = "";
//获取菜单树
function menutree(){
	 $.ajax({
		url : '../menu/queryMenuTree.do',
		dataType:'json',
		success : function(data) {
			 $.fn.zTree.init($("#menutree"), setting, data);
			 //var zTree = $.fn.zTree.getZTreeObj("menutree");
			 //zTree.expandAll(true); 
		}
	});
}
function getMenuById(id){
	$.ajax({
		url : '../menu/getMenuById.do?id='+id,
		dataType:'json',
		success : function(data) {
			$("#menucode").val(data.menuCode);
			$("#menuname").val(data.menuName);
			$("#menutype").val(data.type);
			if(data.type == 0){
				$("#urlDivId").hide();
			}else{
				$("#urlDivId").show();
			}
			$("#url").val(data.url);
			$("#pid").val(data.pname);
			$("#des").val(data.des);
			$("#num").val(data.num);
		}
	});
}
//新增
function add(){
	 var n = encodeURI(encodeURI(name));
	
	var index = layer.open({
		  type: 2,
		  title: '新增',
		  shadeClose: true, //点击遮罩关闭层
		  area : ['800px' , '420px'],
		  content: '../menu/toadd.do?pid=' + code + '&pname=' + n
	});
	layer.full(index);
}
//编辑
function edit(){
	
	var index = layer.open({
		  type: 2,
		  title: '编辑',
		  shadeClose: true, //点击遮罩关闭层
		  area : ['800px' , '420px'],
		  content: '../menu/toedit.do?id='+id
	});
	layer.full(index);
}
//删除
function del(){
	layer.confirm('您确定要删除该节点吗？', {
		btn: ['确定','取消']
		}, function(){
			$.ajax({
				url : '../menu/del.do?id='+id,
				dataType:'text',
				success : function(data) {
					layer.alert('操作成功');
					$('#formId')[0].reset();
		        	menutree();
		        	$("#btn_edit").hide();
		        	$("#btn_del").hide();
		        	name = "";
				}
			});
		}, function(){
			var index = parent.layer.getFrameIndex(window.name);
		    parent.layer.close(index);
		});
}
function manage(){
	layer.open({
		  type: 2,
		  title: '按钮管理',
		  shadeClose: true, //点击遮罩关闭层
		  area : ['800px' , '400px'],
		  content: '../menu/tobtnlist.do?id='+code
	});
}