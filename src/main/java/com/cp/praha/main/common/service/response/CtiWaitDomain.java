package com.cp.praha.main.common.service.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CtiWaitDomain {
    private int readyCount;
    private int queueCount;
}
