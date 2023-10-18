package com.cp.praha.board.resourceboard.entity;

import com.cp.praha.board.resourceboard.service.request.EventBoardInsertCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = EventBoardInsertProc.PROC_NAME,
        procedureName = EventBoardInsertProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_EVENT_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_EVENT_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CONTENTS", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CONTACT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_URL", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_HTML", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_START_YMD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_END_YMD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IP", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_EVENT_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class EventBoardInsertProc {

    public static final String PROC_NAME = "USP_EVENT_INS";

    @Id
    private int docUuid;

    public static StoredProcedureQuery procedureQuery (EntityManager entityManager,
                                                       String ip, EventBoardInsertCommand command){
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_EVENT_UUID",command.getEventUuid());
        procedureQuery.setParameter("V_DEPT_ID",command.getDeptId());
        procedureQuery.setParameter("V_EVENT_NM",command.getEventNm());
        procedureQuery.setParameter("V_CONTENTS",command.getContents());
        procedureQuery.setParameter("V_CONTACT",command.getContact());
        procedureQuery.setParameter("V_URL",command.getUrl());
        procedureQuery.setParameter("V_HTML",command.getHtml());
        procedureQuery.setParameter("V_START_YMD",command.getStartYmd());
        procedureQuery.setParameter("V_END_YMD",command.getEndYmd());
        procedureQuery.setParameter("V_IP",ip);
        procedureQuery.setParameter("V_RGTR_ID",command.getRgtrId());
        procedureQuery.execute();
        return procedureQuery;
    }
}
