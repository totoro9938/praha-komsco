package com.cp.praha.knowledge.manualscript.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualscript.service.request.ManualScriptSelectCommand;
import com.cp.praha.knowledge.manualscript.service.response.ManualScriptSelectDomain;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.knowledge.manualscript.entity.ManualScriptSelectProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name= PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = ManualScriptSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_KOREA_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SCRIPT_NM", type = String.class, mode = ParameterMode.IN
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
@NoArgsConstructor
public class ManualScriptSelectProc {
   public static final String PROC_NAME = "USP_SCRIPT_SEL";


    @Id
    private int scriptId;


    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ManualScriptSelectCommand command){
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_KOREA_YN",command.getKoreaYn());
        procedureQuery.setParameter("V_SCRIPT_NM",command.getScriptNm());
        return procedureQuery;
    }
}
