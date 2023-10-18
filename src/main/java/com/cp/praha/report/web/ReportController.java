package com.cp.praha.report.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ReportController {
    @RequestMapping("/report-agent-day")
    @Secured("ROLE_REPORT_RECEIPT_LIST_AGENT_DAY_SELECT")
    public String reportAgentDay(HttpSession session, Model model) {
        return "analysis/report-agent-day";
    }

    @RequestMapping("/report-manual")
    @Secured("ROLE_REPORT_MANUAL_LIST_SELECT")
    public String reportManual(HttpSession session, Model model) {
        return "analysis/report-manual";
    }

    @RequestMapping("/report-campaign")
    @Secured("ROLE_REPORT_CAMPAIGN_LIST_SELECT")
    public String reportCampaign(HttpSession session, Model model) {
        return "analysis/report-campaign";
    }

    @RequestMapping("/report-call-cat-day")
    @Secured("ROLE_REPORT_RECEIPT_CALLCAT_SELECT")
    public String reportCallCatDay(HttpSession session, Model model) {
        return "analysis/report-call-cat-day";
    }

    @RequestMapping("/report-call-class-day")
    @Secured("ROLE_REPORT_RECEIPT_CALLCLASS_SELECT")
    public String reportCallClassDay(HttpSession session, Model model) {
        return "analysis/report-call-class-day";
    }

    @RequestMapping("/report-hour-receipt")
    @Secured("ROLE_REPORT_RECEIPT_LIST_HOUR_SELECT")
    public String reportHourPerReceipt(HttpSession session, Model model) {
        return "analysis/report-hour-receipt";
    }

    @RequestMapping("/report-transfer")
    @Secured("ROLE_REPORT_TRANSFER_LIST_SELECT")
    public String reportTransfer(HttpSession session, Model model) {
        return "analysis/report-transfer";
    }
}
