package com.cp.praha.common.util;

import com.cp.praha.common.domain.ApiErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.procedure.ProcedureCall;
import org.springframework.http.HttpStatus;

import javax.persistence.StoredProcedureQuery;

@Slf4j
public class ProcErrorHandler {
    private ProcErrorHandler() {
        throw new IllegalStateException("Utility class");
    }

    public static void errorHandler(StoredProcedureQuery procedureQuery){
        var result = (String) procedureQuery.getOutputParameterValue("O_ERR_CD");
        var errMsg = (String) procedureQuery.getOutputParameterValue("O_ERR_MSG");

        if (!result.equals("0")) {
            if (procedureQuery instanceof ProcedureCall) {
                String procedureName = ((ProcedureCall) procedureQuery).getProcedureName();
                log.error("proc name - {}",procedureName);

               procedureQuery.getParameters().forEach(o->{
                   try {
                       log.error("{} : {}", o.getName(), procedureQuery.getParameterValue(o));
                   }catch (Exception ie){
                       log.debug("{} - {}",o.getName(),ie.getLocalizedMessage());
                   }
                });
            }

            log.debug("result - {}", result);
            log.debug("errMsg - {}", errMsg);
            throw new ApiErrorResponse(HttpStatus.BAD_REQUEST,errMsg);
        }
    }
}
