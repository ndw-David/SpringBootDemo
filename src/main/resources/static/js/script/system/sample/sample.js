$(function () {
	queryUserByPage();
});
	 
// 分页查询用户列表
function queryUserByPage(){
	var dataEname = $("#dataEname").val();
	var sourceName = $("#sourceName").val();
	
	$('#sampletable').bootstrapTable({
		url: '../sample/list.do?dataEname='+dataEname+'&sourceName='+sourceName,
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
	    onEditableSave: function (field, row, oldValue, $el) {
            $.ajax({
                success: function (data, status) {
                    if (status == "success") {
                        alert("编辑成功");
                    }
                },
                error: function () {
                    alert("Error");
                },
                complete: function () {

                }
            });
        },
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
	    
		},
	    {
	     	field: 'field',
	     	title: '字段',
	     	sortable: true,
	        editable: {
	                type: 'text'
	               
	            } 
	     	
	     	
	    },{
	     	field: 'type',
	     	title: '类型',
	     	sortable: true
	     	
	    },{
	     	field: 'comment',
	     	title: '注释',
	     	sortable: true
	     	
	    },{
	     	field: 'value',
	     	title: '值',
	     	sortable: true
	     	
	    },{
	     	field: 'do',
	     	title: '操作',
	     	sortable: true,
	     	/*formatter: operateFormatter() //自定义方法，添加操作按钮
*/	  
	     	formatter: function (value, row, index) {
	     		
	     		return [
	     		   	'<a class="btn active" href="#" onclick="showDetail(\'' + row.dataEname +'\',\''+row.sourceName+'\')" >详情</a>',
	     		        '<a class="btn active" href="#" onclick="del(\'' + row.dataEname +'\',\'' + row.sourceName +'\',\''+row.field+'\')" >删除</a>'
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
			  content: '../exDataMenu/toedit.do?id='+id
		});
		layer.full(index);
	}
}
//删除
function del(i){
	var sourceName=$("#sourceName").val();
	var dataEname=$("#dataEname").val();
	var id=$("#id").val();
	var sn = encodeURI(encodeURI(sourceName));
	if(FieldCount==0||i>=0){
		
		layer.confirm('您确定要删除所选数据吗？', {
		btn: ['确定','取消']
		}, 
		function(){
			$.ajax({
				url : '../sample/del.do?id='+i+'&dataEname='+dataEname+'&sourceName='+sn,
				method: 'post',
				success : function(data) {
					$('#usertable').bootstrapTable('refresh');
					
					window.location.reload();
					//layer.alert('操作成功');
					
				}
			});
	});
		
	}else{
		$('#div_'+FieldCount).remove();
		FieldCount--;
       
	}	
	
}




/**/
function resetForm(){
	$('#formSearch')[0].reset();
}

function exp() {
	var objEname = $('#objEname').val();
	var objName = $('#objName').val();
	var ip1 = $('#ip1').val();
	window.location.href = "../sysinfo/exportSysInfo.do?objEname=" +objEname + "&objName="+objName+"&ip1="+ip1;
}
function download() {
	
	window.location.href = "../exDataSample/download.do";
}

function operateFormatter(value, row, index) {//赋予的参数
	var selects = $('#usertable').bootstrapTable('getSelections');
	var dataEname = "";
	var sourceName = "";
	$.map(selects, function (row) {
		dataEname = row.dataEname;
		sourceName = row.sourceName;
		
	});  
	alert(dataEname);
	alert(sourceName);
	
}
function showDetail(dataEname,sourceName){
	layer.open({
		 type: 2,
       skin: 'layui-layer-hong',
       title: '查看详情',
       fix: false,
       shadeClose: true,
       maxmin: true,
       area: ['800px', '500px'],
       content: '../exDataSample/showDetail.do?dataEname='+dataEname+'&sourceName='+sourceName,
       end: function () {
       }
	});
}
	function toedit(dataEname,sourceName){
		layer.open({
			 type: 2,
	       skin: 'layui-layer-hong',
	       title: '查看详情',
	       fix: false,
	       shadeClose: true,
	       maxmin: true,
	       area: ['800px', '500px'],
	       content: '../exDataSample/toedit.do?dataEname='+dataEname+'&sourceName='+sourceName,
	       end: function () {
	       }
		});
		
	
	
	
}



