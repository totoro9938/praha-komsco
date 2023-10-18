package com.cp.praha.common.domain.message;

public abstract class DefaultMessageActions {
  public static final MessageAction create = () -> {
    return "create";
  };
  public static final MessageAction update = () -> {
    return "update";
  };
  public static final MessageAction delete = () -> {
    return "delete";
  };

  public DefaultMessageActions() {
  }
}
