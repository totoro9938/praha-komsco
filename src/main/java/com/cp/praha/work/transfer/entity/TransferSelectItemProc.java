package com.cp.praha.work.transfer.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.transfer.service.response.TransferSelectItemDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.work.transfer.entity.TransferSelectItemProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = TransferSelectItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TRANSFER_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
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
public class TransferSelectItemProc {
    public static final String PROC_NAME = "USP_TRANSFER_SEL_ITEM";
    @Id
    private int transferId;
    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      String tarnsferUuid,
                                                      int userId){
        var procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);
        procedureQuery.setParameter("V_TRANSFER_UUID", tarnsferUuid);
        procedureQuery.setParameter("V_USER_ID", userId);
        procedureQuery.execute();

        return procedureQuery;
    }
}
