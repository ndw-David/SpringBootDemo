$(function () {
	query();
});
function query(){
	$('#btntable').bootstrapTable({
		url: '../menu/btnlist.do',
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
	   			'id':$('#id').val()
	   		};
	    },
	    sidePagination: "server",   //分页方式：client客户端分页，server服务端分页（*）
	    pageNumber:1,      //初始化加载第一页，默认第一页
	    pageSize: 10,      //每页的记录行数（*）
	    pageList: [10, 25, 50, 100],  //可供选择的每页的行数（*）
	    clickToSelect: true,    //是否启用点击选中行
	    uniqueId: "id",      //每一行的唯一标识，一般为主键列
	    columns: [{
	     checkbox: true
	    }, {
	     field: 'menuCode',
	     title: '按钮编码'
	    }, {
	     field: 'menuName',
	     title: '按钮名称'
	    }, {
	     field: 'des',
	     title: '描述'
	    }, ]
  });
};
function add(){
	layer.open({
		  type: 2,
		  title: '新增',
		  shadeClose: true, //点击遮罩关闭层
		  area : ['800px' , '300px'],
		  content: '../menu/toaddbtn.do?id='+$('#id').val()
	});
}
function edit(){
	var selects = $('#btntable').bootstrapTable('getSelections');
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
			  area : ['800px' , '300px'],
			  content: '../menu/toeditbtn.do?id='+id
		});
	}
}
function del(){
	var selects = $('#btntable').bootstrapTable('getSelections');
	var id = "";
	$.map(selects, function (row) {
		id = row.id;
	});  
	if(id == ""){
		layer.alert('请选择需要删除的数据');
	}else{
		layer.confirm('您确定要删除所选数据吗？', {
			btn: ['确定','取消']
			}, function(){
				$.ajax({
					url : '../menu/del.do?id='+id,
					dataType:'text',
					success : function(data) {
						$('#btntable').bootstrapTable('refresh');
						layer.alert('操作成功');
					}
				});
			});
	}
}