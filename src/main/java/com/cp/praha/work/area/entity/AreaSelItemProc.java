package com.cp.praha.work.area.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.area.service.response.AreaSelectItemDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.work.area.entity.AreaSelItemProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = AreaSelectItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_AREA_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                )

        }
)

@Getter
@Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AreaSelItemProc {
    public static final String PROC_NAME ="USP_AREA_SEL_ITEM";

    @Id
    private String areaUuid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,String uuid){
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_AREA_UUID",uuid);

        return procedureQuery;
    }
}
