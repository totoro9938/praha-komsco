package com.cp.praha.websocket.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

import static com.cp.praha.websocket.config.DatabaseConfig.DATASOURCE_BEAN_ID;


@Configuration
@RequiredArgsConstructor
public class DataSourceConfig {

  @Primary
  @Bean(DATASOURCE_BEAN_ID)
  @ConfigurationProperties("spring.datasource.hikari")
  DataSource dataSource() {
    return DataSourceBuilder.create().build();
  }

}
