package com.cp.praha.work.scheduler.web.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.time.ZonedDateTime;

@Getter
@Setter
@ToString
@Builder
public class SchedulerDomain implements Serializable{
    private Integer taskId;
    private String companyCd;
    private String title;
    private long start;
    private long end;
    private String endTimeZone;
    private String description;
    private Integer recurrenceId;
    private String recurrenceRule;
    private String recurrenceException;
    private Boolean isAllDay;
    private String schedulerType;
    private ZonedDateTime createDate;
    private Integer creatorId;
    private ZonedDateTime updateDate;
    private Integer updaterId;


}
