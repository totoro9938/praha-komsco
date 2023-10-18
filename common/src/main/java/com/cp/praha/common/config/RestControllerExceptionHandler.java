package com.cp.praha.common.config;

import com.cp.praha.common.domain.ApiErrorResponse;
import com.cp.praha.common.domain.ApiResponseModel;
import com.cp.praha.common.exception.HandleException;
import org.apache.catalina.connector.ClientAbortException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.io.IOException;
import java.util.stream.Collectors;

@RestControllerAdvice(
    basePackages = {"com.cp"}
)
public class RestControllerExceptionHandler {
  private static final Logger log = LoggerFactory.getLogger(RestControllerExceptionHandler.class);

  /**
   * 생성자
   */
  public RestControllerExceptionHandler() {

  }

  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ExceptionHandler({Exception.class})
  public ApiResponseModel<?> serverErrorHandler(Exception e) {
    log.error("[Exception] - {}" ,  e.getMessage());
    e.printStackTrace();
    return ApiResponseModel.builder().message("관리자에게 문의 하세요!").success(false).build();
  }

  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ExceptionHandler({HandleException.class})
  public ApiResponseModel<?> serverErrorHandler(HandleException e) {
    log.error("[HandleException] - {}" , e.getMessage());
    e.printStackTrace();
    return ApiResponseModel.builder().message("관리자에게 문의 하세요.").success(false).build();
  }

  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ExceptionHandler({ClientAbortException.class})
  public void serverErrorHandler(ClientAbortException e) {
    log.error("[ClientAbortException] - {}" ,  e.getMessage());
  }
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ExceptionHandler({IOException.class})
  public ApiResponseModel<?> serverErrorHandler(IOException e) {
    log.error("[IOException] - {}" ,  e.getMessage());

    return ApiResponseModel.builder().message(e.toString()).success(false).build();
  }

  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  @ExceptionHandler({AccessDeniedException.class})
  public ApiResponseModel<?> serverErrorHandler(AccessDeniedException e) {
    log.error("[AccessDeniedException] - {}" , e.getMessage());

    return ApiResponseModel.builder().message(e.toString()).success(false).build();
  }

  @ExceptionHandler({ApiErrorResponse.class})
  public ResponseEntity<?> apiErrorResponseHandler(ApiErrorResponse e) {
    ApiResponseModel<?> responseModel = ApiResponseModel.builder().message(e.getMessage()).success(false).data(e.getData()).build();

    return ResponseEntity.status(e.getStatus()).body(responseModel);
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(ConstraintViolationException.class)
  public ApiResponseModel<?> apiErrorResponseHandler(ConstraintViolationException e) {
    log.error("[ConstraintViolationException] - {}" , e.getMessage());
    String errors = e.getConstraintViolations()
            .stream()
            .map(ConstraintViolation::getMessage)
            .collect(Collectors.joining(", "));
    return ApiResponseModel.builder().message(errors).success(false).build();
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ApiResponseModel<?> apiErrorResponseHandler(MethodArgumentNotValidException e) {
    log.error("[MethodArgumentNotValidException] - {}" , e.getMessage());
    String errors = e.getBindingResult().getAllErrors()
            .stream()
            .map(DefaultMessageSourceResolvable::getDefaultMessage)
            .collect(Collectors.joining(", "));
    return ApiResponseModel.builder().message(errors).success(false).build();
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(BindException.class)
  public ApiResponseModel<?> apiErrorResponseHandler(BindException e) {
    log.error("[MethodArgumentNotValidException] - {}" , e.getMessage());
    String errors = e.getBindingResult().getAllErrors()
            .stream()
            .map(DefaultMessageSourceResolvable::getDefaultMessage)
            .collect(Collectors.joining(", "));
    return ApiResponseModel.builder().message(errors).success(false).build();
  }
}
