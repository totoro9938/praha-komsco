package com.cp.praha.main.common.web;

import com.cp.praha.common.domain.ApiErrorResponse;
import com.cp.praha.main.common.service.FileService;
import com.cp.praha.main.common.service.request.FileDataCommand;
import com.cp.praha.main.common.service.request.FileSelectCommand;
import com.cp.praha.main.common.service.response.FileInfoDomain;
import com.cp.praha.main.common.service.response.FileItemDomain;
import com.cp.praha.main.common.service.response.FileSelectDomain;
import com.cp.praha.main.common.service.util.ImageFileUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/common/v1")
@Secured("ROLE_ADMIN")
public class FileRestController {

    private final FileService fileService;
    private final ObjectMapper objectMapper;

    @PostMapping("/file/upload")
    public List<FileInfoDomain> upload(@RequestParam List<MultipartFile> files, @RequestParam("data") String data) {
        try {
            log.debug(data);
            var save = objectMapper.readValue(data, FileDataCommand.class);
            log.debug("{}", save);
            return fileService.uploadFiles(files, save);
        } catch (JsonProcessingException e) {
            throw new ApiErrorResponse(HttpStatus.BAD_REQUEST, "파라미터 를 확인하세요.");
        }

    }

    @PostMapping("/file/delete")
    public void delete(@RequestParam("data") String data) {
        try {
            var delete = objectMapper.readValue(data, FileInfoDomain[].class);
            fileService.deleteFile(delete);
        } catch (JsonProcessingException e) {
            throw new ApiErrorResponse(HttpStatus.BAD_REQUEST, "파라미터 를 확인하세요.");
        }

    }

    @GetMapping("/file/{uuid}")
    public List<FileItemDomain> item(@PathVariable String uuid) {
        return List.of(fileService.getFileItem(uuid));
    }


    @GetMapping(value = "/file/download/{uuid}")
    public void downloadFile2(HttpServletResponse response, @PathVariable String uuid, @RequestHeader(name = "User-Agent") String userAgent) {

        var domain = fileService.getFileItem(uuid);
        //log.info("{}", domain);

        Path filePath = Paths.get(String.format("%s/%s", domain.getSavedFilePath(), domain.getSavedFileNm()));
        var name = domain.getFileNm();
        String browser = ImageFileUtils.getBrowser(userAgent);
        response.setContentType(String.format("%s; charset=utf-8",domain.getContentType()));
        String disposition = ImageFileUtils.getDisposition(name, browser);
        response.setHeader("Content-Disposition", disposition);
        response.setHeader("Content-Transfer-Encoding", "binary");
        response.setHeader("Set-Cookie", "fileDownload=true; path=/");
        response.setContentLength(domain.getContentLength());

        try(OutputStream out = response.getOutputStream()){
            FileInputStream fis = null;
            fis = new FileInputStream(filePath.toFile());
            FileCopyUtils.copy(fis, out);
            if (fis != null)
                fis.close();
            out.flush();
            out.close();
        }catch (IOException e) {
            throw new ApiErrorResponse(HttpStatus.BAD_REQUEST,"file not found.");
        }
    }

    @GetMapping("/file/select")
    public List<FileSelectDomain> getFiles(FileSelectCommand fileSelectCommand) {
        return fileService.getFiles(fileSelectCommand);
    }

}
