package com.cp.praha.base.logbatch.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@ToString
@Entity
public class LogBatchSelectPageDomain {
    @Id
    private int no;
    private String companyCd;
    private int batchDelIdx;
    private String tableNm;
    private int delCount;
    private ZonedDateTime regDt;
    private String regYmd;
}
