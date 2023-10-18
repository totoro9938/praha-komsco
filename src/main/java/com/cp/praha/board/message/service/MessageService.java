package com.cp.praha.board.message.service;

import com.cp.praha.board.message.entity.*;
import com.cp.praha.board.message.service.request.*;
import com.cp.praha.board.message.service.response.MessageDeptUserSelectDomain;
import com.cp.praha.board.message.service.response.MessageGroupMemberSelectDomain;
import com.cp.praha.board.message.service.response.MessageGroupSelectDomain;
import com.cp.praha.board.message.service.response.MessageRcvSelecItemtDomain;
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

@Service
@Slf4j
@RequiredArgsConstructor
public class MessageService {

    private final EntityManager entityManager;
    private final UserInfo userInfo;
    private final FileService fileService;

    @Value("${company.name}")
    private String companyCd;

    public GridDomain messageSelectPage(MessageSelectPageCommand command) {
        command.setUserId(userInfo.getUser().getUserId());
        var procedure = MessageSelectPageProc.procedureQuery(entityManager,command);
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

    public List<MessageDeptUserSelectDomain> messageDeptUserSelect(MessageDeptUserSelectCommand command) {
        var procedure = MessageDeptUserSelectProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {
        },procedure.getResultList());
    }

    public List<MessageGroupSelectDomain> messageGroupSelect() {
        var procedure = MessageGroupSelectProc.procedureQuery(entityManager,userInfo.getUser().getUserId());
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {
        },procedure.getResultList());
    }

    public List<MessageGroupMemberSelectDomain> messageGroupMemberSelect(MessageGroupMemberSelectCommand command) {
        command.setUserId(userInfo.getUser().getUserId());
        var procedure = MessageGroupMemberSelectProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {
        },procedure.getResultList());
    }

    @Transactional
    public void messageGroupInsert(MessageGroupSaveCommand command) {
        command.setUserId(userInfo.getUser().getUserId());
        var procedure = MessageGroupSaveProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void messageGroupDelete(MessageGroupDeleteCommand command){
        if(command.getMessageGroupIds() != null){
            for(int messageGroupId : command.getMessageGroupIds()){
                var procedure = MessageGroupDeleteProc.procedureQuery(entityManager,messageGroupId,userInfo.getUser().getUserId());
                ProcErrorHandler.errorHandler(procedure);
            }
        }
    }

    @Transactional
    public Integer messageInsert(MessageInsertCommand command) {
        command.setRgtrId(userInfo.getUser().getUserId());
        var procedure = MessageInsertProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        var messageId = (int) procedure.getOutputParameterValue("O_MESSAGE_ID");
        if (command.getFiles() != null) {

            command.getFiles().forEach(file -> {
                file.setSrcId1("MESSAGE");
                file.setSrcId2(String.valueOf(messageId));
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

        return messageId;

    }

    @Transactional
    public void messageImportanceUpdate(MessageImportanceCommand command){
        var procedure = MessageImportanceUpdateProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void messageReceiveImportanceUpdate(MessageRecevieImportanceCommand command){
        var procedure = MessageReceiverImportanceUpdateProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void messageDelete(MessageDeleteCommand command){
        command.setUserId(userInfo.getUser().getUserId());
        var procedure = MessageDeleteProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
    }

    public List<MessageRcvSelecItemtDomain> messageRcvSelectItem(String uuid) {
        var procedure = MessageRcvSelectItemProc.procedureQuery(entityManager,uuid);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {
        },procedure.getResultList());
    }

    @Transactional
    public void messageReadInsert(String ip, int messageId) {
        var procedure = MessageVisitorReadInsertProc.procedureQuery(entityManager,ip, messageId,userInfo.getUser().getUserId());
        ProcErrorHandler.errorHandler(procedure);
    }



}
