package com.cp.praha.main.home.entity;

import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

import static com.cp.praha.main.home.entity.ProgramAuthSelUserProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = ProgramAuthSelUserProc.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                )
        }
)

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class ProgramAuthSelUserProc implements Serializable {
    private static final long serialVersionUID = 1L;
    public static final String PROC_NAME = "USP_PROGRAM_AUTH_SEL_USER";

    private String companyCd;
    @Id
    private Integer programId;
    private String programUuid;
    private Integer parentId;
    private Integer programLvl;
    private Integer programIdx;
    private String programPath;
    private String sortPath;
    private String menuYn;
    private String popupYn;
    private String url;
    private String navigateUrl;
    private String parameter;
    private Integer width;
    private Integer height;
    private String programNm;
    private String roleNm;
    private String fullProgramNm;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, int userId) {

        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_USER_ID", userId);
        procedureQuery.execute();

        return procedureQuery;
    }
}
