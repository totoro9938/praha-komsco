package com.cp.praha.knowledge.manualworker.web;

import com.cp.praha.knowledge.manualworker.service.MaunalWorkerService;
import com.cp.praha.knowledge.manualworker.service.request.ManualWorkerDeleteCommand;
import com.cp.praha.knowledge.manualworker.service.request.ManualWorkerInsertCommand;
import com.cp.praha.knowledge.manualworker.service.request.ManualWorkerSelectCommand;
import com.cp.praha.knowledge.manualworker.service.request.ManualWorkerUpdateCommand;
import com.cp.praha.knowledge.manualworker.service.response.ManualWorkerSelectDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/knowledge/v1")
@Secured("ROLE_WORK_MANUAL_WORKER_SELECT")
public class ManualWorkerRestController {

    private final MaunalWorkerService maunalWorkerService;

    @GetMapping("/manual-worker/select")
    @Secured("ROLE_WORK_MANUAL_WORKER_SELECT")
    public List<ManualWorkerSelectDomain> manualWorkerSelect(ManualWorkerSelectCommand manualWorkerSelectCommand) {
        return maunalWorkerService.manualWorkerSelect(manualWorkerSelectCommand);
    }

    @PutMapping("/manual-worker/update")
    public ResponseEntity<HttpStatus> manualWorkerUpdate(@RequestBody @Valid List<ManualWorkerUpdateCommand> manualWorkerUpdateCommand) {
        maunalWorkerService.manualWorkerUpdate(manualWorkerUpdateCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/manual-worker/delete")
    public ResponseEntity<HttpStatus> manualWorkerDelete(@RequestBody @Valid List<ManualWorkerDeleteCommand> manualWorkerDeleteCommand) {
        maunalWorkerService.manualWorkerDelete(manualWorkerDeleteCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/manual-worker/insert")
    public ResponseEntity<HttpStatus> manualWorkerInsert(@RequestBody @Valid List<ManualWorkerInsertCommand> manualWorkerInsertCommand) {
        maunalWorkerService.manualWorkerInsert(manualWorkerInsertCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
