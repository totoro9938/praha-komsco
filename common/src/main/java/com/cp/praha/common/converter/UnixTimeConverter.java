package com.cp.praha.common.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Converter
public class UnixTimeConverter implements AttributeConverter<LocalDateTime, Long> {
  @Override
  public Long convertToDatabaseColumn(LocalDateTime attribute) {

    return attribute.atZone(ZoneId.of("Asia/Seoul")).toInstant().getEpochSecond();
  }

  @Override
  public LocalDateTime convertToEntityAttribute(Long l) {
    if (l == null) {
      return null;
    }
    return LocalDateTime.ofInstant(Instant.ofEpochSecond(l.longValue()), ZoneId.of("Asia/Seoul"));
  }
}
