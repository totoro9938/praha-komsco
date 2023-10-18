package com.cp.praha.base.bookmark.service;

import com.cp.praha.base.bookmark.entity.BookMarkDeleteProc;
import com.cp.praha.base.bookmark.entity.BookMarkInsertProc;
import com.cp.praha.base.bookmark.entity.BookMarkSelectProc;
import com.cp.praha.base.bookmark.entity.BookMarkUpdateProc;
import com.cp.praha.base.bookmark.service.request.BookMarkDeleteCommand;
import com.cp.praha.base.bookmark.service.request.BookMarkInsertCommand;
import com.cp.praha.base.bookmark.service.request.BookMarkSelectCommand;
import com.cp.praha.base.bookmark.service.request.BookMarkUpdateCommand;
import com.cp.praha.base.bookmark.service.response.BookMarkSelectDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor

public class BookMarkService {

    private final EntityManager entityManager;
    private final UserInfo userInfo;

    public List<BookMarkSelectDomain> bookMarkSelect(BookMarkSelectCommand command) {
        var procedure = BookMarkSelectProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);

        return GenericListType.getObjectType(new TypeReference<>() {
        }, procedure.getResultList());
    }

    @Transactional
    public void bookMarkInsert(List<BookMarkInsertCommand> command) {
        for(BookMarkInsertCommand bookMarkInsertCommand: command) {
            bookMarkInsertCommand.setRgtrId(userInfo.getUser().getUserId());
            bookMarkInsertCommand.setBookmarkUuid(UUID.randomUUID().toString());
            var procedure = BookMarkInsertProc.procedureQuery(entityManager,bookMarkInsertCommand);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    @Transactional
    public void bookMarkUpdate(List<BookMarkUpdateCommand> command) {
        for(BookMarkUpdateCommand bookMarkUpdateCommand: command) {
            bookMarkUpdateCommand.setMdfrId(userInfo.getUser().getUserId());
            var procedure = BookMarkUpdateProc.procedureQuery(entityManager,bookMarkUpdateCommand);
            ProcErrorHandler.errorHandler(procedure);
        }
    }
    @Transactional
    public void bookMarkDelete(List<BookMarkDeleteCommand> commands) {
        for(BookMarkDeleteCommand command : commands) {
            var procedure = BookMarkDeleteProc.procedureQuery(entityManager, command);
            ProcErrorHandler.errorHandler(procedure);
        }
    }
}
