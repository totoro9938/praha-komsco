package com.cp.praha.base.user.entity;

import com.cp.praha.base.user.service.request.UserUploadCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

import static com.cp.praha.base.user.entity.UserUploadProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SAVE_CNT", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_UPLOAD_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_HP_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_EMAIL", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DUTY", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_POSITION_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USE_YN_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_ENTER_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RETIRE_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DESCRIPTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IP", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                )
        }
)

@Getter @Setter
@ToString @Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserUploadProc {
    public static final String PROC_NAME = "USP_USER_UPLOAD";

    @Id
    private Integer userId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,UserUploadCommand userUploadCommand) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_USER_UUID", userUploadCommand.getUserUuid());
        procedureQuery.setParameter("V_SAVE_CNT", userUploadCommand.getSaveCnt());
        procedureQuery.setParameter("V_UPLOAD_IDX", userUploadCommand.getUploadIdx());
        procedureQuery.setParameter("V_USER_CD", userUploadCommand.getUserCd());
        procedureQuery.setParameter("V_USER_NM", userUploadCommand.getUserNm());
        procedureQuery.setParameter("V_USER_IDX", userUploadCommand.getUserIdx());
        procedureQuery.setParameter("V_TEL_NO", userUploadCommand.getTelNo());
        procedureQuery.setParameter("V_HP_NO", userUploadCommand.getHpNo());
        procedureQuery.setParameter("V_EMAIL", userUploadCommand.getEmail());
        procedureQuery.setParameter("V_DEPT_CD", userUploadCommand.getDeptCd());
        procedureQuery.setParameter("V_DUTY", userUploadCommand.getDuty());
        procedureQuery.setParameter("V_POSITION_NM", userUploadCommand.getPositionNm());
        procedureQuery.setParameter("V_USE_YN_NM", userUploadCommand.getUseYnNm());
        procedureQuery.setParameter("V_ENTER_DT", userUploadCommand.getEnterDt());
        procedureQuery.setParameter("V_RETIRE_DT", userUploadCommand.getRetireDt());
        procedureQuery.setParameter("V_DESCRIPTION", userUploadCommand.getDescription());
        procedureQuery.setParameter("V_RGTR_ID", userUploadCommand.getRgtrId());
        procedureQuery.setParameter("V_IP", userUploadCommand.getIp());
        procedureQuery.execute();

        return procedureQuery;
    }
}
