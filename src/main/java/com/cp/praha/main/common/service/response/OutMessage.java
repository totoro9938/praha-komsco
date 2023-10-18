package com.cp.praha.main.common.service.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class OutMessage {
	private MessageType type;
	private String message;
}
