$(function () {
    var fPurchaseTime = {  
            elem: '#fPurchaseTime', //选择ID为fPurchaseTime的input  
            max: '2099-12-31 23:59:59', //最大日期  
            choose: function(datas){ 
            	
            	end_date.min = datas; //开始日选好后，重置结束日的最小日期  
            	end_date.start_date = datas;//将结束日的初始值设定为开始日 
                
            }  
        };  
       
        laydate(fPurchaseTime);  
      
	
});
function JqValidate(){
	return $("#formId").validate({
		errorPlacement: function(error, element) {                             //错误信息位置设置方法
			 error.appendTo( element.parent().next() );                            //这里的element是录入数据的对象
			 },
			 success: function(label) {
			 label.addClass("error checked");
			 },
		rules:{
			dataName:"required",
			dataEname:"required",
			category:"required",
			subClass:"required",
			purchaseDept:"required",
			userDept:"required",
			channelName:"required",
			fPurchaseTime:"required",
			appScenarios:"required",
			riskControl:"required",
			sharedScope:"required"
		},
		messages:{
			dataName:"不能为空",
			dataEname:"不能为空",
			category:"请选择",
			subClass:"请选择",
			purchaseDept:"不能为空",
			userDept:"不能为空",
			channelName:"不能为空",
			fPurchaseTime:"不能为空",
			appScenarios:"不能为空",
			riskControl:"不能为空",
			sharedScope:"不能为空"
		
			
		}
	});
	
}

//保存
function add(){
	if(JqValidate().form()){
		$("#formId").ajaxSubmit({
	        type:"post",
	        url:"../exDataMenu/add.do?"+ Math.random(),
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

function addDept(){
	layer.open({
		  type: 2,
		  title: '编辑',
		  shadeClose: true, //点击遮罩关闭层
          area : ['400px' , '350px'],//宽度，高度
		  content: '../exDataMenu/toAddDept.do'
	});
}












