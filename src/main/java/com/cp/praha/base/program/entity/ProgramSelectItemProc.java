package com.cp.praha.base.program.entity;

import com.cp.praha.base.program.service.request.ProgramSelectItemCommand;
import com.cp.praha.base.program.service.response.ProgramSelectItemDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.program.entity.ProgramSelectItemProc.PROC_NAME;


@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = ProgramSelectItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_UUID", type = String.class, mode = ParameterMode.IN
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
public class ProgramSelectItemProc {
    public static final String PROC_NAME = "USP_PROGRAM_SEL_ITEM";

    @Id
    private Integer programId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      ProgramSelectItemCommand programSelItemCommand) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_PROGRAM_UUID", programSelItemCommand.getProgramUuid());
        procedureQuery.setParameter("V_OUTPUT_YN", programSelItemCommand.getOutputYn());
        procedureQuery.execute();

        return procedureQuery;
    }
}
