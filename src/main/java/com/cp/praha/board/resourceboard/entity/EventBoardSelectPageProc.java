package com.cp.praha.board.resourceboard.entity;

import com.cp.praha.board.notice.service.request.NoticeDocSelectPageCommand;
import com.cp.praha.board.resourceboard.service.response.EventBoardSelectPageDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = EventBoardSelectPageProc.PROC_NAME,
        procedureName = EventBoardSelectPageProc.PROC_NAME,
        resultClasses = EventBoardSelectPageDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SEARCH_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SEARCH_TXT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_START_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_END_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SORT_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OUTPUT_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PAGE", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TOTALPAGE", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TOTALCOUNT", type = Integer.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "V_CUR_PAGE", type = Integer.class, mode = ParameterMode.OUT
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
public class EventBoardSelectPageProc {

    public static final String PROC_NAME = "USP_EVENT_SEL_PAGE";
    @Id
    private int eventUuid;
    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      NoticeDocSelectPageCommand command){
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_SEARCH_TYPE",command.getSearchType());
        procedureQuery.setParameter("V_SEARCH_TXT",command.getSearchTxt());
        procedureQuery.setParameter("V_START_DT",command.getStartDt());
        procedureQuery.setParameter("V_END_DT",command.getEndDt());
        procedureQuery.setParameter("V_DEPT_ID",command.getDeptId());
        procedureQuery.setParameter("V_SORT_TYPE",command.getSortType());
        procedureQuery.setParameter("V_OUTPUT_YN",command.getOutputYn());
        procedureQuery.setParameter("V_PAGE",command.getPage());
        procedureQuery.setParameter("V_TOTALPAGE",command.getTotalPage());
        procedureQuery.execute();
        return  procedureQuery;
    }
}
