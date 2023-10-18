package com.cp.praha.work.scheduler.service;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.config.CacheConstants;
import com.cp.praha.work.scheduler.entiy.SchedulerRepository;
import com.cp.praha.work.scheduler.entiy.TbScheduler;
import com.cp.praha.work.scheduler.web.request.SchedulerCommand;
import com.cp.praha.work.scheduler.web.response.SchedulerDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SchedulerService {

    @Value("${company.name}")
    private String companyName;
    private final UserInfo userInfo;
    private final SchedulerRepository schedulerRepository;

    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_scheduler", allEntries = true)
    public SchedulerDomain create(SchedulerCommand command) {
        var userId = userInfo.getUser().getUserId();
        var now = ZonedDateTime.now();
        command.setCompanyCd(companyName);
        command.setCreatorId(userId);
        command.setCreateDate(now);
        command.setUpdaterId(userId);
        command.setUpdateDate(now);
        log.debug("{}", command);
        var result = schedulerRepository.save(command.toTbScheduler());

        return this.getSchedulerDomain(schedulerRepository.findById(result.getTaskId()).orElseThrow());

    }

    public SchedulerDomain getSchedulerDomain(TbScheduler result){
        return SchedulerDomain.builder()
                .taskId(result.getTaskId())
                .recurrenceRule(result.getRecurrenceRule())
                .recurrenceId(result.getRecurrenceId())
                .createDate(result.getCreateDate())
                .end(zonedDateToTimestamp(result.getSchedulerEnd()))
                .start(zonedDateToTimestamp(result.getSchedulerStart()))
                .description(result.getEtc())
                .companyCd(result.getCompanyCd())
                .endTimeZone(result.getEndTimeZone())
                .recurrenceException(result.getRecurrenceException())
                .creatorId(result.getCreatorId())
                .isAllDay(result.getIsAllDay())
                .schedulerType(result.getSchedulerType())
                .updateDate(result.getUpdateDate())
                .updaterId(result.getUpdaterId())
                .title(result.getTitle())
                .build();
    }
    @Cacheable(value = CacheConstants.CACHE_PREFIX +"_scheduler")
    public List<SchedulerDomain> read() {
        var list = schedulerRepository.findAll();
        var listResult = list.stream().map(this::getSchedulerDomain).collect(Collectors.toList());
        log.debug("{}",listResult);
        return listResult;
    }

    public long zonedDateToTimestamp(ZonedDateTime z) {
        Timestamp t = Timestamp.valueOf(z.toLocalDateTime());
        return t.getTime();
    }
    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_scheduler", allEntries = true)
    public SchedulerDomain update(SchedulerCommand command) {
        var userId = userInfo.getUser().getUserId();
        command.setCompanyCd(companyName);
        command.setCreatorId(userId);
        command.setUpdaterId(userId);
        var result =schedulerRepository.save(command.toTbScheduler());
        return this.getSchedulerDomain( schedulerRepository.findById(result.getTaskId()).orElseThrow());
    }

    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_scheduler", allEntries = true)
    public void delete(SchedulerCommand command) {
        schedulerRepository.delete(command.toTbScheduler());
    }
}
