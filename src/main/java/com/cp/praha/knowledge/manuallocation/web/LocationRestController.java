package com.cp.praha.knowledge.manuallocation.web;

import com.cp.praha.base.department.service.DepartmentService;
import com.cp.praha.base.department.service.request.DepartmentSelectCommand;
import com.cp.praha.base.department.service.response.DepartmentSelectDomain;
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
@RequestMapping("/knowledge/v1")
@Secured("ROLE_CONSULT_MANUAL_LOCATION_SELECT")
public class LocationRestController {
    private final DepartmentService departmentService;


    @GetMapping("/dept")
    public List<DepartmentSelectDomain> deptSelect(DepartmentSelectCommand command){
        return departmentService.deptSelect(command);
    }
}
