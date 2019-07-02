package com.buba.util;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

/**
 * 控制器父类，为了将来扩展使用，目前为�?
 *
 */
@Controller
public class BaseController {
	private Map<String, Object> data = new HashMap<String, Object>();

	
	protected void failure(String msg){
		data.put("success", Boolean.FALSE);
		data.put("msg", msg);
		data.put("init", Boolean.TRUE);
	}
	
	public Map<String, Object> getData() {
		Boolean init = (Boolean)data.get("init");
		if (init == null || init == false){
			data.put("success", Boolean.TRUE);
		}
		data.put("init", Boolean.FALSE);
		//data.put("success", Boolean.TRUE);
		return data;
	}
	
	public HttpSession getSession() {
		ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		return attrs.getRequest().getSession();
	}
     
}
