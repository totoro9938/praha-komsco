package com.cp.praha.consult.administrative.web;

import com.cp.praha.consult.administrative.service.AdministService;
import com.cp.praha.consult.administrative.service.AdministUtil;
import com.cp.praha.consult.administrative.service.request.ParamVO;
import com.cp.praha.consult.administrative.service.request.TrafficCommand;
import com.cp.praha.consult.administrative.service.response.*;
import com.cp.praha.consult.smslist.service.request.SmsInsertCommand;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/consult/v1")
@Secured("ROLE_CONSULT_ADMINIST_SELECT")
public class AdministRestController {

    private final AdministUtil administUtil;
    private final AdministService administService;

    @Value("${internal.ip}")
    private String ip;

    //상하수도
    @GetMapping(value = "/water-supply/api")
    public List<WaterSupplyVO> getWaterSupplyAPI(ParamVO param) throws Exception {
        String xmlStringDatas = administUtil.connectUrl(ip, "/water", param);
        return administService.getWaterSupply(xmlStringDatas);
    }

    //상하수도 수용가정보
    @GetMapping(value = "/water-supply/info/api")
    public List<WaterSupplyVO> getWaterSupplyInfoAPI(ParamVO param) throws Exception {
        String xmlStringDatas = administUtil.connectUrl(ip, "/water-detail", param);
        return administService.getWaterSupply(xmlStringDatas);
    }

    //상하수도 상세-부과
    @GetMapping(value = "/water-supply/detail/lvy/api")
    public List<WaterSupplyDetailVO> getWaterSupplyDetailLvyAPI(ParamVO param) throws Exception {
        String xmlStringDatas = administUtil.connectUrl(ip, "/water-detail/lvy", param);
        return administService.getWaterSupplyDetail(xmlStringDatas);
    }

    //상하수도 상세-수납
    @GetMapping(value = "/water-supply/detail/pay/api")
    public List<WaterSupplyDetailVO> getWaterSupplyDetailPayAPI(ParamVO param) throws Exception {
        String xmlStringDatas = administUtil.connectUrl(ip, "/water-detail/pay", param);
        return administService.getWaterSupplyDetail(xmlStringDatas);
    }

    //상하수도 상세-체납
    @GetMapping(value = "/water-supply/detail/arr/api")
    public List<WaterSupplyDetailVO> getWaterSupplyDetailArrAPI(ParamVO param) throws Exception {
        String xmlStringDatas = administUtil.connectUrl(ip, "/water-detail/arr", param);
        return administService.getWaterSupplyDetail(xmlStringDatas);
    }




    //환경개선부담금 미납
    @GetMapping(value = "/environment/non-payment/api")
    public List<EnvironmentVO> getEnvironmentNonPaymentAPI(EnvironmentVO param) throws Exception {
        String xmlStringDatas = administUtil.connectUrlEnvironment(ip, "/environment-db/non-pay", param);
        return administService.getEnvironmentNonPayment(xmlStringDatas);
    }

    //환경개선부담금 납부
    @GetMapping(value = "/environment/payment/api")
    public List<EnvironmentVO> getEnvironmentPaymentAPI(EnvironmentVO param) throws Exception {
        String xmlStringDatas = administUtil.connectUrlEnvironment(ip, "/environment-db/pay", param);
        return administService.getEnvironmentPayment(xmlStringDatas);
    }





    //지방세 고객정보
    @GetMapping(value = "/local-tax/api")
    public List<LocalTaxVO> getLocalTaxInfoAPI(ParamVO param) throws Exception {
        String xmlStringDatas = administUtil.connectUrl(ip, "/area-tax", param);
        return administService.getLocalTax(xmlStringDatas);
    }

    //지방세 체납
    @GetMapping(value = "/local-tax/arr/api")
    public List<LocalTaxDetailVO> getLocalTaxArrAPI(ParamVO param) throws Exception {
        String xmlStringDatas = administUtil.connectUrl(ip, "/area-tax/arr", param);
        return administService.getLocalTaxDetail(xmlStringDatas);
    }
    
    //지방세 부과
    @GetMapping(value = "/local-tax/lvy/api")
    public List<LocalTaxDetailVO> getLocalTaxLvyAPI(ParamVO param) throws Exception {
        String xmlStringDatas = administUtil.connectUrl(ip, "/area-tax/lvy", param);
        return administService.getLocalTaxDetail(xmlStringDatas);
    }

    //지방세 수납
    @GetMapping(value = "/local-tax/pay/api")
    public List<LocalTaxDetailPayVO> getLocalTaxPayAPI(ParamVO param) throws Exception {
        String xmlStringDatas = administUtil.connectUrl(ip, "/area-tax/pay", param);
        return administService.getLocalTaxDetailPay(xmlStringDatas);
    }




    //세외수입 고객정보
    @GetMapping(value = "/non-tax/api")
    public List<NonTaxVO> getNonTaxInfoAPI(ParamVO param) throws Exception {
        String xmlStringDatas = administUtil.connectUrl(ip, "/non-tax", param);
        return administService.getNonTax(xmlStringDatas);
    }

    //세외수입 체납
    @GetMapping(value = "/non-tax/arr/api")
    public List<NonTaxDetailVO> getNonTaxArrAPI(ParamVO param) throws Exception {
        String xmlStringDatas = administUtil.connectUrl(ip, "/non-tax/arr", param);
        return administService.getNonTaxDetail(xmlStringDatas);
    }

    //세외수입 부과
    @GetMapping(value = "/non-tax/lvy/api")
    public List<NonTaxDetailVO> getNonTaxLvyAPI(ParamVO param) throws Exception {
        String xmlStringDatas = administUtil.connectUrl(ip, "/non-tax/lvy", param);
        return administService.getNonTaxDetail(xmlStringDatas);
    }

    //세외수입 수납
    @GetMapping(value = "/non-tax/pay/api")
    public List<NonTaxDetailPayVO> getNonTaxPayAPI(ParamVO param) throws Exception {
        String xmlStringDatas = administUtil.connectUrl(ip, "/non-tax/pay", param);
        return administService.getNonTaxDetailPay(xmlStringDatas);
    }


    //교통유발
    @GetMapping(value = "/traffic/api")
    public List<TrafficVO> getTrafficAPI(TrafficCommand param) throws Exception {
        String xmlStringDatas = administUtil.connectUrlTraffic(ip, "/traffic", param);
        return administService.getTraffic(xmlStringDatas);
    }



    /**
     * USP_SMS_INS 문자전송
     */
    @PostMapping("/administ/smsInsert")
    @Secured("ROLE_CONSULT_ADMINIST_EXTEND_01")
    public ResponseEntity<HttpStatus> administSmsInsert(@RequestBody @Valid SmsInsertCommand command){
        administService.administSmsInsert(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
