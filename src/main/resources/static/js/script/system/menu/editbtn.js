function JqValidate(){
	return $("#formId").validate({
		rules:{
			menuCode:"required",
			menuName:"required"
		},
		messages:{
			menuCode:"按钮编码不能为空",
			menuName:"按钮名称不能为空"
		}
	});
}
//保存
function add(){
	if(JqValidate().form()){
		$("#formId").ajaxSubmit({
	        type:"post",
	        url:"../menu/addbtn.do?time="+ (new Date()).getTime(),
	        success:function(){
	        	layer.alert('操作成功', function(){
	        			parent.$('#btntable').bootstrapTable('refresh'); 
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
