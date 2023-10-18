package com.cp.praha.base.logbatch.entity;

import com.cp.praha.base.logbatch.service.request.LogBatchSelectPageCommand;
import com.cp.praha.base.logbatch.service.response.LogBatchSelectPageDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.logbatch.entity.LogBatchSelectPageProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = LogBatchSelectPageDomain.class,
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
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LogBatchSelectPageProc {
    public static final String PROC_NAME = "USP_LOG_BATCH_DEL_SEL_PAGE";

    @Id
    private Integer no;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, LogBatchSelectPageCommand command) {

        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_START_DT",command.getStartDt());
        procedureQuery.setParameter("V_END_DT",command.getEndDt());
        procedureQuery.setParameter("V_PAGE",command.getPage());
        procedureQuery.setParameter("V_TOTALPAGE",command.getTotalPage());
        procedureQuery.execute();

        return procedureQuery;
    }
}
