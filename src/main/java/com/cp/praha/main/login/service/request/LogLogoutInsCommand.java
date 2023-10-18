package com.cp.praha.main.login.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.StoredProcedureQuery;

@Setter
@Getter
public class LogLogoutInsCommand {

    private int userId;
    private String ip;

    public void setStoredProcedureParameters(StoredProcedureQuery query) {

        query.setParameter("V_USER_ID", userId);
        query.setParameter("V_IP", ip);

    }

}
