package com.cp.praha.knowledge.manualmanager.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.knowledge.manualmanager.entity.*;
import com.cp.praha.knowledge.manualmanager.service.request.*;
import com.cp.praha.knowledge.manualmanager.service.response.ManualHistorySelectDomain;
import com.cp.praha.knowledge.manualmanager.service.response.ManualHistorySelectItemDomain;
import com.cp.praha.knowledge.manualmanager.service.response.ManualSelectItemDomain;
import com.cp.praha.knowledge.manualqna.entity.ManualSelectQnaProc;
import com.cp.praha.knowledge.manualqna.service.request.ManualSelectQnaCommand;
import com.cp.praha.knowledge.manualqna.service.response.ManualSelectQnaDomain;
import com.cp.praha.knowledge.manualrelation.entity.ManualRelationSelectProc;
import com.cp.praha.knowledge.manualrelation.service.request.ManualRelationSelectCommand;
import com.cp.praha.knowledge.manualrelation.service.response.ManualRelationSelectDomain;
import com.cp.praha.knowledge.manualworker.entity.ManualWorkerInsertProc;
import com.cp.praha.knowledge.manualworker.entity.ManualWorkerUpdateProc;
import com.cp.praha.knowledge.manualworker.service.request.ManualWorkerInsertCommand;
import com.cp.praha.knowledge.manualworker.service.request.ManualWorkerUpdateCommand;
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
public class ManualManagerService {

    private final EntityManager entityManager;
    private final UserInfo userInfo;
    private final FileService fileService;

    @Value("${spring.servlet.multipart.location}")
    private String filePath;

    @Value("${company.name}")
    private String companyCd;

    @Transactional
    public void manualInsert(ManualInsertCommand command) {
        var procedure = ManualInsertProc.procedureQuery(entityManager, userInfo.getUser().getUserId(), command);
        ProcErrorHandler.errorHandler(procedure);
        var manualId = (int) procedure.getOutputParameterValue("V_MANUAL_ID");
        if(command.getFiles() != null) {
            command.getFiles().forEach(file -> {
                file.setSrcId1("MANUAL");
                file.setSrcId2(String.valueOf(manualId));
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
        if ("E".equals(command.getManualType())) {
            for (ManualWorkerInsertCommand commands : command.getManualWorkerInsertCommand()) {
                commands.setManualWorkerUuid(UUID.randomUUID().toString());
                commands.setManualId(manualId);
                commands.setRgtrId(userInfo.getUser().getUserId());
                var proc = ManualWorkerInsertProc.procedureQuery(entityManager, userInfo.getUser().getUserId(), commands);
                ProcErrorHandler.errorHandler(proc);
            }
        }
    }

    @Transactional
    public void manualUpdate(ManualUpdateCommand command) {
        var procedure = ManualUpdateProc.procedureQuery(entityManager, userInfo.getUser().getUserId(), command);
        ProcErrorHandler.errorHandler(procedure);
        if (command.getFiles() != null) {
            command.getFiles().forEach(file -> {
                FileDataCommand fileDataCommand = FileDataCommand.builder()
                        .companyCd(companyCd)
                        .fileId(file.getFileId())
                        .fileUuid(file.getFileUuid())
                        .srcId1("MANUAL")
                        .srcId2(String.valueOf(command.getManualId()))
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
        if (command.getDeleteFileIds() != null){
            //삭제할 파일이 있는 경우
            this.fileDelete(command.getDeleteFileIds());
        }
        if ("E".equals(command.getManualType())) {
            for (ManualWorkerInsertCommand command1 : command.getManualWorkerInsertCommand()) {
                command1.setManualWorkerUuid(UUID.randomUUID().toString());
                command1.setManualId(command.getManualId());
                command1.setRgtrId(userInfo.getUser().getUserId());
                var proc = ManualWorkerInsertProc.procedureQuery(entityManager, userInfo.getUser().getUserId(), command1);
                ProcErrorHandler.errorHandler(proc);
            }
            for (ManualWorkerUpdateCommand command2 : command.getManualWorkerUpdateCommand()) {
                command2.setManualWorkerUuid(command2.getManualWorkerUuid());
                command2.setManualId(command2.getManualId());
                command2.setWorkerNm(command2.getWorkerNm());
                command2.setWorkerTelNo(command2.getWorkerTelNo());
                command2.setMdfrId(command2.getMdfrId());
                var proc = ManualWorkerUpdateProc.procedureQuery(entityManager, command2);
                ProcErrorHandler.errorHandler(proc);
            }
        }
    }

    @Transactional
    public void manualUpdateBatch(List<ManualUpdateBatchCommand> list) {
        for(ManualUpdateBatchCommand command : list) {
            var procedure = ManualUpdateBatchProc.procedureQuery(entityManager, userInfo.getUser().getUserId(), command);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    public ManualSelectItemDomain manualSelectItem(ManualSelectItemCommand command) {
        var procedure = ManualSelectItemProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return (ManualSelectItemDomain) procedure.getSingleResult();
    }


    public GridDomain manualSelectPage(ManualSelectPageCommand command) {
        var procedure = ManualSelectPageProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        GridDomain gridDomain = new GridDomain();
        gridDomain.setCurPage((int) procedure.getOutputParameterValue("V_CUR_PAGE"));
        gridDomain.setTotalCount((int) procedure.getOutputParameterValue("V_TOTALCOUNT"));
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));

        return gridDomain;
    }


    public List<ManualSelectQnaDomain> manualSelectQna(ManualSelectQnaCommand command) {
        var procedure = ManualSelectQnaProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList());
    }

    public List<ManualHistorySelectDomain> manualHistorySelect(ManualHistorySelectCommand command) {
        var procedure = ManualHistorySelectProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList());
    }

    public ManualHistorySelectItemDomain manualHistorySelectItem(ManualHistorySelectItemCommand command) {
        var procedure = ManualHistorySelectItemProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return (ManualHistorySelectItemDomain) procedure.getSingleResult();
    }

    @Transactional
    public void manualDelete(ManualDeleteCommand command) {
        var procedure = ManualDeleteProc.procedureQuery(entityManager, userInfo.getUser().getUserId(), command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void fileDelete(List<Integer> fileIds) {
        fileIds.forEach(fileId -> {
            var procedure = FileDeleteProc.procedureQuery(entityManager, fileId, userInfo.getUser().getUserId());
            ProcErrorHandler.errorHandler(procedure);
        });

    }

    public List<ManualRelationSelectDomain> manualRelationSelect(ManualRelationSelectCommand command) {
        var procedure = ManualRelationSelectProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList());
    }

    @Transactional
    public void manualVisitorReadInsert(int manualId, String ip) {
        var procedure = ManualVisitorReadInsertProc.procedureQuery(entityManager, userInfo.getUser().getUserId(), manualId, ip);
        ProcErrorHandler.errorHandler(procedure);
    }
}
