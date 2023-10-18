package com.cp.praha.work.warncustomer.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@RequiredArgsConstructor
@Controller
@Secured("ROLE_WORK_WARN_CUST_MGR_SELECT")
public class WarnCustomerController {

    @GetMapping("/warn-customer")
    public String warnCustomer(){
        return "work/warn-customer";
    }
}
