package com.cp.praha.main.common.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Setter
@Getter
@Entity
@ToString
public class FileSelectDomain {
    private String companyCd;
    @Id
    private Integer fileId;
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
}
