//手机号验证
jQuery.validator.addMethod("isMobile", function(value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");
//电话号码验证 
jQuery.validator.addMethod("isTel", function(value, element) { 
  var tel = /^\d{3,4}-?\d{7,9}$/; //电话号码格式010-12345678 
  return this.optional(element) || (tel.test(value)); 
}, "请正确填写您的电话号码");
//电子邮件验证
jQuery.validator.addMethod("isEmail",function(value,element){
	var email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	return this.optional(element) || (email.test(value));
},"请输入正确格式的电子邮件");
function JqValidate(){
	return $("#formId").validate({
		rules:{
			account:{
				required:true,
				accountIsAlreadyExist:true
			},
			username:"required",
			sex:"required",
			email:{
				isEmail:true
			},
			mobile:{
				minlength : 11,
				maxlength : 11,
	            isMobile : true
			},
			tel:{
				isTel : true
			}
		},
		messages:{
			account:{
				required:"登录名不能为空",
				accountIsAlreadyExist:"登录名已存在"
			},
			username:"姓名不能为空",
			sex:"请选择性别",
			email:{
				isEmail:"输入正确格式的电子邮件"
			},
			mobile:{
	            minlength : "确认手机不能小于11位",
	            isMobile : "请正确填写您的手机号码"
	        },
	        tel:{
	        	isTel : "请正确填写您的电话号码"
	        }

		}
	});
}
//保存
function add(){
	
	if(JqValidate().form()){
		$("#formId").ajaxSubmit({
	        type:"post",
	        url:"../user/add?"+ Math.random(),
	        success:function(){
	        	layer.open({
	        		 content: '操作成功', 
	        		 yes: function(index, layero){
	        			 	parent.query();
		        			winclose();
	        		 },
	        		 cancel: function(){ 
	        			 	parent.query();
	        			 	winclose();
	        		 }
	        	});
	        },
	        error: function(xmlHttpRequest, textStatus, errorThrown){  
	        	layer.open({
	      		  type: 2,
	      		  title: '信息',
	      		  shadeClose: true,
	      		  area : ['500px' , '400px'],
	      		  content: '../sysCommon/toerror',
	      		  btn: ['确定']
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
//判断登陆名是否存在
jQuery.validator.addMethod("accountIsAlreadyExist", function(value, element) {
	var result = true;
	$.ajax({
		url:"../user/checkUser.do",
		data:{account:value},
		async:false,
		success:function(data){			 
			if(data=='false'){
				result = false;
			}
		}
	});
	return result;
}, "登陆名已存在");
