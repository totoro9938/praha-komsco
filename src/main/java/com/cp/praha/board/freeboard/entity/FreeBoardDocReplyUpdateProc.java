package com.cp.praha.board.freeboard.entity;

import com.cp.praha.board.freeboard.service.request.FreeBoardDocReplyUpdateCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = FreeBoardDocReplyUpdateProc.PROC_NAME,
        procedureName = FreeBoardDocReplyUpdateProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DOC_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CONTENTS", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_HTML", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IP", type = String.class, mode = ParameterMode.IN
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
public class FreeBoardDocReplyUpdateProc {
    public static final String PROC_NAME = "USP_DOC_REPLY_UPT";

    @Id
    private Integer docUuid;
    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      String ip, FreeBoardDocReplyUpdateCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_DOC_ID", command.getDocId());
        procedureQuery.setParameter("V_CONTENTS", command.getContents());
        procedureQuery.setParameter("V_HTML", command.getContents());
        procedureQuery.setParameter("V_IP", ip);
        procedureQuery.setParameter("V_MDFR_ID", command.getMdfrId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
