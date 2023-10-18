package com.cp.praha.consult.boundlist.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoundSelectPageCommand {
  private String startDate;
  private String endDate;
  private String searchType;
  private String searchTxt;
  private int    parentId;
  private int    deptId;
  private int    userId;
  private String boundType;
  private String sortType;
  private String outputYn;
  private int    page;
  private int    totalPage;
}
