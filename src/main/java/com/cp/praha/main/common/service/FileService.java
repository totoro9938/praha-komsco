package com.cp.praha.main.common.service;

import com.cp.praha.common.domain.ApiErrorResponse;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.main.common.entity.FileDeleteProc;
import com.cp.praha.main.common.entity.FileInsertProc;
import com.cp.praha.main.common.entity.FileSelectItemProc;
import com.cp.praha.main.common.entity.FileSelectProc;
import com.cp.praha.main.common.service.request.FileDataCommand;
import com.cp.praha.main.common.service.request.FileSelectCommand;
import com.cp.praha.main.common.service.response.FileInfoDomain;
import com.cp.praha.main.common.service.response.FileItemDomain;
import com.cp.praha.main.common.service.response.FileSelectDomain;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.StoredProcedureQuery;
import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileService {

    @Value("${spring.servlet.multipart.location}")
    private String filePath;

    @Value("${company.name}")
    private String companyName;

    private final UserInfo userInfo;
    private final EntityManager entityManager;

    @Transactional
    public void deleteFile(FileInfoDomain[] data) {
        Arrays.stream(data).forEach(file -> {
            var root = Paths.get(String.format("%s/%s", file.getPath(), file.getSaveFileNm()));

            try {
                Files.delete(root);
            } catch (IOException e) {
                throw new ApiErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage());
            }
            var fileId = file.getFileId();
            if (fileId > 0) {
                ProcErrorHandler.errorHandler(this.fileDeleteBindProcedure(fileId, userInfo.getUser().getUserId()));
            }
        });

    }

    @Transactional
    public List<FileInfoDomain> uploadFiles(List<MultipartFile> files, FileDataCommand data) {

        String year = ZonedDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM"));

        String now = ZonedDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHmsS")); //현재시간
        var result = new ArrayList<FileInfoDomain>();

        files.forEach(file -> {
            String uuid = UUID.randomUUID().toString();
            var realFileName = String.format("%s_%s", now, uuid);
            var root = Paths.get(String.format("%s/%s/%s", filePath, year, realFileName));
            try {
                var dirPath = String.format("%s/%s", filePath, year);
                File dir = new File(dirPath);

                if (!dir.exists()) dir.mkdirs();

                InputStream inputStream = file.getInputStream();

                Files.copy(inputStream, root);
                int fileId = 0;
                if (StringUtils.isNotBlank(data.getSrcId1())) {

                    data.setCompanyCd(companyName);
                    data.setFileUuid(uuid);
                    data.setCreatorId(userInfo.getUser().getUserId());
                    data.setContentType(file.getContentType());
                    data.setFileNm(file.getOriginalFilename());
                    data.setSavedFileNm(realFileName);
                    data.setSavedFilePath(dirPath);
                    data.setContentLength(String.valueOf(file.getSize()));

                    fileId = this.saveFileData(data);
                }

                result.add(FileInfoDomain.builder()
                        .fileId(fileId)
                        .fileNm(file.getOriginalFilename())
                        .saveFileNm(realFileName)
                        .fileUuid(uuid)
                        .srcId1(data.getSrcId1())
                        .srcId2(data.getSrcId2())
                        .srcId3(data.getSrcId3())
                        .srcId4(data.getSrcId4())
                        .contentType(file.getContentType())
                        .contentLength(String.valueOf(file.getSize()))
                        .path(dirPath)
                        .build());

            } catch (Exception e) {
                try {
                    Files.delete(root);
                } catch (IOException ex) {
                    log.error("파일을 삭제 하지 못했습니다.");
                }
                throw new ApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "파일업로드시 오류가 발생하였습니다.");
            }
        });
        return result;
    }

    public int saveFileData(FileDataCommand data) {
        var proc = this.fileInsertBindProcedure(data);
        ProcErrorHandler.errorHandler(proc);

        return (Integer) proc.getOutputParameterValue("O_FILE_ID");
    }

    public FileItemDomain getFileItem(String uuid) {
        var proc = this.fileItemBindProcedure(uuid);
        ProcErrorHandler.errorHandler(proc);
        return GenericListType.getObjectType(new TypeReference<>() {
        }, proc.getSingleResult());
    }

    public Resource loadFileAsResource(FileItemDomain domain) {
        try {
            Path filePath = Paths.get(String.format("%s/%s", domain.getSavedFilePath(), domain.getSavedFileNm()));

            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return resource;
            } else {
                throw new ApiErrorResponse(HttpStatus.BAD_REQUEST, String.format("File not found %s", domain.getFileNm()));
            }
        } catch (MalformedURLException ex) {
            throw new ApiErrorResponse(HttpStatus.BAD_REQUEST, String.format("File not found : %s", domain.getFileNm()));
        }
    }

    public StoredProcedureQuery fileInsertBindProcedure(FileDataCommand command) {
        return FileInsertProc.procedureQuery(entityManager, command);
    }

    public StoredProcedureQuery fileDeleteBindProcedure(int fileId, int userId) {
        return FileDeleteProc.procedureQuery(entityManager,fileId,userId);
    }

    public StoredProcedureQuery fileItemBindProcedure(String fileUuid) {
        return FileSelectItemProc.procedureQuery(entityManager, fileUuid);
    }

    public List<FileSelectDomain> getFiles(FileSelectCommand fileSelectCommand) {
        var procedure = this.getFilesBindProc(fileSelectCommand);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {
        }, procedure.getResultList());
    }

    private StoredProcedureQuery getFilesBindProc(FileSelectCommand command) {
        return FileSelectProc.procedureQuery(entityManager, command);
    }
}
