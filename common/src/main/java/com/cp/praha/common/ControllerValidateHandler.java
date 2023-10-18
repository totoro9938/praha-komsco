package com.cp.praha.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ControllerValidateHandler {
  private static final Logger log = LoggerFactory.getLogger(ControllerValidateHandler.class);
  private final com.cp.praha.common.ValidateContextContainer validateContextContainer;

  @Before("execution(* *..*Controller.*(..))")
  public void validAllController(JoinPoint joinPoint) throws NoSuchMethodException, IllegalAccessException, InstantiationException {
    this.validateContextContainer.validateRequestDto((MethodSignature)joinPoint.getSignature(), joinPoint.getArgs());
  }

  public ControllerValidateHandler(final com.cp.praha.common.ValidateContextContainer validateContextContainer) {
    this.validateContextContainer = validateContextContainer;
  }
}
