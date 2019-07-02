package com.buba.mapper;

import java.util.List;
import java.util.Map;

import com.buba.model.Menu;
import com.buba.model.User;

public interface MenuMapper {

	public List<Map<String, Object>> queryMenuTreeByUser(User user);
	public List<Menu> getAdminMenu();
	
	
	
	
	
}
