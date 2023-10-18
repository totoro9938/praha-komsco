package com.cp.praha.common.config.response;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@ComponentScan
@Configuration
public class ApiResponseTranslatorAutoConfiguration {
  public ApiResponseTranslatorAutoConfiguration() {
  }

  @Bean
  @ConditionalOnMissingBean({ApiResponseTranslator.class})
  DefaultApiResponseTranslator defaultApiResponseTranslator() {
    return new DefaultApiResponseTranslator();
  }
}
