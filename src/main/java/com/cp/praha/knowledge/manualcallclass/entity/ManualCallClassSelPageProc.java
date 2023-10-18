package com.cp.praha.knowledge.manualcallclass.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualcallclass.service.request.ManualCallClassSelPageCommand;
import com.cp.praha.knowledge.manualcallclass.service.response.ManualCallClassSelPageDomain;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.knowledge.manualcallclass.entity.ManualCallClassSelPageProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = ManualCallClassSelPageDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SEARCH_TXT", type = String.class, mode = ParameterMode.IN
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
@Entity
@ToString
@NoArgsConstructor
public class ManualCallClassSelPageProc {
    public static final String PROC_NAME ="USP_CALL_CLASS_SEL_PAGE";
    @Id
    private int catId;


    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ManualCallClassSelPageCommand command){
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_SEARCH_TXT",command.getSearchTxt());
        procedureQuery.setParameter("V_PAGE",command.getPage());
        procedureQuery.setParameter("V_TOTALPAGE",command.getTotalPage());

        return procedureQuery;
    }
}
