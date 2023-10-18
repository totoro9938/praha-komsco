package com.cp.praha.work.discomfort.entity;


import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = DiscomfortCenterUserSelProc.PROC_NAME,
        procedureName = DiscomfortCenterUserSelProc.PROC_NAME,
        resultClasses = DiscomfortCenterUserSelProc.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_CENTER_CD", type = String.class, mode = ParameterMode.IN
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
@Setter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DiscomfortCenterUserSelProc {
    public static final String PROC_NAME = "USP_DISCOMFORT_CENTER_USER_SEL";


    private String companyCd;
    @Id
    private int userId;
    private String userCd;
    private String userNm;
    private String deptCenterCd;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, String deptCenterCd) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_DEPT_CENTER_CD", deptCenterCd);


        procedureQuery.execute();

        return procedureQuery;
    }
}
