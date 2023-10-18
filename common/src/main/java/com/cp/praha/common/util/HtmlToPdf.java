package com.cp.praha.common.util;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.html2pdf.resolver.font.DefaultFontProvider;
import com.itextpdf.io.font.FontProgram;
import com.itextpdf.io.font.FontProgramFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.IBlockElement;
import com.itextpdf.layout.element.IElement;
import com.itextpdf.layout.font.FontProvider;
import com.itextpdf.layout.properties.BaseDirection;
import com.itextpdf.styledxmlparser.css.media.MediaDeviceDescription;
import com.itextpdf.styledxmlparser.css.media.MediaType;

import java.io.IOException;
import java.util.List;

public class HtmlToPdf {
    public static void main(String[] args) throws IOException {
        String htmlString = "<html lang=\"ko\"><body style=\"width:500px !important;\">\n" +
                "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-family:나눔고딕;border-collapse:collapse;width:100%;height:1841px;\"><colgroup><col width=\"126\" style=\"width:125px;\" /><col width=\"316\" style=\"width:316px;\" /><col width=\"440\" style=\"width:440px;\" /></colgroup><tbody><tr style=\"height:62px;\"><td colspan=\"3\" height=\"56\" width=\"882\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;border-style:solid solid none;white-space:nowrap;color:white;font-size:16pt;font-weight:700;vertical-align:bottom;border-top-width:1px;border-top-color:#d0cece;border-right-width:1px;border-right-color:#d0cece;border-left-width:1px;border-left-color:#d0cece;background-color:#3a3838;padding-left:18px;height:56px;width:881px;\">2022 스프링페스타</td>\n" +
                "</tr>\n" +
                "<tr style=\"height:26px;\"><td colspan=\"3\" height=\"23\" style=\"padding-top:1px;padding-left:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;border-style:none solid solid;white-space:nowrap;color:white;font-size:8pt;text-align:right;border-right-width:1px;border-right-color:#d0cece;border-bottom-width:1px;border-bottom-color:#d0cece;border-left-width:1px;border-left-color:#d0cece;background-color:#3a3838;padding-right:18px;height:23px;\">Marketkurly Customer Communication 2022. 03</td>\n" +
                "</tr>\n" +
                "<tr style=\"height:28px;\"><td height=\"23\" style=\"padding-top:1px;padding-right:1px;padding-left:1px;font-size:11pt;font-family:'맑은 고딕', monospace;vertical-align:middle;white-space:nowrap;border-right-width:1px;border-style:none solid solid;border-right-color:#d0cece;border-bottom-width:1px;border-bottom-color:#d0cece;border-left-width:1px;border-left-color:#d0cece;background-color:white;height:23px;\"><p style=\"line-height:17.6px;margin-bottom:0px;font-size:11pt;\">&nbsp;</p>\n" +
                "</td>\n" +
                "<td style=\"padding-top:1px;padding-right:1px;padding-left:1px;font-size:11pt;font-family:'맑은 고딕', monospace;vertical-align:middle;white-space:nowrap;border-top-width:1px;border-style:solid solid solid none;border-top-color:#d0cece;border-right-width:1px;border-right-color:#d0cece;border-bottom-width:1px;border-bottom-color:#d0cece;background-color:white;\"><p style=\"line-height:17.6px;margin-bottom:0px;font-size:11pt;\">&nbsp;</p>\n" +
                "</td>\n" +
                "<td style=\"padding-top:1px;padding-right:1px;padding-left:1px;font-size:11pt;font-family:'맑은 고딕', monospace;vertical-align:middle;white-space:nowrap;border-top-width:1px;border-style:solid solid solid none;border-top-color:#d0cece;border-right-width:1px;border-right-color:#d0cece;border-bottom-width:1px;border-bottom-color:#d0cece;background-color:white;\"><p style=\"line-height:17.6px;margin-bottom:0px;font-size:11pt;\">&nbsp;</p>\n" +
                "</td>\n" +
                "</tr>\n" +
                "<tr style=\"height:27px;\"><td height=\"23\" style=\"padding-top:1px;padding-right:1px;padding-left:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;white-space:nowrap;color:white;font-size:9pt;font-weight:700;text-align:center;border-right-width:1px;border-style:none solid solid;border-right-color:#d0cece;border-bottom-width:1px;border-bottom-color:#d0cece;border-left-width:1px;border-left-color:#d0cece;background-color:#3a3838;height:23px;\">구분</td>\n" +
                "<td style=\"padding-top:1px;padding-right:1px;padding-left:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;white-space:nowrap;color:white;font-size:9pt;font-weight:700;text-align:center;border-top-width:1px;border-style:solid solid solid none;border-top-color:#d0cece;border-right-width:1px;border-right-color:#d0cece;border-bottom-width:1px;border-bottom-color:#d0cece;background-color:#3a3838;\">Q</td>\n" +
                "<td style=\"padding-top:1px;padding-right:1px;padding-left:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;white-space:nowrap;color:white;font-size:9pt;font-weight:700;text-align:center;border-top-width:1px;border-style:solid solid solid none;border-top-color:#d0cece;border-right-width:1px;border-right-color:#d0cece;border-bottom-width:1px;border-bottom-color:#d0cece;background-color:#3a3838;\">A</td>\n" +
                "</tr>\n" +
                "<tr style=\"height:101px;\"><td height=\"97\" width=\"126\" style=\"padding-top:1px;padding-right:1px;padding-left:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;color:white;font-size:9pt;font-weight:700;text-align:center;border:1px solid rgb(208, 206, 206);background-color:#3a3838;height:97px;width:125px;\">행운의 뽑기</td>\n" +
                "<td width=\"316\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:316px;\">당첨 적립금 사용할 때 제한 조건이 있나요?</td>\n" +
                "<td width=\"440\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:440px;\"><span style=\"color:#9900ff;font-size:9pt;font-weight:700;line-height:normal;margin-top:0px;margin-bottom:0px;\">▶ 구매제한 조건 없음, 당일 내 미사용시 소멸</span><span style=\"font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\"><br />\n" +
                "<br />\n" +
                "해당 이벤트로 제공 되는 쇼핑지원금은</span><span style=\"color:red;font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\">&nbsp;별도 제한 조건이 따르지 않으며,</span><span style=\"font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\">&nbsp;당일 24시 내에 빠른 사용 부탁드립니다.</span></td>\n" +
                "</tr>\n" +
                "<tr style=\"height:174px;\"><td height=\"170\" width=\"126\" style=\"padding-top:1px;padding-right:1px;padding-left:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;color:white;font-size:9pt;font-weight:700;text-align:center;border:1px solid rgb(208, 206, 206);background-color:#3a3838;height:170px;width:125px;\">행운의 뽑기</td>\n" +
                "<td width=\"316\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:316px;\">추첨해서 당첨 된 적립금은 언제까지 쓸수 있나요?</td>\n" +
                "<td width=\"440\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:440px;\"><span style=\"color:#9900ff;font-size:9pt;font-weight:700;line-height:normal;margin-top:0px;margin-bottom:0px;\">▶ 당첨 당일 내 미사용시 소멸</span><span style=\"font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\"><br />\n" +
                "<br />\n" +
                "응모 추첨 이 후, 당첨 된 적립금은&nbsp;</span><span style=\"color:red;font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\">지급일 당일 24시</span><span style=\"font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\">까지 사용 부탁드립니다.<br />\n" +
                "지급 받은 적립금은 [마이컬리-적립금 내역]에서 직접 유효기간을 확인하실 수 있는 점 참고 부탁드립니다.<br />\n" +
                "<br />\n" +
                "-----------------<br />\n" +
                "&nbsp;&nbsp;&nbsp;&nbsp;</span><span style=\"color:#7030a0;font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\">※ 미사용건 복원 불가</span></td>\n" +
                "</tr>\n" +
                "<tr style=\"height:137px;\"><td height=\"133\" width=\"126\" style=\"padding-top:1px;padding-right:1px;padding-left:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;color:white;font-size:9pt;font-weight:700;text-align:center;border:1px solid rgb(208, 206, 206);background-color:#3a3838;height:133px;width:125px;\">행운의 뽑기</td>\n" +
                "<td width=\"316\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:316px;\">컬리귀책으로 전일 쇼핑지원금을 사용한 주문건이 부분/전체 환불이 되었어요. 적립금도 돌려 받나요?</td>\n" +
                "<td width=\"440\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:440px;\"><span style=\"color:#9900ff;font-size:9pt;font-weight:700;line-height:normal;margin-top:0px;margin-bottom:0px;\">▶ 주문 취소, 환불 발생 시 적립금 원복 됨<br />\n" +
                "&nbsp;&nbsp;&nbsp;&nbsp;</span><span style=\"color:#9900ff;font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\">ㄴ 다음날까지 사용해야함</span><span style=\"font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\"><br />\n" +
                "<br />\n" +
                "네, 컬리귀책으로 인해 주문이 취소 된 경우 해당 주문건에 사용하신 적립금을 되돌려 드리고 있습니다.<br />\n" +
                "다만, 적립금은 전체 금액에 소급 적용되므로 부분 환불을 받으신 경우 사용하</span><span style=\"color:rgba(0, 0, 0, 0.847);font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\">신 적</span><span style=\"font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\">립금의 일부로 되돌려드리는 점 양해 부탁드립니다.</span></td>\n" +
                "</tr>\n" +
                "<tr style=\"height:123px;\"><td height=\"119\" width=\"126\" style=\"padding-top:1px;padding-right:1px;padding-left:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;color:white;font-size:9pt;font-weight:700;text-align:center;border:1px solid rgb(208, 206, 206);background-color:#3a3838;height:119px;width:125px;\">행운의 뽑기</td>\n" +
                "<td width=\"316\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:316px;\">[행운의 뽑기] 이벤트는 몇번이고 계속 참여 할 수 있나요?</td>\n" +
                "<td width=\"440\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:440px;\"><span style=\"color:#9900ff;font-size:9pt;font-weight:700;line-height:normal;margin-top:0px;margin-bottom:0px;\">▶ 매일 ID당 1회 참여 * 5일간</span><span style=\"font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\"><br />\n" +
                "<br />\n" +
                "네,&nbsp;</span><span style=\"color:red;font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\">1일 ID당 1회 참여 가능</span><span style=\"font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\">하시며,&nbsp;&nbsp;</span><span style=\"color:red;font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\">즉 이벤트 기간 5일동안 매일</span><span style=\"font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\">&nbsp;참여하실 수&nbsp;&nbsp;있습니다.<br />\n" +
                "다만 당첨 된 적립금은 당일 24시까지 사용하셔야 하며, 시간이 지난 경우 자동 소멸 되는 점 양해 부탁드립니다.</span></td>\n" +
                "</tr>\n" +
                "<tr style=\"height:95px;\"><td height=\"91\" width=\"126\" style=\"padding-top:1px;padding-right:1px;padding-left:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;color:white;font-size:9pt;font-weight:700;text-align:center;border:1px solid rgb(208, 206, 206);background-color:#3a3838;height:91px;width:125px;\">행운의 뽑기</td>\n" +
                "<td width=\"316\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:316px;\">신규회원 이벤트 상품 쿠폰이 있는데, 같이 사용이 안되요</td>\n" +
                "<td width=\"440\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:440px;\"><span style=\"color:#9900ff;font-size:9pt;font-weight:700;line-height:normal;margin-top:0px;margin-bottom:0px;\">▶ 둘중에 택 1, 중복으로 사용 불가</span><span style=\"font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\"><br />\n" +
                "<br />\n" +
                "신규회원 이벤트 상품쿠폰(100원쿠폰)은 해당 이벤트 적립금과 함께 사용이 불가합니다.&nbsp;</span><span style=\"color:rgba(0, 0, 0, 0.847);font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\">신규회원 이벤트 상품과 별개로 주문하실 경우 사용 가능하십니다.</span></td>\n" +
                "</tr>\n" +
                "<tr style=\"height:111px;\"><td height=\"107\" width=\"126\" style=\"padding-top:1px;padding-right:1px;padding-left:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;color:white;font-size:9pt;font-weight:700;text-align:center;border:1px solid rgb(208, 206, 206);background-color:#3a3838;height:107px;width:125px;\">선착순 타임어택</td>\n" +
                "<td width=\"316\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:316px;\">최초특가상품 더 구매하고 싶은데, 일정 수량부터 구매안된다고 뜹니다. 오류인가요?</td>\n" +
                "<td width=\"440\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:440px;\"><span style=\"color:#9900ff;font-size:9pt;font-weight:700;line-height:normal;margin-top:0px;margin-bottom:0px;\">▶ 1인당 1개 구매 가능 제한</span><span style=\"font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\"><br />\n" +
                "<br />\n" +
                "최초 특가 상품은 각 한정수량으로 제공 되며, 한정수량/선착순의 특성상 많은 고객들께서 참여하실 수 있도록 1인당 구매 수량을 일부 제한 하고 있는 점 양해 부탁드립니다.</span></td>\n" +
                "</tr>\n" +
                "<tr style=\"height:225px;\"><td height=\"221\" width=\"126\" style=\"padding-top:1px;padding-right:1px;padding-left:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;color:white;font-size:9pt;font-weight:700;text-align:center;border:1px solid rgb(208, 206, 206);background-color:#3a3838;height:221px;width:125px;\">선착순 타임어택</td>\n" +
                "<td width=\"316\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;color:windowtext;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:316px;\">특가 상품 중에 구매하고 싶은게 있는데요<br />\n" +
                "오늘 택배지역은 주문 불가하다고 떠서 주문이 안됩니다.</td>\n" +
                "<td width=\"440\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;color:windowtext;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:440px;\">택배지역이라 샛별배송지역 대비 주문시간이 짧으나, 아예 불가한 것은 아닙니다. 토요일 오후 23시 이후에는 주문이 가능하기에 참고 부탁드립니다.<br />\n" +
                "<br />\n" +
                "다만, 한정수량으로 진행되는 이벤트로서 일찍 조기마감이 될 수는 있는 특징이 있습니다.<br />\n" +
                "이용에 매우 아쉬움이 발생한 점 무척이나 공감하는 바이며 추후에는 지역별 주문시간 고려할 수 있도록 개선하겠습니다.<br />\n" +
                "<br />\n" +
                "-----------------<br />\n" +
                "<span style=\"color:#7030a0;font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\">[1차] 개선/양해 안내 및 소정의 적립금 케어<br />\n" +
                "[2차] 미수긍/대응불만/강성 &rarr; CC팀 응대가이드 문의(JIRA)</span></td>\n" +
                "</tr>\n" +
                "<tr style=\"height:406px;\"><td height=\"402\" width=\"126\" style=\"padding-top:1px;padding-right:1px;padding-left:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;color:white;font-size:9pt;font-weight:700;text-align:center;border:1px solid rgb(208, 206, 206);background-color:#3a3838;height:402px;width:125px;\">선착순 타임어택</td>\n" +
                "<td width=\"316\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;color:windowtext;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:316px;\">타임특가로 주문한 상품이 갑자기 취소되었다고 문자가 왔습니다. 어떻게 된거죠?</td>\n" +
                "<td width=\"440\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;color:#9900ff;font-size:9pt;font-weight:700;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:440px;\">▶ 3회 초과 구매 시 고지 없이 취소+문자 안내됨<br />\n" +
                "<br />\n" +
                "<span style=\"color:rgba(0, 0, 0, 0.847);font-size:9pt;font-weight:400;line-height:normal;margin-top:0px;margin-bottom:0px;\">해당 이벤트는 기간 내 3회이상 초과 구매 시에 고지없이 즉시 취소가 진행됩니다.&nbsp;<br />\n" +
                "보다 많은 분들께서 해당 이벤트에 많은 참여를 하실 수 있도록 하기 위함이며 이로 인해 고객님의 주문건이 취소가 된 것으로 확인됩니다.<br />\n" +
                "관련 내용은 이벤트 페이지 내 유의사항에도 함께 안내드리고 있는 점 전달 드립니다.</span><span style=\"color:#595959;font-size:9pt;font-weight:400;line-height:normal;margin-top:0px;margin-bottom:0px;\"><br />\n" +
                "&nbsp;&nbsp;&nbsp;&nbsp;</span><span style=\"font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\"><br />\n" +
                "&nbsp;&nbsp;&nbsp;&nbsp;</span><span style=\"color:#595959;font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\">-------LMS 문자 스크립트-------</span><span style=\"font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\"><br />\n" +
                "&nbsp;&nbsp;&nbsp;&nbsp;</span><span style=\"color:#595959;font-size:8pt;font-weight:400;line-height:normal;margin-top:0px;margin-bottom:0px;\">고객님, 안녕하세요. 마켓컬리 입니다.<br />\n" +
                "봄맞이 스프링 페스타 이벤트에 많은 관심 주시어 감사합니다.<br />\n" +
                "<br />\n" +
                "고객님께서는 현재 3회 이상 참여하신 내용이 확인되어 부득이하게 관련 주문건이 취소되었음을 안내 드립니다.<br />\n" +
                "<br />\n" +
                "이벤트 중 [타임어택] 행사는 보다 많은 고객님들께 다양한 혜택을 드리고자 하며<br />\n" +
                "이에 행사 기간 내 3회 초과 구매 시 별도 고지없이 주문취소가 발생할 수 있는 점을 함께 안내드리고 있습니다.<br />\n" +
                "해당 내용은 이벤트 페이지 유의사항에서도 확인 가능합니다.<br />\n" +
                "<br />\n" +
                "감사합니다.&nbsp;<br />\n" +
                "마켓컬리 드림.</span></td>\n" +
                "</tr>\n" +
                "<tr style=\"height:162px;\"><td height=\"158\" style=\"padding-top:1px;padding-right:1px;padding-left:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;white-space:nowrap;color:white;font-size:9pt;font-weight:700;text-align:center;border-right-width:1px;border-style:none solid solid;border-right-color:#d0cece;border-bottom-width:1px;border-bottom-color:#d0cece;border-left-width:1px;border-left-color:#d0cece;background-color:#3a3838;height:158px;\">즉시할인</td>\n" +
                "<td width=\"316\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:316px;\">카카오페이/롯데카드 할인이 적용되지 않아요</td>\n" +
                "<td width=\"440\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:440px;\">결제사의 즉시할인 이벤트는 선착순 이벤트이므로 참여하신 고객님들께서 많으실 경우 조기 종료가 될 수 있습니다.<br />\n" +
                "<br />\n" +
                "-----------------<br />\n" +
                "<span style=\"color:#7030a0;font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\">- 유의사항에 기재된 모든 조건 충족 했을 경우 &rarr; 조건 별 충족 여부 포함 기재하여, CC팀 조기종료 문의&nbsp;<br />\n" +
                "- 일부 조건 미충족 했을 경우 &rarr; 미충족 사유 안내</span></td>\n" +
                "</tr>\n" +
                "<tr style=\"height:162px;\"><td height=\"158\" style=\"padding-top:1px;padding-right:1px;padding-left:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;white-space:nowrap;color:white;font-size:9pt;font-weight:700;text-align:center;border-right-width:1px;border-style:none solid solid;border-right-color:#d0cece;border-bottom-width:1px;border-bottom-color:#d0cece;border-left-width:1px;border-left-color:#d0cece;background-color:#3a3838;height:158px;\">즉시할인</td>\n" +
                "<td width=\"316\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:316px;\">롯데카드로 결제했는데요, 이게 법인카드라서 할인 적용이 안되는 건가요?</td>\n" +
                "<td width=\"440\" style=\"padding-top:1px;padding-right:1px;font-family:'맑은 고딕', monospace;vertical-align:middle;font-size:9pt;border:1px solid rgb(208, 206, 206);background-color:white;padding-left:18px;width:440px;\"><span style=\"color:#9900ff;font-size:9pt;font-weight:700;line-height:normal;margin-top:0px;margin-bottom:0px;\">▶ 체크/법인/선불/충천/기프트 카드는 할인 적용이 불가</span><span style=\"font-size:9pt;line-height:normal;margin-top:0px;margin-bottom:0px;\"><br />\n" +
                "<br />\n" +
                "넵, 롯데카드 즉시할인 이벤트는 신용카드에만 해당되며<br />\n" +
                "체크/법인/선불/충천/기프트 카드 일 경우에는 할인적용이 불가합니다.<br />\n" +
                "<br />\n" +
                "</span></td>\n" +
                "</tr>\n" +
                "</tbody></table>\n" +
                "<p>&nbsp;</p>\n" +
                "<p>&nbsp;</p></body></html>";
        String pdfFilePath = "./output.pdf";

        ConverterProperties properties = new ConverterProperties();
        FontProvider fontProvider = new DefaultFontProvider(false, false, false);
        FontProgram fontProgram = FontProgramFactory.createFont("/Users/jungsungwook/project/hug/cp-hug/src/main/resources/static/css/fonts/noto-sans-kr-v25-latin_korean-700.woff");
        fontProvider.addFont(fontProgram);
        properties.setFontProvider(fontProvider);
        properties.setCharset("UTF-8");
        MediaDeviceDescription mediaDeviceDescription = new MediaDeviceDescription(MediaType.SPEECH);
        properties.setMediaDeviceDescription(mediaDeviceDescription);
        PdfDocument pdfDocument = new PdfDocument(new PdfWriter(pdfFilePath));
        Document document = new Document(pdfDocument,PageSize.A4.rotate(),false);
        document.setMargins(20, 20, 20, 20);

        document.setBaseDirection(BaseDirection.LEFT_TO_RIGHT);
        List<IElement> elements = HtmlConverter.convertToElements(htmlString,properties);
        for (IElement element : elements) {
            document.add((IBlockElement) element);
        }
        document.close();
    }
}
