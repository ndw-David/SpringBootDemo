package com.buba.model;

import java.io.Serializable;


public class Menu implements Serializable{

	private static final long serialVersionUID = 3892693751067517500L;
	
	private String id;
	private String menuCode;
	private String menuName;
	private String url;
	private String des;
	private String pid;
	private String pname;
	private String type;
	private Integer num;
	private String icon;
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	
	public String getMenuCode() {
		return menuCode;
	}
	public void setMenuCode(String menuCode) {
		this.menuCode = menuCode;
	}
	
	
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	
	
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
	
	public String getDes() {
		return des;
	}
	public void setDes(String des) {
		this.des = des;
	}
	
	
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	
		
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
		
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	
	
	public Integer getNum() {
		return num;
	}
	public void setNum(Integer num) {
		this.num = num;
	}
	
	
	
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	@Override
	public String toString() {
		return "Menu [id=" + id + ", menuCode=" + menuCode + ", menuName=" + menuName + ", url=" + url + ", des=" + des
				+ ", pid=" + pid + ", pname=" + pname + ", type=" + type + ", num=" + num + ", icon=" + icon + "]";
	}
	
	
}
