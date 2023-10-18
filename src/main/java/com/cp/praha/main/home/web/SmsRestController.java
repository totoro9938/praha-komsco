package com.cp.praha.main.home.web;

import com.cp.praha.base.category.service.CategoryService;
import com.cp.praha.base.category.service.request.CategoryTreeCommand;
import com.cp.praha.base.category.service.response.CategoryTreeDomain;
import com.cp.praha.consult.consultmain.service.ConsultService;
import com.cp.praha.consult.consultmain.service.response.SmsTemplateSelectDomain;
import com.cp.praha.consult.smslist.service.request.SmsInsertCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/sms-send/v1")
@Secured("ROLE_ADMIN")
public class SmsRestController {

    private final ConsultService consultService;
    private final CategoryService categoryService;

    @GetMapping("/sms-template-select/{templateId}")
    public List<SmsTemplateSelectDomain> smsTemplateSelect(@PathVariable("templateId") int templateId){
        return consultService.smsTemplateSelect(templateId);
    }
    @PostMapping("/smsInsert")
    public ResponseEntity<HttpStatus> consultSmsInsert(@RequestBody @Valid SmsInsertCommand command){
        consultService.consultSmsInsert(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/cat/treeSelect")
    public List<CategoryTreeDomain> categoryTreeSelect(CategoryTreeCommand command){
        return categoryService.categoryTreeSelect(command);
    }
}
