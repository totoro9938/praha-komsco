package com.cp.praha.work.scheduler.entiy;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Setter
@Getter
@Entity
@Slf4j
@Table(name = "tb_scheduler")
public class TbScheduler {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id", nullable = false)
    private Integer taskId;

    @Column(name = "COMPANY_CD", length = 20)
    private String companyCd;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "scheduler_start", nullable = false)
    private ZonedDateTime schedulerStart;

    @Column(name = "scheduler_end", nullable = false)
    private ZonedDateTime schedulerEnd;

    @Column(name = "end_time_zone", length = 50)
    private String endTimeZone;

    @Column(name = "etc", length = 4000)
    private String etc;

    @Column(name = "recurrence_id", nullable = false)
    private Integer recurrenceId;

    @Column(name = "recurrence_rule", length = 100)
    private String recurrenceRule;

    @Column(name = "recurrence_exception", length = 2000)
    private String recurrenceException;

    @Column(name = "is_all_day", nullable = false)
    private Boolean isAllDay = false;

    @Column(name = "scheduler_type", nullable = false, length = 100)
    private String schedulerType;

    @Column(name = "create_date", nullable = false)
    private ZonedDateTime createDate;

    @Column(name = "creator_id", nullable = false)
    private Integer creatorId;

    @Column(name = "update_date", nullable = false)
    private ZonedDateTime updateDate;

    @Column(name = "updater_id")
    private Integer updaterId;

    public TbScheduler(Integer taskId, String companyCd, String title, String schedulerStart, String schedulerEnd,
                       String endTimeZone, String etc, Integer recurrenceId, String recurrenceRule, String recurrenceException,
                       Boolean isAllDay, String schedulerType, ZonedDateTime createDate, Integer creatorId, ZonedDateTime updateDate, Integer updaterId) {

        this.taskId = taskId;
        this.companyCd = companyCd;
        this.title = title;
        this.schedulerStart = ZonedDateTime.parse(schedulerStart);
        this.schedulerEnd = ZonedDateTime.parse(schedulerEnd);;
        this.endTimeZone = endTimeZone;
        this.etc = etc;
        this.recurrenceId = recurrenceId;
        this.recurrenceRule = recurrenceRule;
        this.recurrenceException = recurrenceException;
        this.isAllDay = isAllDay;
        this.schedulerType = schedulerType;
        this.createDate = createDate;
        this.creatorId = creatorId;
        this.updateDate = updateDate;
        this.updaterId = updaterId;
    }

    public TbScheduler() {

    }
}