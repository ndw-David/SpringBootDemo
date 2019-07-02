function JqValidate(){
	return $("#formId").validate({
		rules:{
			org_code:{
				number:true,
				required:true
			},
			org_name:"required",
		},
		messages:{
			org_code:"机构编码只能为数字",
			org_name:"机构名称不能为空",
		}
	});
}
//保存
function add(){
		if(JqValidate().form()){
			$("#formId").ajaxSubmit({
		        type:"post",
				dataType : 'json',
		        url:"../org/add.do?time="+ (new Date()).getTime(),
		        success:function(data){
		        	if (data == "") {
		        		layer.alert('操作成功', function(){
		        			parent.menutree($("#formId >[name=tablename]").val());
		        			var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
		                    parent.layer.close(index);
		            	});
					} else {
						layer.alert(data);
						$('#org_code').val("");
					}
		        	
		        }
		    });
		}
 }
//关闭
function winclose(){
	var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(index);
}

//弹出机构树
function openMenuTree(tablename){
	 layer.open({
		  type: 2,
		  title: '选择上级节点',
		  shadeClose: true, //点击遮罩关闭层
		  area : ['400px','95%'],
		  content: '../org/menutree.do?tablename='+tablename
	});
	
}

function menutypeOnchge(val){
	if(val == 0){
		$("#urlDivId").hide();
	}else{
		$("#urlDivId").show();
	}
}