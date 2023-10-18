package com.cp.praha.websocket.message.service.response;


import com.cp.praha.websocket.constant.CharCodeType;
import lombok.Getter;

import java.util.Arrays;

@Getter
public enum MessageType implements CharCodeType {
    ALARM("알림", "ALARM"),
    ALARM_CENTER("일람센터", "ALARM_CENTER"),
    CALL_JOB("콜", "CALL_JOB"),
    SMS_RV("문자상담 수신", "SMS_RV"),
    NONE("", "");
    private final String desc;
    private final String value;

    MessageType(String desc, String value) {
        this.desc = desc;
        this.value = value;
    }

    /**
     * ofValue.
     */
    public static MessageType ofValue(String value) {

        return Arrays.stream(MessageType.values())
                .filter(v -> v.getValue().equals(value))
                .findAny()
                .orElse(NONE);
    }

    @Override
    public String getLegacyCode() {
        return ofValue(this.value).getValue();
    }
}
