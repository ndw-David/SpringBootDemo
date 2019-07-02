$(function () {
	queryUserByPage();
});
	 
// 分页查询用户列表
function queryUserByPage(){
	$('#usertable').bootstrapTable({
		url: '../noteConfig/list.do',
	    method: 'post',      // 请求方式（*）
	    striped: true,      // 是否显示行间隔色
	    cache: false,      // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	    pagination: true,     // 是否显示分页（*）
	    sortStable:true,      // 是否启用排序
	    sortOrder: "desc",     // 排序方式
	    /*singleSelect:true,*/
	    "queryParamsType": "limit",
	    contentType: "application/x-www-form-urlencoded",
	    queryParams:function(params) {
	   		return {
	   			'pageSize': params.limit,
	   			'pageNumber': params.offset,
	   			'fileName':$('#fileName').val(),
	   		    'sortName':params.sort,
                'sortOrder':params.order
	   		};
	    },
	    /* Toggle: true, showColumns: true, showRefresh: true,
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
	    
		},{
	    	field: 'id',
	     	title: 'id',
	     	width:40,
	     	align:'center',
	     	visible:false
	     	
	    
		}, {
	     	field: 'fileName',
	     	title: '文件名称',
	     	 sortable: true
	    },{
	     	field: 'updateTime',
	     	sortable: true,
	     	title: '上传时间',
	     	width:200,
	     	formatter:function (value,row,index)
	     	{
	     		
	     		/*var d = new Date(value);    //根据时间戳生成的时间对象
	     		var date = (d.getFullYear()) + "-" + 
	     		           (d.getMonth() + 1) + "-" +
	     		           (d.getDate()) + " " + 
	     		           (d.getHours()) + ":" + 
	     		           (d.getMinutes()) + ":" + 
	     		           (d.getSeconds());
	     		return date;*/
	     		var time = new Date(value);
	     		var y = time.getFullYear();
	     		var m = time.getMonth()+1;
	     		var d = time.getDate();
	     		var h = time.getHours();
	     		var mm = time.getMinutes();
	     		var s = time.getSeconds();
	     		return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
	     		/*return y+'-'+add0(m)+'-'+add0(d);*/
	     	

	     	}
	     
	    },{
	     	field: 'do',
	     	title: '操作',
	     	width:80,
	     	align:'center',
	     	sortable: true,
	     	/*formatter: operateFormatter() //自定义方法，添加操作按钮
*/	  
	     	formatter: function (value, row, index) {
	     		
	     		return [
	     		   	'<a class="btn active" href="#" onclick="del(\'' + row.id +'\')" >删除</a>'/*,
	     		        '<a class="btn active" href="#" onclick="toedit(\'' + row.dataEname +'\',\''+row.sourceName+'\')" >编辑</a>'*/
	     		   	 ].join('');
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

// 删除
function del(id){
	/*var selects = $('#usertable').bootstrapTable('getSelections');
	var id = "";
	$.map(selects, function (row) {
		id = row.id;
	});  */
	
	if(id == ""){
		layer.alert('请选择需要删除的数据');
	}else{
		layer.confirm('您确定要删除所选数据吗？', {
			btn: ['确定','取消']
			}, 
			function(){
				$.ajax({
					url : '../noteConfig/del.do?id='+id,
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
/*function showDetail(dataEname,sourceName){
	
	var sn = encodeURI(encodeURI(sourceName));
	layer.open({
		 type: 2,
       skin: 'layui-layer-hong',
       title: '查看详情',
       fix: false,
       shadeClose: true,
       maxmin: true,
       area: ['800px', '500px'],
       content: '../sample/showDetail.do?dataEname='+dataEname+'&sourceName='+sn,
       end: function () {
       }
	});
}*/

function add0(m){return m<10?'0'+m:m }
