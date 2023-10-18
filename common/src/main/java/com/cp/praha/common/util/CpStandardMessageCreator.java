package com.cp.praha.common.util;

import com.cp.praha.common.domain.message.CpStandardMessage;
import com.cp.praha.common.domain.message.MessageAction;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;

import java.time.OffsetDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

public final class CpStandardMessageCreator {
  private static String defaultIssuer = "";

  public CpStandardMessageCreator(@Value("${spring.application.name:}") String applicationName) {
    defaultIssuer = applicationName;
  }

  public static String createTraceId() {
    return Long.toHexString(UUID.randomUUID().getMostSignificantBits());
  }

  public static <T> CpStandardMessage<T> createSingleMessage(String subject, String version, MessageAction action, T single) {
    return create(subject, version, action, List.of(single), createTraceId());
  }

  public static <T> CpStandardMessage<T> createSingleMessage(String subject, String version, MessageAction action, T single, String traceId) {
    return create(subject, version, action, List.of(single), traceId);
  }

  public static <T> CpStandardMessage<T> createSingleMessage(String subject, String version, MessageAction action, T single, String traceId, OffsetDateTime createdAt) {
    return create(subject, version, action, List.of(single), traceId, createdAt);
  }

  public static <T> CpStandardMessage<T> createSingleMessage(String subject, String version, String issuer, MessageAction action, T single, String traceId, OffsetDateTime createdAt) {
    return create(subject, version, issuer, action, List.of(single), traceId, createdAt);
  }

  public static <T> CpStandardMessage<T> create(String subject, String version, MessageAction action, Collection<T> dataList) {
    return create(subject, version, action, dataList, createTraceId());
  }

  public static <T> CpStandardMessage<T> create(String subject, String version, MessageAction action, Collection<T> dataList, String traceId) {
    return create(subject, version, action, dataList, traceId, OffsetDateTime.now());
  }

  public static <T> CpStandardMessage<T> create(String subject, String version, MessageAction action, Collection<T> dataList, String traceId, OffsetDateTime createdAt) {
    return new CpStandardMessage<T>(createHeader(subject, version, action, traceId, createdAt), dataList) {
    };
  }

  public static <T> CpStandardMessage<T> create(String subject, String version, String issuer, MessageAction action, Collection<T> dataList, String traceId, OffsetDateTime createdAt) {
    return new CpStandardMessage<T>(createHeader(subject, version, issuer, action, traceId, createdAt), dataList) {
    };
  }

  private static CpStandardMessage.Header createHeader(String subject, String version, String issuer, MessageAction action, String traceId, OffsetDateTime createdAt) {
    if (StringUtils.isEmpty(subject)) {
      throw new IllegalArgumentException("required subject");
    } else if (StringUtils.isEmpty(version)) {
      throw new IllegalArgumentException("required version");
    } else {
      if (Objects.isNull(createdAt)) {
        createdAt = OffsetDateTime.now();
      }

      return new CpStandardMessage.Header(subject, issuer, version, createdAt.toString(), action, traceId);
    }
  }

  private static CpStandardMessage.Header createHeader(String subject, String version, MessageAction action, String traceId, OffsetDateTime createdAt) {
    return createHeader(subject, version, defaultIssuer, action, traceId, createdAt);
  }
}
