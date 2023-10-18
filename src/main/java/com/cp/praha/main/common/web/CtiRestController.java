package com.cp.praha.main.common.web;

import com.cp.praha.main.common.entity.AlarmSrcId;
import com.cp.praha.main.common.service.CtiService;
import com.cp.praha.main.common.service.WebSocketService;
import com.cp.praha.main.common.service.request.CtiCallbackCommand;
import com.cp.praha.main.common.service.response.CtiReportDomain;
import com.cp.praha.main.common.service.response.CtiWaitDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@RestController
public class CtiRestController {
    private final CtiService ctiService;
    private final WebSocketService webSocketService;

    @GetMapping("consult/v1/callback/callback-save")
    public void CallBackSave(HttpServletResponse res, CtiCallbackCommand command)
            throws IOException {
        try {
            log.debug("callback-save call > {}",command.toString());
            var srcId2 = ctiService.CallBackSave(command);
            var srcId1 = AlarmSrcId.CALLBACK;
            webSocketService.alarmSourceSend(srcId1,String.valueOf(srcId2));
            res.getWriter().write("Y");
        }catch (Exception e){
            res.getWriter().write("N");
        }
    }

    @GetMapping("cti/v1/wait/count")
    public CtiWaitDomain getWait(){
        return ctiService.getWait();
    }

    @GetMapping("cti/v1/report/{ctiId}")
    public CtiReportDomain getReport(@PathVariable String ctiId){
        return ctiService.getReport(ctiId);
    }
}
