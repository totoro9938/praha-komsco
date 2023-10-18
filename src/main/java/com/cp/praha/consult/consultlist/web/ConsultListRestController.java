package com.cp.praha.consult.consultlist.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.consult.consultlist.service.ConsultListService;
import com.cp.praha.consult.consultlist.service.request.CallSelectPageCommand;
import com.cp.praha.consult.consultlist.service.request.CallUpdateCommand;
import com.cp.praha.consult.consultlist.service.response.CallCallCatSelectDomain;
import com.cp.praha.consult.consultlist.service.response.CallSelectItemDomain;
import com.cp.praha.consult.consultmain.service.ConsultService;
import com.cp.praha.consult.consultmain.service.request.CallCallCatCommand;
import com.cp.praha.consult.consultmain.service.request.CallCallCatDeleteCommand;
import com.cp.praha.consult.consultmain.service.response.ShortcutSelectDomain;
import com.cp.praha.work.shortcut.service.request.ShortCutSelectCommand;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/consult/v1")
@Secured("ROLE_CONSULT_CONSULT_LIST_SELECT")
public class ConsultListRestController {
    private final ConsultListService consultListService;
    private final ConsultService consultService;

    /**
     * USP_CALL_SEL_PAGE 상담이력 그리드조회
     */
    @GetMapping("/consultList/consultList-select-page")
    public GridDomain callSelectPage(CallSelectPageCommand command){
        return consultListService.callSelectPage(command);
    }
    /**
     * USP_CALL_SEL_PAGE 상담이력 그리드조회
     */
    @GetMapping("/list/item/{callUuid}")
    public CallSelectItemDomain callSelectItem(@PathVariable("callUuid") String callUuid){
        return consultListService.callSelectItem(callUuid);
    }

    /**
     * USP_CALL_UPT 상담이력 수정
     */
    @Secured("ROLE_CONSULT_CONSULT_LIST_UPDATE")
    @PutMapping("/consultList/call-update")
    public ResponseEntity<HttpStatus> callUpdate(@RequestBody @Valid CallUpdateCommand command){
        consultListService.callUpdate(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_CALL_CALL_CAT_SEL 상담이력 상세보기 상담분류 리스트 조회
     */
    @GetMapping("/consultList/detail/callCatList")
    public List<CallCallCatSelectDomain> callCatListSelect(CallCallCatCommand command){
        return consultListService.callCatListSelect(command);
    }
    /**
     * USP_CALL_CALL_CAT_SEL 상담이력 상세보기 상담분류 리스트 조회
     */

    @Secured("ROLE_CONSULT_CONSULT_LIST_UPDATE")
    @DeleteMapping("/consultList/callCatList/delete")
    public ResponseEntity<HttpStatus> callCatListDelete(@RequestBody CallCallCatDeleteCommand command){
        consultListService.callCatListDelete(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_SHORTCUT_SEL 단축버튼 조회
     */
    @GetMapping("/detail/short-cut/selcet")
    public List<ShortcutSelectDomain> shortCutSel(ShortCutSelectCommand command){
        return consultService.shortCutSel(command);
    }
}
