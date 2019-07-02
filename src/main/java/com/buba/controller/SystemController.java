package com.buba.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.buba.model.User;
import com.buba.service.BookService;
import com.buba.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class SystemController {

	@Autowired
	private BookService bookService;
	@Autowired
	private UserService userService;
	@Autowired
	StringRedisTemplate stringRedisTemplate;
	@PostMapping("/sysCommon/loginCheck")
	public Map loginCheck(String account,String userpassword,HttpSession session){
		Map<String,Object> map = new HashMap<>();
		System.out.println(account+userpassword);
		//查询数据库，登录校验
		ValueOperations<String, String> opsForValue = stringRedisTemplate.opsForValue();
		//opsForValue.set("usename", value);
		String value = opsForValue.get(account);
		if(value!=null){
			if(value.equals(userpassword)){
				map.put("success", Boolean.TRUE);
				User user = new User(account,userpassword,"0");
				session.setAttribute("account", account);
				session.setAttribute("user", user);
			}else{
				map.put("failure", Boolean.FALSE);
			}
		}else{
			System.out.println("查询数据库");
			boolean flag = userService.check(account, userpassword);
			if(flag){
				opsForValue.set(account, userpassword);
				User user = new User(account,userpassword,"0");
				session.setAttribute("account", account);
				session.setAttribute("user", user);
				
				map.put("success", Boolean.TRUE);
			}else{
				map.put("failure", Boolean.FALSE);
			}
		
		}
	return map;
		
	}
	
	@GetMapping("/sysCommon/main")
	public ModelAndView index(HttpSession session){
		Object attribute = session.getAttribute("account");
		System.out.println(attribute);
		ModelAndView mv = new ModelAndView();
		
		mv.setViewName("main");
		return mv;
		
	}
	
	@RequestMapping(value = "/sysCommon/logout")
	public ModelAndView logout(HttpSession session,HttpServletRequest request) {
		//User user = (User) session.getAttribute("user");
		System.out.println("logout.....");
		/*OptLog optlog = new OptLog();
		optlog.setAccount(user.getAccount());
		optlog.setIp_addr(getIp(request));
		optlog.setOper_module("系统注销");
		optlog.setOper_name("系统注销");
		optlog.setResult(GenTool.SUCCESS);
		optlog.setUser_id(user.getId());*/
		//optLogService.saveOptLog(optlog);0
		session.invalidate();
		ModelAndView mv = new ModelAndView("redirect:/login.html");
		
		return mv;
		
	}
	
	
	
}
