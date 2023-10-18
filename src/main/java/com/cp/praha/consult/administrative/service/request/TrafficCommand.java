package com.cp.praha.consult.administrative.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TrafficCommand {
    private String key1;
    private String key2;
    private String pwd1;
    private String srcorgcd;
    private String tgtorgcd;
    private String resultCode;
    private String queryId;
    private String lvyNo;
    private String ownerNm;
    private String bdngNm;
}
