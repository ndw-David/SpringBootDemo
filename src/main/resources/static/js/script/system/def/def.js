$(function () {
	queryDefByPage();
});
	 
//分页查询用户列表	 
function queryDefByPage(){
	$('#deftable').bootstrapTable({
		url: '../defdoc/list.do',
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
	   			'type_code':$('#type_code').val(),
	   			'type_name':$('#type_name').val(),
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
	     	width:50,
	     	align:'center',
	     	formatter: function (value, row, index) {
            	return index+1;
         	}
		},{
	     	field: 'type_code',
	     	title: '编码',
	     	cellStyle:'overflow:hidden;',
	     	formatter:function(value,row,index){
	     		 var divHtml = "<div id='type_code' style='width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;' title = '"+value+"' >"+value+"</div>";
	     		 return divHtml;
	     	}
	    }, {
	     	field: 'type_name',
	     	title: '名称',
	     	cellStyle:'overflow:hidden;',
	     	formatter:function(value,row,index){
	     		 var divHtml = "<div id='type_name' style='width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;' title = '"+value+"' >"+value+"</div>";
	     		 return divHtml;
	     	}
	    },{
	     	field: 'type_desc',
	     	title: '描述',
     		cellStyle:'overflow:hidden;',
	     	formatter:function(value,row,index){
	     		 var divHtml = "<div id='type_desc' style='width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;' title = '"+value+"' >"+value+"</div>";
	     		 return divHtml;
	     	}
	    }]
  });
};
//查询
function query(){
	$('#deftable').bootstrapTable('destroy');
	queryDefByPage();
//	$('#deftable').bootstrapTable('refresh');
}
//新增
function add(){
	layer.open({
		  type: 2,
		  title: '新增',
		  shadeClose: true, //点击遮罩关闭层
		  area : ['800px' , '380px'],
		  content: '../defdoc/toadd.do'
	});
}
//编辑
function edit(){
	var selects = $('#deftable').bootstrapTable('getSelections');
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
			  content: '../defdoc/toedit.do?id='+id
		});
	}
}
//删除
function del(){
	var selects = $('#deftable').bootstrapTable('getSelections');
	var id = "";
	$.map(selects, function (row) {
		id = row.id;
	});  
	if(id == ""){
		layer.alert('请选择需要删除的数据');
	}else{
		$.ajax({
			url : '../defdoc/getDDLCountByDef.do?id='+id,
			method: 'get',
			success : function(data) {
				var count = eval('('+data+')').count;
				if(count<1){
					layer.confirm('您确定要删除所选数据吗？', {
						btn: ['确定','取消']
						}, 
						function(){
							$.ajax({
								url : '../defdoc/del.do?id='+id,
								method: 'post',
								success : function(data) {
									$('#deftable').bootstrapTable('refresh');
									layer.alert('操作成功');
								}
							});
					});
				}else{
					layer.alert('请先清除其明细配置');
				}
			}
		});
	}
}


//弹出明细管理
function manage(){
	var selects = $('#deftable').bootstrapTable('getSelections');
	var id = "";
	$.map(selects, function (row) {
		id = row.id;
	});  
	if(id == ""){
		layer.alert('请选择需要配置明细的数据');
	}else{
		var index = layer.open({
			  type: 2,
			  title: '明细',
			  shadeClose: true, //点击遮罩关闭层
			  area : ['800px' , '400px'],
			  content: '../defdoc/todefdoclist.do?id='+id
		});
		layer.full(index);
	}
}

function resetForm(){
	$('#formSearch')[0].reset();
}
