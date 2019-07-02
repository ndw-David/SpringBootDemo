package com.buba.model;

public class User {

	private String id;
	private String username;//用户名
	private String account;
	private String userpass;//用户密码
	private String usertype;//用户类型
	private String userpassword;
	private String mobile;
	private String tel;
	private String email;
	private String sex ;
	private String islocked;
	private String memo;
	private String createtime;
	
	
	
	
	public String getAccount() {
		return account;
	}


	public void setAccount(String account) {
		this.account = account;
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public User(String username, String userpass, String usertype) {
		super();
		this.username = username;
		this.userpass = userpass;
		this.usertype = usertype;
	}


	public String getUserpassword() {
		return userpassword;
	}


	public void setUserpassword(String userpassword) {
		this.userpassword = userpassword;
	}


	public String getMobile() {
		return mobile;
	}


	public void setMobile(String mobile) {
		this.mobile = mobile;
	}


	public String getTel() {
		return tel;
	}


	public void setTel(String tel) {
		this.tel = tel;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getSex() {
		return sex;
	}


	public void setSex(String sex) {
		this.sex = sex;
	}


	public String getIslocked() {
		return islocked;
	}


	public void setIslocked(String islocked) {
		this.islocked = islocked;
	}


	public String getMemo() {
		return memo;
	}


	public void setMemo(String memo) {
		this.memo = memo;
	}


	public String getCreatetime() {
		return createtime;
	}


	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}


	public User(String username, String userpass, String usertype, String userpassword, String mobile, String tel,
			String email, String sex, String islocked, String memo, String createtime) {
		super();
		this.username = username;
		this.userpass = userpass;
		this.usertype = usertype;
		this.userpassword = userpassword;
		this.mobile = mobile;
		this.tel = tel;
		this.email = email;
		this.sex = sex;
		this.islocked = islocked;
		this.memo = memo;
		this.createtime = createtime;
	}


	public String getUsertype() {
		return usertype;
	}


	public void setUsertype(String usertype) {
		this.usertype = usertype;
	}


	public User(String username, String userpass) {
		super();
		this.username = username;
		this.userpass = userpass;
	}
	
	
	public User() {
		super();
	}


	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getUserpass() {
		return userpass;
	}
	public void setUserpass(String userpass) {
		this.userpass = userpass;
	}
	@Override
	public String toString() {
		return "User [username=" + username + ", userpass=" + userpass + ", usertype=" + usertype + "]";
	}
	
}
