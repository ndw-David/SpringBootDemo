package com.buba.controller;

import com.buba.model.User;
import com.buba.service.UserService;
import com.buba.util.PageFinder;
import com.buba.util.Pageable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;



@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/user/index")
	public ModelAndView index(){
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/user/user");
		
		return mv;
		
	}
	@GetMapping("/user/toadd")
	public ModelAndView toadd(){
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/user/add");
		
		return mv;
		
	}
	
	
	
	@PostMapping("/user/list")
	public PageFinder<User> list(Pageable pageable,User user,String sortName,String sortOrder) throws Exception {
		
		
		// 排序字段
		//String sortname = this.getPara("sortName");
		
		System.out.println("account="+user.getAccount());
		
		return this.userService.queryUserByPage(pageable,user,sortName,sortOrder);
	}
	
	
	
	public void add(){
		
	}
	
	
	
	
	
}
