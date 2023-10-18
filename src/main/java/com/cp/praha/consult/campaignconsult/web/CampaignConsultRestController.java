package com.cp.praha.consult.campaignconsult.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.util.IpUtil;
import com.cp.praha.consult.campaignconsult.service.CampaignConsultService;
import com.cp.praha.consult.campaignconsult.service.request.*;
import com.cp.praha.consult.campaignconsult.service.response.CampaignConsultCustSelectItemDomain;
import com.cp.praha.consult.campaignconsult.service.response.CampaignConsultSumSelectDomain;
import com.cp.praha.consult.campaignconsult.service.response.CampaignConsultVisitorSelectDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/consult/v1")
@Secured("ROLE_CONSULT_HAPPYCALL_LIST_SELECT")
public class CampaignConsultRestController {

    private final CampaignConsultService campaignConsultService;

    /**
     * USP_CAMPAIGN_SUM_SEL_PAGE
     * 캠페인상담 조회
     */
    @GetMapping("/campaign-consult/select/page")
    public GridDomain campaignConsultSelectPage(@Valid CampaignConsultSumSelectPageCommand command){
        return campaignConsultService.campaignConsultSumSelectPage(command);
    }

    /**
     * USP_CAMPAIGN_SUM_SEL
     * 캠페인상담 건수 조회
     */
    @GetMapping("/campaign-consult/select")
    public CampaignConsultSumSelectDomain campaignConsultSelect(@Valid CampaignConsultSumSelectCommand command){
        return campaignConsultService.campaignConsultSumSelect(command);
    }

    /**
     * USP_CAMPAIGN_CUST_CALL_SEL_PAGE
     * 캠페인상담 상담사 조회
     */
    @GetMapping("/campaign-consult/cust/select/page")
    public GridDomain campaignConsultCustCallSelectPage(@Valid CampaignConsultCustCallSelectPageCommand command){
        return campaignConsultService.campaignConsultCustCallSelectPage(command);
    }

    /**
     * USP_CAMPAIGN_CUST_SEL_ITEM
     * 캠페인상담 상담사 상세 조회
     */
    @GetMapping("/campaign-consult/cust/select/item")
    public CampaignConsultCustSelectItemDomain campaignConsultCustSelectItem(@Valid CampaignConsultCustSelectItemCommand command){
        return campaignConsultService.campaignConsultCustSelectItem(command);
    }

    /**
     * USP_VISITOR_CAMPAIGN_SEL
     * 캠페인상담 통화시도이력 조회
     */
    @GetMapping("/campaign-consult/visitor/select")
    public List<CampaignConsultVisitorSelectDomain> campaignConsultVisitorSelect(@Valid CampaignConsultVisitorSelectCommand command){
        return campaignConsultService.campaignConsultVisitorSelect(command);
    }

    /**
     *  USP_VISITOR_CAMPAIGN_INS
     *  캠페인상담 전화걸기 시도(전화걸기를 할 때 호출되는 프로시저)
     */
    @PostMapping("/campaign-consult/visitor/insert")
    @Secured("ROLE_CONSULT_HAPPYCALL_LIST_INSERT")
    public ResponseEntity<HttpStatus> campaignConsultVisitorInsert(HttpServletRequest request, @RequestBody @Valid CampaignConsultVisitorInsertCommand command) {
        String ip = IpUtil.getClientIP(request);
        campaignConsultService.campaignConsultVisitorInsert(command, ip);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *  USP_CAMPAIGN_CUST_UPT
     *  캠페인 상담내역 저장
     */
    @PutMapping("/campaign-consult/cust/update")
    @Secured("ROLE_CONSULT_HAPPYCALL_LIST_UPDATE")
    public ResponseEntity<HttpStatus> campaignConsultCustUpdate(@RequestBody @Valid CampaignConsultCustUpdateCommand command){
        campaignConsultService.campaignConsultCustUpdate(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
