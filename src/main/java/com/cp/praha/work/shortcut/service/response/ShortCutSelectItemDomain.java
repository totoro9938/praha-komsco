package com.cp.praha.work.shortcut.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
@ToString
public class ShortCutSelectItemDomain {
    @Id
    private String shortcutUuid;
    private int shortcutIdx;
    private String shortcutNm;
    private int shortcutCatId;
    private String description;
    private String useYn;
    private int rgtrId;
    private ZonedDateTime regDt;
    private String regYmd;
    private int mdfrId;
    private ZonedDateTime mdfDt;
    private String mdfYmd;
}
