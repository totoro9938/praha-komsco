package com.cp.praha.consult.administrative.service.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NonTaxVO {
    private String cnEmp;
    private String tprNo;
    @JsonProperty("nTelCellular")
    private String nTelCellular;
    private String virAcc;
}
