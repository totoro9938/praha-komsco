package com.cp.praha.common.exception;

import com.cp.praha.common.domain.ApiResponseModel;
import com.fasterxml.jackson.databind.exc.InvalidDefinitionException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.ConversionFailedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolation;
import javax.validation.Payload;
import java.util.List;
import java.util.Set;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Slf4j
@RestControllerAdvice
public class GlobalRestControllerExceptionHandler {


  @ResponseStatus(BAD_REQUEST)
  @ExceptionHandler(ConversionFailedException.class)
  public ApiResponseModel<?> convertFailHandle(ConversionFailedException e) {
    log.debug("convert fail", e);
    return ApiResponseModel.builder().success(false).message("잘못된 요청입니다.").build();
  }

  /**
   * HttpMessageConversionException handler.
   */
  @ResponseStatus(BAD_REQUEST)
  @ExceptionHandler(HttpMessageConversionException.class)
  public ApiResponseModel<?> messageConvertErrorHandle(HttpMessageConversionException e) {

    Throwable cause = e.getCause();
    ApiResponseModel.ApiResponseModelBuilder<?> builder = ApiResponseModel.builder()
        .success(false);

    log.debug("http message convert error stack tracing", cause);

    if (cause instanceof InvalidDefinitionException) {
      if (cause.getCause() != null && cause.getCause().getMessage() != null) {
        return builder.message(cause.getCause().getMessage()).build();
      }
    }

    log.warn("undefined error", e);
    return builder.message("잘못된 요청입니다.").build();
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(BindException.class)
  public ApiResponseModel<?> serverErrorHandler(BindException e) {
    return buildResponse(e);
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ApiResponseModel<?> serverErrorHandler(MethodArgumentNotValidException e) {
    BindingResult bindingResult = e.getBindingResult();
    return buildResponse(bindingResult);
  }

  private ApiResponseModel<?> buildResponse(BindingResult bindingResult) {
    StringBuilder systemLog = new StringBuilder();
    StringBuilder clientMessage = new StringBuilder();
    List<FieldError> errors = bindingResult.getFieldErrors();
    for (int i = 0, size = errors.size(); i < size; i++) {
      ConstraintViolation<?> constraintViolation = errors.get(i).unwrap(ConstraintViolation.class);
      Set<Class<? extends Payload>> payloads =
          constraintViolation.getConstraintDescriptor().getPayload();

      String appendLine = (size - 1) > i ? "\n" : "";

      systemLog.append(constraintViolation.getMessage()).append(appendLine);
    }

    if (clientMessage.length() == 0) {
      clientMessage.append("요청이 유효하지 않습니다.");
    }

    log.error("api validation error, error count = {}, message = {}", bindingResult.getErrorCount(),
        systemLog);

    return ApiResponseModel.builder()
        .message(clientMessage.toString())
        .success(false)
        .build();
  }
}
