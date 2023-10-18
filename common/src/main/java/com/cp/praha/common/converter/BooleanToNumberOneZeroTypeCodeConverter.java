package com.cp.praha.common.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class BooleanToNumberOneZeroTypeCodeConverter
    implements AttributeConverter<Boolean, Integer> {
  @Override
  public Integer convertToDatabaseColumn(Boolean attribute) {
    return (attribute != null && attribute) ? 1 : 0;
  }

  @Override
  public Boolean convertToEntityAttribute(Integer number) {
    if (number == null) {
      return false;
    }
    return (1 == number);
  }
}
