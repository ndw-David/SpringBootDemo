package com.buba.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.buba.model.User;

public interface UserMapper {

	//校验用户登录信息
	boolean check(String account,String userpassword);
	//获取用户列表
	List<User> getUserList();
	//获取数量
	int count(@Param("params") Map<String,Object> map);
	List<User> pagedBySQL(@Param("params") Map<String,Object> map);
}
