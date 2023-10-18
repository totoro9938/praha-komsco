package com.cp.praha.common.exception;

public class HandleException extends RuntimeException {
  public HandleException() {
  }

  public HandleException(String message) {
    super(message);
  }

  public HandleException(String message, Throwable cause) {
    super(message, cause);
  }

  public HandleException(Throwable cause) {
    super(cause);
  }

  public HandleException(String message, Throwable cause, boolean enableSuppression,
                         boolean writableStackTrace) {
    super(message, cause, enableSuppression, writableStackTrace);
  }
}
