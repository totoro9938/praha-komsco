package com.cp.praha.consult.boundlist.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.boundlist.service.response.BoundSelectItemDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = BoundSeletItemProc.PROC_NAME,
        procedureName = "USP_BOUND_SEL_ITEM",
        resultClasses = BoundSelectItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOUND_UUID", type = String.class, mode = ParameterMode.IN
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
public class BoundSeletItemProc {
    public final static String PROC_NAME ="USP_BOUND_SEL_ITEM";
    @Id
    private int boundId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,String boundUuid) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_BOUND_UUID",boundUuid);
        procedureQuery.execute();

        return procedureQuery;
    }
}
