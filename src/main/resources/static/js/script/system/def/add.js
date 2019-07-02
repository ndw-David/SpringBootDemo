function JqValidate(){
	return $("#formId").validate({
		rules:{
			type_code:"required",
			type_name:"required"
		},
		messages:{
			type_code:"编码不能为空",
			type_name:"名称不能为空"
		}
	});
}
//保存
function add(){
	if(JqValidate().form()){
		$("#formId").ajaxSubmit({
	        type:"post",
	        url:"../defdoc/add.do?"+ Math.random(),
	        success:function(){
	        	layer.alert('操作成功', function(){
	        			parent.query();
	        			winclose();
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
