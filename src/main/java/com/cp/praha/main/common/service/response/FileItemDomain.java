package com.cp.praha.main.common.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
@ToString
public class FileItemDomain {

    private String companyCd;
    @Id
    private int fileId;
    private String fileUuid;
    private String srcId1;
    private String srcId2;
    private String srcId3;
    private String srcId4;
    private String fileNm;
    private String savedFilePath;
    private String savedFileNm;
    private String contentType;
    private int contentLength;
    private int rgtrId;
    private ZonedDateTime regDt;
}
