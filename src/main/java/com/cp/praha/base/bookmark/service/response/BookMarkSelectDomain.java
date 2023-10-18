package com.cp.praha.base.bookmark.service.response;

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
public class BookMarkSelectDomain {
    private String companyCd;
    @Id
    private Integer bookmarkId;
    private String bookmarkUuid;
	private Integer bookmarkIdx;
	private String bookmarkNm;
	private Integer userId;
	private String url;
	private String delYn;
	private Integer rgtrId;
	private ZonedDateTime regDt;
	private String regYmd;
	private Integer mdfrId;
	private ZonedDateTime mdfDt;
	private String mdfYmd;
	private String rgtrNm;
	private String mdfrNm;
}
