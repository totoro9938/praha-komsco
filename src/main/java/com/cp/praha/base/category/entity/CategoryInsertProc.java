package com.cp.praha.base.category.entity;

import com.cp.praha.base.category.service.request.CategoryInsertCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.UUID;

import static com.cp.praha.base.category.entity.CategoryInsertProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAT_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAT_GROUP_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAT_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAT_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAT_VALUE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAT_VALUE_01", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAT_VALUE_02", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAT_VALUE_03", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAT_VALUE_04", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAT_VALUE_05", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEL_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SYS_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DESCRIPTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RE_IDX_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAT_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class CategoryInsertProc {
    public static final String PROC_NAME = "USP_CAT_INS";

    @Id
    private String id;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,CategoryInsertCommand command) {

        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_CAT_UUID", UUID.randomUUID().toString());
        procedureQuery.setParameter("V_CAT_GROUP_CD",command.getCatGroupCd());
        procedureQuery.setParameter("V_PARENT_ID",command.getParentId());
        procedureQuery.setParameter("V_CAT_IDX",command.getCatIdx());
        procedureQuery.setParameter("V_CAT_NM",command.getCatNm());
        procedureQuery.setParameter("V_CAT_VALUE",command.getCatValue());
        procedureQuery.setParameter("V_CAT_VALUE_01",command.getCatValue_01());
        procedureQuery.setParameter("V_CAT_VALUE_02",command.getCatValue_02());
        procedureQuery.setParameter("V_CAT_VALUE_03",command.getCatValue_03());
        procedureQuery.setParameter("V_CAT_VALUE_04",command.getCatValue_04());
        procedureQuery.setParameter("V_CAT_VALUE_05",command.getCatValue_05());
        procedureQuery.setParameter("V_USE_YN",command.getUseYn());
        procedureQuery.setParameter("V_DEL_YN",command.getDelYn());
        procedureQuery.setParameter("V_SYS_YN",command.getSysYn());
        procedureQuery.setParameter("V_DESCRIPTION",command.getDescription());
        procedureQuery.setParameter("V_RE_IDX_YN",command.getReIdxYn());
        procedureQuery.setParameter("V_RGTR_ID",command.getRgtrId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
