package com.cp.praha.board.resourceboard.service.request;

import com.cp.praha.main.common.service.response.FileInfoDomain;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EventBoardUpdateCommand {
    private int eventId;
    private int deptId;
    private String eventNm;
    private String contents;
    private String contact;
    private String url;
    private String html;
    private String startYmd;
    private String endYmd;
    private String ip;
    private List<FileInfoDomain> files;
    private List<Integer> deleteFileIds;
    private int mgfrId;
}
