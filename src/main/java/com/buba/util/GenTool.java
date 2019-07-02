package com.buba.util;

import java.util.Date;
import java.util.List;
import java.util.Map;



public class GenTool {

	/*
	 * public static Map<String, List<DefDocList>> map;// 数据字典
	 */
	public static String VERSION = new Date().getTime() + "";
	// --------------------公用-----------------------

	public static String SUCCESS = "0"; // 成功

	public static String ERROR = "1"; // 失败

	public static String ENABLE = "0"; // 启用

	public static String DISABLE = "1"; // 禁用

	public static String YES = "0"; // 

	public static String NO = "1"; // 

	// --------------------用户-----------------------

	public static String SEX_MAN = "0"; // 

	public static String SEX_WOMAN = "1"; // 

	public static String ADMIN_TYPE = "0"; // 管理员类

	public static String USER_TYPE = "1"; // 普通人员类

	public static String USER_PASSWORD = "1"; // 人员默认密码

	// --------------------按钮------------------------

	public static String ENABLE_BUTTON = "0"; // 启用按钮权限

	public static String DISABLE_BUTTON = "1"; // 不参与按钮权限
	
	public static String INITIAL_PASSWORD_MD5 = "c4ca4238a0b923820dcc509a6f75849b";  //"1"的加密结�?
	                                            
	

	/**
	 * object 转化字符�?
	 * 
	 * @param o
	 * @return
	 */
	public static String toString(Object o) {
		if (o == null) {
			return "";
		} else {
			return String.valueOf(o);
		}
	}

	/**
	 * 获取数据字典明细
	 * 
	 * @param type_code
	 *            数据字典编码
	 * @return
	 *//*
	public static List<DefDocList> getDDL(String type_code) {
		return map.get(type_code);
	}*/

}
