package com.cp.praha.websocket.message.service.response;

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
