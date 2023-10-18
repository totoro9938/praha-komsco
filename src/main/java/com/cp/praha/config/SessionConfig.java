package com.cp.praha.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;

/*@Configuration
@EnableRedisRepositories*/
@RequiredArgsConstructor
public class SessionConfig extends AbstractHttpSessionApplicationInitializer {

  @Value("${spring.redis.host}")
  private String redisHost;
  @Value("${spring.redis.port}")
  private Integer redisPort;
  @Value("${spring.redis.password}")
  private String redisPassword;

  private final ObjectMapper objectMapper;

//    @Bean
//    public RedisConnectionFactory lettuceConnectionFactory() {
//        var standaloneConfiguration = new RedisStandaloneConfiguration(redisHost, redisPort);
//        standaloneConfiguration.setPassword(redisPassword.isEmpty() ? RedisPassword.none() : RedisPassword.of(redisPassword));
//        return new LettuceConnectionFactory(standaloneConfiguration);
//    }
//
//    @Bean
//    public RedisTemplate<String, Object> redisTemplate() {
//        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
//        //redisTemplate.setConnectionFactory(lettuceConnectionFactory());
//        redisTemplate.setKeySerializer(new StringRedisSerializer());
//        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer(objectMapper));
//        return redisTemplate;
//    }
}
