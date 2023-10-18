package com.cp.praha.base.bookmark.entity;

import com.cp.praha.base.bookmark.service.request.BookMarkUpdateCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.bookmark.entity.BookMarkUpdateProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOOKMARK_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOOKMARK_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOOKMARK_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MDFR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_URL", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEL_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                ),
        }
)
@ToString
@Getter
@NoArgsConstructor( access = AccessLevel.PROTECTED)
@Entity
public class BookMarkUpdateProc {
    public static final String PROC_NAME = "USP_BOOKMARK_UPT";

    @Id
    private int bookmarkId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, BookMarkUpdateCommand command) {

        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_BOOKMARK_ID", command.getBookmarkId());
        procedureQuery.setParameter("V_BOOKMARK_IDX", command.getBookmarkIdx());
        procedureQuery.setParameter("V_BOOKMARK_NM", command.getBookmarkNm());
        procedureQuery.setParameter("V_USER_ID", command.getUserId());
        procedureQuery.setParameter("V_MDFR_ID", command.getMdfrId());
        procedureQuery.setParameter("V_URL", command.getUrl());
        procedureQuery.setParameter("V_DEL_YN", command.getDelYn());
        procedureQuery.execute();

        return procedureQuery;
    }
}
