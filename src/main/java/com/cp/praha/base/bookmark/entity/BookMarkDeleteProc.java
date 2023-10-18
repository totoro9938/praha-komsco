package com.cp.praha.base.bookmark.entity;

import com.cp.praha.base.bookmark.service.request.BookMarkDeleteCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import static com.cp.praha.base.bookmark.entity.BookMarkDeleteProc.PROC_NAME;
@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOOKMARK_ID", type = Integer.class, mode = ParameterMode.IN
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
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BookMarkDeleteProc {
    public static final String PROC_NAME = "USP_BOOKMARK_DEL";

    @Id
    private String bookMarkId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, BookMarkDeleteCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_USER_ID",command.getUserId());
        procedureQuery.setParameter("V_BOOKMARK_ID",command.getBookmarkId());
        procedureQuery.setParameter("V_MDFR_ID",command.getMdfrId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
