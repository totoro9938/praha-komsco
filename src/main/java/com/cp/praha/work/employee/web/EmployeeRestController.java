package com.cp.praha.work.employee.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.consult.administrative.service.request.ParamVO;
import com.cp.praha.work.employee.service.EmployeeService;
import com.cp.praha.work.employee.service.request.EmployeeSelPageCommand;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/work/v1")
@Secured("ROLE_WORK_EMPLOYEE_MGR_SELECT")
public class EmployeeRestController {
    private final EmployeeService employeeService;

    @GetMapping("/employee/select/page")
    public GridDomain EmployeeSelectPage(EmployeeSelPageCommand command) {
        return employeeService.employeeSelectPage(command);
    }

    @GetMapping("/employee/sync")
    public Integer EmployeeSync(ParamVO param) throws Exception {
        return employeeService.employeeSync(param);
    }
}
