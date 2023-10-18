package com.cp.praha.common.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class BooleanToNumberZeroOneTypeCodeConverter
    implements AttributeConverter<Boolean, Integer> {
  @Override
  public Integer convertToDatabaseColumn(Boolean attribute) {
    return (attribute != null && attribute) ? 0 : 1;
  }

  @Override
  public Boolean convertToEntityAttribute(Integer number) {
    return (0 == number);
  }
}
