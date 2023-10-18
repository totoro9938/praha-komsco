package com.cp.praha.work.shortcut.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ShortCutInsertCommand {
    private int shortcutId;
    private String shortcutUuid;
    private int shortcutIdx;
    private String shortcutNm;
    private int shortcutCatId;
    private String description;
    private String useYn;
    private int rgtrId;
    private int mdfrId;
}
