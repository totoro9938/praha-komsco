package com.cp.praha.main.login.service.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class OtpResponse {

    private int userId;
    private String userCd;
    private String qrCodeUrl;
    private String secretKey;
    private boolean isOtpUse;
    private boolean isSave;
}
