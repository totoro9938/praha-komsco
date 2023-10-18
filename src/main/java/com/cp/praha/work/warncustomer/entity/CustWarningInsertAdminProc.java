package com.cp.praha.work.warncustomer.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.warncustomer.service.request.CustWarningInsertAdminCommand;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = CustWarningInsertAdminProc.PROC_NAME,
        procedureName = CustWarningInsertAdminProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOUND_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_WARNING_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_REQUEST_YMD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_REQUEST_REASON", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROCESS_REASON", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_START_YMD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_END_YMD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_CUST_WARNING_ID", type = Integer.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                )
        }
)

@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CustWarningInsertAdminProc {
    public static final String PROC_NAME = "USP_CUST_WARNING_INS_ADMIN";

    @Id
    private Integer custWarningId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      CustWarningInsertAdminCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_BOUND_TEL_NO", command.getBoundTelNo());
        procedureQuery.setParameter("V_WARNING_TYPE", command.getWarningType());
        procedureQuery.setParameter("V_REQUEST_YMD", command.getRequestYmd());
        procedureQuery.setParameter("V_REQUEST_REASON", command.getRequestReason());
        procedureQuery.setParameter("V_PROCESS_REASON", command.getProcessReason());
        procedureQuery.setParameter("V_START_YMD", command.getStartYmd());
        procedureQuery.setParameter("V_END_YMD", command.getEndYmd());
        procedureQuery.setParameter("V_RGTR_ID", command.getRgtrId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
