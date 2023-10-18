package com.cp.praha.board.resourceboard.service;

import com.cp.praha.board.notice.service.NoticeService;
import com.cp.praha.board.notice.service.request.NoticeDocSelectPageCommand;
import com.cp.praha.board.resourceboard.entity.*;
import com.cp.praha.board.resourceboard.service.request.EventBoardInsertCommand;
import com.cp.praha.board.resourceboard.service.request.EventBoardUpdateCommand;
import com.cp.praha.board.resourceboard.service.response.EventBoardSelectItemDomain;
import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.main.common.service.FileService;
import com.cp.praha.main.common.service.request.FileDataCommand;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class EventBoardService {
    private final EntityManager entityManager;
    private final UserInfo userInfo;
    private final FileService fileService;
    private final NoticeService noticeService;

    @Value("${company.name}")
    private String companyCd;

    public GridDomain eventBoardDocSelectPage(NoticeDocSelectPageCommand command) {
        var procedure = EventBoardSelectPageProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        var totalCount = (int) procedure.getOutputParameterValue("V_TOTALCOUNT");
        var curPage = (int) procedure.getOutputParameterValue("V_CUR_PAGE");
        GridDomain gridDomain = new GridDomain();
        gridDomain.setTotalCount(totalCount);
        gridDomain.setCurPage(curPage);
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {
        },procedure.getResultList()));

        return gridDomain;
    }

    public EventBoardSelectItemDomain eventBoardSelectItem(String eventUuid) {
        var procedure = EventBoardSelectItemProc.procedureQuery(entityManager,eventUuid);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {
        },procedure.getSingleResult());
    }

    @Transactional
    public void eventBoardInsert(String ip, EventBoardInsertCommand command) {
        command.setRgtrId(userInfo.getUser().getUserId());
        command.setEventUuid(UUID.randomUUID().toString());
        var procedure = EventBoardInsertProc.procedureQuery(entityManager,ip, command);
        ProcErrorHandler.errorHandler(procedure);
        var docId = (int) procedure.getOutputParameterValue("O_EVENT_ID");
        if (command.getFiles() != null) {
            command.getFiles().forEach(file -> {
                file.setSrcId1("Event");
                file.setSrcId2(String.valueOf(docId));
                FileDataCommand fileDataCommand = FileDataCommand.builder()
                        .companyCd(companyCd)
                        .fileId(file.getFileId())
                        .fileUuid(file.getFileUuid())
                        .srcId1(file.getSrcId1())
                        .srcId2(file.getSrcId2())
                        .srcId3("")
                        .srcId4("")
                        .fileNm(file.getFileNm())
                        .savedFilePath(file.getPath())
                        .savedFileNm(file.getSaveFileNm())
                        .contentType(file.getContentType())
                        .contentLength(file.getContentLength())
                        .creatorId(userInfo.getUser().getUserId())
                        .build();
                fileService.saveFileData(fileDataCommand);
            });
        }

    }

    @Transactional
    public void eventBoardUpdate(String ip, EventBoardUpdateCommand command) {
        command.setMgfrId(userInfo.getUser().getUserId());
        var procedure = EventBoardUpdateProc.procedureQuery(entityManager,ip, command);
        ProcErrorHandler.errorHandler(procedure);
        var docId = command.getEventId();
        if (command.getFiles() != null) {
            //업로드한 파일 save
            command.getFiles().forEach(file -> {
                file.setSrcId1("Event");
                file.setSrcId2(String.valueOf(docId));
                FileDataCommand fileDataCommand = FileDataCommand.builder()
                        .companyCd(companyCd)
                        .fileId(file.getFileId())
                        .fileUuid(file.getFileUuid())
                        .srcId1(file.getSrcId1())
                        .srcId2(file.getSrcId2())
                        .srcId3("")
                        .srcId4("")
                        .fileNm(file.getFileNm())
                        .savedFilePath(file.getPath())
                        .savedFileNm(file.getSaveFileNm())
                        .contentType(file.getContentType())
                        .contentLength(file.getContentLength())
                        .creatorId(userInfo.getUser().getUserId())
                        .build();
                fileService.saveFileData(fileDataCommand);
            });
        }

        if(command.getDeleteFileIds() != null){
            //삭제할 파일이 있는 경우
            noticeService.boardFileDelete(command.getDeleteFileIds());
        }

    }

    @Transactional
    public void eventBoardDelete(int eventId) {
        var procedure = EventBoardDeleteProc.procedureQuery(entityManager,eventId,userInfo.getUser().getUserId());
        ProcErrorHandler.errorHandler(procedure);
    }
}
