package com.cp.praha.base.config.entity;

import com.cp.praha.base.config.service.request.ConfigSelectCommand;
import com.cp.praha.base.config.service.response.ConfigSelectDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.config.entity.ConfigSelectProc.PROC_NAME;

@NamedStoredProcedureQuery(
    name = PROC_NAME,
    procedureName = PROC_NAME,
    resultClasses = ConfigSelectDomain.class,
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
public class ConfigSelectProc {
    public static final String PROC_NAME = "USP_CONFIG_SEL";

    @Id
    private String configId;
    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ConfigSelectCommand command) {

        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_TREE_YN", command.getTreeYn());
        procedureQuery.setParameter("V_PARENT_ID", command.getParentId());
        procedureQuery.setParameter("V_USE_YN", command.getUseYn());
        procedureQuery.setParameter("V_DEL_YN", command.getDelYn());
        procedureQuery.setParameter("V_OUTPUT_YN", command.getOutputYn());
        procedureQuery.execute();

        return procedureQuery;
    }
}