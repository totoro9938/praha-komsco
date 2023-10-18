package com.cp.praha.main.common.service.util;

import com.cp.praha.common.domain.ApiErrorResponse;
import org.springframework.http.HttpStatus;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Calendar;

public class ImageFileUtils {

    public static BufferedImage imageResize(File file,String filePath){
        try {
            int resizeWidth = 1024;
            int resizeHeight = 1024;

            Calendar c = Calendar.getInstance(); //객체 생성
            String year = String.valueOf(c.get(Calendar.YEAR));

            File convFile = new File(filePath + "/" + year + "/" +file.getName());
            convFile.createNewFile();
            FileOutputStream fos = new FileOutputStream(convFile);
            fos.write(Files.readAllBytes(file.toPath()));
            fos.close();

            BufferedImage image = ImageIO.read(convFile);
            convFile.delete();

            int oriWidth = image.getWidth();
            int oriHeight = image.getHeight();
            int maxWidth = 1024;
            int maxHeight = 1024;

            if(oriWidth > maxWidth || oriHeight > maxHeight){
                if(oriWidth >= oriHeight){
                    resizeWidth = maxWidth;
                    resizeHeight = Math.round((oriHeight * resizeWidth) / oriWidth);
                } else {
                    resizeHeight = maxHeight;
                    resizeWidth = Math.round((oriWidth * resizeHeight) / oriHeight);
                }
            } else {
                resizeWidth = oriWidth;
                resizeHeight = oriHeight;
            }

            Image resized = image.getScaledInstance(resizeWidth, resizeHeight, Image.SCALE_DEFAULT);
            BufferedImage bImage = new BufferedImage(resizeWidth, resizeHeight, BufferedImage.TYPE_INT_RGB);
            Graphics2D bGr = bImage.createGraphics();
            bGr.drawImage(resized, 0, 0, null);
            bGr.dispose();

            return bImage;

        } catch (Exception e){
            throw new ApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR,String.format("파일을 저장할 수 없습니다. Error: %s", e.getMessage()));
        }
    }

    public static void cleanUp(File file) throws IOException {
        Files.delete(Paths.get(String.format("%s/%s",file.getAbsolutePath(),file.getName())));
    }


    public static String getBrowser(String agent) {
        if (agent.contains("MSIE") || agent.contains("Trident"))
            return "MSIE";
        else if (agent.contains("Chrome"))
            return "Chrome";
        else if (agent.contains("Opera"))
            return "Opera";
        return "Firefox";
    }

    public static String getDisposition(String filename, String browser)
             {
        String dispositionPrefix = "attachment;filename=";
        String encodedFilename = null;
        if (browser.equals("MSIE")) {
            encodedFilename = URLEncoder.encode(filename, StandardCharsets.UTF_8).replaceAll(
                    "\\+", "%20");
        } else if (browser.equals("Firefox") || browser.equals("Opera")) {
            try {
                encodedFilename = "\""
                        + new String(filename.getBytes(StandardCharsets.UTF_8), "8859_1") + "\"";
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        } else if (browser.equals("Chrome")) {
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < filename.length(); i++) {
                char c = filename.charAt(i);
                if (c > '~') {
                    sb.append(URLEncoder.encode("" + c, StandardCharsets.UTF_8));
                } else {
                    sb.append(c);
                }
            }
            encodedFilename = sb.toString();
        }
        return dispositionPrefix + encodedFilename;
    }
}
