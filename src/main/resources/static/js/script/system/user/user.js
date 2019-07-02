$(function () {
	queryUserByPage();
});
	 
// 分页查询用户列表
function queryUserByPage(){
	$('#usertable').bootstrapTable({
		url: '../user/list',
	    method: 'post',      // 请求方式（*）
	    striped: true,      // 是否显示行间隔色
	    cache: false,      // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	    pagination: true,     // 是否显示分页（*）
	    sortStable:true,      // 是否启用排序
	    sortOrder: "desc",     // 排序方式
	    singleSelect:true,
	    "queryParamsType": "limit",
	    contentType: "application/x-www-form-urlencoded",
	    queryParams:function(params) {
	   		return {
	   			'pageSize': params.limit,
	   			'pageNumber': params.offset,
	   			'account':$('#account').val(),
	   			'username':$('#username').val(),
	   			'islocked':$('#islocked').val(),
	   		   'sortName':params.sort,
               'sortOrder':params.order
	   		};
	    },
	    /*
		 * showToggle: true, showColumns: true, showRefresh: true,
		 */
	    sidePagination: "server",   // 分页方式：client客户端分页，server服务端分页（*）
	    pageNumber:1,      // 初始化加载第一页，默认第一页
	    pageSize: 10,      // 每页的记录行数（*）
	    pageList: [10, 25, 50, 100],  // 可供选择的每页的行数（*）
	    clickToSelect: true,    // 是否启用点击选中行
	    uniqueId: "id",      // 每一行的唯一标识，一般为主键列
	    columns: [{
	    	checkbox: true
	    },{
	    	field: 'Number',
	     	title: '序号',
	     	width:40,
	     	align:'center',
	     	 
	     	formatter: function (value, row, index) {
            	return index+1;
         	}
	    
		}, {
	     	field: 'account',
	     	title: '用户名',
	     	 sortable: true
	    }, {
	     	field: 'username',
	     	title: '姓名',
	        sortable: true
	    },{
	     	field: 'mobile',
	     	title: '手机号',
	        sortable: true
	    },
	    {
	     	field: 'email',
	     	title: '邮箱',
	     	sortable: true
	    },{
	     	field: 'sex',
	     	sortable: true,
	     	title: '性别',
	     	formatter:function(value, row, index) {
	     		if(value == 0){
	     			return '男';
	     		}else{
	     			return '女';
	     		}
	     	}
	    },{
	     	field: 'islocked',
	     	sortable: true,
	     	title: '状态',
	     	formatter:function(value, row, index) {
	     		if(value == 0){
	     			return '<span style="color:green">启用</span>';
	     		}else{
	     			return '<span style="color:red">禁用</span>';
	     		}
	     	}
	     	/*
			 * cellStyle:function(value, row, index) { return "22222"; }
			 */
	    },{
	     	field: 'memo',
	     	title: '描述',
	     	sortable: true
	    }]
  });
};
// 查询
function query(){
	$('#usertable').bootstrapTable('destroy');
	queryUserByPage();
// $('#usertable').bootstrapTable('refresh');
}
// 新增
function add(){
	var index = layer.open({
		  type: 2,
		  title: '新增',
		  shadeClose: true, // 点击遮罩关闭层
		  area : ['800px' , '380px'],
		  content: '../user/toadd'
	});
	layer.full(index);
}
// 编辑
function edit(){
	var selects = $('#usertable').bootstrapTable('getSelections');
	var id = "";
	$.map(selects, function (row) {
		id = row.id;
	});  
	if(id == ""){
		layer.alert('请选择需要编辑的数据');
	}else{
		var index =	layer.open({
			  type: 2,
			  title: '编辑',
			  shadeClose: true, // 点击遮罩关闭层
			  area : ['900px' , '500px'],
			  content: '../user/toedit.do?id='+id
		});
		layer.full(index);
	}
}
// 删除
function del(){
	var selects = $('#usertable').bootstrapTable('getSelections');
	var id = "";
	$.map(selects, function (row) {
		id = row.id;
	});  
	if(id == ""){
		layer.alert('请选择需要删除的数据');
	}else{
		layer.confirm('您确定要删除所选数据吗？', {
			btn: ['确定','取消']
			}, 
			function(){
				$.ajax({
					url : '../user/del.do?id='+id,
					method: 'post',
					success : function(data) {
						$('#usertable').bootstrapTable('refresh');
						layer.alert('操作成功');
					}
				});
		});
	}
}

function resetForm(){
	$('#formSearch')[0].reset();
}
// 关联角色
function set(){
	var selects = $('#usertable').bootstrapTable('getSelections');
	var id = "";
	$.map(selects, function (row) {
		id = row.id;
	});  
	if(id == ""){
		layer.alert('请选择需要关联的数据');
	}else{
		layer.open({
			  type: 2,
			  title: '关联角色',
			  shadeClose: true, // 点击遮罩关闭层
			  area : ['400px' , '95%'],
			  content: '../user/tosetrole.do?id='+id
		});
	}
}


//重置密码
function reset() {
	var selects = $('#usertable').bootstrapTable('getSelections');
	var id = "";
	$.map(selects, function(row) {
		id = row.id;
	});
	if (id == "") {
		layer.alert('请选择需要重置的数据');
	} else {
		layer.confirm('您确定要重置所选数据吗？', {
			btn : [ '确定', '取消' ]
		}, function() {
			$.ajax({
				url : '../user/reset.do?userId=' + id,
				method : 'post',
				success : function(data) {
					$('#usertable').bootstrapTable('refresh');
					layer.alert('操作成功');
				}
			});
		});
	}
}



