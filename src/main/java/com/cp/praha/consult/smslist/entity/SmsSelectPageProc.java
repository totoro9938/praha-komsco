package com.cp.praha.consult.smslist.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.smslist.service.request.SmsSelectPageCommand;
import com.cp.praha.consult.smslist.service.response.SmsSelectPageDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = SmsSelectPageProc.PROC_NAME,
        procedureName = "USP_SMS_SEL_PAGE",
        resultClasses = SmsSelectPageDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CUST_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_START_YMD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_END_YMD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_KIND", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RESULT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SEARCH_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SEARCH_TXT", type = String.class, mode = ParameterMode.IN
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
@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class SmsSelectPageProc {
    public static final String PROC_NAME = "USP_SMS_SEL_PAGE";

    @Id
    private Integer no;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , SmsSelectPageCommand smsSelectPageCommand) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_PARENT_ID", smsSelectPageCommand.getParentId());
        procedureQuery.setParameter("V_DEPT_ID", smsSelectPageCommand.getDeptId());
        procedureQuery.setParameter("V_USER_ID", smsSelectPageCommand.getUserId());
        procedureQuery.setParameter("V_CUST_ID", smsSelectPageCommand.getCustId());
        procedureQuery.setParameter("V_START_YMD", smsSelectPageCommand.getStartDt());
        procedureQuery.setParameter("V_END_YMD", smsSelectPageCommand.getEndDt());
        procedureQuery.setParameter("V_SMS_KIND", smsSelectPageCommand.getSmsKind());
        procedureQuery.setParameter("V_RESULT", smsSelectPageCommand.getResult());
        procedureQuery.setParameter("V_SEARCH_TYPE", smsSelectPageCommand.getSearchType());
        procedureQuery.setParameter("V_SEARCH_TXT", smsSelectPageCommand.getSearchTxt());
        procedureQuery.setParameter("V_SORT_TYPE", smsSelectPageCommand.getSortType());
        procedureQuery.setParameter("V_OUTPUT_YN", smsSelectPageCommand.getOutputYn());
        procedureQuery.setParameter("V_PAGE", smsSelectPageCommand.getPage());
        procedureQuery.setParameter("V_TOTALPAGE", smsSelectPageCommand.getTotalPage());
        procedureQuery.execute();

        return procedureQuery;
    }
}
