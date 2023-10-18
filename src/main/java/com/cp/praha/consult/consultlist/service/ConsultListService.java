package com.cp.praha.consult.consultlist.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.consult.consultlist.entity.CallCallCatSelectProc;
import com.cp.praha.consult.consultlist.entity.CallSelectItemProc;
import com.cp.praha.consult.consultlist.entity.CallSelectPageProc;
import com.cp.praha.consult.consultlist.entity.CallUpdateProc;
import com.cp.praha.consult.consultlist.service.request.CallSelectPageCommand;
import com.cp.praha.consult.consultlist.service.request.CallUpdateCommand;
import com.cp.praha.consult.consultlist.service.response.CallCallCatSelectDomain;
import com.cp.praha.consult.consultlist.service.response.CallSelectItemDomain;
import com.cp.praha.consult.consultmain.entity.CallCallCatDeleteProc;
import com.cp.praha.consult.consultmain.service.request.CallCallCatCommand;
import com.cp.praha.consult.consultmain.service.request.CallCallCatDeleteCommand;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor

public class ConsultListService {
    private final EntityManager entityManager;
    private final UserInfo userInfo;
    /**
     * USP_CALL_SEL_PAGE 상담리스트 조회
     */
    public GridDomain callSelectPage(CallSelectPageCommand command){
        var procedure = CallSelectPageProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        GridDomain gridDomain = new GridDomain();
        gridDomain.setCurPage((int) procedure.getOutputParameterValue("V_CUR_PAGE"));
        gridDomain.setTotalCount((int) procedure.getOutputParameterValue("V_TOTALCOUNT"));
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));
        return gridDomain;
    }
    /**
     * USP_CALL_SEL_ITEM 상담리스트 상세조회
     */
    public CallSelectItemDomain callSelectItem(String callUuid){
        var procedure = CallSelectItemProc.procedureQuery(entityManager,userInfo,callUuid);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getSingleResult());

    }
    /**
     * USP_CALL_UPT 고객업데이트
     */
    @Transactional
    public void callUpdate(CallUpdateCommand command) {
        command.setMdfrId(userInfo.getUser().getUserId());
        var procedure = CallUpdateProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
    }
    /**
     * USP_CALL_CALL_CAT_SEL 상담리스트 상세보기 상담분류 리스트 조회
     */
    public List<CallCallCatSelectDomain> callCatListSelect(CallCallCatCommand command) {
        var proedure = CallCallCatSelectProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(proedure);
        return GenericListType.getObjectType(new TypeReference<>() {},proedure.getResultList());
    }
    /**
     * USP_CALL_CALL_CAT_SEL 상담리스트 상세보기 상담분류 리스트 삭제
     */
    @Transactional
    public void callCatListDelete(CallCallCatDeleteCommand command) {
        for(int catId : command.getCatIds()){
            CallCallCatCommand cmd = new CallCallCatCommand();
            cmd.setCallId(command.getCallId());
            cmd.setBoundId(command.getBoundId());
            cmd.setCatId(catId);
            cmd.setUserId(userInfo.getUser().getUserId());
            ProcErrorHandler.errorHandler(CallCallCatDeleteProc.procedureQuery(entityManager,cmd));
        }
    }
}
