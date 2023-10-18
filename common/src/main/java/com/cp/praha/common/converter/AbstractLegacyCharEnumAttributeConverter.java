package com.cp.praha.common.converter;

import com.cp.praha.common.constant.CharCodeType;
import com.cp.praha.common.converter.utill.LegacyCharEnumValueConverterUtills;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;

import javax.persistence.AttributeConverter;
import java.lang.reflect.ParameterizedType;

/**
 * CharEnum converter.
 * @see <a href="http://woowabros.github.io/experience/2019/01/09/enum-converter.html">
 *   http://woowabros.github.io/experience/2019/01/09/enum-converter.html</a>
 */
@Slf4j
public class AbstractLegacyCharEnumAttributeConverter<E extends Enum<E> & CharCodeType>
    implements AttributeConverter<E, String> {

  /**
   * 대상 Enum 클래스의 {@link Class} 객체.
   */
  private Class<E> targetEnumClass;


  /**
   * <code>nullable = false</code> 이면, 변환할 값이 null로 들어왔을 때 예외가 발생한다.
   * <code>nullable = true</code> 이면, 변환할 값이 null일 때, 예외없이 실행하며,
   * 특히 legacy code로 변환시에는 빈 문자열("")로 변환한다.
   */
  private boolean nullable;

  /**
   * <code>nullable = false</code> 일 때 출력할 오류 메시지에서 enum에 대한 설명을 위해 Enum 의 설명적 이름을 받는다.
   */
  private String enumName;

  /**
   * 생성자.
   */
  public AbstractLegacyCharEnumAttributeConverter(boolean nullable, String enumName) {
    this.nullable = nullable;
    this.enumName = enumName;
    this.targetEnumClass = getGenericTypeClass();
  }

  /**
   * <code>targetEnumClass</code> 에 제너릭 객체를 생성하여 넣어주기 위한 메소드.
   */
  @SuppressWarnings("Duplicates")
  private Class<E> getGenericTypeClass() {
    try {
      String className =
          ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0]
              .getTypeName();
      Class<?> clazz = Class.forName(className);
      return (Class<E>) clazz;
    } catch (Exception e) {
      throw new IllegalStateException("제너릭 타입 객체를 정상적으로 받지 못하였습니다. 'extends <>' 를 꼭 사용해 주세요.");
    }
  }


  @Override
  public String convertToDatabaseColumn(E attribute) {
    if (!nullable && attribute == null) {
      throw new IllegalArgumentException(String.format("%s(은)는 NULL로 저장할 수 없습니다.", enumName));
    }

    return LegacyCharEnumValueConverterUtills.toLegacyCode(attribute);
  }

  @Override
  public E convertToEntityAttribute(String dbData) {
    if (!nullable && StringUtils.isBlank(dbData)) {
      throw new IllegalArgumentException(
          String.format("%s(은)는 DB에 NULL 혹은 Empty로(%s) 저장되어 있습니다.", enumName, dbData));
    }

    return LegacyCharEnumValueConverterUtills.ofLegacyCode(targetEnumClass, dbData);
  }
}
