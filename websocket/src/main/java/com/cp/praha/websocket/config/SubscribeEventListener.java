package com.cp.praha.websocket.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.ArrayList;
import java.util.List;


@Slf4j
@Component
@RequiredArgsConstructor
public class SubscribeEventListener implements ApplicationListener<SessionDisconnectEvent> {

	private final SocketSessionRegistry s;

	public void onApplicationEvent(SessionDisconnectEvent event) {

		StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
		// login get from browser

		String sessionId = sha.getSessionId();

		if (sessionId != null) {
			List<String> keys = new ArrayList<>(s.getAllSessionIds().keySet());

			keys.stream().filter(key -> sessionId.equals(s.getSessionIds(key).stream().findFirst().get().toString()))
					.forEach(x -> {
						log.info("Disconnect user - {} sessionId - {}",x,sessionId);
						s.unregisterSessionId(x, sessionId);
					});
		}

	}
}
