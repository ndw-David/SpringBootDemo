$(function () {
	queryUserByPage();
});
	 
//分页查询用户列表	 
function queryUserByPage(){
	$('#datasourcetable').bootstrapTable({
		url: '../data_source/list.do',
	    method: 'post',      //请求方式（*）
	    striped: true,      //是否显示行间隔色
	    cache: false,      //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	    pagination: true,     //是否显示分页（*）
	    "queryParamsType": "limit",
	    contentType: "application/x-www-form-urlencoded",
	    queryParams:function(params) {
	   		return {
	   			'pageSize': params.limit,
	   			'pageNumber': params.offset,
	   			'dataSourceName':$('#dataSourceName').val(),
	   			'dataSourceType':$('#dataSourceType').val()
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
	     	width:40,
	     	align:'center',
	     	formatter: function (value, row, index) {
            	return index+1;
         	}
		},{
	     	field: 'dataSourceName',
	     	title: '数据源名',
	     	cellStyle:'overflow:hidden;',
	     	formatter:function(value,row,index){
	     		 var divHtml = "<div id='dataSourceName' style='width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;' title = '"+value+"'>"+value+"</div>";
	     		 return divHtml;
	     	}
	    },{
	     	field: 'schema',
	     	title: '模式',
	    },{
	     	field: 'dataSourceUrl',
	     	title: 'url',
	     	cellStyle:'overflow:hidden;',
	     	formatter:function(value,row,index){
	     		 var divHtml = "<div id='des' style='width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;' title = '"+value+"'>"+value+"</div>";
	     		 return divHtml;
	     	}
	    },{
	     	field: 'dataSourceDriver',
	     	title: '驱动'
	    },{
	     	field: 'dataSourceUser',
	     	title: '用户名'
	    },{
	     	field: 'dataSourceType',
	     	title: '类型'
	    },{
	     	field: 'des',
	     	title: '描述',
	     	cellStyle:'overflow:hidden;',
	     	formatter:function(value,row,index){
	     		 var divHtml = "<div id='des' style='width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;' title = '"+value+"'>"+value+"</div>";
	     		 return divHtml;
	     	}
	    }]/*,
	    onClickCell:function(field, value, row, element){
	    	if($('#'+field+'').width()!=null){
	    		if((getStrLength(value)*6.5)>($('#'+field+'').width())){
	    			layer.alert(value);
	    		}
			}
	    }*/
  });
};
//查询
function query(){
	$('#datasourcetable').bootstrapTable('destroy');
	queryUserByPage();
//	$('#datasourcetable').bootstrapTable('refresh');
}
//新增
function add(){
	var index = layer.open({
		  type: 2,
		  title: '新增',
		  shadeClose: true, //点击遮罩关闭层
		  area : ['800px' , '380px'],
		  content: '../data_source/toadd.do'
	});
	layer.full(index);
}
//编辑
function edit(){
	var selects = $('#datasourcetable').bootstrapTable('getSelections');
	var id = "";var i = 0;
	$.map(selects, function (row) {
		id = row.id; i++;
	}); 
 
	if(i==0){
		layer.alert('请选择需要编辑的数据');
	}else if(i>1)
	{
		layer.alert('请选择一条数据');
	}
	else{
		var index =	layer.open({
			  type: 2,
			  title: '编辑',
			  shadeClose: true, //点击遮罩关闭层
			  area : ['800px' , '380px'],
			  content: '../data_source/toedit.do?id='+id
		});
		layer.full(index);
	}
}
//删除
function del(){
	var selects = $('#datasourcetable').bootstrapTable('getSelections');
	var ids= "";
	$.map(selects, function (row) {
		ids += row.id+",";
	});  
	if(ids == ""){
		layer.alert('请选择需要删除的数据');
	}else{
		layer.confirm('您确定要删除所选数据吗？', {
			btn: ['确定','取消']
			}, 
			function(){ 
				$.ajax({
					url : '../data_source/del.do?ids='+ids,
					method: 'post',
					success : function(data) {
						$('#datasourcetable').bootstrapTable('refresh');
						layer.alert('操作成功');
					}
				});
		});
	}
}

function resetForm(){
	$('#formSearch')[0].reset();
}