package com.buba.service;

import com.buba.model.User;
import com.buba.util.PageFinder;
import com.buba.util.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.buba.mapper.UserMapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by sang on 2018/7/15.
 */
@Service
public class UserService {
    @Autowired
    UserMapper userMapper;
    public boolean check(String account,String userpassword){
    	//userMapper.check(account,userpassword);
    	return true;
    }
    
    
    
    public PageFinder<User> queryUserByPage(Pageable pageable,User user,String sortName,String sortOrder){
    	
    	int pageNumber = pageable.getPageNumber();
		int pageSize = pageable.getPageSize();
		Map<String,Object> map1 = new HashMap<String, Object>();
		System.out.println(user.toString());
		map1.put("user", user);
		Map<String,Object> map2 = new HashMap<String, Object>();
		map2.put("user", user);
		map2.put("pageNumber", pageNumber);
		map2.put("pageSize", pageSize);
		
		Integer count = this.userMapper.count(map1);
		System.out.println("count:"+count);
		 List<User> list = this.userMapper.pagedBySQL(map2);
		 PageFinder<User> pg = new PageFinder<User>(pageNumber, pageSize, count, list);
		return pg;
    	

    	
    }
   /* public int addUser(User book) {
        return bookMapper.addUser(book);
    }
    public int updateUser(User book) {
        return bookMapper.updateUserById(book);
    }
    public int deleteUserById(Integer id) {
        return bookMapper.deleteUserById(id);
    }
    public User getUserById(Integer id) {
        return bookMapper.getUserById(id);
    }
    public List<User> getAllUsers() {
        return bookMapper.getAllUsers();
    }*/
}
