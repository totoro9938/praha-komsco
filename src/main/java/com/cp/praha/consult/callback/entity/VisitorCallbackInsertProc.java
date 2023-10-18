package com.cp.praha.consult.callback.entity;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.callback.service.request.VisitorCallbackInsertCommand;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;


@NamedStoredProcedureQuery(
        name = VisitorCallbackInsertProc.PROC_NAME,
        procedureName = VisitorCallbackInsertProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALLBACK_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOUND_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IP", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_VISITOR_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class VisitorCallbackInsertProc {
    public static final  String PROC_NAME = "USP_VISITOR_CALLBACK_INS";
    @Id
    private int callbackId;


    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , UserInfo userInfo, VisitorCallbackInsertCommand command , String ip) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);
        procedureQuery.setParameter("V_CALLBACK_ID", command.getCallbackId());
        procedureQuery.setParameter("V_BOUND_TEL_NO", command.getBoundTelNo());
        procedureQuery.setParameter("V_RGTR_ID",userInfo.getUser().getUserId());
        procedureQuery.setParameter("V_IP",ip);

        return procedureQuery;
    }
}
