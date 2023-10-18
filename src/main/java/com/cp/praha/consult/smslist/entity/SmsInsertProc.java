package com.cp.praha.consult.smslist.entity;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.smslist.service.request.SmsInsertCommand;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.UUID;

import static com.cp.praha.consult.smslist.entity.SmsInsertProc.PROC_NAME;


@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_GROUP_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CUST_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CUST_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SRC_ID01", type = String.class, mode = ParameterMode.IN //HAPPYCALL, RESEND
                ),
                @StoredProcedureParameter(
                        name = "V_SRC_ID02", type = String.class, mode = ParameterMode.IN //캠페인id, smsGroupId
                ),
                @StoredProcedureParameter(
                        name = "V_SRC_ID03", type = String.class, mode = ParameterMode.IN //캠페인 고객 아이디, smsId
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_TEMPLATE_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RESERVATION_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TO_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_FROM_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MESSAGE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IMAGE_PATH_01", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IMAGE_PATH_02", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IMAGE_PATH_03", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_KIND", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RESULT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RESULT_MESSAGE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_ID_OUT", type = Integer.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_GROUP_ID_OUT", type = Integer.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_DUP_CNT", type = Integer.class, mode = ParameterMode.OUT
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
public class SmsInsertProc {
    public static final String PROC_NAME = "USP_SMS_INS";

    @Id
    private Integer rgtrId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, UserInfo userInfo, SmsInsertCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);
        procedureQuery.setParameter("V_SMS_GROUP_ID", command.getSmsGroupId());
        procedureQuery.setParameter("V_SMS_UUID", command.getSmsUuid() == null ? UUID.randomUUID().toString() : command.getSmsUuid());
        procedureQuery.setParameter("V_SMS_ID", command.getSmsId());
        procedureQuery.setParameter("V_CUST_ID", command.getCustId());
        procedureQuery.setParameter("V_CUST_NM", command.getCustNm());
        procedureQuery.setParameter("V_SRC_ID01", command.getSrcId01());
        procedureQuery.setParameter("V_SRC_ID02", command.getSrcId02());
        procedureQuery.setParameter("V_SRC_ID03", command.getSrcId03());
        procedureQuery.setParameter("V_SMS_TEMPLATE_ID", command.getSmsTemplateId());
        procedureQuery.setParameter("V_SMS_TYPE", command.getSmsType());
        procedureQuery.setParameter("V_RESERVATION_DT", command.getReservationDt());
        procedureQuery.setParameter("V_TO_TEL_NO", command.getToTelNo());
        procedureQuery.setParameter("V_FROM_TEL_NO", command.getFromTelNo());
        procedureQuery.setParameter("V_MESSAGE", command.getMessage());
        procedureQuery.setParameter("V_IMAGE_PATH_01", command.getImagePath_01());
        procedureQuery.setParameter("V_IMAGE_PATH_02", command.getImagePath_02());
        procedureQuery.setParameter("V_IMAGE_PATH_03", command.getImagePath_03());
        procedureQuery.setParameter("V_SMS_KIND", command.getSmsKind());
        procedureQuery.setParameter("V_RESULT", command.getResult());
        procedureQuery.setParameter("V_RESULT_MESSAGE", command.getResultMessage());
        procedureQuery.setParameter("V_RGTR_ID", userInfo.getUser().getUserId());
        procedureQuery.execute();

        return procedureQuery;
    }
}

