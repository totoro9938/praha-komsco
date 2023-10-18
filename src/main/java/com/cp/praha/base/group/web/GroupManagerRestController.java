package com.cp.praha.base.group.web;

import com.cp.praha.base.group.service.GroupAuthService;
import com.cp.praha.base.group.service.request.*;
import com.cp.praha.base.group.service.response.GroupSelAllDomain;
import com.cp.praha.base.group.service.response.GroupSelDomain;
import com.cp.praha.base.group.service.response.GroupSelItemDomain;
import com.cp.praha.base.group.service.response.ProgramAuthSelDomain;
import com.cp.praha.base.program.service.ProgramManagementService;
import com.cp.praha.base.program.service.request.ProgramSelectCommand;
import com.cp.praha.base.program.service.response.ProgramSelectDomain;
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
public class GroupManagerRestController {

    private final GroupAuthService groupAuthService;
    private final ProgramManagementService programManagementService;

    /**
     * USP_GROUP_SEL_ALL
     * 사용자그룹 전체 조회
     *
     * @return
     */
    @GetMapping("/group-all/select")
    @Secured("ROLE_BASE_GROUP_MGR_SELECT")
    public List<GroupSelAllDomain> groupSelectAll() {
        return groupAuthService.groupSelectAll();
    }

    /**
     * USP_GROUP_INS
     * 사용자그룹 등록
     */
    @Secured("ROLE_BASE_GROUP_MGR_INSERT")
    @PostMapping("/group/insert")
    public ResponseEntity<HttpStatus> groupInsert(HttpServletRequest request, @RequestBody @Valid List<GroupInsertCommand> groupInsCommandList) {
        String ip = IpUtil.getClientIP(request);
        groupAuthService.groupInsert(ip, groupInsCommandList);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_GROUP_UPT
     * 사용자그룹 수정
     */
    @Secured("ROLE_BASE_GROUP_MGR_UPDATE")
    @PutMapping("/group/update")
    public ResponseEntity<HttpStatus> groupUpdate(HttpServletRequest request, @RequestBody @Valid List<GroupUpdateCommand> groupUptCommandList) {
        String ip = IpUtil.getClientIP(request);
        groupAuthService.groupUpdate(ip, groupUptCommandList);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_GROUP_SEL
     * 사용자그룹 조회
     */
    @GetMapping("/group/select")
    public List<GroupSelDomain> groupSelect(GroupSelectCommand groupSelCommand) {
        return groupAuthService.groupSelect(groupSelCommand);
    }

    /**
     * USP_GROUP_SEL_ITEM
     * 사용자그룹 단건 조회
     */
    @GetMapping("/group/{uuid}")
    public GroupSelItemDomain groupSelectItem(@PathVariable String uuid) {
        return groupAuthService.groupSelectItem(uuid);
    }

    /**
     * USP_GROUP_DEL
     * 사용자그룹 삭제
     */
    @Secured("ROLE_BASE_GROUP_MGR_DELETE")
    @DeleteMapping("/group/delete")
    public ResponseEntity<HttpStatus> groupDelete(HttpServletRequest request, @RequestBody GroupDeleteCommand groupDeleteCommand) {
        String ip = IpUtil.getClientIP(request);
        groupAuthService.groupDelete(ip, groupDeleteCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_PROGRAM_AUTH_SEL
     * 그룹별 기본 페이지
     */
    @GetMapping("/program-auth/select")
    public List<ProgramAuthSelDomain> programAuthSelect(ProgramAuthSelectCommand programAuthSelCommand) {
        return  groupAuthService.programAuthSelect(programAuthSelCommand);
    }

    /**
     * USP_PROGRAM_AUTH_SAVE
     * 그룹권한 저장
     */
    @Secured("ROLE_BASE_GROUP_MGR_UPDATE")
    @PutMapping("/program-auth/save")
    public ResponseEntity<HttpStatus> programAuthSave(HttpServletRequest request, @RequestBody @Valid List<ProgramAuthSaveCommand> programAuthSaveCommandList) {
        String ip = IpUtil.getClientIP(request);
        groupAuthService.programAuthSave(ip, programAuthSaveCommandList);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 그룹권한 프로그램 List 출력
     */
    @Secured("ROLE_BASE_GROUP_MGR_SELECT")
    @GetMapping("/group-program/select")
    public List<ProgramSelectDomain> programSelect(@Valid ProgramSelectCommand programSelCommand){
        return programManagementService.getProgramSelect(programSelCommand);
    }

}
