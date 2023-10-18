package com.cp.praha.board.message.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageSelectPageCommand {
    private String startDate;
    private String endDate;
    private String type;
    private String searchType;
    private String searchTxt;
    private String importance;
    private String sortType;
    private String outputYn;
    private Integer page;
    private Integer totalPage;
    private int userId;
}
