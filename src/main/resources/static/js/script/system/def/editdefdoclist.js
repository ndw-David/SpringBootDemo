function JqValidate(){
	return $("#formId").validate({
		rules:{
			doc_code:"required",
			doc_name:"required",
			num:{
				number:true,
				required:true
			}
		},
		messages:{
			doc_code:"编码不能为空",
			doc_name:"名称不能为空",
			num:"请输入合法数字"
		}
	});
}
//保存
function add(){
	if(JqValidate().form()){
		$("#formId").ajaxSubmit({
	        type:"post",
	        url:"../defdoc/adddefdoclist.do",
	        success:function(){
	        	layer.alert('操作成功', function(){
	        			parent.$('#defdoclisttable').bootstrapTable('refresh'); 
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
