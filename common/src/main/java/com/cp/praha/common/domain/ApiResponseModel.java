package com.cp.praha.common.domain;

public class ApiResponseModel<E> {
  private boolean success;
  private String message;
  private E data;

  public static <E> ApiResponseModelBuilder<E> builder() {
    return new ApiResponseModelBuilder();
  }

  public boolean isSuccess() {
    return this.success;
  }

  public String getMessage() {
    return this.message;
  }

  public E getData() {
    return this.data;
  }

  public void setSuccess(final boolean success) {
    this.success = success;
  }

  public void setMessage(final String message) {
    this.message = message;
  }

  public void setData(final E data) {
    this.data = data;
  }

  public boolean equals(final Object o) {
    if (o == this) {
      return true;
    } else if (!(o instanceof ApiResponseModel)) {
      return false;
    } else {
      ApiResponseModel<?> other = (ApiResponseModel)o;
      if (!other.canEqual(this)) {
        return false;
      } else if (this.isSuccess() != other.isSuccess()) {
        return false;
      } else {
        Object this$message = this.getMessage();
        Object other$message = other.getMessage();
        if (this$message == null) {
          if (other$message != null) {
            return false;
          }
        } else if (!this$message.equals(other$message)) {
          return false;
        }

        Object this$data = this.getData();
        Object other$data = other.getData();
        if (this$data == null) {
          if (other$data != null) {
            return false;
          }
        } else if (!this$data.equals(other$data)) {
          return false;
        }

        return true;
      }
    }
  }

  protected boolean canEqual(final Object other) {
    return other instanceof ApiResponseModel;
  }

  public int hashCode() {
    int PRIME = 1;
    int result = 1 * 59 + (this.isSuccess() ? 79 : 97);
    Object $message = this.getMessage();
    result = result * 59 + ($message == null ? 43 : $message.hashCode());
    Object $data = this.getData();
    result = result * 59 + ($data == null ? 43 : $data.hashCode());
    return result;
  }

  public String toString() {
    boolean var10000 = this.isSuccess();
    return "ApiResponseModel(success=" + var10000 + ", message=" + this.getMessage() + ", data=" + this.getData() + ")";
  }

  public ApiResponseModel() {
  }

  public ApiResponseModel(final boolean success, final String message, final E data) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  public static class ApiResponseModelBuilder<E> {
    private boolean success;
    private String message;
    private E data;

    ApiResponseModelBuilder() {
    }

    public ApiResponseModelBuilder<E> success(final boolean success) {
      this.success = success;
      return this;
    }

    public ApiResponseModelBuilder<E> message(final String message) {
      this.message = message;
      return this;
    }

    public ApiResponseModelBuilder<E> data(final E data) {
      this.data = data;
      return this;
    }

    public ApiResponseModel<E> build() {
      return new ApiResponseModel(this.success, this.message, this.data);
    }

    public String toString() {
      return "ApiResponseModel.ApiResponseModelBuilder(success=" + this.success + ", message=" + this.message + ", data=" + this.data + ")";
    }
  }
}

