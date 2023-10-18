package com.cp.praha.report.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.report.service.request.LogLoginOutSelPageCommand;
import com.cp.praha.report.service.response.LogLoginOutSelPageDomain;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = LogLoginOutSelPageProc.PROC_NAME,
        procedureName = LogLoginOutSelPageProc.PROC_NAME,
        resultClasses = LogLoginOutSelPageDomain.class,
        parameters = {
                @StoredProcedureParameter(name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_START_DT", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_END_DT", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_PAGE", type = Integer.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_TOTALPAGE", type = Integer.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_TOTALCOUNT", type = Integer.class, mode = ParameterMode.OUT),
                @StoredProcedureParameter(name = "V_CUR_PAGE", type = Integer.class, mode = ParameterMode.OUT),
                @StoredProcedureParameter(name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT),
                @StoredProcedureParameter(name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT)
        }
)
@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LogLoginOutSelPageProc {
    public static final String PROC_NAME = "USP_LOG_LOGIN_OUT_SEL_PAGE";

    @Id
    private int no;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, LogLoginOutSelPageCommand command){
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_START_DT", command.getStartDt());
        procedureQuery.setParameter("V_END_DT", command.getEndDt());
        procedureQuery.setParameter("V_USER_ID", command.getUserId());
        procedureQuery.setParameter("V_PAGE", command.getPage());
        procedureQuery.setParameter("V_TOTALPAGE", command.getTotalPage());
        procedureQuery.execute();
        return procedureQuery;
    }
}
