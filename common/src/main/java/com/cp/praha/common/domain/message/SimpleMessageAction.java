package com.cp.praha.common.domain.message;

public final class SimpleMessageAction implements MessageAction {
  private final String action;

  public SimpleMessageAction(String action) {
    this.action = action;
  }

  public String action() {
    return this.action;
  }
}
