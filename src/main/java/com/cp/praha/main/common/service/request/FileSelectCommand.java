package com.cp.praha.main.common.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class FileSelectCommand {
    private String companyCd;
    private String srcId1;
    private String srcId2;
    private String srcId3;
    private String srcId4;
}
