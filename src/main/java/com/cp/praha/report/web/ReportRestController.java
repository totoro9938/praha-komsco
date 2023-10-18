package com.cp.praha.report.web;

import com.cp.praha.report.service.ReportService;
import com.cp.praha.report.service.request.*;
import com.cp.praha.report.service.response.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/analysis/v1")
public class ReportRestController {
    private final ReportService reportService;

    @Secured("ROLE_REPORT_RECEIPT_LIST_AGENT_DAY_SELECT")
    @GetMapping("/report/agent-day")
    public List<ReportUserPerDayDomain> reportUserPerDay(ReportUserPerDayCommand command) {
        return reportService.reportUserPerDay(command);
    }

    @Secured("ROLE_REPORT_CAMPAIGN_LIST_SELECT")
    @RequestMapping("/report/campaign")
    public List<ReportCampaignDomain> reportCampaign(ReportCampaignCommand command) {
        return reportService.reportCampaign(command);
    }

    @Secured("ROLE_REPORT_MANUAL_LIST_SELECT")
    @RequestMapping("/report/manual")
    public List<ReportRequestManualListDomain> reportManual(ReportRequestManualListCommand command) {
        return reportService.reportManual(command);
    }

    @RequestMapping("/report/call-cat-day")
    @Secured("ROLE_REPORT_RECEIPT_CALLCAT_SELECT")
    public List<ReportCallCatPerDayDomain> reportCalCatPerDay(ReportCallCatPerDayCommand command) {
        return reportService.reportCalCatPerDay(command);
    }

    @RequestMapping("/report/call-class-day")
    @Secured("ROLE_REPORT_RECEIPT_CALLCLASS_SELECT")
    public List<ReportCallClassPerDayDomain> reportCallClassPerDay(ReportCallClassPerDayCommand command) {
        return reportService.reportCallClassPerDay(command);
    }

    @RequestMapping("/report/hour-receipt")
    @Secured("ROLE_REPORT_RECEIPT_LIST_HOUR_SELECT")
    public List<ReportHourPerReceiptDomain> reportHourPerReceipt(ReportHourPerReceiptCommand command) {
        return reportService.reportHourPerReceipt(command);
    }

    @RequestMapping("/report/transfer")
    @Secured("ROLE_REPORT_TRANSFER_LIST_SELECT")
    public List<ReportTransferListDomain> reportTransfer(ReportTransferListCommand command) {
        return reportService.reportTransferList(command);
    }
}
