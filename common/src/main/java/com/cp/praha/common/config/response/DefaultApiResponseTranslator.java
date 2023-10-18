package com.cp.praha.common.config.response;

import com.cp.praha.common.domain.ApiResponseModel;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public final class DefaultApiResponseTranslator implements ApiResponseTranslator {
  private static final ImmutableResponse<?> DEFAULT_SUCCESS = defaultSuccess();
  private static final ImmutableResponse<?> DEFAULT_FAIL = defaultFail();

  public DefaultApiResponseTranslator() {
  }

  public ImmutableResponse<?> translate(Object returnValue, HttpStatus httpStatus) {
    if (returnValue == null) {
      return httpStatus.is2xxSuccessful() ? DEFAULT_SUCCESS : DEFAULT_FAIL;
    } else {
      ApiResponseModel responseModel;
      if (this.isStandard(returnValue)) {
        responseModel = (ApiResponseModel)returnValue;
      } else {
        responseModel = this.toStandard(returnValue);
      }

      responseModel.setSuccess(httpStatus.is2xxSuccessful());
      return new ImmutableResponse(responseModel);
    }
  }

  private boolean isStandard(Object returnValue) {
    return returnValue instanceof ApiResponseModel;
  }

  private ApiResponseModel<?> toStandard(Object origin) {
    return ApiResponseModel.builder().data(origin).build();
  }

  private static ImmutableResponse<?> defaultFail() {
    return new ImmutableResponse(ApiResponseModel.builder().success(false).message("fail").build());
  }

  private static ImmutableResponse<?> defaultSuccess() {
    return new ImmutableResponse(ApiResponseModel.builder().success(true).message("success").build());
  }
}
