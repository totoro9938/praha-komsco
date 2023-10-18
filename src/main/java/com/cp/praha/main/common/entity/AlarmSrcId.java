package com.cp.praha.main.common.entity;

import com.cp.praha.common.constant.CharCodeType;
import lombok.Getter;

import java.util.Arrays;

@Getter
public enum AlarmSrcId implements CharCodeType {

    RESERVATION("예약", "TB_RESERVATION"),
    CALLBACK("콜백", "TB_CALLBACK"),
    CAMPAIGN("캠페인", "TB_CAMPAIGN"),
    TRANSFER("이관", "TB_TRANSFER"),
    SMS_RV("문자상담", "TB_SMS_RV"),
    MESSAGE("쪽지", "TB_MESSAGE"),
    DOC("공지사항", "TB_DOC");

    private final String desc;
    private final String value;

    AlarmSrcId(String desc, String value) {
        this.desc = desc;
        this.value = value;
    }

    public static AlarmSrcId ofValue(String value) {

        return Arrays.stream(AlarmSrcId.values())
                .filter(v -> v.getValue().equals(value))
                .findAny()
                .orElse(DOC);
    }

    @Override
    public String getLegacyCode() {
        return ofValue(this.value).getValue();
    }
}
