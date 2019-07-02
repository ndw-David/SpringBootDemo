$(function () {
	var sexId = $("#sexId").val();
	var islockedId = $("#islockedId").val();
	$("#sex").val(sexId);
	$("#islocked").val(islockedId);
});

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

function JqValidate(){
	return $("#formId").validate({
		rules:{
			username:"required",
			sex:"required",
			email:"email",
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
			username:"姓名不能为空",
			sex:"请选择性别",
			email:"请输入正确格式的电子邮件",
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
function add(){
	if(JqValidate().form()){
		$("#formId").ajaxSubmit({
	        type : 'post',
	        url  : '../user/add.do?'+ Math.random(),
	        success:function(){
	        	layer.alert('操作成功');
	        }
		});
   }
}

function changepwd(){
	layer.open({
		  type: 2,
		  title: '修改密码',
		  shadeClose: true, //点击遮罩关闭层
		  area : ['800px' , '300px'],
		  content: '../user/tochangepwd.do'
	});
}

//关闭
function winclose() {
	var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
	parent.layer.close(index);
}