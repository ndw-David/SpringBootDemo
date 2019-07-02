$(function() {
	/*checkWindow();*/

	setInterval(getTime, 1000);

	$.ajax({
		url:'../menu/queryMenuByUser',
		type:'post',
		dataType: "json",
		async:false,
		success:function(data){
			if(data != null){
				var listr = "";
				for(var i=0;i<data.length;i++){
					listr+="<li style='color:#a7a7a7'>";
					if(data[i].children != undefined){
						listr+='<a href="#" id="' + data[i].code + '"><i class="'+data[i].icon+'"></i><span class="nav-label">&nbsp;&nbsp;'+data[i].name+'</span><span class="fa arrow"></span></a>';
						/*listr+='<a class="J_menuItem" href="'+btm.bp()+data[i].url+'" id="' + data[i].code + '"><i class="'+data[i].icon+'"></i><span class="nav-label">&nbsp;&nbsp;'+data[i].name+'</span><span class="fa arrow"></span></a>';*/
					}else{
						listr+='<a class="J_menuItem" href="'+btm.bp()+data[i].url+'" id="' + data[i].code + '"s><i class="'+data[i].icon+'"></i><span class="nav-label">&nbsp;&nbsp;'+data[i].name+'</span></a>';
					}
					if(data[i].children != undefined){
						listr+="<ul class='nav nav-second-level' style='background-color:#434343;'>";
						listr+=ment(data[i].children);
						listr+="</ul>";
					}
					listr+="</li>";
				}
				$("#side-menu").append(listr);
			
	
			}
		} 
	});
	
});

function checkWindow(){
	$.ajax({
		url : btm.bp() +'/user/checkWindow.do',
		type :'post',
		dataType : 'json',
		async : false,
		success : function(data){
			if (data == true) {
				layer.open({
					  type: 2,
					  title: '修改密码',
					  shadeClose: false, //点击遮罩关闭层
					  closeBtn: 0,
					  area : ['800px' , '300px'],
					  content: btm.bp() +'/user/tochangepwd.do'
				});
			} 
		}
	});
}

function getTime() {
	var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHour = date.getHours();
    var strMinute = date.getMinutes();
    var strSecond = date.getSeconds();
    var weekstr = "";
    var week = date.getDay();  
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (strHour >= 0 && strHour <= 9) {
    	strHour = "0" + strHour;
    }
    if (strMinute >= 0 && strMinute <= 9) {
    	strMinute = "0" + strMinute;
    }
    if (strSecond >= 0 && strSecond <= 9) {
    	strSecond = "0" + strSecond;
    }
    if (week == 0) {  
    	weekstr = "星期日";  
	} else if (week == 1) {  
		weekstr = "星期一";  
	} else if (week == 2) {  
		weekstr = "星期二";  
	} else if (week == 3) {  
		weekstr = "星期三";  
	} else if (week == 4) {  
		weekstr = "星期四";  
	} else if (week == 5) {  
		weekstr = "星期五";  
	} else if (week == 6) {  
		weekstr = "星期六";  
	}  
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate+ " " + weekstr + " " + strHour + seperator2 + strMinute + seperator2 + strSecond;
    $("#timeId").text(currentdate);
}

function ment(data){
	var listr="";
	for(var i=0;i<data.length;i++){
		listr+="<li>";
		if(data[i].children != undefined){
			listr+='<a href="#">'+data[i].name+'<span class="fa arrow"></span></a>';
		}else{
			listr+='<a class="J_menuItem" id="' + data[i].code + '" pid="' + data[i].pid + '" href="'+btm.bp()+data[i].url+'">'+data[i].name+'</a>';
		}
		if(data[i].children != undefined){
			listr+="<ul class='nav nav-third-level'>";
			listr+=ment(data[i].children,listr);
			listr+="</ul>";
		}
		listr+="</li>";
		var len = getLength(data[i].name);
		len = len * 7;
		if(len > 160) {
			len = 160;
		}
		//listr += "<li style='margin-left:50px;width:" + len + "px;height:2px;background-color:#f64660;'>&nbsp;</li>";
	}
	return listr;
}
function exitWin(){
	layer.confirm('您确定要注销系统吗？', {
		btn : [ '确定', '取消' ]
	}, function() {
		location.href="../sysCommon/logout";
	});
}

function getLength(str) {
	var len = 0;
	for (var i=0; i<str.length; i++) {
		if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
			len += 2;
		} else {
			len ++;
		}
	}
	return len;
}

function changeInfo(){
	layer.open({
		  type: 2,
		  title: '修改个人信息',
		  shadeClose: true, //点击遮罩关闭层
		  area : ['800px' , '75%'],
		  content: btm.bp() +'/user/tochangeinfo'
	});
}