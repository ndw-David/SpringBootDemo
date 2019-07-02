package com.buba.util;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateFormatUtils {

	static SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");

	static SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	/**
	 * 格式化日�?
	 * 
	 * @return String
	 */
	public static String formatDate(Date date) {
		String strDate = sdf1.format(date);
		return strDate;
	}

	/**
	 * 格式化日�?
	 * 
	 * @return Date
	 */
	public static Date formatDate(String strDate) {
		Date date = null;
		try {
			date = sdf1.parse(strDate);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return date;
	}

	/**
	 * 获取当前系统日期
	 * 
	 * @return Date
	 */
	public static Date getCurrentDate() {
		Date date = new Date();
		String sysDate = sdf1.format(date);
		return formatDate(sysDate);
	}

	/**
	 * 获取当前系统日期
	 * 
	 * @return String
	 */
	public static String getStrCurrentDate() {
		Date date = new Date();
		return formatDate(date);
	}

	/**
	 * 日期比较
	 * 
	 * @param date1
	 *            与当前日起要比较的日�?
	 * @param date2
	 *            当前日期
	 */
	public static int checkTime(Date date1, Date date2) {
		if (date1.getTime() > date2.getTime()) {
			return -1;
		} else if (date1.getTime() < date2.getTime()) {
			return 1;
		} else {
			return 0;
		}
	}

	/**
	 * 获取当前系统日期 yyyy-MM-dd HH:mm:ss
	 */
	public static String currentDate() {
		Date date = new Date();
		String sysDate = sdf2.format(date);
		return sysDate;
	}

	/**
	 * 获取三个月后的日�?
	 */
	public static Date afterThirdMonth() {
		Date date = getCurrentDate();
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DAY_OF_MONTH, 90);
		date = cal.getTime();
		String stringDate = sdf1.format(date);
		return formatDate(stringDate);
	}
	
	/**
	 * 获取第二天日期串
	 */
	public static String getStrNextDate(Date date) {
		String str = "";
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DATE, 1);
		date = cal.getTime();
		str = sdf1.format(date);
		return str;
	}
	
	/**
	 * 获取第二天日�?
	 */
	public static Date getNextDate(String strDate) {
		Date date = null;
		Calendar cal = Calendar.getInstance();
		cal.setTime(formatDate(strDate));
		cal.add(Calendar.DATE, 1);
		date = cal.getTime();
		return date;
	}

	// 计算当月�?后一�?,返回字符�?
	public static String getLastDayOfMonth() {
		String str = "";
		Calendar lastDate = Calendar.getInstance();
		lastDate.set(Calendar.DATE, 1);// 设为当前月的1�?
		lastDate.add(Calendar.MONTH, 1);// 加一个月，变为下月的1�?
		lastDate.add(Calendar.DATE, -1);// 减去�?天，变为当月�?后一�?
		str = sdf1.format(lastDate.getTime());
		return str;
	}

	// 获取当月第一�?
	public static String getFirstDayOfMonth() {
		String str = "";
		Calendar lastDate = Calendar.getInstance();
		lastDate.set(Calendar.DATE, 1);// 设为当前月的1�?
		str = sdf1.format(lastDate.getTime());
		return str;
	}

	// 获取当天时间
	public static String getNowTimeString() {
		return sdf1.format(new Date());
	}
	
	public static String getFormatDate(String dateStr) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			String date = format.format(sdf.parse(dateStr));
			return date;
		} catch (Exception e) {
		}
		return null;
	}
	
	public static String getDate(java.util.Date date, String formatStr) {
        return getFormatDate(date, formatStr);
    }
	public static String getFormatDate(Date date, String pattern) { 
		if (pattern == null || pattern.length() < 1) {
			pattern = "yyyy-MM-dd";
		}
		try {
			SimpleDateFormat sdf = new SimpleDateFormat(pattern);
			String strDate = sdf.format(date);
			return strDate;
		} catch (Exception e) {
			System.out.println("日期格转换失败！");
		}
		return null;
	}
	
	public static Date formatDate(Date date, String pattern){
		try {
			return sdf1.parse(sdf1.format(date));
		} catch (ParseException e) {
			e.printStackTrace();
			return date;
		}
	}
	
	public static Date getNextDate(Date date){
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DATE, 1);
		date = cal.getTime();
		return formatDate(date,"yyyy-MM-dd");
	}
}
