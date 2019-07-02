$(function () {
	queryUserByPage();
});
	 
// 分页查询列表
function queryUserByPage(){
	$('#usertable').bootstrapTable({
		url: '../sysDic/list.do',
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
	   			'name':$('#name').val(),
	   			'ename':$('#ename').val(),
	   			'type':$('#type').val(),
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
	     	field: 'id',
	     	title: 'ID',
	     	 sortable: true
	    }, {
	     	field: 'name',
	     	title: '名称',
	     	 sortable: true
	    }, {
	     	field: 'ename',
	     	title: '英文名',
	        sortable: true
	    },{
	     	field: 'pid',
	     	title: '父节点',
	        sortable: true
	    },
	    {
	     	field: 'type',
	     	title: '类型',
	     	sortable: true,
	     	formatter:function(value, row, index) {
	     		if(value == 1){
	     			return '大类';
	     		}else if(value==2){
	     			return '小类';
	     		}else if(value==3){
	     			return '应用场景';
	     		}else if(value==4){
	     			return '共享范围';
	     		}else{
	     			return value;
	     		}
	     	}
	    
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
		  content: '../sysDic/toadd.do'
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
			  content: '../sysDic/toedit.do?id='+id
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
					url : '../sysDic/del.do?id='+id,
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



