package com.cp.praha.common.util;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class HtmlToPdfConverter {

    public static byte[] convertHtmlToPdf(String html) throws DocumentException, IOException {
        // A4 크기의 Document 생성
        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, outputStream);
        document.open();
        // html 내용을 Paragraph 로 변환하여 Document 에 추가
        List<Paragraph> paragraphs = getParagraphsFromHtml(html);
        for (Paragraph paragraph : paragraphs) {
            document.add(paragraph);
        }
        document.close();
        return outputStream.toByteArray();
    }

    private static List<Paragraph> getParagraphsFromHtml(String html) {
        List<Paragraph> paragraphs = new ArrayList<>();
        // html 내용을 줄바꿈 단위로 나누어 Paragraph 로 변환
        String[] lines = html.split("\\r?\\n");
        for (String line : lines) {
            Paragraph paragraph = new Paragraph(line);
            paragraphs.add(paragraph);
        }
        return paragraphs;
    }
}
