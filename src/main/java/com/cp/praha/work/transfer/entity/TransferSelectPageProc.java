package com.cp.praha.work.transfer.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.transfer.service.request.TransferSelectPageCommand;
import com.cp.praha.work.transfer.service.response.TransferSelectPageDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.work.transfer.entity.TransferSelectPageProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = TransferSelectPageDomain.class,
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
                        name = "V_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CHARGE_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CHARGE_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CHARGE_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TRANSFER_STATUS", type = String.class, mode = ParameterMode.IN
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
public class TransferSelectPageProc {
    public static final String PROC_NAME = "USP_TRANSFER_SEL_PAGE";
    @Id
    private int transferId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      TransferSelectPageCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_START_DATE", command.getStartDate());
        procedureQuery.setParameter("V_END_DATE", command.getEndDate());
        procedureQuery.setParameter("V_PARENT_ID", command.getParentId());
        procedureQuery.setParameter("V_DEPT_ID", command.getDeptId());
        procedureQuery.setParameter("V_CHARGE_PARENT_ID", command.getChargeParentId());
        procedureQuery.setParameter("V_CHARGE_DEPT_ID", command.getChargeDeptId());
        procedureQuery.setParameter("V_RGTR_ID", command.getRgtrId());
        procedureQuery.setParameter("V_CHARGE_ID", command.getChargeId());
        procedureQuery.setParameter("V_TRANSFER_STATUS", command.getTransferStatus());
        procedureQuery.setParameter("V_SEARCH_TYPE", command.getSearchType());
        procedureQuery.setParameter("V_SEARCH_TXT", command.getSearchTxt());
        procedureQuery.setParameter("V_SORT_TYPE", command.getSortType());
        procedureQuery.setParameter("V_OUTPUT_YN", "Y");
        procedureQuery.setParameter("V_PAGE", command.getPage());
        procedureQuery.setParameter("V_TOTALPAGE", command.getTotalpage());
        procedureQuery.execute();

        return procedureQuery;
    }
}
