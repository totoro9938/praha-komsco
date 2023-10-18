package com.cp.praha.work.callback.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class CallbackUserDstribSelectDomain {
    @Id
    private int    userId;
    private String userNm;
    private int    devideCnt;
    private int    nondoneCnt;
    private int    doneCnt;
}
