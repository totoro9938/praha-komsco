package com.cp.praha.base.failure.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@Controller
@Valid
public class FailureController {

    @GetMapping("/system-failure")
    public String failureManager() { return "base/failure"; }
}
