package com.cp.praha.common.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class BooleanToUpperCaseYnTypeCodeConverter implements AttributeConverter<Boolean, String> {
  @Override
  public String convertToDatabaseColumn(Boolean attribute) {
    return (attribute != null && attribute) ? "Y" : "N";
  }

  @Override
  public Boolean convertToEntityAttribute(String s) {
    if (s == null) {
      return false;
    }
    return "Y".equals(s);
  }
}
