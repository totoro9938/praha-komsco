package com.cp.praha.work.area.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.area.service.request.AreaInsertCommand;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.work.area.entity.AreaInsertProc.PROC_NAME;
@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_AREA_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SIDO_NAME", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SIDO_HANJA", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SIDO_ENGLISH", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SI_NAME", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SI_HANJA", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SI_ENGLISH", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GUGUN_NAME", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GUGUN_HANJA", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GUGUN_ENGLISH", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DONG_NAME", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DONG_HANJA", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DONG_ENGLISH", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DONG_HJD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DONG_BJD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_AREA_ID", type = Integer.class, mode = ParameterMode.OUT
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
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class AreaInsertProc {
    public static final String PROC_NAME = "USP_AREA_INS";
    @Id
    private String areaUuid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, AreaInsertCommand command, String uuid){
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_AREA_UUID",uuid);
        procedureQuery.setParameter("V_SIDO_NAME",command.getSidoName());
        procedureQuery.setParameter("V_SIDO_HANJA",command.getSidoHanja());
        procedureQuery.setParameter("V_SIDO_ENGLISH",command.getSidoEnglish());
        procedureQuery.setParameter("V_SI_NAME",command.getSiName());
        procedureQuery.setParameter("V_SI_HANJA",command.getSiHanja());
        procedureQuery.setParameter("V_SI_ENGLISH",command.getSiEnglish());
        procedureQuery.setParameter("V_GUGUN_NAME",command.getGugunName());
        procedureQuery.setParameter("V_GUGUN_HANJA",command.getGugunHanja());
        procedureQuery.setParameter("V_GUGUN_ENGLISH",command.getGugunEnglish());
        procedureQuery.setParameter("V_DONG_NAME",command.getDongName());
        procedureQuery.setParameter("V_DONG_HANJA",command.getDongHanja());
        procedureQuery.setParameter("V_DONG_ENGLISH",command.getDongEnglish());
        procedureQuery.setParameter("V_DONG_HJD",command.getDongHjd());
        procedureQuery.setParameter("V_DONG_BJD",command.getDongBjd());
        procedureQuery.setParameter("V_RGTR_ID",command.getRgtrId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
