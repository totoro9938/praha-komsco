package com.cp.praha.common.log;

import com.cp.praha.common.log.service.LogInsertService;
import com.cp.praha.common.log.service.request.DateRangeCommand;
import com.cp.praha.common.log.service.request.ExcelLogInsertCommand;
import com.cp.praha.common.log.service.request.PrivateLogInsertCommand;
import com.cp.praha.common.util.IpUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/log/v1")
@Validated
public class LogInsertRestController {
    private final LogInsertService logInsertService;

    @PostMapping("/excel/loginsert")
    public ResponseEntity<HttpStatus> excelLogInsert(HttpServletRequest request, @RequestBody ExcelLogInsertCommand command) {
        String ip = IpUtil.getClientIP(request);
        logInsertService.excelLogInsert(ip, command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/private/loginsert")
    public ResponseEntity<HttpStatus> privateLogInsert(HttpServletRequest request, @RequestBody PrivateLogInsertCommand command) {
        String ip = IpUtil.getClientIP(request);
        logInsertService.privateLogInsert(ip, command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/phone/{phone}")
    public ResponseEntity<HttpStatus> phone(@PathVariable String phone) {
        log.info("{}", phone);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/date")
    public ResponseEntity<HttpStatus> phone(@RequestBody @Valid DateRangeCommand command) {
        log.info("{}", command);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
