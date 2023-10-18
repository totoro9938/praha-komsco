package com.cp.praha.knowledge.manualscript.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualscript.service.response.ManualScriptItemSelectDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.knowledge.manualscript.entity.ManualScriptItemSelectProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = ManualScriptItemSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SCRIPT_ID", type = Integer.class, mode = ParameterMode.IN
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
@Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ManualScriptItemSelectProc {
    public static final String PROC_NAME ="USP_SCRIPT_ITEM_SEL";

    @Id
    private int scriptItemId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,int scriptId){
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_SCRIPT_ID",scriptId);

        return procedureQuery;
    }
}
