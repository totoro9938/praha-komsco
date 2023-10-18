package com.cp.praha.work.shortcut.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.shortcut.service.response.ShortCutSelectItemDomain;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ShortCutSelectItemProc.PROC_NAME,
        procedureName = ShortCutSelectItemProc.PROC_NAME,
        resultClasses = ShortCutSelectItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SHORTCUT_ID", type = Integer.class, mode = ParameterMode.IN
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
@Setter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ShortCutSelectItemProc {
    public static final String PROC_NAME = "USP_SHORTCUT_SEL_ITEM";

    @Id
    private Integer shortCutId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      int shortCutId) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_SHORTCUT_ID", shortCutId);
        procedureQuery.execute();

        return procedureQuery;
    }
}
