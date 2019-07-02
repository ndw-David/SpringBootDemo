$(function () {
	queryUserByPage();
});
	 
// 分页查询用户列表
function queryUserByPage(){
	$('#usertable').bootstrapTable({
		url: '../exDataMenu/list.do',
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
	   			'dataEname':$('#dataEname').val(),
	   			'purchaseDept':$('#purchaseDept').val(),
	   			'userDept':$('#userDept').val(),
	   			'channelName':$('#channelName').val(),
	   			'category':$('#category').val(),
	   			'subClass':$('#subClass').val(),
	   			'appScenarios':$('#appScenarios').val(),
	   			'sharedScope':$('#sharedScope').val(),
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
	     	field: 'dataEname',
	     	title: '英文名称',
	        sortable: true
	    },{
	     	field: 'category',
	     	title: '数据大类',
	        sortable: true
	    },
	    {
	     	field: 'subClass',
	     	title: '数据子类',
	     	sortable: true
	    },{
	     	field: 'purchaseDept',
	     	sortable: true,
	     	title: '采购部门'
	     
	    },{
	     	field: 'userDept',
	     	sortable: true,
	     	title: '使用部门'
	     
	    },{
	     	field: 'channelName',
	     	sortable: true,
	     	title: '供应商名称'
	     
	    },{
	     	field: 'fPurchaseTime',
	     	sortable: true,
	     	title: '采购时间'
	     
	    },{
	     	field: 'updateTime',
	     	sortable: true,
	     	title: '更新时间',
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
	     		/*return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);*/
	     		return y+'-'+add0(m)+'-'+add0(d);
	     	

	     	}
	     
	    },{
	     	field: 'appScenarios',
	     	sortable: true,
	     	title: '应用场景'
	     
	    },{
	     	field: 'riskControl',
	     	sortable: true,
	     	title: '风控功能'
	     
	    },{
	     	field: 'sharedScope',
	     	sortable: true,
	     	title: '共享范围'
	     
	    },{
	     	field: 'remark',
	     	sortable: true,
	     	title: '备注'
	     	
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
// 新增
function add(){
	var index = layer.open({
		  type: 2,
		  title: '新增',
		  shadeClose: true, // 点击遮罩关闭层
		  area : ['800px' , '380px'],
		  content: '../exDataMenu/toadd.do'
	});
	layer.full(index);
}
// 编辑
function edit(){
	var selects = $('#usertable').bootstrapTable('getSelections');
	var id = "";
	var i = 0;
	$.map(selects, function (row) {
		id = row.id;
		i++;
	});  
	if(id == ""){
		layer.alert('请选择需要编辑的数据');
	}else if(i > 1)
	{
		layer.alert('请选择一条数据');
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
// 删除
function del(){
	var selects = $('#usertable').bootstrapTable('getSelections');
	var ids = "";
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
					url : '../exDataMenu/del.do?ids='+ids,
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
//导出
function exp() {
	var sourceName = $('#sourceName').val();
	var dataName = $('#dataName').val();
	var sn = encodeURI(encodeURI(sourceName));
	var dn = encodeURI(encodeURI(dataName));
	
	window.location.href = "../exDataMenu/exportExdataMenu.do?sourceName=" +sn + "&dataName="+dn;
}
function add0(m){return m<10?'0'+m:m }

function download() {
	window.location.href = "../exDataMenu/download.do";
}

function check() {  
	var file = $("#file").val();
	 if (file == "") {
        layer.msg('请选择要上传的文件');
        return false;  
    } else {
        //检验文件类型是否正确
        var exec = (/[.]/.exec(file)) ? /[^.]+$/.exec(file.toLowerCase()) : '';
        if (exec != "xls") {
            layer.msg("文件格式不对，请上传Excel文件!");
             return false; 
        }else{
            var formData = new FormData($( "#uploadForm" )[0]);  
              $.ajax({  
                   url: '../exDataMenu/testImp.do' ,  
                   type: 'POST',  
                   data: formData,  
                   async: false,  
                   cache: false,  
                   contentType: false,  
                   processData: false,  
                   success: function (data) {
       	              var datas = new Array();
       	              datas = data.split(",");
       	              var name = datas[0];
       	              var size = datas[1];
       	              var j = datas[2];
       		         var statu = confirm("共上传"+size+"条数据，存在"+j+"条重复数据，是否继续上传？（重复数据将进行更新）");
       		        if(!statu){
       		          return false;
       		          } else{
       			            $.ajax({
	      					    url : '../exDataMenu/imp.do?filename='+name,
	      					    method: 'post',
	      					    success : function(data) {
	      						$('#usertable').bootstrapTable('refresh');
	      						layer.alert('操作成功');
	      					}
	      				      });
       			  
       		  }   
         },   
         error: function (data) {  
             alert(returndata);  
         }  
    }); 
              layer.load();
		    	//此处演示关闭
		    	setTimeout(function(){
		    	  layer.closeAll('loading');
		    	}, 10000);
	        	 return true;
	        	 } 
             

    }
	 
return true;
	 
	 
}



