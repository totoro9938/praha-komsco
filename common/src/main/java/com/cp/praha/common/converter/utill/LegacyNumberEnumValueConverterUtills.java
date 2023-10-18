package com.cp.praha.common.converter.utill;


import com.cp.praha.common.constant.NumberCodeType;

import java.util.EnumSet;

public class LegacyNumberEnumValueConverterUtills {

  /**
   * ofLegacyCode.
   */
  public static <T extends Enum<T> & NumberCodeType> T ofLegacyCode(Class<T> enumClass,
                                                                    Integer legacyCode) {

    if (legacyCode == null) {
      return null;
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
  public static <T extends Enum<T> & NumberCodeType> Integer toLegacyCode(T enumValue) {
    if (enumValue == null) {
      return null;
    }
    return enumValue.getLegacyCode();
  }
}
