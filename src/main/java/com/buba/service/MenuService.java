package com.buba.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import com.buba.model.Menu;
import com.buba.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.buba.mapper.MenuMapper;
@Service
public class MenuService {
	
	@Autowired
	MenuMapper menuMapper;
	
	public List<Map<String, Object>> queryMenuTreeByUser(User user){
		 List<Menu> menus = new ArrayList<Menu>();
		 if(user.getUsertype().equals("0")){
			 menus = menuMapper.getAdminMenu();
		 }else{
			 
		 }
		 
		 Map<String, Map<String, Object>> tempMap = new HashMap<String, Map<String, Object>>();
			// 再次遍历数据，为每个数据设置children，children为list
			List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
			if(menus != null && menus.size() > 0){
				for (Menu menu : menus) {
					Map<String, Object> node = new HashMap<String, Object>();
					node.put("id", menu.getId());
					if(StringUtils.isNotBlank(menu.getPid())){
					    node.put("pid", menu.getPid());
					}else{
					    node.put("pid","");
					}
					node.put("code", menu.getMenuCode());
					node.put("name", menu.getMenuName());
					node.put("icon", menu.getIcon());
					node.put("url", menu.getUrl());
					tempMap.put(menu.getMenuCode(), node);
				}
				for (Menu menu : menus) {
					Map<String, Object> node = tempMap.get(menu.getMenuCode());
					// 用当前ID在tempMap中查找，找到了就是id的后代
					Map<String, Object> parent = (Map<String, Object>) tempMap.get(menu.getPid());
					if (parent != null) {
						List childrens = (List) parent.get("children");
						if (childrens == null) {
							childrens = new ArrayList<Map<String, Object>>();
							parent.put("children", childrens);
						}
						childrens.add(node);
					} else {
						list.add(node);
					}
				}
			}
			System.out.println(list);
			return list;
		 
		
		
	}
}
