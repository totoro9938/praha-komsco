package com.cp.praha.common.config;

import com.cp.praha.common.exception.HandleException;
import com.cp.praha.common.security.UserInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice(
    basePackages = {"com.cp"}
)
public class ControllerExceptionHandler {
  private static final Logger log = LoggerFactory.getLogger(ControllerExceptionHandler.class);

  private UserInfo userInfo;

  public ControllerExceptionHandler() {
    userInfo = new UserInfo();
  }

  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  @ExceptionHandler({AccessDeniedException.class})
  public String serverErrorHandler(AccessDeniedException e, Model model, HttpServletRequest request) {
    var user = userInfo.getUser();
    log.error("{} - {} - {} - 접근이 거부되었습니다.",request.getMethod(),request.getRequestURI(),user.getUserCd());

    model.addAttribute("exception","접근이 거부되었습니다.");
    model.addAttribute("userNm",user.getUserNm());
    return "common/denied";
  }

  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ExceptionHandler({HandleException.class})
  public String serverErrorHandler(HandleException e) {
    log.error("[Server Error] - {}", e.getMessage());
    e.printStackTrace();
    return "common/error";
  }


}
