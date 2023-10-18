package com.cp.praha.main.login.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.StoredProcedureQuery;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;


@Setter
@Getter
public class UserUptSecretCommand {

    @Min(0)
    private int userId;
    @NotEmpty
    private String secretKey;

    private String userCd;
    private String userPwd;
    public void setStoredProcedureParameters(StoredProcedureQuery query) {

        query.setParameter("V_USER_ID", userId);
        query.setParameter("V_SECRET_KEY", secretKey);

    }

}
