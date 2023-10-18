package com.cp.praha.main.common.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.main.common.service.request.FileSelectCommand;
import com.cp.praha.main.common.service.response.FileSelectDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.main.common.entity.FileSelectProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = FileSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SRC_ID1", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SRC_ID2", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SRC_ID3", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SRC_ID4", type = String.class, mode = ParameterMode.IN
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
public class FileSelectProc {
    public static final String PROC_NAME = "USP_FILE_SEL";

    @Id
    private Integer id;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, FileSelectCommand command) {

        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_SRC_ID1", command.getSrcId1());
        procedureQuery.setParameter("V_SRC_ID2", command.getSrcId2());
        procedureQuery.setParameter("V_SRC_ID3", command.getSrcId3());
        procedureQuery.setParameter("V_SRC_ID4", command.getSrcId4());

        procedureQuery.execute();

        return procedureQuery;
    }
}
