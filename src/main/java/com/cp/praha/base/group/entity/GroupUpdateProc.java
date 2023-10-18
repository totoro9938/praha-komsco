package com.cp.praha.base.group.entity;

import com.cp.praha.base.group.service.request.GroupUpdateCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.group.entity.GroupUpdateProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GROUP_UID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GROUP_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GROUP_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DESCRIPTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_ADMIN_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IP", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MDFR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                ),
        }
)

@Getter @Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GroupUpdateProc {
    public static final String PROC_NAME = "USP_GROUP_UPT";

    @Id
    private Integer groupUid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,GroupUpdateCommand groupUptCommand) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_GROUP_UID", groupUptCommand.getGroupUid());
        procedureQuery.setParameter("V_PARENT_ID", groupUptCommand.getParentId());
        procedureQuery.setParameter("V_GROUP_IDX", groupUptCommand.getGroupIdx());
        procedureQuery.setParameter("V_GROUP_NM", groupUptCommand.getGroupNm());
        procedureQuery.setParameter("V_DESCRIPTION", groupUptCommand.getDescription());
        procedureQuery.setParameter("V_ADMIN_YN", groupUptCommand.getAdminYn());
        procedureQuery.setParameter("V_IP", groupUptCommand.getIp());
        procedureQuery.setParameter("V_MDFR_ID", groupUptCommand.getUserId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
