package com.cp.praha.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateProperties;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

import static com.cp.praha.config.DatabaseConfig.DATASOURCE_BEAN_ID;

@Configuration
@RequiredArgsConstructor
//@EnableJpaRepositories(
//    entityManagerFactoryRef = "primaryEntityManagerFactory",
//     transactionManagerRef = "primaryTransactionManager",
//    basePackages = "com.cp.madrid"
//)
public class DataSourceConfig {

  private final JpaProperties jpaProperties;
  private final HibernateProperties hibernateProperties;


  //@Primary
  @Bean(DATASOURCE_BEAN_ID)
  @ConfigurationProperties("spring.datasource.hikari")
  DataSource dataSource() {
    return DataSourceBuilder.create().build();
  }

//  @Primary
//  @Bean
//  public LocalContainerEntityManagerFactoryBean primaryEntityManagerFactory (
//      EntityManagerFactoryBuilder builder) {
//    Map<String, Object> properties = hibernateProperties.determineHibernateProperties(
//        jpaProperties.getProperties(), new HibernateSettings());
//
//    return builder
//        .dataSource(dataSource())
//        .packages("com.cp.madrid")
//        .persistenceUnit("primaryEntityManager")
//        .properties(properties)
//        .build();
//  }
//
//  @Bean
//  @Primary
//  public PlatformTransactionManager primaryTransactionManager(@Qualifier(value = "primaryEntityManagerFactory")
//                                                                EntityManagerFactory entityManagerFactory) {
//    var transactionManager = new JpaTransactionManager();
//    transactionManager.setEntityManagerFactory(entityManagerFactory);
//    return transactionManager;
//  }
}
