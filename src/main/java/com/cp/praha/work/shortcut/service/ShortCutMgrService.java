package com.cp.praha.work.shortcut.service;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.consult.consultmain.service.response.ShortcutSelectDomain;
import com.cp.praha.work.shortcut.entity.*;
import com.cp.praha.work.shortcut.service.request.ShortCutInsertCommand;
import com.cp.praha.work.shortcut.service.request.ShortCutSelectCommand;
import com.cp.praha.work.shortcut.service.response.ShortCutSelectItemDomain;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ShortCutMgrService {

    private final EntityManager entityManager;
    private final UserInfo userInfo;

    public List<ShortcutSelectDomain> shortcutSelect(ShortCutSelectCommand command) {
        var procedure = ShortcutSelectProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public ShortCutSelectItemDomain shortcutSelectItem(int shortcutId) {
        var procedure = ShortCutSelectItemProc.procedureQuery(entityManager, shortcutId);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    @Transactional
    public int shortcutInsert(ShortCutInsertCommand command) {
        command.setRgtrId(userInfo.getUser().getUserId());
        var procedure = ShortCutInsertProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return (int) procedure.getOutputParameterValue("O_SHORTCUT_ID");
    }

    @Transactional
    public void shortcutUpdate(ShortCutInsertCommand command) {
        command.setMdfrId(userInfo.getUser().getUserId());
        var procedure = ShortCutUpdateProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void shortcutDelete(int shortcutId) {
        var procedure = ShortCutDeleteProc.procedureQuery(entityManager,shortcutId, userInfo.getUser().getUserId());
        ProcErrorHandler.errorHandler(procedure);
    }

}
