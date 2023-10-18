package com.cp.praha.knowledge.manualcallclass.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ManualCallClassSelPageCommand {
    private String searchTxt;
    private int page;
    private int totalPage;
}
