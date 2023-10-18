package com.cp.praha.common.util;

import javax.persistence.EntityManager;
import javax.persistence.StoredProcedureQuery;

public class ProcedureQuery {

    public  static StoredProcedureQuery get(EntityManager entityManager,String procedureName){
        StoredProcedureQuery procedureQuery = entityManager
                .createNamedStoredProcedureQuery(procedureName);
        procedureQuery.setParameter("V_COMPANY_CD", "CENTERLINK");
        return procedureQuery;
    }
}
