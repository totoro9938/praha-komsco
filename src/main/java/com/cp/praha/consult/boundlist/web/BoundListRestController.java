package com.cp.praha.consult.boundlist.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.consult.boundlist.service.BoundListService;
import com.cp.praha.consult.boundlist.service.request.BoundSelectPageCommand;
import com.cp.praha.consult.boundlist.service.response.BoundSelectItemDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/consult/v1")
@Secured("ROLE_CONSULT_BOUND_LIST_SELECT")
public class BoundListRestController {

  private final BoundListService boundListService;

  /**
   * USP_BOUND_SEL_PAGE 바운드리스트 조회
   * */
  @Secured("ROLE_CONSULT_BOUND_LIST_SELECT")
  @GetMapping("/boundList/bound-list-select-page")
  public GridDomain boundSelectPage(BoundSelectPageCommand command) {
    return boundListService.boundSelectPage(command);
  }
  /**
   * USP_BOUND_SEL_ITEM 바운드리스트 상세조회
   * */
  @Secured("ROLE_CONSULT_BOUND_LIST_SELECT")
  @GetMapping("/boundList/bound-list-select-item/{boundUuid}")
  public BoundSelectItemDomain boundSelectItem(@PathVariable String boundUuid) {
    return boundListService.boundSelectItem(boundUuid);
  }

}
