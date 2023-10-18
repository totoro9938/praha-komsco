package com.cp.praha.consult.reservation.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.reservation.service.request.VisitorReserveSelectCommand;
import com.cp.praha.consult.reservation.service.response.VisitorReserveSelectDomain;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = VisitorReserveSelectProc.PROC_NAME,
        procedureName = "USP_VISITOR_RESERVE_SEL",
        resultClasses = VisitorReserveSelectDomain.class,
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
public class VisitorReserveSelectProc {
    public static final String PROC_NAME = "USP_VISITOR_RESERVE_SEL";

    @Id
    private String boundDt;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , VisitorReserveSelectCommand visitorReserveSelectCommand) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_BOUND_ID", visitorReserveSelectCommand.getBoundId());
        procedureQuery.setParameter("V_CALL_ID", visitorReserveSelectCommand.getCallId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
