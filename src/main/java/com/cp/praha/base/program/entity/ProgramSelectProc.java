package com.cp.praha.base.program.entity;

import com.cp.praha.base.program.service.request.ProgramSelectCommand;
import com.cp.praha.base.program.service.response.ProgramSelectDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.program.entity.ProgramSelectProc.PROC_NAME;


@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = ProgramSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TREE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEL_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OUTPUT_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SORT_TYPE", type = String.class, mode = ParameterMode.IN
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
public class ProgramSelectProc {
    public static final String PROC_NAME = "USP_PROGRAM_SEL";

    @Id
    private Integer programId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      ProgramSelectCommand programSelCommand) {
        var procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);
        procedureQuery.setParameter("V_TREE_YN", programSelCommand.getTreeYn());
        procedureQuery.setParameter("V_PARENT_ID", programSelCommand.getParentId());
        procedureQuery.setParameter("V_USE_YN", programSelCommand.getUseYn());
        procedureQuery.setParameter("V_DEL_YN", programSelCommand.getDelYn());
        procedureQuery.setParameter("V_OUTPUT_YN", programSelCommand.getOutputYn());
        procedureQuery.setParameter("V_SORT_TYPE", programSelCommand.getSortType());
        procedureQuery.execute();

        return procedureQuery;
    }

}
