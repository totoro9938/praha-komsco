package com.cp.praha.work.discomfort.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.discomfort.service.request.DiscomfortSelCommand;
import lombok.*;

import javax.persistence.*;
import java.time.ZonedDateTime;


@NamedStoredProcedureQuery(
        name = DiscomfortSelProc.PROC_NAME,
        procedureName = DiscomfortSelProc.PROC_NAME,
        resultClasses = DiscomfortSelProc.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_START_DATE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_END_DATE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DISCOMFORT_WORK_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROCESS_CAT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROCESS_OFFICE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DISCOMFORT_STATUS", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DISCOMFORT_CUST_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_CENTER_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROCESS_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CUST_ID", type = Integer.class, mode = ParameterMode.IN
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
@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DiscomfortSelProc {
    public static final String PROC_NAME = "USP_DISCOMFORT_SEL_PAGE";

    @Id
    private long no;
    private String companyCd;
    private int discomfortId;
    private String discomfortUuid;
    private int rgtrId;
    private int fileCnt;
    private String discomfortTitle;
    private String discomfortStatusNm;
    private String custNm;
    private String custGenderNm;
    private String custTelNo;
    private String processOfficeNm;
    private String discomfortWorkCodeNm;
    private String processCatNm;
    private String rgtrNm;
    private String distributeImpossibleYn;
    private String fullDeptNm;
    private String processUserNm;
    private String processUserHpNo;
    private String processUserTelNo;
    private String processImpossibleYn;
    private String custAddr;
    private String custAddrDong;
    private ZonedDateTime distributeDt;
    private ZonedDateTime limitDt;
    private ZonedDateTime regDt;


    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, DiscomfortSelCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_START_DATE", command.getStartDate());
        procedureQuery.setParameter("V_END_DATE", command.getEndDate());
        procedureQuery.setParameter("V_DISCOMFORT_WORK_TYPE", command.getDiscomfortWorkType());
        procedureQuery.setParameter("V_PROCESS_CAT", command.getProcessCat());
        procedureQuery.setParameter("V_PROCESS_OFFICE", command.getProcessOffice());
        procedureQuery.setParameter("V_DISCOMFORT_STATUS", command.getDiscomfortStatus());
        procedureQuery.setParameter("V_DISCOMFORT_CUST_TYPE", command.getDiscomfortCustType());
        procedureQuery.setParameter("V_DEPT_CENTER_CD", command.getDeptCenterCd());
        procedureQuery.setParameter("V_RGTR_ID", command.getRgtrId());
        procedureQuery.setParameter("V_PROCESS_USER_ID", command.getProcessUserId());
        procedureQuery.setParameter("V_CUST_ID", command.getCustId());
        procedureQuery.setParameter("V_SEARCH_TYPE", command.getSearchType());
        procedureQuery.setParameter("V_SEARCH_TXT", command.getSearchTxt());
        procedureQuery.setParameter("V_SORT_TYPE", "");
        procedureQuery.setParameter("V_OUTPUT_YN", "Y");
        procedureQuery.setParameter("V_PAGE", command.getPage());
        procedureQuery.setParameter("V_TOTALPAGE", command.getTotalPage());


        procedureQuery.execute();

        return procedureQuery;
    }
}
