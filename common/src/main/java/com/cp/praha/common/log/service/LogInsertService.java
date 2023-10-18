package com.cp.praha.common.log.service;

import com.cp.praha.common.log.entity.ExcelLogInsertProc;
import com.cp.praha.common.log.entity.PrivateLogInsertProc;
import com.cp.praha.common.log.service.request.ExcelLogInsertCommand;
import com.cp.praha.common.log.service.request.PrivateLogInsertCommand;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.ProcErrorHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.StoredProcedureQuery;

@Service
@Slf4j
@RequiredArgsConstructor
public class LogInsertService {
    private final EntityManager entityManager;

    @Value("${company.name}")
    private String companyName;
    private final UserInfo userInfo;

    @Transactional
    public void excelLogInsert(String ip, ExcelLogInsertCommand command) {
        var procedure = this.excelLogInsertProcedure(command, ip);
        ProcErrorHandler.errorHandler(procedure);
    }

    private StoredProcedureQuery excelLogInsertProcedure(ExcelLogInsertCommand command,String ip) {
        javax.persistence.StoredProcedureQuery procedureQuery = entityManager
                .createNamedStoredProcedureQuery(ExcelLogInsertProc.PROC_NAME);

        procedureQuery.setParameter("V_COMPANY_CD", companyName);
        procedureQuery.setParameter("V_USER_ID", userInfo.getUser().getUserId());
        procedureQuery.setParameter("V_PROGRAM_ID", command.getProgramId());
        procedureQuery.setParameter("V_IP", ip);
        procedureQuery.setParameter("V_DATA_CNT", command.getDataCnt());
        procedureQuery.setParameter("V_REASON", command.getReason());
        procedureQuery.setParameter("V_DESCRIPTION", command.getDescription());
        procedureQuery.execute();

        return procedureQuery;
    }

    @Transactional
    public void privateLogInsert(String ip, PrivateLogInsertCommand command) {
        var procedure = this.privateLogInsertProcedure(command, ip);
        ProcErrorHandler.errorHandler(procedure);
    }

    private StoredProcedureQuery privateLogInsertProcedure(PrivateLogInsertCommand command,String ip) {
        javax.persistence.StoredProcedureQuery procedureQuery = entityManager
                .createNamedStoredProcedureQuery(PrivateLogInsertProc.PROC_NAME);

        procedureQuery.setParameter("V_COMPANY_CD", companyName);
        procedureQuery.setParameter("V_USER_ID", userInfo.getUser().getUserId());
        procedureQuery.setParameter("V_DATAGB", command.getDataGb());
        procedureQuery.setParameter("V_IP", ip);
        procedureQuery.setParameter("V_DESCRIPTION", command.getDescription());
        procedureQuery.execute();

        return procedureQuery;
    }

}
