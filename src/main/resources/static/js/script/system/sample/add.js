function JqValidate(){
	return $("#formId").validate({
		rules:{
			/*dataName:{
				required:true,
				accountIsAlreadyExist:true
			},*/
			dataName:"required",
			dataEname:"required",
			sourceName:"required",
			owner:"required",
			user:"required"
			
		},
		messages:{
			dataName:"不能为空",
			dataEname:"不能为空",
			sourceName:"不能为空",
			owner:"不能为空",
			user:"不能为空",
			

		}
	});
}
//保存
function add(){
	var field1 = $("#a1").val()+","+$("#a2").val()+","+$("#a3").val()+","+$("#a4").val()+",";
	if($("#div1").is(":hidden")){
	     alert("div1");    //如果元素为隐藏,则将它显现
	}else{
	          //如果元素为显现,则将其隐藏
	}
	alert(field1);
	$("#field1").val(field1);
	if(JqValidate().form()){
		$("#formId").ajaxSubmit({
	        type:"post",
	        url:"../exDataSample/add.do?a1="+ a1,
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
	      		  content: '../sysCommon/toerror.do',
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
