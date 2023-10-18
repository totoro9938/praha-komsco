package com.cp.praha.work.shortcut.entity;

import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ShortCutDeleteProc.PROC_NAME,
        procedureName = ShortCutDeleteProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SHORTCUT_ID", type = Integer.class, mode = ParameterMode.IN
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
public class ShortCutDeleteProc {
    public static final String PROC_NAME = "USP_SHORTCUT_DEL";

    @Id
    private Integer shortCutId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                     int shortCutId, int userId) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_SHORTCUT_ID", shortCutId);
        procedureQuery.setParameter("V_MDFR_ID", userId);
        procedureQuery.execute();

        return procedureQuery;
    }
}
