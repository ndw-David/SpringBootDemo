function JqValidate(){
	return $("#formId").validate({
		rules:{
			roleCode:{
				required:true,
				roleCodeIsAlreadyExist:true
			},
			roleName:{
				required:true,
				roleNameIsAlreadyExist:true
			} 
		},
		messages:{
			roleCode:{
				required:"角色编码不能为空",
				roleCodeIsAlreadyExist:"角色编码已存在"
			},
			roleName:{
				required:"角色名称不能为空",
				roleNameIsAlreadyExist:"角色名称已存在"
			}
		}
	}); 
}
//保存
function add(){
	if(JqValidate().form()){
		$("#formId").ajaxSubmit({
	        type:"post",
	        url:"../role/add.do?time="+ (new Date()).getTime(),
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

jQuery.validator.addMethod("roleCodeIsAlreadyExist", function(value, element) {
	var result = true;
	$.ajax({
		url:"../role/checkRole.do",
		data:{roleCode:value,id:$("#id").val()},
		async:false,
		success:function(data){			 
			if(data=='false'){
				result = false;
			}
		}
	});
	return result;
}, "角色编码已存在");


jQuery.validator.addMethod("roleNameIsAlreadyExist", function(value, element) {
	var result = true;
	$.ajax({
		url:"../role/checkRole.do",
		data:{roleName:value,id:$("#id").val()},
		async:false,
		success:function(data){			 
			if(data=='false'){
				result = false;
			}
		}
	});
	return result;
}, "角色名称已存在");
