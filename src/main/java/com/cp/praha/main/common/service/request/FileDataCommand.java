package com.cp.praha.main.common.service.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@Builder
@ToString
public class FileDataCommand {
    private String companyCd;
    private String type;
    private String fileUuid;
    private String srcId1;
    private String srcId2;
    private String srcId3;
    private String srcId4;
    private String fileNm;
    private String savedFilePath;
    private String savedFileNm;
    private String contentType;
    private String contentLength;
    private String width;
    private String height;
    private int creatorId;
    private int fileId;
    private int imageId;
}
