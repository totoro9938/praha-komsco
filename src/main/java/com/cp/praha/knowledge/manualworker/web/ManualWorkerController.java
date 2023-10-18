package com.cp.praha.knowledge.manualworker.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
@Secured("ROLE_WORK_MANUAL_WORKER_SELECT")
public class ManualWorkerController {

    @RequestMapping("/manual-worker")
    public String manualWorker() { return "knowledge/manual-worker"; }
}