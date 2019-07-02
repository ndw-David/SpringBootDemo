$(function() {
	query();
});
function query() {
	$('#userlisttable').bootstrapTable({
		url : '../user/userlist.do',
		method : 'post', // 请求方式（*）
		striped : true, // 是否显示行间隔色
		cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination : true, // 是否显示分页（*）
		singleSelect : true,
		"queryParamsType" : "limit",
		contentType : "application/x-www-form-urlencoded",
		queryParams : function(params) {
			return {
				'pageSize' : params.limit,
				'pageNumber' : params.offset,
				'id' : $('#id').val()
			};
		},
		sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
		pageNumber : 1, // 初始化加载第一页，默认第一页
		pageSize : 10, // 每页的记录行数（*）
		pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
		clickToSelect : true, // 是否启用点击选中行
		uniqueId : "id", // 每一行的唯一标识，一般为主键列
		classes:"table table-hover table-fix",
		 columns: [
		          /* {
		    	checkbox: true
		    },*/
		    {
		    	field: 'Number',
		     	title: '序号',
		     	width:60,
		     	align:'center',
		     	 
		     	formatter: function (value, row, index) {
	            	return index+1;
	         	}
		    
			}, {
		     	field: 'account',
		     	title: '登陆名',
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
		    }]
	});
};

