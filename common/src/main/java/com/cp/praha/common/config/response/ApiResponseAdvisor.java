package com.cp.praha.common.config.response;

import com.cp.praha.common.exception.HandleException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.GenericTypeResolver;
import org.springframework.core.MethodParameter;
import org.springframework.core.ResolvableType;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.ResourceHttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import java.lang.reflect.Type;

@RestControllerAdvice(
    basePackages = {"com.cp.praha"}
)
public class ApiResponseAdvisor implements ResponseBodyAdvice<Object> {
  private static final Logger log = LoggerFactory.getLogger(ApiResponseAdvisor.class);
  private final ObjectMapper om = new ObjectMapper();
  private final ApiResponseTranslator apiResponseTranslator;

  @Autowired
  public ApiResponseAdvisor(ApiResponseTranslator apiResponseTranslator) {
    this.apiResponseTranslator = apiResponseTranslator;
  }

  @InitBinder
  public void initBinder(WebDataBinder binder) {
    binder.initDirectFieldAccess();
  }

  public boolean supports(MethodParameter methodParameter, Class<? extends HttpMessageConverter<?>> aClass) {
    Type
        type = GenericTypeResolver.resolveType(this.getGenericType(methodParameter), methodParameter.getContainingClass());
    if (Void.class.getName().equals(type.getTypeName())) {
      return false;
    } else {
      return !aClass.isAssignableFrom(ByteArrayHttpMessageConverter.class) && !aClass.isAssignableFrom(
          ResourceHttpMessageConverter.class);
    }
  }

  public Object beforeBodyWrite(Object o, MethodParameter methodParameter, MediaType mediaType, Class<? extends HttpMessageConverter<?>> aClass, ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse) {
    ApiResponseTranslator.ImmutableResponse<?>
        responseModel = this.apiResponseTranslator.translate(o, this.getStatus(serverHttpResponse));
    log.trace("[response data] (success = {}) (error_code = {}) (error_message = {})", new Object[]{responseModel.isSuccess(), this.getStatus(serverHttpResponse), responseModel.getMessage()});
    if (aClass.isAssignableFrom(StringHttpMessageConverter.class)) {
      try {
        serverHttpResponse.getHeaders().setContentType(MediaType.APPLICATION_JSON);
        return this.om.writeValueAsString(responseModel);
      } catch (JsonProcessingException var9) {
        throw new HandleException("Cannot JSON stringify response");
      }
    } else {
      return responseModel;
    }
  }

  private HttpStatus getStatus(ServerHttpResponse serverHttpResponse) {
    return HttpStatus.valueOf(((ServletServerHttpResponse)serverHttpResponse).getServletResponse().getStatus());
  }

  private Type getGenericType(MethodParameter returnType) {
    return HttpEntity.class.isAssignableFrom(returnType.getParameterType()) ? ResolvableType.forType(returnType.getGenericParameterType()).getGeneric(new int[0]).getType() : returnType.getGenericParameterType();
  }
}
