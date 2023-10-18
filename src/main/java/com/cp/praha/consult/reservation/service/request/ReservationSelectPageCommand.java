package com.cp.praha.consult.reservation.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReservationSelectPageCommand {

    private String startDate;
    private String endDate;
    private Integer chargeParentId;
    private Integer chargeDeptId;
    private Integer chargeId;
    private Integer custId;
    private String reservationStatus;
    private String completeYn;
    private String searchType;
    private String searchTxt;
    private String sortType;
    private String outputYn;
    private Integer page;
    private Integer totalPage;
}
