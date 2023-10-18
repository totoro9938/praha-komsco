package com.cp.praha.work.customer.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
@Secured("ROLE_WORK_CUSTOMER_MGR_SELECT")
public class CustomerManagerController {

    @RequestMapping("/customer-manager")
    public String customerManager() {
        return "work/customer";
    }
}
