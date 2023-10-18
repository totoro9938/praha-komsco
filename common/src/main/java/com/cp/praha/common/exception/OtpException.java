package com.cp.praha.common.exception;

import org.springframework.security.authentication.InternalAuthenticationServiceException;

public class OtpException extends InternalAuthenticationServiceException {
  public OtpException(String message, Throwable cause) {
    super(message, cause);
  }

  public OtpException(String message) {
    super(message);
  }
}
