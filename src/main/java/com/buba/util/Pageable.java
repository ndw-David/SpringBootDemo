package com.buba.util;

public class Pageable {
	
	private int pageNumber;// 当前�?
	
	private int pageSize = 10;// 每页显示记录�?
	
	public int getPageNumber() {
		if(pageNumber !=0){
			pageNumber = pageNumber/pageSize + 1;
		}
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
}
