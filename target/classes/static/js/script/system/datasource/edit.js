$(function () {
	var dsId = $("#dataSourceTypeId").val();
	$("#dataSourceType").val(dsId);
});
var testConnect = false;
function JqValidate(){
	return $("#formId").validate({
		rules:{
			dataSourceType:"required",
			dataSourceName:{
				required:true,
				dsNameIsAlreadyExist:true
			}, 
			dataSourceDriver:"required",
			dataSourceUrl:"required",
			dataSourceUser:"required",
			dataSourcePassword:"required"			 
		},
		messages:{
			dataSourceType:"数据源类型不能为空",
			dataSourceName:{
				required:"数据源名不能为空",
				dsNameIsAlreadyExist:"数据源名已存在"
			},
			dataSourceDriver:"驱动不能为空",
			dataSourceUrl:"url不能为空",
			dataSourceUser:"用户名不能为空",
			dataSourcePassword:"密码不能为空"
		}
	});
}

//判断数据源名是否存在
jQuery.validator.addMethod("dsNameIsAlreadyExist", function(value, element) {
	var result = true;
	$.ajax({
		url:"../data_source/checkdsname.do",
		data:{dsname:value,
			  id:$("#id").val()},
		async:false,
		success:function(data){			 
			if(data=='false'){
				result = false;
			}
		}
	});
	return result;
}, "数据源名已存在");

//切换数据库类型
function dsTypeChange(){ 
	$.ajax({
		url:"../data_source/getEnumDataSourceTypeByKey.do",
		data:{key:$("#dataSourceType").val()},
		async:false,
		success:function(data){			 
			 data = eval('('+data+')');
			 $("#dataSourceDriver").val(data.driver);
			 $("#dataSourceUrl").val(data.url);
		}
	});
}

//连接测试
function testCon(){
	if(JqValidate().form()){
		$("#formId").ajaxSubmit({
	        type:"post",
	        url:"../data_source/testConnect.do?"+ Math.random(),
	        success:function(data){
	        	testConnect = data;
	        	if(testConnect=='true'){
	        		layer.alert('测试成功!');
	        	}
	        	else{
	        		layer.alert('测试失败,请检查各项参数是否正确');
	        	}
	        }
	    });
	}
}

//保存
function add(){
	if(JqValidate().form()){
		$("#formId").ajaxSubmit({
	        type:"post",
	        url:"../data_source/add.do?"+ Math.random(),
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
	        }
	    });
	}
}
//关闭
function winclose(){
	var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(index);
}

