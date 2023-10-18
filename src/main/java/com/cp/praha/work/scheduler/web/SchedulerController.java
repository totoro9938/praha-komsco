package com.cp.praha.work.scheduler.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
public class SchedulerController {

    @RequestMapping("/scheduler")
    public String scheduler() {
        return "work/scheduler";
    }

}
