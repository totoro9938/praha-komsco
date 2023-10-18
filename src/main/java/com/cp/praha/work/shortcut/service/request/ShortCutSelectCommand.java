package com.cp.praha.work.shortcut.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ShortCutSelectCommand {
    private String useYn;
    private String searchTxt;
    private String sortType;
    private String outputYn;
}
