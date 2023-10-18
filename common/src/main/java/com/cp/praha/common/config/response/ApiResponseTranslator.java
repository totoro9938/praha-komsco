package com.cp.praha.common.config.response;

import com.cp.praha.common.domain.ApiResponseModel;
import org.springframework.http.HttpStatus;

public interface ApiResponseTranslator {
  ImmutableResponse<?> translate(Object returnValue, HttpStatus httpStatus);

   class ImmutableResponse<T> extends ApiResponseModel<T> {
    private final ApiResponseModel<T> apiResponseModel;

    public ImmutableResponse(ApiResponseModel<T> apiResponseModel) {
      this.apiResponseModel = apiResponseModel;
    }

    public void setData(T data) {
      throw new UnsupportedOperationException("read only");
    }

    public void setMessage(String message) {
      throw new UnsupportedOperationException("read only");
    }

    public void setSuccess(boolean success) {
      throw new UnsupportedOperationException("read only");
    }

    public T getData() {
      return this.apiResponseModel.getData();
    }

    public String getMessage() {
      return this.apiResponseModel.getMessage();
    }

    public boolean isSuccess() {
      return this.apiResponseModel.isSuccess();
    }
  }
}
