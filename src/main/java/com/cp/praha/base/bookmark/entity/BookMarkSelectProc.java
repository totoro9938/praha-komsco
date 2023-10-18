package com.cp.praha.base.bookmark.entity;

import com.cp.praha.base.bookmark.service.request.BookMarkSelectCommand;
import com.cp.praha.base.bookmark.service.response.BookMarkSelectDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.bookmark.entity.BookMarkSelectProc.PROC_NAME;
@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = BookMarkSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
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
public class BookMarkSelectProc {
    public static final String PROC_NAME = "USP_BOOKMARK_SEL";

    @Id
    private int userId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,BookMarkSelectCommand command) {

        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_USER_ID",command.getUserId());

        procedureQuery.execute();

        return procedureQuery;
    }
}
