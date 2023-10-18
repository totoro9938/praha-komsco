package com.cp.praha.consult.reservation.entity;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.reservation.service.request.ReservationUpdateCommand;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ReservationUpdateProc.PROC_NAME,
        procedureName = "USP_RESERVATION_UPT",
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
                        name = "V_RESERVATION_STATUS", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DESCRIPTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MDFR_ID", type = Integer.class, mode = ParameterMode.IN
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
public class ReservationUpdateProc {
    public static final String PROC_NAME = "USP_RESERVATION_UPT";

    @Id
    private Integer boundId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , UserInfo userInfo, ReservationUpdateCommand reservationUpdateCommand) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_BOUND_ID", reservationUpdateCommand.getBoundId());
        procedureQuery.setParameter("V_CALL_ID", reservationUpdateCommand.getCallId());
        procedureQuery.setParameter("V_RESERVATION_STATUS", reservationUpdateCommand.getReservationStatus());
        procedureQuery.setParameter("V_DESCRIPTION", reservationUpdateCommand.getDescription());
        procedureQuery.setParameter("V_MDFR_ID", userInfo.getUser().getUserId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
