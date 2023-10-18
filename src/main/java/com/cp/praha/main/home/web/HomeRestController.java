package com.cp.praha.main.home.web;

import com.cp.praha.main.home.entity.ProgramAuthSelUserProc;
import com.cp.praha.main.home.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/home/v1")
@Secured("ROLE_ADMIN")
public class HomeRestController {

    private final HomeService homeService;
    @Secured("ROLE_ADMIN")
    @GetMapping("/program-user")
    public List<ProgramAuthSelUserProc> programUser(){
        return homeService.getProgramAuthSelUser();
    }

}
