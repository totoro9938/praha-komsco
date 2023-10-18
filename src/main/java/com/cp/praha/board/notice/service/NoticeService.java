package com.cp.praha.board.notice.service;

import com.cp.praha.board.notice.entity.*;
import com.cp.praha.board.notice.service.request.*;
import com.cp.praha.board.notice.service.response.NoticeDocDeptUserSelectDomain;
import com.cp.praha.board.notice.service.response.NoticeDocSelectItemDomain;
import com.cp.praha.board.notice.service.response.NoticeDocVisitorReadSelectDomain;
import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.main.common.entity.FileDeleteProc;
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
public class NoticeService {

    private final EntityManager entityManager;
    private final UserInfo userInfo;
    private final FileService fileService;

    @Value("${company.name}")
    private String companyCd;

    public GridDomain noticeDocSelectPage(NoticeDocSelectPageCommand command) {
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

    public List<NoticeDocDeptUserSelectDomain> noticeDocDeptUserSelect(NoticeDocDeptUserSelectCommand command) {
        var procedure = NoticeDocDeptUserSelectProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {
        },procedure.getResultList());
    }

    public NoticeDocSelectItemDomain noticeSelectItem(NoticeDocSelectItemCommand command) {
        var procedure = NoticeDocSelectItemProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {
        },procedure.getSingleResult());
    }

    @Transactional
    public String boardInsert(String ip, NoticeDocInsertCommand command) {
        String uuid = UUID.randomUUID().toString();
        command.setRgtrId(userInfo.getUser().getUserId());
        var procedure = NoticeDocInsertProc.procedureQuery(entityManager,ip, command, uuid);
        ProcErrorHandler.errorHandler(procedure);
        var docId = (Integer) procedure.getOutputParameterValue("O_DOC_ID");
        if (command.getFiles() != null) {

            command.getFiles().forEach(file -> {
                file.setSrcId1("Notice");
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
        return uuid;


    }

    @Transactional
    public void boardUpdate(String ip, NoticeDocUpdateCommand command) {
        command.setMdfrId(userInfo.getUser().getUserId());
        var procedure = NoticeDocUpdateProc.procedureQuery(entityManager,ip, command);
        ProcErrorHandler.errorHandler(procedure);
        var docId = command.getDocId();
        if (command.getFiles() != null) {

            command.getFiles().forEach(file -> {
                file.setSrcId1("Notice");
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
            this.boardFileDelete(command.getDeleteFileIds());
        }

    }

    @Transactional
    public void boardFileDelete(List<Integer> fileIds) {
        fileIds.forEach(fileId -> {
            var procedure = FileDeleteProc.procedureQuery(entityManager,fileId,userInfo.getUser().getUserId());
            ProcErrorHandler.errorHandler(procedure);
        });

    }

    @Transactional
    public void noticeDelete(int docId) {
        var procedure = NoticeDocDeleteProc.procedureQuery(entityManager,docId,userInfo.getUser().getUserId());
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void noticeVisitorReadInsert(int docId, String ip) {
        var procedure = NoticeDocVisitorReadInsertProc.procedureQuery(entityManager,docId, ip,userInfo.getUser().getUserId());
        ProcErrorHandler.errorHandler(procedure);
    }

    public List<NoticeDocVisitorReadSelectDomain> noticeVisitorReadSelect(int docId) {
        var procedure = NoticeDocVisitorReadSelectProc.procedureQuery(entityManager,docId);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {
        },procedure.getResultList());
    }
}
