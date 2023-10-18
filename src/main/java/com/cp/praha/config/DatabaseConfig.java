package com.cp.praha.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

public class DatabaseConfig {

    public static final String DATASOURCE_BEAN_ID = "dataSource";

    @Bean
    public JdbcTemplate jdbcTemplate(@Qualifier(DATASOURCE_BEAN_ID) DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

}
