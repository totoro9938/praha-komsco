package com.cp.praha.common.domain;


import org.springframework.http.HttpStatus;

public class ApiErrorResponse extends RuntimeException {

  private final HttpStatus status;
  private  Object data;

  public ApiErrorResponse(HttpStatus status, String message) {
    super(message);
    this.status = status;
  }

  public ApiErrorResponse(HttpStatus status, String message, Object data) {
    this(status, message);
    this.data = data;
  }

  public HttpStatus getStatus() {
    return this.status;
  }

  public Object getData() {
    return this.data;
  }
}
