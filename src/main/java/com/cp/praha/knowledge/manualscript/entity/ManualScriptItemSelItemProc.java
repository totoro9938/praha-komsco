package com.cp.praha.knowledge.manualscript.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualscript.service.response.ManualScriptItemSelItemDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.knowledge.manualscript.entity.ManualScriptItemSelItemProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = ManualScriptItemSelItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SCRIPT_ITEM_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                ),
        }


)


@Getter
@Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ManualScriptItemSelItemProc {
    public static final String PROC_NAME = "USP_SCRIPT_ITEM_SEL_ITEM";
    @Id
    private String scriptItemUuid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,String scriptItemUuid){
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_SCRIPT_ITEM_UUID",scriptItemUuid);

        return procedureQuery;
    }

}
