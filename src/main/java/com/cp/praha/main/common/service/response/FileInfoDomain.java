package com.cp.praha.main.common.service.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class FileInfoDomain {
    private String fileUuid;
    private String srcId1;
    private String srcId2;
    private String srcId3;
    private String srcId4;
    private String fileNm;
    private String contentType;
    private String contentLength;
    private String path;
    private int fileId;
    private String saveFileNm;
}
