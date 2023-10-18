package com.cp.praha.common.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class BooleanToCharOneZeroTypeCodeConverter implements AttributeConverter<Boolean, String> {
  @Override
  public String convertToDatabaseColumn(Boolean attribute) {

    return (attribute != null && attribute) ? "1" : "0";
  }

  @Override
  public Boolean convertToEntityAttribute(String s) {

    if (s == null) {
      return false;
    }
    return "1".equals(s);
  }
}
