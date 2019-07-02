var id=0;
var name = "";
var tablename = ""; 
var pid = "";
var setting = {
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
        beforeClick: function(treeId, o) {
        	if(o.children == undefined ){
				$("#btn_del").show();
			}else{
				$("#btn_del").hide();
			}
			$("#btn_edit").show();
			getMenuById(o.id);
			id = o.id;
			name = o.name;
			pid = o.pid;
        }
    }
};

function getMenuById(id){
	$.ajax({
		url : '../org/getMenuById.do?id='+id+"&tablename="+$("#tablename").val(),
		dataType:'json',
		success : function(data) {
			$("#org_code").val(data.org_code);
			$("#org_name").val(data.org_name);
			$("#pname").val(data.pname);
			$("#des").val(data.des);
		}
	});
}

$(function () {
	$("#menutree").height(document.body.clientHeight - 80);
	$("#orgcontent").height(document.body.clientHeight - 85);
	menutree($("#tablename").val());
	$("#tablename").change(function(){
		$("#btn_del").hide();
		$("#btn_edit").hide();
		menutree($(this).val());
	});
});

//获取机构树
function menutree(tablename){
	 $.ajax({
		url : '../org/queryOrgTree.do?tablename='+tablename,
		dataType:'json',
		success : function(data) {
			 $.fn.zTree.init($("#menutree"), setting, data);
			 var zTree = $.fn.zTree.getZTreeObj("menutree");
			 zTree.expandAll(true); 
		}
	});
}

//新增
function add(){
   layer.open({
		  type: 2,
		  title: '新增',
		  shadeClose: true, //点击遮罩关闭层
		  area : ['800px' , '380px'],
		  content: '../org/toadd.do?tablename=' + $("#tablename").val() + '&pid=' + id + '&pname=' + name
	});
}
//删除
function del(){
	if(id == ""){
		if (name == "") {
			layer.alert('请选择需要删除的数据');
		} else {
          layer.alert('不能删除根节点');
		}
	}else{
	$.ajax({
		url : '../org/checkchildren.do?id='+id+"&tablename="+$("#tablename").val(),
		dataType : 'json',
		async : false,
		success : function(data){
			if (data != "") {
				layer.alert(data);
			} else {    
				layer.confirm('您确定要删除该节点吗？', {
					btn: ['确定','取消']
					}, function(){
						$.ajax({
							url : '../org/del.do?id='+id+"&tablename="+$("#tablename").val(),
							dataType:'text',
							success : function() {
								layer.alert('操作成功');
								$('#formId')[0].reset();
					        	menutree($("#tablename").val());
					        	$("#btn_edit").hide();
					        	$("#btn_del").hide();
							}
						});
					}, function(){
						var index = parent.layer.getFrameIndex(window.name);
					    parent.layer.close(index);
					});
          }

		}
	});
  }
}
//编辑
function edit(){
	if(id == ""){
		if (name == "") {
			layer.alert('请选择需要编辑的数据');
		} else {
          layer.alert('不能编辑根节点');
		}
	}else{
	   layer.open({
			  type: 2,
			  title: '编辑',
			  shadeClose: true, //点击遮罩关闭层
			  area :  ['800px' , '380px'],
			  content: '../org/toedit.do?id='+id+"&tablename="+$("#tablename").val()
		});
	}
}

//导入
function imp(){
	
	$("#file").val("");
	$("#file").click();
}

// 模板下载
function exptemp(){
	layer.confirm('您即将下载模板', {
			btn : [ '确定', '取消' ]
	}, function() {
			window.open('../org/downloadtemp.do?');
			layer.alert('操作完成');
	});
}

//上传文件检查
function impchk() {
	var str = $("#file").val();
	if (str.length != 0) {
		var reg = "^.*\.(?:xls)$";
		var r = str.match(reg);
		if (r == null) {
			layer.alert('对不起，您的文件格式不正确，只能上传.xls文件，请重新上传');
			$("#file").val("");
		} else {
			if (window.ActiveXObject) {
				var image = new Image();
				image.dynsrc = str;
				if (image.fileSize > 20480000) {
					layer.alert('上传的文件大小不能超过20M，请重新上传');
					$("#file").val("");
					return false;
				}
			} else {
				var size = document.getElementById("file").files[0].size;
				if (size > 20480000) {
					layer.alert('上传的文件大小不能超过20M，请重新上传');
					$("#file").val("");
					return false;
				}
			}
			uploadsubmit();
		}
	} else {
		layer.alert('请先上传文件');
		$("#file").val("");
	}
}

function uploadsubmit() {
	var index = layer.load(0, {
		shade : [ 0.1, '#999999' ]
	// 0.1透明度的白色背景
	});
	$('#fileformId').ajaxSubmit({
		url : '../org/uploaddata.do',
		type : 'post',
		dataType : 'json',
		data: {
			'tabname' : $("#tablename").val(),
		},
		success : function(data) {
			layer.alert(data);
			layer.close(index);
			menutree($("#tablename").val());
		}
	});
}