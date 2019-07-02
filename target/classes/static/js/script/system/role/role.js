$(function () {
	queryRoleByPage();
});
	 
//分页查询角色列表	 
function queryRoleByPage(){
	$('#roletable').bootstrapTable({
		url: '../role/list.do',
	    method: 'post',      //请求方式（*）
	    striped: true,      //是否显示行间隔色
	    cache: false,      //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	    pagination: true,     //是否显示分页（*）
	    singleSelect:true,
	    "queryParamsType": "limit",
	    contentType: "application/x-www-form-urlencoded",
	    queryParams:function(params) {
	   		return {
	   			'pageSize': params.limit,
	   			'pageNumber': params.offset,
	   			'roleCode':$('#roleCode').val(),
	   			'roleName':$('#roleName').val()
	   		};
	    },
	    sidePagination: "server",   //分页方式：client客户端分页，server服务端分页（*）
	    pageNumber:1,      //初始化加载第一页，默认第一页
	    pageSize: 10,      //每页的记录行数（*）
	    pageList: [10, 25, 50, 100],  //可供选择的每页的行数（*）
	    clickToSelect: true,    //是否启用点击选中行
	    uniqueId: "id",      //每一行的唯一标识，一般为主键列
	    classes:"table table-hover table-fix",
	    columns: [{
	    	checkbox: true
	    },{
	    	field: 'Number',
	     	title: '序号',
	     	width:'10%',
	     	align:'center',
	     	formatter: function (value, row, index) {
            	return index+1;
         	}
		}, {
	     	field: 'roleCode',
	     	title: '角色编码',
	     	width:'20%',
	    }, {
	     	field: 'roleName',
	     	title: '角色名称',
	     	width:'20%',
	    },{
	     	field: 'des',
	     	title: '描述',
	     	cellStyle:'overflow:hidden;',
	     	formatter:function(value,row,index){
	     		 var divHtml = "<div id='roleValue' style='width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;'>"+value+"</div>";
	     		 return divHtml;
	     	}
	    }],
	    onClickCell:function(field, value, row, element){
	    	/*if((value.length*10) > ($('#roletable').width()/2)){
	    		layer.alert(value);
	    	}*/
	    	if((getStrLength(value)*7)>($('#roleValue').width())){
	    		layer.alert(value);
	    	}
	    }
  });
};
//查询
function query(){
	$('#roletable').bootstrapTable('destroy');
	queryRoleByPage();
//	$('#roletable').bootstrapTable('refresh');
}
//新增
function add(){
	layer.open({
		  type: 2,
		  title: '新增',
		  shadeClose: true, //点击遮罩关闭层
		  area : ['800px' , '380px'],
		  content: '../role/toadd.do'
	});
}
//编辑
function edit(){
	var selects = $('#roletable').bootstrapTable('getSelections');
	var id = "";
	$.map(selects, function (row) {
		id = row.id;
	});  
	if(id == ""){
		layer.alert('请选择需要编辑的数据');
	}else{
		layer.open({
			  type: 2,
			  title: '编辑',
			  shadeClose: true, //点击遮罩关闭层
			  area : ['800px' , '380px'],
			  content: '../role/toedit.do?id='+id
		});
	}
}
//删除
function del(){
	var selects = $('#roletable').bootstrapTable('getSelections');
	var id = "";
	$.map(selects, function (row) {
		id = row.id;
	});  
	if(id == ""){
		layer.alert('请选择需要删除的数据');
	}else{
		$.ajax({
			url : '../role/checkUsedRole.do?id=' + id,
			async : false,
			success : function(data){
				if (data != "") {
  					layer.alert(data);
  				} else {
	  					layer.confirm('您确定要删除所选数据吗？', {
	  					btn: ['确定','取消']
	  					}, 
	  					function(){
	  						$.ajax({
	  							url : '../role/del.do?id='+id,
	  							method: 'post',
	  							success : function(data) {
	  								$('#roletable').bootstrapTable('refresh');
	  								layer.alert('操作成功');
	  							}
	  						});
	  				});  					
  				}
  			}
		});
	}
}

function resetForm(){
	$('#formSearch')[0].reset();
}
//关联菜单
function set(){
	var selects = $('#roletable').bootstrapTable('getSelections');
	var id = "";
	$.map(selects, function (row) {
		id = row.id;
	});  
	if(id == ""){
		layer.alert('请选择需要关联的数据');
	}else{
		layer.open({
			  type: 2,
			  title: '关联菜单',
			  shadeClose: true, //点击遮罩关闭层
			  area : ['400px' , '95%'],
			  content: '../role/tosetmenu.do?id='+id
		});
	}
}
