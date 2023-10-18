package com.cp.praha.main.common.web;

import com.cp.praha.base.bookmark.service.BookMarkService;
import com.cp.praha.base.bookmark.service.request.BookMarkSelectCommand;
import com.cp.praha.base.bookmark.service.response.BookMarkSelectDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.main.common.service.UserService;
import com.cp.praha.main.common.service.request.UserPasswordUpdateCommand;
import com.cp.praha.main.common.service.response.AlarmDomain;
import com.cp.praha.main.common.service.response.CallAverageDomain;
import com.cp.praha.main.common.service.response.CallJobDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
public class UserRestController {
    private final UserService userService;
    private final BookMarkService bookMarkService;
    private final UserInfo userInfo;
    @PutMapping("/common/v1/user/password")
    public void password(@RequestBody @Valid UserPasswordUpdateCommand command) {
        userService.userPasswordUpdate(command);
    }

    @PutMapping("/auth/user/password")
    public void passwordHome(@RequestBody @Valid UserPasswordUpdateCommand command) {
        userService.homePasswordUpdate(command);
    }


    @PostMapping("/common/v1/user/validation-password")
    public boolean validation(@RequestBody UserPasswordUpdateCommand command) {
        var user = userInfo.getUser();
        userService.checkPassword(command.getUserPwdChange(), command.getPassword(),user.getUserCd());
        return true;
    }

    @GetMapping("/common/v1/user/alert")
    public List<AlarmDomain> alertList(@RequestParam("readYn") String readYn) {
        return userService.alertList(readYn);
    }
    @GetMapping("/common/v1/user/call-job")
    public List<CallJobDomain> callJobList() {
        return userService.callJobList();
    }

    @GetMapping("/common/v1/user/call-average/{daycount}")
    public List<CallAverageDomain> callAverageList(@PathVariable int daycount) {
        return userService.callAverageList(daycount);
    }

    @PutMapping("/common/v1/user/alert/read/{alarmId}")
    public void alarmReadUpdate(@PathVariable int alarmId) {
        userService.alarmReadUpdate(alarmId);
    }

    @GetMapping("/common/v1/bookmark")
    public List<BookMarkSelectDomain> bookMarkSelect(BookMarkSelectCommand command) {
        return bookMarkService.bookMarkSelect(command);
    }

}
