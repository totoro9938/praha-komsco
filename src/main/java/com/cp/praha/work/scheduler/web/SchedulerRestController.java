package com.cp.praha.work.scheduler.web;

import com.cp.praha.work.scheduler.service.SchedulerService;
import com.cp.praha.work.scheduler.web.request.SchedulerCommand;
import com.cp.praha.work.scheduler.web.response.SchedulerDomain;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/work/v1")
@RequiredArgsConstructor
public class SchedulerRestController {

    private final SchedulerService schedulerService;
    @GetMapping("/scheduler/read")
    public List<SchedulerDomain> read(){
        return schedulerService.read();
    }

    @PostMapping("/scheduler/create")
    public SchedulerDomain create(@RequestBody SchedulerCommand command){
        return schedulerService.create(command);
    }

    @PutMapping("/scheduler/update")
    public SchedulerDomain update(@RequestBody SchedulerCommand command){
        return schedulerService.update(command);
    }

    @DeleteMapping("/scheduler/delete")
    public SchedulerCommand delete(@RequestBody SchedulerCommand command){
        schedulerService.delete(command);
        return command;
    }
}
