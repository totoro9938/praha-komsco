package com.cp.praha.consult.reservation.entity;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.reservation.service.request.VisitorReserveInsertCommand;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = VisitorReserveInsertProc.PROC_NAME,
        procedureName = "USP_VISITOR_RESERVE_INS",
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOUND_ID", type = Long.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALL_ID", type = Long.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOUND_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IP", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_VISITOR_ID", type = Long.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                )
        }
)

@Getter @Setter
@ToString @Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VisitorReserveInsertProc {
    public static final String PROC_NAME = "USP_VISITOR_RESERVE_INS";

    @Id
    private Long callId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , UserInfo userInfo, String ip, VisitorReserveInsertCommand visitorReserveInsertCommand) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_BOUND_ID", visitorReserveInsertCommand.getBoundId());
        procedureQuery.setParameter("V_CALL_ID", visitorReserveInsertCommand.getCallId());
        procedureQuery.setParameter("V_BOUND_TEL_NO", visitorReserveInsertCommand.getBoundTelNo());
        procedureQuery.setParameter("V_RGTR_ID", userInfo.getUser().getUserId());
        procedureQuery.setParameter("V_IP", ip);
        procedureQuery.execute();

        return procedureQuery;
    }
}
