package com.cp.praha.work.scheduler.web.request;

import com.cp.praha.work.scheduler.entiy.TbScheduler;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.ZonedDateTime;

@Getter
@Setter
@ToString
public class SchedulerCommand {
    private int taskId;
    private String companyCd;
    private String title;
    private String start;
    private String end;
    private String endTimeZone;
    private String description;
    private int recurrenceId;
    private String recurrenceRule;
    private String recurrenceException;
    private Boolean isAllDay = false;
    private String schedulerType;
    private ZonedDateTime createDate;
    private int creatorId;
    private ZonedDateTime updateDate;
    private int updaterId;

    public TbScheduler toTbScheduler(){

        return new TbScheduler( taskId,  companyCd,  title,  start, end,
                endTimeZone,  description,  recurrenceId,  recurrenceRule,  recurrenceException,
                isAllDay,  schedulerType,  createDate,  creatorId,  updateDate,  updaterId);
    }
}
