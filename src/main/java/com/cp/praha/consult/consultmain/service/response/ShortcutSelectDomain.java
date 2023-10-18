package com.cp.praha.consult.consultmain.service.response;

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
public class ShortcutSelectDomain {
    @Id
    private int no;
    private int shortcutId;
    private String shortcutUuid;
    private int shortcutIdx;
    private String shortcutNm;
    private int shortcutCatId;
    private String shortcutCatNm;
    private String catNm1;
    private String catNm2;
    private String description;
    private String useYn;
    private int rgtrId;
    private String rgtrNm;
    private ZonedDateTime regDt;
    private String regYmd;
    private int mdfrId;
    private String mdfrNm;
    private ZonedDateTime mdfDt;
    private String mdfYmd;
}
