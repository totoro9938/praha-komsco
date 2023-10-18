package com.cp.praha.base.group.entity;

import com.cp.praha.base.group.service.request.GroupDeleteCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.group.entity.GroupDeleteProc.PROC_NAME;


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
                        name = "V_MDFR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IP", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                )
        }
)

@Getter @Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GroupDeleteProc {
    public static final String PROC_NAME = "USP_GROUP_DEL";

    @Id
    private Integer groupUid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,GroupDeleteCommand groupDeleteCommand, String ip) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);


        procedureQuery.setParameter("V_GROUP_UID", groupDeleteCommand.getGroupUid());
        procedureQuery.setParameter("V_MDFR_ID", groupDeleteCommand.getUserId());
        procedureQuery.setParameter("V_IP", ip);
        procedureQuery.execute();

        return procedureQuery;
    }

}
