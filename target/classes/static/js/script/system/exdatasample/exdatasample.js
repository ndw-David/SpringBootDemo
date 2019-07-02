$(function () {
	queryUserByPage();
});
	 
// 分页查询用户列表
function queryUserByPage(){
	$('#usertable').bootstrapTable({
		url: '../exDataSample/list.do',
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
	   			'dataName':$('#dataName').val(),
	   			'sourceName':$('#sourceName').val(),
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
	     	field: 'sourceName',
	     	title: '源系统名称',
	        sortable: true
	    },
	    {
	     	field: 'field',
	     	title: '字段1',
	     	sortable: true,
	     	formatter: function (value, row, index) {
	     		var strs= new Array();
	     		strs = value.split(",");
	     		var v = strs[0];
            	return v;
         	}
	     	
	    },{
	     	field: 'field',
	     	title: '字段2',
	     	sortable: true,
	     	formatter: function (value, row, index) {
	     		var strs= new Array();
	     		strs = value.split(",");
	     		var v = strs[1];
            	return v;
         	}
	    },{
	     	field: 'field',
	     	title: '字段3',
	     	sortable: true,
	     	formatter: function (value, row, index) {
	     		var strs= new Array();
	     		strs = value.split(",");
	     		var v = strs[2];
            	return v;
         	}
	    },{
	     	field: 'field',
	     	title: '字段4',
	     	sortable: true,
	     	formatter: function (value, row, index) {
	     		var strs= new Array();
	     		strs = value.split(",");
	     		var v = strs[3];
            	return v;
         	}
	    },{
	     	field: 'field',
	     	title: '字段5',
	     	sortable: true,
	     	formatter: function (value, row, index) {
	     		var strs= new Array();
	     		strs = value.split(",");
	     		var v = strs[4];
            	return v;
         	}
	    },{
	     	field: 'do',
	     	title: '操作',
	     	sortable: true,
	     	/*formatter: operateFormatter() //自定义方法，添加操作按钮
*/	  
	     	formatter: function (value, row, index) {
	     		
	     		return [
	     		   	'<a class="btn active" href="#" onclick="showDetail(\'' + row.dataEname +'\',\''+row.sourceName+'\')" >详情</a>'/*,
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

// 编辑
/*function edit(){
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
}*/
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
					url : '../exDataSample/del.do?ids='+ids,
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

function exp() {
	var sourceName = $('#sourceName').val();
	var dataName = $('#dataName').val();
	var sn = encodeURI(encodeURI(sourceName));
	var dn = encodeURI(encodeURI(dataName));
	
	window.location.href = "../exDataSample/exportExdataSample.do?sourceName=" +sn + "&dataName="+dn;
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
	
	/*../exDataSample/showDetail.do*/
 /*return [
	 '<a class="btn active" href="" onclick=>详情</a>',
     '<a class="btn active" href="../exDataSample/toedit.do">编辑</a>'
	 ].join('');*/
}
function showDetail(dataEname,sourceName){
	
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
}
	/*function toedit(){
		var sn = encodeURI(encodeURI("#sourceName"));
		layer.open({
			 type: 2,
	       skin: 'layui-layer-hong',
	       title: '编辑',
	       fix: false,
	       shadeClose: true,
	       maxmin: true,
	       area: ['800px', '500px'],
	       content: '../sample/toedit.do?dataEname='+dataEname+'&sourceName='+sn,
	       end: function () {
	       }
		});
}*/
//编辑
function toedit(){
	var selects = $('#usertable').bootstrapTable('getSelections');
	var id = "";
	var sourceName = "";
	var dataEname = "";
	$.map(selects, function (row) {
		id = row.id;
		sourceName = row.sourceName;
		dataEname = row.dataEname;
	});  
	var sn = encodeURI(encodeURI(sourceName));
	if(id == ""){
		layer.alert('请选择需要编辑的数据');
	}else{
		var index =	layer.open({
			  type: 2,
			  title: '编辑',
			  shadeClose: true, // 点击遮罩关闭层
			  area : ['900px' , '500px'],
			  content: '../sample/toedit.do?dataEname='+dataEname+'&sourceName='+sn
		});
		layer.full(index);
	}
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
         url: '../exDataSample/testImp.do' ,  
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
	      					url : '../exDataSample/imp.do?filename='+name,
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
  



	


