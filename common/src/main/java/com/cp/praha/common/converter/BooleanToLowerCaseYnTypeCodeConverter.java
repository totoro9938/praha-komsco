package com.cp.praha.common.converter;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Slf4j
@Converter
public class BooleanToLowerCaseYnTypeCodeConverter implements AttributeConverter<Boolean, String> {
  @Override
  public String convertToDatabaseColumn(Boolean attribute) {
    return (attribute != null && attribute) ? "y" : "n";
  }

  @Override
  public Boolean convertToEntityAttribute(String s) {

    if (s == null) {
      return false;
    } else if (StringUtils.isBlank(s)) {
      return false;
    } else if (StringUtils.isEmpty(s)) {
      return false;
    }

    return "y".equals(s);
  }
}
