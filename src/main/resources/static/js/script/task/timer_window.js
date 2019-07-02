$(function () {
	
	//隐藏文本框
	init(0);
	
	// 设置下拉选择框的选中
	var typeId = $("#typeId").val();
	var weekId = $("#weekId").val();
	$("#task_type").val(typeId);
	$("#task_week").val(weekId);
	
	
	// 动态显示文本框
	if(0 == typeId){ // 以时间为间隔（分秒）
		$("#form_timer").find("#second").show();
		$("#form_timer").find("#min").show();
	}
	if(1 == typeId){ // 以时为间隔 
		$("#form_timer").find("#hour").show();
	}
	if(2 == typeId){ // 以天为间隔
		$("#form_timer").find("#day").show();
	}
	if(3 == typeId){ // 以周为间隔
		$("#form_timer").find("#day").show();
		$("#form_timer").find("#week").show();
	}
	if(4 == typeId){ // 以月为间隔
		$("#form_timer").find("#day").show();
		$("#form_timer").find("#month").show();
	}
	if(5 == typeId){ // 以每月为间隔
		$("#form_timer").find("#day").show();
		$("#form_timer").find("#everymonth").show();
	}
	
	// 如果存在定时信息，填充
	var dayId = $("#dayId").val();
	if(null != dayId){
		var temp = new Array(); //定义一数组
		temp = dayId.split(":");
		var hour = temp[0];
		var min = temp[1];
		$('#form_timer').form('load',{
			taskDayHour:hour,
			taskDayMin:min
		});
	}
	//禁用分，分和秒只可输入一个
	$('#taskSecond').numberspinner({
	    onChange:function(newValue,oldValue){
	    	if("" != newValue) {
			 		$('#taskMin').numberspinner('setValue', '');
			 		$('#taskMin').textbox('textbox').attr('readonly',true);
			 		$('#taskSecond').textbox('textbox').attr('readonly',false);
			 	} else {
			 		$('#taskSecond').numberspinner('setValue', '');
			 		$('#taskSecond').textbox('textbox').attr('readonly',true);
			 		$('#taskMin').textbox('textbox').attr('readonly',false);
			 	}
		}
	});
	//禁用秒，分和秒只可输入一个
	$('#taskMin').numberspinner({
	    onChange:function(newValue,oldValue){
	    	if("" != newValue) {
	    		$('#taskSecond').numberspinner('setValue', '');
			 		$('#taskSecond').textbox('textbox').attr('readonly',true);
			 		$('#taskMin').textbox('textbox').attr('readonly',false);
			 	} else {
			 		$('#taskMin').numberspinner('setValue', '');
			 		$('#taskMin').textbox('textbox').attr('readonly',true);
			 		$('#taskSecond').textbox('textbox').attr('readonly',false);
			 	}
		}
	});
});

function writeTimerTask(){
	
	var selects = $('#tasktimertable').bootstrapTable('getSelections');
	

//	for(i in selects ){
//	  alert(i);           //获得属性 
//	  alert(selects[i]);  //获得属性值
//	}
	
	var taskId = "";
	$.map(selects, function (row) {
		alert(123);
		taskId = row.taskId;
	});
	
	// 查询该任务是否存在定时任务信息
	$("#form_timer").ajaxSubmit({
		url : '../taskTimer/findTaskTimer.do',
		type: 'post',
		data : {
			taskId:taskId
		},
		success : function(data) {
			
			// 隐藏不需要的文本框
			init(0);
			$('#form_timer').form('load',{
//				taskSendNode:rows.taskSendNode,
//				taskReceiveNode:rows.taskReceiveNode,
//				// 获取任务id和名称
//				taskId:rows.taskId,
//				taskName:rows.taskName,
				
				taskTimerId:t.taskTimerId,
				taskTimerType:t.taskTimerType,
				taskTimerSecond:t.taskTimerSecond,
				taskTimerMin:t.taskTimerMin,
				taskTimerHour:t.taskTimerHour,
				taskDayHour:hour,
				taskDayMin:min,
				taskTimerWeek:t.taskTimerWeek,
				taskTimerMonth:t.taskTimerMonth,
				taskTimerDaytime:t.taskTimerDaytime,
				taskTimerStatus:t.taskTimerStatus
			});
			// 打开定时窗口
			var index =	layer.open({
				type : 2,
				title : '定时配置',
				shadeClose : true, // 点击遮罩关闭层
				area : [ '800px', '480px' ],
				content: '../taskTimer/totimer.do'
			});	
		},
		error : function(response) {
			alert("error:" + response);
		}
	});
}

