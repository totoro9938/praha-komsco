package com.cp.praha.consult.reservation.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.reservation.service.request.ReservationListSelectItemCommand;
import com.cp.praha.consult.reservation.service.response.ReservationSelectItemDomain;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ReservationSelectItemProc.PROC_NAME,
        procedureName = "USP_RESERVATION_SEL_ITEM",
        resultClasses = ReservationSelectItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOUND_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALL_ID", type = Integer.class, mode = ParameterMode.IN
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
public class ReservationSelectItemProc {
    public static final String PROC_NAME = "USP_RESERVATION_SEL_ITEM";

    @Id
    private Integer boundId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , ReservationListSelectItemCommand reservationListSelectItemCommand) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_BOUND_ID", reservationListSelectItemCommand.getBoundId());
        procedureQuery.setParameter("V_CALL_ID", reservationListSelectItemCommand.getCallId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
