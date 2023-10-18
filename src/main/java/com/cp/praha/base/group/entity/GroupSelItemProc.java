package com.cp.praha.base.group.entity;

import com.cp.praha.base.group.service.response.GroupSelItemDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.group.entity.GroupSelItemProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = GroupSelItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GROUP_UUID", type = String.class, mode = ParameterMode.IN
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
public class GroupSelItemProc {
    public static final String PROC_NAME = "USP_GROUP_SEL_ITEM";

    @Id
    private Integer groupUid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,String uuid) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_GROUP_UUID", uuid);
        procedureQuery.execute();

        return procedureQuery;
    }
}
