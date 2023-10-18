package com.cp.praha.base.bookmark.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BookMarkUpdateCommand {
    private Integer bookmarkId;
    private Integer bookmarkIdx;
    private String bookmarkNm;
    private int userId;
    private int mdfrId;
    private String url;
    private String delYn;
}
