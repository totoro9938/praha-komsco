package com.cp.praha.consult.consultmain.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.consultmain.service.request.UserDddCommand;
import com.cp.praha.consult.consultmain.service.response.ReservationAgentSelectDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ReservationAgentSelectProc.PROC_NAME,
        procedureName = "USP_USER_DDD",
        resultClasses = ReservationAgentSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CTI_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SORT_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OUTPUT_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                )
        }
)

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class ReservationAgentSelectProc {
    public final static String PROC_NAME = "USP_USER_DDD";
    @Id
    private int id;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , UserDddCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_PARENT_ID", command.getParentId());
        procedureQuery.setParameter("V_DEPT_ID",command.getDeptId());
        procedureQuery.setParameter("V_CTI_YN",command.getCtiYn());
        procedureQuery.setParameter("V_USE_YN", command.getUseYn());
        procedureQuery.setParameter("V_SORT_TYPE", command.getSortType());
        procedureQuery.setParameter("V_OUTPUT_YN", "Y");
        procedureQuery.execute();

        return procedureQuery;
    }
}
