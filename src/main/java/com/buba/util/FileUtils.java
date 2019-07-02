package com.buba.util;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class FileUtils {
    
	 /**
     * 追加文件
     * @param fileName
     * @param content
     */
    public static void appendContent(String fileName, String content) {
        FileWriter writer = null;
        try {
            // 打开�?个写文件器，构�?�函数中的第二个参数true表示以追加形式写文件
            writer = new FileWriter(fileName, true);
            writer.write(content);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (writer != null) {
                    writer.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
    public static boolean createDir(String name) {
        File file = new File(name);
        boolean falg = file.mkdirs();
        return falg;
    }

    public static boolean deleteDir(String name) {
        File file = new File(name);
        if (file.exists()) {
            file.delete();
            return true;
        }
        return false;
    }

    public static boolean isExist(String name) {
        File file = new File(name);
        if (file.exists()) {
            return true;
        }
        return false;
    }

    public static boolean renameDir(String name, String newname) {
        File file = new File(name);
        if (file.exists()) {
            file.renameTo(new File(newname));
            return true;
        }
        return false;
    }
    
    public static String FormetFileSize(long fileS) {//转换文件大小
        DecimalFormat df = new DecimalFormat("#.00");
        String fileSizeString = "";
        if(fileS == 0){
            return "0KB";
        }
        if (fileS < 1048576) {
            fileSizeString = df.format((double) fileS / 1024) + "K";
        } else if (fileS < 1073741824) {
            fileSizeString = df.format((double) fileS / 1048576) + "M";
        } else {
            fileSizeString = df.format((double) fileS / 1073741824) + "G";
        }
        return fileSizeString;
    }
    
    public static String createBatchId() {
        SimpleDateFormat sdFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        String now = sdFormat.format(new Date());
        return now;
    }
}
