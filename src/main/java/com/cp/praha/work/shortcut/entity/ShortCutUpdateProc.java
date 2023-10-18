package com.cp.praha.work.shortcut.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.shortcut.service.request.ShortCutInsertCommand;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ShortCutUpdateProc.PROC_NAME,
        procedureName = ShortCutUpdateProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SHORTCUT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SHORTCUT_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SHORTCUT_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SHORTCUT_CAT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DESCRIPTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MDFR_ID", type = Integer.class, mode = ParameterMode.IN
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
public class ShortCutUpdateProc {
    public static final String PROC_NAME = "USP_SHORTCUT_UPT";

    @Id
    private Integer shortCutId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      ShortCutInsertCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_SHORTCUT_ID", command.getShortcutId());
        procedureQuery.setParameter("V_SHORTCUT_IDX", command.getShortcutIdx());
        procedureQuery.setParameter("V_SHORTCUT_NM", command.getShortcutNm());
        procedureQuery.setParameter("V_SHORTCUT_CAT_ID", command.getShortcutCatId());
        procedureQuery.setParameter("V_DESCRIPTION", command.getDescription());
        procedureQuery.setParameter("V_USE_YN", command.getUseYn());
        procedureQuery.setParameter("V_MDFR_ID", command.getMdfrId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
