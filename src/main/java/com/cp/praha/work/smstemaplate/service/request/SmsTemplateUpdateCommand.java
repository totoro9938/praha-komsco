package com.cp.praha.work.smstemaplate.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class SmsTemplateUpdateCommand {
    @NotNull(message = "templateId는 필수입니다.")
    @Min(value = 0, message = "templateId 값은 0이상이어야 합니다.")
    private int smsTemplateId;
    private int smsTemplateIdx;
    @NotBlank(message = "템플릿명은 필수입니다.")
    private String smsTemplateNm;
    @NotNull(message = "문자구분은 필수입니다.")
    @Min(value = 0, message = "문자구분 값은 0이상이어야 합니다.")
    private int smsTemplateCatId;
    @NotBlank(message = "템플릿내용은 필수입니다.")
    private String smsTemplateContents;
    private String description;
    private String useYn;
    private String delYn;
    private int mdfrId;
}
