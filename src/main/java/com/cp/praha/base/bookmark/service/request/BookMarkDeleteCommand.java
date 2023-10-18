package com.cp.praha.base.bookmark.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BookMarkDeleteCommand {
    private int userId;
    private int bookmarkId;
    private int mdfrId;
}
