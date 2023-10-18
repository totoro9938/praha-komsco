package com.cp.praha.work.area.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AreaInsertCommand {
        private String companyCd;
    	private String areaUuid;
    	private String sidoName;
    	private String sidoHanja;
    	private String sidoEnglish;
    	private String siName	;
    	private String siHanja	;
        private String siEnglish;
    	private String gugunName;
    	private String gugunHanja;
    	private String gugunEnglish;
    	private String dongName;
    	private String dongHanja;
    	private String dongEnglish;
    	private String dongHjd;
    	private String dongBjd;
    	private int rgtrId;
}
