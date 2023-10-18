package com.cp.praha.base.config.web;

import com.cp.praha.common.security.UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Slf4j
@RequiredArgsConstructor
@Controller
@Secured("ROLE_BASE_CONFIG_MGR_SELECT")
public class ConfigController {
  private final UserInfo userInfo;

  @RequestMapping("/configMgr")
  public String configMgr(HttpSession session, Model model) {
    model.addAttribute("role", userInfo.getUserRole("ROLE_BASE_CONFIG_MGR"));
    return "base/config";
  }
}
