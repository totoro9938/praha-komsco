package com.cp.praha.common.converter.utill;

import com.cp.praha.common.constant.CharCodeType;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;

import java.util.EnumSet;

@Slf4j
public class LegacyCharEnumValueConverterUtills {

  /**
   * ofLegacyCode.
   */
  public static <T extends Enum<T> & CharCodeType> T ofLegacyCode(Class<T> enumClass,
                                                                  String legacyCode) {

    if (legacyCode == null) {
      return null;
    }

    if (StringUtils.isBlank(legacyCode)) {
      return null;
    }

    if (enumClass == null) {
      log.debug("열거형이 null임");
    }

    return EnumSet.allOf(enumClass).stream()
        .filter(v -> v.getLegacyCode().equals(legacyCode))
        .findAny()
        .orElseThrow(() -> new IllegalArgumentException(String
            .format("enum=[%s], legacyCode=[%s]가 존재하지 않습니다.", enumClass.getName(), legacyCode)));

  }

  /**
   * toLegacyCode.
   */
  public static <T extends Enum<T> & CharCodeType> String toLegacyCode(T enumValue) {
    if (enumValue == null) {
      return "";
    }

    return enumValue.getLegacyCode();
  }
}
