function add(){
		$("#formId").ajaxSubmit({
	        type:"post",
	        url:"../sysDic/add.do?"+ Math.random(),
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
//关闭
function winclose(){
	var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(index);
}

