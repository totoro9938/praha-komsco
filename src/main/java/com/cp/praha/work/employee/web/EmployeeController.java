package com.cp.praha.work.employee.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@RequiredArgsConstructor
@Controller
@Secured("ROLE_WORK_EMPLOYEE_MGR_SELECT")
public class EmployeeController {
    @GetMapping("/employee")
    public String employee(){
        return "work/employee";
    }
}
