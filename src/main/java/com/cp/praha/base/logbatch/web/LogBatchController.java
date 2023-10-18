package com.cp.praha.base.logbatch.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@Controller
@Valid
public class LogBatchController {
    @GetMapping("/log-batch-del")
    public String logbatchDelete() { return "base/logbatch"; }

}
