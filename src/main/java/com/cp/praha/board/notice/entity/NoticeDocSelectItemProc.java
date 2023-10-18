package com.cp.praha.board.notice.entity;

import com.cp.praha.board.notice.service.request.NoticeDocSelectItemCommand;
import com.cp.praha.board.notice.service.response.NoticeDocSelectItemDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = NoticeDocSelectItemProc.PROC_NAME,
        procedureName = NoticeDocSelectItemProc.PROC_NAME,
        resultClasses = NoticeDocSelectItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DOC_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_LOGIN_USER_ID", type = Integer.class, mode = ParameterMode.IN
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
public class NoticeDocSelectItemProc {
    public static final String PROC_NAME = "USP_DOC_SEL_ITEM";

    @Id
    private Integer docUuid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      NoticeDocSelectItemCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);
        procedureQuery.setParameter("V_DOC_UUID", command.getDocUuid());
        procedureQuery.setParameter("V_LOGIN_USER_ID", command.getLoginUserId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
