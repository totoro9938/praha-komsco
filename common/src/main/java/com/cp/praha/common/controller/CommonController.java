package com.cp.praha.common.controller;

import com.cp.praha.common.domain.ApiResponseModel;
import com.cp.praha.common.exception.HandleException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(
    value = {"/"},
    produces = {"application/json"}
)
public class CommonController {
  public CommonController() {
  }

  @RequestMapping(
      value = {"/ping"},
      method = {RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST, RequestMethod.DELETE}
  )
  public String ping() {
    return "pong";
  }

  @RequestMapping(
      value = {"/v/ping"},
      method = {RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST, RequestMethod.DELETE}
  )
  public String vPing() {
    return "pong";
  }

  @RequestMapping(
      value = {"/handleError"},
      method = {RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST, RequestMethod.DELETE}
  )
  public ApiResponseModel handleError() throws HandleException {
    throw new HandleException("HANDLE ERROR");
  }

  @RequestMapping(
      value = {"/unHandleError"},
      method = {RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST, RequestMethod.DELETE}
  )
  public ApiResponseModel unHandleError() throws Exception {
    throw new Exception("UN_HANDLE ERROR");
  }
}
