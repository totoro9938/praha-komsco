package com.cp.praha.common.annotation;

import com.cp.praha.common.ControllerValidateHandler;
import com.cp.praha.common.ValidateContextContainer;
import com.cp.praha.common.config.RestControllerExceptionHandler;
import com.cp.praha.common.config.response.ApiResponseTranslatorAutoConfiguration;
import com.cp.praha.common.controller.CommonController;
import org.springframework.context.annotation.Import;

import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
@Documented
@Import({CommonController.class, RestControllerExceptionHandler.class, ApiResponseTranslatorAutoConfiguration.class, ValidateContextContainer.class, ControllerValidateHandler.class})
public @interface EnableCpCommonConfig {
}
