package com.cp.praha.main.login.web;

import com.cp.praha.main.login.service.CpUserDetailService;
import com.cp.praha.main.login.service.request.UserLoginCommand;
import com.cp.praha.main.login.service.request.UserUptSecretCommand;
import com.cp.praha.main.login.service.response.OtpResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class OtpRestController {

    private final CpUserDetailService userLoginService;

    @PostMapping("/user-otp-check")
    public List<OtpResponse> smsListSelectPage(@RequestBody @Valid UserLoginCommand command) {
       return List.of(userLoginService.userOtpCheck(command));
    }

    @PostMapping("/register")
    public List<OtpResponse> smsListSelectPage(@RequestBody @Valid UserUptSecretCommand command) {
        userLoginService.userUptSecret(command);
        UserLoginCommand userLoginCommand = new UserLoginCommand();
        userLoginCommand.setUserCd(command.getUserCd());
        userLoginCommand.setUserPwd(command.getUserPwd());
        return List.of(userLoginService.userOtpCheck(userLoginCommand));
    }
}
