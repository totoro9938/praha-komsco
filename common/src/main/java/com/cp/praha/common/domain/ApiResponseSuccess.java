package com.cp.praha.common.domain;

public class ApiResponseSuccess {
  private static final boolean IS_SUCCESS = true;
  private static final String MESSAGE = "success";

  public static ApiResponseModel success() {
    ApiResponseModel responseResult = new ApiResponseModel();
    responseResult.setSuccess(true);
    responseResult.setMessage("success");
    return responseResult;
  }

  public static <E> ApiResponseModel success(E result) {
    ApiResponseModel<E> responseResult = new ApiResponseModel();
    responseResult.setSuccess(true);
    responseResult.setMessage("success");
    responseResult.setData(result);
    return responseResult;
  }

  public ApiResponseSuccess() {
  }
}
