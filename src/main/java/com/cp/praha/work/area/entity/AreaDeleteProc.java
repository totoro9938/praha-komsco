package com.cp.praha.work.area.entity;


import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.area.service.request.AreaDeleteCommand;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.work.area.entity.AreaDeleteProc.PROC_NAME;
@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_AREA_ID", type = Integer.class, mode = ParameterMode.IN
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


@ToString
@Getter
@NoArgsConstructor
@Entity
public class AreaDeleteProc {
    public static final String PROC_NAME = "USP_AREA_DEL";

    @Id
    private int areaId;


    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, AreaDeleteCommand command){
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_AREA_ID",command.getAreaId());
        procedureQuery.setParameter("V_MDFR_ID",command.getMdfrId());
        procedureQuery.execute();

        return procedureQuery;

    }

}
