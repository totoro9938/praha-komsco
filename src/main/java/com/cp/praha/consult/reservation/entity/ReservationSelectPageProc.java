package com.cp.praha.consult.reservation.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.reservation.service.request.ReservationSelectPageCommand;
import com.cp.praha.consult.reservation.service.response.ReservationSelectPageDomain;
import lombok.*;

import javax.persistence.*;




@NamedStoredProcedureQuery(
        name = ReservationSelectPageProc.PROC_NAME,
        procedureName = "USP_RESERVATION_SEL_PAGE",
        resultClasses = ReservationSelectPageDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_START_DATE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_END_DATE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CHARGE_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CHARGE_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CHARGE_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CUST_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RESERVATION_STATUS", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_COMPLETE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SEARCH_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SEARCH_TXT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SORT_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OUTPUT_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PAGE", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TOTALPAGE", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TOTALCOUNT", type = Integer.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "V_CUR_PAGE", type = Integer.class, mode = ParameterMode.OUT
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
public class ReservationSelectPageProc {
    public static final String PROC_NAME = "USP_RESERVATION_SEL_PAGE";

    @Id
    private Integer boundId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , ReservationSelectPageCommand reservationSelectPageCommand) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_START_DATE", reservationSelectPageCommand.getStartDate());
        procedureQuery.setParameter("V_END_DATE", reservationSelectPageCommand.getEndDate());
        procedureQuery.setParameter("V_CHARGE_PARENT_ID", reservationSelectPageCommand.getChargeParentId());
        procedureQuery.setParameter("V_CHARGE_DEPT_ID", reservationSelectPageCommand.getChargeDeptId());
        procedureQuery.setParameter("V_CHARGE_ID", reservationSelectPageCommand.getChargeId());
        procedureQuery.setParameter("V_CUST_ID", reservationSelectPageCommand.getCustId());
        procedureQuery.setParameter("V_RESERVATION_STATUS", reservationSelectPageCommand.getReservationStatus());
        procedureQuery.setParameter("V_COMPLETE_YN", reservationSelectPageCommand.getCompleteYn());
        procedureQuery.setParameter("V_SEARCH_TYPE", reservationSelectPageCommand.getSearchType());
        procedureQuery.setParameter("V_SEARCH_TXT", reservationSelectPageCommand.getSearchTxt());
        procedureQuery.setParameter("V_SORT_TYPE", reservationSelectPageCommand.getSortType());
        procedureQuery.setParameter("V_OUTPUT_YN", reservationSelectPageCommand.getOutputYn());
        procedureQuery.setParameter("V_PAGE", reservationSelectPageCommand.getPage());
        procedureQuery.setParameter("V_TOTALPAGE", reservationSelectPageCommand.getTotalPage());
        procedureQuery.execute();

        return procedureQuery;
    }
}
