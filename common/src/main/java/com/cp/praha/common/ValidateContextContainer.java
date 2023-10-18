package com.cp.praha.common;

import com.cp.praha.common.config.annotation.Validate;
import com.cp.praha.common.domain.ApiErrorResponse;
import com.cp.praha.common.exception.HandleException;
import org.apache.logging.log4j.util.Strings;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

@Component
public class ValidateContextContainer {
  public ValidateContextContainer() {
  }

  void validateRequestDto(MethodSignature methodSignature, Object[] args) throws IllegalAccessException, InstantiationException {
    Method methodInfo = methodSignature.getMethod();
    if (this.checkAnnotation(methodInfo)) {
      Class<?> targetClass = this.getTargetClass(args[0], methodInfo);
      Class appliedValidate = ((Validate)methodInfo.getAnnotation(Validate.class)).value();

      try {
        Method methods = this.getMethod(targetClass, appliedValidate, ((Validate)methodInfo.getAnnotation(Validate.class)).targetMethodName());
        methods.invoke(appliedValidate.getDeclaredConstructor().newInstance(), args[0]);
      } catch (InvocationTargetException var7) {
        throw new ApiErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, var7.getCause().getMessage());
      } catch (NoSuchMethodException var8) {
        throw new HandleException(var8.getMessage());
      }
    }

  }

  private boolean checkAnnotation(Method methodInfo) {
    return methodInfo.isAnnotationPresent(Validate.class);
  }

  private Class<?> getTargetClass(Object arg, Method methodInfo) {
    Class<?> targetClass = ((Validate)methodInfo.getAnnotation(Validate.class)).targetClass();
    if (!targetClass.isInstance(arg)) {
      throw new HandleException("type이 일치하지 않습니다.");
    } else {
      return targetClass;
    }
  }

  private Method getMethod(Class<?> targetClass, Class<?> appliedValidate, String targetMethodName) throws NoSuchMethodException {
    return Strings.isNotBlank(targetMethodName) ? appliedValidate.getMethod(targetMethodName, targetClass) : appliedValidate.getMethod("defaultValidate", targetClass);
  }
}
