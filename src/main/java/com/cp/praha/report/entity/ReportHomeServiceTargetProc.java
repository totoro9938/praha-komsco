package com.cp.praha.report.entity;

import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.report.service.request.ReportHomeServiceTargetCommand;
import lombok.*;

import javax.persistence.*;


@NamedStoredProcedureQuery(
        name = ReportHomeServiceTargetProc.PROC_NAME,
        procedureName = ReportHomeServiceTargetProc.PROC_NAME,
        resultClasses = ReportHomeServiceTargetProc.class,
        parameters = {
                @StoredProcedureParameter(name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_START_DATE", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_END_DATE", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_TERM_TYPE", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT),
                @StoredProcedureParameter(name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT)
        }
)
@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportHomeServiceTargetProc {

    public static final String PROC_NAME = "USP_REPORT_HOME_SERVICE_TARGET";

    private String itemNm;
    @Id
    private String no;
    private String sumCnt;
    private String cnt_1;
    private String cnt_2;
    private String cnt_3;
    private String cnt_4;
    private String cnt_5;
    private String cnt_6;
    private String cnt_7;
    private String cnt_8;
    private String cnt_9;
    private String cnt_10;
    private String cnt_11;
    private String cnt_12;
    private String cnt_13;
    private String cnt_14;
    private String cnt_15;
    private String cnt_16;
    private String cnt_17;
    private String cnt_18;
    private String cnt_19;
    private String cnt_20;
    private String cnt_21;
    private String cnt_22;
    private String cnt_23;
    private String cnt_24;
    private String cnt_25;
    private String cnt_26;
    private String cnt_27;
    private String cnt_28;
    private String cnt_29;
    private String cnt_30;
    private String cnt_31;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ReportHomeServiceTargetCommand command) {

        StoredProcedureQuery query = ProcedureQuery.get(entityManager, PROC_NAME);

        query.setParameter("V_START_DATE", command.getStartDate());
        query.setParameter("V_END_DATE", command.getEndDate());
        query.setParameter("V_TERM_TYPE", command.getTermType());
        query.execute();

        ProcErrorHandler.errorHandler(query);

        return query;
    }
}