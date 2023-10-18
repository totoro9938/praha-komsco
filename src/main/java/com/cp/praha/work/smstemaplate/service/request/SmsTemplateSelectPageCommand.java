package com.cp.praha.work.smstemaplate.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SmsTemplateSelectPageCommand {
    private int smsTemplateCatId;
    private String useYn;
    private String delYn;
    private String sortType;
}
