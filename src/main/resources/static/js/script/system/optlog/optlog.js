$(function () {
    var start_date = {  
            elem: '#start_date', //选择ID为START的input  
            max: '2099-12-31 23:59:59', //最大日期  
            choose: function(datas){  
            	end_date.min = datas; //开始日选好后，重置结束日的最小日期  
            	end_date.start_date = datas //将结束日的初始值设定为开始日  
            }  
        };  
        var end_date = {  
            elem: '#end_date',  
            max: '2099-12-31 23:59:59', //最大日期  
            choose: function(datas){  
            	start_date.max = datas; //结束日选好后，重置开始日的最大日期  
            }  
        };
        laydate(start_date);  
        laydate(end_date);  
	queryOptlogByPage();
});
	 
function queryOptlogByPage(){
	$('#optlogtable').bootstrapTable({
		url: '../optlog/list.do',
	    method: 'post',      //请求方式（*）
	    striped: true,      //是否显示行间隔色
	    cache: false,      //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	    pagination: true,     //是否显示分页（*）
	    sortStable:true,      //是否启用排序
	    sortOrder: "desc",     //排序方式
	    singleSelect:true,
	    "queryParamsType": "limit",
	    contentType: "application/x-www-form-urlencoded",
	    queryParams:function(params) {
	   		return {
	   			'pageSize': params.limit,
	   			'pageNumber': params.offset,
	   			'oper_module': $('#oper_module').val(),
	   			'account': $('#account').val(),
	   			'result': $('#result').val(),
	   			'oper_name': $('#oper_name').val(),
	   			'start_date': $('#start_date').val(),
	   			'end_date': $('#end_date').val()

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
		}, {
	     	field: 'oper_module',
	     	title: '操作模块',
	     	width: 80,
	     	 sortable: true
	    }, {
	     	field: 'oper_name',
	     	title: '操作名称',
	     	width: 80
	     		
	    },/*{
	     	field: 'ip_addr',
	     	title: 'IP'
	    },*/
	    {
	     	field: 'create_time',
	     	title: '操作时间',
	     	width: 120,
	    },{
	     	field: 'result',
	     	title: '结果',
	     	width: 50,
	     	formatter:function(value, row, index) {
	     		if(value == 0){
	     			return '<span style="color:green">成功</span>';
	     		}else{
	     			return '<span style="color:red">失败</span>';
	     		}
	     	}
	    }, {
	     	field: 'account',
	     	title: '操作人',
	     	width: 70,
	     	 sortable: true
	    }/*,{
	     	field: 'exceptioncode',
	     	title: '错误代码',
	     	formatter:function(value, row, index) {
				if(value == null || value == ''){
					return '-';
				}else{
	     		 var divHtml = "<div id='name' title='"+value+"' style='width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;'>"+value+"</div>";
	     		 return divHtml;
				}
	     	}
	    },{
	     	field: 'exceptiondetail',
	     	title: '错误信息',
	     	formatter:function(value, row, index) {
				if(value == null || value == ''){
					return '-';
				}else{
	     		 var divHtml = "<div id='name' title='"+value+"' style='width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;'>"+value+"</div>";
	     		 return divHtml;
				}
	     	}
	    }*/
	   /* , {
	     	field: 'oldValue',
	     	title: '新值',
	     	width: 230
	    } , {
	     	field: 'oldValue',
	     	title: '旧值',
	     	width: 230
	    }*/
	    
	    
	    ]
    
  });
};
//编辑
function edit(){
	var selects = $('#optlogtable').bootstrapTable('getSelections');
	var id = "";
	var codes="";
	$.map(selects, function (row) {
		
		id = row.id;
		oper_name = row.oper_name;
		paramstr = row.params;
		alert(paramstr);
		
		
		
	});  
	if(id == ""){
		layer.alert('请选择需要编辑的数据');
	}else{
		if(oper_name!='编辑')
			{
			layer.alert('无相关数据');
			}else
				{
				layer.open({
					  type: 2,
					  title: '编辑',
					  shadeClose: true, //点击遮罩关闭层
					  area : ['1000px' , '250px'],
					  content: '../user/toshow.do?id='+id
				
		
		
	
		});
		
		
				}	
		
		
	}
}
//查询
function query(){
	$('#optlogtable').bootstrapTable('destroy');
	queryOptlogByPage();
//	$('#usertable').bootstrapTable('refresh');
}

function resetForm(){
	$('#formSearch')[0].reset();
}

function exp(){
	window.location.href = '../optlog/downloaddata.do?oper_module='+$('#oper_module').val()+'&account='+$('#account').val()+'&result='+$('#result').val()+'&oper_name='+$('#oper_name').val()+'&start_date='+$('#start_date').val()+'&end_date='+$('#end_date').val();
} 
