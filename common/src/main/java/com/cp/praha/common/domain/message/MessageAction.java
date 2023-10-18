package com.cp.praha.common.domain.message;

import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(
    as = SimpleMessageAction.class
)
public interface MessageAction {
  @JsonValue
  String action();
}
