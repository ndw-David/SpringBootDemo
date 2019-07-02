function JqValidate(){
	return $("#formId").validate({
		rules:{
			menuName:"required",
			url: {
                 required: function() {return $("#type").val()=="1"; }
         	},
         	num:"digits"
		},
		messages:{
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
			dataType : 'json',
	        url:"../menu/add.do?time="+ (new Date()).getTime(),
	        success:function(data){
	        	if (data == "1") {
	        		layer.alert('操作成功', function(){
	        			parent.menutree();
	        			var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	                    parent.layer.close(index);
	            	});
				} else {
					layer.alert(data);
					$('#menuCode').val("");
				}
	        	
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
