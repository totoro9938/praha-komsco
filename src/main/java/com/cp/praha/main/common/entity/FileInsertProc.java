package com.cp.praha.main.common.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.main.common.service.request.FileDataCommand;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.main.common.entity.FileInsertProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_FILE_UUID", type = String.class, mode = ParameterMode.IN
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
                        name = "V_FILE_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SAVED_FILE_PATH", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SAVED_FILE_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CONTENT_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CONTENT_LENGTH", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_FILE_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class FileInsertProc {
    public static final String PROC_NAME = "USP_FILE_INS";
    @Id
    private Integer id;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, FileDataCommand command) {

        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_FILE_UUID", command.getFileUuid());
        procedureQuery.setParameter("V_SRC_ID1", command.getSrcId1());
        procedureQuery.setParameter("V_SRC_ID2", command.getSrcId2());
        procedureQuery.setParameter("V_SRC_ID3", command.getSrcId3());
        procedureQuery.setParameter("V_SRC_ID4", command.getSrcId4());
        procedureQuery.setParameter("V_FILE_NM", command.getFileNm());
        procedureQuery.setParameter("V_SAVED_FILE_PATH", command.getSavedFilePath());
        procedureQuery.setParameter("V_SAVED_FILE_NM", command.getSavedFileNm());
        procedureQuery.setParameter("V_CONTENT_TYPE", command.getContentType());
        procedureQuery.setParameter("V_CONTENT_LENGTH", command.getContentLength());
        procedureQuery.setParameter("V_RGTR_ID", command.getCreatorId());

        procedureQuery.execute();

        return procedureQuery;
    }
}
