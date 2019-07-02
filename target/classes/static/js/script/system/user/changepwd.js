jQuery.validator.addMethod("notequal", function(value, element) { 
  var oldpassword = $("#oldpassword").val();
  var newpassword = $("#newpassword").val();
  return this.optional(element) || (oldpassword != newpassword); 
}, "新密码不能与原始密码相同，请重新设置");

jQuery.validator.addMethod("isequal", function(value, element) {
  var newpassword = $("#newpassword").val();
  var ensurepassword = $("#ensurepassword").val();
  return this.optional(element) || (ensurepassword == newpassword); 
}, "确认密码与新密码不一致，请重新填写");

jQuery.validator.addMethod("iscorrect", function(value, element) {
	var result = true;
	$.ajax({
		url:"../user/checkpwd.do",
		data:{
			   id : $("#id").val(),
		       oldpassword : $("#oldpassword").val()
		},
		async:false,
		success:function(data){			 
			if(data=='false'){
				result = false;
			}
		}
	});
	return result;
}, "原始密码填写错误");

function JqValidate(){
	return $("#formId").validate({
		rules:{
			oldpassword : {
				iscorrect : true
			},
			newpassword :{
				minlength : 8,
				required : true,
				notequal : true
			},
			ensurepassword : {
				minlength : 8,
				required : true,
				isequal : true
			}
		},
		messages:{
			oldpassword : {
				iscorrect : "原始密码填写错误"
			},
			newpassword : {
	            minlength : "密码不能少于8位",
	            required : "新密码不能为空",
	            notequal : "新密码不能与原始密码相同，请重新设置"
	        },
			ensurepassword : {
	            minlength : "密码不能少于8位",
	            required : "确认密码不能为空",
	            isequal : "确认密码与新密码不一致，请重新填写"
	        }
		}
	});
}

function add(){
	if(JqValidate().form()){
	 
		$.ajax({
			url : '../user/changepwd.do',
			data : {
				id : $("#id").val(),
				newpassword : $("#newpassword").val()
			},
			method: 'post',
			success : function(data) {
					layer.alert('操作成功',function(){
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