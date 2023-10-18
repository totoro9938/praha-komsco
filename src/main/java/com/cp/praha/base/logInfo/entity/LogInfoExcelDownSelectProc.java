package com.cp.praha.base.logInfo.entity;

import com.cp.praha.base.logInfo.service.request.LogInfoExcelDownSelectCommand;
import com.cp.praha.base.logInfo.service.response.LogInfoExcelDownSelectDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.logInfo.entity.LogInfoExcelDownSelectProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = LogInfoExcelDownSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_START_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_END_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OUTPUT_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SORT_TYPE", type = String.class, mode = ParameterMode.IN
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
@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class LogInfoExcelDownSelectProc {
    public static final String PROC_NAME = "USP_LOG_EXCEL_DOWN_SEL_PAGE";

    @Id
    private Integer rgtrId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      LogInfoExcelDownSelectCommand logInfoExcelDownSelectCommand) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_START_DT", logInfoExcelDownSelectCommand.getStartDt());
        procedureQuery.setParameter("V_END_DT", logInfoExcelDownSelectCommand.getEndDt());
        procedureQuery.setParameter("V_USER_ID", 0);
        procedureQuery.setParameter("V_USER_CD", "");
        procedureQuery.setParameter("V_OUTPUT_YN", logInfoExcelDownSelectCommand.getOutputYn());
        procedureQuery.setParameter("V_SORT_TYPE", logInfoExcelDownSelectCommand.getSortType());
        procedureQuery.setParameter("V_PAGE", logInfoExcelDownSelectCommand.getPage());
        procedureQuery.setParameter("V_TOTALPAGE",logInfoExcelDownSelectCommand.getTotalPage());
        procedureQuery.execute();

        return procedureQuery;
    }
}
