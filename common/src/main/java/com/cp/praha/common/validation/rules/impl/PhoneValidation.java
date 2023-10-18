package com.cp.praha.common.validation.rules.impl;

import com.cp.praha.common.validation.rules.Phone;
import lombok.extern.slf4j.Slf4j;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

@Slf4j
public class PhoneValidation implements ConstraintValidator<Phone, String> {

    public static final String HP_PHONE_REGEX = "^(01([0|1|6|7|8|9]))(\\d{3,4})(\\d{4})$";
    public static final String PHONE_REGEX = "^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))(\\d{3,4})(\\d{4})$";
    public static final Integer MAX_EMAIL_LENGTH = 11;
    public static final Integer MIN_EMAIL_LENGTH = 8;

    public static boolean isValidMobileNumber(String phoneNumber) {
        return Pattern.matches(HP_PHONE_REGEX, phoneNumber);
    }

    public static boolean isValidPhoneNumber(String phoneNumber) {
        return Pattern.matches(PHONE_REGEX, phoneNumber);
    }

    public static boolean isValidLength(String phoneNumber) {
        return (phoneNumber.length() <= MAX_EMAIL_LENGTH && phoneNumber.length() >= MIN_EMAIL_LENGTH);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {

        String v = value.replaceAll("[^0-9]", "");
        if(v.isEmpty())return false;
        log.info(v);
        log.info("{} - {} - {}",isValidMobileNumber(v) , isValidPhoneNumber(v), isValidLength(v));
        return (isValidMobileNumber(v) || isValidPhoneNumber(v)) && isValidLength(v);
    }


}
