$(function () {
	$(function () {
	    var fPurchaseTime = {  
	            elem: '#hisDate', //选择ID为fPurchaseTime的input  
	            max: '2099-12-31 23:59:59', //最大日期  
	            choose: function(datas){ 
	            	
	            	end_date.min = datas; //开始日选好后，重置结束日的最小日期  
	            	end_date.start_date = datas;//将结束日的初始值设定为开始日 
	                
	            }  
	        };  
	       
	        laydate(fPurchaseTime);  
	      
		
	});
	queryUserByPage();
});
	 
// 分页查询用户列表
function queryUserByPage(){
	$('#usertable').bootstrapTable({
		url: '../exDataHisDic/list.do',
	    method: 'post',      // 请求方式（*）
	    striped: true,      // 是否显示行间隔色
	    cache: false,      // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	    pagination: true,     // 是否显示分页（*）
	    sortStable:true,      // 是否启用排序
	    sortOrder: "desc",     // 排序方式
	   /* singleSelect:true,*/
	    "queryParamsType": "limit",
	    contentType: "application/x-www-form-urlencoded",
	    queryParams:function(params) {
	   		return {
	   			'pageSize': params.limit,
	   			'pageNumber': params.offset,
	   			'dataName':$('#dataName').val(),
	   			'sourceName':$('#sourceName').val(),
	   			'hisDate':$('#hisDate').val(),
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
	     	field: 'dataName',
	     	title: '接口名称',
	     	 sortable: true
	    }, {
	     	field: 'fieldName',
	     	title: '字段名称',
	        sortable: true
	    },{
	     	field: 'fieldNote',
	     	title: '字段说明',
	        sortable: true
	    },
	    {
	     	field: 'fieldType',
	     	title: '字段类型',
	     	sortable: true
	    },{
	     	field: 'fieldLength',
	     	sortable: true,
	     	title: '字段长度'
	     
	    },{
	     	field: 'required',
	     	sortable: true,
	     	title: '是否必须',
	     	formatter:function(value, row, index) {
	     		if(value == '1'){
	     			return '是';
	     		}else if(value=='0'){
	     			return '否';
	     		}else{
	     			return value;
	     		}
	     	}
	     		
	     
	    },{
	     	field: 'extends1',
	     	sortable: true,
	     	title: '备注1'
	     
	    },{
	     	field: 'extends2',
	     	sortable: true,
	     	title: '备注2'
	     
	    },{
	     	field: 'extends3',
	     	sortable: true,
	     	title: '备注3'
	     	
	     	/*
			 * cellStyle:function(value, row, index) { return "22222"; }
			 */
	    }]
  });
};
// 查询
function query(){
	$('#usertable').bootstrapTable('destroy');
	queryUserByPage();
// $('#usertable').bootstrapTable('refresh');
}

function resetForm(){
	$('#formSearch')[0].reset();
}
//导出
function exp() {
	var hisDate = $('#hisDate').val();
	var d = encodeURI(encodeURI(hisDate));
	var dataName = $('#dataName').val();
	var dn = encodeURI(encodeURI(dataName));
	var sourceName = $('#sourceName').val();
	var sn = encodeURI(encodeURI(sourceName));
	window.location.href = "../exDataHisDic/exportExdataHisDic.do?hisDate=" +d+"&dataName="+dn+"&sourceName="+sn;
}
function add0(m){return m<10?'0'+m:m }

function download() {
	window.location.href = "../exDataDic/download.do";
}

