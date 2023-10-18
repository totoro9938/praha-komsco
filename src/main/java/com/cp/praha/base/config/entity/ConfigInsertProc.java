package com.cp.praha.base.config.entity;

import com.cp.praha.base.config.service.request.ConfigInsertCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.UUID;

import static com.cp.praha.base.config.entity.ConfigInsertProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                    name = "V_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                    name = "V_CONFIG_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CONFIG_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CONFIG_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CONFIG_KEY", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CONFIG_VALUE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SYS_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEL_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DESCRIPTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                    name = "V_CONFIG_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class ConfigInsertProc {
    public static final String PROC_NAME = "USP_CONFIG_INS";

    @Id
    private Integer id;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ConfigInsertCommand command) {

        var procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_PARENT_ID", command.getParentId());
        procedureQuery.setParameter("V_CONFIG_UUID", UUID.randomUUID().toString());
        procedureQuery.setParameter("V_CONFIG_IDX", 0);
        procedureQuery.setParameter("V_CONFIG_NM", command.getConfigNm());
        procedureQuery.setParameter("V_CONFIG_KEY", command.getConfigKey());
        procedureQuery.setParameter("V_CONFIG_VALUE", command.getConfigValue());
        procedureQuery.setParameter("V_SYS_YN", command.getSysYn());
        procedureQuery.setParameter("V_USE_YN", command.getUseYn());
        procedureQuery.setParameter("V_DEL_YN", command.getDelYn());
        procedureQuery.setParameter("V_DESCRIPTION", command.getDescription());
        procedureQuery.setParameter("V_RGTR_ID", command.getRgtrId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
