package com.cp.praha.common.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class BooleanToCharZeroOneTypeCodeConverter implements AttributeConverter<Boolean, String> {
  @Override
  public String convertToDatabaseColumn(Boolean attribute) {
    return (attribute != null && attribute) ? "0" : "1";
  }

  @Override
  public Boolean convertToEntityAttribute(String s) {
    if (s == null) {
      return null;
    }
    return "0".equals(s);
  }
}
