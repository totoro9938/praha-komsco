package com.cp.praha.base.group.entity;

import com.cp.praha.base.group.service.request.GroupSelectCommand;
import com.cp.praha.base.group.service.response.GroupSelDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.group.entity.GroupSelectProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = GroupSelDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GROUP_UID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OUTPUT_YN", type = String.class, mode = ParameterMode.IN
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
public class GroupSelectProc {
    public static final String PROC_NAME = "USP_GROUP_SEL";

    @Id
    private String groupUid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, GroupSelectCommand groupSelCommand) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);


        procedureQuery.setParameter("V_GROUP_UID", groupSelCommand.getGroupUid());
        procedureQuery.setParameter("V_OUTPUT_YN", groupSelCommand.getOutputYn());
        procedureQuery.execute();

        return procedureQuery;
    }

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager) {
        var procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_GROUP_UID", 2);
        procedureQuery.setParameter("V_OUTPUT_YN", "Y");
        procedureQuery.execute();

        return procedureQuery;
    }
}
