$(function () {
	var menutype = $("#menutype").val();
	$("#type").val(menutype);
	if(menutype == 0){
		$("#urlDivId").hide();
	}else{
		$("#urlDivId").show();
	}
});
function JqValidate(){
	return $("#formId").validate({
		rules:{
			menuCode:"required",
			menuName:"required",
			url: {
                 required: function() {return $("#type").val()=="1"; }
         	},
         	num:"digits"
		},
		messages:{
			menuCode:"菜单编码不能为空",
			menuName:"菜单名称不能为空",
			url: {
                 required: "URL不能为空"
         	},
         	num:"序号只能输入整数",
		}
	});
}
//保存
function add(){
	if(JqValidate().form()){
		$("#formId").ajaxSubmit({
	        type:"post",
	        url:"../menu/add.do?time="+ (new Date()).getTime(),
	        success:function(){
	        	layer.alert('操作成功', function(){
	        			parent.menutree();
	        			parent.getMenuById($("#id").val());
	        			var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	                    parent.layer.close(index);
	        	});
	        }
	    });
	}
}
//关闭
function winclose(){
	var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(index);
}

//弹出菜单树
function openMenuTree(){
	 layer.open({
		  type: 2,
		  title: '选择上级节点',
		  shadeClose: true, //点击遮罩关闭层
		  area : ['400px','95%'],
		  content: '../menu/menutree.do'
	});
	
}

function typeOnchge(val){
	if(val == 0){
		$("#urlDivId").hide();
	}else{
		$("#urlDivId").show();
	}
}