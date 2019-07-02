
$(function () {
	queryByPage();
});
	 
//分页查询服务列表	 
function queryByPage(){
	$('#tasktimertable').bootstrapTable({
		url: '../taskTimer/list.do',
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
	   			'taskName':$('#taskName').val(),
	   			'taskSendNode':$('#taskSendNode').val(),
	   			'taskReceiveNode':$('#taskReceiveNode').val(),
	   		};
	    },
	    sidePagination: "server",   //分页方式：client客户端分页，server服务端分页（*）
	    pageNumber:1,      //初始化加载第一页，默认第一页
	    pageSize: 10,      //每页的记录行数（*）
	    pageList: [10, 25, 50, 100],  //可供选择的每页的行数（*）
	    clickToSelect: true,    //是否启用点击选中行
	    uniqueId: "taskId",      //每一行的唯一标识，一般为主键列
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
	     	field: 'taskName',
	     	title: '任务名称',
	    }, {
	     	field: 'taskSendNode',
	     	title: '发送节点',
	    }, {
	     	field: 'taskReceiveNode',
	     	title: '接收节点'
	    }, {
	     	field: 'taskDes',
	     	title: '任务描述'
	    }]
  });
};
//查询
function query(){
	$('#tasktimertable').bootstrapTable('refresh');
}
//定时
function timer_add() {	
	var selects = $('#tasktimertable').bootstrapTable('getSelections');
	var taskId = "";
	var taskName = "";
	$.map(selects, function (row) {
		taskId = row.taskId;
		taskName = row.taskName;
	});
	if(taskId == ""){
		layer.alert('请选择需要定时的任务');
	}else{
		// 打开定时窗口
		var index =	layer.open({
			type : 2,
			title : '定时配置',
//			data : {
//				taskId : taskId,
//				taskName : taskName
//			},
			shadeClose : true, // 点击遮罩关闭层
			area : [ '800px', '480px' ],
//			content: '../taskTimer/findTaskTimer.do'
			content: '../taskTimer/findTaskTimer.do?taskId='+ taskId + '&taskName=' + taskName
		});
	}
	
}

//删除定时信息
function delTaskTimer(){
	var selects = $('#tasktimertable').bootstrapTable('getSelections');
	var id = "";
	$.map(selects, function (row) {
		id = row.taskId;
	});  
	if(id == ""){
		layer.alert('请选择需要取消的定时任务！');
	}else{
		layer.confirm('您确定要取消当前所选记录的定时任务？', {
			btn: ['确定','取消']
			}, 
			function(){
				$.ajax({
					url : '../taskTimer/deleteTaskTimer.do?id='+id,
					method: 'post',
					success : function(data) {
						// 转换对象
						var response = eval("(" + data + ")");
						if (response.success) {
							if(null == response.msg){
								$('#tasktimertable').bootstrapTable('refresh');
								layer.alert('操作成功！');
							}
							else{
								layer.alert(response.msg);
							}
						} else {
							layer.alert('操作失败！');
						}
						
					}
				});
		});
	}
}

//编辑
function edit(){
	/*var selects = $('#tasktimertable').bootstrapTable('getSelections');
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
			  shadeClose: true, //点击遮罩关闭层
			  area : ['800px' , '480px'],
			  content: '../webservice/toedit.do?id='+id
		});
//		layer.full(index);
	}*/
}
//删除
function del(){
	/*var selects = $('#tasktimertable').bootstrapTable('getSelections');
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
					url : '../webservice/del.do?id='+id,
					method: 'post',
					success : function(data) {
						$('#tasktimertable').bootstrapTable('refresh');
						layer.alert('操作成功');
					}
				});
		});
	}*/
}

function resetForm(){
	$('#formSearch')[0].reset();
}
