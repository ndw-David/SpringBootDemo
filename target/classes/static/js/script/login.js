function login(){
	   var name = document.getElementById("username").value;
	   var pwd = document.getElementById("pasId").value;
	   if(name == "" || name == "请输入用户名" || pwd == "" || pwd == "请输入密码"){
		   document.getElementById("errorMessage").innerHTML="用户名或密码不能为空";
	   }else{
		  
		   $.ajax({
				url : '../sysCommon/loginCheck?'+ Math.random(),
				type:'post',
				data : {
					'account' : name,
					'userpassword' : pwd
				},
				dataType:'json',
				success : function(data) {
					if (data.success) {
						window.location.href = '../sysCommon/main';
					} else {
						document.getElementById("errorMessage").innerHTML="用户名或密码错误";
					}
				}
			});
	  }
};