function JqValidate(){
	return $("#form_timer").validate({
		
		rules:{
//			taskName:{
//				required:true,
//				taskNameIsAlreadyExist:true
//			},
			taskTimerType : "required"
		},
		messages:{
//			taskName:{
//				required : "任务名称不能为空！",
//				taskNameIsAlreadyExist : "任务名称已存在!"
//			},
			taskTimerType : "请选择定时类型！",
		}
	});
}

//判断任务名是否存在
jQuery.validator.addMethod("taskNameIsAlreadyExist", function(value, element) {
	var result = true;
	$.ajax({
		url:"../taskTimer/validTaskName.do",
		data:{taskName:value},
		async:false,
		success:function(data){
			if(data=='false'){
				result = false;
			}
		}
	});
	return result;
}, "任务名称已存在！");

// 保存OR修改定时任务信息
function saveTaskTimer(){
	if (JqValidate().form()) {
//		var selects = $('#tasktimertable').bootstrapTable('getSelections');
//		var taskId = "";
//		$.map(selects, function (row) {
//			taskId = row.taskId;
//		});
		
		$("#form_timer").ajaxSubmit({
			type : "post",
			url : "../taskTimer/save.do",
//			data : {
//				taskId : taskId
//			},
			success : function(data) {
				layer.open({
	        		 content: '操作成功', 
	        		 yes: function(index, layero){
//	        			 	parent.query();
		        			winclose();
	        		 },
	        		 cancel: function(){ 
//	        			 	parent.query();
	        			 	winclose();
	        		 }
	        	});
			}
		});
	}
}



// 关闭
function winclose() {
	var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
	parent.layer.close(index);
}

// 显示或隐藏文本框
function chagetimer() {
	//隐藏文本框
	init(0);
	var v = $('#task_type').val();
	if(0 == v){ // 以时间为间隔（分秒）
		$("#form_timer").find("#second").show();
		$("#form_timer").find("#min").show();
	}
	if(1 == v){ // 以时为间隔 
		$("#form_timer").find("#hour").show();
	}
	if(2 == v){ // 以天为间隔
		$("#form_timer").find("#day").show();
	}
	if(3 == v){ // 以周为间隔
		$("#form_timer").find("#day").show();
		$("#form_timer").find("#week").show();
	}
	if(4 == v){ // 以月为间隔
		$("#form_timer").find("#day").show();
		$("#form_timer").find("#month").show();
	}
	if(5 == v){ // 以每月为间隔
		$("#form_timer").find("#day").show();
		$("#form_timer").find("#everymonth").show();
	}
}

//隐藏不需要的字段
function init(id) {
	for (var i = id; i < $("#form_timer").find(".first").length; i++) {
		$("#form_timer").find(".first").eq(i).hide();
	}
}

//设置日期显示格式（只显示月日）
function myformatter(date){
	var m = date.getMonth()+1;
	var d = date.getDate();
	return (m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}
function myparser(s){
	if (!s) return new Date();
	var ss = (s.split('-'));
	var m = parseInt(ss[1],10);
	var d = parseInt(ss[2],10);
	if (!isNaN(m) && !isNaN(d)){
		return new Date(m-1,d);
	}
}

//设置日期显示格式（只显示日）
function myformatters(date){
	var d = date.getDate();
	return d<10?('0'+d):d;
}
function myparsers(s){
	if (!s) return new Date();
	var d = parseInt(s,10);
	if (!isNaN(d)){
		return new Date(0,0,d);
	}
	else
	{
		return new Date();
	}
}
