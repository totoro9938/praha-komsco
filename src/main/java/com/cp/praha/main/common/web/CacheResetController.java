package com.cp.praha.main.common.web;

import com.cp.praha.base.department.service.DepartmentService;
import com.cp.praha.main.common.service.CommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/cache/v1")
public class CacheResetController {

    private final DepartmentService departmentService;
    private final CommonService commonService;

    @GetMapping("/dept/cache/reset")
    public void deptCache(){
        departmentService.deptCacheReset();
        departmentService.userCacheReset();
    }

    @GetMapping("/dept/cache/select")
    public void deptCacheSelect(){
        commonService.getDept(0);
    }
}
