package com.cp.praha.work.customer.service.response;

import com.cp.praha.consult.consultmain.service.response.CustomerFindSelectDomain;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class CombinedCustomerItemDomain {
    private CustomerSelectItemDomain customerSelectItemDomain;
    private List<CustomerFindSelectDomain> customerFindSelectDomain;
}
