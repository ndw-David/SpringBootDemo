package com.buba.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.buba.model.Menu;
import com.buba.model.User;
import com.buba.service.MenuService;
import com.buba.util.PageFinder;
import com.buba.util.Pageable;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * 菜单管理
 * @author  ll
 * @date 2016年11月16日
 */
@RestController
public class MenuController{
	
	@Autowired
	private MenuService menuService;
	
	/**
	 * 跳转至菜单页面
	 * @return [参数说明]
	 * 
	 * @return String [返回类型说明]
	 */
	@RequestMapping(value = "/index")
	public String index() {
		return "/system/menu/menu";
	}
	
	/**
	 * 获取用户对应角色菜单
	 * @return [参数说明]
	 * 
	 * @return List<Map<String,Object>> [返回类型说明]
	 */
	@PostMapping(value = "/menu/queryMenuByUser")
	
	public List<Map<String, Object>> queryMenuByUser(HttpSession session) {
	    User user = (User) session.getAttribute("user");
		return menuService.queryMenuTreeByUser(user);
	}
	
}
