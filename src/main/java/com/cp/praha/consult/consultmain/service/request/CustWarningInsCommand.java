package com.cp.praha.consult.consultmain.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.StoredProcedureQuery;

@Getter
@Setter
public class CustWarningInsCommand {

    private int custId;
    private int unitedCustId;
    private int boundId;
    private int callId;
    private String boundTelNo;
    private String warningType;
    private String requestYmd;
    private String requestReason;
    private int rgtrId;

    public void setStoredProcedureParameters(StoredProcedureQuery query) {

        query.setParameter("V_CUST_ID", custId);
        query.setParameter("V_UNITED_CUST_ID", unitedCustId);
        query.setParameter("V_BOUND_ID", boundId);
        query.setParameter("V_CALL_ID", callId);
        query.setParameter("V_BOUND_TEL_NO", boundTelNo);
        query.setParameter("V_WARNING_TYPE", warningType);
        query.setParameter("V_REQUEST_YMD", requestYmd);
        query.setParameter("V_REQUEST_REASON", requestReason);
        query.setParameter("V_RGTR_ID", rgtrId);

    }
}
