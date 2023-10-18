package com.cp.praha.work.customer.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.consult.consultmain.service.request.CustomerBlackInsertCommand;
import com.cp.praha.consult.consultmain.service.request.CustomerInsertCommand;
import com.cp.praha.work.customer.service.CustomerManagerService;
import com.cp.praha.work.customer.service.request.*;
import com.cp.praha.work.customer.service.response.CombinedCustomerItemDomain;
import com.cp.praha.work.customer.service.response.CustomerBlackSelectItemDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/work/v1")
@Secured("ROLE_WORK_CUSTOMER_MGR_SELECT")
public class CustomerManagerRestController {

    private final CustomerManagerService customerManagerService;

    /**
     * USP_CUST_INS
     *  고객저장
     */
    @Secured("ROLE_WORK_CUSTOMER_MGR_INSERT")
    @PostMapping("/customer/insert")
    public ResponseEntity<HttpStatus> custIns(@Valid @RequestBody CustomerInsertCommand customerInsertCommand) {
        customerManagerService.custIns(customerInsertCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_CUST_UPT
     *  고객정보 수정
     */
    @Secured("ROLE_WORK_CUSTOMER_MGR_UPDATE")
    @PutMapping("/customer/update")
    public ResponseEntity<HttpStatus> custUpt(@RequestBody @Valid CustomerUpdateCommand customerUpdateCommand) {
        customerManagerService.custUpt(customerUpdateCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_CUST_SEL_ITEM
     *  고객 상세조회
     */
    @GetMapping("/customer-item/{uuid}")
    public CombinedCustomerItemDomain custSelItem(@PathVariable String uuid) {
        return customerManagerService.custSelItem(uuid);
    }

    /**
     * USP_CUST_SEL_PAGE
     *  고객 페이지 조회
     */
    @GetMapping("/customer-page/select")
    public GridDomain custSelPage(CustomerSelectPageCommand custSelectPageCommand) {
        return customerManagerService.custSelPage(custSelectPageCommand);
    }

    /**
     * USP_CUST_ID_UNITED
     *  고객병합
     */
    @Secured("ROLE_WORK_CUSTOMER_MGR_UPDATE")
    @PutMapping("/customer-united")
    public ResponseEntity<HttpStatus> custIdUnited(@RequestBody @Valid CustomerIdUnitedCommand customerIdUnitedCommand) {
        customerManagerService.custIdUnited(customerIdUnitedCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_CUST_ID_RELEASE
     *  고객병합해제
     */
    @Secured("ROLE_WORK_CUSTOMER_MGR_UPDATE")
    @PutMapping("/customer-release")
    public ResponseEntity<HttpStatus> custIdRelease(@RequestBody @Valid CustomerIdReleaseCommand customerIdReleaseCommand) {
        customerManagerService.custIdRelease(customerIdReleaseCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_CUST_BLACK_INS
     *  유의고객 저장
     */
    @Secured("ROLE_WORK_CUSTOMER_MGR_INSERT")
    @PostMapping("/black-customer/insert")
    public ResponseEntity<HttpStatus> custBlackIns(@RequestBody @Valid CustomerBlackInsertCommand customerBlackInsertCommand) {
        customerManagerService.custBlackIns(customerBlackInsertCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_CUST_BLACK_SEL_ITEM
     *  유의고객 단건 조회
     */
    @GetMapping("/black-customer/{custBlackId}")
    public CustomerBlackSelectItemDomain custBlackSelItem(@PathVariable int custBlackId) {
        return customerManagerService.custBlackSelItem(custBlackId);
    }

    /**
     * USP_CUST_BLACK_SEL_PAGE
     *  유의고객 페이지 조회
     */
    @GetMapping("/black-customer/select")
    public GridDomain custBlackSelPage(CustomerBlackSelectPageCommand customerBlackSelectPageCommand) {
        return customerManagerService.custBlackSelPage(customerBlackSelectPageCommand);
    }

    /**
     * USP_CUST_BLACK_UPT
     *  유의고객 상태 수정
     */
    @Secured("ROLE_WORK_CUSTOMER_MGR_UPDATE")
    @PutMapping("/black-customer/update")
    public ResponseEntity<HttpStatus> custBlackUpt(@RequestBody @Valid CustomerBlackUpdateCommand customerBlackUpdateCommand) {
        customerManagerService.custBlackUpt(customerBlackUpdateCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
