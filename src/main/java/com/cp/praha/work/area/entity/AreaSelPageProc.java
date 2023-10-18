package com.cp.praha.work.area.entity;


import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.area.service.request.AreaSelectPageCommand;
import com.cp.praha.work.area.service.response.AreaSelectPageDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.work.area.entity.AreaSelPageProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name= PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = AreaSelectPageDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SEARCH_TXT", type = String.class, mode = ParameterMode.IN
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
public class AreaSelPageProc {
    public static final String PROC_NAME = "USP_AREA_SEL";

    @Id
    private int areaId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, AreaSelectPageCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_SEARCH_TXT",command.getSearchTxt());
        return procedureQuery;
    }
}
