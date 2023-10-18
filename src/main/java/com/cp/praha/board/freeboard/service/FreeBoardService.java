package com.cp.praha.board.freeboard.service;

import com.cp.praha.board.freeboard.entity.FreeBoardDocReplyInsertProc;
import com.cp.praha.board.freeboard.entity.FreeBoardDocReplySelectProc;
import com.cp.praha.board.freeboard.entity.FreeBoardDocReplyUpdateProc;
import com.cp.praha.board.freeboard.service.request.FreeBoardDocReplyInsertCommand;
import com.cp.praha.board.freeboard.service.request.FreeBoardDocReplyUpdateCommand;
import com.cp.praha.board.freeboard.service.response.FreeBoardDocReplySelectDomain;
import com.cp.praha.board.notice.entity.*;
import com.cp.praha.board.notice.service.NoticeService;
import com.cp.praha.board.notice.service.request.NoticeDocInsertCommand;
import com.cp.praha.board.notice.service.request.NoticeDocSelectItemCommand;
import com.cp.praha.board.notice.service.request.NoticeDocSelectPageCommand;
import com.cp.praha.board.notice.service.request.NoticeDocUpdateCommand;
import com.cp.praha.board.notice.service.response.NoticeDocSelectItemDomain;
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
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class FreeBoardService {
    private final EntityManager entityManager;
    private final UserInfo userInfo;
    private final FileService fileService;
    private final NoticeService noticeService;

    @Value("${company.name}")
    private String companyCd;

    public GridDomain freeBoardDocSelectPage(NoticeDocSelectPageCommand command) {
        var procedure = NoticeDocSelectPageProc.procedureQuery(entityManager,command);
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

    public NoticeDocSelectItemDomain freeBoardSelectItem(NoticeDocSelectItemCommand command) {
        var procedure = NoticeDocSelectItemProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {
        },procedure.getSingleResult());
    }

    @Transactional
    public void freeBoardInsert(String ip, NoticeDocInsertCommand command) {
        command.setRgtrId(userInfo.getUser().getUserId());
        String uuid = UUID.randomUUID().toString();
        var procedure = NoticeDocInsertProc.procedureQuery(entityManager,ip, command, uuid);
        ProcErrorHandler.errorHandler(procedure);
        var docId = (int) procedure.getOutputParameterValue("O_DOC_ID");
        if (command.getFiles() != null) {
            command.getFiles().forEach(file -> {
                file.setSrcId1(command.getCabinetCd());
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
    public void freeBoardUpdate(String ip, NoticeDocUpdateCommand command) {
        command.setReceiverIdList("");
        command.setReceiverCnt(0);
        command.setReceiverDeptIdList("");
        command.setReceiverDeptCnt(0);
        command.setImportance("");
        command.setMdfrId(userInfo.getUser().getUserId());
        var procedure = NoticeDocUpdateProc.procedureQuery(entityManager,ip, command);
        ProcErrorHandler.errorHandler(procedure);
        var docId = command.getDocId();
        if (command.getFiles() != null) {
            //업로드한 파일 save
            command.getFiles().forEach(file -> {
                file.setSrcId1(command.getCabinetCd());
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
    public void freeBoardDelete(int docId) {
        var procedure = NoticeDocDeleteProc.procedureQuery(entityManager,docId,userInfo.getUser().getUserId());
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void freeBoardReplyInsert(String ip, FreeBoardDocReplyInsertCommand command) {
        command.setRgtrId(userInfo.getUser().getUserId());
        var procedure = FreeBoardDocReplyInsertProc.procedureQuery(entityManager,ip, command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void freeBoardReplyUpdate(String ip, FreeBoardDocReplyUpdateCommand command) {
        command.setMdfrId(userInfo.getUser().getUserId());
        var procedure = FreeBoardDocReplyUpdateProc.procedureQuery(entityManager,ip, command);
        ProcErrorHandler.errorHandler(procedure);
    }

    public List<FreeBoardDocReplySelectDomain> freeBoardReplySelect(String uuid) {
        var procedure = FreeBoardDocReplySelectProc.procedureQuery(entityManager,uuid);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {
        },procedure.getResultList());
    }

}
