package com.cp.praha.base.group.entity;

import com.cp.praha.base.group.service.response.GroupSelAllDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.group.entity.GroupSelectAllProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = GroupSelAllDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                )
        }
)

@Getter @Entity @ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GroupSelectAllProc {
    public static final String PROC_NAME = "USP_GROUP_SEL_ALL";

    @Id
    private String groupUid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);


        procedureQuery.execute();

        return procedureQuery;
    }

}
