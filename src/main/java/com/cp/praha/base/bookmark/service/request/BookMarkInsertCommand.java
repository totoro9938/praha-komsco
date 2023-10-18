package com.cp.praha.base.bookmark.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BookMarkInsertCommand {
    private String bookmarkUuid;
    private int rgtrId;
    private int userId;
    private Integer bookmarkIdx;
    private String bookmarkNm;
    private String url;
    private String delYn;
}
