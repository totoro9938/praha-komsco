package com.cp.praha.base.user.web;

import com.cp.praha.base.group.service.response.GroupSelDomain;
import com.cp.praha.base.user.service.UserManagerService;
import com.cp.praha.base.user.service.request.*;
import com.cp.praha.base.user.service.response.UserSelectItemDomain;
import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.util.IpUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/base/v1")
@Secured("ROLE_BASE_USER_MGR_SELECT")
public class UserManagerRestController {

    private final UserManagerService userManagerService;

    /**
     * USP_USER_INS
     *  사용자정보등록
     */
    @Secured("ROLE_BASE_USER_MGR_INSERT")
    @PostMapping("/user/insert")
    public ResponseEntity<HttpStatus> userInsert(HttpServletRequest request, @RequestBody @Valid UserInsertCommand userInsertCommand) {
        String ip = IpUtil.getClientIP(request);
        userManagerService.userInsert(ip, userInsertCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_USER_UPT
     *  사용자정보 수정
     */
    @Secured("ROLE_BASE_USER_MGR_UPDATE")
    @PutMapping("/user/update")
    public ResponseEntity<HttpStatus> userUpdate(HttpServletRequest request, @RequestBody @Valid UserUptCommand userUptCommandList) {
        String ip = IpUtil.getClientIP(request);
        userManagerService.userUpdate(ip, userUptCommandList);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_USER_UPT_IDX
     *  사용자 정렬순서 수정
     */
    @Secured("ROLE_BASE_USER_MGR_UPDATE")
    @PutMapping("/user-index/update")
    public ResponseEntity<HttpStatus> userUpdateIndex(@RequestBody @Valid UserUpdateIndexCommand userUpdateIndexCommand) {
        userManagerService.userUpdateIndex(userUpdateIndexCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_USER_SEL_PAGE
     *  사용자조회
     */
    @GetMapping("/user-page/select")
    public GridDomain userSelectPage(UserSelectPageCommand userSelectPageCommand) {
        return userManagerService.userSelectPage(userSelectPageCommand);
    }

    /**
     * USP_USER_SEL_ITEM
     *  사용자정보 단건 조회
     */
    @GetMapping("/user-item/{userUuid}")
    public UserSelectItemDomain userSelectItem(@PathVariable String userUuid) {
        return userManagerService.userSelectItem(userUuid);
    }

    /**
     * USP_USER_DEL
     *  사용자정보삭제
     */
    @Secured("ROLE_BASE_USER_MGR_DELETE")
    @DeleteMapping("/user/delete")
    public ResponseEntity<HttpStatus> userDelete(HttpServletRequest request, @RequestBody @Valid UserDeleteCommand userDeleteCommandList) {
        String ip = IpUtil.getClientIP(request);
        userManagerService.userDelete(ip, userDeleteCommandList);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_USER_PWD_RESET
     * 비밀번호 초기화
     */
    @Secured("ROLE_BASE_USER_MGR_UPDATE")
    @PutMapping("/user-password/reset")
    public ResponseEntity<HttpStatus> userPasswordReset(HttpServletRequest request, @RequestBody @Valid UserPasswordResetCommand userPasswordResetCommand) {
        String ip = IpUtil.getClientIP(request);
        userManagerService.userPasswordReset(ip, userPasswordResetCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_USER_UPLOAD
     * 사용자 업로드
     */
    @Secured("ROLE_BASE_USER_MGR_INSERT")
    @PostMapping("/user-upload")
    public ResponseEntity<HttpStatus> userUpload(HttpServletRequest request, @RequestBody @Valid List<UserUploadCommand> userUploadCommandList) {
        String ip = IpUtil.getClientIP(request);
        userManagerService.userUpload(ip, userUploadCommandList);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_GROUP_SEL
     * 사용자그룹 조회
     */
    @GetMapping("/user/group/select")
    public List<GroupSelDomain> groupSelect() {
        return userManagerService.groupSelect();
    }
}
