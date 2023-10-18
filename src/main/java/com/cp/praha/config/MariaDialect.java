package com.cp.praha.config;

import org.hibernate.dialect.MariaDB10Dialect;
import org.hibernate.dialect.function.StandardSQLFunction;
import org.hibernate.type.StringType;

public class MariaDialect extends MariaDB10Dialect {
    public MariaDialect() {
        super();
        registerFunction("UFN_DEC_AES",new StandardSQLFunction("UFN_DEC_AES",new StringType()));
    }

}
