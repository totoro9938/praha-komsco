package com.cp.praha.consult.smsconsult.service.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter @Setter
public class SmsRvSelectItemDomain {
    private String processYn;
    private int userId;
    private int smsRvId;
    private String spamYn;
    private String spamUuid;
    private List<SmsRvContentsSelectDomain> rows;
}
