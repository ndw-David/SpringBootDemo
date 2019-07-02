package com.buba.controller;

import com.buba.model.Book;
import com.buba.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import redis.clients.jedis.Jedis;

import java.util.List;

/**
 * Created by sang on 2018/7/15.
 */
@RestController
public class BookController {
    @Autowired
    BookService bookService;
    @GetMapping("/book/bookOps")
    public void bookOps() {
        Book b1 = new Book();
        b1.setName("西厢记");
        b1.setAuthor("王实甫");
        int i = bookService.addBook(b1);
        System.out.println("addBook>>>" + i);
        Book b2 = new Book();
        b2.setId(1);
        b2.setName("朝花夕拾");
        b2.setAuthor("鲁迅");
        int updateBook = bookService.updateBook(b2);
        System.out.println("updateBook>>>"+updateBook);
        Book b3 = bookService.getBookById(1);
        System.out.println("getBookById>>>"+b3);
        int delete = bookService.deleteBookById(2);
        System.out.println("deleteBookById>>>"+delete);
        List<Book> allBooks = bookService.getAllBooks();
        System.out.println("getAllBooks>>>"+allBooks);
    }
    @GetMapping("/book/list")
    public ModelAndView list(){
    	ModelAndView mv = new ModelAndView();
    	List<Book> allBooks = bookService.getAllBooks();
    	mv.addObject("books", allBooks);
    	mv.setViewName("books");
    	return mv;
    }
    @GetMapping("/list")						
    public ModelAndView list1(){
    	ModelAndView mv = new ModelAndView();
    /*	List<Book> allBooks = bookService.getAllBooks();
    	mv.addObject("books", allBooks);*/
    	System.out.println("........");
    	mv.setViewName("books");
    	return mv;
    }
    
    @GetMapping("/redis")						
    public void redis(){
    
    
    } 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
